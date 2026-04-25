import Link from "next/link"
import { NavScrollWrapper } from "./NavScrollWrapper"
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"
import { NavCTAs } from "./NavCTAs"

export function Nav() {
  return (
    <NavScrollWrapper>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <span className="font-serif font-bold text-[1.35rem] text-white tracking-[0.2em] group-hover:text-white/90 transition-colors">
              TELEIOSIS
            </span>
            <span className="w-px h-5 bg-white/20 hidden sm:block" />
            <span className="hidden sm:block text-teleiosis-gold text-[0.65rem] tracking-[0.25em] font-sans font-semibold uppercase">
              Mandate
            </span>
          </Link>

          {/* Desktop nav */}
          <DesktopNav />

          {/* Right: dual-button pill (desktop) + mobile hamburger */}
          <div className="flex items-center gap-3">
            <NavCTAs />
            <MobileNav />
          </div>

        </div>
      </div>
    </NavScrollWrapper>
  )
}
