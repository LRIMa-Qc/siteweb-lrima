import React, { cache } from "react";
import {
	assertIsLocale,
	baseLocale,
	getLocale,
	overwriteGetLocale,
} from "@/paraglide/runtime";
import "./globals.css";
import { Header } from "@/components/header/Header";

export const metadata = {
	// description: "js app.", // TODO: Description
	title: "LRIMa",
};

export function generateStaticParams() {
	return [{ locale: "fr" }, { locale: "en" }];
}

let ssrLocale = cache(() => ({
	locale: baseLocale,
}));

overwriteGetLocale(() => assertIsLocale(ssrLocale().locale));

export default async function RootLayout(props: {
	children: React.ReactNode;
	params: any;
}) {
	const { children } = props;

	const { locale } = await props.params;

	ssrLocale().locale = locale || baseLocale;

	return (
		<html lang={getLocale()}>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
