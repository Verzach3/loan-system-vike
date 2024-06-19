import { Container } from "@mantine/core";
import { useEffect } from "react";

function Dashboard() {
	useEffect(() => {
		window.location.href = "/dashboard/resources"
	}, [])
	
	return null
}

export default Dashboard;