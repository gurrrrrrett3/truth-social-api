export default class Card {
    url: string;
    title: string;
    description: string;
    type: string;
    authorName: string;
    authorUrl: string;
    providerName: string;
    providerUrl: string;
    html: string;
    width: number;
    height: number;
    image?: string;
    embed_url: string;
    blurhash: string;

    constructor(data: CardData) {
        this.url = data.url;
        this.title = data.title;
        this.description = data.description;
        this.image = data.image;
        this.type = data.type;
        this.authorName = data.author_name;
        this.authorUrl = data.author_url;
        this.providerName = data.provider_name;
        this.providerUrl = data.provider_url;
        this.html = data.html;
        this.width = data.width;
        this.height = data.height;
        this.image = data.image;
        this.embed_url = data.embed_url;
        this.blurhash = data.blurhash;
    }
}