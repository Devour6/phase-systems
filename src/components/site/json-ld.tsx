// Organization + WebSite JSON-LD for search engine context.
// Server component — emits a single <script type="application/ld+json">.

export function ServiceJsonLd({
  slug,
  title,
  tagline,
  description,
}: {
  slug: string;
  title: string;
  tagline: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://phase-systems.vercel.app/services/${slug}#service`,
    name: title,
    alternateName: tagline,
    description,
    url: `https://phase-systems.vercel.app/services/${slug}`,
    provider: { "@id": "https://phase-systems.vercel.app/#org" },
    areaServed: { "@type": "Country", name: "United States" },
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://phase-systems.vercel.app/#org",
        name: "Phase Systems",
        url: "https://phase-systems.vercel.app",
        logo: "https://phase-systems.vercel.app/logo-mark-512.png",
        description:
          "Phase Systems is Phase's data center vertical based in Des Moines, Iowa.",
        parentOrganization: {
          "@type": "Organization",
          name: "Phase",
          url: "https://phase.cc",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Des Moines",
          addressRegion: "IA",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://phase-systems.vercel.app/#site",
        url: "https://phase-systems.vercel.app",
        name: "Phase Systems",
        publisher: { "@id": "https://phase-systems.vercel.app/#org" },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
