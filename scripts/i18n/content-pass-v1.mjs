// Trilingual content pass (2026-06-12): fixes factual inconsistencies
// (42% vs 94% bundle cut, Schilling described as real-estate), grammar and
// idiom errors (es: "Slasheé", "acoplables", "composibles"; dk: "Coordinerede",
// "Minimererede", "Uppetid"), translates previously hardcoded UI copy
// (skills layers, projects registry), and normalizes sentence case in es/dk.
// Run: node scripts/i18n/content-pass-v1.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const LOCALES_DIR = resolve(import.meta.dirname, '../../src/portfolio/locales')

/** Assign `value` at dotted `path` (numeric segments index into arrays). */
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
    // ── Factual consistency: 6.2MB → 350KB is a 94% cut, not 42% ──
    'hero.metrics.bundle.value': '94%',
    'about.advantages.2.bullets.1':
      'I slashed initial load payloads by 94% while raising delivery speeds by 30% across cross-functional engineering units.',
    'projects.stories.outcomePayload': '94% Payload Reduction [6.2MB → 350KB]',
    'projects.stories.schilling.impactLabel': '94% Bundle Cut',
    'stats.impactCards.payload.metric': '94%',
    'stats.impactCards.throughput.metric': '98/100',
    'stats.impactCards.throughput.title': 'Sustained Performance',
    // ── Factual: Schilling is publishing SaaS, not real estate ──
    'experience.items.12.description':
      'Leading frontend development for Schilling web applications and data products, working with React 18/19, TypeScript, Node.js, Tailwind and Shadcn UI to scale complex publishing workflows.',
    // ── Copy polish ──
    'about.description':
      'Many can write UI code. I specialize in combining constraint-forged efficiency, European enterprise scale, product intuition, and team-wide technical governance.',
    'contact.subtitle':
      "Ready to discuss a project, hire a staff engineer, or book technical consulting? Send a message and let's start a conversation.",
    'contact.form.namePlaceholder': 'Jane Doe',
    'contact.form.emailPlaceholder': 'jane@example.com',
    'footer.builtWith': 'Engineered with React 19, hand-rolled WebGL & editorial minimalism.',
    'palette.copied': 'URL copied — ready to share.',
    // ── Skills section (previously hardcoded in the component) ──
    'skills.title': { architectural: 'Architectural', capabilities: 'Capabilities' },
    'skills.kicker': '/ TECHNICAL EXPERTISE',
    'skills.capabilityLabel': 'Capability',
    'skills.valueProof': '/ VALUE PROOF',
    'skills.description':
      'Technologies are commodities; architectural alignment and organizational governance are competitive differentiators. Here is how my capabilities are marshaled to deliver verified business speed and performance stability.',
    'skills.layers': {
      governance: {
        name: 'Architecture & Governance',
        annot: '/ WORKSPACE SYSTEMS',
        items: ['Monorepo Boundaries', 'Design-System Contracts', 'Decoupled Modules'],
        rationale:
          'Enables distributed product teams to release features independently without breaking shared core architectures.',
      },
      performance: {
        name: 'Performance Engineering',
        annot: '/ LATENCY & CONVERSION',
        items: ['Interaction Latency', 'Optimistic State Sync', 'Core Web Vitals'],
        rationale:
          'Secures perfect Core Web Vitals and sub-12ms interaction responsiveness for enterprise-scale platforms.',
      },
      leadership: {
        name: 'Technical Leadership',
        annot: '/ ORG SYNCHRONIZATION',
        items: ['Developer Experience', 'Active Mentorship', 'Automated Quality Gates'],
        rationale:
          'Accelerates feature-delivery cycles by 30% across 20+ active engineers via active mentorship.',
      },
      product: {
        name: 'Product Systems Alignment',
        annot: '/ FULL-STACK STRATEGY',
        items: ['Domain Modeling', 'Stakeholder Coordination', 'State & Cache Contracts'],
        rationale:
          'Bridges execution gaps between engineering teams, product managers, and executive stakeholders.',
      },
    },
    // ── Projects registry (previously hardcoded) ──
    'projects.registry': {
      kicker: '/ ADDITIONAL PROJECTS',
      title: 'Additional Projects',
      description:
        'Explore additional product features, tools, and legacy software systems engineered throughout my career.',
      aria: 'Additional projects registry',
      colIndex: 'Index',
      colProject: 'Project / Scope',
      colCategory: 'Category',
      colVector: 'Architectural Vector',
      colInspect: 'Inspect',
    },
    'projects.empty': 'No projects found for this filter yet.',
  },

  es: {
    // ── Consistencia factual 94% ──
    'hero.metrics.bundle.value': '94%',
    'hero.metrics.bundle.label': 'Reducción de bundle',
    'hero.metrics.delivery.label': 'Entrega más rápida',
    'hero.metrics.impact.label': 'Ingenieros impactados',
    'hero.metrics.impact.desc':
      'Alineé equipos, lideré la gobernanza de sistemas de diseño y mentoricé a ingenieros.',
    'about.advantages.2.bullets.1':
      'Reduje el peso de la carga útil inicial en un 94% y aceleré las velocidades de entrega en un 30% en múltiples unidades de ingeniería.',
    'projects.stories.outcomePayload': 'Reducción de bundle del 94% [6.2MB → 350KB]',
    'projects.stories.schilling.impactLabel': 'Corte de bundle del 94%',
    'stats.impactCards.payload.metric': '94%',
    'stats.impactCards.payload.title': 'Reducción de bundle',
    'stats.impactCards.shipping.title': 'Entregas más rápidas',
    'stats.impactCards.latency.title': 'Latencia de interacción',
    'stats.impactCards.throughput.metric': '98/100',
    'stats.impactCards.throughput.title': 'Rendimiento sostenido',
    // ── Factual: Schilling es SaaS editorial ──
    'experience.items.12.description':
      'Liderando el desarrollo frontend para las aplicaciones web y productos de datos de Schilling, trabajando con React 18/19, TypeScript, Node.js, Tailwind y Shadcn UI para escalar flujos de trabajo editoriales complejos.',
    // ── Errores de idioma ──
    'about.advantages.2.bullets.2':
      'Establecí límites modulares estrictos para mantener los sistemas limpios, testeables y altamente componibles.',
    'about.features.0.description':
      'Me muevo con soltura en entornos multifuncionales, tendiendo puentes entre product managers, diseñadores UI/UX e ingenieros de backend para garantizar una entrega alineada.',
    'experience.items.4.description':
      'Fundé Viruta Studio Creativo y desarrollé productos a medida para organizaciones y medios de comunicación locales, incluyendo sitios como Radio Guamá, usando PHP, MySQL, PostgreSQL, Joomla, Drupal, Bootstrap y Ext JS.',
    'experience.eras.0.contributions.2':
      '**Mentoricé a squads de ingeniería multifuncionales**, alineando estándares de código e implementando estrictos filtros de calidad en CI/CD.',
    'projects.stories.outcomeDeduplicationDesc':
      'Los limitadores de renderizado sobre DOM virtualizado evitaron la saturación del cliente y recortaron los costes de servidor.',
    'projects.stories.edd-remonts.businessImpact':
      'Recorté el tráfico de sockets en un 60%, reduje los costes de infraestructura y aseguré una puntuación perfecta de 98 en Lighthouse, manteniendo 60 fps estables incluso con flujos de más de 500 actualizaciones por segundo.',
    'projects.stories.edd-remonts.tradeoffsChosen':
      'Sincronización optimista de estado acoplada a un limitador de 150 ms sobre el DOM virtualizado para contener el consumo de CPU.',
    'authority.lessons.0.title': 'La arquitectura son personas',
    'authority.lessons.4.title': 'Los mejores sistemas son aburridos',
    'authority.lessons.4.body':
      'Los patrones predecibles, estables y desacoplados superan a las novedades emocionantes pero frágiles. La ejecución predecible del software es el mejor indicador de la madurez de una organización.',
    'log.entries.v2.learning':
      'Dogfooding de verdad: el dashboard que gestiona este sitio es, en sí mismo, el caso de estudio.',
    'codeShowcase.principles.patterns.sub': 'Módulos componibles y tree-shakeable',
    'codeShowcase.principles.dx.title': 'Experiencia de desarrollo',
    'services.0.description':
      'No solo construyo sitios web; diseño ecosistemas digitales interactivos. Con React, Next.js y Framer Motion entrego aplicaciones que cargan en menos de un segundo, con animaciones a 60 fps y una precisión de UX innegociable.',
    'cv.summary':
      'Ingeniero orientado a frontend con raíces full-stack y casi dos décadas de experiencia desde 2007. Construyo productos web escalables que convierten reglas de negocio complejas en interfaces rápidas e intuitivas.',
    'cv.intro':
      'Entiendo toda la cadena de entrega, colaboro con naturalidad con producto, diseño y backend, y construyo interfaces que siguen siendo mantenibles a medida que el producto crece. Abrazo la refactorización arquitectónica y mantengo el stack, la cobertura de pruebas y los pipelines de CI/CD al día.',
    // ── Naturalidad y uso de mayúsculas (el español usa caja de oración) ──
    'hero.scroll': 'Desliza',
    'contact.eyebrow': '/ HABLEMOS',
    'contact.sendMsg': 'Enviar un mensaje',
    'contact.form.name': 'Tu nombre',
    'contact.form.email': 'Tu correo electrónico',
    'contact.form.message': 'Detalles del proyecto…',
    'contact.form.namePlaceholder': 'Ana García',
    'contact.form.emailPlaceholder': 'ana@ejemplo.com',
    'contact.form.send': 'Enviar mensaje',
    'contact.form.target': 'Iniciar conexión',
    'contact.success.title': 'Mensaje enviado',
    'contact.success.reset': 'Enviar otro',
    'contact.info.title': 'Detalles de contacto',
    'contact.info.emailLabel': 'Correo electrónico',
    'stats.yearsExperience': 'Años de experiencia',
    'stats.usersServed': 'Usuarios atendidos',
    'stats.migrations': 'Migraciones entregadas',
    'stats.teamsLed': 'Equipos liderados',
    'footer.builtWith': 'Construido con React 19, WebGL hecho a mano y minimalismo editorial.',
    'palette.copied': 'URL copiada — lista para compartir.',
    // ── Skills (antes hardcodeado en inglés) ──
    'skills.title': { architectural: 'Capacidades', capabilities: 'arquitectónicas' },
    'skills.kicker': '/ EXPERIENCIA TÉCNICA',
    'skills.capabilityLabel': 'Capacidad',
    'skills.valueProof': '/ PRUEBA DE VALOR',
    'skills.description':
      'Las tecnologías son commodities; la alineación arquitectónica y la gobernanza organizativa son las verdaderas ventajas competitivas. Así se organizan mis capacidades para entregar velocidad y estabilidad verificadas.',
    'skills.layers': {
      governance: {
        name: 'Arquitectura y gobernanza',
        annot: '/ SISTEMAS DE WORKSPACE',
        items: ['Límites de monorepo', 'Contratos de design system', 'Módulos desacoplados'],
        rationale:
          'Permite a equipos distribuidos lanzar funcionalidades de forma independiente sin romper la arquitectura compartida.',
      },
      performance: {
        name: 'Ingeniería de rendimiento',
        annot: '/ LATENCIA Y CONVERSIÓN',
        items: ['Latencia de interacción', 'Sincronización optimista', 'Core Web Vitals'],
        rationale:
          'Asegura Core Web Vitals perfectos y respuestas por debajo de 12 ms en plataformas de escala empresarial.',
      },
      leadership: {
        name: 'Liderazgo técnico',
        annot: '/ SINCRONIZACIÓN ORGANIZATIVA',
        items: ['Experiencia de desarrollo', 'Mentoría activa', 'Quality gates automatizados'],
        rationale:
          'Acelera los ciclos de entrega un 30% en equipos de más de 20 ingenieros mediante mentoría activa.',
      },
      product: {
        name: 'Alineación producto-sistemas',
        annot: '/ ESTRATEGIA FULL-STACK',
        items: [
          'Modelado de dominio',
          'Coordinación con stakeholders',
          'Contratos de estado y caché',
        ],
        rationale:
          'Cierra las brechas de ejecución entre ingeniería, product managers y dirección.',
      },
    },
    'projects.registry': {
      kicker: '/ PROYECTOS ADICIONALES',
      title: 'Más proyectos',
      description:
        'Explora otras funcionalidades de producto, herramientas y sistemas heredados construidos a lo largo de mi carrera.',
      aria: 'Registro de proyectos adicionales',
      colIndex: 'Índice',
      colProject: 'Proyecto / Alcance',
      colCategory: 'Categoría',
      colVector: 'Vector arquitectónico',
      colInspect: 'Inspeccionar',
    },
    'projects.empty': 'Aún no hay proyectos para este filtro.',
  },

  dk: {
    // ── Faktuel konsistens 94% ──
    'hero.metrics.title': '/ VERIFICEREDE YDEEVNEMETRIKKER',
    'hero.metrics.bundle.value': '94%',
    'hero.metrics.bundle.label': 'Bundle-reduktion',
    'hero.metrics.delivery.label': 'Hurtigere levering',
    'hero.metrics.impact.label': 'Udviklere påvirket',
    'about.advantages.2.bullets.1':
      'Jeg reducerede den indledende payload med 94% og øgede samtidig leveringshastigheden med 30% på tværs af teams.',
    'projects.stories.outcomePayload': '94% payload-reduktion [6.2MB → 350KB]',
    'projects.stories.schilling.impactLabel': '94% payload-reduktion',
    'stats.impactCards.payload.metric': '94%',
    'stats.impactCards.throughput.metric': '98/100',
    'stats.impactCards.throughput.title': 'Stabil ydeevne',
    // ── Faktuelt: Schilling er forlags-SaaS ──
    'experience.items.12.description':
      'Leder frontend-udviklingen af Schillings webapplikationer og dataprodukter, med fokus på React 18/19, TypeScript, Node.js, Tailwind og Shadcn UI til at skalere komplekse publicerings-workflows.',
    // ── Sprogfejl ──
    'experience.items.2.description':
      "Udviklede statistiske og administrative løsninger for ONEI's provinskontor med PHP, MySQL, HTML, CSS, Ext JS, Drupal og Joomla.",
    'experience.eras.0.contributions.0':
      '**Ledte den modulære adskillelse** af en 6.2MB legacy console-platform i uafhængige underapp-partitioner.',
    'experience.eras.1.contributions.2':
      '**Koordinerede mere end 12 udviklere** i agile sprints, ledte kode-audits og sikrede strenge SLAs for ydeevne.',
    'experience.eras.1.outcomes.0':
      '**Minimerede server-socket forespørgselsomkostninger med 60%** ved at optimere datatrafikken.',
    'experience.eras.2.contributions.1':
      '**Udviklede urokkelige vaner for kodehygiejne** og talte hver eneste byte for at sikre øjeblikkelig indlæsning på langsomme netværk.',
    'stats.usersServed': 'Brugere betjent',
    // ── Naturlighed og dansk sætningskasus ──
    'hero.availability.engagement.label': 'ARBEJDSFORM',
    'contact.eyebrow': '/ TAG KONTAKT',
    'contact.sendMsg': 'Send en besked',
    'contact.form.name': 'Dit navn',
    'contact.form.email': 'Din e-mail',
    'contact.form.message': 'Projektdetaljer…',
    'contact.form.namePlaceholder': 'Mette Hansen',
    'contact.form.emailPlaceholder': 'mette@eksempel.dk',
    'contact.form.send': 'Send besked',
    'contact.form.target': 'Start forbindelsen',
    'contact.success.title': 'Besked sendt',
    'contact.success.reset': 'Send en ny',
    'contact.info.title': 'Kontaktinformation',
    'footer.builtWith': 'Bygget med React 19, håndskrevet WebGL og redaktionel minimalisme.',
    'palette.copied': 'URL kopieret — klar til at dele.',
    // ── Skills (var hardcodet på engelsk; skills.title var aldrig oversat) ──
    'skills.title': { architectural: 'Arkitektoniske', capabilities: 'kompetencer' },
    'skills.subtitle':
      'De kernesystemer jeg bruger til at levere robuste produkt-interfaces. Bredden hentes frem efter behov, ikke på forhånd.',
    'skills.kicker': '/ TEKNISK EKSPERTISE',
    'skills.capabilityLabel': 'Kompetence',
    'skills.valueProof': '/ VÆRDIBEVIS',
    'skills.description':
      'Teknologier er hyldevarer; arkitektonisk afstemning og organisatorisk governance er de reelle konkurrencefordele. Sådan organiserer jeg mine kompetencer for at levere målbar hastighed og stabilitet.',
    'skills.layers': {
      governance: {
        name: 'Arkitektur & governance',
        annot: '/ WORKSPACE-SYSTEMER',
        items: ['Monorepo-grænser', 'Design-system-kontrakter', 'Afkoblede moduler'],
        rationale:
          'Lader distribuerede produktteams udrulle funktioner uafhængigt uden at bryde den fælles arkitektur.',
      },
      performance: {
        name: 'Performance-engineering',
        annot: '/ LATENS & KONVERTERING',
        items: ['Interaktionslatens', 'Optimistisk synkronisering', 'Core Web Vitals'],
        rationale:
          'Sikrer perfekte Core Web Vitals og svartider under 12 ms på enterprise-platforme.',
      },
      leadership: {
        name: 'Teknisk lederskab',
        annot: '/ ORGANISATORISK SYNKRONISERING',
        items: ['Udvikleroplevelse', 'Aktiv mentorering', 'Automatiserede quality gates'],
        rationale:
          'Accelererer leveringscyklusser med 30% på tværs af 20+ udviklere gennem aktiv mentorering.',
      },
      product: {
        name: 'Produkt- og systemafstemning',
        annot: '/ FULL-STACK-STRATEGI',
        items: ['Domænemodellering', 'Stakeholder-koordinering', 'State- og cache-kontrakter'],
        rationale: 'Lukker eksekveringshuller mellem engineering, produktledere og direktion.',
      },
    },
    'projects.registry': {
      kicker: '/ FLERE PROJEKTER',
      title: 'Flere projekter',
      description:
        'Udforsk flere produktfunktioner, værktøjer og ældre systemer bygget gennem min karriere.',
      aria: 'Register over yderligere projekter',
      colIndex: 'Indeks',
      colProject: 'Projekt / Omfang',
      colCategory: 'Kategori',
      colVector: 'Arkitektonisk vektor',
      colInspect: 'Inspicér',
    },
    'projects.empty': 'Ingen projekter matcher dette filter endnu.',
  },
}

for (const [lang, patch] of Object.entries(fixes)) {
  const file = resolve(LOCALES_DIR, lang, 'translation.json')
  const data = JSON.parse(readFileSync(file, 'utf8'))
  for (const [path, value] of Object.entries(patch)) set(data, path, value)
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`content pass applied → ${lang} (${Object.keys(patch).length} fixes)`)
}
