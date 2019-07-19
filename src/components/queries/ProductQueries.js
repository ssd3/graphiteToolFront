import gql from 'graphql-tag'

class ProductQueries {
    static get GET_PRODUCTS() {
        return gql`
            {
                products {
                    data: edges{
                        product: node{
                            productid
                            title
                            description
                        }
                    }
                }
            }
        `
    }
}

export default ProductQueries
