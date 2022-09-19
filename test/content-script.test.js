const puppeteer = require("puppeteer");
const EXTENSION_PATH = "./";

describe("テキストを選択するとき", () => {
  test("アイコンが表示される", async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
        `--window-size=800,600`,
      ],
    });
    const page = await browser.newPage();
    await page.goto("https://shinagawa.keizai.biz/headline/3170/");
    await page.setViewport({ width: 1280, height: 800 });

    const linkHandlers = await page.$x("//h1[contains(text(), '目的')]");
    await linkHandlers[0].click({ clickCount: 2 });
    await page.waitForFunction(
      'document.querySelector("body").getElementsByClassName("translator-ext-icon")[0] != undefined'
    );
    const button = await page.$("path");
    await button.click()
    await page.waitForFunction(
      'document.querySelector("body").getElementsByClassName("translator-result-ext-container")[0] != undefined'
    );
    await browser.close();
  });
});
