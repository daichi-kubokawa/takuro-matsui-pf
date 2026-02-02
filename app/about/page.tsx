import { getAbout, getSettings } from "@/lib/microcms";

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-4xl font-semibold">{about.nameJa}</h1>
      <p className="mt-2 opacity-70">{about.nameEn}</p>

      <p className="mt-6 leading-7">{about.bioJa}</p>
      {about.bioEn ? (
        <p className="mt-4 leading-7 opacity-80">{about.bioEn}</p>
      ) : null}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-4 text-sm opacity-80">{about.contactTextJa}</p>
        <div className="mt-3 text-sm">
          <a
            className="hover:underline"
            href={`mailto:${settings.contactEmail}`}
          >
            {settings.contactEmail}
          </a>
        </div>
      </section>
    </main>
  );
}
