import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class OrderSuccessPage extends BasePage {
  public successTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.successTitle = page.locator("#box-order-success > h1");
  }

  public getTitle(): Promise<string> {
    return this.successTitle.innerText();
  }
}
