// src/database.js

import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "./firebase-config";

const database = getDatabase(app);

function writeUserData(userId, name, age, gender, city, toxicityLevel) {
  return set(ref(database, 'users/' + userId), {
    username: name,
    age: age,
    gender: gender,
    city: city,
    toxicityLevel: toxicityLevel
  });
}

function getUserData(userId) {
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}`));
}

export { writeUserData, getUserData };