import { GenericPrompt } from "./_generic_prompt.js";
import { underline } from "./deps.js";
import {
  GenericInput,
  GenericInputKeys,
  GenericInputPromptOptions,
  GenericInputPromptSettings,
} from "./_generic_input.js";

/** Secret prompt options. */
export interface SecretOptions
  extends GenericInputPromptOptions<string, string> {
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
export class Secret extends GenericInput<string, string> {
  protected readonly settings: SecretSettings;

  /** Execute the prompt and show cursor on end. */
  public static prompt(options: string | SecretOptions): Promise<string> {
    return new this(options).prompt();
  }

  /**
   * Inject prompt value. Can be used for unit tests or pre selections.
   * @param value Input value.
   */
  public static inject(value: string): void {
    GenericPrompt.inject(value);
  }

  constructor(options: string | SecretOptions) {
    super();
    if (typeof options === "string") {
      options = { message: options };
    }
    this.settings = this.getDefaultSettings(options);
  }

  protected getDefaultSettings(options: SecretOptions): SecretSettings {
    return {
      ...super.getDefaultSettings(options),
      label: options.label ?? "Secret",
      hidden: options.hidden ?? false,
      minLength: options.minLength ?? 0,
      maxLength: options.maxLength ?? Infinity,
    };
  }

  protected input(): string {
    return underline(
      this.settings.hidden ? "" : "*".repeat(this.inputValue.length),
    );
  }

  /** Read user input. */
  protected read(): Promise<boolean> {
    if (this.settings.hidden) {
      this.settings.tty.cursorHide();
    }
    return super.read();
  }

  /**
   * Validate input value.
   * @param value User input value.
   * @return True on success, false or error message on error.
   */
  protected validate(value: string): boolean | string {
    if (typeof value !== "string") {
      return false;
    }
    if (value.length < this.settings.minLength) {
      return `${this.settings.label} must be longer than ${this.settings.minLength} but has a length of ${value.length}.`;
    }
    if (value.length > this.settings.maxLength) {
      return `${this.settings.label} can't be longer than ${this.settings.maxLength} but has a length of ${value.length}.`;
    }
    return true;
  }

  /**
   * Map input value to output value.
   * @param value Input value.
   * @return Output value.
   */
  protected transform(value: string): string | undefined {
    return value;
  }

  /**
   * Format output value.
   * @param value Output value.
   */
  protected format(value: string): string {
    return this.settings.hidden ? "*".repeat(8) : "*".repeat(value.length);
  }

  /** Get input input. */
  protected getValue(): string {
    return this.inputValue;
  }
}
