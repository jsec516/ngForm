import {Component, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser';
import {COMMON_DIRECTIVES} from 'angular2/common';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {FORM_HANDLER_DIRECTIVES, FormHandler} from './directives/form/ng2-form';
/* file upload directives */

class Image{
    constructor(public caption: string){
        
    }
}

// const URL = '/api/';
const URL = 'http://localhost:8000/posting/';


@Component({
    selector: 'app',
    template: require('./app.html'),
    directives: [FORM_HANDLER_DIRECTIVES]
})

export class App {
    image: Image;
    private handler:FormHandler = new FormHandler({url: URL});
    constructor() {
        // console.log(File);
        // console.log(document.body.getElementsByTagName('input'));
    }
}

