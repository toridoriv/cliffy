import type { KeyCode } from "../keycode/key_code.js";
import { GenericPrompt, GenericPromptKeys, GenericPromptOptions, GenericPromptSettings } from "./_generic_prompt.js";
/** Generic input prompt options. */
export interface GenericInputPromptOptions<TValue, TRawValue> extends GenericPromptOptions<TValue, TRawValue> {
    keys?: GenericInputKeys;
}
/** Generic input prompt settings. */
export interface GenericInputPromptSettings<TValue, TRawValue> extends GenericPromptSettings<TValue, TRawValue> {
    keys?: GenericInputKeys;
}
/** Input keys options. */
export interface GenericInputKeys extends GenericPromptKeys {
    moveCursorLeft?: string[];
    moveCursorRight?: string[];
    deleteCharLeft?: string[];
    deleteCharRight?: string[];
}
/** Generic input prompt representation. */
export declare abstract class GenericInput<TValue, TRawValue> extends GenericPrompt<TValue, TRawValue> {
    protected abstract readonly settings: GenericInputPromptSettings<TValue, TRawValue>;
    protected inputValue: string;
    protected inputIndex: number;
    protected getDefaultSettings(options: GenericInputPromptOptions<TValue, TRawValue>): GenericInputPromptSettings<TValue, TRawValue>;
    protected getCurrentInputValue(): string;
    protected message(): string;
    protected input(): string;
    protected highlight(value: string | number, color1?: (val: string) => string, color2?: (val: string) => string): string;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    /** Add character to current input. */
    protected addChar(char: string): void;
    /** Move prompt cursor left. */
    protected moveCursorLeft(): void;
    /** Move prompt cursor right. */
    protected moveCursorRight(): void;
    /** Delete char left. */
    protected deleteChar(): void;
    /** Delete char right. */
    protected deleteCharRight(): void;
}
