// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var baseConfig = require('./playwright.config');
const {devices} = require("@playwright/test");

module.exports = {
  ...baseConfig,
  projects: [
    {
      name: 'benchmark',
      testMatch: 'test/benchmark/**',
      use: {
        ...devices['Desktop Chrome'],
  //      channel: 'chrome',
        bypassCSP: true,
        bypassCORS: true,
        launchOptions: {
          args: ['--disable-web-security']
        }
      }
    }
  ],
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    [
      '@jupyterlab/galata/lib/benchmarkReporter',
      { outputFile: 'lab-benchmark.json' }
    ]
  ],
  use: {

    ...baseConfig.use,
    video: 'off',
    baseURL: process.env.TARGET_URL ?? 'http://127.0.0.1:8888'
  //  ignoreHTTPSErrors: true,
  //  baseURL: process.env.TARGET_URL ?? 'https://localhost:8182/ocid1.datasciencenotebooksession.oc1.phx.aaaaaaaarxbdrfby6kbcp4s7wfxzjaildgefltic4mrprffet327tfg3x6mq/'
  },

  preserveOutput: 'failures-only',
  workers: 1
};
