import { SeverityDescriptionGet } from "./severity-description-get.model";

export class SeverityGet {
    public id: number;
    public rate: number;
    public descriptions: SeverityDescriptionGet[];
}