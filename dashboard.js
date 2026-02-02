// Cek login
if (!localStorage.getItem('user')) window.location.href = 'login.html';
const user = JSON.parse(localStorage.getItem('user'));
if (user.role !== 'admin') document.getElementById('settingsNav').style.display = 'none';

// Fetch data untuk statistik
fetch('YOUR_WEB_APP_URL?method=getStats')
    .then(res => res.json())
    .then(data => {
        document.getElementById('totalTanaman').textContent = data.totalTanaman;
        document.getElementById('lokasiUnik').textContent = data.lokasiUnik;
        document.getElementById('statusAktif').textContent = data.statusAktif;
    });

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});
