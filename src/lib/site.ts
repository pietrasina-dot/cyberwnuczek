export const SITE = {
  name: 'CyberWnuczek',
  url: 'https://www.cyber-wnuczek.pl',
  locale: 'pl-PL',
  language: 'pl',
  tagline: 'Spokojnie w internecie — jak wnuczek, który zawsze odbierze telefon.',
  description:
    'Poradniki o oszustwach internetowych, hasłach, bankowości online i smartfonie. Krótko: co kliknąć, czego nie klikać i kiedy odłożyć telefon.',
  homeTitle: 'CyberWnuczek — poradniki o bezpieczeństwie w internecie',
  author: {
    name: 'Redakcja CyberWnuczka',
    path: '/o-mnie',
  },
} as const;

export const MAIN_NAV = [
  { href: '/poradniki', label: 'Poradniki' },
  { href: '/tematy/oszustwa-internetowe', label: 'Oszustwa' },
  { href: '/tematy/hasla-i-konta', label: 'Hasła' },
  { href: '/tematy/bankowosc-online', label: 'Bankowość' },
  { href: '/tematy/smartfon', label: 'Smartfon' },
  { href: '/o-mnie', label: 'O stronie' },
] as const;

export const TOPICS = {
  'oszustwa-internetowe': {
    title: 'Oszustwa internetowe',
    short: 'Oszustwa',
    seoTitle: 'Oszustwa internetowe — telefon, mail, SMS',
    description:
      'Oszustwo na wnuczka, phishing w mailu i fałszywy SMS: jak rozpoznać pośpiech, nie kliknąć w link i nie wysłać BLIK-a, hasła ani kodu z SMS-a.',
    intro:
      'Oszustwa internetowe to próby wyłudzenia pieniędzy albo haseł przez telefon, mail, SMS i komunikator. Ten przewodnik jest dla Ciebie, jeśli chcesz wiedzieć, kiedy rozłączyć się i sprawdzić sprawę na spokojnie.',
    sections: [
      {
        heading: 'Oszustwo na wnuczka',
        teaser:
          'Nagła prośba o pieniądze i tajemnicę. Rozłącz się i zadzwoń na numer, który znasz od lat.',
        articleId: 'jak-rozpoznac-oszustwo-na-wnuczka',
      },
      {
        heading: 'Phishing w mailu i SMS',
        teaser:
          'Wiadomość straszy i prosi o kliknięcie. Nie loguj się z linku — wejdź na stronę banku albo urzędu sam.',
        articleId: 'phishing-mail-sms-jak-sprawdzic',
      },
    ],
  },
  'hasla-i-konta': {
    title: 'Hasła i konta',
    short: 'Hasła',
    seoTitle: 'Hasła i konta — prosty, bezpieczny system',
    description:
      'Hasła dla seniorów: długie zdanie-hasło, osobne hasło do banku i poczty oraz menedżer haseł w telefonie zamiast karteczki przy monitorze. Bez zgadywania.',
    intro:
      'Hasła i konta to temat o tym, jak logować się wygodnie, a jednocześnie nie dać oszustowi jednego klucza do banku, poczty i sklepu. Przewodnik jest dla osób, które wolą zdanie z życia niż ciąg znaków z generatora.',
    sections: [
      {
        heading: 'Prosty system haseł',
        teaser:
          'Trzy poziomy: bank i poczta osobno, reszta w menedżerze, nigdy to samo wszędzie.',
        articleId: 'hasla-dla-seniorow',
      },
    ],
  },
  'bankowosc-online': {
    title: 'Bankowość online',
    short: 'Bankowość',
    seoTitle: 'Bankowość online — bezpieczne logowanie',
    description:
      'Bezpieczne logowanie do banku: aplikacja albo adres wpisany ręcznie, bez BLIK-a i kodu SMS na telefon od obcej osoby i bez zdalnego pulpitu.',
    intro:
      'Bankowość online jest bezpieczna, gdy wchodzisz do banku sam — z aplikacji albo z adresu, który wpisujesz ręcznie. Tu znajdziesz zasady logowania, BLIK-a i przelewów, bez żargonu.',
    sections: [
      {
        heading: 'Logowanie i przelewy',
        teaser:
          'Siedem zasad: skąd otwierać bank, czego nie dyktować i kiedy dzwonić na infolinię z karty.',
        articleId: 'bezpieczna-bankowosc-internetowa',
      },
    ],
  },
  smartfon: {
    title: 'Smartfon',
    short: 'Smartfon',
    seoTitle: 'Smartfon — aktualizacje i aplikacje',
    description:
      'Smartfon seniora: aktualizacje systemu, aplikacje tylko z App Store albo Google Play i żadnego programu do zdalnego pulpitu na prośbę z telefonu.',
    intro:
      'Smartfon jest spokojniejszy, gdy system się aktualizuje, aplikacje pochodzą ze sklepu Apple albo Google, a obcy głos nie dyktuje, co zainstalować. Ten przewodnik jest do ustawień, nie do kupowania antywirusa.',
    sections: [
      {
        heading: 'Aktualizacje i aplikacje',
        teaser:
          'Co włączyć w ustawieniach, czego nie instalować „na chwilę” i co sprawdzić raz na kwartał.',
        articleId: 'smartfon-aktualizacje-i-aplikacje',
      },
    ],
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

/** Unikalny title SERP: encja + obietnica; marka tylko gdy się mieści. */
export function documentTitle(title: string): string {
  if (title === SITE.name || title.startsWith(`${SITE.name} `) || title.includes(` | ${SITE.name}`)) {
    return title;
  }
  const withBrand = `${title} | ${SITE.name}`;
  return withBrand.length <= 60 ? withBrand : title;
}

export function otherTopics(current: TopicId): TopicId[] {
  return (Object.keys(TOPICS) as TopicId[]).filter((id) => id !== current);
}
