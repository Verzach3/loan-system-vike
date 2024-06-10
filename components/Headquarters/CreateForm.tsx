import { onCreateHeadquarters } from "@/functions/Headquarters/onCreateHeadquarters.telefunc";
import { Button, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

function HQCreateForm({
	formOpened,
}: { formOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
	const form = useForm({
		mode: "controlled",
		initialValues: {
			name: "",
			description: "",
			city: "",
			country: "",
		},
	});
	return (
		<>
			<Title ta={"center"} mb={"xl"}>
				Nueva Sede
			</Title>
			<form
				onSubmit={form.onSubmit(async (values) => {
					formOpened(true);
					const res = await onCreateHeadquarters(values);
          formOpened(false);
					if (res.status === 201) {
						console.log(res);
						form.reset();
						notifications.show({
							title: "Se ha creado una nueva sede",
							message: "",
							color: "green",
							autoClose: 2000,
						});
					}
				})}
			>
				<TextInput label="Nombre" {...form.getInputProps("name")} />
				<TextInput label="Descripción" {...form.getInputProps("description")} />
				<TextInput label="Ciudad" {...form.getInputProps("city")} />
				<TextInput label="País" {...form.getInputProps("country")} />
				<Button w={"100%"} mt={"md"} type="submit">
					Crear
				</Button>
			</form>
		</>
	);
}

export default HQCreateForm;
