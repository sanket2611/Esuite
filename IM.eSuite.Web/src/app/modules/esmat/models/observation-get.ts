import { ScheduleGet } from './schedule-get.model';
import { ObservationSubCategoryGet } from './observation-sub-category-get.model';
import { ObservationCategoryGet } from './observation-category-get.model';

export class ObservationGet {
    typeId: number;
    smateeId: number;
    categoryId: number;
    subCategoryId: number;
    comment: string;
    isImmediateAction: boolean;
    isTf4Tf5: boolean;
    schedule: ScheduleGet;
    category: ObservationCategoryGet;
    subCategory: ObservationSubCategoryGet;
}