import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async expectOnPaymentPage() {
    await this.page.waitForURL('**/payment');
  }

  async fillPayment(data: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.page.locator('input[name="name_on_card"]').fill(data.nameOnCard);
    await this.page.locator('input[name="card_number"]').fill(data.cardNumber);
    await this.page.getByRole('textbox', { name: /cvc|ex/i }).fill(data.cvc);
    await this.page.getByRole('textbox', { name: /mm/i }).fill(data.expiryMonth);
    await this.page.getByRole('textbox', { name: /yyyy/i }).fill(data.expiryYear);
  }

  async confirmOrder() {
    await this.page.getByRole('button', { name: /pay and confirm order/i }).click();
    await expect(this.page.getByText(/order placed/i)).toBeVisible();
  }

  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.getByRole('link', { name: /download invoice/i }).click()
    ]);
    return download;
  }
}