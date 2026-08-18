import { Page } from '@playwright/test';

import { CartPage } from '../cart-page';
import { HomePage } from '../home-page';
import { OrderSuccessPage } from '../order-succes-page';
import { ProductPage } from '../product-page';
import { BasePage } from '../base-page';

export class PageManager {
  private page: Page;

  private _basePage?: BasePage;
  private _cartPage?: CartPage;
  private _homePage?: HomePage;
  private _orderSuccessPage?: OrderSuccessPage;
  private _productPage?: ProductPage;

  constructor(page: Page) {
    this.page = page;
  }

  public get basePage(): BasePage {
    if (!this._basePage) {
      this._basePage = new BasePage(this.page);
    }
    return this._basePage;
  }

  public get cartPage(): CartPage {
    if (!this._cartPage) {
      this._cartPage = new CartPage(this.page);
    }
    return this._cartPage;
  }

  public get homePage(): HomePage {
    if (!this._homePage) {
      this._homePage = new HomePage(this.page);
    }
    return this._homePage;
  }

  public get orderSuccessPage(): OrderSuccessPage {
    if (!this._orderSuccessPage) {
      this._orderSuccessPage = new OrderSuccessPage(this.page);
    }
    return this._orderSuccessPage;
  }

  public get productPage(): ProductPage {
    if (!this._productPage) {
      this._productPage = new ProductPage(this.page);
    }
    return this._productPage;
  }
}
