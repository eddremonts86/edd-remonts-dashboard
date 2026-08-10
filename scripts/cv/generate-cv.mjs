/**
 * Generates the six CV PDFs: 3 languages x 2 themes.
 *
 *   node scripts/cv/generate-cv.mjs
 *
 * Until now the PDFs were static binaries committed once and never rebuilt, so
 * they drifted from the site: they still carried a personal URL that had not
 * been correct for some time, and nothing in the repo could have fixed it. Now
 * they are built from the same sources the page uses, so the two cannot
 * disagree.
 *
 *   src/portfolio/data/cv-source.json     dates, companies, locations, skills
 *   src/portfolio/locales/<lang>/…json    roles, descriptions, about copy
 *
 * The layout is a rebuild of the previous design, kept deliberately: Cinzel
 * small caps for the name and section headings, JetBrains Mono for dates,
 * labels and skill chips, Epilogue for prose, and one red accent.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import React from 'react'
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from '@react-pdf/renderer'

const h = React.createElement
const ROOT = process.cwd()
const read = (p) => JSON.parse(readFileSync(path.join(ROOT, p), 'utf-8'))

// @fontsource ships woff and woff2; react-pdf reads woff, not woff2.
const FONT = (family, weight, style = 'normal') =>
  `node_modules/@fontsource/${family}/files/${family}-latin-${weight}-${style}.woff`

Font.register({ family: 'Cinzel', fonts: [{ src: FONT('cinzel', 400) }, { src: FONT('cinzel', 700), fontWeight: 700 }] })
Font.register({
  family: 'Epilogue',
  fonts: [
    { src: FONT('epilogue', 400) },
    { src: FONT('epilogue', 600), fontWeight: 600 },
    { src: FONT('epilogue', 700), fontWeight: 700 },
  ],
})
Font.register({
  family: 'Mono',
  fonts: [{ src: FONT('jetbrains-mono', 400) }, { src: FONT('jetbrains-mono', 700), fontWeight: 700 }],
})
// Justified prose needs hyphenation off, or react-pdf breaks words mid-syllable.
Font.registerHyphenationCallback((word) => [word])

const THEMES = {
  light: { bg: '#f5f4f2', fg: '#1b1b1d', muted: '#5b5b60', faint: '#8b8b91', rule: '#dcdad6', chip: '#eceae6', accent: '#c8362a' },
  dark: { bg: '#0f0f11', fg: '#ededf0', muted: '#a9a9b2', faint: '#74747d', rule: '#2a2a2f', chip: '#1b1b20', accent: '#e04b3c' },
}

const LABELS = {
  en: { aboutEyebrow: 'Who is writing', aboutTitle: 'About', aboutAccent: 'me.', expEyebrow: 'Eighteen years, two countries', expTitle: 'Professional', expAccent: 'experience.', skillsEyebrow: 'Technical expertise', skillsTitle: 'Architectural', skillsAccent: 'capabilities.', langEyebrow: 'Languages', langTitle: 'Languages', present: 'Present', langs: [['Spanish', 'Native'], ['English', 'Fluent'], ['Danish', 'B1']] },
  es: { aboutEyebrow: 'Quién escribe', aboutTitle: 'Sobre', aboutAccent: 'mí.', expEyebrow: 'Dieciocho años, dos países', expTitle: 'Experiencia', expAccent: 'profesional.', skillsEyebrow: 'Experiencia técnica', skillsTitle: 'Capacidades', skillsAccent: 'arquitectónicas.', langEyebrow: 'Idiomas', langTitle: 'Idiomas', present: 'Actualidad', langs: [['Español', 'Nativo'], ['Inglés', 'Fluido'], ['Danés', 'B1']] },
  dk: { aboutEyebrow: 'Hvem skriver', aboutTitle: 'Om', aboutAccent: 'mig.', expEyebrow: 'Atten år, to lande', expTitle: 'Erhvervs', expAccent: 'erfaring.', skillsEyebrow: 'Teknisk erfaring', skillsTitle: 'Arkitektoniske', skillsAccent: 'kompetencer.', langEyebrow: 'Sprog', langTitle: 'Sprog', present: 'Nu', langs: [['Spansk', 'Modersmål'], ['Engelsk', 'Flydende'], ['Dansk', 'B1']] },
}

function styles(t) {
  return StyleSheet.create({
    page: { backgroundColor: t.bg, color: t.fg, paddingTop: 34, paddingBottom: 40, paddingHorizontal: 44, fontFamily: 'Epilogue', fontSize: 8.5, lineHeight: 1.55 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 18, marginBottom: 16 },
    photo: { width: 74, height: 74, borderRadius: 37, objectFit: 'cover' },
    name: { fontFamily: 'Cinzel', fontWeight: 700, fontSize: 21, letterSpacing: 0.4, lineHeight: 1.25 },
    dot: { color: t.accent },
    role: { fontFamily: 'Mono', fontSize: 7.6, letterSpacing: 1.5, color: t.accent, marginTop: 5 },
    contactGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 9 },
    contactCell: { width: '50%', flexDirection: 'row', gap: 5, marginBottom: 4, alignItems: 'center' },
    contactKey: { fontFamily: 'Mono', fontSize: 6.5, letterSpacing: 0.8, color: t.faint, width: 34 },
    contactVal: { fontFamily: 'Mono', fontSize: 7.5, color: t.accent, textDecoration: 'none' },
    contactPlain: { fontFamily: 'Mono', fontSize: 7.5, color: t.muted },
    rule: { borderBottomWidth: 0.7, borderBottomColor: t.rule, marginVertical: 13 },
    // The site never uses a bare heading: every section opens with a mono
    // "/ EYEBROW", then a display line whose second half is serif italic in the
    // accent. Same two-part device here.
    eyebrow: { fontFamily: 'Mono', fontSize: 6.6, letterSpacing: 1.7, color: t.accent, marginBottom: 4 },
    sectionHead: { flexDirection: 'row', alignItems: 'baseline', gap: 5, marginBottom: 9 },
    sectionTitle: { fontFamily: 'Epilogue', fontSize: 14, color: t.fg },
    sectionAccent: { fontFamily: 'Cinzel', fontSize: 14, color: t.accent },
    // Hero metric panel, the page's signature block.
    metrics: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 0.7, borderTopColor: t.rule, borderBottomWidth: 0.7, borderBottomColor: t.rule, paddingVertical: 10, marginBottom: 14 },
    metric: { width: '25%', paddingRight: 10 },
    metricValue: { fontFamily: 'Cinzel', fontSize: 17, color: t.fg, lineHeight: 1.2 },
    metricLabel: { fontFamily: 'Mono', fontSize: 6, letterSpacing: 1, color: t.accent, marginTop: 2 },
    metricDesc: { fontSize: 6.6, color: t.faint, marginTop: 2, lineHeight: 1.45 },
    // Index markers, as on the site's cards.
    jobIndex: { fontFamily: 'Cinzel', fontSize: 9, color: t.faint, marginBottom: 2 },
    // Company chips, matching CompanyChip on the page.
    companyChip: { borderWidth: 0.6, borderColor: t.rule, borderRadius: 20, paddingVertical: 1.5, paddingHorizontal: 5, fontFamily: 'Mono', fontSize: 6.4, letterSpacing: 0.8, color: t.accent },
    prose: { textAlign: 'justify', color: t.muted, marginBottom: 6 },
    job: { flexDirection: 'row', gap: 14, marginBottom: 11 },
    jobDates: { width: 88, textAlign: 'right', fontFamily: 'Mono', fontSize: 6.8, color: t.faint, lineHeight: 1.5 },
    jobBody: { flex: 1 },
    jobRole: { fontFamily: 'Epilogue', fontWeight: 700, fontSize: 9.6, marginBottom: 1.5 },
    jobMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' },
    jobCompany: { fontFamily: 'Epilogue', fontWeight: 700, fontSize: 8.3, color: t.accent },
    jobWhere: { fontSize: 8.3, color: t.muted },
    jobDesc: { textAlign: 'justify', color: t.muted },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    chip: { backgroundColor: t.chip, borderRadius: 20, paddingVertical: 3, paddingHorizontal: 6, fontFamily: 'Mono', fontSize: 6.6, letterSpacing: 0.7, color: t.muted },
    langRow: { flexDirection: 'row', marginBottom: 2 },
    langName: { fontFamily: 'Epilogue', fontWeight: 700, fontSize: 8.5 },
    langLevel: { fontSize: 8.5, color: t.muted },
    footer: { position: 'absolute', bottom: 20, left: 44, right: 44, flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 6.2, color: t.faint },
  })
}

const Section = (s, eyebrow, title, accent) =>
  h(
    View,
    { wrap: false, style: { marginBottom: 2 } },
    h(Text, { style: s.eyebrow }, `/ ${eyebrow.toUpperCase()}`),
    h(
      View,
      { style: s.sectionHead },
      h(Text, { style: s.sectionTitle }, title),
      accent ? h(Text, { style: s.sectionAccent }, accent) : null,
    ),
  )

/** cv-source already stores "01/08/2024 - Present day"; just split the range. */
const splitPeriod = (period = '') => {
  const [from, to] = period.split(/\s+-\s+/)
  return [from ?? '', to ?? '']
}

