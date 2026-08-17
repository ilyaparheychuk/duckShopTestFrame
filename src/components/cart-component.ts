import { Locator, Page } from "@playwright/test";
import { normalizeText } from "../utils/commonUtils";

export class CartComponent {
  public cartContent: Locator;

  constructor(page: Page) {
    this.cartContent = page.locator("#cart a[class=content]");
  }

  public async getCartContent(): Promise<string> {
    return normalizeText(await this.cartContent.textContent());
  }

  public clickToCart(): Promise<void> {
    return this.cartContent.click();
  }
}
