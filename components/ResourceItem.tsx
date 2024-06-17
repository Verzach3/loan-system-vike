import {
	Card,
	Image,
	Group,
	Text,
	Badge,
	ThemeIcon,
	Button,
	Center,
} from "@mantine/core";
import classes from "./ResourceItem.module.css";
import { IconBuilding } from "@tabler/icons-react";
import { navigate } from "vike/client/router";

type Classroom = {
	id: string;
	name: string;
	description: string;
	status: "disponible" | "mantenimiento" | "evento" | "ocupado";
	headquarterId: string;
	headquarter: {
		id: string;
		name: string;
		description: string;
		city: string;
		country: string;
	};
};

function ResourceItem({ classroom, type }: { classroom: Classroom; type: "resource" | "classroom" }) {
	console.log(classroom.headquarter);
	if (!classroom) return null;
	return (
		<Card withBorder padding="lg" radius="md" className={classes.card}>
			<Card.Section mb="sm">
				<Image
					src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
					alt="Top 50 underrated plants for house decoration"
					height={180}
				/>
			</Card.Section>
			
			{classroom.status === "disponible" && (
				<Badge w="fit-content" variant="light" color="green">
					{classroom.status}
				</Badge>
			)}
			{classroom.status === "ocupado" && (
				<Badge w="fit-content" variant="light" color="red">
					{classroom.status}
				</Badge>
			)}
			{classroom.status === "evento" && (
				<Badge w="fit-content" variant="light" color="orange">
					{classroom.status}
				</Badge>
			)}
			{classroom.status === "mantenimiento" && (
				<Badge w="fit-content" variant="light" color="black">
					{classroom.status}
				</Badge>
			)}

			<Text fw={700} className={classes.title} mt="xs">
				{classroom.name}
			</Text>

			<Group mt="lg">
				<ThemeIcon size={"lg"}>
					<IconBuilding />
				</ThemeIcon>
				<div>
					<Text fw={500} td={"underline"} c={"blue"} >{classroom.headquarter.name}</Text>
					<Text fz="xs" c="dimmed">
						{classroom.headquarter.city}, {classroom.headquarter.country}
					</Text>
				</div>
			</Group>

			<Card.Section>
				<Center>
					<Button
						w={"100%"}
						mx={"sm"}
						my={"sm"}
						variant="filled"
						color="blue"
						onClick={() => navigate(`/dashboard/${type === "resource" ? "resources" : "classrooms"}/${classroom.id}`)}
					>
						Ver
					</Button>
				</Center>
			</Card.Section>
		</Card>
	);
}

export default ResourceItem;
