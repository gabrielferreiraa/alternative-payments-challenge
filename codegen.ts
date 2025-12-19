import type { CodegenConfig } from "@graphql-codegen/cli";

import { env } from "./lib/env";

const config: CodegenConfig = {
  schema: env.endpoint,
  documents: [
    "app/**/*.{ts,tsx,graphql}",
    "components/**/*.{ts,tsx,graphql}",
    "lib/**/*.{ts,tsx,graphql}",
    "hooks/**/*.{ts,tsx,graphql}",
  ],
  generates: {
    "./__generated__/gql/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "graphql",
      },
    },
  },
};

export default config;
