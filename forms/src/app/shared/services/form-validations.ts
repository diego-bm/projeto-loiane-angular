import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

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

    static async cepValidator(control: FormControl) {
        const cep = control.value;
        if(cep && cep !== '') {
            const validaCep = /^[0-9]{8}$/;
            return validaCep.test(cep) ? null : { cepInvalido: true };
        }
        
        return null;
    }

    static equalsTo(otherField: string){
        return (formControl: FormControl): ValidationErrors | null => {
            if(otherField == null) {
                throw new Error('É necessário informar um campo.');
            }

            if(!formControl.root || !(<FormGroup>formControl.root).controls){
                return null;
            }

            const field = (<FormGroup>formControl.root).get(otherField);

            if(!field){
                throw new Error('É necessário informar um campo válido.');
            }

            if(field.value !== formControl.value) {
                return { equalsTo: otherField };
            }

            return null;
        };
    }
}