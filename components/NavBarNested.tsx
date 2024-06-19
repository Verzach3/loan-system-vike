import { Group, Code, ScrollArea, Image, Divider } from "@mantine/core";
import {
	IconCalendarStats,
	IconPresentationAnalytics,
	IconBuilding,
	IconFolderShare,
	IconBuildingWarehouse,
	IconHistory,
} from "@tabler/icons-react";
import classes from "./NavbarNested.module.css";
import { LinksGroup } from "./LinksGroup";
import { UserButton } from "./UserButton";
import lslogo from "@/assets/ls-logo.png"
const mockdata = [
	{
		label: "Calendario",
		icon: IconCalendarStats,
		link: "/dashboard/",
	},
	{ label: "Sedes", icon: IconBuilding, link: "/dashboard/headquarters" },
	{ label: "Salones", icon: IconBuilding, link: "/dashboard/classrooms" },
	{
		label: "Recursos",
		icon: IconBuildingWarehouse,
		link: "/dashboard/resources",
	},
	{
		label: "Reportes",
		icon: IconPresentationAnalytics,
		link: "/dashboard/reports",
	},
	{ label: "Solicitudes", icon: IconFolderShare, link: "/dashboard/request" },
	{ label: "Historial", icon: IconHistory, link: "/dashboard/history" },
];

export function NavbarNested() {
	const links = mockdata.map((item) => (
		<LinksGroup {...item} key={item.label} />
	));

	return (
		<div className={classes.navbar}>
				<Group justify="space-between">
					<Image src={lslogo} width={"80"} height={"80"} radius="xl" />
					<Code fw={700}>v1.0.0</Code>
				</Group>
				<Divider/>
			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>
			<div className={classes.footer}>
				<UserButton />
			</div>
		</div>
	);
}
