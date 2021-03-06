import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import DashboardShell from "@/components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import SiteTable from "@/components/SiteTable";

export default function Dashboard() {
  const { user } = useAuth();

  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);
  console.log({ data });
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell sites>
      {data.sites?.length > 0 ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
