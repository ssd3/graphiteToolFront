import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {inject, observer} from 'mobx-react'
import {Calendar} from 'primereact/calendar'

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
            sent: new Date(),
            received: new Date()
        }
        this.credittypes = []
        this.buyers = []
        this.out_warehouses = []
        this.in_warehouses = []
    }

    render() {
        const { credit } = this.props
        return (
            <Panel header="Box details">
                <div className="p-grid p-fluid" style={{height: '25vh'}}>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="credittypeid">Credit type</label>
                            <Dropdown id="credittypeid"
                                      placeholder="Select credit type"
                                      value={this.credit.credittypeid}
                                      options={this.credittypes}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="buyerid">Buyer</label>
                            <Dropdown id="buyerid"
                                      placeholder="Select buyer"
                                      value={this.credit.buyerid}
                                      options={this.buyers}
                                      onChange={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="fromwarehouseid">Warehouse from</label>
                            <Dropdown id="fromwarehouseid"
                                      placeholder="Select warehouse from"
                                      value={this.credit.fromwarehouseid}
                                      options={this.out_warehouses}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="towarehouseid">Warehouse to</label>
                            <Dropdown id="towarehouseid"
                                      placeholder="Select warehouse to"
                                      value={this.credit.towarehouseid}
                                      options={this.in_warehouses}
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

                    <input type="hidden" id="creditid" value={this.credit.creditid} />
                </div>

            </Panel>
        )
    }
}

export default CreditForm
