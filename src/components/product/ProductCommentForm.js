import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'
import Moment from 'react-moment'

@inject('rootStore')
@observer
class ProductCommentForm extends Component {
    constructor(props) {
        super(props)
        this.isChangedData = false
    }

    //TODO: flag is data was changed
    onChanged = e => {
        this.isChangedData = true
    }

    onDataChange = e => {
        if (this.isChangedData) {
            const { productCommentsStore } = this.props.rootStore
            productCommentsStore.saveLocalChanges(e, this.props.debitid, this.props.productComment.productcommentid)
            this.isChangedData = false
        }

    }

    render() {
        const { productComment } = this.props
        return (
            <div className="p-col-12">
                <label>
                    Date: <Moment format="DD/MM/YYYY HH:MM">{productComment.created}</Moment>
                </label>
                <InputTextarea rows={15} cols={30}
                               defaultValue={ productComment.comment }
                               onBlur={this.onDataChange}
                               onChange={this.onChanged} />
            </div>
        )
    }

    static propTypes = {
        productComment: PropTypes.object.isRequired,
        debitid: PropTypes.string
    }
}
export default ProductCommentForm
