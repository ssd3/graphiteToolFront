import {client} from '../httpClient/client'
import GET_DEBITS from '../queries/debitComplex/getDebits.graphql'
import GET_DEBIT from '../queries/debitComplex/getDebit.graphql'
import CREATE_DEBIT_COMPLEX from '../queries/debitComplex/createDebit.graphql'
import UPDATE_DEBIT_COMPLEX from '../queries/debitComplex/updateDebit.graphql'
import UPDATE_DEBITS_STATUS from '../queries/debitComplex/updateDebitsStatus.graphql'

class DebitComplexService {

    getDebitComplexByID = async (debitid) => {
        return await client.query({
            query: GET_DEBIT,
            variables: {debitid: debitid}
        })
    }

    getDebitsComplex = async (params) => {
        return await client.query({
            query: GET_DEBITS,
            variables: params
        })
    }

    saveDebitComplex = async (debit) => {
        return await client.mutate({
            mutation: debit.debitid === '' ? CREATE_DEBIT_COMPLEX : UPDATE_DEBIT_COMPLEX,
            variables: debit
        })
    }

    updateDebitsStatus = async (params) => {
        return await client.mutate({
            mutation: UPDATE_DEBITS_STATUS,
            variables: params
        })
    }
}

export default DebitComplexService
