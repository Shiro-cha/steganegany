export interface SteganographyInterface{
    hide(cover:string[],message:string[]):Promise<string[]> | string[];
    reveal(stegaBinary:string[],binaryLength:number):void;
}