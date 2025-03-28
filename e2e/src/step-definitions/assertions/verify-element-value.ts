import { Then } from '@cucumber/cucumber';
import { ScenarioWorld } from '../setup/world';
import { ElementKey } from '../../env/global';
import { getValue } from '../../support/html-behavior';
import { getElementLocator } from '../../support/web-element-helper'
import { waitFor } from '../../support/wait-for-behavior';

Then(
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/, // adding regex that accepts 'something' in double quotes here as well for two paremeters passed via home-page.feature
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate ? 'not' : ''} contain the text ${expectedElementText}`) 

        const elementIdentifier = getElementLocator(page, elementKey,globalConfig)

        const content = await page.textContent(elementIdentifier)

        await waitFor ( async () => {
            const elementText = await page.textContent(elementIdentifier)
            return elementText?.includes(expectedElementText) === !negate;
        });  
    }
)

Then(
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey,negate: boolean, expectedElementText: string) {
        const { 
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate ? 'not' : ''} equal the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor ( async () => {
            const elementText = await page.textContent(elementIdentifier)
            return (elementText === expectedElementText) === !negate
        });
    }
);

Then(
    /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
    async function(this: ScenarioWorld, negate: boolean, elementKey: ElementKey, elementValue:string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should ${negate ? 'not' : ''} contain the value ${elementValue}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor ( async () => {
            const elementAttribute = await getValue(page, elementIdentifier)
            return elementAttribute?.includes(elementValue) === !negate;
        })
    }
);