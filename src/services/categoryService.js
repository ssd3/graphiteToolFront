import {client} from '../httpClient/client'
import GET_CATEGORIES from '../queries/category/getCategories.graphql'

class CategoryService {
    getCategories = async () => {
        return await client.query({
            query: GET_CATEGORIES
        })
    }
}

export default CategoryService
