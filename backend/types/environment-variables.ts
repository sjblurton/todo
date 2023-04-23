import { z } from "zod";

const enVariables = z.object({
  FAUNA_SECRET: z.string(),
});

// enVariables.parse(process.env);

declare global {
  const FAUNA_SECRET: string;
}
