import gql from 'graphql-tag'

class WarehouseQueries {
    static get GET_WAREHOUSES() {
        return gql`
            {
                warehouses 
                {
                    data: edges
                    {
                        warehouse: node
                        {
                            warehouseid
                            title
                            description
                            active
                            created
                            inField
                            out
                        } 
                    }
                }
            }
        `
    }

    static get UPDATE_WAREHOUSE() {
        return gql`
        mutation Mutation($warehouseid: Int!, $title: String!, $description: String, 
  									$active: Boolean!, $in_field: Boolean!, $out: Boolean!)
        {
            updateWarehouse(warehouseid: $warehouseid,
                                    title: $title,
                                    description: $description,
                                    active: $active,
                                    inField: $in_field,
                                    out: $out)
            {
                warehouse
                {
                    title
                }
            }
        }
        `
    }
}

export default WarehouseQueries