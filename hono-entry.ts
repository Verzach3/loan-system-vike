import "dotenv/config";
import { vikeHandler } from "./server/vike-handler";
import { telefuncHandler } from "./server/telefunc-handler";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { createMiddleware } from "hono/factory";
import { Lucia } from "lucia";
import { db, adapter } from "./database/db";
import { getCookie, setCookie } from "hono/cookie";
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production",
		},
	},
});

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

type Middleware<Context extends Record<string | number | symbol, unknown>> = (
	request: Request,
	context: Context,
) => Response | void | Promise<Response> | Promise<void>;

export function handlerAdapter<
	Context extends Record<string | number | symbol, unknown>,
>(handler: Middleware<Context>) {
	return createMiddleware(async (context, next) => {
		let ctx = context.get("context");
		if (!ctx) {
			ctx = {
				lucia,
				db,
				session: context.get("session"),
			};
			context.set("context", ctx);
		}

		const res = await handler(context.req.raw, ctx as Context);
		context.set("context", ctx);

		if (!res) {
			await next();
		}

		return res;
	});
}

const app = new Hono();

app.use(compress());

app.use(async (c, next) => {
	const sessionId = getCookie(c, lucia.sessionCookieName);
	if (!sessionId) {
		c.set("session", null);
		return await next();
	}
	const result = await lucia.validateSession(sessionId);
	if (result.session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(result.session.id);
		setCookie(
			c,
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	}
	if (!result.session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		setCookie(
			c,
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	}
	c.set("session", result);
	return await next();
});

if (isProduction) {
	app.use(
		"/*",
		serveStatic({
			root: "dist/client/",
		}),
	);
}

app.post("/_telefunc", handlerAdapter(telefuncHandler));

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all("*", handlerAdapter(vikeHandler));

if (isProduction) {
	console.log(`Server listening on http://localhost:${port}`);
	serve({
		fetch: app.fetch,
		port: port,
	});
}

export default app;
