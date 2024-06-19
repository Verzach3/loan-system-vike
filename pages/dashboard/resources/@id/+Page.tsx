import {
	Container,
	Stack,
	Button,
	Title,
	Text,
	Badge,
	Popover,
	Indicator,
	Affix,
	Card,
	Group,
	Modal,
	Table,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import type { ResourceData } from "./+data";
import { useData } from "vike-react/useData";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import RequestClassroomForm from "@/components/Classrooms/RequestClassroomForm";
import { IconExternalLink } from "@tabler/icons-react";
import dayjs from "dayjs";
import RequestResourceForm from "@/components/Resources/RequestResourceForm";

function ViewResource() {
	const data = useData<ResourceData>();
	const [opened, { open, close }] = useDisclosure(false);
	const [isOpened, setIsOpened] = useState(false);

	if (data.status === 404 || data.error) {
		return (
			<Stack h={"100vh"} align="center" justify="center">
				<Title ta={"center"}>No se encontró la sede</Title>
				<Button component="a" href="/dashboard/headquarters">
					Volver
				</Button>
			</Stack>
		);
	}
	const { resource, resources } = data.body;
	return (
		<Container>
			<Card withBorder bg={"gray.1"} h={"90dvh"} pb={"xl"} mt="md">
				<Card bg={"gray.2"} withBorder mb={"md"}>
					<Group grow justify="space-between">
						<Stack h={"100%"} justify="flex-start">
							<Title>{resource.name}</Title>
							<Group>
								<Button
									component="a"
									href={`/dashboard/headquarters/${resource.headquarter.id}`}
									rightSection={<IconExternalLink />}
								>
									Sede: {resource.headquarter.name}
								</Button>
							</Group>
						</Stack>
						<Group justify="end">
							<Calendar
								static
								renderDay={(date) => {
									const [opened, { close, open }] = useDisclosure(false);
									const day = date.getDate();
									const currReservation = resources.find(
										(resource) =>
											dayjs(resource.requestStartDate).format(
												"DD-MM-YYYY",
											) === dayjs(date).format("DD-MM-YYYY"),
									);
									if (
										currReservation &&
										currReservation.status === "aprobado"
									) {
										return (
											<Popover opened={opened} closeOnClickOutside={false}>
												<Popover.Target>
													<Indicator
														size={6}
														color="red"
														offset={-2}
														onMouseEnter={open}
														onMouseLeave={close}
													>
														<div>{day}</div>
													</Indicator>
												</Popover.Target>
												<Popover.Dropdown>
													<Text>Reservado por {currReservation.user.name}</Text>
												</Popover.Dropdown>
											</Popover>
										);
									}

									return null;
								}}
							/>
						</Group>
					</Group>
				</Card>
				<Table.ScrollContainer minWidth={"100%"}>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Usuario</Table.Th>
								<Table.Th>Estado</Table.Th>
								<Table.Th>Fecha</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{resources.map((reservation) => {
								let color = null;
								switch (reservation.status) {
									case "aprobado":
										color = "green";
										break;
									case "rechazado":
										color = "red";
										break;
									case "pendiente":
										color = "orange";
										break;
								}
								return (
									<Table.Tr key={reservation.id}>
										<Table.Td>{reservation.user.name}</Table.Td>
										<Table.Td>
											<Badge color={color ?? undefined}>
												{reservation.status}
											</Badge>
										</Table.Td>
										<Table.Td>{reservation.requestStartDate}</Table.Td>
									</Table.Tr>
								);
							})}
						</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Card>
			<Card>
				<Affix position={{ bottom: 100, right: 380 }}>
					<Button onClick={open}>Reservar</Button>
				</Affix>
			</Card>

			<Modal opened={opened} onClose={close}>
				<RequestResourceForm formOpened={setIsOpened} />
			</Modal>
		</Container>
	);
}

export default ViewResource;
