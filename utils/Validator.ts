export class Validator{
 public static lastMustBe(content:string,str:string){

   return  content.toLocaleLowerCase().endsWith(str);

 }


}