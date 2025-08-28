import type { z } from "zod/v4";

import { createApiResponseSchema } from "../schemas/api";
import { ApiError } from "./api-error";

export async function parseResponse<T>(
  response: Response,
  schema: z.ZodSchema<T>,
) {
  const json = (await response.json()) as Record<string, string>;
  const parsedResponse = createApiResponseSchema(schema).safeParse(json);

  if (!parsedResponse.success) {
    throw new ApiError(parsedResponse.error.message);
  }

  return parsedResponse.data;
}
