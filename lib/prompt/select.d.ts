import { GenericList, GenericListKeys, GenericListOption, GenericListOptions, GenericListOptionSettings, GenericListSettings } from "./_generic_list.js";
/** Select prompt options. */
export interface SelectOptions extends GenericListOptions<string, string> {
    options: Array<string | SelectOption>;
    keys?: SelectKeys;
}
/** Select prompt settings. */
export interface SelectSettings extends GenericListSettings<string, string> {
    options: Array<SelectOptionSettings>;
    keys?: SelectKeys;
}
/** Select option options. */
export type SelectOption = GenericListOption;
/** Select option settings. */
export type SelectOptionSettings = GenericListOptionSettings;
/** Select key options. */
export type SelectKeys = GenericListKeys;
/** Select prompt representation. */
export declare class Select extends GenericList<string, string> {
    protected readonly settings: SelectSettings;
    protected options: Array<SelectOptionSettings>;
    protected listIndex: number;
    protected listOffset: number;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: SelectOptions): Promise<string>;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value: string): void;
    constructor(options: SelectOptions);
    protected getDefaultSettings(options: SelectOptions): SelectSettings;
    protected input(): string;
    /**
     * Render select option.
     * @param item        Select option settings.
     * @param isSelected  Set to true if option is selected.
     */
    protected getListItem(item: SelectOptionSettings, isSelected?: boolean): string;
    /** Get value of selected option. */
    protected getValue(): string;
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    protected validate(value: string): boolean | string;
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    protected transform(value: string): string;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: string): string;
}
/**
 * Select options type.
 * @deprecated Use `Array<string | SelectOption>` instead.
 */
export type SelectValueOptions = Array<string | SelectOption>;
/**
 * Select option settings type.
 * @deprecated Use `Array<SelectOptionSettings>` instead.
 */
export type SelectValueSettings = Array<SelectOptionSettings>;
