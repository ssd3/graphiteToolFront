import gql from 'graphql-tag'

class ProductQueries {
    static get GET_PRODUCTS() {
        return gql`
            {
                products {
                    productid
                    title
                    created
                }
                products {
                    productid
                    title
                    created
                }
            }
        `
    }
}

export default ProductQueries
