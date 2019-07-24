import { ITranslatable } from "../../../interfaces/itranslatable.interface";

export class MeanOfControlDescriptionGet implements ITranslatable {
    constructor(public id: number,
        public languageId: number,
        public language: string,
        public value: string){}
}