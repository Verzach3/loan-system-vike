import { useState } from 'react';
import { Table } from '@mantine/core';

import type { reportType } from './types/report';

export default function ReportTable( { reportData } : { reportData: []} ) {
    
    const [reports, setReports] = useState<reportType[]>(reportData);

    
        
const rows = reports.map((rep) => (
    <Table.Tr key={rep.name}>
      <Table.Td>{rep.email}</Table.Td>
      <Table.Td>{rep.requestStartDate}</Table.Td>
      <Table.Td>{rep.requestEndDate}</Table.Td>
      <Table.Td>{rep.requestType}</Table.Td>
      <Table.Td>{rep.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
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
  );
}