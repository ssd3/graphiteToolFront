import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'

class StatusFields extends Form {
    plugins() {
        return {
            dvr: dvr(validatorjs),
        }
    }

    setup() {
        return {
            fields: [{
                name: 'statusid',
                type: 'hidden',
                rules: 'required|numeric',
                default: null
            },
            {
                name: 'title',
                label: 'Status Name',
                placeholder: 'Type status name',
                rules: 'required|string|between:1,48',
                default: ''
            },
            {
                name: 'color',
                label: 'Status Color',
                placeholder: '',
                rules: 'required|string|between:1,32',
                default: 'ffffff'
            }],
        }
    }

    hooks() {
        return {
            onSuccess(form) {
                const store = form.store
                store.saveStatus(form.values())
                store.showDialog(false)
            },
            onError(form) {
                const store = form.store
                store.showErrors(form.errors())
                store.clearErrors()
            }
        }
    }
}

export default new StatusFields()
