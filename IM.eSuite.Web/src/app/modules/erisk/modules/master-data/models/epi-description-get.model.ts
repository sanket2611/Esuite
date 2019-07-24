import { ITranslatable } from "../../../../../interfaces/itranslatable.interface";

export class EpiDescriptionGet implements ITranslatable {
    public id: number;
    public languageId: number;
    public language: string;
    public value: string;
}