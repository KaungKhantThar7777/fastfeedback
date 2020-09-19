import { getUserFeedback } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const sites = await getUserFeedback(uid);
    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json({ error });
  }
};
