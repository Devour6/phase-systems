// Organization + WebSite JSON-LD for search engine context.
// Server component — emits a single <script type="application/ld+json">.

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
