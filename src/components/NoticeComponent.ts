import { Locator, Page } from "@playwright/test";

export class NoticeComponent {
  public noticeSuccess: Locator;

  constructor(page: Page) {
    this.noticeSuccess = page.locator("div[class='notice success']");
  }

  public getSuccessMessage(): Promise<string> {
    return this.noticeSuccess.innerText();
  }
}
