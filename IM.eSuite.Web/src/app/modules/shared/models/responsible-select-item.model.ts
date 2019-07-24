export class ResponsibleSelectItem {
    public get text(): string { return `${this.firstName} ${this.lastName}`; }

    constructor(public firstName: string, public lastName: string){}
}