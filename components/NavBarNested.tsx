import {
	Group,
	Code,
	ScrollArea,
	Text,
} from "@mantine/core";
import {
	IconNotes,
	IconCalendarStats,
	IconPresentationAnalytics,
	IconFileAnalytics,
	IconAdjustments,
	IconLock,
	IconBuilding,
} from "@tabler/icons-react";
import classes from "./NavbarNested.module.css";
import { LinksGroup } from "./LinksGroup";
import { UserButton } from "./UserButton";

const mockdata = [
	{ label: "Sedes", icon: IconBuilding, link: "/dashboard/headquarters" },
	{ label: "Salones", icon: IconBuilding, link: "/dashboard/classrooms" },
	{
		label: "Market news",
		icon: IconNotes,
		links: [
			{ label: "Overview", link: "/" },
			{ label: "Forecasts", link: "/" },
			{ label: "Outlook", link: "/" },
			{ label: "Real time", link: "/" },
		],
	},
	{
		label: "Releases",
		icon: IconCalendarStats,
		links: [
			{ label: "Upcoming releases", link: "/" },
			{ label: "Previous releases", link: "/" },
			{ label: "Releases schedule", link: "/" },
		],
	},
	{ label: "Analytics", icon: IconPresentationAnalytics },
	{ label: "Contracts", icon: IconFileAnalytics },
	{ label: "Settings", icon: IconAdjustments },
	{
		label: "Security",
		icon: IconLock,
		links: [
			{ label: "Enable 2FA", link: "/" },
			{ label: "Change password", link: "/" },
			{ label: "Recovery codes", link: "/" },
		],
	},
];

export function NavbarNested() {
	const links = mockdata.map((item) => (
		<LinksGroup {...item} key={item.label} />
	));

	return (
		<div className={classes.navbar}>
			<div className={classes.header}>
				<Group justify="space-between">
					<Text>Logo</Text>
					<Code fw={700}>v3.1.2</Code>
				</Group>
			</div>
				<ScrollArea className={classes.links}>
					<div className={classes.linksInner}>{links}</div>
				</ScrollArea>
			<div className={classes.footer}>
				<UserButton />
			</div>
		</div>
	);
}
