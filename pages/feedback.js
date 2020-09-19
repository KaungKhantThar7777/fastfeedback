import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import DashboardShell from "@/components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import FeedbackTable from "@/components/FeedbackTable";

export default function Feedback() {
  const { user } = useAuth();

  const { data } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);
  console.log({ data });
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.feedback.length > 0 ? <FeedbackTable allFeedback={data.feedback} /> : <EmptyState />}
    </DashboardShell>
  );
}
