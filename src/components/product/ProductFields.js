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
                name: 'productid',
                type: 'hidden',
                rules: 'required|numeric',
                default: null
            },
            {
                name: 'categoryid',
                label: 'Category',
                placeholder: 'Select category',
                value: '',
                rules: 'required|numeric'
            },
            {
                name: 'title',
                label: 'Product Name',
                placeholder: 'Type product name',
                rules: 'required|string|between:1,48',
                default: ''
            },
            {
                name: 'description',
                label: 'Product description',
                placeholder: 'Type product description',
                rules: 'string|between:1,1024',
                default: ''
            }],
        }
    }

    hooks() {
        return {
            onSuccess(form) {
                const store = form.store
                store.saveProduct(form.values())
            },
            onError(form) {
                const store = form.store
                store.showErrors(form.errors())
                store.clearErrors()
            }
        }
    }
}

export default new ProductFields()
