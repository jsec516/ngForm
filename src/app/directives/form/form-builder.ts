import { Directive, ElementRef } from 'angular2/core';

import {FormHandler} from './form-handler';

@Directive({
    selector: '[ng2-formish]',
    properties: ['handler'],
    host: {
        '(ngSubmit)': 'onSubmit()'
    }
})
export class FormBuilder {
    public handler: FormHandler;
    private submittedForm: any;
    constructor(private element: ElementRef) {
    }

    onSubmit() {
        this.submittedForm = this.element.nativeElement;
        let length = this.submittedForm.elements.length;
        // let files = this.element.nativeElement.querySelector('input[type="file"]').files;
        this.buildForm();
        
    }

    buildForm() {
        console.log('buildform called');
        this.handler.handle(this.submittedForm)
    }
}