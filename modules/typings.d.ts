interface CardData {
  url: string;
  title: string;
  description: string;
  type: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  html: string;
  width: number;
  height: number;
  image?: string;
  embed_url: string;
  blurhash?: string;
}

interface AccountData {
  moved: any;
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable?: any;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at: string;
  verified: boolean;
  location: string;
  website: string;
  emojis: any[];
  fields: any[];
}

interface VerifyCredentialsData {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  discoverable: boolean;
  group: boolean;
  created_at: string;
  note: string;
  url: string;
  avatar: string;
  avatar_static: string;
  header: string;
  header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  last_status_at?: any;
  verified: boolean;
  location: string;
  website: string;
  source: Source;
  pleroma: Pleroma;
  emojis: any[];
  fields: any[];
}

interface Pleroma {
  settings_store: SettingsStore;
  is_admin: boolean;
  is_moderator: boolean;
}

interface SettingsStore {
  [key: string]: any;
}

interface Source {
  privacy: string;
  sensitive: boolean;
  language?: any;
  email: string;
  approved: boolean;
  note: string;
  fields: any[];
  sms_verified: boolean;
  ready_by_sms_verification: boolean;
  follow_requests_count: number;
  unapproved_position: number;
}

interface Suggestion {
  account_id: string;
  account_avatar: string;
  acct: string;
  note: string;
  verified: boolean;
  display_name: string;
}

interface Trend {
  name: string;
  url: string;
  history: History[];
}

interface History {
  day: string;
  uses: string;
  accounts: string;
}

interface StatusData {
  id: string;
  created_at: string;
  in_reply_to_id?: string;
  in_reply_to_account_id?: string;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  content: string;
  reblog?: any;
  account: Account;
  media_attachments: ImageAttachment[];
  mentions: Mention[];
  tags: Tag[];
  emojis: any[];
  card?: Card;
  poll?: any;
  quote?: Quote;
  in_reply_to?: Inreplyto;
  quote_id?: string;
}

interface Inreplyto {
  id: string;
  created_at: string;
  in_reply_to_id?: string;
  in_reply_to_account_id?: string;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language?: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  content: string;
  quote_id?: string;
  in_reply_to?: any;
  reblog?: any;
  account: AccountData;
  media_attachments: any[];
  mentions: Mention[];
  tags: Tag[];
  emojis: any[];
  card?: CardData;
  poll?: any;
}

interface Quote {
  id: string;
  created_at: string;
  in_reply_to_id?: any;
  in_reply_to_account_id?: any;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language?: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  content: string;
  quote?: any;
  quote_muted: boolean;
  reblog?: any;
  account: AccountData;
  media_attachments: (ImageAttachment | VideoAttachment)[];
  mentions: any[];
  tags: Tag[];
  emojis: any[];
  card?: Card;
  poll?: any;
}

interface VideoAttachment {
  id: string;
  type: string;
  url: string;
  preview_url: string;
  external_video_id: string;
  remote_url?: any;
  preview_remote_url?: any;
  text_url: string;
  meta: Meta2;
  description?: any;
  blurhash?: any;
}

interface Meta2 {
  original: VideoData;
}

interface VideoData {
  width: number;
  height: number;
  frame_rate: string;
  duration: number;
  bitrate: number;
}

interface Tag {
  name: string;
  url: string;
}

interface Mention {
  id: string;
  username: string;
  url: string;
  acct: string;
}

interface ImageAttachment {
  id: string;
  type: string;
  url: string;
  preview_url: string;
  external_video_id?: any;
  remote_url?: any;
  preview_remote_url?: any;
  text_url: string;
  meta: Meta;
  description?: any;
  blurhash: string;
}

interface Meta {
  original: ImageData;
  small: ImageData;
}

interface ImageData {
  width: number;
  height: number;
  size: string;
  aspect: number;
}
