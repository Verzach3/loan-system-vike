import {
	Badge,
	Button,
	Card,
	Container,
	Stack,
	Table,
	Title,
	Group,
	Indicator,
	Popover,
	Text,
	Affix,
	Modal,
} from "@mantine/core";
import { useData } from "vike-react/useData";
import type { ClassroomData } from "./+data";
import { IconExternalLink } from "@tabler/icons-react";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { Form } from "@mantine/form";
import RequestClassroomForm from "@/components/Classrooms/RequestClassroomForm";
import { useState } from "react";

function ViewClassroom() {
	const data = useData<ClassroomData>();
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
	const { classroom, classroomReservations } = data.body;
	return (
		<Container>
			<Card withBorder bg={"gray.1"} h={"90dvh"} pb={"xl"} mt="md">
				<Card bg={"gray.2"} withBorder mb={"md"}>
					<Group grow justify="space-between">
						<Stack h={"100%"} justify="flex-start">
							<Title>{classroom.name}</Title>
							<Group>
								<Button
									component="a"
									href={`/dashboard/headquarters/${classroom.headquarter.id}`}
									rightSection={<IconExternalLink />}
								>
									Sede: {classroom.headquarter.name}
								</Button>
							</Group>
						</Stack>
						<Group justify="end">
							<Calendar
								static
								renderDay={(date) => {
									const [opened, { close, open }] = useDisclosure(false);
									const day = date.getDate();
									const currReservation = classroomReservations.find(
										(reservation) =>
											dayjs(reservation.requestStartDate).format(
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
								<Table.Th>Nombre</Table.Th>
								<Table.Th>Descripción</Table.Th>
								<Table.Th>Estado</Table.Th>
								<Table.Th>Fecha</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{classroomReservations.map((reservation) => {
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
										<Table.Td>{reservation.id}</Table.Td>
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

			<Modal
				opened={opened}
				onClose={close}
			>
				<RequestClassroomForm formOpened={setIsOpened} />
			</Modal>
		</Container>
	);
}

export default ViewClassroom;
