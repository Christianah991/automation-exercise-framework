import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async search(text: string) {
    await this.page.locator('#search_product').fill(text);
    await this.page.locator('#submit_search').click();
  }

  async verifySearchResults() {
    await expect(this.page.getByRole('heading', { name: /searched products/i })).toBeVisible();
  }
  
  async addFromSearchResults(n: number): Promise<string> {
    const products = this.page.locator('.product-image-wrapper');
    let lastProductName = '';
  
    for (let i = 0; i < n; i++) {
      const href = await products.nth(i).locator('a[href*="product_details"]').getAttribute('href');
      
      if (!href) continue;
  
      await this.page.goto(`https://automationexercise.com${href}`, {
        waitUntil: 'domcontentloaded',
      });
      await this.page.locator('.product-information').waitFor({ state: 'visible' });
      lastProductName = (await this.page.locator('.product-information h2').innerText()).trim();
      await this.page.getByRole('button', { name: /add to cart/i }).click();
      await this.page.locator('.modal-content').waitFor({ state: 'visible' });
      await this.page.locator('.modal-content')
        .getByRole('button', { name: /continue shopping/i })
        .click();
      await this.page.locator('.modal-content').waitFor({ state: 'hidden' });
    }
  
    return lastProductName;
  }

  async openProduct(index: number) {
    const product = this.page.locator('.product-image-wrapper').nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    await product.locator('a[href*="product_details"]').click();
    await this.page.locator('.product-information').waitFor({ state: 'visible' });
  }

  async setQuantity(qty: number) {
    const quantityInput = this.page.locator('#quantity');
    await quantityInput.waitFor({ state: 'visible' });
    await expect(quantityInput).toBeEnabled();
    await quantityInput.clear();
    await quantityInput.fill(qty.toString());
  }

  async addToCart() {
    await this.page.getByRole('button', { name: /add to cart/i }).click();
    await this.page.locator('.modal-content').waitFor({ state: 'visible' });
  }

  async continueShopping() {
    await this.page.locator('.modal-content').getByRole('button', { name: /continue shopping/i }).click();
  }

  async openProductById(id: number) {
    await this.page.goto(`https://automationexercise.com/product_details/${id}`, {
      waitUntil: 'domcontentloaded',
    });
    await this.page.locator('.product-information').waitFor({ state: 'visible' });
  }
}
