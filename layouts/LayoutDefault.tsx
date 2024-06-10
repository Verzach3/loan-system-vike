import "@mantine/core/styles.css";
import "./style.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</MantineProvider>
	);
}
