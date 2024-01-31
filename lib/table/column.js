export class Column {
    constructor() {
        Object.defineProperty(this, "opts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    static from(options) {
        const column = new Column();
        column.opts = { ...options };
        return column;
    }
    options(options) {
        Object.assign(this.opts, options);
        return this;
    }
    minWidth(width) {
        this.opts.minWidth = width;
        return this;
    }
    maxWidth(width) {
        this.opts.maxWidth = width;
        return this;
    }
    border(border = true) {
        this.opts.border = border;
        return this;
    }
    padding(padding) {
        this.opts.padding = padding;
        return this;
    }
    align(direction) {
        this.opts.align = direction;
        return this;
    }
    getMinWidth() {
        return this.opts.minWidth;
    }
    getMaxWidth() {
        return this.opts.maxWidth;
    }
    getBorder() {
        return this.opts.border;
    }
    getPadding() {
        return this.opts.padding;
    }
    getAlign() {
        return this.opts.align;
    }
}
