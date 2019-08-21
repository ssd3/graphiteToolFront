import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {Panel} from 'primereact/components/panel/Panel'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {Calendar} from 'primereact/calendar'
import {InputText} from 'primereact/components/inputtext/InputText'

@inject('rootStore')
@observer
class CreditForm extends Component {
    constructor(props) {
        super(props)
        this.credit = {
            credittypeid: 1,
            buyerid: 1,
            fromwarehouseid: 2,
            towarehouseid: 3,
            tracknumber: 'xxx-yyy-zzz',
            sent: new Date(),
            received: new Date()
        }
        this.buyers = []
    }

    onDataChange = (e) => {
        console.log('e', e.target.value)
    }

    render() {
        const { credit } = this.props
        const { credittypes, staffs, in_warehouses, out_warehouses } = this.props.rootStore.listStore.getListData
        return (
            <Panel header="Credit details">
                <div className="p-grid p-fluid">
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="credittypeid">Credit type</label>
                            <Dropdown id="credittypeid"
                                      placeholder="Select credit type"
                                      value={this.credit.credittypeid}
                                      options={credittypes}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="buyerid">Buyer</label>
                            <Dropdown id="buyerid"
                                      placeholder="Select buyer"
                                      value={this.credit.buyerid}
                                      options={staffs}
                                      onChange={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="fromwarehouseid">Warehouse from</label>
                            <Dropdown id="fromwarehouseid"
                                      placeholder="Select warehouse from"
                                      value={this.credit.fromwarehouseid}
                                      options={out_warehouses}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="towarehouseid">Warehouse to</label>
                            <Dropdown id="towarehouseid"
                                      placeholder="Select warehouse to"
                                      value={this.credit.towarehouseid}
                                      options={in_warehouses}
                                      onChange={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="sent">Sent date</label>
                            <Calendar id="sent"
                                      value={this.credit.sent}
                                      onChange={this.onDataChange}
                                      showIcon={true} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="received">Received date</label>
                            <Calendar id="received"
                                      value={this.credit.received}
                                      onChange={this.onDataChange}
                                      showIcon={true} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="tracknumber">Track number</label>
                            <InputText id="tracknumber"
                                       defaultValue={this.credit.tracknumber}
                                       onChange={this.onDataChange} />
                        </div>
                    </div>

                    <input type="hidden" id="creditid" value={this.credit.creditid} />
                </div>

            </Panel>
        )
    }
}

export default CreditForm
