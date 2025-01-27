import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {
    // Código assistido por IA
    static requiredMinCheckbox(min: number = 1): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
        // Mudaremos disso para programação funcional
        //  const values = formArray.controls;
        //  let totalChecked = 0;

        //  for(let i = 0; i < values.length; i++) {
        //   if(values[i].value) {
        //     totalChecked += 1;
        //   }
        //  }

        
        if(formArray instanceof FormArray){
        // "Funcional" vem de "função", "funções"
        const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);

            return totalChecked >= min ? null : { required: true };
        }
        return null;
    };
    }
}