import { Locator, Page } from '@playwright/test';

export class RecentlyViewedComponent {
  public recentlyViewedItems: Locator;

  constructor(page: Page) {
    this.recentlyViewedItems = page.locator('#box-recently-viewed-products ul.list-horizontal a');
  }

  public async getHrefs(): Promise<(string | null)[]> {
    return await this.recentlyViewedItems.evaluateAll((hrefs) => hrefs.map((href) => href.getAttribute('href')));
  }
}
