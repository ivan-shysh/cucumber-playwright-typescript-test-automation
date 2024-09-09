import { Page } from 'playwright'
import { ElementKey, ElementLocator, GlobalConfig } from '../env/global'

export const getElementLocator = (
    page: Page, 
    elementKey: ElementKey,  
    globalConfig: GlobalConfig,
): ElementLocator => {

    const currentPage = getCurrentPage(page, globalConfig)

    const { pageElementMappings } = globalConfig;

    return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]
}