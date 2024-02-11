import * as Jimp from "jimp";
import { InputProcessorInterface } from "../types/InputProcessorInterface";






export class ImageInputProcessor implements InputProcessorInterface{
    constructor(
        private inputImagePath:string
    ){}

     async toBinary(): Promise<string[]> {
        try {
	        const image =await Jimp.read(this.inputImagePath);
            

            return this.imageReadResolver(image);
        } catch (error) {
            this.imageReadRejector(error)
            return [];
        }
        
    }
    parseBinary(bitStrings:string[]) {
    const binaryStringToNumber = (binaryString:string) => parseInt(binaryString, 2);
    const numbers = bitStrings.map(binaryStringToNumber);

    const buffer = Buffer.from(numbers);

    return buffer;
    }
    

    async saveImage(output:string,cover:string,dataImage:Buffer){
        try {
        
        const image = await  Jimp.create(cover); 

        
       image.bitmap.data = dataImage;

     
        await image.writeAsync(output);
        
    } catch (error) {
        console.error('Error:', error);
    }
        
         
    }

    private imageReadResolver(image:Jimp):string[]{
        let binaryArray:string[] = [];
        image.bitmap.data.forEach(function(value:number){
            const binary = value.toString(2).padStart(8,"0");
            binaryArray.push(binary);
        })
        
        return binaryArray;
    }
    private imageReadRejector(error:unknown){

    }
}
