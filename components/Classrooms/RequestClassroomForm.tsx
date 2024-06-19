import type {
	ClassroomInsert,
	classroomRequestInsert,
} from "@/database/schema";
import { onCreateClassroom } from "@/functions/Classroom/onCreateClassroom.telefunc";
import { onGetHeadquarters } from "@/functions/Headquarters/onGetHeadquarters.telefunc";
import { onCreateClassroomRequest } from "@/functions/Requests/onCreateClassroomRequest.telefunc";
import {
	Button,
	LoadingOverlay,
	Select,
	TextInput,
	Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { z } from "zod";

function CRRequestForm({
	formOpened,
}: { formOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { data, isLoading } = useQuery({
		queryKey: ["headquarters"],
		queryFn: onGetHeadquarters,
	});
	const form = useForm<classroomRequestInsert>({
		mode: "controlled",
		initialValues: {
			requestStartDate: "",
			requestEndDate: "",
			classroomId: "",
			status: "pendiente",
		},
		validate: {
			requestStartDate: (value) =>
				z.date().safeParse(value).success
					? null
					: "La fecha de inicio debe tener entre 3 y 50 caracteres",
			requestEndDate: (value) =>
				z.date().safeParse(value).success
					? null
					: "La fecha de fin debe tener entre 3 y 50 caracteres",
			classroomId: (value) =>
				z.string().safeParse(value).success
					? null
					: "El id del salón debe tener entre 3 y 50 caracteres",
			status: (value) =>
				z.enum(["pendiente", "aceptado", "rechazado"]).safeParse(value).success
					? null
					: "El estado debe ser pendiente, aceptado o rechazado",
		},
	});
	return (
		<>
			{isLoading && <LoadingOverlay visible={isLoading} />}
			<Title ta={"center"} mb={"xl"}>
				Petición de salón
			</Title>
			<form
				onSubmit={form.onSubmit(async (values) => {
					formOpened(true);
					const res = await onCreateClassroomRequest({
						...values,
						requestStartDate: dayjs(values.requestStartDate).format(
							"YYYY-MM-DD",
						),
						requestEndDate: dayjs(values.requestEndDate).format("YYYY-MM-DD"),
					});
					if (res.status === 201) {
						console.log(res);
						form.reset();
						formOpened(false);
						notifications.show({
							title: "Se ha enviado la petición correctamente",
							message: "",
							color: "green",
							autoClose: 2000,
						});
					} else {
						notifications.show({
							title: "Error al enviar la petición",
							message: "",
							color: "red",
							autoClose: 2000,
						});
					}
				})}
			>
				<DateInput
					label="Fecha inicio"
					{...form.getInputProps("requestStartDate")}
				/>
				<DateInput
					mt={"2rem"}
					label="Fecha fin"
					{...form.getInputProps("requestEndDate")}
				/>
				<Button w={"100%"} mt={"2rem"} type="submit">
					Crear
				</Button>
			</form>
		</>
	);
}

export default CRRequestForm;
