"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eject = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const chalk = require("chalk");
const EXCLUDED_FILES = [
    "__tests__",
    ".npmignore",
    "test",
    "LICENSE",
    "package.json",
    "node_modules",
    "README.md",
    "readme.md",
];
const eject = async (dir) => {
    try {
        const sourceDir = path_1.resolve(__dirname, "../");
        const targetDir = path_1.resolve(path_1.resolve(dir), ".vuepress/theme");
        await fs_extra_1.copy(sourceDir, targetDir, {
            filter: (src) => {
                return !EXCLUDED_FILES.includes(path_1.relative(sourceDir, src));
            },
        });
        console.log(`Copied vuepress-theme-hope into ${chalk.cyan(targetDir)}.\n`);
    }
    catch (err) {
        console.error(chalk.red(err.stack || ""));
        process.exitCode = 1;
    }
};
exports.eject = eject;
