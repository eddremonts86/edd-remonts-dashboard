// Content pass v3: final polish from in-browser proofreading — Danish/Spanish
// sentence case for headings & labels, remaining anglicisms, the untranslated
// DK era vector, and parallelism in the DK contact subtitle.
// Run: node scripts/i18n/content-pass-v3.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const LOCALES_DIR = resolve(import.meta.dirname, '../../src/portfolio/locales')

function set(obj, path, value) {
  const parts = path.split('.')
  let node = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (node[key] == null || typeof node[key] !== 'object') node[key] = {}
    node = node[key]
  }
  node[parts[parts.length - 1]] = value
}

const fixes = {
  es: {
    'experience.titleAccent': 'profesional',
    'contact.titleAccent': 'algo juntos',
    'stats.businessImpact.title': 'Impacto de negocio',
    'stats.businessImpact.titleAccent': 'medible',
    'stats.businessImpact.measuredOutcome': 'Resultado medido',
    'stats.businessImpact.techAction': 'Acción técnica',
    'stats.businessImpact.businessBenefit': 'Beneficio de negocio',
    'stats.businessImpact.proof': '[Ver prueba →]',
    'projects.stories.schilling.scaleLabel': 'Más de 100k líneas de código',
  },

  dk: {
    'about.description':
      'Mange kan skrive UI-kode. Jeg specialiserer mig i at kombinere effektivitet formet af begrænsninger, europæisk enterprise-skala, produktintuition og teknisk governance på tværs af teams.',
    'contact.subtitle':
      'Klar til at drøfte et projekt, ansætte en Staff Engineer eller booke teknisk rådgivning? Send en besked, og lad os starte dialogen.',
    'contact.title': 'Lad os bygge',
    'contact.titleAccent': 'noget sammen',
    'contact.params.geo.label': 'PLACERING & ARBEJDSFORM',
    'experience.titleAccent': 'erfaring & historie',
    'experience.eras.0.vector':
      'Design-system governance · Monorepos · Afkoblede kontrakter · API-design',
    'stats.businessImpact.titleAccent': 'forretningsresultater',
    'stats.businessImpact.measuredOutcome': 'Målt resultat',
    'stats.businessImpact.techAction': 'Teknisk handling',
    'stats.businessImpact.proof': '[Se bevis →]',
    'stats.impactCards.shipping.title': 'Hurtigere levering',
    'stats.impactCards.latency.title': 'Interaktionslatens',
    'projects.stories.schilling.scaleLabel': '100k+ linjer kode',
  },
}

for (const [lang, patch] of Object.entries(fixes)) {
  const file = resolve(LOCALES_DIR, lang, 'translation.json')
  const data = JSON.parse(readFileSync(file, 'utf8'))
  for (const [path, value] of Object.entries(patch)) set(data, path, value)
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`content pass v3 applied → ${lang}`)
}
