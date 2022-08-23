import { ProductDataBase } from "../data/ProductDataBase";
import Authenticator from "../services/Authenticator";
import { IdGenerator } from "../services/idGenerator";
import { inputCreateProductDTO } from "../types/inputCreateProductsDTO"
import { inputGetProductsByIdDTO, inputGetProductsByNameDTO } from "../types/inputGetProductsDTO";
// import {  inputGetProductsDTO } from "../types/inputGetProductsDTO";


export  class ProductsBusiness  {
    product = async (input:inputCreateProductDTO) =>{
    try {
            const { name, tags } = input
            if(!name || !tags){
                throw new Error("Please, fill in all the fiels!")
            }
            const id = new IdGenerator().generate();
    
            const product = {
                id,
                name, 
                tags
            }
            await new ProductDataBase().createProduct(product)
        
       
    } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
    }
}

getProductById = async (input:inputGetProductsByIdDTO) =>{
 try {
    const { id } = input
 if(!id){
    throw new Error("Id incorrect!")
}

console.log("business input",id)
const result = await new ProductDataBase().GetProductById(id) 
return result
} catch (error:any) {
    throw new Error( error.message || error.sqlMessage);
    
 }
    
}

getProductByName = async (input:inputGetProductsByNameDTO) =>{
    try {
        const { name } = input
        if(!name){
           throw new Error("Name incorrect!")
       }

       const result = await new ProductDataBase().GetProductByName(name)
       return result
    } catch (error:any) {
        throw new Error( error.message || error.sqlMessage);
    }
}

getProductByTags = async (input:string) =>{
    try {

        const { tags } = input as any
        if(!tags){
           throw new Error("Tags invalid!")
       }

       const result = await new ProductDataBase().GetProductByTags( tags )
       console.log(result)
       return result
    } catch (error:any) {
        throw new Error( error.message || error.sqlMessage);
    }
}
}