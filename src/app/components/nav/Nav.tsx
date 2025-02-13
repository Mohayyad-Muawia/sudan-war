// components/Nav.js
"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import "./nav.css";
import Switcher from "../lang switcher/Switcher";

export default function Nav() {
  const t = useTranslations("Nav");

  return (
    <nav>
      <Link href="/">{t("home")}</Link>
      <Link href="/about">{t("about")}</Link>
      <Switcher />
    </nav>
  );
}
