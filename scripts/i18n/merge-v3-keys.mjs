// One-shot merge of portfolio v3 i18n keys into en/es/dk translation files.
// Run: node scripts/i18n/merge-v3-keys.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const LOCALES_DIR = resolve(import.meta.dirname, '../../src/portfolio/locales')

const patches = {
  en: {
    nav: { lab: 'The Lab' },
    hero: {
      tagline:
        '18 years shipping interfaces where the proof is measurable — 100% Core Web Vitals, sub-12ms interactions, design systems adopted by 20+ engineers.',
      taglineAccent: 'Everything below is live. Touch it.',
      enterLab: 'Enter the Lab',
    },
    projects: {
      title: 'Product Stories',
      titleAccent: 'Not Project Cards.',
      description:
        'Narratives tracking the context, technological hurdles, system architectures, and metrics behind three major digital platforms.',
    },
    lab: {
      kicker: 'Interaction Studies',
      title: 'The Lab.',
      accent: 'Touch the work.',
      description:
        'Live experiments, hand-built for this page — no videos, no libraries behind the curtain. Drag the sliders, push the dots, launch the puck. This is how I explore before I ship.',
      goalLabel: 'Goal',
      toolsLabel: 'Tools used',
      notes: {
        kicker: 'Lab Notes',
        body: 'A playground will not get you the job. It gets you the conversation — and the conversation is the job interview now.',
        footer: 'New exhibits land here first. Press ⌘K anywhere.',
      },
      exhibits: {
        ink: {
          title: 'Ink Study',
          goal: 'A cinematic background should cost one draw call, not a 3D library.',
        },
        spring: {
          title: 'Spring Lab',
          goal: 'Every duration on this site is a tuned spring — here is the tuning bench.',
          chamberLabel: 'Spring chamber — click to launch the puck',
          hint: 'click anywhere — the puck obeys your spring',
        },
        magnet: {
          title: 'Magnetic Field',
          goal: '54 dots, one rAF loop, zero React re-renders while you play.',
          fieldLabel: 'Magnetic dot field — move your cursor through it',
        },
        scramble: {
          title: 'Decoder',
          goal: 'The nav-link scramble effect, isolated so you can feed it anything.',
          sample: 'craft is judgment made visible',
          placeholder: 'Type a phrase…',
          inputLabel: 'Phrase to scramble',
          action: 'Decode',
        },
        code: {
          title: 'Code Cinema',
          goal: 'A title sequence for source code — tokenized, staggered, and honest about being theatre.',
        },
      },
    },
    palette: {
      title: 'Command palette',
      placeholder: 'Type a command — or try "sudo"…',
      goto: 'Go to',
      themeLight: 'Switch to light — roll credits',
      themeDark: 'Switch to dark — kill the lights',
      language: 'Language',
      cv: 'Download CV',
      copyUrl: 'Copy site URL',
      copied: 'Copied — share it somewhere nice.',
      source: 'View source — this site is a project too',
      teapot: "HTTP 418 — I'm a teapot. Try the contact form instead.",
      whoami: 'eduardo — staff frontend engineer. uptime: 18 years. no zombie processes.',
      empty: 'command not found — but nice try',
      footerHint: '↑↓ navigate · ↵ run',
    },
    preloader: {
      role: 'A Living Portfolio',
      skip: 'Loading — click to skip',
      boot: {
        renderer: 'init renderer',
        fonts: 'load typefaces — cinzel, epilogue',
        shader: 'compile ink shader — 1 draw call',
        content: 'hydrate evidence',
        action: 'roll camera',
      },
    },
    footer: { paletteHint: 'Psst — press ⌘K. There are commands in here.' },
  },

  es: {
    nav: { lab: 'El Laboratorio' },
    hero: {
      tagline:
        '18 años construyendo interfaces donde la prueba es medible: 100% Core Web Vitals, interacciones por debajo de 12 ms y design systems adoptados por más de 20 ingenieros.',
      taglineAccent: 'Todo lo que sigue está vivo. Tócalo.',
      enterLab: 'Entrar al laboratorio',
    },
    projects: {
      title: 'Historias de producto',
      titleAccent: 'No tarjetas de proyecto.',
      description:
        'Narrativas que recorren el contexto, los retos técnicos, las arquitecturas y las métricas detrás de tres grandes plataformas digitales.',
    },
    lab: {
      kicker: 'Estudios de interacción',
      title: 'El Laboratorio.',
      accent: 'Toca el trabajo.',
      description:
        'Experimentos vivos, construidos a mano para esta página: sin vídeos ni librerías tras el telón. Mueve los sliders, empuja los puntos, lanza el disco. Así exploro antes de lanzar.',
      goalLabel: 'Objetivo',
      toolsLabel: 'Herramientas',
      notes: {
        kicker: 'Notas de laboratorio',
        body: 'Un playground no te consigue el trabajo. Te consigue la conversación — y la conversación es la nueva entrevista.',
        footer: 'Los experimentos nuevos aterrizan aquí primero. Pulsa ⌘K donde quieras.',
      },
      exhibits: {
        ink: {
          title: 'Estudio de tinta',
          goal: 'Un fondo cinematográfico debería costar una sola draw call, no una librería 3D.',
        },
        spring: {
          title: 'Spring Lab',
          goal: 'Cada duración de este sitio es un muelle afinado: este es el banco de pruebas.',
          chamberLabel: 'Cámara de muelles: haz clic para lanzar el disco',
          hint: 'haz clic donde quieras: el disco obedece a tu muelle',
        },
        magnet: {
          title: 'Campo magnético',
          goal: '54 puntos, un solo bucle rAF y cero re-renders de React mientras juegas.',
          fieldLabel: 'Campo de puntos magnéticos: mueve el cursor a través de él',
        },
        scramble: {
          title: 'Decodificador',
          goal: 'El efecto scramble de la navegación, aislado para que lo alimentes con lo que quieras.',
          sample: 'el oficio es criterio hecho visible',
          placeholder: 'Escribe una frase…',
          inputLabel: 'Frase a decodificar',
          action: 'Decodificar',
        },
        code: {
          title: 'Cine de código',
          goal: 'Una secuencia de títulos para código fuente: tokenizada, escalonada y honesta sobre ser teatro.',
        },
      },
    },
    palette: {
      title: 'Paleta de comandos',
      placeholder: 'Escribe un comando — o prueba "sudo"…',
      goto: 'Ir a',
      themeLight: 'Cambiar a claro — que rueden los créditos',
      themeDark: 'Cambiar a oscuro — apaga las luces',
      language: 'Idioma',
      cv: 'Descargar CV',
      copyUrl: 'Copiar URL del sitio',
      copied: 'Copiado — compártelo en un buen sitio.',
      source: 'Ver código fuente — este sitio también es un proyecto',
      teapot: 'HTTP 418 — Soy una tetera. Mejor usa el formulario de contacto.',
      whoami: 'eduardo — staff frontend engineer. uptime: 18 años. sin procesos zombi.',
      empty: 'comando no encontrado — buen intento',
      footerHint: '↑↓ navegar · ↵ ejecutar',
    },
    preloader: {
      role: 'Un portafolio vivo',
      skip: 'Cargando — haz clic para saltar',
      boot: {
        renderer: 'iniciando renderer',
        fonts: 'cargando tipografías — cinzel, epilogue',
        shader: 'compilando shader de tinta — 1 draw call',
        content: 'hidratando evidencia',
        action: 'cámara… acción',
      },
    },
    footer: { paletteHint: 'Psst — pulsa ⌘K. Aquí dentro hay comandos.' },
  },

  dk: {
    nav: { lab: 'Laboratoriet' },
    hero: {
      tagline:
        '18 år med interfaces, hvor beviset kan måles — 100% Core Web Vitals, interaktioner under 12 ms og designsystemer brugt af 20+ ingeniører.',
      taglineAccent: 'Alt herunder er levende. Rør ved det.',
      enterLab: 'Ind i laboratoriet',
    },
    projects: {
      title: 'Produkthistorier',
      titleAccent: 'Ikke projektkort.',
      description:
        'Fortællinger om kontekst, tekniske udfordringer, arkitekturer og metrikker bag tre store digitale platforme.',
    },
    lab: {
      kicker: 'Interaktionsstudier',
      title: 'Laboratoriet.',
      accent: 'Rør ved arbejdet.',
      description:
        'Levende eksperimenter, håndbygget til denne side — ingen videoer, ingen skjulte biblioteker. Træk i sliderne, skub til prikkerne, affyr pucken. Sådan udforsker jeg, før jeg shipper.',
      goalLabel: 'Mål',
      toolsLabel: 'Værktøjer',
      notes: {
        kicker: 'Lab-noter',
        body: 'En playground skaffer dig ikke jobbet. Den skaffer dig samtalen — og samtalen er den nye jobsamtale.',
        footer: 'Nye eksperimenter lander her først. Tryk ⌘K hvor som helst.',
      },
      exhibits: {
        ink: {
          title: 'Blækstudie',
          goal: 'En filmisk baggrund bør koste ét draw call, ikke et 3D-bibliotek.',
        },
        spring: {
          title: 'Fjeder-lab',
          goal: 'Hver varighed på dette site er en afstemt fjeder — her er prøvebænken.',
          chamberLabel: 'Fjederkammer — klik for at affyre pucken',
          hint: 'klik hvor som helst — pucken adlyder din fjeder',
        },
        magnet: {
          title: 'Magnetfelt',
          goal: '54 prikker, én rAF-løkke og nul React re-renders, mens du leger.',
          fieldLabel: 'Magnetisk prikfelt — bevæg markøren igennem det',
        },
        scramble: {
          title: 'Dekoder',
          goal: 'Navigationens scramble-effekt, isoleret så du kan fodre den med hvad som helst.',
          sample: 'håndværk er synlig dømmekraft',
          placeholder: 'Skriv en sætning…',
          inputLabel: 'Sætning der skal dekodes',
          action: 'Afkod',
        },
        code: {
          title: 'Kodebiograf',
          goal: 'En titelsekvens for kildekode — tokeniseret, forskudt og ærlig omkring at være teater.',
        },
      },
    },
    palette: {
      title: 'Kommandopalet',
      placeholder: 'Skriv en kommando — eller prøv "sudo"…',
      goto: 'Gå til',
      themeLight: 'Skift til lys — rul krediteringerne',
      themeDark: 'Skift til mørk — sluk lyset',
      language: 'Sprog',
      cv: 'Download CV',
      copyUrl: 'Kopiér sitets URL',
      copied: 'Kopieret — del det et godt sted.',
      source: 'Se kildekoden — dette site er også et projekt',
      teapot: 'HTTP 418 — Jeg er en tepotte. Prøv kontaktformularen i stedet.',
      whoami: 'eduardo — staff frontend engineer. uptime: 18 år. ingen zombieprocesser.',
      empty: 'kommando ikke fundet — men godt forsøgt',
      footerHint: '↑↓ navigér · ↵ kør',
    },
    preloader: {
      role: 'Et levende portfolio',
      skip: 'Indlæser — klik for at springe over',
      boot: {
        renderer: 'initialiserer renderer',
        fonts: 'indlæser skrifttyper — cinzel, epilogue',
        shader: 'kompilerer blæk-shader — 1 draw call',
        content: 'hydrerer beviser',
        action: 'kamera kører',
      },
    },
    footer: { paletteHint: 'Psst — tryk ⌘K. Der er kommandoer herinde.' },
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
  const merged = deepMerge(current, patch)
  writeFileSync(file, `${JSON.stringify(merged, null, 2)}\n`)
  console.log(`merged v3 keys → ${lang}/translation.json`)
}
