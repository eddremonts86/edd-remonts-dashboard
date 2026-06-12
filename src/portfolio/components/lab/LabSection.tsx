import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeInView } from '@/portfolio/lib/motion'
import { Container, Section } from '../ui/layout/Section'
import { SectionSlate } from '../ui/layout/SectionSlate'
import { ExhibitCard } from './ExhibitCard'
import { CodeCinema } from './exhibits/CodeCinema'
import { InkStudy } from './exhibits/InkStudy'
import { MagneticField } from './exhibits/MagneticField'
import { ScrambleStudy } from './exhibits/ScrambleStudy'
import { SpringLab } from './exhibits/SpringLab'

/**
 * The Lab — a living playground. Every exhibit is a real, working artifact
 * built for this site (no mockups, no videos): the point is judgment you can
 * touch. Per the "new portfolio" thesis: demos over decks.
 */
export const LabSection = () => {
  const { t } = useTranslation()

  return (
    <Section id="lab">
      <Container>
        <SectionSlate
          reel={3}
          kicker={t('lab.kicker', 'Interaction Studies')}
          title={t('lab.title', 'The Lab.')}
          accent={t('lab.accent', 'Touch the work.')}
          description={t(
            'lab.description',
            'Live experiments, hand-built for this page — no videos, no libraries behind the curtain. Drag the sliders, push the dots, launch the puck. This is how I explore before I ship.',
          )}
        />

        <div className="grid gap-5 md:grid-cols-6">
          <ExhibitCard
            index={1}
            title={t('lab.exhibits.ink.title', 'Ink Study')}
            goal={t(
              'lab.exhibits.ink.goal',
              'A cinematic background should cost one draw call, not a 3D library.',
            )}
            tools={['WebGL', 'GLSL', 'React', 'Claude Code']}
            className="md:col-span-3"
          >
            <InkStudy />
          </ExhibitCard>

          <ExhibitCard
            index={2}
            title={t('lab.exhibits.spring.title', 'Spring Lab')}
            goal={t(
              'lab.exhibits.spring.goal',
              'Every duration on this site is a tuned spring — here is the tuning bench.',
            )}
            tools={['Framer Motion', 'React', 'TypeScript']}
            className="md:col-span-3"
          >
            <SpringLab />
          </ExhibitCard>

          <ExhibitCard
            index={3}
            title={t('lab.exhibits.magnet.title', 'Magnetic Field')}
            goal={t(
              'lab.exhibits.magnet.goal',
              '54 dots, one rAF loop, zero React re-renders while you play.',
            )}
            tools={['rAF', 'Spring physics', 'TypeScript']}
            className="md:col-span-3 lg:col-span-2"
            demoClassName="cursor-crosshair"
          >
            <MagneticField />
          </ExhibitCard>

          <ExhibitCard
            index={4}
            title={t('lab.exhibits.scramble.title', 'Decoder')}
            goal={t(
              'lab.exhibits.scramble.goal',
              'The nav-link scramble effect, isolated so you can feed it anything.',
            )}
            tools={['rAF', 'React hooks']}
            className="md:col-span-3 lg:col-span-2"
          >
            <ScrambleStudy />
          </ExhibitCard>

          <m.aside
            {...fadeInView({ delay: 0.16, distance: 24 })}
            className="pf-accent-panel flex flex-col justify-between gap-6 p-6 md:col-span-6 lg:col-span-2"
          >
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                {t('lab.notes.kicker', 'Lab Notes')}
              </p>
              <p className="font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
                {t(
                  'lab.notes.body',
                  'A playground will not get you the job. It gets you the conversation — and the conversation is the job interview now.',
                )}
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
              {t('lab.notes.footer', 'New exhibits land here first. Press ⌘K anywhere.')}
            </p>
          </m.aside>

          <ExhibitCard
            index={5}
            title={t('lab.exhibits.code.title', 'Code Cinema')}
            goal={t(
              'lab.exhibits.code.goal',
              'A title sequence for source code — tokenized, staggered, and honest about being theatre.',
            )}
            tools={['Framer Motion', 'React', 'Design tokens']}
            className="md:col-span-6"
          >
            <CodeCinema />
          </ExhibitCard>
        </div>
      </Container>
    </Section>
  )
}
