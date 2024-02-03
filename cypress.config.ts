import 'dotenv/config'

import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { defineConfig, } from "cypress";
import webpack from "@cypress/webpack-preprocessor";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
  video: false,
  viewportHeight: +(process.env.CYPRESS_VIEWPORT_WIDTH || 768),
  viewportWidth: +(process.env.CYPRESS_VIEWPORT_HEIGHT || 1024),
});