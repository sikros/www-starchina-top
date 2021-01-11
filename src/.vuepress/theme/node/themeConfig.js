"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveThemeConfig = void 0;
const vuepress_utils_1 = require("@mr-hope/vuepress-utils");
const encrypt_1 = require("./encrypt");
const setThemeLocales = (themeConfig, baseLang) => {
    const baseLangPath = vuepress_utils_1.lang2path(baseLang);
    // set locate for base
    themeConfig.locales["/"] = {
        ...vuepress_utils_1.getLocale(baseLang),
        ...(themeConfig.locales[baseLangPath] || {}),
        ...(themeConfig.locales["/"] || {}),
    };
    // handle other languages
    Object.keys(themeConfig.locales).forEach((path) => {
        if (path === "/")
            return;
        const lang = vuepress_utils_1.path2lang(path);
        themeConfig.locales[path] = {
            ...vuepress_utils_1.getLocale(lang),
            ...themeConfig.locales[path],
        };
    });
};
const resolveThemeConfig = (themeConfig) => {
    const { baseLang = "en-US" } = themeConfig;
    // throw error when meeting an unsupported language
    if (!vuepress_utils_1.checkLang(baseLang))
        throw new Error("Base lang not supported. Make a PR to https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages//shared/shared/i18n.json first!");
    setThemeLocales(themeConfig, baseLang);
    if (themeConfig.encrypt)
        encrypt_1.resolveEncrypt(themeConfig.encrypt);
};
exports.resolveThemeConfig = resolveThemeConfig;
