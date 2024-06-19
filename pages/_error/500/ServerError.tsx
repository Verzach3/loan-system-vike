import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./ServerError.module.css";

export function ServerError() {
	return (
		<div className={classes.root}>
			<Container>
				<div className={classes.label}>500</div>
				<Title className={classes.title}>
					Algo salio mal de nuestro lado...
				</Title>
				<Text size="lg" ta="center" className={classes.description}>
					Nuestros servidores no pudieron procesar tu solicitud. No te
					preocupes, nuestro equipo de desarrollo ya fue notificado. Intenta
					refrescar la página.
				</Text>

				<Group justify="center">
					<Button variant="white" component="a" size="md" href="/">
						Volver a Inicio
					</Button>
				</Group>
			</Container>
		</div>
	);
}
