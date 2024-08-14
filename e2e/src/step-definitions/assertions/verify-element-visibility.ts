import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from '../setup/world';
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper'
import { waitFor } from '../../support/wait-for-behavior';

Then(
    /^the "([^"]*)" should be displayed$/,
    async function(this: ScenarioWorld, elementKey: string) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig);

        await waitFor ( async () => {
            const isElementVisible = (await page.$(elementIdentifier)) != null
            return isElementVisible;
        });
    }
)

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/, // adding regex that accepts 'something' in double quotes here as well for two paremeters passed via home-page.feature
    async function(this: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig,
            globalVariables,
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`) 

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)

        const content = await page.textContent(elementIdentifier)

        expect(content).toBe(expectedElementText) // that is the text that is defined by the Cucumber parameter in home-page.feature

    }
)
