// One-shot merge of Build Log i18n keys into en/es/dk translation files.
// Run: node scripts/i18n/merge-buildlog-keys.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const LOCALES_DIR = resolve(import.meta.dirname, '../../src/portfolio/locales')

const patches = {
  en: {
    nav: { log: 'Build Log' },
    log: {
      kicker: 'Learning In Public',
      title: 'Build Log.',
      accent: 'Shipped, not staged.',
      description:
        'A curated cut of this repo’s real commit history — what shipped, what it taught me, and the tools that did it. Every hash links to the diff.',
      viewAll: 'Full history on GitHub',
      entries: {
        v3: {
          title: 'Shipped the cinematic v3 — ink shader, The Lab, ⌘K palette',
          learning:
            'A 6KB hand-rolled fragment shader beats a 150KB 3D library when performance is the brand.',
        },
        spec: {
          title: 'Wrote the design spec before touching code',
          learning:
            'Deciding what NOT to add (three.js) was the most valuable line in the document.',
        },
        grid: {
          title: 'Cinematic grid motifs and dynamic overlays',
          learning:
            'Atmosphere comes from layered subtlety — grain, vignette, hairlines — not from louder colors.',
        },
        a11y: {
          title: 'Accessibility pass across portfolio components',
          learning: 'Motion you can switch off is craft; motion you cannot is decoration.',
        },
        i18n: {
          title: 'Internationalized every section — EN / ES / DK',
          learning:
            'Copy is a design material: translating it forces you to find the actual sentence.',
        },
        v2: {
          title: 'Site v2 — the portfolio became a database-driven product',
          learning:
            'Eating my own dog food: the dashboard that manages this site is itself the case study.',
        },
      },
    },
  },

  es: {
    nav: { log: 'Bitácora' },
    log: {
      kicker: 'Aprendiendo en público',
      title: 'Bitácora.',
      accent: 'Enviado, no maquetado.',
      description:
        'Un corte curado del historial real de commits de este repo: qué se envió, qué me enseñó y con qué herramientas. Cada hash enlaza al diff.',
      viewAll: 'Historial completo en GitHub',
      entries: {
        v3: {
          title: 'Lancé la v3 cinematográfica: shader de tinta, el Laboratorio y paleta ⌘K',
          learning:
            'Un fragment shader de 6KB hecho a mano gana a una librería 3D de 150KB cuando el rendimiento es la marca.',
        },
        spec: {
          title: 'Escribí el spec de diseño antes de tocar código',
          learning: 'Decidir qué NO añadir (three.js) fue la línea más valiosa del documento.',
        },
        grid: {
          title: 'Tramas cinematográficas y overlays dinámicos',
          learning:
            'La atmósfera nace de sutilezas en capas — grano, viñeta, líneas finas — no de colores más fuertes.',
        },
        a11y: {
          title: 'Pasada de accesibilidad por todos los componentes',
          learning: 'El movimiento que se puede apagar es oficio; el que no, es decoración.',
        },
        i18n: {
          title: 'Internacionalicé cada sección — EN / ES / DK',
          learning:
            'El copy es material de diseño: traducirlo te obliga a encontrar la frase de verdad.',
        },
        v2: {
          title: 'Site v2: el portafolio se volvió un producto sobre base de datos',
          learning:
            'Como mi propia comida de perro: el dashboard que gestiona este sitio es en sí el caso de estudio.',
        },
      },
    },
  },

  dk: {
    nav: { log: 'Byggelog' },
    log: {
      kicker: 'Lærer i det åbne',
      title: 'Byggelog.',
      accent: 'Leveret, ikke iscenesat.',
      description:
        'Et kurateret udsnit af repoets virkelige commit-historik — hvad der blev leveret, hvad det lærte mig, og hvilke værktøjer der gjorde det. Hver hash linker til diffen.',
      viewAll: 'Fuld historik på GitHub',
      entries: {
        v3: {
          title: 'Leverede den filmiske v3 — blæk-shader, Laboratoriet og ⌘K-paletten',
          learning:
            'En håndskrevet fragment shader på 6KB slår et 3D-bibliotek på 150KB, når performance er brandet.',
        },
        spec: {
          title: 'Skrev design-specifikationen før koden',
          learning:
            'At beslutte hvad der IKKE skulle med (three.js) var dokumentets mest værdifulde linje.',
        },
        grid: {
          title: 'Filmiske grid-motiver og dynamiske overlays',
          learning:
            'Atmosfære kommer fra lagdelt subtilitet — korn, vignet, hårfine linjer — ikke fra stærkere farver.',
        },
        a11y: {
          title: 'Tilgængeligheds-gennemgang af alle komponenter',
          learning: 'Bevægelse man kan slå fra er håndværk; bevægelse man ikke kan, er dekoration.',
        },
        i18n: {
          title: 'Internationaliserede hver sektion — EN / ES / DK',
          learning:
            'Tekst er designmateriale: at oversætte den tvinger dig til at finde den rigtige sætning.',
        },
        v2: {
          title: 'Site v2 — portfolioet blev et databasedrevet produkt',
          learning: 'Egen medicin: dashboardet der styrer dette site er i sig selv casestudiet.',
        },
      },
    },
  },
}

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = deepMerge(
        target[key] && typeof target[key] === 'object' ? target[key] : {},
        value,
      )
    } else {
      target[key] = value
    }
  }
  return target
}

for (const [lang, patch] of Object.entries(patches)) {
  const file = resolve(LOCALES_DIR, lang, 'translation.json')
  const current = JSON.parse(readFileSync(file, 'utf8'))
  writeFileSync(file, `${JSON.stringify(deepMerge(current, patch), null, 2)}\n`)
  console.log(`merged build-log keys → ${lang}/translation.json`)
}
