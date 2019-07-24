import { ActionPlanSave } from "../models/action-plan-save.model";
import { ResponsibleSave } from "../models/responsible-save.model";
import { LocationViewModel } from "./location.viewModel";
import { LocationSave } from "../models/location-save.model";
import { ActionPlanGet } from "../models/action-plan-get.model";

export class ActionPlanViewModel {
    public categoryId: number;
    public subCategoryId: number;
    public location: LocationViewModel;
    public responsible: string;
    public responsibleFirstName: string;
    public responsibleLastName: string;
    public status: string;
    public description: string;
    public actionTaken: string;
    public initialDueDate: Date;
    public dueDate: Date;
    public completionDate: Date;
    public closingDate: Date;
    public comment: string;
    public feedbackEmails: Array<string>;

    public static getFromActionPlanGet(model: ActionPlanGet): ActionPlanViewModel {
        let action = new ActionPlanViewModel();
        action.categoryId = model.categoryId;
        action.subCategoryId = model.subCategoryId;
        action.responsible = `${model.responsible.firstName} ${model.responsible.lastName}`;
        action.responsibleFirstName = model.responsible.firstName;
        action.responsibleLastName = model.responsible.lastName;
        action.status = model.status;
        action.description = model.description;
        action.actionTaken = model.actionTaken;
        action.initialDueDate = model.initialDueDate ? new Date(model.initialDueDate) : null;
        action.dueDate = model.dueDate ? new Date(model.dueDate) : null;
        action.completionDate = model.completionDate ? new Date(model.completionDate) : null;
        action.closingDate = model.closingDate? new Date(model.closingDate): null;
        action.comment = model.comment;
        action.feedbackEmails = model.feedbackEmails;
        return action;
    }
    
    public toActionPlanSave() : ActionPlanSave{
        let action = new ActionPlanSave();
        action.categoryId = this.categoryId;
        action.subCategoryId = this.subCategoryId;

        if(this.location){
            action.location = new LocationSave();
            action.location.plantId = this.location.plantId;
            action.location.departmentId = this.location.departmentId;
            action.location.workshopId = this.location.workshopId;
            action.location.jobId = this.location.jobId;
            action.location.workstationId = this.location.workstationId;
            action.location.taskId = this.location.taskId;
        }        

        action.actionTaken = this.actionTaken;
        action.comment = this.comment;
        action.description = this.description;        
        action.feedbackEmails = this.feedbackEmails;
        action.status = this.status;

        if(this.closingDate){
            action.closingDate = new Date(Date.UTC(this.closingDate.getFullYear(), this.closingDate.getMonth(), this.closingDate.getDate()));
        }

        if(this.completionDate){
            action.completionDate = new Date(Date.UTC(this.completionDate.getFullYear(), this.completionDate.getMonth(), this.completionDate.getDate()));
        }

        if (this.dueDate) {
            action.dueDate = new Date(Date.UTC(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()));
        }

        if (this.initialDueDate) {
            action.initialDueDate = new Date(Date.UTC(this.initialDueDate.getFullYear(), this.initialDueDate.getMonth(),
                this.initialDueDate.getDate()));
        }

        action.responsible = new ResponsibleSave(this.responsibleFirstName, this.responsibleLastName);
        return action;
    }
}