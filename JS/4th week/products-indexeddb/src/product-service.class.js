import { ProductsDB } from "./product-db.class";

export class ProductService {
    #products = null;

    async getProducts() {
        let prodDb = await ProductsDB.getDB();
        return prodDb.getAllProducts();
    }

    async add(product) {
        let prodDb = await ProductsDB.getDB();
        return prodDb.insertProduct(product);
    }

    async delete(id) {
        let prodDb = await ProductsDB.getDB();
        await prodDb.deleteProduct(id);
    }
}
