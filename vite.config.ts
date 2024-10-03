import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    onConsoleLog() {
      return true;
    },
    unstubGlobals: true,
  },
});
