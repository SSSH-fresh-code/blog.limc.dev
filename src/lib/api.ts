import ky, { type HTTPError } from "ky";
import type {
	HttpMethod,
	KyOptions,
} from "node_modules/ky/distribution/types/options";

export type Res<T> = {
	success: boolean;
	data?: T;
};

export async function req<T>(
	path: string,
	method: HttpMethod = "get",
	body?: object,
): Promise<Res<T>> {
	try {
		const option: KyOptions = {
			prefixUrl: import.meta.env.VITE_API_URL,
		};

		if (body) {
			if (["post", "put"].includes(method)) {
				option.json = body;
			} else {
				const sp = body as Record<string, string>;
				option.searchParams = sp;
			}
		}

		const json = await ky[method]<T>(path, {
			...option,
			credentials: "include",
		}).json();

		return {
			success: true,
			data: json,
		};
	} catch (e: unknown) {
		const error = e as Error;

		if (error.name === "HTTPError") {
			const httpError = error as HTTPError;
			const errorJson = (await httpError.response.json()) as Record<
				string,
				unknown
			>;

			alert(errorJson.message);
		}
	}

	return {
		success: false,
	};
}
