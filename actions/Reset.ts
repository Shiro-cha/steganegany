import { Data } from "../facade/Data";
import { ActionInterface } from "../types/ActionInterface";

export class Reset implements ActionInterface{
    async execute() {
        
    try {
	    await Data.reset();
        console.log("Reset data succesfully");
        
    } catch (error) {
        console.error("Failed to reset saved data");
        
    }
        
    }
}