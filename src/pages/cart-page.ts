import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class CartPage extends BasePage {
  public page: Page;

  public confirmButton: Locator;
  public removeButton: Locator;
  public paymentDue: Locator;
  public firstNameInput: Locator;
  public emailInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.confirmButton = page.locator("button[name=confirm_order]");
    this.removeButton = page.locator("button[name=remove_cart_item]");
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
