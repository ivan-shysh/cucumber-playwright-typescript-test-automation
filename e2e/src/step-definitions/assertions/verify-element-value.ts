import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from '../setup/world';
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper'
import { waitFor } from '../../support/wait-for-behavior';

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/, // adding regex that accepts 'something' in double quotes here as well for two paremeters passed via home-page.feature
    async function(this: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`) 

        const elementIdentifier = getElementLocator(page, elementKey,globalConfig)

        const content = await page.textContent(elementIdentifier)

        await waitFor ( async () => {
            const elementText = await page.textContent(elementIdentifier)
            return elementText?.includes(expectedElementText)
        });  
    }
)
