import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'

@inject('rootStore')
@observer
class ProductAddCommentForm extends Component {
    constructor(props) {
        super(props)
        this.isChangedData = false
    }

    onChanged = e => {
        this.isChangedData = true
    }

    onDataChange = e => {
        if (this.isChangedData) {
            const { productCommentsStore } = this.props.rootStore
            productCommentsStore.saveLocalChanges(e, this.props.debitid, this.props.productcommentid)
            this.isChangedData = false
        }
    }

    render() {
        return (
            <div className="p-col-12">
                <InputTextarea id="comment-new"
                               rows={15} cols={30}
                               onBlur={this.onDataChange}
                               onChange={this.onChanged} />
            </div>
        )
    }

    static propTypes = {
        debitid: PropTypes.string
    }
}

export default ProductAddCommentForm
