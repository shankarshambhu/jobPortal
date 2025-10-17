import { AppDataSource } from "./config";
export const Connection = async () => {
    try {
        await AppDataSource.initialize();
        console.log("connected to database");

    } catch (error) {
        console.log("error",error);
        

    }
}