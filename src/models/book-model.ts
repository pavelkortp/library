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
     * Book's art.
     */
    private _image?: Express.Multer.File;

    /**
     * Clicks count on this book.
     */
    private _clicks: number

    /**
     * Book's name
     * @private
     */
    private _title: string;

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
    private _author1: string;

    /**
     * Book's rating ...
     * @private
     */
    private _rating: number;

    constructor(title: string, year: number,
        author: string, language: string,
        description: string,
        pages: number,
        rating:number,
        image?: Express.Multer.File,
        id: number = 0,
        views: number = 0,
        clicks: number = 0
    ) {
        this._rating = rating;
        this._year = year;
        this._title = title;
        this._description = description;
        this._language = language;
        this._author1 = author;
        this._pages = pages;
        this._id = id;
        this._image = image;
        this._views = views;
        this._clicks = clicks;
    }


    get rating(): number {
        return this._rating;
    }

    get title(): string {
        return this._title;
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
        return this._author1;
    }

    get pages(): number {
        return this._pages;
    }

    get id(): number {
        return this._id;
    }

    get clicks(): number {
        return this._clicks;
    }

    get image(): Express.Multer.File | undefined {
        return this._image;
    }

    get views(): number {
        return this._views;
    }
}