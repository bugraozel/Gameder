// public/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/create-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Kayıt başarılı!');
                    window.location.href = 'login.html';
                } else {
                    const error = await response.json();
                    alert('Kayıt başarısız: ' + error.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Kayıt sırasında bir hata oluştu.');
            }
        });
    }
});
