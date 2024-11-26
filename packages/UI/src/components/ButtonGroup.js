"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@theia/core"));
const Button_1 = __importDefault(require("./Button")); // Adjust the import path as necessary
const icons_react_1 = require("@tabler/icons-react");
const ButtonGroup = ({ buttons }) => {
    return (core_1.default.createElement("div", { className: "flex items-center gap-[10px] p-1" }, buttons.map((button, index) => (core_1.default.createElement(Button_1.default, { key: index, size: "icon", className: button.className, icon: button.icon, label: button.label })))));
};
const buttonGroups = [
    [
        {
            icon: core_1.default.createElement(icons_react_1.IconMicrophone, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconPhoto, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconMapPin, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
        },
    ],
    [
        {
            icon: core_1.default.createElement(icons_react_1.IconMicrophone, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconPhoto, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconMapPin, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
        },
    ],
    [
        {
            icon: core_1.default.createElement(icons_react_1.IconMicrophone, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconPhoto, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconMapPin, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconVideo, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-fuchsia-700 rounded-lg bg-fuchsia-400 hover:bg-fuchsia-500 dark:hover:bg-fuchsia-600",
        },
    ],
    [
        {
            label: "Mark",
        },
    ],
    [
        {
            icon: core_1.default.createElement(icons_react_1.IconVideo, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-zinc-900 rounded-lg bg-zinc-300 hover:bg-zinc-400 dark:hover:bg-zinc-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconMicrophone, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconPhoto, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconMapPin, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-700",
        },
    ],
    [
        {
            icon: core_1.default.createElement(icons_react_1.IconMicrophone, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-orange-900 rounded-lg bg-orange-400 hover:bg-orange-500 dark:hover:bg-orange-800",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconPhoto, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-indigo-800 rounded-lg bg-indigo-300 hover:bg-indigo-400 dark:hover:bg-indigo-700",
        },
        {
            icon: core_1.default.createElement(icons_react_1.IconMapPin, { size: 12, stroke: 2, strokeLinejoin: "miter" }),
            className: "dark:bg-emerald-800 rounded-lg bg-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-800",
        },
    ],
];
const ButtonGroups = () => {
    return (core_1.default.createElement("div", { className: "flex items-center justify-center gap-x-10" }, buttonGroups.map((buttons, index) => (core_1.default.createElement(ButtonGroup, { key: index, buttons: buttons })))));
};
exports.default = ButtonGroups;
//# sourceMappingURL=ButtonGroup.js.map