import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from './setup/world';
import { waitFor } from '../support/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ElementKey } from '../env/global';

Then(
    /^I check the "([^"]*)" button$/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I check the ${elementKey} button`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor ( async () => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: 'visible',
            });
            if (result) {
                await checkElement(elementIdentifier);
            }
            return result
        });
    }
)