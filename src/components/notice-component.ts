import { Locator, Page } from "@playwright/test";

export class NoticeComponent {
  public noticeSuccess: Locator;
  public noticeError: Locator;

  constructor(page: Page) {
    this.noticeSuccess = page.locator("div[class='notice success']");
    this.noticeError = page.locator("div[class='notice errors']");
  }

  public getSuccessMessage(): Promise<string> {
    return this.noticeSuccess.innerText();
  }

  public getErrorMessage(): Promise<string> {
    return this.noticeError.innerText();
  }

  public getErrorMessageBackgroundColor(): Promise<string> {
    return this.noticeError.evaluate((el) => getComputedStyle(el).backgroundColor);
  }
}
