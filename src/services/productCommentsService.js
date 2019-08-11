import {client} from '../httpClient/client'
import CREATE_PRODUCT_COMMENT from '../queries/productComment/createProductComment.graphql'
import UPDATE_PRODUCT_COMMENT from '../queries/productComment/updateProductComment.graphql'

class ProductCommentsService {
    saveProductComment = async (productComment) => {
        return await client.mutate({
            mutation: productComment.productcommentid === '' ? CREATE_PRODUCT_COMMENT : UPDATE_PRODUCT_COMMENT,
            variables: productComment
        })
    }
}

export default ProductCommentsService
