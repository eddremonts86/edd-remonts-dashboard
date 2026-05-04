import { m } from 'framer-motion';
import { colorMap, type Token } from './codeBlockTokens';

export const CodeArea = ({
  tokens,
  lineCount,
  tabKey,
  containerVariants,
  tokenVariants,
}: {
  tokens: Token[];
  lineCount: number;
  tabKey: number;
  containerVariants: import('framer-motion').Variants;
  tokenVariants: import('framer-motion').Variants;
}) => (
  <div className="flex">
    {/* Line numbers gutter */}
    <div
      className="shrink-0 select-none border-r border-white/5 py-6 pl-4 pr-4 text-right font-mono text-[11px] leading-[1.7] tracking-widest text-white/20"
      aria-hidden="true"
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <div key={`ln-${i}`}>{String(i + 1).padStart(2, '0')}</div>
      ))}
    </div>

    {/* Token stream */}
    <m.pre
      className="scrollbar-none flex-1 overflow-x-auto px-6 py-6 font-mono text-[13px] leading-[1.7]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <code>
        {tokens.map((token, i) => {
          if (token.type === 'break') return <br key={`${tabKey}-br-${i}`} />;
          if (token.type === 'indent') return <span key={`${tabKey}-ind-${i}`}>{token.text}</span>;
          return (
            <m.span
              key={`${tabKey}-${i}`}
              className={colorMap[token.type] || 'text-white/60'}
              variants={tokenVariants}
            >
              {token.text}
            </m.span>
          );
        })}
        {/* Blinking cursor */}
        <m.span
          className="ml-1 inline-block h-[1.2em] w-[2px] bg-white align-text-bottom opacity-50"
          animate={{ opacity: [0.7, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'anticipate',
          }}
          aria-hidden="true"
        />
      </code>
    </m.pre>
  </div>
);
