document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-form');
    const reportsList = document.getElementById('reports-list');
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportExcelBtn = document.getElementById('export-excel');
    let reports = JSON.parse(localStorage.getItem('reports')) || [];

    // Fungsi untuk menampilkan laporan
    function displayReports() {
        reportsList.innerHTML = '';
        reports.forEach((report, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${report.date}</strong> - <em>${report.treatment}</em><br>
                    ${report.development}
                </div>
                <div>
                    <button onclick="editReport(${index})">Edit</button>
                    <button onclick="deleteReport(${index})">Hapus</button>
                </div>
            `;
            reportsList.appendChild(li);
        });
    }

    // Tambah laporan baru
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const treatment = document.getElementById('treatment').value;
        const development = document.getElementById('development').value;
        
        reports.push({ date, treatment, development });
        localStorage.setItem('reports', JSON.stringify(reports));
        displayReports();
        form.reset();
    });

    // Edit laporan
    window.editReport = (index) => {
        const report = reports[index];
        document.getElementById('date').value = report.date;
        document.getElementById('treatment').value = report.treatment;
        document.getElementById('development').value = report.development;
        reports.splice(index, 1);
        localStorage.setItem('reports', JSON.stringify(reports));
        displayReports();
    };

    // Hapus laporan
    window.deleteReport = (index) => {
        reports.splice(index, 1);
        localStorage.setItem('reports', JSON.stringify(reports));
        displayReports();
    };

    // Generate PDF
    exportPdfBtn.addEventListener('click', () => {
        if (reports.length === 0) {
            alert('Tidak ada data laporan untuk diekspor.');
            return;
        }
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('Laporan Perkembangan Tanaman', 20, 20);
        
        let y = 40;
        reports.forEach((report, index) => {
            doc.setFontSize(12);
            doc.text(`${index + 1}. Tanggal: ${report.date}`, 20, y);
            y += 10;
            doc.text(`   Perlakuan: ${report.treatment}`, 20, y);
            y += 10;
            doc.text(`   Perkembangan: ${report.development}`, 20, y);
            y += 20;
            if (y > 270) { // Jika halaman penuh, tambah halaman baru
                doc.addPage();
                y = 20;
            }
        });
        
        doc.save('laporan_perkembangan_tanaman.pdf');
    });

    // Generate Excel
    exportExcelBtn.addEventListener('click', () => {
        if (reports.length === 0) {
            alert('Tidak ada data laporan untuk diekspor.');
            return;
        }
        
        const ws = XLSX.utils.json_to_sheet(reports.map((report, index) => ({
            'No': index + 1,
            'Tanggal': report.date,
            'Perlakuan': report.treatment,
            'Perkembangan': report.development
        })));
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Laporan');
        XLSX.writeFile(wb, 'laporan_perkembangan_tanaman.xlsx');
    });

    // Tampilkan laporan saat load
    displayReports();
});