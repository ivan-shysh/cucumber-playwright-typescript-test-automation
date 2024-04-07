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
Before(async() => {
    global.context = await global.browser.newContext(); // browser context is an isolated incognito-like session within the browser; each new scenario is recommended
    // to be run in a new browser context so the browser state is isolated between tests
    global.page = await global.context.newPage(); // page referes to a sinlge window or a pop-up page within a browser context; it is used to navigate to URL's and 
    // interact with the pages content; we want to open a new page at the start of each test
});

// runs after every test
After(async() => {
    await global.page.close() // we want to clean up and close our page after each test
});

