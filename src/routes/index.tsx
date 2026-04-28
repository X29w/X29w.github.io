import { createFileRoute, redirect } from "@tanstack/react-router";
import { matchLocale, LOCALE_STORAGE_KEY } from "@/utils/config/locale-match";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    let locale: string;
    try {
      locale =
        localStorage.getItem(LOCALE_STORAGE_KEY) ||
        matchLocale(navigator.language);
    } catch {
      locale = "en";
    }
    throw redirect({ to: "/$locale", params: { locale }, replace: true });
  },
  component: () => null,
});
