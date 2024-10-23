import { Given } from '@cucumber/cucumber';
import { PageId } from '../env/global';
import {
    navigateToPage,
    currentPathMatchesPageId,
} from '../support/navigation-behavior';
import { ScenarioWorld } from './setup/world';
import { waitFor } from '../support/wait-for-behavior';

Given(
    /^I am on the "([^"]*)" page$/, //we added a regex here that takes a string inside a set of double quotes "([^"]*)"
    async function(this: ScenarioWorld, pageId: PageId) { //we declare that the function takes one parameter here, the type of the parameter is string
        const {
            screen: { page },
            globalConfig,
        } = this; // In Cucumber step definitions, 'this' is bound to the current instance fo the 'World' class

        console.log(`I am on the ${pageId} page`); // The console logs a message declaring the name of the page that is passed as a parameter in the home-page.feature

        await navigateToPage(page, pageId, globalConfig)

        await waitFor (() => currentPathMatchesPageId(page, pageId, globalConfig))
    }
)

Given(
    /^I am directed to the "([^"]*)" page$/,
    async function (this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I am directed to the ${pageId} page`)

        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig))
        // this step seems redundant becuase of the page matching regex used in the previous step but in reality adds stability and readibility
    }
)