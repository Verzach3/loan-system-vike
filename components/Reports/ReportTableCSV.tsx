import type { ReportData } from "@/pages/dashboard/reports/types/report";
import { Button } from "@mantine/core";

export default function ReportTableCSV({ reportData }: { reportData: ReportData[] }) {

  const convertToCSV = (data: ReportData[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
  
    csvRows.push(headers.join(','));
  
    for (const row of data) {
      const values = headers.map((header) => row[header as keyof ReportData]);
      csvRows.push(values.join(','));
    }
  
    return csvRows.join('\n');
  }

  const handleDownload = () => {
    const csvData = convertToCSV(reportData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'datos_tabla.csv');
    link.click();
  };

  return (
    <div>
      <Button onClick={ handleDownload }>Descargar CSV</Button>
    </div>
  );
}
