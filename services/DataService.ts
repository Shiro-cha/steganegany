
import { hash } from "bun";
import { default_ } from "../config/data";
import { DataInterface } from "../types/DataInterface";
import { FileSystem } from "../utils/FileSystem";

export class DataService implements DataInterface{
    save(data:{password:string,size:number}): void {
        let savedData = JSON.parse(FileSystem.read(default_.path));
        if(!Array.isArray(savedData)){
            savedData = [];
        }
        ;
        savedData.push({
            password:hash(data.password).toString(),
            size:data.size
        });
        FileSystem.write(default_.path,JSON.stringify(savedData));

    }

    verify(password:string): number {
        let savedData = JSON.parse(FileSystem.read(default_.path));
        if(!Array.isArray(savedData)){
            throw new Error("No steganogany in the system yet...");
        }
        for (let i = 0; i < savedData.length; i++) {
            const data = savedData[i];
            const hashedPassword = hash(password).toString();
            if(hashedPassword === data?.password){
                return data?.size;
            }
            
        }
        return -1;

    }
}