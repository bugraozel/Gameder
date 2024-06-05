const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Firestore 'profiles' koleksiyonu referansı
const profilesRef = admin.firestore().collection("profiles");

// Kullanıcı profilini oluşturma işlevi
exports.createProfile = functions.auth.user().onCreate((user) => {
  const displayName = user.displayName || "Anonymous";
  const email = user.email || "";
  return profilesRef.doc(user.uid).set({
    username: displayName,
    email: email,
    age: "",
    gender: "",
    city: "",
    game: ""
  });
});

// Oyun arkadaşları arama işlevi
exports.searchPartners = functions.https.onCall(async (data, context) => {
  const game = data.game || "";
  const snapshot = await profilesRef.where("game", "==", game).get();
  const results = [];
  snapshot.forEach((doc) => {
    results.push(doc.data());
  });
  return results;
});
