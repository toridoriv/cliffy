/** Cell type */
export type ICell = number | string | String | Cell;
export type Direction = "left" | "right" | "center";
/** Cell options. */
export interface ICellOptions {
    border?: boolean;
    colSpan?: number;
    rowSpan?: number;
    align?: Direction;
}
/** Cell representation. */
export declare class Cell {
    private value;
    protected options: ICellOptions;
    /** Get cell length. */
    get length(): number;
    /**
     * Create a new cell. If value is a cell, the value and all options of the cell
     * will be copied to the new cell.
     * @param value Cell or cell value.
     */
    static from(value: ICell): Cell;
    /**
     * Cell constructor.
     * @param value Cell value.
     */
    constructor(value: ICell);
    /** Get cell value. */
    toString(): string;
    /**
     * Set cell value.
     * @param value Cell or cell value.
     */
    setValue(value: ICell): this;
    /**
     * Clone cell with all options.
     * @param value Cell or cell value.
     */
    clone(value?: ICell): Cell;
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
     * Set col span.
     * @param span      Number of cols to span.
     * @param override  Override existing value.
     */
    colSpan(span: number, override?: boolean): this;
    /**
     * Set row span.
     * @param span      Number of rows to span.
     * @param override  Override existing value.
     */
    rowSpan(span: number, override?: boolean): this;
    /**
     * Align cell content.
     * @param direction Align direction.
     * @param override  Override existing value.
     */
    align(direction: Direction, override?: boolean): this;
    /**
     * Getter:
     */
    /** Check if cell has border. */
    getBorder(): boolean;
    /** Get col span. */
    getColSpan(): number;
    /** Get row span. */
    getRowSpan(): number;
    /** Get row span. */
    getAlign(): Direction;
}
