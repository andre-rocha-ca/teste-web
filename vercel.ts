import { type VercelConfig } from "@vercel/config/v1";

const config: VercelConfig = {
  buildCommand: "pnpm build",
  installCommand: "pnpm install --frozen-lockfile",
  framework: "nextjs",
};

export default config;
