import HeadquarterItem from "@/components/HeadquarterItem";
import HQCreateForm from "@/components/Headquarters/CreateForm";
import { onGetHeadquarters } from "@/functions/Headquarters/onGetHeadquarters.telefunc";
import { onGetUserData } from "@/functions/onGetUserData.telefunc";
import {
	Affix,
	Button,
	Container,
	Grid,
	Group,
	LoadingOverlay,
	Modal,
	TextInput,
	Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";




function Headquarters() {
	const [searchValue, setSearchValue] = useState("");
	const [isOpened, setIsOpened] = useState(false);
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["headquarters"],
		queryFn: onGetHeadquarters,
	});

	const { data: userDate } = useQuery({
		queryKey: ["user"],
		queryFn: onGetUserData,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		refetch();
	}, [isOpened]);

	return (
		<>
			{isLoading && <LoadingOverlay visible={isLoading} />}
			<Modal opened={isOpened} onClose={() => setIsOpened(false)}>
				<HQCreateForm formOpened={setIsOpened} />
			</Modal>
			<Container mt={"md"} pb={"4rem"}>
				<Title>Sedes</Title>
				<Group grow>
					<TextInput
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Buscar"
					/>
				</Group>
				<Grid mt={"lg"}>
					{data
						?.filter((headquarter) =>
							headquarter.name
								.toLowerCase()
								.includes(searchValue.toLowerCase()),
						)
						.map((headquarter) => (
							<Grid.Col span={{ base: 3 }} key={headquarter.id}>
								<HeadquarterItem headquarter={headquarter} />
							</Grid.Col>
						))}
				</Grid>
			</Container>
			<Affix position={{ bottom: 20, right: 20 }}>
				{userDate?.role === "admin" && (
					<>
						<Button onClick={() => setIsOpened(true)} leftSection={<IconPlus />}>
							Nueva Sede
						</Button>

					<Button onClick={() => "Eliminar" } leftSection={<IconPlus />}>
						Eliminar Sede
					</Button>
					
					</>
				)}
			</Affix>
		</>
	);
}

export default Headquarters;
