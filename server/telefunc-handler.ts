import { telefunc } from "telefunc";
export async function telefuncHandler<Context extends Record<string | number | symbol, unknown>>(
  request: Request,
  context?: Context,
): Promise<Response> {
  const aditionalHeaders = {}
  const aditionalCookies: Record<string, string> = {}
  const httpResponse = await telefunc({
    url: request.url.toString(),
    method: request.method,
    body: await request.text(),
    context: {
      ...context,
      aditionalHeaders,
      aditionalCookies,
    },
  });
  const { body, statusCode, contentType } = httpResponse;
  const res = new Response(body, {
    status: statusCode,
    headers: {
      ...aditionalHeaders,
      "content-type": contentType,
    },
  });

  for (const [key, value] of Object.entries(aditionalCookies)) {
    res.headers.append("set-cookie", value);
  }

  return res;
}
