// Content pass v2: keys discovered during browser proofreading —
// testimonial authority badges, section kickers that only existed as English
// fallbacks, and two Spanish copy refinements.
// Run: node scripts/i18n/content-pass-v2.mjs
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
  en: {
    'stats.businessImpact.eyebrow': '/ BUSINESS IMPACT',
    'authority.lessonsHeaderLabel': '/ MATURITY',
    'authority.howIWorkHeaderLabel': '/ EXECUTION',
    testimonialAuthority: {
      contextLabel: 'Context',
      warrer: {
        relationship: 'Direct Architectural Sponsor',
        timeline: 'Collaborated 4 years (2014 – 2018)',
        context: 'Microfrontend core & team refinement at GiG',
      },
      braun: {
        relationship: 'Collaborative Systems Delivery',
        timeline: 'Collaborated 3 years (2015 – 2018)',
        context: 'Cross-functional API synchronization & core pipelines',
      },
      torres: {
        relationship: 'Full-Stack Collaboration Partner',
        timeline: 'Collaborated 2 years (2012 – 2014)',
        context: 'Systems integration & mobile layout primitives',
      },
      kumar: {
        relationship: 'Frontend Platform Alignment',
        timeline: 'Collaborated 4 years (2014 – 2018)',
        context: 'Platform migrations & outsource governance',
      },
      default: {
        relationship: 'Verified Technology Partner',
        timeline: 'Ongoing collaboration',
        context: 'Core platform delivery',
      },
    },
  },

  es: {
    'stats.businessImpact.eyebrow': '/ IMPACTO DE NEGOCIO',
    'authority.lessonsHeaderLabel': '/ MADUREZ',
    'authority.howIWorkHeaderLabel': '/ EJECUCIÓN',
    'about.description':
      'Mucha gente sabe escribir código de interfaz. Yo me especializo en combinar la eficiencia forjada bajo restricciones, la escala empresarial europea, la intuición de producto y la gobernanza técnica de equipos.',
    'contact.subtitle':
      '¿Listo para hablar de un proyecto, contratar a un Staff Engineer o reservar una consultoría técnica? Envía un mensaje y empecemos la conversación.',
    testimonialAuthority: {
      contextLabel: 'Contexto',
      warrer: {
        relationship: 'Patrocinador directo de arquitectura',
        timeline: '4 años de colaboración (2014 – 2018)',
        context: 'Núcleo de microfrontends y consolidación de equipos en GiG',
      },
      braun: {
        relationship: 'Entrega colaborativa de sistemas',
        timeline: '3 años de colaboración (2015 – 2018)',
        context: 'Sincronización de APIs multifuncionales y pipelines centrales',
      },
      torres: {
        relationship: 'Socio de colaboración full-stack',
        timeline: '2 años de colaboración (2012 – 2014)',
        context: 'Integración de sistemas y primitivas de maquetación móvil',
      },
      kumar: {
        relationship: 'Alineación de plataforma frontend',
        timeline: '4 años de colaboración (2014 – 2018)',
        context: 'Migraciones de plataforma y gobernanza de outsourcing',
      },
      default: {
        relationship: 'Socio tecnológico verificado',
        timeline: 'Colaboración continua',
        context: 'Entrega de plataforma central',
      },
    },
  },

  dk: {
    'stats.businessImpact.eyebrow': '/ FORRETNINGSEFFEKT',
    'authority.lessonsHeaderLabel': '/ MODENHED',
    'authority.howIWorkHeaderLabel': '/ EKSEKVERING',
    testimonialAuthority: {
      contextLabel: 'Kontekst',
      warrer: {
        relationship: 'Direkte arkitektur-sponsor',
        timeline: '4 års samarbejde (2014 – 2018)',
        context: 'Microfrontend-kerne og teamudvikling hos GiG',
      },
      braun: {
        relationship: 'Fælles systemleverance',
        timeline: '3 års samarbejde (2015 – 2018)',
        context: 'Tværfaglig API-synkronisering og kernepipelines',
      },
      torres: {
        relationship: 'Full-stack samarbejdspartner',
        timeline: '2 års samarbejde (2012 – 2014)',
        context: 'Systemintegration og mobile layout-primitiver',
      },
      kumar: {
        relationship: 'Frontend-platformafstemning',
        timeline: '4 års samarbejde (2014 – 2018)',
        context: 'Platformmigreringer og outsourcing-styring',
      },
      default: {
        relationship: 'Verificeret teknologipartner',
        timeline: 'Løbende samarbejde',
        context: 'Levering af kerneplatform',
      },
    },
  },
}

for (const [lang, patch] of Object.entries(fixes)) {
  const file = resolve(LOCALES_DIR, lang, 'translation.json')
  const data = JSON.parse(readFileSync(file, 'utf8'))
  for (const [path, value] of Object.entries(patch)) set(data, path, value)
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`content pass v2 applied → ${lang}`)
}
