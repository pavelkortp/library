/**
 * Library book representation
 */
export class BookModel {
    constructor(
        private _title: string,
        private _year: number,
        private _authors: string[],
        private _language: string,
        private _description: string,
        private _pages: number,
        private _rating: number,
        private _image?: Express.Multer.File,
        private _isbn: string = '0',
        private _id: number = 0,
        private _views: number = 0,
        private _clicks: number = 0
    ) {
    }


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

    /**
     * Book's authors.
     */
    get authors(): string[] {
        return this._authors;
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

    /**
     * Returns unique International Standard Book Number.
     */
    get isbn(): string {
        return this._isbn;
    }
}