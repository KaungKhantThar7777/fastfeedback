import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import DashboardShell from "@/components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import SiteTable from "@/components/SiteTable";

export default function Home() {
  const { user } = useAuth();

  const { data } = useSWR("/api/sites", fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  console.log({ data });
  return (
    <DashboardShell>
      {data.sites.length > 0 ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
