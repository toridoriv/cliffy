import type { KeyCode } from "../keycode/key_code.js";
import { GenericSuggestions, GenericSuggestionsKeys, GenericSuggestionsOptions, GenericSuggestionsSettings } from "./_generic_suggestions.js";
type UnsupportedOptions = "files";
/** Number prompt options. */
export interface NumberOptions extends Omit<GenericSuggestionsOptions<number, string>, UnsupportedOptions> {
    min?: number;
    max?: number;
    float?: boolean;
    round?: number;
    keys?: NumberKeys;
}
/** Number prompt settings. */
interface NumberSettings extends GenericSuggestionsSettings<number, string> {
    min: number;
    max: number;
    float: boolean;
    round: number;
    keys?: NumberKeys;
}
/** Number key options. */
export interface NumberKeys extends GenericSuggestionsKeys {
    increaseValue?: string[];
    decreaseValue?: string[];
}
/** Number prompt representation. */
export declare class Number extends GenericSuggestions<number, string> {
    protected readonly settings: NumberSettings;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: string | NumberOptions): Promise<number>;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value: string): void;
    constructor(options: string | NumberOptions);
    protected getDefaultSettings(options: NumberOptions): NumberSettings;
    protected success(value: number): string | undefined;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    /** Increase input number. */
    increaseValue(): void;
    /** Decrease input number. */
    decreaseValue(): void;
    /** Decrease/increase input number. */
    protected manipulateIndex(decrease?: boolean): void;
    /**
     * Add char to input.
     * @param char Char.
     */
    protected addChar(char: string): void;
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
    protected transform(value: string): number | undefined;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: number): string;
    /** Get input input. */
    protected getValue(): string;
}
export {};
