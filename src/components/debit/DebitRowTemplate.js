import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/panel'
import ProductForm from '../product/ProductForm'

class DebitRowTemplate extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //
    }

    render() {
        const { data } = this.props
        return (
            <div className="p-grid p-fluid" style={{padding: '1em'}}>
                <div className="p-col-12">
                    <div className="p-grid">
                        <div className="p-md-3">
                            <Panel header="Product">
                                <ProductForm product={data.product} debitid={data.debitid}/>
                            </Panel>
                        </div>
                        <div className="p-md-3">
                            <Panel header="Product Details">
                                <div className="p-grid">
                                    <div className="p-col-4">
                                            Label:
                                    </div>
                                    <div className="p-col-8">
                                        Control
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="p-md-3">
                            <Panel header="Product Comments">
                                <div className="p-grid">
                                    <div className="p-col-12">
                                        2
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="p-md-3">
                            <Panel header="Debit Details">
                                <div className="p-grid">
                                    <div className="p-col-12">
                                        3
                                    </div>
                                </div>
                            </Panel>
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
