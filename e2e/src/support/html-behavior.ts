import { Page, Frame } from 'playwright';
import { ElementLocator } from '../env/global';

export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<void> => {
    await page.click(elementIdentifier);
};

export const inputValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string,
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.fill(elementIdentifier, input)
}

export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string,
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.selectOption(elementIdentifier, option)
};

export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.check(elementIdentifier);
};

export const uncheckElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.uncheck(elementIdentifier);
}

// export const getValue = async (
//     page: Page,
//     elementIdentifier: ElementLocator
// ): Promise<string | null> => {
//     const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
//         return el.value;
//     })
//     return value
// };

/**
 * Returns the value of an input-like element on the page.
 *
 * @remarks
 * Replaced direct `$eval()` with `waitForSelector()` to ensure the element exists and is visible
 * before accessing `.value`. Added type guards for `<input>`, `<textarea>`, and `<select>` to avoid
 * runtime type mismatches and increase compatibility across form element types.
 * This change resolves intermittent failures due to rendering delays in async-driven UIs. The original function is above for further study 
 * and understanding long-term implications.
 */

export const getValue = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<string | null> => {
    await page.waitForSelector(elementIdentifier, { state: 'visible' });

    return await page.$eval(elementIdentifier, (el: Element) => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            return el.value;
        }
        return null;
    });
};


export const getIframeElement = async (
    page: Page,
    iframeIdentifier: ElementLocator
): Promise<Frame | undefined | null> => {
    await page.waitForSelector (iframeIdentifier);
    const elementHandle = await page.$(iframeIdentifier);
    const elementIframe = await elementHandle?.contentFrame();
    return elementIframe;
}

export const inputValueOnIframe = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
    input: string
): Promise<void> => {
    await elementIframe.fill(elementIdentifier, input);
}