import type { Thing, WithContext } from 'schema-dts';

type SchemaObject = Record<string, unknown>;

export function generateMetadata(title: string, description: string, canonical: string) {
  return { title, description, canonical };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; item: string }>,
): WithContext<Thing> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  } as WithContext<Thing>;
}

export function generateFAQSchema(questions: Array<{ question: string; answer: string }>): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function generateArticleSchema(article: SchemaObject): SchemaObject {
  return { '@context': 'https://schema.org', '@type': 'Article', ...article };
}

export function generatePlaceSchema(place: SchemaObject): SchemaObject {
  return { '@context': 'https://schema.org', '@type': 'Place', ...place };
}
