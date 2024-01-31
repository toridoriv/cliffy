import type { KeyCode } from "../keycode/key_code.js";
import {
  GenericInput,
  GenericInputKeys,
  GenericInputPromptOptions,
  GenericInputPromptSettings,
} from "./_generic_input.js";
import { bold, brightBlue, dim, stripColor } from "./deps.js";
import { Figures, getFiguresByKeys } from "./figures.js";
import { distance } from "../_utils/distance.js";

type UnsupportedInputOptions = "suggestions" | "list";

/** Generic list prompt options. */
export interface GenericListOptions<TValue, TRawValue> extends
  Omit<
    GenericInputPromptOptions<TValue, TRawValue>,
    UnsupportedInputOptions
  > {
  options: Array<string | GenericListOption>;
  keys?: GenericListKeys;
  indent?: string;
  listPointer?: string;
  searchIcon?: string;
  maxRows?: number;
  searchLabel?: string;
  search?: boolean;
  info?: boolean;
}

/** Generic list prompt settings. */
export interface GenericListSettings<TValue, TRawValue>
  extends GenericInputPromptSettings<TValue, TRawValue> {
  options: Array<GenericListOptionSettings>;
  keys?: GenericListKeys;
  indent: string;
  listPointer: string;
  maxRows: number;
  searchLabel: string;
  search?: boolean;
  info?: boolean;
}

/** Generic list option options. */
export interface GenericListOption {
  value: string;
  name?: string;
  disabled?: boolean;
}

/** Generic list option settings. */
export interface GenericListOptionSettings extends GenericListOption {
  name: string;
  value: string;
  disabled: boolean;
}

/** Select key options. */
export interface GenericListKeys extends GenericInputKeys {
  previous?: string[];
  next?: string[];
  previousPage?: string[];
  nextPage?: string[];
}

/** Generic list prompt representation. */
export abstract class GenericList<
  TValue,
  TRawValue,
