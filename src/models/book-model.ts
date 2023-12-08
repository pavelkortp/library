/**
 * Library book representation
 */
export class BookModel {
    private _author2?: string;
    private _author3?: string;

    constructor(
        private _title: string,
        private _year: number,
        private _author1: string,
        private _language: string,
        private _description: string,
        private _pages: number,
        private _rating:number,
        private _image?: Express.Multer.File,
        private _id: number = 0,
        private _views: number = 0,
        private _clicks: number = 0,
        private _isbn:string = '0',
    ) {}


    /**
     * Book's rating ...
     * @private
     */
    get rating(): number {
        return this._rating;
    }

    /**
     * Book's name
     */
    get title(): string {
        return this._title;
    }

    /**
     * Book's short description.
     */
    get description(): string {
        return this._description;
    }

    /**
     * Book's year of publication
     */
    get year(): number {
        return this._year;
    }

    /**
     * Book's language.
     */
    get language(): string {
        return this._language;
    }

    get author(): string {
        return this._author1;
    }

    /**
     * Count of pages.
     */
    get pages(): number {
        return this._pages;
    }

    /**
     * Book's id.
     */
    get id(): number {
        return this._id;
    }

    /**
     * Clicks count on this book.
     */
    get clicks(): number {
        return this._clicks;
    }

    /**
     * Book's art.
     */
    get image(): Express.Multer.File | undefined {
        return this._image;
    }

    /**
     * Views count on this book.
     */
    get views(): number {
        return this._views;
    }


    get isbn():string{
        return this._isbn;
    }
}