import { Application } from "../../../models/application";
import { ApplicationUserGroup } from "../models/applicationUserGroup";

export class ApplicationViewModel extends Application {
    userGroups: Array<ApplicationUserGroup>;
}