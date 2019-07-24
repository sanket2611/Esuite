import { ActionPlanSave } from "../../eaction/models/action-plan-save.model";
import { ResponsibleSave } from "../../eaction/models/responsible-save.model";
import { ActionPlanGet } from "../../eaction/models/action-plan-get.model";

export class ActionViewModel {
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

    public static getFromActionPlanGet(model: ActionPlanGet): ActionViewModel{        
        let action = new ActionViewModel();
        action.responsible = `${model.responsible.firstName} ${model.responsible.lastName}`;
        action.responsibleFirstName = model.responsible.firstName;
        action.responsibleLastName = model.responsible.lastName;
        action.status = model.status;
        action.description = model.description;
        action.actionTaken = model.actionTaken;
        action.initialDueDate = model.initialDueDate ? new Date(model.initialDueDate) : null;
        action.dueDate = model.dueDate ? new Date(model.dueDate) : null;
        action.completionDate = model.completionDate? new Date(model.completionDate): null;
        action.closingDate = model.closingDate? new Date(model.closingDate): null;
        action.comment = model.comment;
        action.feedbackEmails = model.feedbackEmails;        
        return action;
    }

    public toActionPlanSave() : ActionPlanSave{
        let action = new ActionPlanSave();
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

        if(this.initialDueDate){
            action.initialDueDate = new Date(Date.UTC(this.initialDueDate.getFullYear(), this.initialDueDate.getMonth(), this.initialDueDate.getDate()));
        }

        if(this.dueDate){
            action.dueDate = new Date(Date.UTC(this.dueDate.getFullYear(), this.dueDate.getMonth(), this.dueDate.getDate()));
        }

        action.responsible = new ResponsibleSave(this.responsibleFirstName, this.responsibleLastName);
        return action;
    }
}