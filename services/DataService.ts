import { default_ } from "../config/data";
import type { DataInterface } from "../types/DataInterface";
import { FileSystem } from "../utils/FileSystem";
import { PasswordHasher } from "./PasswordHasher";

export class DataService implements DataInterface{
    constructor(
        private hasher = new PasswordHasher()
    ){}
    save(data:{password:string,size:number}): void {
        let savedData = JSON.parse(FileSystem.read(default_.path));
        if(!Array.isArray(savedData)){
            savedData = [];
        }
        ;
        savedData.push({
            password: this.hasher.hash(data.password),
            size:data.size
        });
        FileSystem.write(default_.path,JSON.stringify(savedData));

    }
    async reset(){
        await FileSystem.write(default_.path,JSON.stringify([]));
    }

    verify(password:string): number {
        let savedData = JSON.parse(FileSystem.read(default_.path));
        if(!Array.isArray(savedData)){
            throw new Error("No steganegany data in the system yet...");
        }
        for (let i = 0; i < savedData.length; i++) {
            const data = savedData[i];
            if(this.hasher.verify(password,data?.password)){
                return data?.size;
            }
            
        }
        return -1;

    }
}