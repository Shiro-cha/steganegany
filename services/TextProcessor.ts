import type { InputProcessorInterface } from "../types/InputProcessorInterface";

export class TextProcessor implements InputProcessorInterface{
    constructor(
        private textInput:string
    ){}
    toBinary(): string[]{
        const binary = this.textInput.split('').map(function(value: string, index: number, array: string[]){
            return value.charCodeAt(0).toString(2).padStart(8,'0');
        });
        return binary;
    }
    parseBinary(binary:string):any {
        return binary.match(/.{8}/g)?.map(byte=>String.fromCharCode(parseInt(byte,2))).join('')
    }
}