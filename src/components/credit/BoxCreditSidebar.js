import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Sidebar} from 'primereact/components/sidebar/Sidebar'
import {Fieldset} from 'primereact/components/fieldset/Fieldset'
import {Button} from 'primereact/button'
import CreditForm from './CreditForm'
import CreditLossesForm from './CreditLossesForm'
import CreditCommentForm from './CreditCommentForm'
import CreditProductsForm from './CreditProductsForm'

class BoxCreditSidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isBoxCreditSidebar, onHideBoxCreditSidebar } = this.props
        return (
            <Sidebar
                visible={isBoxCreditSidebar}
                position="right"
                style={{width:'75vw'}}
                onHide={onHideBoxCreditSidebar}
                dismissable={false}>
                <Fieldset legend="Add To Box" style={{height: '92vh'}}>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-6">
                            <div className="p-grid p-fluid p-col-12">
                                <div className="p-md-12">
                                    <CreditForm/>
                                </div>
                            </div>
                            <div className="p-grid p-fluid p-col-12">
                                <div className="p-md-12">
                                    <CreditLossesForm/>
                                </div>
                            </div>
                            <div className="p-grid p-fluid p-col-12">
                                <div className="p-md-12">
                                    <CreditCommentForm/>
                                </div>
                            </div>
                        </div>
                        <div className="p-md-6">
                            <CreditProductsForm/>
                        </div>
                    </div>
                </Fieldset>

                <div className="p-grid p-fluid p-col-12" style={{ marginTop: '2px', width: '99%'}}>
                    <div className="p-md-10">
                        &nbsp;
                    </div>
                    <div className="p-md-1">
                        <Button label="Save" icon="pi pi-check" />
                    </div>
                    <div className="p-md-1">
                        <Button label="Cancel"
                                icon="pi pi-times"
                                style={{paddingRight: '5px'}}
                                onClick={onHideBoxCreditSidebar}
                        />
                    </div>
                </div>

            </Sidebar>

        )
    }

    static propTypes = {
        isBoxCreditSidebar: PropTypes.bool.isRequired,
        onHideBoxCreditSidebar: PropTypes.func.isRequired
    }
}

export default BoxCreditSidebar
