import dynamic from "next/dynamic";

// Client-only load to avoid SSR + Turbopack issues
const DashboardClient = dynamic(
  () => import("../../components/DashboardClient"),
  {
    ssr: false,
    loading: () => <div className="p-8 text-white">Loading Dashboard...</div>,
  }
);

export default function DashboardPage() {
  return <DashboardClient />;
}
