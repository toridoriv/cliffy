import type { ParseFlagsContext } from "../flags/types.js";
import { BooleanType } from "./types/boolean.js";
import { FileType } from "./types/file.js";
import { NumberType } from "./types/number.js";
import { StringType } from "./types/string.js";
import type { HelpOptions } from "./help/_help_generator.js";
import type { ActionHandler, Argument, ArgumentValue, CommandResult, CompleteHandler, CompleteOptions, Completion, DefaultValue, Description, EnvVar, EnvVarOptions, EnvVarValueHandler, ErrorHandler, Example, GlobalEnvVarOptions, GlobalOptionOptions, HelpHandler, MapTypes, Option, OptionOptions, OptionValueHandler, TypeDef, TypeOptions, TypeOrTypeHandler, VersionHandler } from "./types.js";
import { IntegerType } from "./types/integer.js";
export declare class Command<TParentCommandGlobals extends Record<string, unknown> | void = void, TParentCommandTypes extends Record<string, unknown> | void = TParentCommandGlobals extends number ? any : void, TCommandOptions extends Record<string, unknown> | void = TParentCommandGlobals extends number ? any : void, TCommandArguments extends Array<unknown> = TParentCommandGlobals extends number ? any : [], TCommandGlobals extends Record<string, unknown> | void = TParentCommandGlobals extends number ? any : void, TCommandTypes extends Record<string, unknown> | void = TParentCommandGlobals extends number ? any : {
    number: number;
    integer: number;
    string: string;
    boolean: boolean;
    file: string;
}, TCommandGlobalTypes extends Record<string, unknown> | void = TParentCommandGlobals extends number ? any : void, TParentCommand extends Command<any> | undefined = TParentCommandGlobals extends number ? any : undefined> {
    private types;
    private rawArgs;
    private literalArgs;
    private _name;
    private _parent?;
    private _globalParent?;
    private ver?;
    private desc;
    private _usage?;
    private actionHandler?;
    private globalActionHandler?;
    private options;
    private commands;
    private examples;
    private envVars;
    private aliases;
    private completions;
    private cmd;
    private argsDefinition?;
    private isExecutable;
    private throwOnError;
    private _allowEmpty;
    private _stopEarly;
    private defaultCommand?;
    private _useRawArgs;
    private args;
    private isHidden;
    private isGlobal;
    private hasDefaults;
    private _versionOptions?;
    private _helpOptions?;
    private _versionOption?;
    private _helpOption?;
    private _help?;
    private _shouldExit?;
    private _meta;
    private _groupName?;
    private _noGlobals;
    private errorHandler?;
    /** Disable version option. */
    versionOption(enable: false): this;
    /**
     * Set global version option.
     * @param flags The flags of the version option.
     * @param desc  The description of the version option.
     * @param opts  Version option options.
     */
    versionOption(flags: string, desc?: string, opts?: OptionOptions<Partial<TCommandOptions>, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand> & {
        global: true;
    }): this;
    /**
     * Set version option.
     * @param flags The flags of the version option.
     * @param desc  The description of the version option.
     * @param opts  Version option options.
     */
    versionOption(flags: string, desc?: string, opts?: OptionOptions<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /**
     * Set version option.
     * @param flags The flags of the version option.
     * @param desc  The description of the version option.
     * @param opts  The action of the version option.
     */
    versionOption(flags: string, desc?: string, opts?: ActionHandler<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /** Disable help option. */
    helpOption(enable: false): this;
    /**
     * Set global help option.
     * @param flags The flags of the help option.
     * @param desc  The description of the help option.
     * @param opts  Help option options.
     */
    helpOption(flags: string, desc?: string, opts?: OptionOptions<Partial<TCommandOptions>, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand> & {
        global: true;
    }): this;
    /**
     * Set help option.
     * @param flags The flags of the help option.
     * @param desc  The description of the help option.
     * @param opts  Help option options.
     */
    helpOption(flags: string, desc?: string, opts?: OptionOptions<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /**
     * Set help option.
     * @param flags The flags of the help option.
     * @param desc  The description of the help option.
     * @param opts  The action of the help option.
     */
    helpOption(flags: string, desc?: string, opts?: ActionHandler<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /**
     * Add new sub-command.
     * @param name      Command definition. E.g: `my-command <input-file:string> <output-file:string>`
     * @param cmd       The new child command to register.
     * @param override  Override existing child command.
     */
    command<TCommand extends Command<(TGlobalOptions & Record<string, unknown>) | void | undefined, TGlobalTypes | void | undefined, Record<string, unknown> | void, Array<unknown>, Record<string, unknown> | void, Record<string, unknown> | void, Record<string, unknown> | void, Command<TGlobalOptions | void | undefined, TGlobalTypes | void | undefined, Record<string, unknown> | void, Array<unknown>, Record<string, unknown> | void, Record<string, unknown> | void, Record<string, unknown> | void, undefined>>, TGlobalOptions extends (TParentCommand extends Command<any> ? TParentCommandGlobals : Merge<TParentCommandGlobals, TCommandGlobals>), TGlobalTypes extends (TParentCommand extends Command<any> ? TParentCommandTypes : Merge<TParentCommandTypes, TCommandTypes>)>(name: string, cmd: TCommand, override?: boolean): ReturnType<TCommand["reset"]> extends Command<Record<string, unknown> | void, Record<string, unknown> | void, infer Options, infer Arguments, infer GlobalOptions, infer Types, infer GlobalTypes, undefined> ? Command<TGlobalOptions, TGlobalTypes, Options, Arguments, GlobalOptions, Types, GlobalTypes, OneOf<TParentCommand, this>> : never;
    /**
     * Add new sub-command.
     * @param name      Command definition. E.g: `my-command <input-file:string> <output-file:string>`
     * @param cmd       The new child command to register.
     * @param override  Override existing child command.
     */
    command<TCommand extends Command<TGlobalOptions | void | undefined, TGlobalTypes | void | undefined, Record<string, unknown> | void, Array<unknown>, Record<string, unknown> | void, Record<string, unknown> | void, Record<string, unknown> | void, OneOf<TParentCommand, this> | undefined>, TGlobalOptions extends (TParentCommand extends Command<any> ? TParentCommandGlobals : Merge<TParentCommandGlobals, TCommandGlobals>), TGlobalTypes extends (TParentCommand extends Command<any> ? TParentCommandTypes : Merge<TParentCommandTypes, TCommandTypes>)>(name: string, cmd: TCommand, override?: boolean): TCommand extends Command<Record<string, unknown> | void, Record<string, unknown> | void, infer Options, infer Arguments, infer GlobalOptions, infer Types, infer GlobalTypes, OneOf<TParentCommand, this> | undefined> ? Command<TGlobalOptions, TGlobalTypes, Options, Arguments, GlobalOptions, Types, GlobalTypes, OneOf<TParentCommand, this>> : never;
    /**
     * Add new sub-command.
     * @param nameAndArguments  Command definition. E.g: `my-command <input-file:string> <output-file:string>`
     * @param desc              The description of the new child command.
     * @param override          Override existing child command.
     */
    command<TNameAndArguments extends string, TArguments extends TypedCommandArguments<TNameAndArguments, TParentCommand extends Command<any> ? TParentCommandTypes : Merge<TParentCommandTypes, TCommandGlobalTypes>>>(nameAndArguments: TNameAndArguments, desc?: string, override?: boolean): TParentCommandGlobals extends number ? Command<any> : Command<TParentCommand extends Command<any> ? TParentCommandGlobals : Merge<TParentCommandGlobals, TCommandGlobals>, TParentCommand extends Command<any> ? TParentCommandTypes : Merge<TParentCommandTypes, TCommandGlobalTypes>, void, TArguments, void, void, void, OneOf<TParentCommand, this>>;
    /**
     * Add new command alias.
     * @param alias Tha name of the alias.
     */
    alias(alias: string): this;
    /** Reset internal command reference to main command. */
    reset(): OneOf<TParentCommand, this>;
    /**
     * Set internal command pointer to child command with given name.
     * @param name The name of the command to select.
     */
    select<TOptions extends Record<string, unknown> | void = any, TArguments extends Array<unknown> = any, TGlobalOptions extends Record<string, unknown> | void = any>(name: string): Command<TParentCommandGlobals, TParentCommandTypes, TOptions, TArguments, TGlobalOptions, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /*****************************************************************************
     **** SUB HANDLER ************************************************************
     *****************************************************************************/
    /** Set command name. */
    name(name: string): this;
    /**
     * Set command version.
     * @param version Semantic version string string or method that returns the version string.
     */
    version(version: string | VersionHandler<Partial<TCommandOptions>, Partial<TCommandArguments>, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    meta(name: string, value: string): this;
    getMeta(): Record<string, string>;
    getMeta(name: string): string;
    /**
     * Set command help.
     * @param help Help string, method, or config for generator that returns the help string.
     */
    help(help: string | HelpHandler<Partial<TCommandOptions>, Partial<TCommandArguments>, TCommandGlobals, TParentCommandGlobals> | HelpOptions): this;
    /**
     * Set the long command description.
     * @param description The command description.
     */
    description(description: Description<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /**
     * Set the command usage. Defaults to arguments.
     * @param usage The command usage.
     */
    usage(usage: string): this;
    /**
     * Hide command from help, completions, etc.
     */
    hidden(): this;
    /** Make command globally available. */
    global(): this;
    /** Make command executable. */
    executable(): this;
    /**
     * Set command arguments:
     *
     *   <requiredArg:string> [optionalArg: number] [...restArgs:string]
     */
    arguments<TArguments extends TypedArguments<TArgs, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>>, TArgs extends string = string>(args: TArgs): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TArguments, TCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /**
     * Set command callback method.
     * @param fn Command action handler.
     */
    action(fn: ActionHandler<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /**
     * Set command callback method.
     * @param fn Command action handler.
     */
    globalAction(fn: ActionHandler<Partial<TCommandOptions>, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>): this;
    /**
     * Don't throw an error if the command was called without arguments.
     * @param allowEmpty Enable/disable allow empty.
     */
    allowEmpty<TAllowEmpty extends boolean | undefined = undefined>(allowEmpty?: TAllowEmpty): false extends TAllowEmpty ? this : Command<Partial<TParentCommandGlobals>, TParentCommandTypes, Partial<TCommandOptions>, TCommandArguments, TCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /**
     * Enable stop early. If enabled, all arguments starting from the first non
     * option argument will be passed as arguments with type string to the command
     * action handler.
     *
     * For example:
     *     `command --debug-level warning server --port 80`
     *
     * Will result in:
     *     - options: `{debugLevel: 'warning'}`
     *     - args: `['server', '--port', '80']`
     *
     * @param stopEarly Enable/disable stop early.
     */
    stopEarly(stopEarly?: boolean): this;
    /**
     * Disable parsing arguments. If enabled the raw arguments will be passed to
     * the action handler. This has no effect for parent or child commands. Only
     * for the command on which this method was called.
     * @param useRawArgs Enable/disable raw arguments.
     */
    useRawArgs(useRawArgs?: boolean): Command<void, void, void, Array<string>, void, void, void, TParentCommand>;
    /**
     * Set default command. The default command is executed when the program
     * was called without any argument and if no action handler is registered.
     * @param name Name of the default command.
     */
    default(name: string): this;
    globalType<THandler extends TypeOrTypeHandler<unknown>, TName extends string = string>(name: TName, handler: THandler, options?: Omit<TypeOptions, "global">): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TCommandArguments, TCommandGlobals, TCommandTypes, Merge<TCommandGlobalTypes, TypedType<TName, THandler>>, TParentCommand>;
    /**
     * Register custom type.
     * @param name    The name of the type.
     * @param handler The callback method to parse the type.
     * @param options Type options.
     */
    type<THandler extends TypeOrTypeHandler<unknown>, TName extends string = string>(name: TName, handler: THandler, options?: TypeOptions): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TCommandArguments, TCommandGlobals, Merge<TCommandTypes, TypedType<TName, THandler>>, TCommandGlobalTypes, TParentCommand>;
    globalComplete(name: string, complete: CompleteHandler, options?: Omit<CompleteOptions, "global">): this;
    /**
     * Register command specific custom type.
     * @param name      The name of the completion.
     * @param complete  The callback method to complete the type.
     * @param options   Complete options.
     */
    complete(name: string, complete: CompleteHandler<Partial<TCommandOptions>, Partial<TCommandArguments>, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, any>, options: CompleteOptions & {
        global: boolean;
    }): this;
    complete(name: string, complete: CompleteHandler<TCommandOptions, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>, options?: CompleteOptions): this;
    /**
     * Throw validation errors instead of calling `Deno.exit()` to handle
     * validation errors manually.
     *
     * A validation error is thrown when the command is wrongly used by the user.
     * For example: If the user passes some invalid options or arguments to the
     * command.
     *
     * This has no effect for parent commands. Only for the command on which this
     * method was called and all child commands.
     *
     * **Example:**
     *
     * ```ts
     * import { Command, ValidationError } from "./mod.ts";
     *
     * const cmd = new Command();
     * // ...
     *
     * try {
     *   cmd.parse();
     * } catch(error) {
     *   if (error instanceof ValidationError) {
     *     cmd.showHelp();
     *     Deno.exit(1);
     *   }
     *   throw error;
     * }
     * ```
     *
     * @see ValidationError
     */
    throwErrors(): this;
    error(handler: ErrorHandler): this;
    private getErrorHandler;
    /**
     * Same as `.throwErrors()` but also prevents calling `Deno.exit` after
     * printing help or version with the --help and --version option.
     */
    noExit(): this;
    /**
     * Disable inheriting global commands, options and environment variables from
     * parent commands.
     */
    noGlobals(): this;
    /** Check whether the command should throw errors or exit. */
    protected shouldThrowErrors(): boolean;
    /** Check whether the command should exit after printing help or version. */
    protected shouldExit(): boolean;
    globalOption<TFlags extends string, TGlobalOptions extends TypedOption<TFlags, TCommandOptions, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>, undefined extends TConflicts ? TRequired : false, TDefaultValue>, TMappedGlobalOptions extends MapValue<TGlobalOptions, TMappedValue, TCollect>, TRequired extends OptionOptions["required"] = undefined, TCollect extends OptionOptions["collect"] = undefined, TConflicts extends OptionOptions["conflicts"] = undefined, TDefaultValue = undefined, TMappedValue = undefined>(flags: TFlags, desc: string, opts?: Omit<GlobalOptionOptions<Partial<TCommandOptions>, TCommandArguments, MergeOptions<TFlags, TCommandGlobals, TGlobalOptions>, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>, "value"> & {
        default?: DefaultValue<TDefaultValue>;
        required?: TRequired;
        collect?: TCollect;
        value?: OptionValueHandler<MapTypes<ValueOf<TGlobalOptions>>, TMappedValue>;
    } | OptionValueHandler<MapTypes<ValueOf<TGlobalOptions>>, TMappedValue>): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TCommandArguments, MergeOptions<TFlags, TCommandGlobals, TMappedGlobalOptions>, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /**
     * Enable grouping of options and set the name of the group.
     * All option which are added after calling the `.group()` method will be
     * grouped in the help output. If the `.group()` method can be use multiple
     * times to create more groups.
     *
     * @param name The name of the option group.
     */
    group(name: string): this;
    /**
     * Add a new option.
     * @param flags Flags string e.g: -h, --help, --manual <requiredArg:string> [optionalArg:number] [...restArgs:string]
     * @param desc Flag description.
     * @param opts Flag options or custom handler for processing flag value.
     */
    option<TFlags extends string, TGlobalOptions extends TypedOption<TFlags, TCommandOptions, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>, undefined extends TConflicts ? TRequired : false, TDefault>, TMappedGlobalOptions extends MapValue<TGlobalOptions, TMappedValue, TCollect>, TRequired extends OptionOptions["required"] = undefined, TCollect extends OptionOptions["collect"] = undefined, TConflicts extends OptionOptions["conflicts"] = undefined, TDefault = undefined, TMappedValue = undefined>(flags: TFlags, desc: string, opts: Omit<OptionOptions<Partial<TCommandOptions>, TCommandArguments, MergeOptions<TFlags, TCommandGlobals, TGlobalOptions>, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>, "value"> & {
        global: true;
        default?: DefaultValue<TDefault>;
        required?: TRequired;
        collect?: TCollect;
        value?: OptionValueHandler<MapTypes<ValueOf<TGlobalOptions>>, TMappedValue>;
    } | OptionValueHandler<MapTypes<ValueOf<TGlobalOptions>>, TMappedValue>): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TCommandArguments, MergeOptions<TFlags, TCommandGlobals, TMappedGlobalOptions>, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    option<TFlags extends string, TOptions extends TypedOption<TFlags, TCommandOptions, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>, undefined extends TConflicts ? TRequired : false, TDefaultValue>, TMappedOptions extends MapValue<TOptions, TMappedValue, TCollect>, TRequired extends OptionOptions["required"] = undefined, TCollect extends OptionOptions["collect"] = undefined, TConflicts extends OptionOptions["conflicts"] = undefined, TDefaultValue = undefined, TMappedValue = undefined>(flags: TFlags, desc: string, opts?: Omit<OptionOptions<MergeOptions<TFlags, TCommandOptions, TMappedOptions>, TCommandArguments, TCommandGlobals, TParentCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>, "value"> & {
        default?: DefaultValue<TDefaultValue>;
        required?: TRequired;
        collect?: TCollect;
        conflicts?: TConflicts;
        value?: OptionValueHandler<MapTypes<ValueOf<TOptions>>, TMappedValue>;
    } | OptionValueHandler<MapTypes<ValueOf<TOptions>>, TMappedValue>): Command<TParentCommandGlobals, TParentCommandTypes, MergeOptions<TFlags, TCommandOptions, TMappedOptions>, TCommandArguments, TCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /**
     * Add new command example.
     * @param name          Name of the example.
     * @param description   The content of the example.
     */
    example(name: string, description: string): this;
    globalEnv<TNameAndValue extends string, TGlobalEnvVars extends TypedEnv<TNameAndValue, TPrefix, TCommandOptions, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>, TRequired>, TMappedGlobalEnvVars extends MapValue<TGlobalEnvVars, TMappedValue>, TRequired extends EnvVarOptions["required"] = undefined, TPrefix extends EnvVarOptions["prefix"] = undefined, TMappedValue = undefined>(name: TNameAndValue, description: string, options?: Omit<GlobalEnvVarOptions, "value"> & {
        required?: TRequired;
        prefix?: TPrefix;
        value?: EnvVarValueHandler<MapTypes<ValueOf<TGlobalEnvVars>>, TMappedValue>;
    }): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TCommandArguments, Merge<TCommandGlobals, TMappedGlobalEnvVars>, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /**
     * Add new environment variable.
     * @param name          Name of the environment variable.
     * @param description   The description of the environment variable.
     * @param options       Environment variable options.
     */
    env<N extends string, G extends TypedEnv<N, P, TCommandOptions, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>, R>, MG extends MapValue<G, V>, R extends EnvVarOptions["required"] = undefined, P extends EnvVarOptions["prefix"] = undefined, V = undefined>(name: N, description: string, options: Omit<EnvVarOptions, "value"> & {
        global: true;
        required?: R;
        prefix?: P;
        value?: EnvVarValueHandler<MapTypes<ValueOf<G>>, V>;
    }): Command<TParentCommandGlobals, TParentCommandTypes, TCommandOptions, TCommandArguments, Merge<TCommandGlobals, MG>, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    env<TNameAndValue extends string, TEnvVar extends TypedEnv<TNameAndValue, TPrefix, TCommandOptions, Merge<TParentCommandTypes, Merge<TCommandGlobalTypes, TCommandTypes>>, TRequired>, TMappedEnvVar extends MapValue<TEnvVar, TMappedValue>, TRequired extends EnvVarOptions["required"] = undefined, TPrefix extends EnvVarOptions["prefix"] = undefined, TMappedValue = undefined>(name: TNameAndValue, description: string, options?: Omit<EnvVarOptions, "value"> & {
        required?: TRequired;
        prefix?: TPrefix;
        value?: EnvVarValueHandler<MapTypes<ValueOf<TEnvVar>>, TMappedValue>;
    }): Command<TParentCommandGlobals, TParentCommandTypes, Merge<TCommandOptions, TMappedEnvVar>, TCommandArguments, TCommandGlobals, TCommandTypes, TCommandGlobalTypes, TParentCommand>;
    /*****************************************************************************
     **** MAIN HANDLER ***********************************************************
     *****************************************************************************/
    /**
     * Parse command line arguments and execute matched command.
     * @param args Command line args to parse. Ex: `cmd.parse( Deno.args )`
     */
    parse(args?: string[]): Promise<TParentCommand extends Command<any> ? CommandResult<Record<string, unknown>, Array<unknown>, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, undefined> : CommandResult<MapTypes<TCommandOptions>, MapTypes<TCommandArguments>, MapTypes<TCommandGlobals>, MapTypes<TParentCommandGlobals>, TCommandTypes, TCommandGlobalTypes, TParentCommandTypes, TParentCommand>>;
    private parseCommand;
    private getSubCommand;
    private parseGlobalOptionsAndEnvVars;
    private parseOptionsAndEnvVars;
    /** Register default options like `--version` and `--help`. */
    private registerDefaults;
    /**
     * Execute command.
     * @param options A map of options.
     * @param args Command arguments.
     */
    private execute;
    private executeGlobalAction;
    /**
     * Execute external sub-command.
     * @param args Raw command line arguments.
     */
    protected executeExecutable(args: string[]): Promise<void>;
    /** Parse raw command line arguments. */
    protected parseOptions(ctx: ParseContext, options: Option[], { stopEarly, stopOnUnknown, dotted, }?: ParseOptionsOptions): void;
    /** Parse argument type. */
    protected parseType(type: ArgumentValue): unknown;
    /**
     * Read and validate environment variables.
     * @param ctx Parse context.
     * @param envVars env vars defined by the command.
     * @param validate when true, throws an error if a required env var is missing.
     */
    protected parseEnvVars(ctx: ParseContext, envVars: Array<EnvVar>, validate?: boolean): Promise<void>;
    protected findEnvVar(names: readonly string[]): Promise<{
        name: string;
        value: string;
    } | undefined>;
    /**
     * Parse command-line arguments.
     * @param ctx     Parse context.
     * @param options Parsed command line options.
     */
    protected parseArguments(ctx: ParseContext, options: Record<string, unknown>): TCommandArguments;
    private handleError;
    /**
     * Handle error. If `throwErrors` is enabled the error will be thrown,
     * otherwise a formatted error message will be printed and `Deno.exit(1)`
     * will be called. This will also trigger registered error handlers.
     *
     * @param error The error to handle.
     */
    throw(error: Error): never;
    /*****************************************************************************
     **** GETTER *****************************************************************
     *****************************************************************************/
    /** Get command name. */
    getName(): string;
    /** Get parent command. */
    getParent(): TParentCommand;
    /**
     * Get parent command from global executed command.
     * Be sure, to call this method only inside an action handler. Unless this or any child command was executed,
     * this method returns always undefined.
     */
    getGlobalParent(): Command<any> | undefined;
    /** Get main command. */
    getMainCommand(): Command<any>;
    /** Get command name aliases. */
    getAliases(): string[];
    /**
     * Get full command path.
     *
     * @param name Override the main command name.
     */
    getPath(name?: string): string;
    /** Get arguments definition. E.g: <input-file:string> <output-file:string> */
    getArgsDefinition(): string | undefined;
    /**
     * Get argument by name.
     * @param name Name of the argument.
     */
    getArgument(name: string): Argument | undefined;
    /** Get arguments. */
    getArguments(): Argument[];
    /** Check if command has arguments. */
    hasArguments(): boolean;
    /** Get command version. */
    getVersion(): string | undefined;
    /** Get help handler method. */
    private getVersionHandler;
    /** Get command description. */
    getDescription(): string;
    getUsage(): string | undefined;
    /** Get short command description. This is the first line of the description. */
    getShortDescription(): string;
    /** Get original command-line arguments. */
    getRawArgs(): string[];
    /** Get all arguments defined after the double dash. */
    getLiteralArgs(): string[];
    /** Output generated help without exiting. */
    showVersion(): void;
    /** Returns command name, version and meta data. */
    getLongVersion(): string;
    /** Outputs command name, version and meta data. */
    showLongVersion(): void;
    /** Output generated help without exiting. */
    showHelp(options?: HelpOptions): void;
    /** Get generated help. */
    getHelp(options?: HelpOptions): string;
    /** Get help handler method. */
    private getHelpHandler;
    private exit;
    /** Check if new version is available and add hint to version. */
    checkVersion(): Promise<void>;
    /*****************************************************************************
     **** Options GETTER *********************************************************
     *****************************************************************************/
    /**
     * Checks whether the command has options or not.
     * @param hidden Include hidden options.
     */
    hasOptions(hidden?: boolean): boolean;
    /**
     * Get options.
     * @param hidden Include hidden options.
     */
    getOptions(hidden?: boolean): Option[];
    /**
     * Get base options.
     * @param hidden Include hidden options.
     */
    getBaseOptions(hidden?: boolean): Option[];
    /**
     * Get global options.
     * @param hidden Include hidden options.
     */
    getGlobalOptions(hidden?: boolean): Option[];
    /**
     * Checks whether the command has an option with given name or not.
     * @param name Name of the option. Must be in param-case.
     * @param hidden Include hidden options.
     */
    hasOption(name: string, hidden?: boolean): boolean;
    /**
     * Get option by name.
     * @param name Name of the option. Must be in param-case.
     * @param hidden Include hidden options.
     */
    getOption(name: string, hidden?: boolean): Option | undefined;
    /**
     * Get base option by name.
     * @param name Name of the option. Must be in param-case.
     * @param hidden Include hidden options.
     */
    getBaseOption(name: string, hidden?: boolean): Option | undefined;
    /**
     * Get global option from parent commands by name.
     * @param name Name of the option. Must be in param-case.
     * @param hidden Include hidden options.
     */
    getGlobalOption(name: string, hidden?: boolean): Option | undefined;
    /**
     * Remove option by name.
     * @param name Name of the option. Must be in param-case.
     */
    removeOption(name: string): Option | undefined;
    /**
     * Checks whether the command has sub-commands or not.
     * @param hidden Include hidden commands.
     */
    hasCommands(hidden?: boolean): boolean;
    /**
     * Get commands.
     * @param hidden Include hidden commands.
     */
    getCommands(hidden?: boolean): Array<Command<any>>;
    /**
     * Get base commands.
     * @param hidden Include hidden commands.
     */
    getBaseCommands(hidden?: boolean): Array<Command<any>>;
    /**
     * Get global commands.
     * @param hidden Include hidden commands.
     */
    getGlobalCommands(hidden?: boolean): Array<Command<any>>;
    /**
     * Checks whether a child command exists by given name or alias.
     * @param name Name or alias of the command.
     * @param hidden Include hidden commands.
     */
    hasCommand(name: string, hidden?: boolean): boolean;
    /**
     * Get command by name or alias.
     * @param name Name or alias of the command.
     * @param hidden Include hidden commands.
     */
    getCommand<TCommand extends Command<any>>(name: string, hidden?: boolean): TCommand | undefined;
    /**
     * Get base command by name or alias.
     * @param name Name or alias of the command.
     * @param hidden Include hidden commands.
     */
    getBaseCommand<TCommand extends Command<any>>(name: string, hidden?: boolean): TCommand | undefined;
    /**
     * Get global command by name or alias.
     * @param name Name or alias of the command.
     * @param hidden Include hidden commands.
     */
    getGlobalCommand<TCommand extends Command<any>>(name: string, hidden?: boolean): TCommand | undefined;
    /**
     * Remove sub-command by name or alias.
     * @param name Name or alias of the command.
     */
    removeCommand(name: string): Command<any> | undefined;
    /** Get types. */
    getTypes(): Array<TypeDef>;
    /** Get base types. */
    getBaseTypes(): Array<TypeDef>;
    /** Get global types. */
    getGlobalTypes(): Array<TypeDef>;
    /**
     * Get type by name.
     * @param name Name of the type.
     */
    getType(name: string): TypeDef | undefined;
    /**
     * Get base type by name.
     * @param name Name of the type.
     */
    getBaseType(name: string): TypeDef | undefined;
    /**
     * Get global type by name.
     * @param name Name of the type.
     */
    getGlobalType(name: string): TypeDef | undefined;
    /** Get completions. */
    getCompletions(): Completion<any, any, any, any, any, any, any, any>[];
    /** Get base completions. */
    getBaseCompletions(): Completion[];
    /** Get global completions. */
    getGlobalCompletions(): Completion[];
    /**
     * Get completion by name.
     * @param name Name of the completion.
     */
    getCompletion(name: string): Completion | undefined;
    /**
     * Get base completion by name.
     * @param name Name of the completion.
     */
    getBaseCompletion(name: string): Completion | undefined;
    /**
     * Get global completions by name.
     * @param name Name of the completion.
     */
    getGlobalCompletion(name: string): Completion | undefined;
    /**
     * Checks whether the command has environment variables or not.
     * @param hidden Include hidden environment variable.
     */
    hasEnvVars(hidden?: boolean): boolean;
    /**
     * Get environment variables.
     * @param hidden Include hidden environment variable.
     */
    getEnvVars(hidden?: boolean): EnvVar[];
    /**
     * Get base environment variables.
     * @param hidden Include hidden environment variable.
     */
    getBaseEnvVars(hidden?: boolean): EnvVar[];
    /**
     * Get global environment variables.
     * @param hidden Include hidden environment variable.
     */
    getGlobalEnvVars(hidden?: boolean): EnvVar[];
    /**
     * Checks whether the command has an environment variable with given name or not.
     * @param name Name of the environment variable.
     * @param hidden Include hidden environment variable.
     */
    hasEnvVar(name: string, hidden?: boolean): boolean;
    /**
     * Get environment variable by name.
     * @param name Name of the environment variable.
     * @param hidden Include hidden environment variable.
     */
    getEnvVar(name: string, hidden?: boolean): EnvVar | undefined;
    /**
     * Get base environment variable by name.
     * @param name Name of the environment variable.
     * @param hidden Include hidden environment variable.
     */
    getBaseEnvVar(name: string, hidden?: boolean): EnvVar | undefined;
    /**
     * Get global environment variable by name.
     * @param name Name of the environment variable.
     * @param hidden Include hidden environment variable.
     */
    getGlobalEnvVar(name: string, hidden?: boolean): EnvVar | undefined;
    /** Checks whether the command has examples or not. */
    hasExamples(): boolean;
    /** Get all examples. */
    getExamples(): Example[];
    /** Checks whether the command has an example with given name or not. */
    hasExample(name: string): boolean;
    /** Get example with given name. */
    getExample(name: string): Example | undefined;
    private getHelpOption;
}
interface ParseContext extends ParseFlagsContext<Record<string, unknown>> {
    actions: Array<ActionHandler>;
    env: Record<string, unknown>;
}
interface ParseOptionsOptions {
    stopEarly?: boolean;
    stopOnUnknown?: boolean;
    dotted?: boolean;
}
type TrimLeft<TValue extends string, TTrimValue extends string | undefined> = TValue extends `${TTrimValue}${infer TRest}` ? TRest : TValue;
type TrimRight<TValue extends string, TTrimValue extends string> = TValue extends `${infer TRest}${TTrimValue}` ? TRest : TValue;
type Lower<TValue extends string> = TValue extends Uppercase<TValue> ? Lowercase<TValue> : Uncapitalize<TValue>;
type CamelCase<TValue extends string> = TValue extends `${infer TPart}_${infer TRest}` ? `${Lower<TPart>}${Capitalize<CamelCase<TRest>>}` : TValue extends `${infer TPart}-${infer TRest}` ? `${Lower<TPart>}${Capitalize<CamelCase<TRest>>}` : Lower<TValue>;
type OneOf<TValue, TDefault> = TValue extends void ? TDefault : TValue;
type Merge<TLeft, TRight> = TLeft extends void ? TRight : TRight extends void ? TLeft : TLeft & TRight;
type MergeRecursive<TLeft, TRight> = TLeft extends void ? TRight : TRight extends void ? TLeft : TLeft & TRight;
type OptionalOrRequiredValue<TType extends string> = `[${TType}]` | `<${TType}>`;
type RestValue = `...${string}` | `${string}...`;
/**
 * Rest args with list type and completions.
 *
 * - `[...name:type[]:completion]`
 * - `<...name:type[]:completion>`
 * - `[name...:type[]:completion]`
 * - `<name...:type[]:completion>`
 */
type RestArgsListTypeCompletion<TType extends string> = OptionalOrRequiredValue<`${RestValue}:${TType}[]:${string}`>;
/**
 * Rest args with list type.
 *
 * - `[...name:type[]]`
 * - `<...name:type[]>`
 * - `[name...:type[]]`
 * - `<name...:type[]>`
 */
type RestArgsListType<TType extends string> = OptionalOrRequiredValue<`${RestValue}:${TType}[]`>;
/**
 * Rest args with type and completions.
 *
 * - `[...name:type:completion]`
 * - `<...name:type:completion>`
 * - `[name...:type:completion]`
 * - `<name...:type:completion>`
 */
type RestArgsTypeCompletion<TType extends string> = OptionalOrRequiredValue<`${RestValue}:${TType}:${string}`>;
/**
 * Rest args with type.
 *
 * - `[...name:type]`
 * - `<...name:type>`
 * - `[name...:type]`
 * - `<name...:type>`
 */
type RestArgsType<TType extends string> = OptionalOrRequiredValue<`${RestValue}:${TType}`>;
/**
 * Rest args.
 * - `[...name]`
 * - `<...name>`
 * - `[name...]`
 * - `<name...>`
 */
type RestArgs = OptionalOrRequiredValue<`${RestValue}`>;
/**
 * Single arg with list type and completions.
 *
 * - `[name:type[]:completion]`
 * - `<name:type[]:completion>`
 */
type SingleArgListTypeCompletion<TType extends string> = OptionalOrRequiredValue<`${string}:${TType}[]:${string}`>;
/**
 * Single arg with list type.
 *
 * - `[name:type[]]`
 * - `<name:type[]>`
 */
type SingleArgListType<TType extends string> = OptionalOrRequiredValue<`${string}:${TType}[]`>;
/**
 * Single arg  with type and completion.
 *
 * - `[name:type:completion]`
 * - `<name:type:completion>`
 */
type SingleArgTypeCompletion<TType extends string> = OptionalOrRequiredValue<`${string}:${TType}:${string}`>;
/**
 * Single arg with type.
 *
 * - `[name:type]`
 * - `<name:type>`
 */
type SingleArgType<TType extends string> = OptionalOrRequiredValue<`${string}:${TType}`>;
/**
 * Single arg.
 *
 * - `[name]`
 * - `<name>`
 */
type SingleArg = OptionalOrRequiredValue<`${string}`>;
type DefaultTypes = {
    number: NumberType;
    integer: IntegerType;
    string: StringType;
    boolean: BooleanType;
    file: FileType;
};
type ArgumentType<TArg extends string, TCustomTypes, TTypes = Merge<DefaultTypes, TCustomTypes>> = TArg extends RestArgsListTypeCompletion<infer Type> ? TTypes extends Record<Type, infer R> ? Array<Array<R>> : unknown : TArg extends RestArgsListType<infer Type> ? TTypes extends Record<Type, infer R> ? Array<Array<R>> : unknown : TArg extends RestArgsTypeCompletion<infer Type> ? TTypes extends Record<Type, infer R> ? Array<R> : unknown : TArg extends RestArgsType<infer Type> ? TTypes extends Record<Type, infer R> ? Array<R> : unknown : TArg extends RestArgs ? Array<string> : TArg extends SingleArgListTypeCompletion<infer Type> ? TTypes extends Record<Type, infer R> ? Array<R> : unknown : TArg extends SingleArgListType<infer Type> ? TTypes extends Record<Type, infer R> ? Array<R> : unknown : TArg extends SingleArgTypeCompletion<infer Type> ? TTypes extends Record<Type, infer R> ? R : unknown : TArg extends SingleArgType<infer Type> ? TTypes extends Record<Type, infer R> ? R : unknown : TArg extends SingleArg ? string : unknown;
type ArgumentTypes<TFlags extends string, T> = TFlags extends `${string} ${string}` ? TypedArguments<TFlags, T> : ArgumentType<TFlags, T>;
type GetArguments<TFlags extends string> = TFlags extends `-${string}=${infer RestFlags}` ? GetArguments<RestFlags> : TFlags extends `-${string} ${infer RestFlags}` ? GetArguments<RestFlags> : TFlags;
type OptionName<Name extends string> = Name extends "*" ? string : CamelCase<TrimRight<Name, ",">>;
type IsRequired<TRequired extends boolean | undefined, TDefault> = TRequired extends true ? true : TDefault extends undefined ? false : true;
type NegatableOption<TName extends string, TOptions, TDefault> = TDefault extends undefined ? OptionName<TName> extends keyof TOptions ? {
    [Key in OptionName<TName>]?: false;
} : {
    [Key in OptionName<TName>]: boolean;
} : {
    [Key in OptionName<TName>]: NonNullable<TDefault> | false;
};
type BooleanOption<TName extends string, TOptions, TRequired extends boolean | undefined = undefined, TDefault = undefined> = TName extends `no-${infer Name}` ? NegatableOption<Name, TOptions, TDefault> : TName extends `${infer Name}.${infer Rest}` ? (TRequired extends true ? {
    [Key in OptionName<Name>]: BooleanOption<Rest, TOptions, TRequired, TDefault>;
} : {
    [Key in OptionName<Name>]?: BooleanOption<Rest, TOptions, TRequired, TDefault>;
}) : (TRequired extends true ? {
    [Key in OptionName<TName>]: true | TDefault;
} : {
    [Key in OptionName<TName>]?: true | TDefault;
});
type ValueOption<TName extends string, TRestFlags extends string, TTypes, TRequired extends boolean | undefined = undefined, TDefault = undefined> = TName extends `${infer Name}.${infer RestName}` ? (TRequired extends true ? {
    [Key in OptionName<Name>]: ValueOption<RestName, TRestFlags, TTypes, TRequired, TDefault>;
} : {
    [Key in OptionName<Name>]?: ValueOption<RestName, TRestFlags, TTypes, TRequired, TDefault>;
}) : (TRequired extends true ? {
    [Key in OptionName<TName>]: GetArguments<TRestFlags> extends `[${string}]` ? NonNullable<TDefault> | true | ArgumentType<GetArguments<TRestFlags>, TTypes> : NonNullable<TDefault> | ArgumentType<GetArguments<TRestFlags>, TTypes>;
} : {
    [Key in OptionName<TName>]?: GetArguments<TRestFlags> extends `[${string}]` ? NonNullable<TDefault> | true | ArgumentType<GetArguments<TRestFlags>, TTypes> : NonNullable<TDefault> | ArgumentType<GetArguments<TRestFlags>, TTypes>;
});
type ValuesOption<TName extends string, TRestFlags extends string, TTypes, TRequired extends boolean | undefined = undefined, TDefault = undefined> = TName extends `${infer Name}.${infer RestName}` ? (TRequired extends true ? {
    [Key in OptionName<Name>]: ValuesOption<RestName, TRestFlags, TTypes, TRequired, TDefault>;
} : {
    [Key in OptionName<Name>]?: ValuesOption<RestName, TRestFlags, TTypes, TRequired, TDefault>;
}) : (TRequired extends true ? {
    [Key in OptionName<TName>]: GetArguments<TRestFlags> extends `[${string}]` ? NonNullable<TDefault> | true | ArgumentTypes<GetArguments<TRestFlags>, TTypes> : NonNullable<TDefault> | ArgumentTypes<GetArguments<TRestFlags>, TTypes>;
} : {
    [Key in OptionName<TName>]?: GetArguments<TRestFlags> extends `[${string}]` ? NonNullable<TDefault> | true | ArgumentTypes<GetArguments<TRestFlags>, TTypes> : NonNullable<TDefault> | ArgumentTypes<GetArguments<TRestFlags>, TTypes>;
});
type MapValue<TOptions, TMappedOptions, TCollect = undefined> = TMappedOptions extends undefined ? TCollect extends true ? {
    [Key in keyof TOptions]: TOptions[Key] extends (Record<string, unknown> | undefined) ? MapValue<TOptions[Key], TMappedOptions> : Array<NonNullable<TOptions[Key]>>;
} : TOptions : {
    [Key in keyof TOptions]: TOptions[Key] extends (Record<string, unknown> | undefined) ? MapValue<TOptions[Key], TMappedOptions> : TMappedOptions;
};
type GetOptionName<TFlags> = TFlags extends `${string}--${infer Name}=${string}` ? TrimRight<Name, ","> : TFlags extends `${string}--${infer Name} ${string}` ? TrimRight<Name, ","> : TFlags extends `${string}--${infer Name}` ? Name : TFlags extends `-${infer Name}=${string}` ? TrimRight<Name, ","> : TFlags extends `-${infer Name} ${string}` ? TrimRight<Name, ","> : TFlags extends `-${infer Name}` ? Name : unknown;
type MergeOptions<TFlags, TOptions, TMappedOptions, TName = GetOptionName<TFlags>> = TName extends `no-${string}` ? Spread<TOptions, TMappedOptions> : TName extends `${string}.${string}` ? MergeRecursive<TOptions, TMappedOptions> : Merge<TOptions, TMappedOptions>;
type TypedOption<TFlags extends string, TOptions, TTypes, TRequired extends boolean | undefined = undefined, TDefault = undefined> = number extends TTypes ? any : TFlags extends `${string}--${infer Name}=${infer TRestFlags}` ? ValuesOption<Name, TRestFlags, TTypes, IsRequired<TRequired, TDefault>, TDefault> : TFlags extends `${string}--${infer Name} ${infer TRestFlags}` ? ValuesOption<Name, TRestFlags, TTypes, IsRequired<TRequired, TDefault>, TDefault> : TFlags extends `${string}--${infer Name}` ? BooleanOption<Name, TOptions, IsRequired<TRequired, TDefault>, TDefault> : TFlags extends `-${infer Name}=${infer TRestFlags}` ? ValuesOption<Name, TRestFlags, TTypes, IsRequired<TRequired, TDefault>, TDefault> : TFlags extends `-${infer Name} ${infer TRestFlags}` ? ValuesOption<Name, TRestFlags, TTypes, IsRequired<TRequired, TDefault>, TDefault> : TFlags extends `-${infer Name}` ? BooleanOption<Name, TOptions, IsRequired<TRequired, TDefault>, TDefault> : Record<string, unknown>;
type TypedArguments<TArgs extends string, TTypes> = number extends TTypes ? any : TArgs extends `${infer TArg} ${infer TRestArgs}` ? TArg extends `[${string}]` ? [ArgumentType<TArg, TTypes>?, ...TypedArguments<TRestArgs, TTypes>] : [ArgumentType<TArg, TTypes>, ...TypedArguments<TRestArgs, TTypes>] : TArgs extends `${string}...${string}` ? [
    ...ArgumentType<TArgs, TTypes> extends Array<infer TValue> ? TArgs extends `[${string}]` ? Array<TValue> : [TValue, ...Array<TValue>] : never
] : TArgs extends `[${string}]` ? [ArgumentType<TArgs, TTypes>?] : [ArgumentType<TArgs, TTypes>];
type TypedCommandArguments<TNameAndArguments extends string, TTypes> = number extends TTypes ? any : TNameAndArguments extends `${string} ${infer TFlags}` ? TypedArguments<TFlags, TTypes> : [];
type TypedEnv<TNameAndValue extends string, TPrefix extends string | undefined, TOptions, TTypes, TRequired extends boolean | undefined = undefined, TDefault = undefined> = number extends TTypes ? any : TNameAndValue extends `${infer Name}=${infer Rest}` ? ValueOption<TrimLeft<Name, TPrefix>, Rest, TTypes, TRequired, TDefault> : TNameAndValue extends `${infer Name} ${infer Rest}` ? ValueOption<TrimLeft<Name, TPrefix>, Rest, TTypes, TRequired, TDefault> : TNameAndValue extends `${infer Name}` ? BooleanOption<TrimLeft<Name, TPrefix>, TOptions, TRequired, TDefault> : Record<string, unknown>;
type TypedType<TName extends string, THandler extends TypeOrTypeHandler<unknown>> = {
    [Name in TName]: THandler;
};
type RequiredKeys<TRecord> = {
    [Key in keyof TRecord]-?: {} extends Pick<TRecord, Key> ? never : Key;
}[keyof TRecord];
type OptionalKeys<TRecord> = {
    [Key in keyof TRecord]-?: {} extends Pick<TRecord, Key> ? Key : never;
}[keyof TRecord];
type SpreadRequiredProperties<TTarget, TSource, TKeys extends keyof TTarget & keyof TSource> = {
    [Key in TKeys]: Exclude<TTarget[Key], undefined> | Exclude<TSource[Key], undefined>;
};
type SpreadOptionalProperties<TTarget, TSource, TKeys extends keyof TTarget & keyof TSource> = {
    [Key in TKeys]?: TTarget[Key] | TSource[Key];
};
/** Merge types of two objects. */
type Spread<TTarget, TSource> = TTarget extends void ? TSource : TSource extends void ? TTarget : Omit<TTarget, keyof TSource> & Omit<TSource, keyof TTarget> & SpreadRequiredProperties<TTarget, TSource, RequiredKeys<TSource> & keyof TTarget> & SpreadRequiredProperties<TTarget, TSource, RequiredKeys<TTarget> & keyof TSource> & SpreadOptionalProperties<TTarget, TSource, OptionalKeys<TTarget> & OptionalKeys<TSource>>;
type ValueOf<TValue> = TValue extends Record<string, infer V> ? ValueOf<V> : TValue;
export {};
