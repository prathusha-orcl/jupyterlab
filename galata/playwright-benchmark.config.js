// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
// import dotenv from 'dotenv';

var baseConfig = require('./playwright.config');
const {devices} = require("@playwright/test");



// export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

module.exports = {
  ...baseConfig,
  projects: [
    {
      name: 'create_content',
      testMatch: 'test/create_content/**',
      use: {
        baseURL: process.env.TARGET_URL ?? 'http://127.0.0.1:8888'
      }
    },
    // {
    //   name: 'login_handler',
    //   testMatch: '',
    //   use: {
    //     storageState: STORAGE_STATE,
    //     ignoreHTTPSErrors: true,
    //     baseURL: process.env.TARGET_URL ??
    //         'https://localhost:8182/ocid1.datasciencenotebooksession.oc1.phx.aaaaaaaarxbdrfby6kbcp4s7wfxzjaildgefltic4mrprffet327tfg3x6mq/'
    //   }
    // },
    {
      name: 'benchmark',
      testMatch: 'test/benchmark/**',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: ['--ignore-certificate-errors'],
        ignoreHTTPSErrors: true,
        baseURL: process.env.TARGET_URL ??
            'https://localhost:8182/ocid1.datasciencenotebooksession.oc1.phx.aaaaaaaarxbdrfby6kbcp4s7wfxzjaildgefltic4mrprffet327tfg3x6mq/'
        // channel: 'chrome',
  //       bypassCSP: true,
  //       bypassCORS: true,
  //       launchOptions: {
  //         args: ['--disable-web-security']
  //       }
      },
      dependencies: ['create_content']
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
    video: 'on',
  //  baseURL: process.env.TARGET_URL ?? 'http://127.0.0.1:8888',
  //  ignoreHTTPSErrors: true,
  //  baseURL: process.env.TARGET_URL ?? 'https://localhost:8182/ocid1.datasciencenotebooksession.oc1.phx.aaaaaaaarxbdrfby6kbcp4s7wfxzjaildgefltic4mrprffet327tfg3x6mq/'
  },
  preserveOutput: 'failures-only',
  workers: 1
};
