import { Page } from "@playwright/test";
import { PageManager } from "../pages/page-manager/page-manager";
import { ComponentManager } from "../components/component-manager/component-manager";
import { UserCredentials } from "../types/types";
import { expect } from "@playwright/test";

//TODO. Rewrite it to API methods
export async function clearCartViaUI(page: Page, baseURL: string, credentials?: UserCredentials): Promise<void> {
  const pageManager = new PageManager(page);
  const componentManager = new ComponentManager(page);

  await pageManager.basePage.goto(baseURL);

  if (credentials) {
    await componentManager.loginComponent.loginFlow(credentials.email, credentials.password);

    expect(await componentManager.noticeComponent.getSuccessMessage()).toBe(
      ` You are now logged in as ${credentials.username}.`,
    );
  }

  await pageManager.basePage.goto("/checkout");

  if (await pageManager.cartPage.removeButton.isVisible()) {
    await pageManager.cartPage.removeButton.click();
  }

  if (credentials) await page.goto("/logout");
}
