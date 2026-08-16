import { Locator, Page } from "@playwright/test";

export class CartPage {
  public page: Page;

  public confirmButton: Locator;
  public paymentDue: Locator;
  public firstNameInput: Locator;
  public emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmButton = page.locator("button[name=confirm_order]");
    this.paymentDue = page.locator("#order_confirmation-wrapper .footer td:nth-of-type(2)");
    this.firstNameInput = page.locator("input[name=firstname]");
    this.emailInput = page.locator("input[name=email]");
  }

  public getOrderSummaryProductQuantity(name: string): Promise<string> {
    return this.page.locator(`//td[@class='item' and text()='${name}']/../td[1]`).innerText();
  }

  public getOrderSummaryProductTotal(name: string): Promise<string> {
    return this.page.locator(`//td[@class='item' and text()='${name}']/../td[@class='sum']`).innerText();
  }

  public confirmOrder(): Promise<void> {
    return this.confirmButton.click();
  }

  public getPaymentDue(): Promise<string | null> {
    return this.paymentDue.textContent();
  }
}
