import RSCreateForm from "@/components/Resources/CreateForm";
import ResourceItem from "@/components/ResourceItem";
import { onGetHeadquarters } from "@/functions/Headquarters/onGetHeadquarters.telefunc";
import {
	Affix,
	Button,
	Container,
	Grid,
	LoadingOverlay,
	Modal,
	Select,
	Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { onGetResources } from "@/functions/Resources/onGetResources.telefunc";
import { onGetUserData } from "@/functions/onGetUserData.telefunc";

function Resources() {
	const [isOpened, setIsOpened] = useState(false);
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["classrooms"],
		queryFn: onGetResources,
	});

	const [selectedHQ, setSelectedHQ] = useState<string | null>(null);
	const {
		data: dataHQ,
		isLoading: isLoadingHQ,
		refetch: refetchHQ,
	} = useQuery({
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
			<Modal opened={isOpened} onClose={() => setIsOpened(false)}>
				<RSCreateForm formOpened={setIsOpened} />
			</Modal>
			<Container mt={"md"} pb={"4rem"}>
				<Title>Recursos</Title>
				{isLoading && <LoadingOverlay visible={isLoading} />}
				<Select
					data={dataHQ?.map((headquarter) => ({
						label: headquarter.name,
						value: headquarter.id,
					}))}
					value={selectedHQ}
					onChange={(value) => {
						setSelectedHQ(value);
					}}
					placeholder="Filtrar por sede"
					radius="md"
					variant="filled"
					size="sm"
					wrapperProps={{ mt: "sm" }}
				/>
				<Grid mt={"lg"}>
					{!isLoading &&
						data
							?.filter((resource) =>
								resource.headquarterId.includes(selectedHQ ?? ""),
							)
							.map((resource) => (
								<Grid.Col span={{ base: 6 }} key={resource.id}>
									<ResourceItem type="resource" classroom={resource} />
								</Grid.Col>
							))}
				</Grid>
				<Affix position={{ bottom: 20, right: 20 }}>
					{userDate?.role === "admin" && (
						<Button
							leftSection={<IconPlus />}
							onClick={() => setIsOpened(true)}
						>
							Nuevo recurso
						</Button>
					)}
				</Affix>
			</Container>
		</>
	);
}

export default Resources;
