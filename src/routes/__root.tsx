import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/config/theme-provider";
import "@/styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
