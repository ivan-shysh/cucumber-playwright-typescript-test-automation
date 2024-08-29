import { Page } from 'playwright';
import { GlobalConfig, PageId } from '../env/global';

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    { pagesConfig, hostsConfig }: GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env;

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

export const currentPathMatchesPagId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig,
): boolean => {
    const { pathname:currentPath } = new URL(page.url()) 
    return pathMatchesPageId(currentPath, pageId, globalConfig);
};
/* URL is a built-in TypeScript feature. It offers a structured way of using new URLs while making sure that 
they are valid. It will throw errors when attempting to create invalid URLs. */