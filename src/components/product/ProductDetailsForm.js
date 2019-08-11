import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Button} from 'primereact/button'
import {Panel} from 'primereact/components/panel/Panel'

@inject('rootStore')
@observer
class ProductDetailsForm extends Component {
    constructor(props) {
        super(props)
    }

    viewUrl = e => {
        const { productDetailsStore } = this.props.rootStore
        const url = productDetailsStore.getProductUrl(this.props.debitid)
        if (url !== null)
            window.open(url, '_blank')
        else
            e.preventDefault()
    }

    onDataChange = e => {
        const { productDetailsStore } = this.props.rootStore
        productDetailsStore.saveLocalChanges(e, this.props.debitid)
    }

    render() {
        let { productDetails } = this.props
        if (productDetails.length > 0)
            productDetails = productDetails[0]

        return (
            <Panel header="Product Details">
                <div className="p-grid p-fluid">
                    <div className="p-col-12">
                        <label htmlFor="model">Product model</label>
                        <InputText id="model"
                                   placeholder="Type product model"
                                   defaultValue={productDetails.model}
                                   onBlur={this.onDataChange} />
                    </div>
                    <div className="p-col-12">
                        <label htmlFor="url">Product URL</label>
                        <div className="p-inputgroup">
                            <InputText id="url"
                                       placeholder="Type product URL"
                                       defaultValue={productDetails.url}
                                       onBlur={this.onDataChange}/>
                            {productDetails.url ? (
                            <Button icon="pi pi-eye"
                                    className="p-button-success"
                                    tooltip="View URL"
                                    onClick={this.viewUrl} />
                            ) : (
                            <span className="p-inputgroup-addon">
                                        <i className="pi pi-eye" />
                                    </span>
                            )}
                        </div>
                    </div>
                    <div className="p-col-12">
                        <label htmlFor="serialno">Product serial number</label>
                        <InputText id="serialno"
                                   placeholder="Type product serial number"
                                   defaultValue={productDetails.serialno}
                                   onBlur={this.onDataChange} />
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="weight">Product weight</label>
                            <InputText id="weight"
                                       placeholder="Type weight"
                                       keyfilter="num"
                                       defaultValue={productDetails.weight}
                                       onBlur={this.onDataChange} />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="height">Product height</label>
                            <InputText id="height"
                                       placeholder="Type height"
                                       keyfilter="num"
                                       defaultValue={productDetails.height}
                                       onBlur={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="width">Product width</label>
                            <InputText id="width"
                                       placeholder="Type width"
                                       keyfilter="num"
                                       defaultValue={productDetails.width}
                                       onBlur={this.onDataChange} />
                        </div>
                        <div className="p-col-12 p-md-6">
                            <label htmlFor="length">Product length</label>
                            <InputText id="length"
                                       placeholder="Type length"
                                       keyfilter="num"
                                       defaultValue={productDetails.length}
                                       onBlur={this.onDataChange} />
                        </div>
                    </div>
                    <input type="hidden" id="productdetailsid" value={productDetails.productdetailsid} />
                </div>
            </Panel>
        )
    }

    static propTypes = {
        productDetails: PropTypes.array.isRequired,
        debitid: PropTypes.string
    }
}

export default ProductDetailsForm
