/**
 * Customer Model
 */
export class Customer {
    /**
     * Default constructor with optional arguments
     * @param {number} id customer's id
     * @param {string} firstName customer's firstName
     * @param {string} lastName customer's lastName
     * @param {number} age customer's age
     */
    constructor(public id?:number,
                public firstName?:string,
                public lastName?:string,
                public age?:number) {
    }
}
