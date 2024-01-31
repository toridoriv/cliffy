import type { KeyCode } from "../keycode/mod.js";
import { GenericList, GenericListKeys, GenericListOption, GenericListOptions, GenericListOptionSettings, GenericListSettings } from "./_generic_list.js";
/** Checkbox prompt options. */
export interface CheckboxOptions extends GenericListOptions<Array<string>, Array<string>> {
    options: Array<string | CheckboxOption>;
    check?: string;
    uncheck?: string;
    minOptions?: number;
    maxOptions?: number;
    keys?: CheckboxKeys;
}
/** Checkbox prompt settings. */
interface CheckboxSettings extends GenericListSettings<Array<string>, Array<string>> {
    options: Array<CheckboxOptionSettings>;
    check: string;
    uncheck: string;
    minOptions: number;
    maxOptions: number;
    keys?: CheckboxKeys;
}
/** Checkbox option options. */
export interface CheckboxOption extends GenericListOption {
    checked?: boolean;
    icon?: boolean;
}
/** Checkbox option settings. */
export interface CheckboxOptionSettings extends GenericListOptionSettings {
    checked: boolean;
    icon: boolean;
}
/** Checkbox key options. */
export interface CheckboxKeys extends GenericListKeys {
    check?: Array<string>;
}
/** Checkbox prompt representation. */
export declare class Checkbox extends GenericList<Array<string>, Array<string>> {
    protected readonly settings: CheckboxSettings;
    protected options: Array<CheckboxOptionSettings>;
    protected listIndex: number;
    protected listOffset: number;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: CheckboxOptions): Promise<Array<string>>;
    /**
     * Create list separator.
     * @param label Separator label.
     */
    static separator(label?: string): CheckboxOption;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Array of input values.
     */
    static inject(value: Array<string>): void;
    constructor(options: CheckboxOptions);
    protected getDefaultSettings(options: CheckboxOptions): CheckboxSettings;
    /**
     * Map string option values to options and set option defaults.
     * @param options Checkbox options.
     */
    protected mapOptions(options: CheckboxOptions): Array<CheckboxOptionSettings>;
    /**
     * Set list option defaults.
     * @param option List option.
     */
    protected mapOption(options: CheckboxOptions, option: CheckboxOption): CheckboxOptionSettings;
    /**
     * Render checkbox option.
     * @param item        Checkbox option settings.
     * @param isSelected  Set to true if option is selected.
     */
    protected getListItem(item: CheckboxOptionSettings, isSelected?: boolean): string;
    /** Get value of checked options. */
    protected getValue(): Array<string>;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    /** Check selected option. */
    protected checkValue(): void;
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    protected validate(value: Array<string>): boolean | string;
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    protected transform(value: Array<string>): Array<string>;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: Array<string>): string;
}
/**
 * Checkbox options type.
 * @deprecated Use `Array<string | CheckboxOption>` instead.
 */
export type CheckboxValueOptions = Array<string | CheckboxOption>;
/**
 * Checkbox option settings type.
 * @deprecated Use `Array<CheckboxOptionSettings>` instead.
 */
export type CheckboxValueSettings = Array<CheckboxOptionSettings>;
export {};
