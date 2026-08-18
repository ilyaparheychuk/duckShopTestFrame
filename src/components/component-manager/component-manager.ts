import { Page } from '@playwright/test';
import { LoginComponent } from '../login-component';
import { CartComponent } from '../cart-component';
import { NoticeComponent } from '../notice-component';
import { ProductCardComponent } from '../product-card-component';
import { RecentlyViewedComponent } from '../recently-viewed-component';

export class ComponentManager {
  private page: Page;

  private _loginComponent?: LoginComponent;
  private _cartComponent?: CartComponent;
  private _noticeComponent?: NoticeComponent;
  private _productCardComponent?: ProductCardComponent;
  private _recentlyViewedComponent?: RecentlyViewedComponent;

  constructor(page: Page) {
    this.page = page;
  }

  public get loginComponent(): LoginComponent {
    if (!this._loginComponent) {
      this._loginComponent = new LoginComponent(this.page);
    }
    return this._loginComponent;
  }

  public get cartComponent(): CartComponent {
    if (!this._cartComponent) {
      this._cartComponent = new CartComponent(this.page);
    }
    return this._cartComponent;
  }

  public get noticeComponent(): NoticeComponent {
    if (!this._noticeComponent) {
      this._noticeComponent = new NoticeComponent(this.page);
    }
    return this._noticeComponent;
  }

  public get productCardComponent(): ProductCardComponent {
    if (!this._productCardComponent) {
      this._productCardComponent = new ProductCardComponent(this.page);
    }
    return this._productCardComponent;
  }

  public get recentlyViewedComponent(): RecentlyViewedComponent {
    if (!this._recentlyViewedComponent) {
      this._recentlyViewedComponent = new RecentlyViewedComponent(this.page);
    }
    return this._recentlyViewedComponent;
  }
}