> extends GenericInput<TValue, TRawValue> {
  protected abstract readonly settings: GenericListSettings<
    TValue,
    TRawValue
  >;
  protected abstract options: Array<GenericListOptionSettings>;
  protected abstract listIndex: number;
  protected abstract listOffset: number;

  /**
   * Create list separator.
   * @param label Separator label.
   */
  public static separator(label = "------------"): GenericListOption {
    return { value: label, disabled: true };
  }

  protected getDefaultSettings(
    options: GenericListOptions<TValue, TRawValue>,
    // ): Omit<GenericListSettings<TValue, TRawValue>, "options"> {
  ): GenericListSettings<TValue, TRawValue> {
    const settings = super.getDefaultSettings(options);
    return {
      ...settings,
      listPointer: options.listPointer ?? brightBlue(Figures.POINTER),
      searchLabel: options.searchLabel ?? brightBlue(Figures.SEARCH),
      maxRows: options.maxRows ?? 10,
      options: this.mapOptions(options).map(
        (option) => this.mapOption(options, option),
      ),
      keys: {
        previous: options.search ? ["up"] : ["up", "u", "p", "8"],
        next: options.search ? ["down"] : ["down", "d", "n", "2"],
        previousPage: ["pageup", "left"],
        nextPage: ["pagedown", "right"],
        ...(settings.keys ?? {}),
      },
    };
  }

  protected mapOptions<
    TOption extends GenericListOption,
  >(
    options: GenericListOptions<TValue, TRawValue> & {
      options: Array<string | TOption>;
    },
  ): Array<TOption | { value: string }> {
    return options.options.map((option) =>
      typeof option === "string" ? { value: option } : option
    ).map(
      (option) => this.mapOption(options, option),
    );
  }

  /**
   * Set list option defaults.
   * @param option List option.
   */
  protected mapOption(
    _options: GenericListOptions<TValue, TRawValue>,
    option: GenericListOption,
  ): GenericListOptionSettings {
    return {
      value: option.value,
      name: typeof option.name === "undefined" ? option.value : option.name,
      disabled: !!option.disabled,
    };
  }

  protected match(): void {
    const input: string = this.getCurrentInputValue().toLowerCase();
    if (!input.length) {
      this.options = this.settings.options.slice();
    } else {
      this.options = this.settings.options
        .filter((option: GenericListOptionSettings) =>
          match(option.name) ||
          (option.name !== option.value && match(option.value))
        )
        .sort((a: GenericListOptionSettings, b: GenericListOptionSettings) =>
          distance(a.name, input) - distance(b.name, input)
        );
    }
    this.listIndex = Math.max(
      0,
      Math.min(this.options.length - 1, this.listIndex),
    );
    this.listOffset = Math.max(
      0,
      Math.min(
        this.options.length - this.getListHeight(),
        this.listOffset,
      ),
    );

    function match(value: string): boolean {
      return stripColor(value)
        .toLowerCase()
        .includes(input);
    }
  }

  protected message(): string {
    let message = `${this.settings.indent}${this.settings.prefix}` +
      bold(this.settings.message) +
      this.defaults();
    if (this.settings.search) {
      message += " " + this.settings.searchLabel + " ";
    }
    this.cursor.x = stripColor(message).length + this.inputIndex + 1;
    return message + this.input();
  }

  /** Render options. */
  protected body(): string | Promise<string> {
    return this.getList() + this.getInfo();
  }

  protected getInfo(): string {
    if (!this.settings.info) {
      return "";
    }
    const selected: number = this.listIndex + 1;
    const actions: Array<[string, Array<string>]> = [
      ["Next", getFiguresByKeys(this.settings.keys?.next ?? [])],
      ["Previous", getFiguresByKeys(this.settings.keys?.previous ?? [])],
      ["Next Page", getFiguresByKeys(this.settings.keys?.nextPage ?? [])],
      [
        "Previous Page",
        getFiguresByKeys(this.settings.keys?.previousPage ?? []),
      ],
      ["Submit", getFiguresByKeys(this.settings.keys?.submit ?? [])],
    ];

    return "\n" + this.settings.indent + brightBlue(Figures.INFO) +
      bold(` ${selected}/${this.options.length} `) +
      actions
        .map((cur) => `${cur[0]}: ${bold(cur[1].join(", "))}`)
        .join(", ");
  }

  /** Render options list. */
  protected getList(): string {
    const list: Array<string> = [];
    const height: number = this.getListHeight();
    for (let i = this.listOffset; i < this.listOffset + height; i++) {
      list.push(
        this.getListItem(
          this.options[i],
          this.listIndex === i,
        ),
      );
    }
    if (!list.length) {
      list.push(
        this.settings.indent + dim("  No matches..."),
      );
    }
    return list.join("\n");
  }

  /**
   * Render option.
   * @param item        Option.
   * @param isSelected  Set to true if option is selected.
   */
  protected abstract getListItem(
    item: GenericListOptionSettings,
    isSelected?: boolean,
  ): string;

  /** Get options row height. */
  protected getListHeight(): number {
    return Math.min(
      this.options.length,
      this.settings.maxRows || this.options.length,
    );
  }

  protected getListIndex(value?: string) {
    return Math.max(
      0,
      typeof value === "undefined"
        ? this.options.findIndex((item: GenericListOptionSettings) =>
          !item.disabled
        ) || 0
        : this.options.findIndex((item: GenericListOptionSettings) =>
          item.value === value
        ) || 0,
    );
  }

  protected getPageOffset(index: number) {
    if (index === 0) {
      return 0;
    }
    const height: number = this.getListHeight();
    return Math.floor(index / height) * height;
  }

  /**
   * Find option by value.
   * @param value Value of the option.
   */
  protected getOptionByValue(
    value: string,
  ): GenericListOptionSettings | undefined {
    return this.options.find((option) => option.value === value);
  }

  /** Read user input. */
  protected read(): Promise<boolean> {
    if (!this.settings.search) {
      this.settings.tty.cursorHide();
    }
    return super.read();
  }

  /**
   * Handle user input event.
   * @param event Key event.
   */
  protected async handleEvent(event: KeyCode): Promise<void> {
    switch (true) {
      case this.isKey(this.settings.keys, "previous", event):
        this.selectPrevious();
        break;
      case this.isKey(this.settings.keys, "next", event):
        this.selectNext();
        break;
      case this.isKey(this.settings.keys, "nextPage", event):
        this.selectNextPage();
        break;
      case this.isKey(this.settings.keys, "previousPage", event):
        this.selectPreviousPage();
        break;
      default:
        await super.handleEvent(event);
    }
  }

  protected moveCursorLeft(): void {
    if (this.settings.search) {
      super.moveCursorLeft();
    }
  }

  protected moveCursorRight(): void {
    if (this.settings.search) {
      super.moveCursorRight();
    }
  }

  protected deleteChar(): void {
    if (this.settings.search) {
      super.deleteChar();
    }
  }

  protected deleteCharRight(): void {
    if (this.settings.search) {
      super.deleteCharRight();
      this.match();
    }
  }

  protected addChar(char: string): void {
    if (this.settings.search) {
      super.addChar(char);
      this.match();
    }
  }

  /** Select previous option. */
  protected selectPrevious(): void {
    if (this.options.length < 2) {
      return;
    }
    if (this.listIndex > 0) {
      this.listIndex--;
      if (this.listIndex < this.listOffset) {
        this.listOffset--;
      }
      if (this.options[this.listIndex].disabled) {
        this.selectPrevious();
      }
    } else {
      this.listIndex = this.options.length - 1;
      this.listOffset = this.options.length - this.getListHeight();
      if (this.options[this.listIndex].disabled) {
        this.selectPrevious();
      }
    }
  }

  /** Select next option. */
  protected selectNext(): void {
    if (this.options.length < 2) {
      return;
    }
    if (this.listIndex < this.options.length - 1) {
      this.listIndex++;
      if (this.listIndex >= this.listOffset + this.getListHeight()) {
        this.listOffset++;
      }
      if (this.options[this.listIndex].disabled) {
        this.selectNext();
      }
    } else {
      this.listIndex = this.listOffset = 0;
      if (this.options[this.listIndex].disabled) {
        this.selectNext();
      }
    }
  }

  /** Select previous page. */
  protected selectPreviousPage(): void {
    if (this.options?.length) {
      const height: number = this.getListHeight();
      if (this.listOffset >= height) {
        this.listIndex -= height;
        this.listOffset -= height;
      } else if (this.listOffset > 0) {
        this.listIndex -= this.listOffset;
        this.listOffset = 0;
      }
    }
  }

  /** Select next page. */
  protected selectNextPage(): void {
    if (this.options?.length) {
      const height: number = this.getListHeight();
      if (this.listOffset + height + height < this.options.length) {
        this.listIndex += height;
        this.listOffset += height;
      } else if (this.listOffset + height < this.options.length) {
        const offset = this.options.length - height;
        this.listIndex += offset - this.listOffset;
        this.listOffset = offset;
      }
    }
  }
}

/** @deprecated Use `Array<string | GenericListOption>` instead. */
export type GenericListValueOptions = Array<string | GenericListOption>;
/** @deprecated Use `Array<GenericListOptionSettings>` instead. */
export type GenericListValueSettings = Array<GenericListOptionSettings>;
