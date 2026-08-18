import { expect } from '@playwright/test';
import { ProductName } from '../src/types/types';
import { HrefProductName, Timeouts } from '../src/enums/enums';
import { PageManager } from '../src/pages/page-manager/page-manager';
import { ComponentManager } from '../src/components/component-manager/component-manager';
import { test } from '../src/fixtures/fixtures';
import { clearCartViaUI } from '../src/helpers/clearCartHelper';

test.describe('Test case 3', () => {
  //TODO. Rewrite it to API methods
  test.beforeEach(async ({ page, baseURL }) => {
    await clearCartViaUI(page, baseURL!);
  });

  test('Order without login', async ({ page, baseURL }) => {
    const pageManager = new PageManager(page);
    const componentManager = new ComponentManager(page);

    const cardNamePurple: ProductName = 'Purple Duck';
    const cardNameGreen: ProductName = 'Green Duck';
    let sum: number;

    await test.step('Open home page', async () => await pageManager.homePage.goto(baseURL));

    await test.step('Add Purple Duck to cart', async () => {
      await componentManager.productCardComponent.chooseCardByTitleName(cardNamePurple);
      await pageManager.productPage.clickAddToCartButton();
      sum = await pageManager.productPage.getPrice();
    });

    await test.step('Check that cart component has correct sum', async () =>
      await expect(componentManager.cartComponent.cartContent).toHaveText(`Cart: 1 item(s) - $${sum}`, {
        timeout: Timeouts.standard,
      }));

    await test.step('Add Green Duck to cart', async () => {
      await componentManager.productCardComponent.chooseCardByTitleName(cardNameGreen);
      await pageManager.productPage.clickAddToCartButton();
      sum = (await pageManager.productPage.getPrice()) + sum;
    });

    await test.step('Check that cart component has correct sum', async () =>
      await expect(componentManager.cartComponent.cartContent).toHaveText(`Cart: 2 item(s) - $${sum}`, {
        timeout: Timeouts.standard,
      }));

    await test.step('Go to cart', async () => await componentManager.cartComponent.clickToCart());

    await test.step('Check data of order is correct', async () => {
      expect(await pageManager.cartPage.getOrderSummaryProductQuantity(cardNamePurple)).toBe('1');
      expect(await pageManager.cartPage.getOrderSummaryProductTotal(cardNamePurple)).toBe('$0.00');

      expect(await pageManager.cartPage.getOrderSummaryProductQuantity(cardNameGreen)).toBe('1');
      expect(await pageManager.cartPage.getOrderSummaryProductTotal(cardNameGreen)).toBe('$20.00');

      expect(await pageManager.cartPage.getPaymentDue()).toBe('$20.00');
    });

    await test.step('Check user data is empty', async () => {
      await expect(pageManager.cartPage.firstNameInput).toHaveValue('');
      await expect(pageManager.cartPage.emailInput).toHaveValue('');
    });

    await test.step('Go to Home page', async () => await pageManager.homePage.goto(baseURL));

    await test.step('Check Recently viewed contains products', async () => {
      const hrefs = await componentManager.recentlyViewedComponent.getHrefs();

      expect(hrefs.some((href) => href?.includes(HrefProductName[cardNamePurple]))).toBe(true);
      expect(hrefs.some((href) => href?.includes(HrefProductName[cardNameGreen]))).toBe(true);
    });
  });
});
