export class ProductService {
    #products = null;

    getProducts() {
        this.#products = JSON.parse(localStorage.products || "[]");
        return [...this.#products];
    }

    add(product) {
        if(!this.#products) {
            this.getProducts();
        }
        this.#products.push(product);
        localStorage.products = JSON.stringify(this.#products);
        return product;
    }

    delete(product) {
        if(!this.#products) {
            this.getProducts();
        }
        const pos = this.#products.indexOf(product);
        this.#products.splice(pos, 1);
        localStorage.products = JSON.stringify(this.#products);
    }
}
