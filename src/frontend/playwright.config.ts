import { defineConfig, devices } from "@playwright/test"

const port = 4173

/**
 * Tests run against the static export in dist/, served the way GitHub Pages
 * serves it, so what passes here is what deploys. Build first: `pnpm build`
 * at the repository root, or `pnpm test` there, which does both.
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `serve dist --listen ${port} --config ../tests/serve.json --no-clipboard --no-request-logging`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
})
