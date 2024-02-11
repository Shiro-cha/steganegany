import {get} from "prompt";
import { default_ } from "../config/password";
import { DataService } from "../services/DataService";
import { ImageInputProcessor } from "../services/ImageProcessor";
import { LSBSteganography } from "../services/LSBSteganography";
import { TextProcessor } from "../services/TextProcessor";
import { ActionInterface } from "../types/ActionInterface";


export class Reveal implements ActionInterface{
    async execute(input:string): Promise<void> {
        
        try {
	        let prompts:any[] = [default_];
	        const {password} = await get(prompts);
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
	
	        console.log("Hidden message:\n\t\t", textProcessor.parseBinary(revealMessage))
        } catch (error) {
            console.error('Steganogany reveal failed!!!')
        }
    }
}