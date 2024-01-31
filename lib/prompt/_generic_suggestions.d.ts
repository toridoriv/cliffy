import type { KeyCode } from "../keycode/key_code.js";
import { GenericInput, GenericInputKeys, GenericInputPromptOptions, GenericInputPromptSettings } from "./_generic_input.js";
/** Generic input prompt options. */
export interface GenericSuggestionsOptions<TValue, TRawValue> extends GenericInputPromptOptions<TValue, TRawValue> {
    keys?: GenericSuggestionsKeys;
    id?: string;
    suggestions?: Array<string | number> | SuggestionHandler;
    complete?: CompleteHandler;
    files?: boolean | RegExp;
    list?: boolean;
    info?: boolean;
    listPointer?: string;
    maxRows?: number;
}
/** Generic input prompt settings. */
export interface GenericSuggestionsSettings<TValue, TRawValue> extends GenericInputPromptSettings<TValue, TRawValue> {
    keys?: GenericSuggestionsKeys;
    id?: string;
    suggestions?: Array<string | number> | SuggestionHandler;
    complete?: CompleteHandler;
    files?: boolean | RegExp;
    list?: boolean;
    info?: boolean;
    listPointer: string;
    maxRows: number;
}
/** Input keys options. */
export interface GenericSuggestionsKeys extends GenericInputKeys {
    complete?: string[];
    next?: string[];
    previous?: string[];
    nextPage?: string[];
    previousPage?: string[];
}
export type SuggestionHandler = (input: string) => Array<string | number> | Promise<Array<string | number>>;
export type CompleteHandler = (input: string, suggestion?: string) => Promise<string> | string;
interface LocalStorage {
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}
/** Generic input prompt representation. */
export declare abstract class GenericSuggestions<TValue, TRawValue> extends GenericInput<TValue, TRawValue> {
    #private;
    protected abstract readonly settings: GenericSuggestionsSettings<TValue, TRawValue>;
    protected suggestionsIndex: number;
    protected suggestionsOffset: number;
    protected suggestions: Array<string | number>;
    protected getDefaultSettings(options: GenericSuggestionsOptions<TValue, TRawValue>): GenericSuggestionsSettings<TValue, TRawValue>;
    protected get localStorage(): LocalStorage | null;
    protected loadSuggestions(): Array<string | number>;
    protected saveSuggestions(...suggestions: Array<string | number>): void;
    protected render(): Promise<void>;
    protected match(): Promise<void>;
    protected input(): string;
    protected getSuggestion(): string;
    protected getUserSuggestions(input: string): Promise<Array<string | number>>;
    protected getFileSuggestions(input: string): Promise<Array<string | number>>;
    protected getSuggestions(): Promise<Array<string | number>>;
    protected body(): string | Promise<string>;
    protected getInfo(): string;
    protected getList(): string;
    /**
     * Render option.
     * @param value        Option.
     * @param isSelected  Set to true if option is selected.
     */
    protected getListItem(value: string | number, isSelected?: boolean): string;
    /** Get suggestions row height. */
    protected getListHeight(suggestions?: Array<string | number>): number;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    /** Delete char right. */
    protected deleteCharRight(): void;
    protected complete(): Promise<string>;
    /** Select previous suggestion. */
    protected selectPreviousSuggestion(): void;
    /** Select next suggestion. */
    protected selectNextSuggestion(): void;
    /** Select previous suggestions page. */
    protected selectPreviousSuggestionsPage(): void;
    /** Select next suggestions page. */
    protected selectNextSuggestionsPage(): void;
}
export {};
