// Cek login
if (!localStorage.getItem('user')) window.location.href = 'login.html';

// Form submit
document.getElementById('inputForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        namaPetani: document.getElementById('namaPetani').value,
        jenisTanaman: document.getElementById('jenisTanaman').value,
        lokasiLahan: document.getElementById('lokasiLahan').value,
        luasLahan: document.getElementById('luasLahan').value,
        tanggalTanam: document.getElementById('tanggalTanam').value,
        jenisPupuk: document.getElementById('jenisPupuk').value,
        volumePupuk: document.getElementById('volumePupuk').value,
        jenis
