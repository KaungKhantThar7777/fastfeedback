import { compareDesc, parseISO } from "date-fns";
import db from "./firebase-admin";

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db.collection("feedback").where("siteId", "==", siteId).get();
    const feedback = [];
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) => compareDesc(parseISO(a), parseISO(b)));

    return { feedback };
  } catch (err) {
    return { err };
  }
}

export async function getAllSites() {
  try {
    const sitesRef = db.collection("sites");
    const snapshot = await sitesRef.get();
    if (snapshot.empty) {
      console.log("No Sites.");
      return res.status(200).json({ sites: [] });
    }

    const sites = [];
    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });
    return { sites };
  } catch (err) {
    return { err };
  }
}
