import firebase from "../firebase";

const db = firebase.firestore();

/**
 * @param {string} userId the user uid
 * @param {{ limit: number, after: string }} opts options
 */
export function queryLists(userId, opts = {}) {
  const { limit = 50, after = "" } = opts;
  return db
    .collection(`users/${userId}/lists`)
    .orderBy("title")
    .startAfter(after)
    .limit(limit);
}

/**
 * @param {string} userId the user uid
 */
export function queryOneList(userId, listId) {
  return db.doc(`users/${userId}/lists/${listId}`);
}

/**
 * @param {string} userId the user uid
 */
export function deleteLists(userId) {}
