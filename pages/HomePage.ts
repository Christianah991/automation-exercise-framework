import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async openHomePage() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async verifyHomePageVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }

  async goToLogin() {
    await this.page.getByRole('banner').getByRole('link', { name: 'Signup / Login' }).click();
  }

  async goToProducts() {
    await this.page.getByRole('banner').getByRole('link', { name: 'Products' }).click();
  }

  async goToCart() {
    await this.page.goto('https://automationexercise.com/view_cart', {
      waitUntil: 'domcontentloaded',
    });
  }
}