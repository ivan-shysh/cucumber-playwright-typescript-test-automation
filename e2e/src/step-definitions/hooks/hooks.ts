import {BeforeAll, Before, AfterAll, After} from "@cucumber/cucumber";
const {chromium} = require("playwright");

// runs before all of the tests
BeforeAll(async() => {
    global.browser = await chromium.launch({
        headless:false,
    })
});

// runs after all of the tests were completed - we clean up and close our browser after all our tests are complete
AfterAll(async() => {
    await global.browser.close();
});

// runs before every single scenario/test
Before(async(scenario) => {
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: './reports/videos/' + scenario.pickle.name, 
        }
    }); 
    // browser context is an isolated incognito-like session within the browser; each new scenario is recommended
    // to be run in a new browser context so the browser state is isolated between tests
    global.page = await global.context.newPage(); // page referes to a sinlge window or a pop-up page within a browser context; it is used to navigate to URL's and 
    // interact with the pages content; we want to open a new page at the start of each test
});

// runs after every test
After(async(scenario) => {

    const scenarioStatus = scenario.result?.status;
    // The optional chaining operator (?.) offers a safer and more concise way to access properties deep within object chains, 
    // especially when some parts of the chain may not exist. It prevents TypeErrors that could occur when accessing properties on undefined or null, 
    // making code more robust and easier to read.

    if (scenarioStatus === 'FAILED') {
        await global.page.screenshot({
            path: `./reports/screenshots/${scenario.pickle.name}.png`
        });
    }

    await global.page.close() // we want to clean up and close our page after each test
});

