import { ObservationTypeEnum } from "../enums/observation-type.enum";

export class ObservationGet {
    public id: number;
    public type: ObservationTypeEnum;
    public smateeId: number;
    public categoryId: number;
    public subCategoryId: number;
    public comment: string;
    public isImmediateAction: boolean;
    public isTf4Tf5: boolean;
    public hasImage: boolean;
    public actionPlanId: number;
}