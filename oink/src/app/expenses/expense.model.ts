export default class Expense {
    public id: string;
    public name: string;
    // public category: string;
    public amount: number;
    public createdOn: number;
    // public subExpenses?: Expense[];

    constructor(
        name: string,
        // category: string,
        amount: number,
        createdOn: number
        //  subExpenses?: Expense[])
    ) {
        this.name = name;
        // this.category = category;
        this.amount = amount;
        this.createdOn = createdOn;
        // this.subExpenses = subExpenses;
    }
}
