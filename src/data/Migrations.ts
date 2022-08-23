import { IdGenerator } from "../services/idGenerator"
import BaseDataBase from "./BaseDatabase"
import Products from "./Products.json"
// const fs = require("fs")
// const products = fs.readFileSync("./Products.json", "utf-8")

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }
export class Migrations extends BaseDataBase {

  createTables = () => {
    BaseDataBase.connection.raw(`
        create table amaro10(
            id varchar (255)  primary key,
            name varchar(255) not null
             );
 
        create table amaro_search10(
            id varchar (255) primary key,
            tags VARCHAR (255),
            products_id varchar (255),
            FOREIGN KEY (products_id) REFERENCES amaro10(id)
        )
  `)
      .then(() => { console.log("tables created successfully") })
      .catch(printError)


  }
  insertProduct = async () => {
    try {


      for (const name of Products.products) {
        const id = new IdGenerator().generate()
        await BaseDataBase.connection("amaro10")
          .insert({
            id: id,
            name: name.name

          })
        for (const tag of name.tags) {
          const tagsid = new IdGenerator().generate()
          await BaseDataBase.connection()
            .insert({
              id: tagsid,
              tags: tag,
              products_id: id
            })
            .into("amaro_search10")
            .then(() => { console.log("Products created successfully") })
            .catch(printError)
        }
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }

  }
  closeConnection = () => {  BaseDataBase.connection() }
}


new Migrations().createTables()
new Migrations().insertProduct()
new Migrations().closeConnection()
