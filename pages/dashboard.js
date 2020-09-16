import { useAuth } from "@/lib/auth";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const { user } = useAuth();
  if (!user) {
    return "Loading...";
  }
  return <EmptyState />;
}
