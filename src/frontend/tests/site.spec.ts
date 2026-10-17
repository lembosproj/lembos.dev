import { expect, test, type Page } from "@playwright/test"

/**
 * Smoke tests for the published site: what a dependency bump can break without
 * the build noticing — a menu that no longer opens, a page that no longer
 * renders, a screenshot that no longer loads, a sidebar pushed off the screen.
 */

/** Collects uncaught errors and console errors for the rest of the test. */
function watchErrors(page: Page) {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  return errors
}

/** Every docs page the sitemap lists, as a path. */
async function docsPaths(page: Page) {
  const sitemap = await (await page.request.get("/sitemap.xml")).text()
  return [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/docs[^<]*)<\/loc>/g)].map((match) => match[1])
}

test.describe("landing page", () => {
  test("renders without errors and points at the docs", async ({ page }) => {
    const errors = watchErrors(page)
    await page.goto("/")

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Know what is running")
    await expect(page.getByText(/Lembos \d+\.\d+\.\d+ is out/)).toBeVisible()
    await expect(page.getByRole("link", { name: "Get started" }).first()).toHaveAttribute("href", "/docs/quickstart")
    expect(errors).toEqual([])
  })

  test("every Portal screenshot it shows exists", async ({ page }) => {
    await page.goto("/")
    const sources = await page.locator('img[src*="/portal/"]').evaluateAll((images) =>
      [...new Set(images.map((image) => image.getAttribute("src")!))],
    )
    expect(sources.length).toBeGreaterThan(0)
    for (const source of sources) {
      expect((await page.request.get(source)).status(), source).toBe(200)
    }
  })

  test("the theme menu switches the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" })
    await page.goto("/")

    await page.getByRole("button", { name: "Toggle theme" }).click()
    await page.getByRole("menuitem", { name: "Dark" }).click()

    await expect(page.locator("html")).toHaveClass(/\bdark\b/)
    await expect(page.getByRole("menu")).toHaveCount(0)
  })

  test("the mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")

    await page.getByRole("button", { name: "Open menu" }).click()
    const menu = page.getByRole("dialog")
    await expect(menu).toBeVisible()
    await expect(menu.getByRole("link", { name: "Docs" })).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(menu).toHaveCount(0)
  })
})

test.describe("docs", () => {
  test("every page renders with its title and working screenshots", async ({ page }) => {
    const paths = await docsPaths(page)
    expect(paths.length).toBeGreaterThan(20)

    for (const path of paths) {
      const response = await page.goto(path)
      expect(response?.status(), path).toBe(200)
      await expect(page.getByRole("heading", { level: 1 }), path).toBeVisible()

      const sources = await page.locator('img[src*="/portal/"]').evaluateAll((images) =>
        images.map((image) => image.getAttribute("src")!),
      )
      for (const source of new Set(sources)) {
        expect((await page.request.get(source)).status(), `${path} → ${source}`).toBe(200)
      }
    }
  })

  test("the sidebar's theme switch stays on screen under the banner", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto("/docs/use/delivery")
    await expect(page.getByText(/is out/)).toBeVisible()

    // Wholly on screen: pushed down by the banner, it was still partly visible.
    const themeSwitch = page.locator("#nd-sidebar").getByRole("button", { name: "Toggle Theme" })
    await expect(themeSwitch).toBeInViewport({ ratio: 1 })

    await page.mouse.wheel(0, 3000)
    await expect(themeSwitch).toBeInViewport({ ratio: 1 })
  })

  test("search finds pages", async ({ page }) => {
    const errors = watchErrors(page)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto("/docs")

    await page.locator("#nd-sidebar").getByRole("button", { name: /search/i }).click()
    const dialog = page.getByRole("dialog", { name: "Search" })
    await dialog.getByRole("combobox", { name: "Search" }).fill("slot")

    await expect(dialog.getByRole("option").first()).toBeVisible()
    expect(errors).toEqual([])
  })
})
