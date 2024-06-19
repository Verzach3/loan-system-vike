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
import lslogo from "@/assets/ls-logo.png";
import { useQuery } from "@tanstack/react-query";
import { onGetUserData } from "@/functions/onGetUserData.telefunc";
const mockdata = [
	{
		label: "Sedes",
		icon: IconBuilding,
		link: "/dashboard/headquarters",
		permission: ["admin"],
	},
	{
		label: "Salones",
		icon: IconBuilding,
		link: "/dashboard/classrooms",
		permission: ["admin", "professor"],
	},
	{
		label: "Recursos",
		icon: IconBuildingWarehouse,
		link: "/dashboard/resources",
		permission: ["admin", "professor", "student"],
	},
	{
		label: "Reportes",
		icon: IconPresentationAnalytics,
		link: "/dashboard/reports",
		permission: ["admin"],
	},
	{
		label: "Solicitudes",
		icon: IconFolderShare,
		link: "/dashboard/request",
		permission: ["admin"],
	},
	{ label: "Historial", icon: IconHistory, link: "/dashboard/history", permission: ["admin", "professor", "student"] },
];

export function NavbarNested() {
	const { data } = useQuery({
		queryKey: ["user"],
		queryFn: onGetUserData,
	});

	const links = mockdata.map((item) => {
		if (item.permission?.includes(data?.role ?? "")) {
			return <LinksGroup {...item} key={item.label} />;
		}
		return null;
	});

	return (
		<div className={classes.navbar}>
			<Group justify="space-between">
				<Image src={lslogo} width={"80"} height={"80"} radius="xl" />
				<Code fw={700}>v1.0.0</Code>
			</Group>
			<Divider />
			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>
			<div className={classes.footer}>
				<UserButton />
			</div>
		</div>
	);
}
