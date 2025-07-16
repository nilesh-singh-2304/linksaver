import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import DashboardClient to prevent SSR issues
const DashboardClient = dynamic(() => import("../../components/DashboardClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white text-lg px-4">
      Loading Dashboard...
    </div>
  ),
});

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard | Link Saver</title>
        <meta name="description" content="Your saved bookmarks with AI summaries." />
      </Head>
      <DashboardClient />
    </>
  );
}
