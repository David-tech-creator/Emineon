"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { IconKey, Locale } from "@/content/schema";
import { Icon } from "@/components/icons";
import { localizedHref, stripLocale } from "@/lib/i18n";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/Arrow";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BrandMark } from "./BrandMark";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useLenis } from "./SmoothScroll";
import type { NavData, NavIndustry, NavService } from "./nav-types";

type MenuKey = "services" | "industries";

type NavProps = NavData & { locale: Locale };

/**
 * Sticky site header: transparent over the hero, blurred carbon once scrolled.
 * Desktop mega menus (Services, Industries) open on hover/focus/click; mobile
 * gets a full-screen menu. All labels come from the dictionary.
 */
export function Nav({ locale, nav, a11y, services, industries, extra }: NavProps) {
  const pathname = usePathname() || `/${locale}`;
  const path = stripLocale(pathname);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelId = useId();
  const mobileId = useId();

  const href = useCallback((p: string) => localizedHref(locale, p), [locale]);
  const isActive = (p: string) => path === p || path.startsWith(`${p}/`);

  // Scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape + outside click
  useEffect(() => {
    if (!menu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (menu && headerRef.current && !headerRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu, mobileOpen]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen, lenis]);

  const openMenu = (k: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(k);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  const solid = scrolled || menu !== null || mobileOpen;

  const plainItems = [
    { key: "work", label: nav.items.work, href: "/work" },
    { key: "insights", label: nav.items.insights, href: "/insights" },
    { key: "about", label: nav.items.about, href: "/about" },
    { key: "careers", label: nav.items.careers, href: "/careers" },
  ];

  return (
    <header
      ref={headerRef}
      id="top"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out-expo)]",
        // No backdrop-filter while the mobile menu is open: it would become the
        // containing block of the fixed overlay and clip it to the header.
        mobileOpen
          ? "border-b border-line bg-canvas"
          : solid
            ? "border-b border-line bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={scheduleClose}
    >
      <div className="container-site flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href={href("/")} aria-label={a11y.logoHome} className="relative z-10 -m-2 p-2">
          <BrandMark />
        </Link>

        {/* Desktop */}
        <nav aria-label={a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {(["services", "industries"] as const).map((k) => (
              <li key={k} onMouseEnter={() => openMenu(k)}>
                <button
                  type="button"
                  aria-expanded={menu === k}
                  aria-controls={`${panelId}-${k}`}
                  onClick={() => (menu === k ? setMenu(null) : openMenu(k))}
                  className={cn(
                    "flex items-center gap-1.5 rounded-[2px] px-3 py-2 text-[14.5px] transition-colors duration-200",
                    menu === k || isActive(`/${k}`) || (k === "services" && isActive("/approach")) ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {nav.items[k]}
                  <svg aria-hidden viewBox="0 0 10 10" className={cn("size-2.5 transition-transform duration-300", menu === k && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="m2 3.5 3 3 3-3" />
                  </svg>
                </button>
              </li>
            ))}
            {plainItems.map((item) => (
              <li key={item.key} onMouseEnter={scheduleClose}>
                <Link
                  href={href(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative block rounded-[2px] px-3 py-2 text-[14.5px] transition-colors duration-200",
                    isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span aria-hidden className="absolute bottom-0.5 left-3 size-1 rounded-full bg-ember" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LocaleSwitcher current={locale} label={nav.locale.label} names={nav.locale.names} short={nav.locale.short} className="hidden md:flex" />
          <div className="hidden sm:block">
            <Button
              href={href("/contact")}
              variant="ink"
              size="md"
              magnetic={false}
              className="h-10 px-4 text-[14px]"
              arrow
            >
              {nav.cta}
            </Button>
          </div>
          <button
            type="button"
            className="relative z-10 -mr-2 flex size-11 items-center justify-center lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? a11y.closeMenu : a11y.openMenu}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span aria-hidden className="relative block h-3 w-6">
              <span className={cn("absolute left-0 h-px w-full bg-fg transition-transform duration-300 ease-[var(--ease-out-expo)]", mobileOpen ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-px w-full bg-fg transition-transform duration-300 ease-[var(--ease-out-expo)]", mobileOpen ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mega menus */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key={menu}
            id={`${panelId}-${menu}`}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            onMouseEnter={() => openMenu(menu)}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-paper shadow-[0_40px_80px_-30px_rgba(11,12,14,0.22)] lg:block"
          >
            {menu === "services" ? (
              <ServicesMega nav={nav} extra={extra} services={services} href={href} isActive={isActive} />
            ) : (
              <IndustriesMega nav={nav} extra={extra} industries={industries} href={href} isActive={isActive} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={mobileId}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 top-0 z-0 flex flex-col overflow-y-auto bg-canvas pt-[var(--nav-h)] lg:hidden"
            data-lenis-prevent
          >
            <MobileMenu nav={nav} extra={extra} services={services} industries={industries} href={href} locale={locale} isActive={isActive} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------------------- */

type MegaShared = {
  nav: NavData["nav"];
  extra: NavData["extra"];
  href: (p: string) => string;
  isActive: (p: string) => boolean;
};

function MegaIntro({ eyebrow, intro, featured, href }: { eyebrow: string; intro: string; featured: NavData["nav"]["mega"]["services"]["featured"]; href: (p: string) => string }) {
  return (
    <div className="col-span-3 flex flex-col justify-between gap-8 border-r border-line py-10 pr-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{intro}</p>
      </div>
      <Link href={href(featured.cta.href)} className="group/feat block border border-line p-5 transition-colors hover:border-ember/50">
        <p className="eyebrow text-ember-ink">{featured.eyebrow}</p>
        <p className="mt-3 text-[17px] leading-snug font-medium text-fg">{featured.title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{featured.text}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[14px] text-fg group-hover/feat:text-ember-ink">
          {featured.cta.label}
          <Arrow className="transition-transform group-hover/feat:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}

function MegaLink({ href, active, index, icon, name, short }: { href: string; active: boolean; index?: string; icon?: IconKey; name: string; short: string }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="group/ml relative flex gap-4 border-b border-line py-4 pr-4 transition-colors"
    >
      {index && <span className="eyebrow mt-1 w-6 shrink-0 text-fg-dim tabular group-hover/ml:text-ember-ink">{index}</span>}
      {icon && <Icon name={icon} size={20} className="mt-0.5 shrink-0 text-fg-muted transition-colors group-hover/ml:text-ember-ink" />}
      <span className="min-w-0">
        <span className={cn("flex items-center gap-2 text-[16px] font-medium transition-colors", active ? "text-ember-ink" : "text-fg group-hover/ml:text-ember-ink")}>
          {name}
          <Arrow className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/ml:translate-x-0 group-hover/ml:opacity-100" />
        </span>
        <span className="mt-1 line-clamp-2 block text-[13.5px] leading-relaxed text-fg-muted">{short}</span>
      </span>
    </Link>
  );
}

function ServicesMega({ nav, extra, services, href, isActive }: MegaShared & { services: NavService[] }) {
  const m = nav.mega.services;
  return (
    <div className="container-site grid grid-cols-12 gap-x-8">
      <MegaIntro eyebrow={m.eyebrow} intro={m.intro} featured={m.featured} href={href} />
      <div className="col-span-6 py-10">
        <p className="eyebrow mb-2 text-fg-dim">{m.groupServices}</p>
        <div className="grid grid-cols-2 gap-x-8">
          {services.map((s) => (
            <MegaLink key={s.slug} href={href(`/services/${s.slug}`)} active={isActive(`/services/${s.slug}`)} index={s.index} name={s.name} short={s.short} />
          ))}
        </div>
      </div>
      <div className="col-span-3 flex flex-col border-l border-line py-10 pl-8">
        <p className="eyebrow mb-2 text-fg-dim">{m.groupModel}</p>
        <MegaLink href={href("/approach")} active={isActive("/approach")} name={m.approachLabel} short={m.approachText} />
        <MegaLink href={href(extra.governance.href)} active={isActive(extra.governance.href)} name={extra.governance.label} short={extra.governance.short} />
        <Link href={href("/services")} className="group/va mt-auto inline-flex items-center gap-2 pt-6 text-[14px] text-fg-muted hover:text-ember-ink">
          {m.viewAll}
          <Arrow className="transition-transform group-hover/va:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function IndustriesMega({ nav, extra, industries, href, isActive }: MegaShared & { industries: NavIndustry[] }) {
  const m = nav.mega.industries;
  const groups = [
    { label: m.groupCore, items: industries.filter((i) => i.tier === "core") },
    { label: m.groupAdjacent, items: industries.filter((i) => i.tier === "adjacent") },
  ];
  return (
    <div className="container-site grid grid-cols-12 gap-x-8">
      <MegaIntro eyebrow={m.eyebrow} intro={m.intro} featured={m.featured} href={href} />
      {groups.map((g, gi) => (
        <div key={g.label} className={cn("col-span-4 flex flex-col py-10", gi === 1 && "col-span-5 border-l border-line pl-8")}>
          <p className="eyebrow mb-2 text-fg-dim">{g.label}</p>
          {g.items.map((i) => (
            <MegaLink key={i.slug} href={href(`/industries/${i.slug}`)} active={isActive(`/industries/${i.slug}`)} icon={i.icon} name={i.name} short={i.short} />
          ))}
          {gi === 0 && (
            <MegaLink href={href(extra.geneva.href)} active={isActive(extra.geneva.href)} icon="globe" name={extra.geneva.label} short={extra.geneva.short} />
          )}
          {gi === 1 && (
            <Link href={href("/industries")} className="group/va mt-auto inline-flex items-center gap-2 pt-6 text-[14px] text-fg-muted hover:text-ember-ink">
              {m.viewAll}
              <Arrow className="transition-transform group-hover/va:translate-x-1" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

function MobileMenu({
  nav,
  extra,
  services,
  industries,
  href,
  locale,
  isActive,
}: MegaShared & { services: NavService[]; industries: NavIndustry[]; locale: Locale }) {
  const [group, setGroup] = useState<MenuKey | null>(null);
  const groups: { key: MenuKey; label: string; links: { href: string; label: string }[] }[] = [
    {
      key: "services",
      label: nav.items.services,
      links: [
        ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
        { href: "/approach", label: nav.items.approach },
        { href: extra.governance.href, label: extra.governance.label },
        { href: "/services", label: nav.mega.services.viewAll },
      ],
    },
    {
      key: "industries",
      label: nav.items.industries,
      links: [
        ...industries.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })),
        { href: extra.switzerland.href, label: extra.switzerland.label },
        { href: extra.geneva.href, label: extra.geneva.label },
        { href: "/industries", label: nav.mega.industries.viewAll },
      ],
    },
  ];
  const plain = [
    { href: "/work", label: nav.items.work },
    { href: "/insights", label: nav.items.insights },
    { href: "/about", label: nav.items.about },
    { href: "/careers", label: nav.items.careers },
  ];
  const big = "flex w-full items-center justify-between py-4 text-[32px] leading-none font-medium tracking-[-0.03em] text-fg";

  return (
    <div className="container-site flex flex-1 flex-col pt-6 pb-10">
      <ul className="border-t border-line">
        {groups.map((g) => (
          <li key={g.key} className="border-b border-line">
            <button type="button" className={big} aria-expanded={group === g.key} onClick={() => setGroup(group === g.key ? null : g.key)}>
              {g.label}
              <span aria-hidden className={cn("text-[20px] text-fg-muted transition-transform duration-300", group === g.key && "rotate-45")}>+</span>
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]", group === g.key ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <ul className="overflow-hidden" inert={group !== g.key}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={href(l.href)} className={cn("block py-2.5 text-[17px]", isActive(l.href) ? "text-ember-ink" : "text-fg-muted")}>
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li aria-hidden className="h-4" />
              </ul>
            </div>
          </li>
        ))}
        {plain.map((p) => (
          <li key={p.href} className="border-b border-line">
            <Link href={href(p.href)} className={cn(big, isActive(p.href) && "text-ember-ink")} aria-current={isActive(p.href) ? "page" : undefined}>
              {p.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-4 pt-10">
        <LocaleSwitcher current={locale} label={nav.locale.label} names={nav.locale.names} short={nav.locale.short} />
        <Button href={href("/contact")} arrow>
          {nav.cta}
        </Button>
      </div>
    </div>
  );
}
