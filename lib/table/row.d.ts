import { Direction, ICell } from "./cell.js";
/** Row type */
export type IRow<T extends ICell | undefined = ICell | undefined> = T[] | Row<T>;
/** Json row. */
export type IDataRow = Record<string, string | number>;
/** Row options. */
export interface IRowOptions {
    indent?: number;
    border?: boolean;
    align?: Direction;
}
/**
 * Row representation.
 */
export declare class Row<T extends ICell | undefined = ICell | undefined> extends Array<T> {
    protected options: IRowOptions;
    /**
     * Create a new row. If cells is a row, all cells and options of the row will
     * be copied to the new row.
     * @param cells Cells or row.
     */
    static from<T extends ICell | undefined>(cells: IRow<T>): Row<T>;
    /** Clone row recursively with all options. */
    clone(): Row;
    /**
     * Setter:
     */
    /**
     * Enable/disable cell border.
     * @param enable    Enable/disable cell border.
     * @param override  Override existing value.
     */
    border(enable?: boolean, override?: boolean): this;
    /**
     * Align row content.
     * @param direction Align direction.
     * @param override  Override existing value.
     */
    align(direction: Direction, override?: boolean): this;
    /**
     * Getter:
     */
    /** Check if row has border. */
    getBorder(): boolean;
    /** Check if row or any child cell has border. */
    hasBorder(): boolean;
    /** Get row alignment. */
    getAlign(): Direction;
}
