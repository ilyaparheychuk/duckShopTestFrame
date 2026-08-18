import { Page } from '@playwright/test';
import { PageManager } from '../pages/page-manager/page-manager';
import { ComponentManager } from '../components/component-manager/component-manager';
import { UserCredentials } from '../types/types';
import { Timeouts } from '../enums/enums';

//TODO. Rewrite it to API methods
export async function clearCartViaUI(page: Page, baseURL: string, credentials?: UserCredentials): Promise<void> {
  const pageManager = new PageManager(page);
  const componentManager = new ComponentManager(page);

  await pageManager.basePage.goto(baseURL);

  if (credentials) {
    await componentManager.loginComponent.loginFlow(credentials.email, credentials.password);
    await componentManager.noticeComponent.noticeSuccess.waitFor({ state: 'visible', timeout: Timeouts.standard });
  }

  await pageManager.basePage.goto('/checkout');

  if (await pageManager.cartPage.removeButton.isVisible()) {
    await pageManager.cartPage.removeButton.click();
  }

  await pageManager.cartPage.noItemMessage.waitFor({ state: 'visible', timeout: Timeouts.standard });

  if (credentials) await page.goto('/logout');
}
