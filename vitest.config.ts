import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "src/setupFile.ts",
    include: [
      "src/__tests__/*.test.ts",
      "src/__tests__/*.test.tsx",
      "src/__tests__/*.spec.ts",
      "src/__tests__/*.spec.tsx",
    ],
    exclude: ["**/e2e-test/**"], // Exclude e2e-test directory
  },
});