function buildDoc({ lang, theme, cv, loc }) {
  const t = THEMES[theme]
  const s = styles(t)
  const L = LABELS[lang]
  const p = cv.personalInfo
  const items = loc.experience.items

  const contacts = [
    ['MAIL', p.email, `mailto:${p.email}`],
    ['TEL', p.phone, null],
    ['WEB', p.web, p.webUrl],
    ['LOC', p.location, null],
    ['IN', p.linkedin, p.linkedinUrl],
    ['GH', p.github, p.githubUrl],
  ]

  return h(
    Document,
    { title: `${p.name} — CV (${lang.toUpperCase()})`, author: p.name, subject: loc.hero?.role ?? 'CV' },
    h(
      Page,
      { size: 'A4', style: s.page },
      h(
        View,
        { style: s.header },
        h(Image, { style: s.photo, src: path.join(ROOT, `public/cv/photo-${theme}.jpg`) }),
        h(
          View,
          { style: { flex: 1 } },
          h(Text, { style: s.name }, p.name, h(Text, { style: s.dot }, '.')),
          h(Text, { style: s.role }, `${loc.hero?.titleLine1 ?? ''} ${loc.hero?.titleLine2 ?? ''}`.trim().toUpperCase()),
          h(
            View,
            { style: s.contactGrid },
            ...contacts.map(([k, v, href]) =>
              h(
                View,
                { style: s.contactCell, key: k },
                h(Text, { style: s.contactKey }, k),
                href
                  ? h(Link, { style: s.contactVal, src: href }, v)
                  : h(Text, { style: s.contactPlain }, v),
              ),
            ),
          ),
        ),
      ),
      h(View, { style: s.rule }),

      // The four numbers the site leads with. The CV had none of them.
      h(
        View,
        { style: s.metrics },
        ...['bundle', 'delivery', 'vitals', 'impact']
          .map((k) => loc.hero?.metrics?.[k])
          .filter(Boolean)
          .map((m, i) =>
            h(
              View,
              { style: s.metric, key: i },
              h(Text, { style: s.metricValue }, m.value),
              h(Text, { style: s.metricLabel }, m.label.toUpperCase()),
              h(Text, { style: s.metricDesc }, m.desc),
            ),
          ),
      ),

      Section(s, L.aboutEyebrow, L.aboutTitle, L.aboutAccent),
      h(Text, { style: s.prose }, loc.about.description),
      h(Text, { style: s.prose }, loc.about.advantages?.[1]?.bullets?.[2] ?? ''),

      h(View, { style: { height: 6 } }),
      Section(s, L.expEyebrow, L.expTitle, L.expAccent),
      ...cv.experiences.map((e, idx) => {
        // items is keyed by the experience id (1..12), not by array position.
        const it = items[String(e.id)] ?? {}
        const [from, to] = splitPeriod(e.period)
        return h(
          View,
          { style: s.job, key: e.id, wrap: false },
          h(View, { style: { width: 88, alignItems: 'flex-end' } },
            h(Text, { style: s.jobIndex }, `/${String(idx + 1).padStart(2, '0')}`),
            h(Text, { style: s.jobDates }, `${from}\n${to || L.present}`)),
          h(
            View,
            { style: s.jobBody },
            h(Text, { style: s.jobRole }, it.role ?? ''),
            h(
              View,
              { style: s.jobMetaRow },
              h(Text, { style: s.companyChip }, e.company.toUpperCase()),
              h(Text, { style: s.jobWhere }, e.location),
            ),
            h(Text, { style: s.jobDesc }, it.description ?? ''),
          ),
        )
      }),

      h(View, { style: { height: 6 } }),
      Section(s, L.skillsEyebrow, L.skillsTitle, L.skillsAccent),
      h(View, { style: s.chips }, ...cv.skills.map((k) => h(Text, { style: s.chip, key: k }, k.toUpperCase()))),

      h(View, { style: { height: 12 } }),
      Section(s, L.langEyebrow, L.langTitle, null),
      ...L.langs.map(([n, lvl]) =>
        h(View, { style: s.langRow, key: n }, h(Text, { style: s.langName }, n), h(Text, { style: s.langLevel }, ` – ${lvl}`)),
      ),

      h(
        View,
        { style: s.footer, fixed: true },
        h(Text, null, p.webUrl.replace(/^https?:\/\//, '')),
        h(Text, { render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}` }),
      ),
    ),
  )
}

const cv = read('src/portfolio/data/cv-source.json')
await mkdir('public/cv', { recursive: true })

for (const lang of ['en', 'es', 'dk']) {
  const loc = read(`src/portfolio/locales/${lang}/translation.json`)
  for (const theme of ['light', 'dark']) {
    const out = `public/cv/Eduardo_Inerarte_CV_${lang}_${theme}.pdf`
    const buf = await renderToBuffer(buildDoc({ lang, theme, cv, loc }))
    await writeFile(out, buf)
    console.log(`  ${out}  ${(buf.length / 1024).toFixed(0)} KB`)
  }
}
console.log('\n6 PDFs generated from cv-source.json + the locale files.')
