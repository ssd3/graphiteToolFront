import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'

class CreditCommentForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Panel header="Credit comment">
                <div className="vertical-space10" />
                <div className="p-grid p-fluid p-col-12">
                    <InputTextarea rows={6} cols={30}
                                   placeholder="Type comment here" />
                </div>
            </Panel>
        )
    }
}

export default CreditCommentForm
