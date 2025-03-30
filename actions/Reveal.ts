import {get} from "prompt";
import { default_ } from "../config/password";
import { Stega } from "../facade/Stega";
import type { ActionInterface } from "../types/ActionInterface";


export class Reveal implements ActionInterface{
    async execute(input:string): Promise<void> {
        
        try {
	        let prompts:any[] = [default_];
	        const {password} = await get(prompts);
	        const message = await Stega.reveal(input,password as string);
	        console.log("Hidden message:\n\t\t", message)
        } catch (error) {
            console.error('Steganogany reveal failed!!!')
        }
    }
}