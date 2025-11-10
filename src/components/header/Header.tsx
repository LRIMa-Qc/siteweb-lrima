import { HeaderItem } from "./HeaderItem";
import { m } from "@/paraglide/messages";

export interface IHeader {}
export function Header(props: IHeader) {
	return (
		<header className="flex w-full justify-between bg-indigo-500 p-5 text-white ">
			<p className="font-bold">LRIMa</p>
			<ul className="flex gap-4">
				<HeaderItem
					label={m["pages.publications.label"]()}
					href={m["pages.publications.href"]()}
				/>
				<HeaderItem
					label={m["pages.news.label"]()}
					href={m["pages.news.href"]()}
				/>
				<HeaderItem
					label={m["pages.members.label"]()}
					href={m["pages.members.href"]()}
				/>
				<HeaderItem
					label={m["pages.contact.label"]()}
					href={m["pages.contact.href"]()}
				/>
			</ul>
		</header>
	);
}
