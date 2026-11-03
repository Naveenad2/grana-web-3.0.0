import { site } from "@/data/site";
import { Img } from "@/components/ui/Img";

/**
 * First-visit welcome: the logo stamps in, then the cream panel lifts away like a shop shutter.
 * Shown only when the inline script in the layout sets `data-intro` on <html> (home page, once per
 * session, never with reduced motion), and it is pure CSS so it can't hold up hydration.
 */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__seal">
        <svg viewBox="0 0 200 200" className="intro__ring">
          <defs>
            <path id="intro-ring" d="M100 100m-88 0a88 88 0 1 1 176 0a88 88 0 1 1-176 0" />
          </defs>
          <text>
            <textPath href="#intro-ring" textLength="553" lengthAdjust="spacing">
              Wood-fired ✦ Neapolitan style ✦ Panampilly Nagar ✦ Kochi ✦{" "}
            </textPath>
          </text>
        </svg>
        <Img src="/logo.png" alt="" width={260} height={260} sizes="240px" loading="eager" className="intro__logo" />
      </div>
      <p className="intro__tag script">{site.tagline}</p>
    </div>
  );
}
