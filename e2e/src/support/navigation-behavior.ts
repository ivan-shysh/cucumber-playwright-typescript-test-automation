import { Page } from 'playwright';
import { GlobalConfig, PageId } from '../env/global';

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    { pagesConfig, hostsConfig }: GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env; /* This code is saying, "Give me the value of the UI_AUTOMATION_HOST environment variable. 
    If it doesn't exist, use 'localhost' as the default value and assign it to the hostName variable. 
    It is using object destructuring to extract a value from the process.env object, 
    which typically contains environment variables in a Node.js application.*/

    const hostPath = hostsConfig[`${hostName}`];

    const url = new URL(hostPath);

    const pageConfigItem = pagesConfig[pageId];
    url.pathname = pageConfigItem.route;

    await page.goto(url.href);
};

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    const pageRegexString = pagesConfig[pageId].regex;
    const pageRegex = new RegExp(pageRegexString);
    return pageRegex.test(path);
};

export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig,
): boolean => {
    const { pathname:currentPath } = new URL(page.url()) 
    return pathMatchesPageId(currentPath, pageId, globalConfig);
};
/* URL is a built-in TypeScript feature. It offers a structured way of using new URLs while making sure that 
they are valid. It will throw errors when attempting to create invalid URLs. */

export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig,
): PageId => {

    const { pagesConfig } = globalConfig; //will retun all page mappings - it will grab all the page mappings for each of 
    // defined pages in our pages.json

    const pageConfigPageids = Object.keys(pagesConfig)

    const { pathname: currentPath } = new URL(page.url())

    const currentPageId = pageConfigPageids.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
);

if(!currentPageId) {
    throw Error(
        `Failed to get page name from current route ${currentPath} \
         possible pages: ${JSON.stringify((pagesConfig))}`
    )
}

return currentPageId;

}