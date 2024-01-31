/**
 * Get next words from the beginning of [content] until all words have a length lower or equal then [length].
 *
 * @param length    Max length of all words.
 * @param content   The text content.
 */
import { ICell } from "./cell.js";
export declare function consumeWords(length: number, content: string): string;
/**
 * Get longest cell from given row index.
 */
export declare function longest(index: number, rows: ICell[][], maxWidth?: number): number;
export declare const strLength: (str: string) => number;
