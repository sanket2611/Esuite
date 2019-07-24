import { SelectItem } from "@im-angular/core";
import { Person } from "./person";
import { UserGroup } from "./userGroup";
import { UserPlant } from "./userPlant";

export class ApplicationUser {
    public id: number;
    public userName:string;
    public lastName: string;
    public firstName: string;
    public email: string;
    public userGroups: Array<UserGroup>;
    public plants: Array<UserPlant>;

    constructor(user?: ApplicationUser){
        this.userGroups = new Array<UserGroup>();
        this.plants = new Array<UserPlant>();

        if(!user){
            return;
        }

        this.id = user.id;
        this.userName = user.userName;
        this.lastName = user.lastName;
        this.firstName = user.firstName;
        this.email = user.email;
        user.userGroups.forEach(ug => this.userGroups.push(new UserGroup(ug)));
        user.plants.forEach(up => this.plants.push(new UserPlant(up)));
    }

    public static getFromPerson(person: Person): ApplicationUser {
        let user = new ApplicationUser();

        if(person) {
            user.userName = person.stGoSGI;
            user.firstName = person.givenName;
            user.lastName = person.sn;
            user.email = person.mail;
        }
        return user;
    }

    public static toSelectItem(user: ApplicationUser): SelectItem {
        let item = new SelectItem();

        if(user) {
            item.id = user.id;
            item.text = `${user.userName} - ${user.firstName} ${user.lastName}`;          
        }
        return item;
    }    
}