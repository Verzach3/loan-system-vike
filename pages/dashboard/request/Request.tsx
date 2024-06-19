import { useEffect, useState } from "react";
import {
    Select,
    Divider,
    Table,
    Loader,
} from "@mantine/core";
import { nanoid } from "nanoid";
import { onShowRequest } from "../../../functions/Requests/onShowRequest.telefunc";
import type { ReportData } from "../reports/types/report";
import classes from "./requestStyle/GradientSegmentedControl.module.css";
import classes2 from "./requestStyle/RequestTable.module.css";
import type { classroomRequestInsert, resourceRequestInsert } from "@/./database/schema";
import { onUpdateClassroomRequest } from "@/functions/Requests/onUpdateClassroomRequest.telefunc";

interface RequestData {
    role: 'student' | 'professor' | 'admin',
    reportData: ReportData,
    resourceId?: string,
    classroomId?: string,
    userId?: string
}

export default function Request() {
    const [reportData, setReportData] = useState<RequestData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const reports = await onShowRequest();
            console.log(reports.data?.resourceQuery);

            const data: RequestData[] = [];

            reports.data?.resourceQuery?.map((report) => {
                data.push({
                    role: report.role,
                    reportData: {
                        name: report.name,
                        email: report.email,
                        requestStartDate: report.requestStartDate,
                        requestEndDate: report.requestEndDate,
                        requestType: "Resource",
                        status: report.status,
                        id: report.id
                    },
                    resourceId: report.resourceId,
                    userId: report.userId
                });

                return data;
            });

            reports.data?.classroomQuery?.map((report) => {
                data.push({
                    role: report.role,
                    reportData: {
                        name: report.name,
                        email: report.email,
                        requestStartDate: report.requestStartDate,
                        requestEndDate: report.requestEndDate,
                        requestType: "Classroom",
                        status: report.status,
                        id: report.id
                    },
                    classroomId: report.classroomId,
                    userId: report.userId
                });

                return data;
            });
            setReportData(data);
            setLoading(false);
        })();
    }, []);

    const handleStatus = async (value: classroomRequestInsert | resourceRequestInsert, requestId: string) => {
        console.log(requestId);
        const query = await onUpdateClassroomRequest(value, requestId);
        console.log(query);
        
        setReportData(prevData =>
            prevData.map(item =>
                item.reportData.id === requestId
                    ? {
                        ...item,
                        reportData: {
                            ...item.reportData,
                            status: value.status
                        }
                    }
                    : item
            )
        );
    };

    const rows = reportData.map((rep) => (
        <Table.Tr key={nanoid()}>
            <Table.Td>{rep.reportData.name}</Table.Td>
            <Table.Td>{rep.reportData.email}</Table.Td>
            <Table.Td>{rep.reportData.requestStartDate}</Table.Td>
            <Table.Td>{rep.reportData.requestEndDate}</Table.Td>
            <Table.Td>{rep.reportData.requestType}</Table.Td>
            <Table.Td>
                <Select
                    data={["pendiente", "rechazado", "aprobado"]}
                    value={rep.reportData.status}
                    onChange={(value) => {
                        const temp: classroomRequestInsert | resourceRequestInsert = {
                            requestStartDate: rep.reportData.requestStartDate,
                            requestEndDate: rep.reportData.requestEndDate,
                            status: value as "pendiente" | "rechazado" | "aprobado",
                            ...(rep.resourceId ? { resourceId: rep.resourceId } : { classroomId: rep.classroomId || "" })
                        };

                        handleStatus(temp, rep.reportData.id || "");
                    }}
                />
            </Table.Td>
            <Table.Td>{rep.role}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <h1 className={classes2.titleSl}>Solicitudes</h1>
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
                    {loading && <Loader color="blue" type="dots" />}
                </div>
            </div>
        </>
    );
}
