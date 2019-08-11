import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import ProductCommentForm from './ProductCommentForm'
import {ScrollPanel} from 'primereact/scrollpanel'
import {Button} from 'primereact/components/button/Button'
import ProductAddCommentForm from './ProductAddCommentForm'

@inject('rootStore')
@observer
class ProductCommentsForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAddProductComment: false
        }
    }

    onAddProductComment = () => {
        this.setState({ isAddProductComment: true })
    }

    render() {
        const { debitid, productComments } = this.props
        const { isAddProductComment } = this.state

        return (
            <Panel header="Product Comments">
                <div className="p-grid p-fluid" style={{height: '45vh'}}>
                        <div className="p-toolbar-group-left" style={{paddingTop: '5px'}}>
                            <Button label="Add comment" icon="pi pi-plus" className="p-button-secondary" onClick={this.onAddProductComment} />
                        </div>
                    <ScrollPanel style={{width: '100%', height: '40vh'}}>
                    { isAddProductComment && <ProductAddCommentForm debitid={debitid} /> }
                    {
                        productComments.map(productComment => {
                            return <ProductCommentForm key={productComment.productcommentid}
                                                       productComment={productComment}
                                                       debitid={debitid} />
                        })
                    }
                    </ScrollPanel>
                </div>
            </Panel>
        )
    }
    static propTypes = {
        productComments: PropTypes.array.isRequired,
        debitid: PropTypes.string
    }
}

export default ProductCommentsForm
