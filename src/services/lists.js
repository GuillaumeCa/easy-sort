import firebase from "../firebase";

const db = firebase.firestore();

/**
 * @param {string} userId the user uid
 */
export function queryLists(userId) {
  return db.collection(`users/${userId}/lists`);
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
