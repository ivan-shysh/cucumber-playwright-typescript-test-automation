import { Given } from '@cucumber/cucumber';
import { PageId } from '../env/global';
import {
    navigateToPage,
    currentPathMatchesPagId,
} from '../support/navigation-behavior'

Given(
    /^I am on the "([^"]*)" page$/, //we added a regex here that takes a string inside a set of double quotes "([^"]*)"
    async function(pageId: PageId) { //we declare that the function takes one parameter here, the type of the parameter is string
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this; // In Cucumber step definitions, 'this' is bound to the current instance fo the 'World' class

        console.log(`I am on the ${pageId} page`); // The console logs a message declaring the name of the page that is passed as a parameter in the home-page.feature

        globalVariables.currentScreen = pageId;

        await navigateToPage(page, pageId, globalConfig)

    }
)