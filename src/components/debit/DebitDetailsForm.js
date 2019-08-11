import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'

@inject('rootStore')
@observer
class DebitDetailsForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { debit } = this.props
        return (
            <Panel header="Debit Details">
                <div className="p-grid p-fluid" style={{height: '45vh'}}>
                    <div className="p-col-12">
                        Debit Details
                    </div>
                </div>
            </Panel>
        )
    }
    static propTypes = {
        debit: PropTypes.object.isRequired
    }
}

export default DebitDetailsForm
