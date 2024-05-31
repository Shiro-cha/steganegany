import {createHmac} from "crypto"

export class PasswordHasher{
    private ALGO:string = "sha256";
    constructor(
        private SECRET = ""
    ){}

    hash(password:string){
        return createHmac(this.ALGO,this.SECRET).update(password).digest("hex");
    }

    verify(password:string,passwordHash:string){
        return passwordHash === this.hash(password);
    }
}