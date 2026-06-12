import { usePortfolioData } from '@/portfolio/contexts/PortfolioDataContext'
import { CodeBlock } from '../../code/CodeBlock'

/**
 * The tokenized fake-editor (WindowChrome + staggered syntax stream) staged
 * as a Lab exhibit. Stats come from the same DB content the dashboard edits.
 */
export const CodeCinema = () => {
  const { stats } = usePortfolioData()

  return (
    <div className="flex h-full min-h-52 items-center justify-center bg-[#070707] p-5 md:p-8">
      <div className="w-full">
        <CodeBlock years={stats.years} companies={stats.companies} />
      </div>
    </div>
  )
}
