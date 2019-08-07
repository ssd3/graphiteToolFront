import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'

class DebitFields extends Form {
    plugins() {
        return {
            dvr: dvr(validatorjs),
        }
    }

    setup() {
        return {
            fields: [{
                name: 'categoryid',
                label: 'Category',
                rules: 'required|numeric'
            },
            {
                name: 'title',
                label: 'Product name',
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
            },
            {
                name: 'model',
                label: 'Product model',
                placeholder: 'Type product model',
                rules: 'string|between:1,128',
                default: ''
            },
            {
                name: 'url',
                label: 'Product URL',
                placeholder: 'Type product URL',
                rules: 'string|between:1,1024',
                default: ''
            },
            {
                name: 'serialno',
                label: 'Product serial number',
                placeholder: 'Type product serial number',
                rules: 'string|between:1,128',
                default: ''
            },
            {
                name: 'weight',
                label: 'Product weight',
                placeholder: 'Type product weight',
                rules: 'number',
                default: 0
            },
            {
                name: 'height',
                label: 'Product height',
                placeholder: 'Type product height',
                rules: 'number',
                default: 0
            },
            {
                name: 'width',
                label: 'Product width',
                placeholder: 'Type product width',
                rules: 'number',
                default: 0
            },
            {
                name: 'length',
                label: 'Product length',
                placeholder: 'Type product length',
                rules: 'number',
                default: 0
            },
            {
                name: 'comment',
                label: 'Product comment',
                placeholder: 'Type product comment',
                rules: 'string|between:1,1024',
                default: ''
            },
            {
                name: 'warehouseid',
                label: 'Warehouse',
                rules: 'required|numeric'
            },
            {
                name: 'qty',
                label: 'Product qty',
                placeholder: 'Type product qty',
                rules: 'required|number',
                default: 0
            },
            {
                name: 'price',
                label: 'Product price',
                placeholder: 'Type product price',
                rules: 'required|number',
                default: 0
            },
            {
                name: 'pricetypeid',
                label: 'Price Type',
                rules: 'required|numeric'
            },
            {
                name: 'discountid',
                label: 'Discount',
                rules: 'required|numeric'
            },
            {
                name: 'tracknumber',
                label: 'Track number',
                placeholder: 'Type track number',
                rules: 'string|between:1,64',
                default: ''
            },
            {
                name: 'statusid',
                label: 'Status',
                rules: 'required|numeric'
            },
            {
                name: 'notes',
                label: 'Debit notes',
                placeholder: 'Type debit notes',
                rules: 'string|between:1,1024',
                default: ''
            }
            ],
        }
    }

    hooks() {
        return {
            onSuccess(form) {
                const store = form.store
                store.saveDebit(form.values())
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

export default new DebitFields()
