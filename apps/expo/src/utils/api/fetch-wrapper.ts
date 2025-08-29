import type { z } from "zod/v4";
import { tryCatch } from "@repo/lib";

import { authClient } from "../auth";
import { getBaseUrl } from "../base-url";
import { parseResponse } from "./parse-response";

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

interface FetchWrapperOptions<T> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  params?: Record<string, string | boolean | undefined>;
  contentType?: string;
  schema: z.ZodSchema<T>;
}

export async function fetchWrapper<T>(
  url: string,
  options: FetchWrapperOptions<T>,
) {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    contentType = "application/json",
  } = options;

  // initialize headers
  const requestHeaders = new Headers(headers);
  const cookies = authClient.getCookie();
  if (cookies) {
    requestHeaders.set("Cookie", cookies);
  }

  // Don't set content-type for multipart/form-data
  if (
    body &&
    !requestHeaders.has("content-type") &&
    contentType !== "multipart/form-data"
  ) {
    requestHeaders.set("content-type", contentType);
  }

  const fullUrl = new URL(url, getBaseUrl());
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (!value) {
        continue;
      }

      fullUrl.searchParams.append(key, value.toString());
    }
  }

  const { data: response, error } = await tryCatch(
    fetch(fullUrl, {
      method,
      headers: requestHeaders,
      body: JSON.stringify(body),
    }),
  );

  // TODO: handle error
  if (error) {
    throw error;
  }

  return parseResponse(response, options.schema);
}
