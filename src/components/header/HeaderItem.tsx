import Link from "next/link";

import { getLocale } from "@/paraglide/runtime";

export interface IHeaderItem {
	label: string;
	href: string;
}

export function HeaderItem(props: IHeaderItem) {
	const locale = getLocale();
	return (
		<li>
			<Link hrefLang={locale} href={locale + props.href}>
				{props.label}
			</Link>
		</li>
	);
}
