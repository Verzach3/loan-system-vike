import HeadquarterItem from "@/components/HeadquarterItem";
import { onGetHeadquarters } from "@/functions/Requests/onGetHeadquarters.telefunc";
import { Affix, Button, Container, Grid, Group, LoadingOverlay, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function Headquarters() {
	const { data, isLoading } = useQuery({
		queryKey: ["classrooms"],
		queryFn: onGetHeadquarters,
	});

	useEffect(() => {
		console.log(data);
	});

	return (
		<>
			<Container mt={"md"}>
				<Title>Sedes</Title>
        {isLoading && <LoadingOverlay visible={isLoading} />}
				<Grid>
					{data?.map((headquarter) => (
						<Grid.Col span={{ base: 5 }} key={headquarter.id}>
							<HeadquarterItem headquarter={headquarter} />
						</Grid.Col>
					))}
				</Grid>
			</Container>
			<Affix position={{ bottom: 20, right: 20 }}>
				<Button leftSection={<IconPlus />}>Nueva Sede</Button>
			</Affix>
		</>
	);
}

export default Headquarters;
