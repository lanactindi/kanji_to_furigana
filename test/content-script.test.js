const puppeteer = require('puppeteer');

const EXTENSION_PATH = './';
describe('コンテントスクリプト', () => {
  let browser;
  let page;
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
        '--window-size=800,600',
      ],
    });
    page = await browser.newPage();
    await page.goto(
      'https://imikaisetu.goldencelebration168.com/archives/2061',
    );
    await page.setViewport({ width: 1280, height: 800 });
    const linkHandlers = await page.$x("//em[contains(text(), '関連')]");
    await linkHandlers[0].click({ clickCount: 2 });
  });
  describe('テキストを選択するとき', () => {
    test('アイコンが表示される', async () => {
      await page.waitForFunction(
        'document.querySelector("body").getElementsByClassName("translator-ext-icon")[0] != undefined',
      );
      await browser.close();
    });
  });
  describe('アイコンをクリックするとき', () => {
    beforeEach(async () => {
      const button = await page.$('path');
      await button.click();
    });
    test('ベトナム語で言葉のページが表示される', async () => {
      await page.waitForTimeout(2000);
      await page.waitForFunction(
        'document.querySelector("body").getElementsByClassName("translator-result-ext-container")[0] != undefined',
      );
      await page.waitForFunction(
        "document.querySelector('#dic_bubble_synonyms > div > div > div.vocabulary_searched_pl').innerHTML === '関連'",
      );
      await page.waitForFunction(
        'document.querySelector("#vocabulary_mean_group > div").innerHTML === "  sự liên quan; sự liên hệ; sự quan hệ; liên quan; liên hệ; quan hệ"',
      );
      await browser.close();
    });
    test('英語で言葉のページが表示される', async () => {
      await page.waitForTimeout(2000);
      const englishTab = await page.$('#tab_english');
      englishTab.click();
      await page.waitForFunction(
        'document.querySelector("body").getElementsByClassName("translator-result-ext-container")[0] != undefined',
      );
      await page.waitForFunction(
        "document.querySelector('#dic_bubble_synonyms > div > div > div.vocabulary_searched_pl').innerHTML === '関連'",
      );
      await page.waitForFunction(
        'document.querySelector("#vocabulary_mean_group > div").innerHTML === " a term in a proposition that is related to the referent of the proposition"',
      );
      await browser.close();
    });
  });
  describe('漢字タブをクリックするとき', () => {
    beforeEach(async () => {
      const button = await page.$('path');
      await button.click();
    });
    test('ベトナム語で漢字コンテントが表示される', async () => {
      await page.waitForTimeout(2000);
      const kanjiTab = await page.$('#tab_kanji');
      await page.waitForFunction(
        "!document.querySelector('#tab_kanji').className.includes('tab_active')",
      );
      await kanjiTab.click();
      await page.waitForFunction(
        "document.querySelector('.kanji_chinese_meaning').innerHTML === 'QUAN'",
      );
      await browser.close();
    });
    test('英語で漢字コンテントが表示される', async () => {
      await page.waitForTimeout(2000);
      const englishTab = await page.$('#tab_english');
      englishTab.click();
      await page.waitForTimeout(2000);
      const kanjiTab = await page.$('#tab_kanji');
      await page.waitForFunction(
        "!document.querySelector('#tab_kanji').className.includes('tab_active')",
      );
      await kanjiTab.click();
      await page.waitForFunction(
        "document.querySelector('.kanji_chinese_meaning').innerHTML === 'CONNECTION'",
      );
      await browser.close();
    });
  });
});
