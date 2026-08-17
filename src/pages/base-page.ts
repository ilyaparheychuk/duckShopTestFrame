import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string | undefined): Promise<void> {
    await this.page.goto(url || "");
    await this.page.waitForLoadState();
  }

  async logout(): Promise<void> {
    await this.page.goto("/logout");
  }
}
