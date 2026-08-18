import { Locator, Page } from "@playwright/test";
import { getNumberFromPrice } from "../utils/commonUtils";
import { ProductSize } from "../types/types";
import { BasePage } from "./base-page";

export class ProductPage extends BasePage {
  public pageTitle: Locator;
  public productPrice: Locator;
  public productCampaignPrice: Locator;
  public productSizeSelect: Locator;
  public quantityInput: Locator;
  public addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator("div[id=box-product] h1[class=title]");
    this.productPrice = page.locator("div[id=box-product] span[class=price]");
    this.productCampaignPrice = page.locator(".campaign-price");
    this.productSizeSelect = page.locator("form[name=buy_now_form] select");
    this.quantityInput = page.locator("input[name=quantity]");
    this.addToCartButton = page.locator("button[name=add_cart_product]");
  }

  public getTitle(): Promise<string> {
    return this.pageTitle.innerText();
  }

  public async getPrice(): Promise<number> {
    return getNumberFromPrice(await this.productPrice.innerText());
  }

  public async getCampaignPrice(): Promise<number> {
    return getNumberFromPrice(await this.productCampaignPrice.innerText());
  }

  public async addQuantity(count: string): Promise<void> {
    await this.quantityInput.clear();
    return this.quantityInput.fill(count);
  }

  public clickAddToCartButton(): Promise<void> {
    return this.addToCartButton.click();
  }

  public async selectSize(size: ProductSize): Promise<void> {
    await this.productSizeSelect.selectOption(size);
  }
}
