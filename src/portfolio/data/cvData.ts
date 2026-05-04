import { Mail } from 'lucide-react';
import { FacebookIcon, GithubIcon, LinkedinIcon } from '@/portfolio/components/ui/icons/SocialIcons';
import cvSource from './cv-source.json';
import enLocale from '@/portfolio/locales/en/translation.json';

const src = cvSource.personalInfo;

export const personalInfo = {
  name: src.name,
  title: 'Senior Frontend Engineer with Full-Stack Roots',
  description:
    'Frontend-first engineer with full-stack roots and nearly two decades of experience since 2007. I build scalable web products that turn complex business rules into fast, intuitive interfaces using React, Vue, Node.js, and cloud platforms.',
  email: src.email,
  phone: src.phone,
  location: src.location,
  socials: [
    {
      name: 'LinkedIn',
      url: src.linkedinUrl,
      icon: LinkedinIcon,
    },
    { name: 'GitHub', url: src.githubUrl, icon: GithubIcon },
    { name: 'Facebook', url: src.facebookUrl, icon: FacebookIcon },
    { name: 'Email', url: `mailto:${src.email}`, icon: Mail },
  ],
};

export const aboutMe = {
  intro:
    'I started my career in Cuba in 2007, working across institutional platforms, media products, and custom business software before moving to Denmark and specializing further in frontend engineering. That end-to-end background still shapes how I work today: I understand the full delivery chain, collaborate comfortably with product, design, and backend teams, and build interfaces that stay maintainable as products grow.',
  features: [
    {
      title: 'Strategic Collaborative Engineering',
      description:
        'I thrive in cross-functional environments, building upon the ideas of my colleagues while bridging the gap between product managers, UI/UX designers, and backend infrastructure engineers to ensure aligned delivery.',
      icon: 'users',
    },
    {
      title: 'Continuous System Evolution',
      description:
        'The technological landscape is unforgiving. I embrace architectural refactoring, keeping my tech stack, testing coverage, and CI/CD pipelines at the bleeding edge.',
      icon: 'rocket',
    },
    {
      title: 'Fast, Robust, & Scalable',
      description:
        'Speed means nothing without stability. Driven by the philosophy that a unique business requires a unique platform, I love tackling difficult problems from new angles, ensuring applications are both technically robust and exceptionally intuitive.',
      icon: 'zap',
    },
  ],
};

export const experiences = cvSource.experiences.map((exp) => {
  const item =
    enLocale.experience.items[String(exp.id) as keyof typeof enLocale.experience.items];
  return {
    ...exp,
    role: item?.role ?? '',
    description: item?.description ?? '',
  };
});

export const skills = cvSource.skills;

export const projects = [
  {
    id: 'zunzun',
    title: 'Zunzun.io',
    image: '/projects/zunzun-cover.png',
    link: 'https://www.zunzun.io/',
    category: 'Full Stack',
  },
  {
    id: 'hbo-notify',
    title: 'HBO - Be Notified',
    image: '/projects/hbo-notify-cover.png',
    link: 'https://demo-hbo-landing.netlify.app/versions/v1/getnotified/',
    category: 'Frontend',
  },
  {
    id: 'voirlematch',
    title: 'Voirlematch.fr',
    image: '/projects/voirlematch-cover.png',
    link: 'https://www.voirlematch.fr/',
    category: 'Frontend',
  },
  {
    id: 'hbo-signup',
    title: 'HBO - Sign up',
    image: '/projects/hbo-signup-cover.png',
    link: 'https://demo-hbo-landing.netlify.app/versions/v1/voucher/',
    category: 'Frontend',
  },
  {
    id: 'sportal',
    title: 'Sportal.se',
    image: '/projects/sportal-cover.png',
    link: 'https://www.sportal.se/',
    category: 'Full Stack',
  },
  {
    id: 'live-fodbold',
    title: 'Live-fodbold.dk',
    image: '/projects/live-fodbold-cover.png',
    link: 'https://www.live-fodbold.dk/',
    category: 'Full Stack',
  },
  {
    id: 'radio-guama',
    title: 'Radio Guama',
    image: '/projects/radio-guama-cover.png',
    link: 'http://www.rguama.icrt.cu/',
    category: 'Frontend',
  },
  {
    id: 'livefodboldstreams',
    title: 'Livefodboldstreams.dk',
    image: '/projects/livefodboldstreams-cover.png',
    link: 'https://www.livefodboldstreams.dk/',
    category: 'Frontend',
  },
  {
    id: 'counties',
    title: 'Counties App',
    image: '/projects/counties-cover.png',
    link: 'https://monosolutiosapps.netlify.app/',
    category: 'Frontend',
  },
  {
    id: 'watchonlinehorseracing',
    title: 'Watch Online Horse Racing',
    image: '/projects/watchonlinehorseracing-cover.png',
    link: 'https://www.watchonlinehorseracing.co.uk/',
    category: 'Full Stack',
  },
  {
    id: 'sefodbold',
    title: 'Sefodbold.dk',
    image: '/projects/sefodbold-cover.png',
    link: 'https://www.sefodbold.dk/',
    category: 'Frontend',
  },
  {
    id: 'windows-terminal',
    title: 'Windows Terminal Config Generator',
    image: '/projects/windows-terminal-cover.jpg',
    link: 'https://windowsterminalsetting.netlify.app/',
    category: 'Full Stack',
  },
  {
    id: 'sesport',
    title: 'Sesport',
    image: '/projects/sesport-cover.png',
    link: 'https://www.sesport.dk/fodbold',
    category: 'Frontend',
  },
];

export const services = [
  {
    id: 'design-frontend',
    title: 'Vanguard Frontend Architecture',
    description:
      "I don't just build websites; I engineer interactive digital ecosystems. Utilizing React, Next.js, and Framer Motion, I deliver sub-second loading applications defined by 60fps animations and uncompromising UX precision.",
    icon: 'layout',
  },
  {
    id: 'backend-devops',
    title: 'Cloud & Backend Resiliency',
    description:
      'An exceptional frontend requires an ironclad backend. I design robust serverless API layers, optimize relational/NoSQL database queries, and establish automated deployment pipelines ensuring 99.9% uptime scalability.',
    icon: 'server',
  },
];
