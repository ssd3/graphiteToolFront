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
                            incoming
                            outgoing
                        } 
                    }
                }
            }
        `
    }

    static get UPDATE_WAREHOUSE() {
        return gql`
        mutation Mutation($warehouseid: Int!, $title: String!, $description: String, 
  									$active: Boolean!, $incoming: Boolean!, $outgoing: Boolean!)
        {
            updateWarehouse(warehouseid: $warehouseid,
                                    title: $title,
                                    description: $description,
                                    active: $active,
                                    incoming: $incoming,
                                    outgoing: $outgoing)
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
