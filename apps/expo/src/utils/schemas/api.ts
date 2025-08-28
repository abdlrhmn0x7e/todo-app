import { z } from "zod/v4";

const createSuccessResponseSchema = <T>(schema: z.ZodSchema<T>) =>
  z.object({
    ok: z.literal(true),
    data: schema,
  });

const errorResponseSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

export const createApiResponseSchema = <T>(schema: z.ZodSchema<T>) =>
  z.discriminatedUnion("ok", [
    createSuccessResponseSchema(schema),
    errorResponseSchema,
  ]);
