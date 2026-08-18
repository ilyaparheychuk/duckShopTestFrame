import { expect } from '@playwright/test';
import { ProductName } from '../src/types/types';
import { test } from '../src/fixtures/fixtures';
import { PageManager } from '../src/pages/page-manager/page-manager';
import { ComponentManager } from '../src/components/component-manager/component-manager';
import { Timeouts } from '../src/enums/enums';
import { clearCartViaUI } from '../src/helpers/clearCartHelper';

test.describe('Test case 1', () => {
  //TODO. Rewrite it to API methods
  test.beforeEach(async ({ page, baseURL, credentials }) => {
    await clearCartViaUI(page, baseURL!, credentials);
  });

  test('Order one item without discount', async ({ page, baseURL, credentials }) => {
    const pageManager = new PageManager(page);
    const componentManager = new ComponentManager(page);

    const cardName: ProductName = 'Blue Duck';

    const quantity = '3';
    let sum: number;

    await test.step('Open home page', async () => await pageManager.homePage.goto(baseURL!));

    await test.step('Login to Litecart', async () =>
      await componentManager.loginComponent.loginFlow(credentials.email, credentials.password));

    await test.step('Check login success', async () =>
      expect(await componentManager.noticeComponent.getSuccessMessage()).toBe(
        ` You are now logged in as ${credentials.username}.`
      ));

    await test.step('Choose Blue Duck product', async () =>
      await componentManager.productCardComponent.chooseCardByTitleName(cardName));

    await test.step('Check that product page with correct title opened', async () =>
      expect(await pageManager.productPage.getTitle()).toBe(cardName));

    await test.step('Add 3 items', async () => {
      await pageManager.productPage.addQuantity(quantity);
      await pageManager.productPage.clickAddToCartButton();

      sum = (await pageManager.productPage.getPrice()) * Number(quantity);
    });

    await test.step('Check that cart component has correct data', async () =>
      await expect(componentManager.cartComponent.cartContent).toHaveText(`Cart: ${quantity} item(s) - $${sum}`, {
        timeout: Timeouts.standard,
      }));

    await test.step('Go to cart page', async () => await componentManager.cartComponent.clickToCart());

    await test.step('Check data of order is correct', async () => {
      expect(await pageManager.cartPage.getOrderSummaryProductQuantity(cardName)).toBe(quantity);
      expect(await pageManager.cartPage.getOrderSummaryProductTotal(cardName)).toBe(`$${sum.toFixed(2)}`);
    });

    await test.step('Confirm order', async () => await pageManager.cartPage.confirmOrder());

    await test.step('Check success message', async () =>
      expect(await pageManager.orderSuccessPage.getTitle()).toBe('Your order is successfully completed!'));
  });
});
