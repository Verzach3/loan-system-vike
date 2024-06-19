import { usePageContext } from "vike-react/usePageContext";
import { NothingFound } from "./404/NothingFound";
import { ServerError } from "./500/ServerError";

export default function Page() {
	const { is404 } = usePageContext();
	if (is404) {
		return <NothingFound />;
	}
	return <ServerError />;
}
