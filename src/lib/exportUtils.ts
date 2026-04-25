import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (data: any[], fileName: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: any, fileName: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.json`);
  link.click();
};

export const exportToPDF = (title: string, headers: string[][], data: any[][], fileName: string) => {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(title, 14, 20);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
  
  (doc as any).autoTable({
    head: headers,
    body: data,
    startY: 40,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });
  
  doc.save(`${fileName}.pdf`);
};
