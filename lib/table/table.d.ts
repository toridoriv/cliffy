import { IBorder } from "./border.js";
import { Direction } from "./cell.js";
import { Column, ColumnOptions } from "./column.js";
import { IDataRow, IRow, Row } from "./row.js";
/** Border characters settings. */
export type IBorderOptions = Partial<IBorder>;
/** Table options. */
export interface ITableOptions {
    indent?: number;
    border?: boolean;
    align?: Direction;
    maxColWidth?: number | number[];
    minColWidth?: number | number[];
    padding?: number | number[];
    chars?: IBorderOptions;
}
/** Table settings. */
export interface ITableSettings extends Required<Omit<ITableOptions, "align">> {
    chars: IBorder;
    align?: Direction;
    columns: Array<Column>;
}
/** Table type. */
export type ITable<T extends IRow = IRow> = T[] | Table<T>;
/** Table representation. */
export declare class Table<T extends IRow = IRow> extends Array<T> {
    protected static _chars: IBorder;
    protected options: ITableSettings;
    private headerRow?;
    /**
     * Create a new table. If rows is a table, all rows and options of the table
     * will be copied to the new table.
     * @param rows
     */
    static from<T extends IRow>(rows: ITable<T>): Table<T>;
    /**
     * Create a new table from an array of json objects. An object represents a
     * row and each property a column.
     * @param rows Array of objects.
     */
    static fromJson(rows: IDataRow[]): Table;
    /**
     * Set global default border characters.
     * @param chars Border options.
     */
    static chars(chars: IBorderOptions): typeof Table;
    /**
     * Write table or rows to stdout.
     * @param rows Table or rows.
     */
    static render<T extends IRow>(rows: ITable<T>): void;
    /**
     * Read data from an array of json objects. An object represents a
     * row and each property a column.
     * @param rows Array of objects.
     */
    fromJson(rows: IDataRow[]): this;
    columns(columns: Array<Column | ColumnOptions>): this;
    column(index: number, column: Column | ColumnOptions): this;
    /**
     * Set table header.
     * @param header Header row or cells.
     */
    header(header: IRow): this;
    /**
     * Set table body.
     * @param rows Table rows.
     */
    body(rows: T[]): this;
    /** Clone table recursively with header and options. */
    clone(): Table;
    /** Generate table string. */
    toString(): string;
    /** Write table to stdout. */
    render(): this;
    /**
     * Set max col with.
     * @param width     Max col width.
     * @param override  Override existing value.
     */
    maxColWidth(width: number | number[], override?: boolean): this;
    /**
     * Set min col width.
     * @param width     Min col width.
     * @param override  Override existing value.
     */
    minColWidth(width: number | number[], override?: boolean): this;
    /**
     * Set table indentation.
     * @param width     Indent width.
     * @param override  Override existing value.
     */
    indent(width: number, override?: boolean): this;
    /**
     * Set cell padding.
     * @param padding   Cell padding.
     * @param override  Override existing value.
     */
    padding(padding: number | number[], override?: boolean): this;
    /**
     * Enable/disable cell border.
     * @param enable    Enable/disable cell border.
     * @param override  Override existing value.
     */
    border(enable?: boolean, override?: boolean): this;
    /**
     * Align table content.
     * @param direction Align direction.
     * @param override  Override existing value.
     */
    align(direction: Direction, override?: boolean): this;
    /**
     * Set border characters.
     * @param chars Border options.
     */
    chars(chars: IBorderOptions): this;
    /** Get table header. */
    getHeader(): Row | undefined;
    /** Get table body. */
    getBody(): T[];
    /** Get mac col widrth. */
    getMaxColWidth(): number | number[];
    /** Get min col width. */
    getMinColWidth(): number | number[];
    /** Get table indentation. */
    getIndent(): number;
    /** Get cell padding. */
    getPadding(): number | number[];
    /** Check if table has border. */
    getBorder(): boolean;
    /** Check if header row has border. */
    hasHeaderBorder(): boolean;
    /** Check if table bordy has border. */
    hasBodyBorder(): boolean;
    /** Check if table header or body has border. */
    hasBorder(): boolean;
    /** Get table alignment. */
    getAlign(): Direction;
    getColumns(): Array<Column>;
    getColumn(index: number): Column;
}
