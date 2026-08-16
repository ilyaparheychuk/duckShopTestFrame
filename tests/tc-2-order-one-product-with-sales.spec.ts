import test, { expect } from "@playwright/test";
import { CartPage, HomePage, OrderSuccessPage, ProductPage } from "../src/pages";
import { CartComponent, LoginComponent, NoticeComponent, ProductCardComponent } from "../src/components";
import { ProductName } from "../src/types/types";

test.describe("Test case 2", () => {
  test("Order one item with discount", async ({ page, baseURL }) => {
    const userName = process.env.TEST_USERNAME || "";
    const userEmail = process.env.TEST_USER_EMAIL || "";
    const userPassword = process.env.TEST_PASSWORD || "";

    const homePage = new HomePage(page);
    const loginComponent = new LoginComponent(page);
    const noticeComponent = new NoticeComponent(page);
    const productCard = new ProductCardComponent(page);
    const productPage = new ProductPage(page);
    const cartComponent = new CartComponent(page);
    const cartPage = new CartPage(page);
    const orderSuccessPage = new OrderSuccessPage(page);

    await homePage.goto(baseURL);
    const cardName: ProductName = "Yellow Duck";

    await test.step("Login to Litecart and check login success", async () => {
      await loginComponent.loginFlow(userEmail, userPassword);
      expect(await noticeComponent.getSuccessMessage()).toBe(` You are now logged in as ${userName}.`);
    });

    await test.step("Choose Yellow Duck product without sales", async () => {
      await productCard.chooseCardByTitleName(cardName);
      expect(await productPage.getTitle()).toBe(cardName);
    });

    const quantity = "2";
    let sum: number;

    await test.step("Add 2 items and check cart", async () => {
      await productPage.selectSize("Small");
      await productPage.addQuantity(quantity);
      await productPage.clickAddToCartButton();

      sum = (await productPage.getCampaignPrice()) * Number(quantity);

      await expect(cartComponent.cartContent).toHaveText(`Cart: ${quantity} item(s) - $${sum}`, { timeout: 5000 });
    });

    await test.step("Go to cart and check data of order is correct", async () => {
      await cartComponent.clickToCart();

      expect(await cartPage.getOrderSummaryProductQuantity(cardName)).toBe(quantity);
      expect(await cartPage.getOrderSummaryProductTotal(cardName)).toBe(`$${sum.toFixed(2)}`);
    });

    await test.step("Confirm order", async () => {
      await cartPage.confirmOrder();

      expect(await orderSuccessPage.getTitle()).toBe("Your order is successfully completed!");
    });
  });
});
