export const SITE = {
  name: 'CyberWnuczek',
  url: 'https://www.cyber-wnuczek.pl',
  locale: 'pl-PL',
  language: 'pl',
  tagline: 'Spokojnie w internecie — jak wnuczek, który zawsze odbierze telefon.',
  description:
    'Proste poradniki o oszustwach internetowych, hasłach, bankowości i smartfonie. Pisane tak, żeby dało się z nich skorzystać od razu.',
  author: {
    name: 'Redakcja CyberWnuczka',
    path: '/o-mnie',
  },
  email: 'kontakt@cyber-wnuczek.pl',
} as const;

export const TOPICS = {
  'oszustwa-internetowe': {
    title: 'Oszustwa internetowe',
    short: 'Oszustwa',
    description:
      'Jak rozpoznać fałszywy telefon, mail i SMS, zanim klikniesz albo przelejesz pieniądze.',
  },
  'hasla-i-konta': {
    title: 'Hasła i konta',
    short: 'Hasła',
    description:
      'Jak ustawić hasła i logowanie, żeby konto było trudne do zgadnięcia, a dla Ciebie wciąż wygodne.',
  },
  'bankowosc-online': {
    title: 'Bankowość online',
    short: 'Bankowość',
    description:
      'Zasady bezpiecznego logowania do banku, BLIK-a i przelewów — bez żargonu.',
  },
  smartfon: {
    title: 'Smartfon',
    short: 'Smartfon',
    description:
      'Aktualizacje, aplikacje i ustawienia telefonu, które realnie zmniejszają ryzyko.',
  },
} as const;

export type TopicId = keyof typeof TOPICS;

export function isTopicId(value: string): value is TopicId {
  return value in TOPICS;
}

export function articlePath(slug: string): string {
  return `/poradniki/${slug}`;
}

export function topicPath(topic: TopicId): string {
  return `/tematy/${topic}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(path, SITE.url).toString();
}
