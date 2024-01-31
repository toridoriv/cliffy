import { Cell, type ICell } from "./cell.js";
import { type IRow, Row } from "./row.js";
import type { ITableSettings, Table } from "./table.js";
/** Layout render settings. */
interface IRenderSettings {
    padding: number[];
    width: number[];
    columns: number;
    hasBorder: boolean;
    hasHeaderBorder: boolean;
    hasBodyBorder: boolean;
    rows: Row<Cell>[];
}
/** Table layout renderer. */
export declare class TableLayout {
    #private;
    private table;
    private options;
    /**
     * Table layout constructor.
     * @param table   Table instance.
     * @param options Render options.
     */
    constructor(table: Table, options: ITableSettings);
    /** Generate table string. */
    toString(): string;
    /**
     * Generates table layout including row and col span, converts all none
     * Cell/Row values to Cells and Rows and returns the layout rendering
     * settings.
     */
    protected createLayout(): IRenderSettings;
    /**
     * Fills rows and cols by specified row/col span with a reference of the
     * original cell.
     */
    protected spanRows(rows: Array<IRow>): Row<Cell>[];
    protected getDeleteCount(rows: Array<Array<unknown>>, rowIndex: number, colIndex: number): 1 | 0;
    /**
     * Create a new row from existing row or cell array.
     * @param row Original row.
     */
    protected createRow(row: IRow): Row<Cell>;
    /**
     * Create a new cell from existing cell or cell value.
     * @param cell  Original cell.
     * @param row   Parent row.
     */
    protected createCell(cell: ICell | null | undefined, row: Row, colIndex: number): Cell;
    /**
     * Render table layout.
     * @param opts Render options.
     */
    protected renderRows(opts: IRenderSettings): string;
    /**
     * Render row.
     * @param rowSpan     Current row span.
     * @param rowIndex    Current row index.
     * @param opts        Render options.
     * @param isMultiline Is multiline row.
     */
    protected renderRow(rowSpan: number[], rowIndex: number, opts: IRenderSettings, isMultiline?: boolean): string;
    /**
     * Render cell.
     * @param colIndex  Current col index.
     * @param row       Current row.
     * @param opts      Render options.
     * @param noBorder  Disable border.
     */
    protected renderCell(colIndex: number, row: Row<Cell>, opts: IRenderSettings, noBorder?: boolean): string;
    /**
     * Render specified length of cell. Returns the rendered value and a new cell
     * with the rest value.
     * @param cell      Cell to render.
     * @param maxLength Max length of content to render.
     */
    protected renderCellValue(cell: Cell, maxLength: number): {
        current: string;
        next: Cell;
    };
    /**
     * Render border row.
     * @param prevRow Previous row.
     * @param nextRow Next row.
     * @param rowSpan Current row span.
     * @param opts    Render options.
     */
    protected renderBorderRow(prevRow: Row<Cell> | undefined, nextRow: Row<Cell> | undefined, rowSpan: number[], opts: IRenderSettings): string;
    /**
     * Render border cell.
     * @param colIndex  Current index.
     * @param prevRow   Previous row.
     * @param nextRow   Next row.
     * @param rowSpan   Current row span.
     * @param opts      Render options.
     */
    protected renderBorderCell(colIndex: number, prevRow: Row<Cell> | undefined, nextRow: Row<Cell> | undefined, rowSpan: number[], opts: IRenderSettings): string;
}
export {};
