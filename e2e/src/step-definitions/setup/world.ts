import playwright, {
    BrowserContextOptions,
    Page,
    Browser,
    BrowserContext,
    BrowserType
} from "playwright";

import { World, IWorldOptions, setWorldConstructor} from "@cucumber/cucumber";

export type Screen = {
    browser: Browser;
    context: BrowserContext;
    page: Page;
}

export class ScenarioWorld extends World {
    constructor(options: IWorldOptions) {
        super(options)
    }

    screen!: Screen;

    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
        await this.screen?.page?.close();
        await this.screen?.context?.close();
        await this.screen?.browser?.close();

        const browser = await this.newBrowser(); // We will create a custom function here that will determine our new browser based on an environment variable we set
        // and that environment variable will either dictate if our tests run on Chromium, Firefox, WebKit
        const context = await browser.newContext(contextOptions);
        const page = await context.newPage();

        this.screen = { browser, context, page };

        return this.screen;
    }

}