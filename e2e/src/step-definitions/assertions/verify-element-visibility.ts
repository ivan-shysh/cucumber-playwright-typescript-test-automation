import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/, // adding regex that accepts 'something' in double quotes here as well for two paremeters passed via home-page.feature
    async function(elementKey: string, expectedElementText: string) {

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`) 

        const content = await global.page.textContent("[data-id='contacts']")

        expect(content).toBe(expectedElementText) // that is the text that is defined by the Cucumber parameter in home-page.feature

    }
)