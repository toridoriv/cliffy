import type { KeyCode } from "../keycode/key_code.js";
import { GenericInput, GenericInputKeys, GenericInputPromptOptions, GenericInputPromptSettings } from "./_generic_input.js";
type UnsupportedInputOptions = "suggestions" | "list";
/** Generic list prompt options. */
export interface GenericListOptions<TValue, TRawValue> extends Omit<GenericInputPromptOptions<TValue, TRawValue>, UnsupportedInputOptions> {
    options: Array<string | GenericListOption>;
    keys?: GenericListKeys;
    indent?: string;
    listPointer?: string;
    searchIcon?: string;
    maxRows?: number;
    searchLabel?: string;
    search?: boolean;
    info?: boolean;
}
/** Generic list prompt settings. */
export interface GenericListSettings<TValue, TRawValue> extends GenericInputPromptSettings<TValue, TRawValue> {
    options: Array<GenericListOptionSettings>;
    keys?: GenericListKeys;
    indent: string;
    listPointer: string;
    maxRows: number;
    searchLabel: string;
    search?: boolean;
    info?: boolean;
}
/** Generic list option options. */
export interface GenericListOption {
    value: string;
    name?: string;
    disabled?: boolean;
}
/** Generic list option settings. */
export interface GenericListOptionSettings extends GenericListOption {
    name: string;
    value: string;
    disabled: boolean;
}
/** Select key options. */
export interface GenericListKeys extends GenericInputKeys {
    previous?: string[];
    next?: string[];
    previousPage?: string[];
    nextPage?: string[];
}
/** Generic list prompt representation. */
export declare abstract class GenericList<TValue, TRawValue> extends GenericInput<TValue, TRawValue> {
    protected abstract readonly settings: GenericListSettings<TValue, TRawValue>;
    protected abstract options: Array<GenericListOptionSettings>;
    protected abstract listIndex: number;
    protected abstract listOffset: number;
    /**
     * Create list separator.
     * @param label Separator label.
     */
    static separator(label?: string): GenericListOption;
    protected getDefaultSettings(options: GenericListOptions<TValue, TRawValue>): GenericListSettings<TValue, TRawValue>;
    protected mapOptions<TOption extends GenericListOption>(options: GenericListOptions<TValue, TRawValue> & {
        options: Array<string | TOption>;
    }): Array<TOption | {
        value: string;
    }>;
    /**
     * Set list option defaults.
     * @param option List option.
     */
    protected mapOption(_options: GenericListOptions<TValue, TRawValue>, option: GenericListOption): GenericListOptionSettings;
    protected match(): void;
    protected message(): string;
    /** Render options. */
    protected body(): string | Promise<string>;
    protected getInfo(): string;
    /** Render options list. */
    protected getList(): string;
    /**
     * Render option.
     * @param item        Option.
     * @param isSelected  Set to true if option is selected.
     */
    protected abstract getListItem(item: GenericListOptionSettings, isSelected?: boolean): string;
    /** Get options row height. */
    protected getListHeight(): number;
    protected getListIndex(value?: string): number;
    protected getPageOffset(index: number): number;
    /**
     * Find option by value.
     * @param value Value of the option.
     */
    protected getOptionByValue(value: string): GenericListOptionSettings | undefined;
    /** Read user input. */
    protected read(): Promise<boolean>;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    protected moveCursorLeft(): void;
    protected moveCursorRight(): void;
    protected deleteChar(): void;
    protected deleteCharRight(): void;
    protected addChar(char: string): void;
    /** Select previous option. */
    protected selectPrevious(): void;
    /** Select next option. */
    protected selectNext(): void;
    /** Select previous page. */
    protected selectPreviousPage(): void;
    /** Select next page. */
    protected selectNextPage(): void;
}
/** @deprecated Use `Array<string | GenericListOption>` instead. */
export type GenericListValueOptions = Array<string | GenericListOption>;
/** @deprecated Use `Array<GenericListOptionSettings>` instead. */
export type GenericListValueSettings = Array<GenericListOptionSettings>;
export {};
