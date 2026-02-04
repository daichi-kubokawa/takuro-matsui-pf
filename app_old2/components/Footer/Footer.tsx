import { getSettings } from "@/lib/microcms";

export default async function Footer() {
  try {
    const s = await getSettings();

    return (
      <footer className="mt-16 text-center text-sm opacity-60">
        <div>
          © {new Date().getFullYear()} {s.siteTitle}
        </div>
        <div className="mt-2">
          <a className="hover:underline" href={`mailto:${s.contactEmail}`}>
            contact
          </a>
          {s.instagramUrl ? (
            <>
              {"  /  "}
              <a
                className="hover:underline"
                href={s.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                instagram
              </a>
            </>
          ) : null}
        </div>
      </footer>
    );
  } catch {
    return (
      <footer className="mt-16 text-center text-sm opacity-60">
        © {new Date().getFullYear()}
      </footer>
    );
  }
}
