import Vue from "vue";
import { SidebarAutoItem, SidebarGroupItem } from "@theme/util/sidebar";
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getIcon(icon: string | undefined): string;
    isActive: (route: import("vue-router").Route, path: string) => boolean;
}, unknown, {
    item: SidebarAutoItem | SidebarGroupItem;
    open: boolean;
    depth: number;
}>;
export default _default;
