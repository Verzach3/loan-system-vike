import { useState, useEffect } from "react";
import { Select, Container, Loader, Center, Group } from "@mantine/core";
import { onShowReports } from "../../../functions/Reports/onShowReports.telefunc";
import ReportTable from "./ReportTable";

import "./table.style.css";
import { useQuery } from "@tanstack/react-query";

export default function Reports() {
	const {
		data: reportData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["reports"],
		queryFn: onShowReports,
	});
	const [filter, setFilter] = useState<"salones" | "recursos" | "todos">(
		"todos",
	);

	if (isLoading) {
		return (
			<Container h="100vh">
				<Group h="100vh" justify="center" align="center">
					<Loader type="dots" />
				</Group>
			</Container>
		);
	}

	return (
		<>
			<h1 className="ReportTitle">Reporte de Usuarios</h1>
			<div className="SelectFilter">
				<Select
					placeholder="Filtrar por"
					data={[
						{ label: "Salones", value: "salones" },
						{ label: "Recursos", value: "recursos" },
						{ label: "Todos", value: "todos" },
					]}
					size="sm"
					// biome-ignore lint/suspicious/noExplicitAny: no time for type
					onChange={(e) => setFilter((e as any) ?? "todos")}
					styles={{ label: { fontSize: 17 } }}
				/>
			</div>
			<ReportTable
				reportData={
					filter === "todos"
						? reportData?.data?.all ?? []
						: filter === "salones"
							? reportData?.data?.classroom ?? []
							: filter === "recursos"
								? reportData?.data?.resource ?? []
								: []
				}
			/>
		</>
	);
}
