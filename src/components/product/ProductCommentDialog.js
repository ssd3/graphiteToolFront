import React from 'react'
import { observer } from 'mobx-react'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'
import {Dialog} from 'primereact/components/dialog/Dialog'
import {Button} from 'primereact/button'


export default observer(({ form, isShowDialog, title, onHide }) => (
    <Dialog visible={isShowDialog} header={title} modal={true} onHide={onHide}
            footer={
                <div className="ui-dialog-buttonpane p-clearfix">
                    <Button label="Save" icon="pi pi-check" onClick={form.onSubmit}/>
                    <Button label="Cancel" icon="pi pi-times" onClick={onHide}/>
                </div>
            }>

        <form style={{width: '500px'}} onSubmit={form.onSubmit}>

            <div className="p-grid p-fluid">
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor={form.$('comment').id}>
                            {form.$('comment').label}
                        </label>
                        <InputTextarea rows={15} cols={60} {...form.$('comment').bind()} />
                        <span className="error-text">{form.$('comment').error}</span>
                    </div>
                </div>
                <input type="hidden" {...form.$('productcommentid').bind()} />
                <input type="hidden" {...form.$('debitid').bind()} />
                <input type="hidden" {...form.$('productid').bind()} />
            </div>

            <p>{form.error}</p>
        </form>
    </Dialog>
))
