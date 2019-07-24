import { ResponsibleGet } from "./responsible-get.model";
import { LocationGet } from "./location-get.model";

export class ActionPlanGet {
    id: number;
    categoryId: number;
    subCategoryId: number;
    sourceId: number;
    responsible: ResponsibleGet;
    status: string;
    description: string;
    actionTaken: string;
    initialDueDate: Date;
    dueDate: Date;
    completionDate: Date;
    closingDate: Date;
    comment: string;
    feedbackEmails: string[];
    location: LocationGet;
}