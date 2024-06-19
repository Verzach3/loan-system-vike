import { useData } from "vike-react/useData";
import type { HeadquarterData } from "./+data.js";
import {
	Badge,
	Button,
	Card,
	Container,
	Stack,
	Table,
	Tabs,
	Text,
	Title,
} from "@mantine/core";
function ViewHeadquarter() {
	const data = useData<HeadquarterData>();
 
	if (!data) {
		return (
			<Stack h={"100vh"} align="center" justify="center">
				<Title ta={"center"}>No se encontró la sede</Title>
				<Button component="a" href="/dashboard/headquarters">
					Volver
				</Button>
			</Stack>
		);
	}

	const { headquarter, headquarterClassrooms, headquarterResources } = data;

	return (
		<Container mt={"xl"}>
			<Card withBorder bg={"gray.1"} h={"90dvh"} pb={"xl"}>
				<Title>Sede: {headquarter.name}</Title>
				<Text>Descripcion: {headquarter.description}</Text>
				<Text>
					Ciudad: {headquarter.city}, Pais: {headquarter.country}
				</Text>
				<Tabs bg={"white"} mt={"md"} defaultValue="salones">
					<Tabs.List>
						<Tabs.Tab value="salones">Salones</Tabs.Tab>
						<Tabs.Tab value="resources">Recursos</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="salones">
						<div
							style={{
								height: "65dvh",
							}}
						>
							<Table.ScrollContainer minWidth={"100%"}>
								<Table>
									<Table.Thead>
										<Table.Tr>
											<Table.Th>Nombre</Table.Th>
											<Table.Th>Descripción</Table.Th>
											<Table.Th>Estado</Table.Th>
											<Table.Th>Sede</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>
										{headquarterClassrooms.map((classroom) => {
											let color = null;
											switch (classroom.status) {
												case "disponible":
													color = "green";
													break;
												case "mantenimiento":
													color = "yellow";
													break;
												case "evento":
													color = "red";
													break;
												case "ocupado":
													color = "orange";
													break;
											}
											return (
												<Table.Tr key={classroom.id}>
													<Table.Td>{classroom.name}</Table.Td>
													<Table.Td>{classroom.description}</Table.Td>
													<Table.Td>
														<Badge color={color}>{classroom.status}</Badge>
													</Table.Td>
													<Table.Td>{headquarter.name}</Table.Td>
												</Table.Tr>
											);
										})}
									</Table.Tbody>
								</Table>
							</Table.ScrollContainer>
						</div>
					</Tabs.Panel>
					<Tabs.Panel value="resources">
						<div
							style={{
								height: "65dvh",
							}}
						>
							<Table.ScrollContainer minWidth={"100%"}>
								<Table>
									<Table.Thead>
										<Table.Tr>
											<Table.Th>Nombre</Table.Th>
											<Table.Th>Descripción</Table.Th>
											<Table.Th>Estado</Table.Th>
											<Table.Th>Sede</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>
										{headquarterResources.map((resource) => {
											let color = null;
											switch (resource.status) {
												case "disponible":
													color = "green";
													break;
												case "mantenimiento":
													color = "yellow";
													break;
												case "evento":
													color = "red";
													break;
												case "ocupado":
													color = "orange";
													break;
											}
											return (
												<Table.Tr key={resource.id}>
													<Table.Td>{resource.name}</Table.Td>
													<Table.Td>{resource.description}</Table.Td>
													<Table.Td>
														<Badge color={color}>{resource.status}</Badge>
													</Table.Td>
													<Table.Td>{headquarter.name}</Table.Td>
												</Table.Tr>
											);
										})}
									</Table.Tbody>
								</Table>
							</Table.ScrollContainer>
						</div>
					</Tabs.Panel>
				</Tabs>
			</Card>
		</Container>
	);
}

export default ViewHeadquarter;
