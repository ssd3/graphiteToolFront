import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {InputText} from 'primereact/components/inputtext/InputText'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'
import Progressbar from '../common/ProgressBar'

@inject('rootStore')
@observer
class DebitDetailsForm extends Component {
    constructor(props) {
        super(props)
    }

    onDataChange = e => {
        const { debitStore } = this.props.rootStore
        debitStore.saveLocalChanges(e, this.props.debit.debitid)
    }

    render() {
        const { loading } = this.props.rootStore.debitStore
        const { debit } = this.props
        return (
            <Panel header="Product price details">
                <div className="p-grid p-fluid" style={{height: '45vh'}}>
                    <Progressbar loading={loading}/>
                    <div className="p-col-12">
                        <label htmlFor="tracknumber">Track Number</label>
                        <InputText id="tracknumber"
                                   defaultValue={debit.tracknumber}
                                   onBlur={this.onDataChange} />
                    </div>
                    <div className="p-col-12">
                        <label htmlFor="statusid">Status</label>
                        <Dropdown id="statusid"
                                  placeholder="Select Status"
                                  value={debit.status.statusid}
                                  options={this.props.rootStore.statusStore.all_statuses}
                                  onChange={this.onDataChange} />
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="qty">Qty</label>
                            <InputText id="qty"
                                       defaultValue={debit.qty}
                                       onBlur={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="price">Price</label>
                            <InputText id="price"
                                       defaultValue={debit.price}
                                       onBlur={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="pricetypeid">Price Type</label>
                            <Dropdown id="pricetypeid"
                                      placeholder="Select price type"
                                      value={debit.pricetype.pricetypeid}
                                      options={this.props.rootStore.priceTypeStore.pricetypes}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="discountid">Discount</label>
                            <Dropdown id="discountid"
                                      placeholder="Select discount"
                                      value={debit.discount.discountid}
                                      options={this.props.rootStore.discountStore.discounts}
                                      onChange={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-col-12">
                        <label htmlFor="warehouseid">Warehouse</label>
                        <Dropdown id="warehouseid"
                                  placeholder="Select warehouse"
                                  value={debit.warehouse.warehouseid}
                                  options={this.props.rootStore.warehouseStore.in_warehouses}
                                  onChange={this.onDataChange} />
                    </div>
                    <div className="p-col-12">
                        <label htmlFor="notes">Price notes</label>
                        <InputTextarea id="notes"
                                       rows={2} cols={30}
                                       defaultValue={debit.notes}
                                       onBlur={this.onDataChange} />
                    </div>

                    <input type="hidden" id="debitid" value={debit.debitid} />
                </div>

            </Panel>
        )
    }
    static propTypes = {
        debit: PropTypes.object.isRequired
    }
}

export default DebitDetailsForm
