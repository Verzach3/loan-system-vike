import { AppShell } from "@mantine/core";
import LayoutDefault from "./LayoutDefault";
import { NavbarNested } from "@/components/NavBarNested";

function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<LayoutDefault>
			<AppShell
			styles={{
				navbar: {
					height: "100%",
				}
			}}
				navbar={{
					width: 300,
					breakpoint: "sm",
				}}
			>
				<AppShell.Navbar>
					<NavbarNested />
				</AppShell.Navbar>
				<AppShell.Main>{children}</AppShell.Main>
			</AppShell>
		</LayoutDefault>
	);
}

export default MainLayout;
