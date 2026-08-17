import { expect } from "@playwright/test";
import { NoticeMessageColors } from "../src/enums/enums";
import { test } from "../src/fixtures/fixtures";
import { PageManager } from "../src/pages/page-manager/page-manager";
import { ComponentManager } from "../src/components/component-manager/component-manager";

test.describe("Test case 4", () => {
  test("Login with incorrect password", async ({ page, baseURL, credentials }) => {
    const pageManager = new PageManager(page);
    const componentManager = new ComponentManager(page);

    await test.step("Open home page", async () => await pageManager.homePage.goto(baseURL));

    await test.step("Enter correct email and incorrect password", async () =>
      await componentManager.loginComponent.fillForm(credentials.email, "123456"));

    await test.step("Click login button", async () => await componentManager.loginComponent.clickLogin());

    await test.step("Check error text and message background color", async () => {
      expect(await componentManager.noticeComponent.getErrorMessage()).toBe(
        " Wrong password or the account is disabled, or does not exist",
      );
      expect(await componentManager.noticeComponent.getErrorMessageBackgroundColor()).toBe(NoticeMessageColors.error);
    });
  });
});
