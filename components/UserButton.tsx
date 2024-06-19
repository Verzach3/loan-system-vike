import {
	UnstyledButton,
	Group,
	Text,
	ThemeIcon,
	ActionIcon,
	Badge,
} from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { useQuery } from "@tanstack/react-query";
import { onGetUserData } from "@/functions/onGetUserData.telefunc";

export function UserButton() {
	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: onGetUserData,
	});

	return (
		<UnstyledButton className={classes.user}>
			<Group>
				<ThemeIcon size={"xl"} radius={"xl"}>
					<IconUser />
				</ThemeIcon>

				<div style={{ flex: 1 }}>
					<Text size="sm" fw={500}>
						{data?.name}
					</Text>

					<Text c="dimmed" size="xs">
						{data?.email}
					</Text>
					<Badge>{data?.role}</Badge>
				</div>

				<ActionIcon component="a" variant="transparent" href="/logout">
					<IconLogout />
				</ActionIcon>
			</Group>
		</UnstyledButton>
	);
}
