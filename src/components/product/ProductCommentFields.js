import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'

class ProductFields extends Form {
    plugins() {
        return {
            dvr: dvr(validatorjs),
        }
    }

    setup() {
        return {
            fields: [{
                name: 'productcommentid',
                type: 'hidden',
                rules: 'required|numeric',
                default: null
            },
            {
                name: 'productid',
                type: 'hidden',
                rules: 'required|numeric',
                default: null
            },
            {
                name: 'debitid',
                type: 'hidden',
                rules: 'required|numeric',
                default: null
            },
            {
                name: 'comment',
                label: 'Product Comment',
                placeholder: 'Type product comment',
                rules: 'required|string|between:1,2048',
                default: ''
            }],
        }
    }

    hooks() {
        return {
            onSuccess(form) {
                const store = form.store
                store.saveLocalChanges(form.values())
            },
            onError(form) {
                const store = form.store.rootStore.debitComplexStore
                store.showErrors(form.errors())
                store.clearErrors()
            }
        }
    }
}

export default new ProductFields()
