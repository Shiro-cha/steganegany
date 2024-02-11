export interface DataInterface{
    save(data:{password:string,size:number}):void;
    verify(password:string):number;
}