import { GenericSuggestions, GenericSuggestionsKeys, GenericSuggestionsOptions, GenericSuggestionsSettings } from "./_generic_suggestions.js";
type UnsupportedOptions = "files" | "complete" | "suggestions" | "list" | "info";
/** Confirm prompt options. */
export interface ConfirmOptions extends Omit<GenericSuggestionsOptions<boolean, string>, UnsupportedOptions> {
    active?: string;
    inactive?: string;
    keys?: ConfirmKeys;
}
/** Confirm prompt settings. */
interface ConfirmSettings extends GenericSuggestionsSettings<boolean, string> {
    active: string;
    inactive: string;
    keys?: ConfirmKeys;
}
export type ConfirmKeys = GenericSuggestionsKeys;
/** Confirm prompt representation. */
export declare class Confirm extends GenericSuggestions<boolean, string> {
    protected readonly settings: ConfirmSettings;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: string | ConfirmOptions): Promise<boolean>;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value: string): void;
    constructor(options: string | ConfirmOptions);
    protected getDefaultSettings(options: ConfirmOptions): ConfirmSettings;
    protected defaults(): string;
    protected success(value: boolean): string | undefined;
    /** Get input input. */
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
    protected transform(value: string): boolean | undefined;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: boolean): string;
}
export {};
