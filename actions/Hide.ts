import type { ActionInterface } from "../types/ActionInterface";
import { start, get, stop } from "prompt";
import { default_ } from "../config/password";
import { Stega } from "../facade/Stega";
import { Validator } from "../utils/Validator";
import  {join} from "path";
import * as process from "process"

export class Hide implements ActionInterface {
  async execute(input: string, message?: string, output?: string,options:{target:string} = {target:process.cwd()}): Promise<void> {
    try {
		const target=options?.target;
		
      const { outputImage, messageToHide, password } = await Hide.collectInputs(message, output);
	  const absoluteoutputimage = Hide.joinOutput(target,outputImage as string);
	  Hide.validateFiles(input, absoluteoutputimage as string);
      await Hide.hideMessage(input, absoluteoutputimage as string, messageToHide as string, password);
      Hide.showSuccess(absoluteoutputimage as string, messageToHide as string);
    } catch (error: any) {
		Hide.handleError(error);
    }
  } 
  private static joinOutput(path:string,file:string):string{
	return join(path,file);
  }

  private static async collectInputs(message?: string, output?: string) {
    const prompts: any[] = [default_];
    if (!output) {
      prompts.push({
        name: "outputImage",
        description: "Enter output image name (.png)",
        require: true,
      });
    }

    if (!message) {
      prompts.push({
        name: "messageToHide",
        description: "Enter the message to hide",
        require: true,
      });
    }

    start();
    const answers = await get(prompts);
    stop();

    return {
      outputImage: output ?? answers.outputImage,
      messageToHide: message ?? answers.messageToHide,
      password: answers.password as string,
    };
  }

  private static validateFiles(input: string, outputImage: string) {
    if (!Validator.lastMustBe(input, ".png") || !Validator.lastMustBe(outputImage, ".png")) {
      throw new Error("❌ Input and output files must have .png extension");
    }
  }

  private static async hideMessage(input: string, output: string, message: string, password: string) {
    await Stega.hide(input, output, message, password);
  }

  private static showSuccess(output: string, message: string) {
    console.log("✅ Message successfully hidden!");
    console.log("\t📝 Message:", message);
    console.log("\t💾 Saved to:", output);
  }

  private static handleError(error: unknown) {
    const err = error as Error;
    console.error("❌ Failed to hide message:", err.message || error);
  }
}
