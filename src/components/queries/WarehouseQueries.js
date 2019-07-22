import gql from 'graphql-tag'

class WarehouseQueries {
    static get GET_WAREHOUSES() {
        return gql`
            {
                warehouses {
                    title
                    description
                    active
                    created
                    inField
                    out
                }
            }
        `
    }
}

export default WarehouseQueries