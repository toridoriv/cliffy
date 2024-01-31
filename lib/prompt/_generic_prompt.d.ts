import * as dntShim from "../_dnt.shims.js";
import type { Cursor } from "../ansi/cursor_position.js";
import { Tty } from "../ansi/tty.js";
import { KeyCode } from "../keycode/key_code.js";
/** Static generic prompt interface. */
export interface StaticGenericPrompt<TValue, TRawValue, TOptions extends GenericPromptOptions<TValue, TRawValue> = GenericPromptOptions<TValue, TRawValue>> {
    inject?(value: TValue): void;
    prompt(options: TOptions): Promise<TValue>;
}
/** Generic prompt options. */
export interface GenericPromptOptions<TValue, TRawValue> {
    message: string;
    default?: TValue;
    hideDefault?: boolean;
    validate?: (value: TRawValue) => ValidateResult;
    transform?: (value: TRawValue) => TValue | undefined;
    hint?: string;
    pointer?: string;
    indent?: string;
    keys?: GenericPromptKeys;
    cbreak?: boolean;
    prefix?: string;
    reader?: dntShim.Deno.Reader & {
        readonly rid: number;
        setRaw(mode: boolean, options?: dntShim.Deno.SetRawOptions): void;
    };
    writer?: dntShim.Deno.WriterSync;
}
/** Generic prompt settings. */
export interface GenericPromptSettings<TValue, TRawValue> extends GenericPromptOptions<TValue, TRawValue> {
    pointer: string;
    indent: string;
    prefix: string;
    cbreak: boolean;
    tty: Tty;
    reader: dntShim.Deno.Reader & {
        readonly rid: number;
        setRaw(mode: boolean, options?: dntShim.Deno.SetRawOptions): void;
    };
    writer: dntShim.Deno.WriterSync;
}
/** Prompt validation return tape. */
export type ValidateResult = string | boolean | Promise<string | boolean>;
/** Input keys options. */
export interface GenericPromptKeys {
    submit?: Array<string>;
}
/** Generic prompt representation. */
export declare abstract class GenericPrompt<TValue, TRawValue> {
    #private;
    protected static injectedValue: unknown | undefined;
    protected abstract readonly settings: GenericPromptSettings<TValue, TRawValue>;
    protected readonly cursor: Cursor;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value: unknown): void;
    protected getDefaultSettings(options: GenericPromptOptions<TValue, TRawValue>): GenericPromptSettings<TValue, TRawValue>;
    /** Execute the prompt and show cursor on end. */
    prompt(): Promise<TValue>;
    /** Clear prompt output. */
    protected clear(): void;
    /** Render prompt. */
    protected render(): Promise<void>;
    /** Read user input from stdin, handle events and validate user input. */
    protected read(): Promise<boolean>;
    protected submit(): Promise<void>;
    protected message(): string;
    protected defaults(): string;
    /** Get prompt success message. */
    protected success(value: TValue): string | undefined;
    protected body?(): string | undefined | Promise<string | undefined>;
    protected footer(): string | undefined;
    protected error(): string | undefined;
    protected hint(): string | undefined;
    protected setErrorMessage(message: string): void;
    /**
     * Handle user input event.
     * @param event Key event.
     */
    protected handleEvent(event: KeyCode): Promise<void>;
    /**
     * Map input value to output value.
     * @param value Input value.
     * @return Output value.
     */
    protected abstract transform(value: TRawValue): TValue | undefined;
    /**
     * Validate input value.
     * @param value User input value.
     * @return True on success, false or error message on error.
     */
    protected abstract validate(value: TRawValue): ValidateResult;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected abstract format(value: TValue): string;
    /** Get input value. */
    protected abstract getValue(): TRawValue;
    /**
     * Check if key event has given name or sequence.
     * @param keys  Key map.
     * @param name  Key name.
     * @param event Key event.
     */
    protected isKey<TKey extends unknown, TName extends keyof TKey>(keys: TKey | undefined, name: TName, event: KeyCode): boolean;
}
