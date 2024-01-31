import { GenericSuggestions, GenericSuggestionsKeys, GenericSuggestionsOptions, GenericSuggestionsSettings } from "./_generic_suggestions.js";
/** List prompt options. */
export interface ListOptions extends GenericSuggestionsOptions<string[], string> {
    separator?: string;
    minLength?: number;
    maxLength?: number;
    minTags?: number;
    maxTags?: number;
    keys?: ListKeys;
}
/** List prompt settings. */
interface ListSettings extends GenericSuggestionsSettings<string[], string> {
    separator: string;
    minLength: number;
    maxLength: number;
    minTags: number;
    maxTags: number;
    keys?: ListKeys;
}
/** List key options. */
export type ListKeys = GenericSuggestionsKeys;
/** List prompt representation. */
export declare class List extends GenericSuggestions<string[], string> {
    protected readonly settings: ListSettings;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: string | ListOptions): Promise<string[]>;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value: string): void;
    constructor(options: string | ListOptions);
    protected getDefaultSettings(options: ListOptions): ListSettings;
    protected input(): string;
    protected getTags(value?: string): Array<string>;
    /** Create list regex.*/
    protected regexp(): RegExp;
    protected success(value: string[]): string | undefined;
    /** Get input value. */
    protected getValue(): string;
    protected getCurrentInputValue(): string;
    /** Add char. */
    protected addChar(char: string): void;
    /** Delete char left. */
    protected deleteChar(): void;
    protected complete(): Promise<string>;
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
    protected transform(value: string): string[];
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: string[]): string;
}
export {};
