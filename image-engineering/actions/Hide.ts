import { ActionInterface } from "../types/ActionInterface";
import {start,get,stop} from "prompt";
import { default_ } from "../config/password";
import { ImageInputProcessor } from "../services/ImageProcessor";
import { TextProcessor } from "../services/TextProcessor";
import { LSBSteganography } from "../services/LSBSteganography";
import { DataService } from "../services/DataService";

export class Hide implements ActionInterface{
    async execute(input:string,message:string,output:string): Promise<void> {
        try {
	let promptInputs;     
	        let prompts:any[] = [default_];
	        if(!output){
	            prompts.push({name:"outputImage",description:"Enter the output name",require:true});
	        }
	        if(!message){
	            prompts.push({name:"messageToHide",description:"Enter message",require:true});
	        }
	        start()
	        promptInputs = await get(prompts);
	        stop()
	        const outputImage = output || promptInputs.outputImage as string;
	        const messageHide = message || promptInputs.messageToHide.toString();
	        
	        const imageProcessor = new ImageInputProcessor(input);
	        const imageBinary = await imageProcessor.toBinary();
	        const textProcessor = new TextProcessor(messageHide);
	        const textBinary = textProcessor.toBinary();
	        const stega = new LSBSteganography();
	        const stegaBinary = await stega.hide(imageBinary,textBinary);
	        const stegaBinaryBuffer = imageProcessor.parseBinary(stegaBinary);
	        await imageProcessor.saveImage(outputImage,input,stegaBinaryBuffer);
	        const textBinarySize = textBinary.join('').length;
	        const newData = new DataService();
	        newData.save({password:promptInputs.password as string ,size:textBinarySize});
	        console.log('Message hide:\n\t',messageHide);
	        console.log('Saved on:\n\t',outputImage);
            } catch (error) {
                console.error("Steganegany hide failed!!!");
                
            }
        
        
    }
}