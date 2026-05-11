import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { countLines, createTabs } from './codeBlockTokens';
import { CodeArea } from './CodeArea';
import { StatusBar } from './StatusBar';
import { WindowChrome } from './WindowChrome';

interface CodeBlockProps {
  years?: number;
  companies?: number;
}

export const CodeBlock = ({ years = 18, companies = 12 }: CodeBlockProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = createTabs(years, companies);
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.018 } },
  };

  const tokenVariants = {
    hidden: { opacity: 0, y: 4 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
  };

  const activeTokens = tabs[activeTab].tokens;
  const lineCount = countLines(activeTokens);

  return (
    <div className="group/block relative mx-auto max-w-3xl">
      <WindowChrome activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      <div className="overflow-hidden rounded-b-xl border border-white/[0.02] bg-[#0A0A0A] shadow-2xl">
        <AnimatePresence mode="wait">
          <m.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CodeArea
              tokens={activeTokens}
              lineCount={lineCount}
              tabKey={activeTab}
              containerVariants={containerVariants}
              tokenVariants={tokenVariants}
            />
          </m.div>
        </AnimatePresence>

        <StatusBar lineCount={lineCount} />
      </div>
    </div>
  );
};
