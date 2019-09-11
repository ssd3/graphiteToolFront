import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'
import {inject, observer} from 'mobx-react'

@inject('rootStore')
@observer
class CreditCommentForm extends Component {
    constructor(props) {
        super(props)

        this.onCommentChange = this.onCommentChange.bind(this)
    }

    onCommentChange(e) {
        this.props.rootStore.creditStore.updateLocalCreditComment(e.target.value)
    }

    render() {
        const { creditComment } = this.props
        return (
            <Panel header="Credit comment">
                <div className="vertical-space10" />
                <div className="p-grid p-fluid p-col-12">
                    <InputTextarea rows={6} cols={30}
                                   defaultValue={creditComment.comment}
                                   placeholder="Type comment here"
                                   onChange={this.onCommentChange} />
                </div>
            </Panel>
        )
    }

    static propTypes = {
        creditComment: PropTypes.object.isRequired
    }
}

export default CreditCommentForm
