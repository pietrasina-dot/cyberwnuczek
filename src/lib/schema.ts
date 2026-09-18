import { SITE, TOPICS, absoluteUrl, articlePath, topicPath, type TopicId } from './site';

type FAQ = {
  question: string;
  answer: string;
};

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
    description: SITE.description,
    publisher: organizationSchema(),
  };
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    name: SITE.author.name,
    url: absoluteUrl(SITE.author.path),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
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
    '@context': 'https://schema.org',
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
}) {
  const url = absoluteUrl(articlePath(input.slug));

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    inLanguage: SITE.language,
    datePublished: input.pubDate.toISOString(),
    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),
    mainEntityOfPage: url,
    url,
    author: personSchema(),
    publisher: organizationSchema(),
    articleSection: TOPICS[input.topic].title,
  };
}

export function topicSchema(topic: TopicId, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: TOPICS[topic].title,
    description: TOPICS[topic].description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function jsonLd(data: unknown | unknown[]): string {
  const graph = Array.isArray(data) ? data.filter(Boolean) : [data];
  return JSON.stringify(graph.length === 1 ? graph[0] : graph, null, 0);
}

export { topicPath };
