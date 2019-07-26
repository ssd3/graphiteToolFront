import {client} from '../httpClient/client'
import ProductQueries from '../queries/ProductQueries'

async function ProductsGet(variables = {}) {
    const x = await client.query({
        query: ProductQueries.GET_PRODUCTS,
        variables: variables
    })

    return x
}

export { ProductsGet }
