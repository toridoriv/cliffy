import { Direction } from "./cell.js";
export interface ColumnOptions {
    border?: boolean;
    align?: Direction;
    minWidth?: number;
    maxWidth?: number;
    padding?: number;
}
export declare class Column {
    static from(options: ColumnOptions): Column;
    protected opts: ColumnOptions;
    options(options: ColumnOptions): this;
    minWidth(width: number): this;
    maxWidth(width: number): this;
    border(border?: boolean): this;
    padding(padding: number): this;
    align(direction: Direction): this;
    getMinWidth(): number | undefined;
    getMaxWidth(): number | undefined;
    getBorder(): boolean | undefined;
    getPadding(): number | undefined;
    getAlign(): Direction | undefined;
}
