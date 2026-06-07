export type FAQItem = {
  q: string;
  a: string;
};

export default function FAQList({title, faqs}: {title: string; faqs: FAQItem[]}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">{title}</h2>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm open:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-lg font-bold text-gray-900 dark:text-white">{faq.q}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 group-open:rotate-45 transition dark:border-gray-700 dark:text-gray-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="mt-3 text-gray-600 dark:text-gray-300">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
