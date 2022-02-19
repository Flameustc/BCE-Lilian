/* eslint-disable camelcase */
/* eslint-disable init-declarations */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/**
 * The global API of the SDK
 *
 * Accessible using the exported value or as `window.bcModSdk`
 * @public
 */
export declare interface ModSDKGlobalAPI {
  /** The version of the SDK itself. Attempting to load two different SDK versions will fail. */
  version: string;
  /**
   * Register a mod, receiving access to the mod API
   * @param name - Name of the mod
   * @param version - Version or other metadata for the mod, visible by other mods
   * @param allowReplace - If `true` subsequent calls to `registerMod` will unload old one, replacing it.
   * If `false` any attempt to register a new mod with same name will fail. Defaults to `false`
   * @returns The API usable by mod. @see ModSDKModAPI
   */
  registerMod(
    name: string,
    version: string,
    allowReplace?: boolean
  ): ModSDKModAPI;
  /** Get info about all registered mods */
  getModsInfo(): ModSDKModInfo[];
  /** Get info about all modified functions */
  getPatchingInfo(): Map<string, PatchedFunctionInfo>;
  /** Internal API, please **DO NOT USE** */
  errorReporterHooks: {
    hookEnter: ((fn: string, mod: string) => () => void) | null;
    hookChainExit:
      | ((fn: string, patchMods: ReadonlySet<string>) => () => void)
      | null;
  };
}

/** @public */
export declare interface ModSDKModAPI {
  /** Unload this mod, removing any hooks or patches by it. To continue using SDK another call to `registerMod` is required */
  unload(): void;
  /**
   * Hook a BC function
   * @param functionName - Name of function to hook. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   * @param priority - Number used to determinate order hooks will be called in. Higher number is called first
   * @param hook - The hook itself to use, @see PatchHook
   * @returns Function that can be called to remove this hook
   */
  hookFunction(
    functionName: string,
    priority: number,
    hook: PatchHook
  ): () => void;
  /**
   * Call original function, bypassing any hooks and ignoring any patches applied by ALL mods.
   * @param functionName - Name of function to call. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   * @param args - Arguments to use for the call
   * @param context - `this` context to use. Defaults to `window`. If calling method of object, then set this to the object itself (e.g. `functionName` = `Player.CanChange` then `context` = `Player`)
   */
  callOriginal(
    functionName: string,
    args: unknown[],
    context?: unknown
  ): unknown;
  /**
   * Patch a BC function
   *
   * **This method is DANGEROUS** to use and has high potential to conflict with other mods.
   *
   * Only use it if what you are trying to accomplish can't be done easily with `hookFunction`.
   *
   * This function tranforms BC function to string, replaces patches as pure text and then `eval`uates it.
   * If you don't know what this means, please avoid this function.
   * @param functionName - Name of function to patch. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   * @param patches - Object in key: value format, where keys are chunks to replace and values are result.
   *
   * Patches from multiple calls are merged; where key matches the older one is replaced.
   * Specifying value of `null` removes patch with this key.
   */
  patchFunction(
    functionName: string,
    patches: Record<string, string | null>
  ): void;
  /**
   * Remove all patches by `patchFunction` from specified function.
   * @param functionName - Name of function to patch. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   */
  removePatches(functionName: string): void;
  /**
   * Get hash of original function in CRC32.
   *
   * The hash is computed from source obtained using `toString` with line endings normalized to LF
   * @param functionName - Name of function. Can contain dots to change methods in objects (e.g. `Player.CanChange`)
   */
  getOriginalHash(functionName: string): string;
}

/**
 * Info about a mod registered within the Mod SDK
 * @public
 */
export declare interface ModSDKModInfo {
  name: string;
  version: string;
}

/**
 * Info about a function modified using the API
 * @public
 */
export declare interface PatchedFunctionInfo {
  name: string;
  /** CRC32 has of the original function */
  originalHash: string;
  /** List of names of mods that hooked this function */
  hookedByMods: string[];
  /** List of names of mods that patched this function */
  patchedByMods: string[];
}

/**
 * This is how hook from mod looks like.
 *
 * As first argument it receives all arguments the original function received.
 *
 * As second argument special `next` function that should be used to call original function (or next function in the hook chain).
 *
 * The return value is then used as return value instead of original one.
 * @public
 */
