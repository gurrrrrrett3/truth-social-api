import Account from "./account";
import Card from "./card";

export default class Status {
    id: string;
    createdAt: string;
    inReplyToId?: string;
    inReplyToAccountId?: string;
    sensitive: boolean;
    spoilerText: string;
    visibility: string;
    language: any;
    uri: string;
    url: string;
    repliesCount: number;
    reblogsCount: number;
    favouritesCount: number;
    favourited: boolean;
    reblogged: boolean;
    muted: boolean;
    bookmarked: boolean;
    content: string;
    reblog: any;
    account: Account;
    mediaAttachments: any[];
    mentions: Mention[];
    tags: Tag[];
    emojis?: any[];
    card: Card;
    poll?: any;
    quote?: Quote;
    inReplyTo?: Inreplyto;

    constructor(data: StatusData) {
        this.id = data.id;
        this.createdAt = data.created_at;
        this.inReplyToId = data.in_reply_to_id;
        this.inReplyToAccountId = data.in_reply_to_account_id;
        this.sensitive = data.sensitive;
        this.spoilerText = data.spoiler_text;
        this.visibility = data.visibility;
        this.language = data.language;
        this.uri = data.uri;
        this.url = data.url;
        this.repliesCount = data.replies_count;
        this.reblogsCount = data.reblogs_count;
        this.favouritesCount = data.favourites_count;
        this.favourited = data.favourited;
        this.reblogged = data.reblogged;
        this.muted = data.muted;
        this.bookmarked = data.bookmarked;
        this.content = data.content;
        this.reblog = data.reblog;
        this.account = new Account(data.account);
        this.mediaAttachments = data.media_attachments;
        this.mentions = data.mentions;
        this.tags = data.tags;
        this.emojis = data.emojis;
        this.card = data.card && new Card(data.card);
        this.poll = data.poll;
        this.quote = data.quote;
        this.inReplyTo = data.in_reply_to;
    }
}