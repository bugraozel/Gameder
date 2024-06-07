// public/js/profile.js
document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const city = localStorage.getItem('city');
    const age = localStorage.getItem('age');

    if (username && email && city && age) {
        document.getElementById('username').textContent = username;
        document.getElementById('email').textContent = email;
        document.getElementById('city').textContent = city;
        document.getElementById('age').textContent = age;
    }

    const updateForm = document.getElementById('updateForm');
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const newEmail = document.getElementById('newEmail').value;
        const newCity = document.getElementById('newCity').value;
        const newAge = document.getElementById('newAge').value;

        fetch(`/update-profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newUsername, password: newPassword, email: newEmail, city: newCity, age: newAge })
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Profile updated successfully') {
                alert('Profil güncellendi');
                localStorage.setItem('username', newUsername || username);
                localStorage.setItem('email', newEmail || email);
                localStorage.setItem('city', newCity || city);
                localStorage.setItem('age', newAge || age);
                location.reload();
            } else {
                alert('Hata: ' + result.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    const deleteAccountButton = document.getElementById('deleteAccount');
    deleteAccountButton.addEventListener('click', () => {
        fetch(`/delete-user/${userId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'User deleted successfully') {
                alert('Hesabınız silindi');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                localStorage.removeItem('city');
                localStorage.removeItem('age');
                window.location.href = 'index.html';
            } else {
                alert('Hata: ' + result.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.clear();
    });
});