export declare type PatchHook = (
  args: unknown[],
  next: (modifiedArgs: unknown[]) => unknown
) => unknown;

export {};

// BCE

declare global {
  var BCE_VERSION: string;
  var bceSendAction: (text: string) => void;
  var bceSettingValue: (key: string) => boolean | number;
  var bce_initializeDefaultExpression: () => void;
  var bceUpdatePasswordForReconnect: () => void;
  var bceMessageReplacements: (msg: string) => string;
  var bce_EventExpressions: { [key: string]: Expression };
  var bceClearPassword: (name: string) => void;
  var bceClearCaches: () => Promise<void>;
  var bce_ArousalExpressionStages: ArousalExpressionStages;
  var bce_ActivityTriggers: ActivityTrigger[];
  var ActivityDictionary: string[][];
  var DialogDrawActivityMenu: (C: Character) => void;
  var CommandParse: (msg: string) => void;
  var Player: Character;
  var WardrobeSize: number;
  var WardrobeOffset: number;
  var ServerAccountUpdate: AccountUpdater;
  var ChatRoomCurrentTime: () => string;
  var LZString: LZStringType;
  var ElementIsScrolledToEnd: (element: string) => boolean;
  var ElementScrollToEnd: (element: string) => void;
  var ServerBeep: ServerBeep;
  var ServerSend: (event: string, data: unknown) => void;
  var GameVersion: string;
  var GLVersion: string;
  var InventoryItemMiscLoversTimerPadlockDraw: () => void;
  var InventoryItemMiscLoversTimerPadlockClick: () => void;
  var InventoryItemMiscLoversTimerPadlockExit: () => void;
  var InventoryItemMiscLoversTimerPadlockLoad: () => void;
  var InventoryItemMiscMistressTimerPadlockDraw: () => void;
  var InventoryItemMiscMistressTimerPadlockClick: () => void;
  var InventoryItemMiscMistressTimerPadlockExit: () => void;
  var InventoryItemMiscMistressTimerPadlockLoad: () => void;
  var InventoryItemMiscOwnerTimerPadlockDraw: () => void;
  var InventoryItemMiscOwnerTimerPadlockClick: () => void;
  var InventoryItemMiscOwnerTimerPadlockExit: () => void;
  var InventoryItemMiscOwnerTimerPadlockLoad: () => void;
  var InventoryItemMiscTimerPasswordPadlockDraw: () => void;
  var InventoryItemMiscTimerPasswordPadlockClick: () => void;
  var InventoryItemMiscTimerPasswordPadlockExit: () => void;
  var InventoryItemMiscTimerPasswordPadlockLoad: () => void;
  var DialogFocusSourceItem: Item | null;
  var DialogFocusItem: Item | null;
  var ElementCreateInput: (
    id: string,
    type: string,
    value: string,
    maxlength: string
  ) => HTMLInputElement;
  var ElementPosition: (
    id: string,
    x: number,
    y: number,
    w: number,
    h?: number
  ) => void;
  var ElementRemove: (id: string) => void;
  var ElementValue: (id: string, newValue?: string) => string;
  var CurrentScreen: string;
  var ChatRoomCharacterItemUpdate: (C: Character, group: string) => void;
  var ChatRoomCharacterUpdate: (C: Character) => void;
  var ChatRoomCreateElement: () => void;
  var CharacterGetCurrent: () => Character;
  var ChatRoomCharacter: Character[];
  var Character: Character[];
  var ChatRoomTargetMemberNumber: number;
  var bcx: { getCharacterVersion: (memberNumber: number) => string };
  var PreferenceSubscreenList: string[];
  var PreferenceSubscreen: string;
  var PreferenceMessage: string;
  var MainCanvas: HTMLCanvasElement;
  var DrawText: (
    text: string,
    x: number,
    y: number,
    color: string,
    backColor?: string
  ) => void;
  var DrawTextFit: (
    text: string,
    x: number,
    y: number,
    w: number,
    color: string,
    backColor?: string
  ) => void;
  var DrawButton: (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: string,
    image?: string,
    hoveringText?: string,
    disabled?: boolean
  ) => void;
  var DrawCheckbox: (
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    isChecked: boolean,
    disabled?: boolean,
    textColor?: string,
    checkImage?: string
  ) => void;
  var DrawImageResize: (
    image: string,
    x: number,
    y: number,
    w: number,
    h: number
  ) => boolean;
  var MouseIn: (x: number, y: number, w: number, h: number) => boolean;
  var TextLoad: (id?: string) => void;
  var TextGet: (id: string) => string;
  var StruggleDrawLockpickProgress: (C: Character) => void;
  var StruggleLockPickOrder: number[];
  var SkillGetWithRatio: (skillType: string) => number;
  var LoginRun: () => void;
  var LoginClick: () => void;
  var CurrentScreenFunctions: ScreenFunctions;
  var ServerIsConnected: boolean;
  var LoginSubmitted: boolean;
  var LoginSetSubmitted: () => void;
  var ServerConnect: () => void;
  var ServerDisconnect: (data: unknown, close?: boolean) => void;
  var PoseFemale3DCG: ClubPose[];
  var ServerSocket: ServerSocket;
  var Commands: Command[];
  var CharacterSetActivePose: (
    C: Character,
    newPose: string | string[],
    force: boolean
  ) => void;
  var CharacterSetFacialExpression: (
    C: Character,
    assetGroup: string,
    expression: string,
    timer?: number,
    color?: string | string[]
  ) => void;
  var CommonColorIsValid: (color: string | string[]) => boolean;
  var ActivityChatRoomArousalSync: (C: Character) => void;
  var ServerAppearanceBundle: (appearance: Item[]) => ItemBundle[];
  var ServerAppearanceLoadFromBundle: (
    C: Character,
    assetFamily: string,
    bundle: ItemBundle[],
    sourceMemberNumber?: number,
    appearanceFull?: boolean
  ) => boolean;
  var CharacterRefresh: (
    C: Character,
    push?: boolean,
    refreshDialog?: boolean
  ) => void;
  var AppearanceExit: () => void;
  var AppearanceLoad: () => void;
  var AppearanceRun: () => void;
  var AppearanceClick: () => void;
  var CharacterAppearanceMode: string;
  var CharacterAppearanceSelection: Character;
  var DialogDrawItemMenu: (C: Character) => void;
  var InventoryGet: (C: Character, groupName: string) => Item | null;
  var DialogDraw: () => void;
  var DialogClick: () => void;
  var CurrentCharacter: Character;
  var GLDrawCanvas: HTMLCanvasElement & {
    GL: { textureCache: Map<unknown, unknown> };
  };
  var GLDrawResetCanvas: () => void;
  var WardrobeFixLength: () => void;
  var ChatRoomDrawCharacterOverlay: (
    C: Character,
    charX: number,
    charY: number,
    zoom: number,
    pos: number
  ) => void;
  var ChatRoomHideIconState: number;
  var CharacterAppearanceWardrobeLoad: (C: Character) => void;
  var ChatRoomData: { Background: string; Name: string };
  var WardrobeBackground: string;
  var WardrobeLoad: () => void;
  var WardrobeRun: () => void;
  var WardrobeClick: () => void;
  var WardrobeExit: () => void;
  var WardrobeCharacter: Character[];
  var WardrobeFastLoad: (
    C: Character,
    position: number,
    update?: boolean
  ) => void;
  var WardrobeFastSave: (
    C: Character,
    position: number,
    update?: boolean
  ) => void;
  var SpeechGarbleByGagLevel: (
    level: number,
    dialogText: string,
    ignoreOOC?: boolean
  ) => string;
  var SpeechGetTotalGagLevel: (C: Character) => number;
  var ChatRoomResize: (load: boolean) => void;
  var ChatRoomRun: () => void;
  var ChatRoomClick: () => void;
  var DrawBackNextButton: (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    color: string,
    image?: string,
    labelPrevious?: () => string,
    labelNext?: () => string,
    disabled?: boolean,
    arrowWidth?: number,
    tooltipPosition?: Position
  ) => void;
  var MouseX: number;
  var MouseY: number;
  var ActivitySetArousal: (C: Character, progress: number) => void;
  var ActivitySetArousalTimer: (
    C: Character,
    activity: Record<string, unknown>,
    zone: string,
    progress: number
  ) => void;
  var ActivityTimerProgress: (C: Character, progress: number) => void;
  var TimerProcess: (timestamp: number) => void;
  var ChatRoomListManipulation: (
    list: number[] | null,
    adding: boolean,
    memberNumber: string | number
  ) => void;
  var ServerOpenFriendList: () => void;
  var ServerAccountBeep: (data: Record<string, unknown>) => void;
  var ServerClickBeep: () => void;
  var BCX_Loaded: boolean;
  var BCX_SOURCE: string;
  var StartBcUtil: () => void;
  var PreferenceSubscreenBCESettingsLoad: () => void;
  var PreferenceSubscreenBCESettingsExit: () => void;
  var PreferenceSubscreenBCESettingsRun: () => void;
  var PreferenceSubscreenBCESettingsClick: () => void;
  var OnlineGameAllowChange: () => boolean;
  var ChatRoomKeyDown: (event: KeyboardEvent) => void;
  var FriendListBeepLog: Beep[];
  var FriendListModeIndex: number;
  var FriendListShowBeep: (id: number) => void;
  var DialogCanUnlock: (C: Character, item: Item) => boolean;
  var CommandExecute: (msg: string) => void;
  var ManagementMistress: NPC;
  var CommonSetScreen: (category: string, screen: string) => void;
  var ChatRoomLeashPlayer: number;
  var ChatRoomClearAllElements: () => void;
  var bceGotoRoom: (room: string) => void;
  var DialogLeave: () => void;
  var ChatRoomStart: (
    space: string,
    game: string,
    leaveRoom: string,
    background: string,
    bgTagList: string[]
  ) => void;
  var BackgroundsTagList: string[];
  var ChatRoomJoinLeash: string;
  var bceStartClubSlave: () => Promise<void>;
  var bceSendToClubSlavery: () => void;
  var bceCanSendToClubSlavery: () => boolean;
  var ChatRoombceSendToClubSlavery: () => void;
  var ChatRoombceCanSendToClubSlavery: () => boolean;
  var CharacterSetCurrent: (C: Character) => void;
  var CommonCSVCache: { [key: string]: string[][] };
  var CharacterBuildDialog: (C: Character, csv: string[][]) => void;
  var ChatRoomMessage: (data: ChatMessage) => void;
  var ChatRoomSyncPose: (data: {
    MemberNumber: number;
    Character?: Character;
    Pose: string | string[];
  }) => void;
  var ChatRoomSendChat: (skipHistory?: boolean) => void;
  var Asset: Asset[];
  var AssetGroup: AssetGroup[];
  var CharacterDecompressWardrobe: (
    wardrobe: ItemBundle[][] | string
  ) => ItemBundle[][];
  var CharacterCompressWardrobe: (wardrobe: ItemBundle[][]) => string;
  var CharacterAppearanceWardrobeOffset: number;
  var MainRun: (time: DOMHighResTimeStamp) => void;
  var NotificationRaise: (
    eventType: "Beep",
    data: Record<string, unknown>
  ) => void;
  var NotificationReset: (eventType: "Beep") => void;
  var AudioPlayInstantSound: (src: string, volume?: number) => void;
}
declare global {
  interface Window {
    InputChat?: HTMLTextAreaElement;
    MainCanvas: HTMLCanvasElement;
  }
  type Passwords = Record<string, string>;
  type Settings = Record<string, boolean> & { version?: number };
  type SettingsCategory =
    | "performance"
    | "chat"
    | "activities"
    | "immersion"
    | "appearance"
    | "addons"
    | "misc"
    | "cheats";
  type DefaultSetting = {
    label: string;
    value: boolean;
    sideEffects: (newValue: boolean) => void;
    category: SettingsCategory;
  };

  type DefaultSettings = Readonly<Record<string, DefaultSetting>>;
  type Duration = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  type ArousalSettings = {
    Progress: number;
    OrgasmCount: number;
    OrgasmStage: number;
    AffectExpression: boolean;
  };
  type OnlineSettings = {
    BCE: string;
    BCEWardrobe: string;
  };
  type OnlineSharedSettings = {
    GameVersion: string;
  };
  type ChatSettings = {
    ColorTheme: string;
  };
  type NPC = {
    Stage: string;
    CurrentDialog: string;
  } & Character;
  type Character = {
    ArousalSettings: ArousalSettings;
    OnlineSettings: OnlineSettings;
    OnlineSharedSettings: OnlineSharedSettings;
    ChatSettings: ChatSettings;
    AudioSettings: { PlayBeeps?: boolean };
    MemberNumber: number;
    Name: string;
    AccountName: string;
    Creation: number;
    Appearance: Item[];
    AppearanceLayers: ItemLayer[];
    Wardrobe: ItemBundle[][];
    FocusGroup: AssetGroup;
    ActivePose: string[] | null;
    BCE: string;
    BCEArousal: boolean;
    BCECapabilities: string[];
    BCEArousalProgress: number;
    BCEEnjoyment: number;
    /** @deprecated */
    BCEWardrobe?: string;
    IsPlayer: () => boolean;
    IsOnline: () => boolean;
    CanChange?: () => boolean;
    CanChangeOwnClothes?: () => boolean;
    CanInteract: () => boolean;
    BlackList: number[];
    GhostList: number[];
    FriendList: number[];
    LastChatRoom: string;
    LastChatRoomPrivate: boolean;
    FriendNames: Map<number, string>;
    LabelColor: string;
    Ownership: {
      Name: string;
      MemberNumber: number;
      Start: number;
      Stage: number;
    };
    Dialog: {
      Function: string;
      NextStage: string;
      Option: string;
      Prerequisite: string;
      Result: string;
      Stage: string;
      Modded?: boolean;
    }[];
  };
  type BcUtilBeepType = {
    version: 0;
    type: "BcuVersionRequest" | "BcuVersionResponse" | "BcuMessage";
    messageType?: "Message" | "Emote" | "Action";
    message?: string;
    messageColor?: string;
  };
  type Beep = {
    Message?: string;
    Private?: boolean;
    Time?: Date;
    IsSecret?: boolean;
    BeepType?: string | BcUtilBeepType;
    MemberNumber: number;
    MemberName?: string;
    ChatRoomName?: string;
    Sent?: boolean;
  };
  type AccountUpdater = {
    QueueData: (data: Partial<Character>, force?: boolean) => void;
  };
  type LZStringType = {
    compressToBase64: (data: string) => string;
    compressToUTF16: (data: string) => string;
    decompressFromBase64: (data: string) => string;
    decompressFromUTF16: (data: string) => string;
  };
  type ServerBeep = {
    Timer: number;
    MemberNumber?: number;
    Message: string;
    ChatRoomName?: string;
    IsMail?: boolean;
    ClickAction?: "FriendList";
  };
  type ItemProperty = {
    RemoveTimer?: number;
    ShowTimer?: boolean;
    Intensity?: number;
    Expression?: string;
    OverridePriority?: number;
    LockMemberNumber?: number;
    LockedBy?: string;
  };
  type AssetGroup = {
    Name: string;
    Description: string;
    Category: "Appearance" | "Item";
    AllowNone: boolean;
    BodyCosplay: boolean;
    Clothing: boolean;
    Asset: Asset[];
  };
  type Asset = {
    Name: string;
    Group: AssetGroup;
    Description: string;
    Color: string;
    MaxTimer?: number;
  };
  type ItemLayer = Item & { Priority?: number };
  type Item = {
    Asset: Asset;
    Difficulty?: number;
    Color?: string | string[];
    Property?: ItemProperty;
  };
  type ItemBundle = {
    Group: string;
    Name: string;
    Difficulty?: number;
    Color?: string | string[];
    Property?: ItemProperty;
  };
  type ScreenFunctions = {
    Run: (time: number) => void;
    Click: (event: MouseEvent | TouchEvent) => void;
    Resize?: (load: boolean) => void;
  };
  type ArousalExpressionStage = {
    Expression: string | null;
    Limit: number;
  };
  type ArousalExpressionStages = Record<string, ArousalExpressionStage[]>;
  type ClubPose = {
    Name: string;
    Category?: string;
    AllowMenu?: boolean;
  };
  type ExpressionStage = {
    Id?: number;
    Expression?: string | null;
    ExpressionModifier?: number;
    Duration: number;
    Priority?: number;
    Skip?: boolean;
    Color?: string;
    Applied?: boolean;
  };
  type ExpressionStages = Record<string, ExpressionStage[]>;
  type Pose = {
    Id?: number;
    Pose: string[] | PoseEx[];
    Duration: number;
    Priority?: number;
  };
  type PoseEx = {
    Pose: string;
    Category?: string;
  };
  type Expression = {
    Type: string;
    Duration: number;
    Priority?: number;
    Expression?: ExpressionStages;
    Poses?: Pose[];
  };
  type EventParams = {
    At?: number;
    Until?: number;
    Id?: number;
  };
  type ExpressionEvent = Expression & EventParams;
  type ActivityTriggerMatcher = {
    Tester: RegExp;
    Criteria?: {
      TargetIsPlayer?: boolean;
      SenderIsPlayer?: boolean;
      DictionaryMatchers?: Record<string, string>[];
    };
  };
  type ActivityTrigger = {
    Event: string;
    Type: string;
    Matchers: ActivityTriggerMatcher[];
  };
  type ServerSocket = {
    on: (
      event:
        | "connect"
        | "disconnect"
        | "ServerInfo"
        | "CreationResponse"
        | "LoginResponse"
        | "LoginQueue"
        | "ForceDisconnect"
        | "ChatRoomSearchResult"
        | "ChatRoomSearchResponse"
        | "ChatRoomCreateResponse"
        | "ChatRoomUpdateResponse"
        | "ChatRoomSync"
        | "ChatRoomSyncMemberJoin"
        | "ChatRoomSyncMemberLeave"
        | "ChatRoomSyncRoomProperties"
        | "ChatRoomSyncCharacter"
        | "ChatRoomSyncSwapPlayers"
        | "ChatRoomSyncMovePlayer"
        | "ChatRoomSyncReorderPlayers"
        | "ChatRoomSyncSingle"
        | "ChatRoomSyncExpression"
        | "ChatRoomSyncPose"
        | "ChatRoomSyncArousal"
        | "ChatRoomSyncItem"
        | "ChatRoomMessage"
        | "ChatRoomAllowItem"
        | "ChatRoomGameResponse"
        | "PasswordResetResponse"
        | "AccountQueryResult"
        | "AccountBeep"
        | "AccountOwnership"
        | "AccountLovership",
      data: unknown
    ) => void;
    io: { connect: () => void; disconnect: () => void };
  };
  type Command = {
    Tag: string;
    Description?: string;
    Reference?: string;
    Action?: (args: string, msg: string, parsed: string[]) => void;
    Prerequisite?: () => boolean;
    AutoComplete?: (parsed: string[], low: string, msg: string) => void;
    Clear?: false;
  };
  type Position = {
    X: number;
    Y: number;
    Width: number;
    Height: number;
  };
  type Friend = {
    MemberName: string;
    MemberNumber: number;
  };
  type BCEActivity = "ClubSlavery";
  type BCEMessage = {
    type: string;
    version: string;
    capabilities?: string[];
    alternateArousal?: boolean;
    replyRequested?: boolean;
    progress?: number;
    enjoyment?: number;
    activity?: BCEActivity;
  };
  type ChatMessageDictionary = {
    Tag?: string;
    message?: BCEMessage;
    MemberNumber?: number;
  };
  type ChatMessageBase = {
    Type: string;
    Content: string;
    Sender?: number;
    Target?: number;
  };
  type ChatMessage = ChatMessageBase & {
    Dictionary: ChatMessageDictionary[];
  };
  type BCEChatMessage = ChatMessageBase & {
    Dictionary: { message: BCEMessage };
  };
  type ChatRoomSyncMemberJoinEvent = {
    MemberNumber: number;
    Character: Character;
  };
  type ChatRoomSyncSingleEvent = {
    Character?: Character;
    SourceMemberNumber: number;
  };
  type ChatRoomSyncItemEvent = {
    Item: {
      Name: string;
      Target: number;
      Group: string;
    };
    Source: number;
  };
}