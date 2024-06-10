import type { ClassroomInsert } from "@/database/schema";
import { onCreateClassroom } from "@/functions/Classroom/onCreateClassroom.telefunc";
import { onGetHeadquarters } from "@/functions/Headquarters/onGetHeadquarters.telefunc";
import {
	Button,
	LoadingOverlay,
	Select,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

function CRCreateForm({
	formOpened,
}: { formOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { data, isLoading } = useQuery({
		queryKey: ["headquarters"],
		queryFn: onGetHeadquarters,
	});
	const form = useForm<ClassroomInsert>({
		mode: "controlled",
		initialValues: {
			name: "",
			description: "",
			status: "disponible",
			headquarterId: "",
		},
    validate: {
      name: (value) => z.string().min(3).max(50).safeParse(value).success ? null : "El nombre debe tener entre 3 y 50 caracteres",
      description: (value) => z.string().min(3).max(50).safeParse(value).success ? null : "La descripción debe tener entre 3 y 50 caracteres",
      headquarterId: (value) => z.string().min(3).max(50).safeParse(value).success ? null : "Tiene que seleccionar una sede",
      status: (value) => z.enum(["disponible", "ocupado", "mantenimiento", "evento"]).safeParse(value).success ? null : "El estado debe ser disponible, ocupado, mantenimiento o evento",
    },
	});
	return (
		<>
			{isLoading && <LoadingOverlay visible={isLoading} />}
			<Title ta={"center"} mb={"xl"}>
				Nuevo Salon
			</Title>
			<form
				onSubmit={form.onSubmit(async (values) => {
					formOpened(true);
					const res = await onCreateClassroom(values);
					if (res.status === 201) {
            console.log(res);
						form.reset();
            formOpened(false);
						notifications.show({
              title: "Se ha creado un nuevo salón",
							message: `${res.body}`,
							color: "green",
							autoClose: 2000,
              });
					} else {
						notifications.show({
							title: "Error al crear el salón",
							message: "",
							color: "red",
							autoClose: 2000,
						});
					}

				})}
			>
				<TextInput label="Nombre" {...form.getInputProps("name")} />
				<TextInput label="Descripción" {...form.getInputProps("description")} />
				<Select
					data={data?.map((headquarter) => ({
						value: headquarter.id,
						label: headquarter.name,
					}))}
					label="Sede"
					{...form.getInputProps("headquarterId")}
				/>
				<Select
					label="Estado"
					data={[
						{ value: "disponible", label: "Disponible" },
						{ value: "ocupado", label: "Ocupado" },
						{ value: "mantenimiento", label: "Mantenimiento" },
						{ value: "evento", label: "Evento" },
					]}
					{...form.getInputProps("status")}
				/>
				<Button w={"100%"} mt={"md"} type="submit">
					Crear
				</Button>
			</form>
		</>
	);
}

export default CRCreateForm;
