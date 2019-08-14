import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Panel} from 'primereact/components/panel/Panel'
import ProductCommentForm from './ProductCommentForm'
import {ScrollPanel} from 'primereact/scrollpanel'
import {Button} from 'primereact/components/button/Button'

import ProductCommentDialog from './ProductCommentDialog'
import productCommentFields from './ProductCommentFields'
import Progressbar from '../common/ProgressBar'

@inject('rootStore')
@observer
class ProductCommentsForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowDialog: false,
            title: 'Add Comment'
        }
        productCommentFields.store = this.props.rootStore.productCommentsStore
    }

    onAddProductComment = (e) => {
        productCommentFields.clear()
        productCommentFields.set('rules', {
            productcommentid: 'numeric'
        })
        productCommentFields.$('debitid').set(this.props.debitid)
        productCommentFields.$('productid').set(this.props.productid)

        this.setState({ isShowDialog: true })
    }

    onUpdateProductComment = (e) => {
        productCommentFields.clear()
        productCommentFields.set(e)
        this.setState({ isShowDialog: true, title: 'View or Update Comment' })
    }

    onCancelProductComment = () => {
        this.setState({ isShowDialog: false })
    }

    render() {
        const { loading } = this.props.rootStore.productCommentsStore
        let { debitid, productid, productComments } = this.props
        const { isShowDialog, title } = this.state
        productComments =_.orderBy(productComments, ['created'], ['desc'])

        return (
            <Panel header="Product Comments">
                <div className="p-grid p-fluid" style={{height: '45vh'}}>
                    <Progressbar loading={loading}/>
                        <div className="p-toolbar-group-left" style={{paddingTop: '5px'}}>
                            <Button label="Add comment" icon="pi pi-plus" className="p-button-secondary" onClick={this.onAddProductComment} />
                        </div>

                    <ProductCommentDialog form={productCommentFields}
                                          isShowDialog={isShowDialog}
                                          title={title}
                                          onHide={this.onCancelProductComment} />

                    <ScrollPanel style={{width: '100%', height: '40vh'}}>
                    {
                        productComments.map(productComment => {
                            return <ProductCommentForm key={productComment.productcommentid}
                                                       productComment={productComment}
                                                       debitid={debitid}
                                                       productid={productid}
                                                       updateProductComment={this.onUpdateProductComment} />
                        })
                    }
                    </ScrollPanel>
                </div>
            </Panel>
        )
    }
    static propTypes = {
        productComments: PropTypes.array.isRequired,
        productid: PropTypes.string,
        debitid: PropTypes.string
    }
}

export default ProductCommentsForm
