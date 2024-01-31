import * as dntShim from "../_dnt.shims.js";
const main = {
    ARROW_UP: "↑",
    ARROW_DOWN: "↓",
    ARROW_LEFT: "←",
    ARROW_RIGHT: "→",
    ARROW_UP_LEFT: "↖",
    ARROW_UP_RIGHT: "↗",
    ARROW_DOWN_RIGHT: "↘",
    ARROW_DOWN_LEFT: "↙",
    RADIO_ON: "◉",
    RADIO_OFF: "◯",
    TICK: "✔",
    CROSS: "✘",
    ELLIPSIS: "…",
    POINTER_SMALL: "›",
    LINE: "─",
    POINTER: "❯",
    INFO: "ℹ",
    TAB_LEFT: "⇤",
    TAB_RIGHT: "⇥",
    ESCAPE: "⎋",
    BACKSPACE: "⌫",
    PAGE_UP: "⇞",
    PAGE_DOWN: "⇟",
    ENTER: "↵",
    SEARCH: "⌕",
};
const win = {
    ...main,
    RADIO_ON: "(*)",
    RADIO_OFF: "( )",
    TICK: "√",
    CROSS: "×",
    POINTER_SMALL: "»",
};
/** Prompt icons. */
export const Figures = dntShim.Deno.build.os === "windows" ? win : main;
const keyMap = {
    up: "ARROW_UP",
    down: "ARROW_DOWN",
    left: "ARROW_LEFT",
    right: "ARROW_RIGHT",
    pageup: "PAGE_UP",
    pagedown: "PAGE_DOWN",
    tab: "TAB_RIGHT",
    enter: "ENTER",
    return: "ENTER",
};
export function getFiguresByKeys(keys) {
    const figures = [];
    for (const key of keys) {
        const figure = Figures[keyMap[key]] ?? key;
        if (!figures.includes(figure)) {
            figures.push(figure);
        }
    }
    return figures;
}
