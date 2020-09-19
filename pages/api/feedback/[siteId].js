import { getAllFeedback } from "@/lib/db-admin";
import { compareDesc } from "date-fns/esm";

export default async (req, res) => {
  const { siteId } = req.query;

  const { feedback } = await getAllFeedback(siteId);
  const sortedFeedback = feedback.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
  res.status(200).json({ feedback: sortedFeedback });
};
