export interface InputProcessorInterface{
    toBinary():string[] | Promise<string[]>;
    parseBinary(binary:string|string[]):any;
}