import { useState, useEffect } from "react";
import { Select } from "@mantine/core";




import "./table.style.css";
import type { HistoryData } from "./types/history";
import HistoryTable from "./HistoryTable";
import { onShowHistory } from "@/functions/History/onShowHistory.telefunc";

export default function History() {
	const [historyData, setHistoryData] = useState<HistoryData[]>([]);


    useEffect(() => {
       (async () => {
        const hystory = await onShowHistory();
        setHistoryData(hystory.data?.all ?? []);
	    })();
    }, []);


    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleFilter = async (value: any) => {
        const history = await onShowHistory();

        switch (value) {
            case 'Salones':
                setHistoryData(history.data?.classroom ?? []);
                break;
            case 'Recursos':
                setHistoryData(history.data?.resource ?? []);
                break;
            default:
                setHistoryData(history.data?.all ?? []);
                break;
        }
    }

	return (
		<>
            
			<h1 className="HistoryTitle">Historial del usuario</h1>
            <div className="SelectFilter">
            <Select
                placeholder="Filtrar por"
                data={['Salones', 'Recursos', 'Todos']}
                size="sm"
                onChange={  handleFilter  }
                styles={{ label: { fontSize: 17} }}
            />
            </div>
			<HistoryTable historyData={ historyData } />
		</>
	);
}
