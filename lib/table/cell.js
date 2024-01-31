/** Cell representation. */
export class Cell {
    /** Get cell length. */
    get length() {
        return this.toString().length;
    }
    /**
     * Create a new cell. If value is a cell, the value and all options of the cell
     * will be copied to the new cell.
     * @param value Cell or cell value.
     */
    static from(value) {
        const cell = new this(value);
        if (value instanceof Cell) {
            cell.options = { ...value.options };
        }
        return cell;
    }
    /**
     * Cell constructor.
     * @param value Cell value.
     */
    constructor(value) {
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    /** Get cell value. */
    toString() {
        return this.value.toString();
    }
    /**
     * Set cell value.
     * @param value Cell or cell value.
     */
    setValue(value) {
        this.value = value;
        return this;
    }
    /**
     * Clone cell with all options.
     * @param value Cell or cell value.
     */
    clone(value) {
        const cell = new Cell(value ?? this);
        cell.options = { ...this.options };
        return cell;
    }
    /**
     * Setter:
     */
    /**
     * Enable/disable cell border.
     * @param enable    Enable/disable cell border.
     * @param override  Override existing value.
     */
    border(enable = true, override = true) {
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    }
    /**
     * Set col span.
     * @param span      Number of cols to span.
     * @param override  Override existing value.
     */
    colSpan(span, override = true) {
        if (override || typeof this.options.colSpan === "undefined") {
            this.options.colSpan = span;
        }
        return this;
    }
    /**
     * Set row span.
     * @param span      Number of rows to span.
     * @param override  Override existing value.
     */
    rowSpan(span, override = true) {
        if (override || typeof this.options.rowSpan === "undefined") {
            this.options.rowSpan = span;
        }
        return this;
    }
    /**
     * Align cell content.
     * @param direction Align direction.
     * @param override  Override existing value.
     */
    align(direction, override = true) {
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    }
    /**
     * Getter:
     */
    /** Check if cell has border. */
    getBorder() {
        return this.options.border === true;
    }
    /** Get col span. */
    getColSpan() {
        return typeof this.options.colSpan === "number" && this.options.colSpan > 0
            ? this.options.colSpan
            : 1;
    }
    /** Get row span. */
    getRowSpan() {
        return typeof this.options.rowSpan === "number" && this.options.rowSpan > 0
            ? this.options.rowSpan
            : 1;
    }
    /** Get row span. */
    getAlign() {
        return this.options.align ?? "left";
    }
}
