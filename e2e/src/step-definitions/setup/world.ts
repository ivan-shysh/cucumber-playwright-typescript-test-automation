import playwright, {
    BrowserContextOptions,
    Page,
    Browser,
    BrowserContext,
    BrowserType
} from "playwright";
import { env } from '../../env/parseEnv'
import { World, IWorldOptions, setWorldConstructor} from "@cucumber/cucumber";
import { GlobalConfig } from "../../env/global";

//Purpose: This part of the code is defining a type named Screen. 
//This is not creating an object but specifying a blueprint for what an object of type Screen should look like. 
//It's a contract or a template stating that any Screen object will have three properties: browser (of type Browser), 
//context (of type BrowserContext), and page (of type Page). 
//Each of these types (Browser, BrowserContext, and Page) are also defined by Playwright 
//and represent different aspects of a browser automation setup.
export type Screen = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
};

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) { 
        super(options);

        this.globalConfig = options.parameters as GlobalConfig;
    }

    globalConfig: GlobalConfig;

    screen!: Screen;
// remove 
    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
        await this.screen?.page?.close();
        await this.screen?.context?.close();
        await this.screen?.browser?.close();

        const browser = await this.newBrowser(); /* We will create a custom function here that 
        will determine our new browser based on an environment variable we set
        and that environment variable will dictate if our tests run on Chromium, Firefox, WebKit */
        const context = await browser.newContext({
            ...(contextOptions || {}),
            viewport:null,
    });
        const page = await context.newPage();

        this.screen = { browser, context, page };

        return this.screen;
    }

    private newBrowser = async (): Promise<Browser> => { // This method is a property of ScenarioWorld class

        const automationBrowsers = ['chromium', 'firefox', 'webkit']
        // Using typeof with indexed access to get the type of an element in the array
        type AutomationBrowser = typeof automationBrowsers[number] // 'chromium' | 'firefox' | 'webkit'
        // The use of typeof automationBrowsers[number] ensures that the type of automationBrowser can only be one of the three valid browser strings. 
        // This type safety is crucial because it restricts automationBrowser to valid inputs, 
        // which aligns with what Playwright expects when we later use it to index playwright[automationBrowser] to get a specific BrowserType
        const automationBrowser = env('UI_AUTOMATION_BROWSER') as AutomationBrowser;

        const browserType: BrowserType = playwright[automationBrowser];
        const browser = await browserType.launch({
            devtools: process.env.DEVTOOLS !== 'false',
            headless: process.env.HEADLESS !== 'false',
            args: [ '---start-maximized', 
                    '--disable-web-security', 
                    '--disable-features=IsolateOrigins, site-per-process',
                ],
        });
        return browser;
    };
}

setWorldConstructor(ScenarioWorld);