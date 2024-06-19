import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Head from "@/layouts/HeadDefault.js";
import MainLayout from "@/layouts/MainLayout.js";

// Default config (can be overridden by pages)
export default {
	Layout: MainLayout,
	Head,
	clientRouting: false,
	// <title>
	title: "LoanSystem",
	extends: vikeReact,
} satisfies Config;
