import { Page } from "@playwright/test";
import { ProductName } from "../types/types";

export class ProductCardComponent {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async chooseCardByTitleName(name: ProductName): Promise<void> {
    await this.page.locator(`li[class*='product'] > a[class=link][title='${name}']`).first().click();
  }
}
