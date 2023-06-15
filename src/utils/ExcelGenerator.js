import XLSX from 'xlsx';

const ExcelGenerator = {
  generateExcel: (data) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

    const buffer = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'gridData.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default ExcelGenerator;
