import { Locator, Page } from '@playwright/test';

export class LoginComponent {
  public emailAdressInput: Locator;
  public passwordInput: Locator;
  public loginButton: Locator;

  constructor(page: Page) {
    this.emailAdressInput = page.locator('[name="login_form"] input[name="email"]');
    this.passwordInput = page.locator('[name="login_form"] input[name="password"]');
    this.loginButton = page.locator('[name="login_form"] button[name="login"]');
  }

  public async fillEmail(email: string): Promise<void> {
    await this.emailAdressInput.fill(email);
  }

  public async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  public async fillForm(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
  }

  public async loginFlow(email: string, password: string): Promise<void> {
    await this.fillForm(email, password);
    await this.clickLogin();
  }
}
