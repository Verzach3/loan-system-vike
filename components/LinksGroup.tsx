import {
	UnstyledButton,
	Group,
	Box,
	ThemeIcon,
	rem,
	Collapse,
	Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./LinksGroup.module.css";

interface LinksGroupProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	icon: React.FC<any>;
	label: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string }[];
	link?: string;
}

export function LinksGroup({
	icon: Icon,
	label,
	initiallyOpened,
	links,
	link,
}: LinksGroupProps) {
	const hasLinks = Array.isArray(links);
	const [opened, setOpened] = useState(initiallyOpened || false);
	const items = (hasLinks ? links : []).map((link) => (
		<Text<"a">
			component="a"
			className={classes.link}
			href={link.link}
			key={link.label}
			onClick={(event) => event.preventDefault()}
		>
			{link.label}
		</Text>
	));

	return (
		<>
			<UnstyledButton
				component="a"
				href={link ?? "/"}
				onClick={() => {
					if (hasLinks) {
						setOpened((o) => !o);
					}
				}}
				className={classes.control}
			>
				<Group justify="space-between" gap={0}>
					<Box style={{ display: "flex", alignItems: "center" }}>
						<ThemeIcon variant="light" size={30}>
							<Icon style={{ width: rem(18), height: rem(18) }} />
						</ThemeIcon>
						<Box ml="md">{label}</Box>
					</Box>
					{hasLinks && (
						<IconChevronRight
							className={classes.chevron}
							stroke={1.5}
							style={{
								width: rem(16),
								height: rem(16),
								transform: opened ? "rotate(-90deg)" : "none",
							}}
						/>
					)}
				</Group>
			</UnstyledButton>
			{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
		</>
	);
}
