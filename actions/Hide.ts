import type { ActionInterface } from "../types/ActionInterface";
import {start,get,stop} from "prompt";
import { default_ } from "../config/password";
import { Stega } from "../facade/Stega";
import { Validator } from "../utils/Validator";


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
			if(!Validator.lastMustBe(outputImage,".png") || 
			!Validator.lastMustBe(input,".png")) throw new Error("Not png file");
			await Stega.hide(input,outputImage,messageHide,promptInputs.password as string);
	        console.log('Message hide:\n\t',messageHide);
	        console.log('Saved on:\n\t',outputImage);
            } catch (error:Error|unknown) {
                console.error(error.message || "Steganegany failed to hide");
                
            }
        
        
    }
}