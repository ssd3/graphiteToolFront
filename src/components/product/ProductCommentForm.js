import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'
import formatDate from '../common/FormatDate'

@inject('rootStore')
@observer
class ProductCommentForm extends Component {
    constructor(props) {
        super(props)
    }

    showCommentDialog = () => {
        let comment = this.props.productComment
        comment.productid = this.props.productid
        comment.debitid = this.props.debitid
        this.props.updateProductComment(comment)
    }

    render() {
        const { productComment } = this.props
        return (
            <div className="p-col-12">
                <label>
                    Date: {
                        formatDate(productComment.created)
                    }
                </label>
                <InputTextarea rows={15} cols={30}
                               readOnly={true}
                               value={ productComment.comment }
                               onClick={this.showCommentDialog} />
            </div>
        )
    }

    static propTypes = {
        productComment: PropTypes.object.isRequired,
        updateProductComment: PropTypes.func.isRequired,
        debitid: PropTypes.string,
        productid: PropTypes.string,
    }
}
export default ProductCommentForm
