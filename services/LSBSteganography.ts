import type { InputProcessorInterface } from "../types/InputProcessorInterface";
import type { SteganographyInterface } from "../types/SteganographyInterface";

export class LSBSteganography implements SteganographyInterface{
    constructor(
        private processor?:InputProcessorInterface
    ){}
    async hide(cover:string[],message:string[]): Promise<string[]> {
        const joinedMessage = message.join('');
        
        const messageSize = joinedMessage.length;
        let coverClone = cover;
        
        this.scan(coverClone,function(value:string,index:number){
            if(messageSize > index){
                const bit = parseInt(joinedMessage[index])
                const newValue = LSBSteganography.replaceLSB(value,bit);
                
                
                coverClone[index] = newValue;                
            }
            
        });
        return coverClone;
        

    }

    reveal(stegaBinary:string[],binaryLength:number): string {
        const messageSize = binaryLength;
        const stegaCLone = stegaBinary;
        let revealMessage = "";
        this.scan(stegaCLone,function(value:string,index:number){
            if(messageSize > index){
                const binaryLastIndex = value.length -1;
                const bit = value[binaryLastIndex];
                revealMessage += bit;            
            }
            
        });
        return revealMessage
        
    }

    private scan(cover:string[],callback:Function){
        cover.forEach(function(value:string,index:number){
            callback(value,index);
        })
    }

    static replaceLSB(binaryString:string, replaceWith:number) {
        if (replaceWith !== 0 && replaceWith !== 1) {
          throw new Error("replaceWith must be either 0 or 1");
        }
      
        let modifiedString =binaryString.split('');
        for (const char of binaryString) {
          if (!/^0|1$/.test(char)) {
            throw new Error(`Invalid binary string character: ${char}`);
          }
          const bit = replaceWith.toString();
          modifiedString.pop()
          modifiedString.push(bit);
          return modifiedString.join('');
        }
      
        return modifiedString.join("");
      }

    
}