import gql from 'graphql-tag'

export const GET_STATUSES = gql`
    query getStatuses 
    {
        statuses {
            statusid
            title
            value
            created
        }
    }    
`
export const GET_STATUS = gql`
    query getStatus($statusid: Int!)
    {
        status(statusid: $statusid)
        {
            statusid
            title
            value
            created
        }
    }
`
/*
vars
{
  "statusid": 1
}
*/

export const CREATE_STATUS = gql`
    mutation createStatus($title: String!, $value: String!)
    {
        createStatus(title: $title, value: $value)
        {
            status
            {
                statusid
                title
                value
                created
            }
        }
    }
`
/*
vars
{
  "title": "Recieved",
  "value": "#000000"
}
*/

export const UPDATE_STATUS = gql`
    mutation updateStatus($statusid: Int!, $title: String!, $value: String!)
    {
        updateStatus(statusid: $statusid, title: $title, value: $value)
        {
            status
            {
                statusid
                title
                value
                created
            }
        }
    }
`
/*
vars
{
  "statusid": 2,
  "title": "Recieved",
  "value": "#dcdcdc"
}
 */
