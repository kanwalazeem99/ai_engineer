import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kanwal Azeem - Frontend Developer" },
      {
        name: "description",
        content:
          "Portfolio of Kanwal Azeem - Frontend Developer in Karachi specializing in WordPress, Shopify, Laravel, Wix, React and Next.js.",
      },
      { property: "og:title", content: "Kanwal Azeem - Frontend Developer" },
      {
        property: "og:description",
        content: "Portfolio of Kanwal Azeem - Frontend Developer in Karachi specializing in WordPress, Shopify, Laravel, Wix, React and Next.js.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
