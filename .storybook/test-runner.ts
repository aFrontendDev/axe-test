// https://storybook.js.org/docs/writing-tests/test-runner
import type { TestRunnerConfig } from '@storybook/test-runner';
import { waitForPageReady } from '@storybook/test-runner';
import { expect } from '@storybook/test';
import { type Page } from '@playwright/test';

// Import axe DevTools
import AxeDevtoolsBuilder from '@axe-devtools/playwright';
import AxeDevtoolsReporter from '@axe-devtools/reporter';

// Output directory for axe scan results
const axeDevToolsOutputDir = './axe-devtools-results';

// axe scan results file pre-pend and sub directory for JSON reports
const axeReporter = new AxeDevtoolsReporter('axe-devtools---', axeDevToolsOutputDir + '/json');

// const customWaitForPageReady = async (page: Page) => {
//   await page.waitForLoadState('domcontentloaded');
//   await page.waitForLoadState('load');
//   await page.waitForFunction(() => document.readyState === 'complete');
//   await page.waitForFunction(() => document.fonts.ready);
// };

const doAxeThings = async (page: Page, pageId: string) => {
    const axeDevToolsResults = await new AxeDevtoolsBuilder({ page }).analyze();
    axeReporter.logTestResult(pageId, axeDevToolsResults);
    await axeReporter.buildHTML(axeDevToolsOutputDir + '/html/');

    // Output axe violations to console
    const violationsCount = axeDevToolsResults.violations?.length;
    if (violationsCount) {
      console.log('axeDevToolsResults.violations total:', axeDevToolsResults.violations.length);
        // console.log(axeDevToolsResults.violations);
    }

    return true;
};


const config: TestRunnerConfig = {
  setup() {
    //
  },

  async preVisit(page) {
    //
  },

  async postVisit(page, context) {
    // Wait for page to be finished loading
    await waitForPageReady(page);

    // Get the page title for output files
    // const pageTitle = await page.title();
    const pageId = context.id; // e.g. core-components-uolbacktotop--default

    await doAxeThings(page, pageId);
  },
};

export default config;
