import {client} from '../httpClient/client'
import GET_PRODUCTS from '../queries/product/getProducts.graphql'
import CREATE_PRODUCT from '../queries/product/createProduct.graphql'
import UPDATE_PRODUCT from '../queries/product/updateProduct.graphql'
import GET_PRODUCT from '../queries/product/getProduct.graphql'

class ProductService {
    getProducts = async () => {
        return await client.query({
            query: GET_PRODUCTS
        })
    }

    getProduct = async (productid) => {
        return await client.query({
            query: GET_PRODUCT,
            variables: productid
        })
    }

    saveProduct = async (product) => {
        return await client.mutate({
            mutation: product.productid === '' ? CREATE_PRODUCT : UPDATE_PRODUCT,
            variables: product
        })
    }
}

export default ProductService
