import { Form } from 'mobx-react-form'
import dvr from 'mobx-react-form/lib/validators/DVR'
import validatorjs from 'validatorjs'

class DebitFields extends Form {
    plugins() {
        return {
            dvr: dvr(validatorjs),
        }
    }

    setup(statuses) {
        return {
            fields: [{
                    name: 'debitid',
                    rules: 'numeric',
                    type: 'hidden',
                    default: ''
                },
                {
                    name: 'tracknumber',
                    label: 'Track number',
                    placeholder: 'Type track number',
                    rules: 'required|string|between:1,64'
                },
                {
                    name: 'statusid',
                    label: 'Status',
                    rules: 'required|numeric',
                    placeholder: 'Select status'
                },
                {
                    name: 'qty',
                    label: 'Qty',
                    placeholder: 'Type product qty',
                    rules: 'numeric',
                    default: 0
                },
                {
                    name: 'price',
                    label: 'Price',
                    placeholder: 'Type product price',
                    rules: 'numeric',
                    default: 0
                },
                {
                    name: 'pricetypeid',
                    label: 'Price Type',
                    rules: 'required|numeric',
                    placeholder: 'Select price type'
                },
                {
                    name: 'discountid',
                    label: 'Discount',
                    rules: 'required|numeric',
                    placeholder: 'Select discount'
                },
                {
                    name: 'warehouseid',
                    label: 'Warehouse',
                    rules: 'required|numeric',
                    placeholder: 'Select warehouse'
                },
                {
                    name: 'notes',
                    label: 'Price notes',
                    placeholder: 'Type price notes',
                    rules: 'string|between:1,1024'
                },
                {
                    name: 'categoryid',
                    label: 'Category',
                    rules: 'required|numeric',
                    placeholder: 'Select category'
                },
                {
                    name: 'title',
                    label: 'Product name',
                    placeholder: 'Type product name',
                    rules: 'required|string|between:1,48'
                },
                {
                    name: 'description',
                    label: 'Product description',
                    placeholder: 'Type product description',
                    rules: 'string|between:1,1024'
                },
                {
                    name: 'model',
                    label: 'Product model',
                    placeholder: 'Type product model',
                    rules: 'string|between:1,128'
                },
                {
                    name: 'url',
                    label: 'Product URL',
                    placeholder: 'Type product URL',
                    rules: 'string|between:1,1024'
                },
                {
                    name: 'serialno',
                    label: 'Product serial number',
                    placeholder: 'Type serial number',
                    rules: 'string|between:1,128'
                },
                {
                    name: 'weight',
                    label: 'Product weight',
                    placeholder: 'Type product weight',
                    rules: 'numeric',
                    default: 0
                },
                {
                    name: 'height',
                    label: 'Product height',
                    placeholder: 'Type product height',
                    rules: 'numeric',
                    default: 0
                },
                {
                    name: 'width',
                    label: 'Product width',
                    placeholder: 'Type product width',
                    rules: 'numeric',
                    default: 0
                },
                {
                    name: 'lenght',
                    label: 'Product length',
                    placeholder: 'Type product length',
                    rules: 'numeric',
                    default: 0
                },
                {
                    name: 'comment',
                    label: 'Product comment',
                    placeholder: 'Type product comment',
                    rules: 'string|between:1,1024'
                }
            ],
        }
    }

    hooks() {
        return {
            onSuccess(form) {
                const store = form.store
                store.saveDebit(form.values())
                store.debitDialogShow(false)
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
