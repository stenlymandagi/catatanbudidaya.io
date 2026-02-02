document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = CryptoJS.MD5(document.getElementById('password').value).toString();
    const response = await fetch(https://stenlymandagi.github.io/catatanbudidaya.io/, {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = 'Login gagal';
    }
});
