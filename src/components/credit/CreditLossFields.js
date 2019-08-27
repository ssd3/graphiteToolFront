import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'

class CreditLossFields extends Form {
    plugins() {
        return {
            dvr: dvr(validatorjs),
        }
    }

    setup() {
        return {
            fields: [{
                name: 'creditid',
                type: 'hidden',
                rules: 'required|numeric',
                default: -1
            },
            {
                name: 'losstypeid',
                label: 'Loss type',
                placeholder: 'Select loss type',
                value: '',
                rules: 'required|numeric'
            },
            {
                name: 'rate',
                label: 'Loss rate',
                placeholder: 'Type loss rate',
                rules: 'required|numeric',
                default: 0
            },
            {
                name: 'notes',
                label: 'Notes',
                placeholder: 'Type loss notes',
                rules: 'string|between:1,1024',
                default: ''
            }],
        }
    }

    hooks() {
        return {
            onSuccess(form) {
                const store = form.store
                store.addLocalCreditLoss(form.values())
            },
            onError(form) {
                const store = form.store
                store.showErrors(form.errors())
                store.clearErrors()
            }
        }
    }
}

export default new CreditLossFields()
