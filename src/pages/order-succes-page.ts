import { Locator, Page } from "@playwright/test";

export class OrderSuccessPage {
  public successTitle: Locator;

  constructor(page: Page) {
    this.successTitle = page.locator("#box-order-success > h1");
  }

  public getTitle(): Promise<string> {
    return this.successTitle.innerText();
  }
}
