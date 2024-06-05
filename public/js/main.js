// public/js/main.js

import { registerUser, loginUser } from "../../src/auth.js";
import { writeUserData, getUserData } from "../../src/database.js";

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  
  registerUser(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Kullanıcı kaydedildi:', user);

      // Örnek kullanıcı verisi yazma (registerUser fonksiyonunda zaten yapılıyor)
      // Bu kısım artık gereksiz
    })
    .catch((error) => {
      console.error('Kayıt hatası:', error);
    });
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  loginUser(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Kullanıcı giriş yaptı:', user);
      
      // Kullanıcı verisini alma
      getUserData(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log('Kullanıcı verisi:', snapshot.val());
          } else {
            console.log('Kullanıcı verisi bulunamadı');
          }
        })
        .catch((error) => {
          console.error('Kullanıcı verisi alma hatası:', error);
        });
    })
    .catch((error) => {
      console.error('Giriş hatası:', error);
    });
});
