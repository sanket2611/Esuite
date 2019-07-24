import { SelectItem } from "@im-angular/core";

export class Language {
    public id: number;
    public code: string;

    public static toSelectItem(language: Language): SelectItem {
        let result = new SelectItem();
        result.id = language.id;
        result.text = language.code;
        return result;
    }
}