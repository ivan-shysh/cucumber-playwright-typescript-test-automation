import { Page } from 'playwright'
import { ElementKey, ElementLocator, GlobalConfig } from '../env/global'
import { getCurrentPageId } from './navigation-behavior';

export const getElementLocator = (
    page: Page, 
    elementKey: ElementKey,  
    globalConfig: GlobalConfig,
): ElementLocator => {

    const currentPage = getCurrentPageId(page, globalConfig)

    const { pageElementMappings } = globalConfig;

    console.log('🌐 getElementLocator()');
    console.log('🧭 Current page:', currentPage);
    console.log('🔑 Element key:', elementKey);
    console.log('📦 Page element mappings:', pageElementMappings[currentPage]);


    return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]
}