import { ApplicationUserGroup } from "./applicationUserGroup";

export class UserGroup {
    userId: number;
    applicationUserGroupId: number;
    applicationUserGroup: ApplicationUserGroup;

    constructor(userGroup?:UserGroup) {       
        
        if(userGroup){
            this.userId = userGroup.userId;
            this.applicationUserGroupId = userGroup.applicationUserGroupId;
            this.applicationUserGroup = new ApplicationUserGroup(userGroup.applicationUserGroup);
        }
        else {
            this.applicationUserGroup = new ApplicationUserGroup();
        }
    }
}