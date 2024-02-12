import { DataService } from "../services/DataService";
import { ImageInputProcessor } from "../services/ImageProcessor";
import { LSBSteganography } from "../services/LSBSteganography";
import { TextProcessor } from "../services/TextProcessor";

export class Stega{
    static async hide(input:string,output:string,message:string,password:string){
            
	        
	        const imageProcessor = new ImageInputProcessor(input);
	        const imageBinary = await imageProcessor.toBinary();
	        const textProcessor = new TextProcessor(message);
	        const textBinary = textProcessor.toBinary();
	        const stega = new LSBSteganography();
	        const stegaBinary = await stega.hide(imageBinary,textBinary);
	        const stegaBinaryBuffer = imageProcessor.parseBinary(stegaBinary);
	        await imageProcessor.saveImage(output,input,stegaBinaryBuffer);
	        const textBinarySize = textBinary.join('').length;
	        const newData = new DataService();
	        newData.save({password:password as string ,size:textBinarySize});
    }

    static async reveal(input:string,password:string){
        const dataService = new DataService();
        const messageSize = dataService.verify(password as string);
        if(messageSize===-1 || messageSize===0){
            throw new Error("Steganogany indentity not found")
        }
        const imageProcessor = new ImageInputProcessor(input);
        const imageBinary = await imageProcessor.toBinary();
        const stega = new LSBSteganography();
        const revealMessage = stega.reveal(imageBinary,messageSize);
        const textProcessor = new TextProcessor("");

        return textProcessor.parseBinary(revealMessage)
    }
}