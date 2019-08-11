import {client} from '../httpClient/client'
import GET_PRODUCT_DETAILS_BY_ID from '../queries/productDetails/getProductDetailsByID.graphql'
import GET_PRODUCT_DETAILS_BY_PRODUCTID from '../queries/productDetails/getProductDetailsByProductID.graphql'
import CREATE_PRODUCT_DETAILS from '../queries/productDetails/createProductDetails.graphql'
import UPDATE_PRODUCT_DETAILS from '../queries/productDetails/updateProductDetails.graphql'

class ProductDetailsService {
    getProductDetailsByID = async (productdetailsid) => {
        return await client.query({
            query: GET_PRODUCT_DETAILS_BY_ID,
            variables: { productdetailsid: productdetailsid}
        })
    }

    getProductDetailsByProductID = async (productid) => {
        return await client.query({
            query: GET_PRODUCT_DETAILS_BY_PRODUCTID,
            variables: { productid: productid}
        })
    }

    saveProductDetails = async (productdetails) => {
        return await client.mutate({
            mutation: productdetails.productdetailsid === '' ? CREATE_PRODUCT_DETAILS : UPDATE_PRODUCT_DETAILS,
            variables: productdetails
        })
    }
}

export default ProductDetailsService
