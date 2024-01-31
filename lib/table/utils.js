/**
 * Get next words from the beginning of [content] until all words have a length lower or equal then [length].
 *
 * @param length    Max length of all words.
 * @param content   The text content.
 */
import { Cell } from "./cell.js";
import { stripColor } from "./deps.js";
export function consumeWords(length, content) {
    let consumed = "";
    const words = content.split("\n")[0]?.split(/ /g);
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        // consume minimum one word
        if (consumed) {
            const nextLength = strLength(word);
            const consumedLength = strLength(consumed);
            if (consumedLength + nextLength >= length) {
                break;
            }
        }
        consumed += (i > 0 ? " " : "") + word;
    }
    return consumed;
}
/**
 * Get longest cell from given row index.
 */
export function longest(index, rows, maxWidth) {
    const cellLengths = rows.map((row) => {
        const cell = row[index];
        const cellValue = cell instanceof Cell && cell.getColSpan() > 1
            ? ""
            : cell?.toString() || "";
        return cellValue
            .split("\n")
            .map((line) => {
            const str = typeof maxWidth === "undefined"
                ? line
                : consumeWords(maxWidth, line);
            return strLength(str) || 0;
        });
    }).flat();
    return Math.max(...cellLengths);
}
export const strLength = (str) => {
    str = stripColor(str);
    let length = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (
        // chinese characters: \u4e00 - \u9fa5
        (charCode >= 19968 && charCode <= 40869) ||
            // japanese characters \u3040 - \u30ff
            (charCode >= 12352 && charCode <= 12543) ||
            // full width characters \uff00 - \uffef
            (charCode >= 65280 && charCode <= 65519) ||
            // cjk symbol and punctuation characters \u3000 - \u303f
            (charCode >= 12288 && charCode <= 12351)) {
            length += 2;
        }
        else {
            length += 1;
        }
    }
    return length;
};
