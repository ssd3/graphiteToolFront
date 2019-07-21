import gql from 'graphql-tag'

class WarehouseQueries {
    static get GET_WAREHOUSES() {
        return gql`
            {
                warehouses {
                    title 
                }
            }
        `
    }
}

export default WarehouseQueries