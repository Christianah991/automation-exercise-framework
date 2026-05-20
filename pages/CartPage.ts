import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectItemsCount(count: number) {
    await expect(this.page.locator('tr[id^="product-"]')).toHaveCount(count);
  }

  async getItemsCount() {
    return this.page.locator('tr[id^="product-"]').count();
  }

  async proceedToCheckout() {
    await this.page.locator('a.check_out').click({ force: true });
    await this.page.waitForURL('**/checkout');
  }

  async addMessage(message: string) {
    const textarea = this.page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible' });
    await textarea.fill(message);
  }

  async placeOrder() {
    const placeOrderLink = this.page.getByRole('link', { name: /place order/i });
    await placeOrderLink.scrollIntoViewIfNeeded();
    await placeOrderLink.click({ force: true });
  }
  async removeAllItems() {
    const rows = this.page.locator('tr[id^="product-"]');
    while (await rows.count() > 0) {
      const countBefore = await rows.count();
      await expect(async () => {
        await rows.first().locator('a.cart_quantity_delete').click({ force: true });
        await expect(rows).toHaveCount(countBefore - 1);
      }).toPass({ timeout: 10000 });
    }
  }
}