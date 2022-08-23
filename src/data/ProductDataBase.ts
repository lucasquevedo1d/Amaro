import Authenticator from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";
import { inputGetProductsByIdDTO, inputGetProductsByNameDTO, inputGetProductsByTagsDTO} from "../types/inputGetProductsDTO";
import BaseDataBase from "./BaseDatabase"


export class ProductDataBase extends BaseDataBase {
    
    createProduct = async (input:any) =>{
        try {
            await BaseDataBase.connection()
                .insert({
                    id:input.id,
                    name:input.name
                })
                .into("amaro10")

                const tags = input.tags
                console.log(tags)
                

                const productsId = input.id

                for(const tag of tags){
                    const tagsid = new IdGenerator().generate()
                    await BaseDataBase.connection()
                    .insert({
                       id:tagsid,
                        tags:tag,
                        products_id:productsId
                    })
                    .into("amaro_search10")
                }
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    GetProductById = async (id:string):Promise<inputGetProductsByIdDTO> =>{
        try {
            const result = await BaseDataBase.connection
            .select("*")
            .from("amaro10")
            .where({ id })
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    GetProductByName = async (name:string):Promise<inputGetProductsByNameDTO> =>{
        try {
          const result = await BaseDataBase.connection
            .select("*")
            .from("amaro10")
            .where({ name })
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);
        }
}
GetProductByTags = async (tags:string):Promise<inputGetProductsByTagsDTO> =>{
    try {
        const data = await BaseDataBase.connection
        .select("*")
        .from("amaro_search10")
        .where({tags})
        return data[0]
    } catch (error:any) {
        throw new Error(error.sqlMessage || error.message);
    }
}
}