import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3000/api-json', 
    },
    output: {
      target: "./src/api/generated/endpoints.ts",
      client: "react-query",
       schemas: "./src/api/generated/model",
      override: {
        mutator: {
          path: "./src/api/client.ts",
          name: "customInstance", 
        },
      },
    },
  },
});
