import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
	TextInput,
	PasswordInput,
	Paper,
	Group,
	type PaperProps,
	Button,
	Anchor,
	Stack,
	Container,
	Title,
} from "@mantine/core";
import { z } from "zod";
import { onRegister } from "@/functions/onRegister.telefunc";
import { onLogin } from "@/functions/onLogin.telefunc";
import { notifications } from "@mantine/notifications";
import { match } from "ts-pattern";
import { useState } from "react";
import { navigate } from "vike/client/router";

function AuthenticationForm(props: PaperProps) {
	const [loading, setLoading] = useState(false);
	const [authType, toggle] = useToggle(["login", "register"]);
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
		},

		validate: {
			name: (val) =>
				authType === "register"
					? z.string().min(4).max(20).safeParse(val).success
						? null
						: "El nombre debe tener entre 4 y 20 caracteres"
					: null,
			email: (val) =>
				z.string().email().safeParse(val).success
					? null
					: "Tienes que ingresar un email válido",
			password: (val) =>
				z.string().min(6).max(20).safeParse(val).success
					? null
					: "La contraseña debe tener entre 6 y 20 caracteres",
		},
	});

	return (
		<Group w={"100vw"} h={"100vh"} bg={"gray.5"}>
			<Container w={"40%"}>
				<Paper radius="md" p="xl" withBorder {...props}>
					<Title ta={"center"} fw={600} mb={"lg"}>
						Bienvenido a LoanSystem
					</Title>

					<form
						onSubmit={form.onSubmit(async (vals) => {
							setLoading(true);
							if (authType === "register") {
								try {
									const res = await onRegister({
										email: vals.email,
										password: vals.password,
										name: vals.name,
									});
									match(res)
										.with({ status: 200 }, (val) => {
											notifications.show({
												title: "Registrado correctamente",
												message: val.body.message,
												color: "green",
												autoClose: 2000,
											});
											navigate("/dashboard");
										})
										.with({ status: 400 }, (val) =>
											notifications.show({
												title: "Error al registrarte",
												message: val.body.message,
												color: "red",
												autoClose: 2000,
											}),
										);
								} catch (error) {
									notifications.show({
										title: "Error al registrarte",
										message: "No pudimos conectarnos al servidor",
										color: "red",
										autoClose: 2000,
									});
								}
							} else {
								const res = await onLogin({
									email: vals.email,
									password: vals.password,
								});
								match(res)
									.with({ status: 200 }, (val) => {
										notifications.show({
											title: "Iniciado sesión correctamente",
											message: val.body.message,
											color: "green",
											autoClose: 2000,
										});
										navigate("/dashboard");
									})
									.with({ status: 400 }, (val) =>
										notifications.show({
											title: "Error al iniciar sesión",
											message: val.body.message,
											color: "red",
											autoClose: 2000,
										}),
									);
							}
							setLoading(false);
						})}
					>
						<Stack>
							{authType === "register" && (
								<TextInput
									label="Name"
									placeholder="Your name"
									value={form.values.name}
									onChange={(event) =>
										form.setFieldValue("name", event.currentTarget.value)
									}
									error={form.errors.name}
									radius="md"
								/>
							)}

							<TextInput
								required
								label="Email"
								placeholder="hello@mantine.dev"
								value={form.values.email}
								onChange={(event) =>
									form.setFieldValue("email", event.currentTarget.value)
								}
								error={form.errors.email}
								radius="md"
							/>

							<PasswordInput
								required
								label="Password"
								placeholder="Your password"
								value={form.values.password}
								onChange={(event) =>
									form.setFieldValue("password", event.currentTarget.value)
								}
								error={form.errors.password}
								radius="md"
							/>
						</Stack>

						<Group justify="space-between" mt="xl">
							<Anchor
								component="button"
								type="button"
								c="dimmed"
								onClick={() => toggle()}
								size="xs"
							>
								{authType === "register"
									? "Ya tienes una cuenta? Inicia sesión"
									: "¿No tienes una cuenta? Registrate"}
							</Anchor>
							<Button loading={loading} type="submit" radius="xl">
								{upperFirst(authType)}
							</Button>
						</Group>
					</form>
				</Paper>
			</Container>
		</Group>
	);
}

export default AuthenticationForm;
