import { ValidatorFn, AbstractControl } from "@angular/forms";

export function NotEqualValidator(field: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const parentField = control.parent;
    
    if(parentField && control.value && control.value === parentField.controls[field].value){
      return { equal: true};
    }
        
    return null;
  };
}