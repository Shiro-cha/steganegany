import { DataService } from "../services/DataService";

export class Data{
    static async reset(){
        const dataService = new DataService();
        await dataService.reset()
    }
}