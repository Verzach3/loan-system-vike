import { Button, Card, Center, Image, Text } from "@mantine/core";
import classes from "./ResourceItem.module.css";

type headquarter = {
	id: string;
	name: string;
	description: string;
	city: string;
	country: string;
};

function HeadquarterItem({ headquarter }: { headquarter: headquarter }) {
	return (
		<Card withBorder padding="lg" radius="md" className={classes.card}>
			<Card.Section mb="sm">
				<Image
					src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
					alt="Top 50 underrated plants for house decoration"
					height={180}
				/>
			</Card.Section>
			<Text fw={700} className={classes.title} mt="xs">
				{headquarter.name}
			</Text>
			<Text>{headquarter.description}</Text>
			<Card.Section>
				<Center>
					<Button
						component="a"
						w={"100%"}
						mx={"md"}
						my={"md"}
						href={`/dashboard/headquarters/${headquarter.id}`}
					>
						Ver
					</Button>
				</Center>
			</Card.Section>
		</Card>
	);
}

export default HeadquarterItem;
