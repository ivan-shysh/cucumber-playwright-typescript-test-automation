import { Given } from '@cucumber/cucumber'

Given(
    /^I am on the "([^"]*)" page$/, //we added a regex here that takes a string inside a set of double quotes "([^"]*)"
    async function(pageId: string) { //we declare that the function takes one parameter here, the type of the parameter is string
        const {
            screen: { page },
        } = this; // In Cucumber step definitions, 'this' is bound to the current instance fo the 'World' class

        console.log(`I am on the ${pageId} page`); // The console logs a message declaring the name of the page that is passed as a parameter in the home-page.feature

        await page.goto("http://localhost:3000/")

    }
)