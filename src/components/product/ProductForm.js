import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Validator from 'validatorjs'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {InputTextarea} from 'primereact/inputtextarea'
import {inject, observer} from 'mobx-react'
import _ from 'lodash'

const rules = {
    productid: 'required|numeric',
    title: 'required|string|between:1,48',
    categoryid: 'required|numeric',
    description: 'string|between:1,1024'
}

@inject('rootStore')
@observer
class ProductForm extends Component {
    constructor(props) {
        super(props)
    }

    //TODO: THIS IS A UGLY CODE !!! onDataChange should be refactored
    onDataChange = e => {
        const { debitComplexStore, productStore } = this.props.rootStore
        const debitIdx = _.findIndex(debitComplexStore.expandedRows, {debitid: this.props.debitid})
        if (debitIdx > -1) {
            debitComplexStore.clearErrors()
            const { product } = debitComplexStore.expandedRows[debitIdx]

            const updatedProduct = {
                productid: product.productid,
                categoryid: product.category.categoryid,
                title: product.title,
                description: product.description
            }
            updatedProduct[e.target.id] = e.target.value

            const validation = new Validator(updatedProduct, rules)
            if (validation.check())
                productStore.saveProduct(updatedProduct, this.props.debitid)
            else
                debitComplexStore.showErrors(validation.errors.all())
        }
    }

    render() {
        const { product } = this.props
        return (
            <div className="p-grid p-fluid">
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor="categoryid">Category</label>
                        <Dropdown id="categoryid"
                                  placeholder="Select category"
                                  value={product.category.categoryid}
                                  options={this.props.rootStore.categoryStore.categories}
                                  onChange={this.onDataChange} />
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor="title">Product name</label>
                        <InputText id="title"
                                   defaultValue={product.title}
                                   onBlur={this.onDataChange} />
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor="description">Product description</label>
                        <InputTextarea id="description"
                                       rows={5} cols={30}
                                       defaultValue={product.description}
                                       onBlur={this.onDataChange} />
                    </div>
                </div>
                <input type="hidden" id="productid" value={product.productid} />
            </div>

        )
    }
    static propTypes = {
        product: PropTypes.object.isRequired,
        debitid: PropTypes.string
    }
}

export default ProductForm
