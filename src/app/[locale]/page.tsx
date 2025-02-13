import { Link } from "@/src/i18n/routing";
import { getTranslations } from "next-intl/server";
import VoteBtn from "../components/vote btn/VoteBtn";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <VoteBtn />
    </main>
  );
}
