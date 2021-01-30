export class ErrorMessage {
    private _section: string = '';
    private _name: string = '';
    private _message: string = '';

    get section(): string { return this._section; }
    get name(): string { return this._name; }

    constructor(section: string, name: string, message: string) {
        this._section = section;
        this._name = name;
        this._message = message;
    }

    public getFormattedMessage(parameters: string[]): string {
        let message: string = this._message;
        let paramIndex: number = 0;
        
        parameters.forEach(parameter => {
            let paramIndexName: string = '{' + paramIndex + '}';
            if(message.indexOf(paramIndexName) >= 0) {
                message = message.replace(paramIndexName, parameter);                
            }
            paramIndex++;
        });
        
        return message;
    }
}