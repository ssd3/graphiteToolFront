import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {InputTextarea} from 'primereact/inputtextarea'
import {Panel} from 'primereact/components/panel/Panel'

@inject('rootStore')
@observer
class ProductForm extends Component {
    constructor(props) {
        super(props)
    }

    onDataChange = e => {
        const { productStore } = this.props.rootStore
        productStore.saveLocalChanges(e, this.props.debitid)
    }

    render() {
        const { product } = this.props
        return (
            <Panel header="Product">
                <div className="p-grid p-fluid">
                        <div className="p-col-12">
                            <label htmlFor="categoryid">Category</label>
                            <Dropdown id="categoryid"
                                      placeholder="Select category"
                                      value={product.category.categoryid}
                                      options={this.props.rootStore.categoryStore.categories}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="title">Product name</label>
                            <InputText id="title"
                                       defaultValue={product.title}
                                       onBlur={this.onDataChange} />
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="description">Product description</label>
                            <InputTextarea id="description"
                                           rows={9} cols={30}
                                           defaultValue={product.description}
                                           onBlur={this.onDataChange} />
                        </div>
                        <input type="hidden" id="productid" value={product.productid} />
                </div>
            </Panel>
        )
    }
    static propTypes = {
        product: PropTypes.object.isRequired,
        debitid: PropTypes.string
    }
}

export default ProductForm
