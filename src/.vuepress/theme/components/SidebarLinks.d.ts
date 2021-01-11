import Vue from "vue";
import { SidebarItem } from "@theme/util/sidebar";
import { PageComputed } from "@mr-hope/vuepress-types";
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    openGroupIndex: number;
}, {
    refreshIndex(): void;
    toggleGroup(index: number): void;
    isActive(page: PageComputed): boolean;
}, unknown, {
    items: SidebarItem[];
    depth: number;
}>;
export default _default;
