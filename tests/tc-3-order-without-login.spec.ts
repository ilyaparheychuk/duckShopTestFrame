import test, { expect } from "@playwright/test";
import { CartPage, HomePage, OrderSuccessPage, ProductPage } from "../src/pages";
import {
  CartComponent,
  LoginComponent,
  NoticeComponent,
  ProductCardComponent,
  RecentlyViewedComponent,
} from "../src/components";
import { ProductName } from "../src/types/types";
import { HrefProductName } from "../src/enums/enums";

test.describe("Test case 3", () => {
  test("Order without login", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);

    const productCard = new ProductCardComponent(page);
    const productPage = new ProductPage(page);
    const cartComponent = new CartComponent(page);
    const cartPage = new CartPage(page);
    const recentlyViewedComponent = new RecentlyViewedComponent(page);

    await homePage.goto(baseURL);
    const cardNamePurple: ProductName = "Purple Duck";
    const cardNameGreen: ProductName = "Green Duck";
    let sum: number;

    await test.step("Add Purple Duck to cart and check that cart component has correct sum", async () => {
      await productCard.chooseCardByTitleName(cardNamePurple);
      await productPage.clickAddToCartButton();
      sum = await productPage.getPrice();
      await expect(cartComponent.cartContent).toHaveText(`Cart: 1 item(s) - $${sum}`, { timeout: 5000 });
    });

    await test.step("Add Green Duck to cart", async () => {
      await productCard.chooseCardByTitleName(cardNameGreen);
      await productPage.clickAddToCartButton();
      sum = (await productPage.getPrice()) + sum;
      await expect(cartComponent.cartContent).toHaveText(`Cart: 2 item(s) - $${sum}`, { timeout: 5000 });
    });

    await test.step("Go to cart and check data of order is correct", async () => {
      await cartComponent.clickToCart();

      expect(await cartPage.getOrderSummaryProductQuantity(cardNamePurple)).toBe("1");
      expect(await cartPage.getOrderSummaryProductTotal(cardNamePurple)).toBe("$0.00");

      expect(await cartPage.getOrderSummaryProductQuantity(cardNameGreen)).toBe("1");
      expect(await cartPage.getOrderSummaryProductTotal(cardNameGreen)).toBe("$20.00");

      expect(await cartPage.getPaymentDue()).toBe("$20.00");
    });

    await test.step("User data is empty", async () => {
      await expect(cartPage.firstNameInput).toHaveValue("");
      await expect(cartPage.emailInput).toHaveValue("");
    });

    await test.step("Go to Home page and check Recently viewed contains products", async () => {
      await homePage.goto(baseURL);
      const hrefs = await recentlyViewedComponent.getHrefs();

      expect(hrefs.some((href) => href?.includes(HrefProductName[cardNamePurple]))).toBe(true);
      expect(hrefs.some((href) => href?.includes(HrefProductName[cardNameGreen]))).toBe(true);
    });
  });
});
