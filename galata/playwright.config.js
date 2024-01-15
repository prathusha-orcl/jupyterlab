// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var baseConfig = require('@jupyterlab/galata/lib/playwright-config');

module.exports = {
  ...baseConfig,
  projects: [
    // {
    //   name: 'documentation',
    //   // Try one retry as some tests are flaky
    //   retries: process.env.CI ? 2 : 0,
    //   testMatch: 'test/documentation/**/*.test.ts',
    //   testIgnore: '**/.ipynb_checkpoints/**',
    //   timeout: 90000,
    //   use: {
    //     launchOptions: {
    //       // Force slow motion
    //       slowMo: 30
    //     }
    //   }
    // },
    // {
    //   name: 'galata',
    //   testMatch: 'test/galata/**',
    //   testIgnore: '**/.ipynb_checkpoints/**'
    // },
    {
      name: 'jupyterlab',
      testMatch: 'test/jupyterlab/**',
      testIgnore: '**/.ipynb_checkpoints/**',
      use: {
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write']
        }
      }
    }
    // {
    //   name: 'benchmark',
    //   testMatch: 'test/benchmark/**'
    // }
  ],
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    [
      '@jupyterlab/galata/lib/benchmarkReporter',
      { outputFile: 'lab-benchmark.json' }
    ]
  ],
  use: {
    video: 'off',
    baseURL: process.env.TARGET_URL ?? 'http://127.0.0.1:8889'
  },
  workers: 5,
  // Switch to 'always' to keep raw assets for all tests
  preserveOutput: 'failures-only', // Breaks HTML report if use.video == 'on'
  // Try one retry as some tests are flaky
  retries: process.env.CI ? 1 : 0
};
