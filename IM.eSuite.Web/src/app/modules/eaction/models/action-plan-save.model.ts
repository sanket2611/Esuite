import { ResponsibleSave } from "./responsible-save.model";
import { LocationSave } from "./location-save.model";

export class ActionPlanSave {
    categoryId: number;
    subCategoryId: number;
    sourceId: number;
    responsible: ResponsibleSave;
    status: string;
    description: string;
    actionTaken: string;
    initialDueDate: Date;
    dueDate: Date;
    completionDate: Date;
    closingDate: Date;
    comment: string;
    feedbackEmails: string[];
    location: LocationSave;
}