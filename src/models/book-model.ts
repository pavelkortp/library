/**
 * Library book representation
 */
export class BookModel {
    /**
     * Book's id.
     */
    private _id: number;

    /**
     * Views count on this book.
     */
    private _views: number

    /**
     * Clicks count on this book.
     */
    private _clicks: number

    /**
     * Books cover image.
     */
    private _art: Buffer;

    /**
     * Book's name
     * @private
     */
    private _name: string;

    /**
     * Book's short description.
     * @private
     */
    private _description: string;

    /**
     * Book's year of publication
     * @private
     */
    private _year: number;

    /**
     * Book's language.
     * @private
     */
    private _language: string;

    /**
     * Count of pages.
     */
    private _pages: number

    /**
     * Book's author .... or s
     * @private
     */
    private _author: string;

    /**
     * Book's rating ...
     * @private
     */
    private _rating: number = 0;

    constructor(name: string, year: number,
        author: string, language: string,
        description: string, art: Buffer,
        id: number, pages: number,
        views: number = 0, clicks: number = 0
    ) {
        this._year = year;
        this._name = name;
        this._description = description;
        this._language = language;
        this._author = author;
        this._art = art;
        this._id = id;
        this._pages = pages;
        this._views = views;
        this._clicks = clicks;
    }

    get art(): Buffer {
        return this._art;
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = value;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get year(): number {
        return this._year;
    }

    get language(): string {
        return this._language;
    }

    get author(): string {
        return this._author;
    }

    get pages(): number {
        return this._pages;
    }

    get id(): number {
        return this._id;
    }

    get clicks(): number{
        return this._clicks;
    }

    get views(): number{
        return this._views;
    }
}