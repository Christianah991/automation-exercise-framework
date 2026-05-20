import { test as base, Page } from '@playwright/test';

async function registerConsentHandler(page: Page) {
  await page.addLocatorHandler(
    page.locator('.fc-consent-root'),
    async () => {
      try {
        await page.getByRole('button', { name: 'Consent' }).click({ 
          timeout: 5000,
          force: true 
        });
      } catch {
        // banner already gone or click failed — continue anyway
      }
    },
    { noWaitAfter: true } // don't wait for the overlay to disappear
  );
}

export const test = base.extend({
  page: async ({ page }, use) => {
    await registerConsentHandler(page);
    await use(page);
  },
});

export { expect } from '@playwright/test';