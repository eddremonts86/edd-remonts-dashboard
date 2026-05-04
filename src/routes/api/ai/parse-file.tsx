import { createFileRoute } from '@tanstack/react-router'

const MAX_FILE_SIZE_MB = 10

type ParseFileResult = {
  text: string
  fileName: string
  mimeType: string
  extractedChars: number
}

async function parsePdf(buffer: Buffer, fileName: string): Promise<ParseFileResult> {
  const pdfParse = (await import('pdf-parse')).default
  const data = await pdfParse(buffer)
  const text = data.text.trim()
  return {
    text,
    fileName,
    mimeType: 'application/pdf',
    extractedChars: text.length,
  }
}

async function parseExcel(buffer: Buffer, fileName: string): Promise<ParseFileResult> {
  const XLSX = await import('xlsx')
  const workbook = XLSX.read(buffer, { type: 'buffer' })

  const sheetTexts: string[] = []

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName]
    const csv = XLSX.utils.sheet_to_csv(sheet, { blankrows: false })
    if (csv.trim()) {
      sheetTexts.push(`### Sheet: ${sheetName}\n${csv}`)
    }
  }

  const text = sheetTexts.join('\n\n')
  return {
    text,
    fileName,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    extractedChars: text.length,
  }
}

async function parseDocx(buffer: Buffer, fileName: string): Promise<ParseFileResult> {
  // .docx is a ZIP — extract text from word/document.xml
  const JSZip = (await import('jszip').catch(() => null))?.default
  if (!JSZip) {
    return {
      text: `[Could not extract text from ${fileName}: jszip not available]`,
      fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extractedChars: 0,
    }
  }

  const zip = await JSZip.loadAsync(buffer)
  const docXml = zip.file('word/document.xml')
  if (!docXml) {
    return {
      text: `[Could not extract text from ${fileName}: document.xml not found]`,
      fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extractedChars: 0,
    }
  }

  const xmlContent = await docXml.async('text')
  // Strip XML tags and collapse whitespace
  const text = xmlContent
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    text,
    fileName,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    extractedChars: text.length,
  }
}

export const handleParseFilePost = async ({ request }: { request: Request }) => {
  try {
    const contentType = request.headers.get('content-type') ?? ''
    if (!contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Expected multipart/form-data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > MAX_FILE_SIZE_MB) {
      return new Response(
        JSON.stringify({ error: `File too large (max ${MAX_FILE_SIZE_MB} MB)` }),
        { status: 413, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const ext = file.name.split('.').pop()?.toLowerCase() ?? ''

    let result: ParseFileResult

    if (ext === 'pdf' || file.type === 'application/pdf') {
      result = await parsePdf(buffer, file.name)
    } else if (['xlsx', 'xls'].includes(ext)) {
      result = await parseExcel(buffer, file.name)
    } else if (ext === 'docx') {
      result = await parseDocx(buffer, file.name)
    } else {
      // Treat as plain text
      const text = buffer.toString('utf-8')
      result = {
        text,
        fileName: file.name,
        mimeType: file.type || 'text/plain',
        extractedChars: text.length,
      }
    }

    if (!result.text.trim()) {
      result.text = `[No readable text extracted from ${file.name}]`
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const Route = createFileRoute('/api/ai/parse-file')({
  component: () => null,
  server: {
    handlers: {
      POST: handleParseFilePost,
    },
  },
})
