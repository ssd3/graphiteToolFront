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
    }

    onDataChange = (e) => {
        this.props.rootStore.creditStore.credit[e.target.id] = e.target.value
    }

    render() {
        const { credit } = this.props
        const { credittypes, staffs, in_warehouses, out_warehouses } = this.props.rootStore.listStore.getListData

        return (
            <Panel header="Credit details">
                <div className="p-grid p-fluid">
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="creditid">Credit ID</label>
                            <InputText id="creditid"
                                       value={credit.creditid}
                                       disabled={true}
                                       readOnly={true} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="tracknumber">Track number</label>
                            <InputText id="tracknumber"
                                       defaultValue={credit.tracknumber}
                                       onChange={this.onDataChange} />
                        </div>
                    </div>

                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="credittypeid">Credit type</label>
                            <Dropdown id="credittypeid"
                                      placeholder="Select credit type"
                                      filter={true}
                                      filterBy="label"
                                      showClear={true}
                                      value={credit.credittypeid}
                                      options={credittypes}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="buyerid">Buyer</label>
                            <Dropdown id="buyerid"
                                      placeholder="Select buyer"
                                      filter={true}
                                      filterBy="label"
                                      showClear={true}
                                      value={credit.buyerid}
                                      options={staffs}
                                      onChange={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="fromwarehouseid">Warehouse from</label>
                            <Dropdown id="fromwarehouseid"
                                      placeholder="Select warehouse from"
                                      filter={true}
                                      filterBy="label"
                                      showClear={true}
                                      value={credit.fromwarehouseid}
                                      options={out_warehouses}
                                      onChange={this.onDataChange} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="towarehouseid">Warehouse to</label>
                            <Dropdown id="towarehouseid"
                                      placeholder="Select warehouse to"
                                      filter={true}
                                      filterBy="label"
                                      showClear={true}
                                      value={credit.towarehouseid}
                                      options={in_warehouses}
                                      onChange={this.onDataChange} />
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <label htmlFor="sent">Sent date</label>
                            <Calendar id="sent"
                                      value={credit.sent}
                                      onChange={this.onDataChange}
                                      showIcon={true} />
                        </div>
                        <div className="p-md-6">
                            <label htmlFor="received">Received date</label>
                            <Calendar id="received"
                                      value={credit.received}
                                      onChange={this.onDataChange}
                                      showIcon={true} />
                        </div>
                    </div>
                </div>

            </Panel>
        )
    }

    static propTypes = {
        credit: PropTypes.object.isRequired
    }
}

export default CreditForm
