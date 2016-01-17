export class FormHandler {

    private _form: FormData;
    constructor(public options: any) {
        console.log(FormData);
        
    }

    handle(submittedForm: any) {
        this._form = new FormData();
        let rawForm = submittedForm;
        this._prepareForm(rawForm);
        this._xhrTransport();
        // console.log(this._form['getAll']());
    }

    _processFiles(element: any) {
        console.log('processfile called with ', element.files);
        for (var i = 0; i < element.files.length; i++) {
             console.log(element.name, element.files[i], element.files[i].name);
            this._form.append(element.name, element.files[i], element.files[i].name);
        }
    }

    _prepareForm(rawForm) {
        // console.log('raw called with ', rawForm);
        let elements = rawForm.elements;
        
        // console.log(elements.length);
        let data: Array<any> = [];
        console.log(elements.length);
        for (var e = 0; e < elements.length; e++) {
            // console.log(elements[e].type);
            if (elements[e].type === 'file') {
                this._processFiles(elements[e]);
                // console.log('files are here', elements[e].name);
            } else {
                this._form.append(elements[e].name, elements[e].value);
            }

        }
    }

    private _parseHeaders(headers: any) {
        let parsed: any = {}, key: any, val: any, i: any;

        if (!headers) {
            return parsed;
        }

        headers.split('\n').map((line: any) => {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();

            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });

        return parsed;
    }

    private _transformResponse(response: any, headers: any): any {
        // todo: ?
        /*var headersGetter = this._headersGetter(headers);
         forEach($http.defaults.transformResponse, (transformFn) => {
         response = transformFn(response, headersGetter);
         });*/
        return response;
    }

    private _isSuccessCode(status: any) {
        return (status >= 200 && status < 300) || status === 304;
    }

    public onSuccessItem(item: any, response: any, status: any, headers: any) {
    }

    public onCompleteItem(item: any, response: any, status: any, headers: any) {
    }

    public _onCompleteItem(item: any, response: any, status: any, headers: any) {
        console.log('completed');
    }

    public onErrorItem(item: any, response: any, status: any, headers: any) {
    }

    public onCancelItem(item: any, response: any, status: any, headers: any) {
    }

    public _onErrorItem(item: any, response: any, status: any, headers: any) {
        this.onErrorItem(item, response, status, headers);
    }

    private _onCancelItem(item: any, response: any, status: any, headers: any) {
        this.onCancelItem(item, response, status, headers);
    }

    _xhrTransport() {
        let xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
        };

        xhr.onload = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            let method = '_on' + gist + 'Item';
            this._onCompleteItem('', response, xhr.status, headers);
        };

        xhr.onerror = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            this._onErrorItem('', response, xhr.status, headers);
            this._onCompleteItem('', response, xhr.status, headers);
        };

        xhr.onabort = () => {
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            let response = this._transformResponse(xhr.response, headers);
            this._onCancelItem('', response, xhr.status, headers);
            this._onCompleteItem('', response, xhr.status, headers);
        };

        xhr.open('POST', this.options.url, true);
        xhr.withCredentials = false;

        // todo
        /*item.headers.map((value, name) => {
         xhr.setRequestHeader(name, value);
         });*/

        // if (this.authToken) {
        //     xhr.setRequestHeader('Authorization', this.authToken);
        // }

        xhr.send(this._form);
        // this._render();
    }
}