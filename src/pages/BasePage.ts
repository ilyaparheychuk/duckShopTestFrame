import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string | undefined) {
    await this.page.goto(url || "");
    await this.page.waitForLoadState();
  }
}
