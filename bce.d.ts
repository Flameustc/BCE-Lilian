/* eslint-disable */

import { ModSDKGlobalAPI } from "./types/bcModSdk";

export {};

declare global {
  // Dexie
  var Dexie: import("dexie").DexieConstructor;

  // FBC
  var FBC_VERSION: string;
  var fbcSendAction: (text: string) => void;
  var fbcPushEvent: (evt: ExpressionEvent) => void;
  var fbcChatNotify: (node: HTMLElement | HTMLElement[] | string) => void;
  var fbcDebug: (copy?: boolean) => Promise<string>;
  var fbcSettingValue: (key: string) => boolean | number | string;
  var bceAnimationEngineEnabled: () => boolean;
  var bce_initializeDefaultExpression: () => void;
  var bceUpdatePasswordForReconnect: () => void;
  var bceMessageReplacements: (msg: string) => string;
  var bce_EventExpressions: { [key: string]: Expression };
  var bceClearPassword: (name: string) => void;
  var bceClearCaches: () => Promise<void>;
  var fbcDisplayText: (
    original: string,
    replacements?: Record<string, string>
  ) => string;
  var bceStripBeepMetadata: (text: string) => string;
  var bce_ArousalExpressionStages: ArousalExpressionStages;
  var bce_ActivityTriggers: ActivityTrigger[];
  var PreferenceSubscreenBCESettingsLoad: () => void;
  var PreferenceSubscreenBCESettingsExit: () => void;
  var PreferenceSubscreenBCESettingsRun: () => void;
  var PreferenceSubscreenBCESettingsClick: () => void;
  var bceGotoRoom: (room: string) => void;
  var bceStartClubSlave: () => Promise<void>;
  var bceSendToClubSlavery: () => void;
  var bceCanSendToClubSlavery: () => boolean;
  // used by the game's dialog functions
  var ChatRoombceSendToClubSlavery: () => void;
  var ChatRoombceCanSendToClubSlavery: () => boolean;

  // Mod SDK
  var bcModSdk: ModSDKGlobalAPI | undefined;

  // FUSAM
  var FUSAM: FUSAMPublicAPI | undefined;

  // BCX
  var bcx:
    | import("./types/bcxExternalInterface").BCX_ConsoleInterface
    | undefined;

  var BCX_Loaded: boolean;
  var BCX_SOURCE: string;

  // Misc addon globals
  var StartBcUtil: () => void;
}
declare global {
  interface Window {
    InputChat?: HTMLTextAreaElement;
    MainCanvas: HTMLCanvasElement;
  }
  type Passwords = Record<string, string>;
  type SettingsCategory =
    | "performance"
    | "chat"
    | "activities"
    | "immersion"
    | "appearance"
    | "addons"
    | "misc"
    | "cheats"
    | "buttplug"
    | "hidden";
  type DefaultSettingBase = {
    label: string;
    type?: "boolean" | "string";
    sideEffects: (newValue: boolean | string) => void;
    category: SettingsCategory;
    description: string;
  };

  type DefaultSettingBoolean = DefaultSettingBase & {
    value: boolean;
  };

  type DefaultSettingString = DefaultSettingBase & {
    value: string;
  };

  type DefaultSetting = DefaultSettingBoolean | DefaultSettingString;

  type FBCNote = {
    note: string;
    updatedAt?: number;
  };
  type FBCDuration = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  type Craft = {
    Color: string;
    Description: string;
    Item: string;
    Lock: string;
    Name: string;
    Property: string;
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
    OverridePriority?: number | Record<string, number>;
    LockMemberNumber?: number;
    LockedBy?: string;
    Effect?: string[];
    BlinkState?: unknown;
  };
  type ItemLayer = Item & { Name: string | null; Priority?: number };
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
    Expression?: ExpressionName;
    ExpressionModifier?: number;
    Duration: number;
    Priority?: number;
    Skip?: boolean;
    Color?: string;
    Applied?: boolean;
  };
  type ExpressionStages = Record<string, ExpressionStage[]>;
  type FBCPose = {
    Id?: number;
    Pose: AssetPoseName[] | PoseEx[];
    Duration: number;
    Priority?: number;
  };
  type PoseEx = {
    Pose: AssetPoseName;
    Category?: string;
  };
  type Expression = {
    Type: string;
    Duration: number;
    Priority?: number;
    Expression?: ExpressionStages;
    Poses?: FBCPose[];
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
  type ServerSocketEvent =
    import("./node_modules/@socket.io/component-emitter/index").ReservedOrUserEventNames<
      import("./node_modules/@socket.io/component-emitter/index").DefaultEventsMap,
      ServerToClientEvents
    >;

  type Command = {
    Tag: string;
    Description?: string;
    Reference?: string;
    Action?: (args: string, msg: string, parsed: string[]) => unknown;
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
    capabilities?: readonly string[];
    alternateArousal?: boolean;
    replyRequested?: boolean;
    progress?: number;
    enjoyment?: number;
    activity?: BCEActivity;
    otherAddons?: readonly import("./types/bcModSdk").ModSDKModInfo[];
  };

  type FBCDictionaryEntry = {
    message: BCEMessage;
  };
  //   type ChatMessageDictionary = {
  //     Tag?: string;
  //     message?: BCEMessage;
  //     MemberNumber?: number;
  //     Text?: string;
  //     TargetCharacter?: number;
  //     SourceCharacter?: number;
  //   };
  //   type ChatMessageBase = {
  //     Type: string;
  //     Content: string;
  //     Sender?: number;
  //     Target?: number;
  //   };
  //   type ChatMessage = ChatMessageBase & {
  //     Dictionary: ChatMessageDictionary[];
  //   };
  type FBCCharacterState = { clamped: number };

  type FBCToySetting = {
    Name: string;
    SlotName: string;
    LastIntensity?: number;
  };
  type FBCToySyncState = {
    client?: import("./types/buttplug.io.1.0.17").ButtplugClient;
    deviceSettings: Map<string, FBCToySetting>;
  };

  type FBCSavedProfile = {
    memberNumber: number;
    name: string;
    lastNick?: string;
    seen: number;
    characterBundle: string;
  };

  type FUSAMPublicAPI = {
    present: true;
    addons: Record<string, FUSAMAddonState>;
    registerDebugMethod: (
      name: string,
      method: () => string | Promise<string>
    ) => void;
  };

  type FUSAMAddonState = {
    distribution: string;
    status: "loading" | "loaded" | "error";
  };

  type SocketEventListenerRegister = [ServerSocketEvent, SocketEventListener][];

  type SocketEventListener = () => Promise<void> | void;

  // Interface extensions
  interface Character {
    FBC: string;
    FBCOtherAddons?: readonly import("./types/bcModSdk").ModSDKModInfo[];
    BCEArousal: boolean;
    BCECapabilities: readonly string[];
    BCEArousalProgress: number;
    BCEEnjoyment: number;
    BCESeen: number;
  }
  interface PlayerOnlineSettings {
    /** @deprecated */
    BCE: string;
    /** @deprecated */
    BCEWardrobe: string;
  }
  interface ExtensionSettings {
    FBC: string;
    FBCWardrobe: string;
  }
}
