import { useEffect, useState } from "react";
import {
	Select,
	Divider,
	Table,
	Loader,
	SegmentedControl,
} from "@mantine/core";
import { nanoid } from "nanoid";
import { onShowRequest } from "../../../functions/Requests/onShowRequest.telefunc";
import type { ReportData } from "../reports/types/report";
import ReportTable from "../reports/ReportTable";
import classes from "./requestStyle/GradientSegmentedControl.module.css";
import classes2 from "./requestStyle/RequestTable.module.css";
import { classroomRequestInsert } from "@/./database/schema"
import { onUpdateClassroomRequest } from "@/functions/Requests/onUpdateClassroomRequest.telefunc";
import { useQuery } from "@tanstack/react-query";




export default function Request() {
	const {
		data: reportData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["request"],
		queryFn: onShowRequest,
	});



	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleStatus = (value: any) => {
		

	};



	const rows = reportData.map((rep) => (
		<Table.Tr key={nanoid()}>
			<Table.Td>{rep.reportData.name}</Table.Td>
			<Table.Td>{rep.reportData.email}</Table.Td>
			<Table.Td>{rep.reportData.requestStartDate}</Table.Td>
			<Table.Td>{rep.reportData.requestEndDate}</Table.Td>
			<Table.Td>{rep.reportData.requestType}</Table.Td>
			<Table.Td>{<Select data={["pendiente", "rechazado", "aprobado"]} value={ rep.reportData.status } />}</Table.Td>
			<Table.Td>{rep.role}</Table.Td>
		</Table.Tr>
	));



	return (
		<>
			<h1 className={classes2.titleSl}>Solicitudes</h1>
			<Divider />
			<div className={classes2.segment}>
				<SegmentedControl
					radius="xl"
					size="md"
					data={["Estudiantes", "Profesores"]}
					classNames={classes}
				/>
			</div>
			<Divider />
			<div className={classes2.table}>
				<Table
					striped
					highlightOnHover
					withTableBorder
					withColumnBorders
					layout="unset"
				>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nombre de usuario</Table.Th>
							<Table.Th>Correo Eléctronico</Table.Th>
							<Table.Th>Fecha de Solicitud</Table.Th>
                            <Table.Th>Fecha de Finalización</Table.Th>
							<Table.Th>Tipo de Solicitud</Table.Th>
							<Table.Th>Estado</Table.Th>
                            <Table.Th>Rol</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
				<div className="loader">
					{isLoading&& <Loader color="blue" type="dots" />}
				</div>
			</div>
		</>
	);
}
