"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@theia/core"));
const Badge_1 = require("./ui/Badge");
const icons_react_1 = require("@tabler/icons-react");
const Button_1 = __importDefault(require("./Button"));
const clsx_1 = require("../utils/clsx");
const MediaPlayer = ({ type, source }) => {
    return (core_1.default.createElement("div", { className: "media-player" },
        core_1.default.createElement("div", { className: (0, clsx_1.cn)(type === "image" ? "border-b mb-2" : "border-t  my-2  border-b", "flex items-center py-2.5 px-2 dark:border-zinc-800 border-zinc-200 justify-between") },
            core_1.default.createElement(Badge_1.Badge, { variant: "destructive" }, "NTV"),
            core_1.default.createElement("div", { className: "flex items-center gap-[5px]" },
                core_1.default.createElement(Button_1.default, { label: "Mark" }),
                core_1.default.createElement(Button_1.default, { label: "1" }),
                core_1.default.createElement(Button_1.default, { icon: core_1.default.createElement(icons_react_1.IconSettings, { size: 14, stroke: 2, strokeLinejoin: "miter" }) })),
            " "),
        type === "image" ? (core_1.default.createElement("img", { src: source, alt: "Media content", className: "w-full h-[25vh]" })) : (core_1.default.createElement("iframe", { width: "100%", height: "315", src: `https://www.youtube.com/embed/${source}`, title: "YouTube video player", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }))));
};
exports.default = MediaPlayer;
//# sourceMappingURL=MediaPlayer.js.map