"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const vuepress_utils_1 = require("@mr-hope/vuepress-utils");
const defaultConfig_1 = require("./defaultConfig");
const locales_1 = require("./locales");
const themeConfig_1 = require("./themeConfig");
const vuepress_plugin_pwa_1 = require("@mr-hope/vuepress-plugin-pwa");
const config = (config) => {
    // merge default config
    vuepress_utils_1.deepAssignReverse(defaultConfig_1.default, config);
    const resolvedConfig = config;
    themeConfig_1.resolveThemeConfig(resolvedConfig.themeConfig);
    locales_1.resolveLocales(resolvedConfig);
    if (resolvedConfig.themeConfig.pwa)
        resolvedConfig.head = vuepress_plugin_pwa_1.head(resolvedConfig.themeConfig.pwa, config.head);
    return resolvedConfig;
};
exports.config = config;
