import ResourceItem from "@/components/ResourceItem";
import { onGetClassrooms } from "@/functions/Requests/onGetClassrooms.telefunc";
import {
	Affix,
	Button,
	Container,
	Grid,
	Group,
	LoadingOverlay,
	Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function Classrooms() {
	const { data, isLoading } = useQuery({
		queryKey: ["classrooms"],
		queryFn: onGetClassrooms,
	});

	useEffect(() => {
		console.log(data);
	});

	return (
		<Container mt={"md"}>
			<Title>Salones</Title>
			{isLoading && <LoadingOverlay visible={isLoading} />}
			<Grid mt={"lg"}>
				{data?.map((classroom) => (
					<Grid.Col span={{ base: 5 }} key={classroom.id}>
						<ResourceItem classroom={classroom} />
					</Grid.Col>
				))}
			</Grid>
			<Affix position={{ bottom: 20, right: 20 }}>
				<Button leftSection={<IconPlus />}>Nueva Sede</Button>
			</Affix>
		</Container>
	);
}

export default Classrooms;
