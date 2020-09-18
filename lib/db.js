import firebase from "./firebase";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data });
}

export function createSite(data) {
  return firestore.collection("sites").add(data);
}

export function createFeedback(data) {
  return firestore.collection("feedback").add(data);
}
