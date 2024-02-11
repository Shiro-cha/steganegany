import {readFileSync,writeFileSync} from "fs";

export class FileSystem{
    static  read(filePath:string):string{
        const file =  readFileSync(filePath);
        return file.toString()
    }
    static  write(filePath:string,data:string):void{
        const file =  writeFileSync(filePath,data);
    }
}