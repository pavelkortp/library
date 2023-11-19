/**
 * Library book representation
 */
class BookModel {
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
     * Book's language.
     * @private
     */
    private _language: string;

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

    constructor(name: string, author:string, language: string, description: string) {
        this._name = name;
        this._description = description;
        this._language = language;
        this._author = author;
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = value;
    }
}