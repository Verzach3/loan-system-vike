import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import "./style.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
	fontFamily: "Inter, sans-serif",
});

const queryClient = new QueryClient();

export default function LayoutDefault({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MantineProvider theme={theme}>
			<Notifications position="top-right"/>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</MantineProvider>
	);
}
