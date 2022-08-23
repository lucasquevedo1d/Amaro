import { Request, Response } from "express";
import { ProductsBusiness } from "../business/ProductsBusiness";
import { inputCreateProductDTO } from "../types/inputCreateProductsDTO";



export class ProductsController  {
 signupProducts = async (req:Request, res:Response) =>{
    try {
        const { name, tags }: inputCreateProductDTO = req.body

        const input = {
            name, 
            tags
        }
        
        await new ProductsBusiness().product(input)
        
        res.status(201).send({message: "Produto cadastrado com sucesso"})
    } catch (error: any) {
        res.status(400).send({message:error.message})
    }
 }
 getProductsbyTags = async (req:Request, res:Response) =>{
    try {
        const tags = req.body

        const resultTags = await new ProductsBusiness().getProductByTags(tags)
       
        res.status(200).send({message: resultTags})
    } catch (error:any) {
        res.status(404).send({message: error.message })
    }
    
 }

 getProductsbyId = async (req:Request, res:Response) =>{
    try {
        const id = req.body
        
        const result = await new ProductsBusiness().getProductById(id)

        res.status(200).send({message: result})
    } catch (error:any) {
        res.status(404).send({message: error.message })
    }
    
 }

 getProductsbyName = async (req:Request, res:Response) =>{
    try {
        const name = req.body
        
        const resultTags = await new ProductsBusiness().getProductByName(name)

        res.status(200).send({message: resultTags})
    } catch (error:any) {
        res.status(404).send({message: error.message })
    }
    
 }
}

