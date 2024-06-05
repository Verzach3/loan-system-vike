import "@mantine/core/styles.css";
import "./style.css";
import { MantineProvider } from "@mantine/core";

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MantineProvider>{children}</MantineProvider>;
}
