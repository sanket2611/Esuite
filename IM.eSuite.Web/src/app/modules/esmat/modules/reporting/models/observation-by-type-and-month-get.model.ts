import { PointDateGet } from "./point-date-get.model";
import { ObservationTypeEnum } from "../../../enums/observation-type.enum";

export class ObservationByTypeAndMonthGet {
    public type: ObservationTypeEnum;
    public data: PointDateGet[];
}