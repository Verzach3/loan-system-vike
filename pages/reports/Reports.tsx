import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import { onShowReports } from "../../functions/Reports/onShowReports.telefunc";
import ReportTable from "./ReportTable";

import type { ReportData } from "./types/report";
import classes from "./table.module.css"

export default function Reports({ userId }: { userId: string }) {
	const [reportData, setReportData] = useState<ReportData[]>([]);


    useEffect(() => {
    
        const handleShowReports = async () => {
        
        const reports = await onShowReports();


        if (reports.error) {
            // TODO: handle error
            return; 
        }

       
        setReportData(reports.body?.all ?? []);

	    };

    handleShowReports();
    }, []);

	return (
		<>
            
			<h1>Reports Page</h1>
            <Select
                label="Filtrar por"
                data={['Salones', 'Recursos', 'Profesores', 'Estudiantes']}
                size="sm"
                className="SelectFilter"
            />
			<ReportTable reportData={ reportData } />
		</>
	);
}
