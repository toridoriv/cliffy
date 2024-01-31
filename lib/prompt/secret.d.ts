import { GenericInput, GenericInputKeys, GenericInputPromptOptions, GenericInputPromptSettings } from "./_generic_input.js";
/** Secret prompt options. */
export interface SecretOptions extends GenericInputPromptOptions<string, string> {
    label?: string;
    hidden?: boolean;
    minLength?: number;
    maxLength?: number;
    keys?: SecretKeys;
}
/** Secret prompt settings. */
interface SecretSettings extends GenericInputPromptSettings<string, string> {
    label: string;
    hidden: boolean;
    minLength: number;
    maxLength: number;
    keys?: SecretKeys;
}
/** Secret key options. */
export type SecretKeys = GenericInputKeys;
/** Secret prompt representation. */
export declare class Secret extends GenericInput<string, string> {
    protected readonly settings: SecretSettings;
    /** Execute the prompt and show cursor on end. */
    static prompt(options: string | SecretOptions): Promise<string>;
    /**
     * Inject prompt value. Can be used for unit tests or pre selections.
     * @param value Input value.
     */
    static inject(value: string): void;
    constructor(options: string | SecretOptions);
    protected getDefaultSettings(options: SecretOptions): SecretSettings;
    protected input(): string;
    /** Read user input. */
    protected read(): Promise<boolean>;
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
    protected transform(value: string): string | undefined;
    /**
     * Format output value.
     * @param value Output value.
     */
    protected format(value: string): string;
    /** Get input input. */
    protected getValue(): string;
}
export {};
