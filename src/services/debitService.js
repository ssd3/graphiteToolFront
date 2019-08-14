import {client} from '../httpClient/client'
import CREATE_DEBIT from '../queries/debit/createDebit.graphql'
import UPDATE_DEBIT from '../queries/debit/updateDebit.graphql'

class DebitService {

    saveDebit = async (debit) => {
        return await client.mutate({
            mutation: debit.debitid === '' ? CREATE_DEBIT : UPDATE_DEBIT,
            variables: debit
        })
    }
}

export default DebitService
