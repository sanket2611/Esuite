export class ApplicationUserGroup {
    id: number;
    name: string;
    applicationId: number;
    
    constructor(applicationUserGroup?:ApplicationUserGroup){
        if(!applicationUserGroup){
            return;
        }

        this.id = applicationUserGroup.id;
        this.name = applicationUserGroup.name;
        this.applicationId = applicationUserGroup.applicationId;
    }
}