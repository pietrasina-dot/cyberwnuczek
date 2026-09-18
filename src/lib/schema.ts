import {
  SITE,
  TOPICS,
  MAIN_NAV,
  absoluteUrl,
  articlePath,
  topicPath,
  type TopicId,
} from './site';

type FAQ = {
  question: string;
  answer: string;
};

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
    description: SITE.description,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function siteNavigationSchema() {
  return {
    '@type': 'ItemList',
    name: 'Nawigacja',
    itemListElement: MAIN_NAV.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.label,
      url: absoluteUrl(item.href),
    })),
  };
}

export function globalSchema() {
  return [organizationSchema(), websiteSchema(), siteNavigationSchema()];
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: FAQ[]) {
  if (!faq.length) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  slug: string;
  pubDate: Date;
  updatedDate?: Date;
  topic: TopicId;
  image?: string;
}) {
  const url = absoluteUrl(articlePath(input.slug));

  return {
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    inLanguage: SITE.language,
    datePublished: input.pubDate.toISOString(),
    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),
    mainEntityOfPage: url,
    url,
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    articleSection: TOPICS[input.topic].title,
    ...(input.image
      ? { image: [absoluteUrl(input.image)] }
      : {}),
    about: {
      '@type': 'Thing',
      name: TOPICS[input.topic].title,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: TOPICS[input.topic].title,
      url: absoluteUrl(topicPath(input.topic)),
    },
  };
}

export function topicSchema(topic: TopicId, url: string) {
  return {
    '@type': 'CollectionPage',
    name: TOPICS[topic].title,
    description: TOPICS[topic].description,
    url,
    inLanguage: SITE.language,
    isPartOf: { '@id': WEBSITE_ID },
    about: {
      '@type': 'Thing',
      name: TOPICS[topic].title,
    },
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
  dateModified?: string;
}) {
  return {
    '@type': input.type ?? 'WebPage',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: SITE.language,
    isPartOf: { '@id': WEBSITE_ID },
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function jsonLd(data: unknown | unknown[]): string {
  const graph = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': graph,
    },
    null,
    0,
  );
}

export { topicPath };
