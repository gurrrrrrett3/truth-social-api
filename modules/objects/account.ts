export default class Account {
    id: string;
    username: string;
    acct: string;
    displayName: string;
    locked: boolean;
    createdAt: string;
    followersCount: number;
    followingCount: number;
    statusesCount: number;
    note: string;
    url: string;
    avatar: string;
    avatarStatic: string;
    header: string;
    headerStatic: string;
    emojis: any[];
    moved: any;
    fields: any[];
    bot: boolean;
    verified: boolean;

    constructor(data: AccountData) {
        this.id = data.id;
        this.username = data.username;
        this.acct = data.acct;
        this.displayName = data.display_name;
        this.locked = data.locked;
        this.createdAt = data.created_at;
        this.followersCount = data.followers_count;
        this.followingCount = data.following_count;
        this.statusesCount = data.statuses_count;
        this.note = data.note;
        this.url = data.url;
        this.avatar = data.avatar;
        this.avatarStatic = data.avatar_static;
        this.header = data.header;
        this.headerStatic = data.header_static;
        this.emojis = data.emojis;
        this.moved = data.moved;
        this.fields = data.fields;
        this.bot = data.bot;
        this.verified = data.verified;
    }
}