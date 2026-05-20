import { Page, Locator, expect } from '@playwright/test';

export class AccountSetupPage {
  private page: Page;

  private readonly mrsRadio: Locator;
  private readonly password: Locator;
  private readonly days: Locator;
  private readonly months: Locator;
  private readonly years: Locator;
  private readonly newsletter: Locator;
  private readonly optin: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address: Locator;
  private readonly country: Locator;
  private readonly state: Locator;
  private readonly city: Locator;
  private readonly zipcode: Locator;
  private readonly mobile: Locator;
  private readonly createAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.mrsRadio = page.locator('#id_gender2');
    this.password = page.locator('#password');
    this.days = page.locator('#days');
    this.months = page.locator('#months');
    this.years = page.locator('#years');
    this.newsletter = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.optin = page.locator('#optin');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.address = page.locator('#address1');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobile = page.locator('#mobile_number');
    this.createAccountBtn = page.getByRole('button', { name: 'Create Account' });
  }

  async verifyAccountInfoPageVisible() {
    await expect(this.page.getByText(/enter account information/i)).toBeVisible();
  }

  async fillBasicInfo(password: string, day: string, month: string, year: string) {
    await this.mrsRadio.waitFor({ state: 'visible' });
    await expect(this.mrsRadio).toBeEnabled();
    await this.mrsRadio.check();
    await this.password.fill(password);
    await this.days.selectOption(day);
    await this.months.selectOption(month);
    await this.years.selectOption(year);
  }

  async setPreferences() {
    if (!await this.newsletter.isChecked()) {
      await this.newsletter.check();
    }
    if (!await this.optin.isChecked()) {
      await this.optin.check();
    }
  }

  async fillPersonalDetails(first: string, last: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
  }

  async fillAddress(
    address: string,
    country: string,
    state: string,
    city: string,
    zip: string,
    mobile: string
  ) {
    await this.address.fill(address);
    await this.country.selectOption({ label: country });
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zip);
    await this.mobile.fill(mobile);
  }

  async submit() {
    await this.createAccountBtn.click();
  }

  async verifyAccountCreated() {
    await expect(
      this.page.getByRole('heading', { name: 'Account Created!' })
    ).toBeVisible();
  }

  async continueAfterSignup() {
    await this.page.getByRole('link', { name: /continue/i }).click({ force: true });
  }
  
  async deleteAccount() {
    await this.page.getByRole('banner').getByRole('link', { name: /delete account/i }).click();
  }

  async verifyAccountDeleted() {
    await expect(this.page.getByText(/account deleted/i)).toBeVisible();
  }

  async continueAfterDeletion() {
    await this.page.getByRole('link', { name: /continue/i }).click({ force: true });
  }
}