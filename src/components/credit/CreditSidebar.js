import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Sidebar} from 'primereact/components/sidebar/Sidebar'
import {Fieldset} from 'primereact/components/fieldset/Fieldset'
import {Button} from 'primereact/button'
import CreditForm from './CreditForm'
import CreditLossesForm from './CreditLossesForm'
import CreditCommentForm from './CreditCommentForm'
import CreditDetailsForm from './CreditDetailsForm'

class CreditSidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isCreditSidebar, onHideCreditSidebar, onSaveCredit } = this.props
        return (
            <Sidebar
                visible={isCreditSidebar}
                position="right"
                style={{width:'95vw'}}
                onHide={onHideCreditSidebar}
                dismissable={false}
                showCloseIcon={false}>
                <Fieldset legend="Add To Credit" style={{height: '92vh'}}>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-4">
                            <div className="p-grid p-fluid p-col-12">
                                <div className="p-md-12">
                                    <CreditForm/>
                                </div>
                            </div>
                        </div>
                        <div className="p-md-4">
                            <div className="p-grid p-fluid p-col-12">
                                <div className="p-md-12">
                                    <CreditLossesForm/>
                                </div>
                            </div>
                        </div>
                        <div className="p-md-4">
                            <div className="p-grid p-fluid p-col-12">
                                <div className="p-md-12">
                                    <CreditCommentForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-grid p-fluid p-col-12">
                        <div className="p-md-12">
                            <CreditDetailsForm/>
                        </div>
                    </div>
                </Fieldset>

                <div className="p-grid p-fluid p-col-12" style={{ marginTop: '2px', width: '99%'}}>
                    <div className="p-md-10">
                        &nbsp;
                    </div>
                    <div className="p-md-1">
                        <Button label="Save" icon="pi pi-check" onClick={onSaveCredit} />
                    </div>
                    <div className="p-md-1">
                        <Button label="Close"
                                icon="pi pi-times"
                                style={{paddingRight: '5px'}}
                                onClick={onHideCreditSidebar}
                        />
                    </div>
                </div>

            </Sidebar>

        )
    }

    static propTypes = {
        isCreditSidebar: PropTypes.bool.isRequired,
        onHideCreditSidebar: PropTypes.func.isRequired,
        onSaveCredit: PropTypes.func.isRequired
    }
}

export default CreditSidebar
