import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Table, Loader, Divider } from '@mantine/core';
import { Button } from "@mantine/core";

import type { ReportData } from './types/report';
import ReportTableCSV  from '@/components/Reports/ReportTableCSV';



export default function ReportTable({ reportData }: { reportData: ReportData[] }) {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    setReports(reportData);
    setLoading(false);
 }, [reportData]);


  const rows = reports.map((rep) => (
    <Table.Tr key={nanoid()}>
      <Table.Td>{rep.name}</Table.Td>
      <Table.Td>{rep.email}</Table.Td>
      <Table.Td>{rep.requestStartDate}</Table.Td>
      <Table.Td>{rep.requestEndDate}</Table.Td>
      <Table.Td>{rep.requestType}</Table.Td>
      <Table.Td>{rep.status}</Table.Td>
    </Table.Tr>
  ));



  return (
    <>
      <div className="table-container">
        <Divider my="md" />
        <ReportTableCSV reportData={ reports } />
        <Divider my="md" />
        <Table striped highlightOnHover withTableBorder withColumnBorders layout='unset'> 
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nombre de usuario</Table.Th>
              <Table.Th>Correo Eléctronico</Table.Th>
              <Table.Th>Fecha de Solicitud</Table.Th>
              <Table.Th>Fecha de Finalización</Table.Th>
              <Table.Th>Tipo de Solicitud</Table.Th>
              <Table.Th>Estado</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="loader">
            {loading && <Loader color="blue" type="dots"/>}
        </div>
      </div>
    </>
  );
}