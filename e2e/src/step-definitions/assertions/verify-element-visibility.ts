import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from '../setup/world';
import { expect } from '@playwright/test';

Then(
    /^the "([^"]*)" should be displayed$/,
    async function(this: ScenarioWorld, elementKey: string) {
        const {
            screen: { page },
        } = this;

        console.log(`the ${elementKey} should be displayed`)

        const locator = page.locator("[data-id='header-logo']")

        await expect(locator).toBeVisible;
    }
)

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/, // adding regex that accepts 'something' in double quotes here as well for two paremeters passed via home-page.feature
    async function(this: ScenarioWorld, elementKey: string, expectedElementText: string) {
        const {
            screen: { page },
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`) 

        const content = await page.textContent("[data-id='contacts']")

        expect(content).toBe(expectedElementText) // that is the text that is defined by the Cucumber parameter in home-page.feature

    }
)
