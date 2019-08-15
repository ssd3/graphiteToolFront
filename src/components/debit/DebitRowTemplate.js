import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ProductForm from '../product/ProductForm'
import ProductDetailsForm from '../product/ProductDetailsForm'
import ProductCommentsForm from '../product/ProductCommentsForm'
import DebitDetailsForm from './DebitDetailsForm'

class DebitRowTemplate extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data } = this.props
        return (
            <div className="p-grid p-fluid" style={{padding: '1em'}}>
                <div className="p-col-12">
                    <div className="p-grid">
                        <div className="p-md-3">
                            <DebitDetailsForm debit={data}/>
                        </div>
                        <div className="p-md-3">
                            <ProductForm product={data.product}
                                         debitid={data.debitid}/>
                        </div>
                        <div className="p-md-3">
                            <ProductDetailsForm productDetails={data.product.productdetails}
                                                debitid={data.debitid} />
                        </div>
                        <div className="p-md-3">
                            <ProductCommentsForm productComments={data.product.productcomments}
                                                 productid={data.product.productid}
                                                 debitid={data.debitid} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    static propTypes = {
        data: PropTypes.object.isRequired
    }
}


export default DebitRowTemplate
