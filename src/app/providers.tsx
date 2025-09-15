"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/app/auth/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<ThemeProvider defaultTheme="light" attribute="class">
				<SidebarProvider>{children}</SidebarProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}
