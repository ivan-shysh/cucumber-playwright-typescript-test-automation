import {Before, After, ITestCaseHookParameter, setDefaultTimeout} from "@cucumber/cucumber";
import { ScenarioWorld } from './world'
import { env, envNumber } from '../../env/parseEnv'

setDefaultTimeout(envNumber('SCRIPT_TIMEOUT'));


// runs before every single scenario/test
Before(async function (this: ScenarioWorld, scenario) {
    console.log(`Running cucumber scenario ${scenario.pickle.name}`)

    const contextOptions = {
        recordVideo: {
            dir: `${env('VIDEO_PATH')}${scenario.pickle.name}`,
        }
    }
    
    const ready = await this.init(contextOptions)
    return ready;
});

// runs after every test
After(async function(this: ScenarioWorld, scenario) {

    const {
        screen: { page, browser}
    } = this;

    const scenarioStatus = scenario.result?.status;
    // The optional chaining operator (?.) offers a safer and more concise way to access properties deep within object chains, 
    // especially when some parts of the chain may not exist. It prevents TypeErrors that could occur when accessing properties on undefined or null, 
    // making code more robust and easier to read.

    if (scenarioStatus === 'FAILED') {
        const screenshot = await page.screenshot({
            path: `${env('SCREENSHOT_PATH')}${scenario.pickle.name}.png`
        });
        await this.attach(screenshot, 'image/png')
    }

    await browser.close();
    return browser;
});

