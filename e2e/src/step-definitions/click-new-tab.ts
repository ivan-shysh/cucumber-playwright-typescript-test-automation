import { When } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';
import { getElementLocator } from '../support/web-element-helper';
import { waitFor } from '../support/wait-for-behavior';

When(
  /^I click the "([^"]*)" link that opens a new tab$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    const {
      screen: { page },
      globalConfig,
    } = this;

    const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
    const initialPages = page.context().pages();
    const initialTabCount = initialPages.length;

    console.log(`🧭 Clicking "${elementKey}"... Current tabs: ${initialTabCount}`);

    const elementHandle = await page.$(elementIdentifier);
    if (!elementHandle) throw new Error(`❌ Element not found: ${elementKey}`);
    
    // Perform the DOM-level click
    await elementHandle.evaluate((el: HTMLElement) => el.click());

    // Wait for the number of tabs to increase
    await waitFor(async () => {
      const pages = page.context().pages();
      return pages.length > initialTabCount;
    }, { timeout: 10000, wait: 500 });

    const pages = page.context().pages();
    console.log(`✅ Total pages after click: ${pages.length}`);
    for (const [idx, p] of pages.entries()) {
      console.log(`📑 Tab ${idx + 1}: "${await p.title()}"`);
    }
  }
);
