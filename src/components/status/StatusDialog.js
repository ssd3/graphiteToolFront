import React from 'react'
import { observer } from 'mobx-react'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/components/inputtext/InputText'
import {ColorPicker} from 'primereact/components/colorpicker/ColorPicker'
import {Dialog} from 'primereact/components/dialog/Dialog'


export default observer(({ form, title, hideDialog }) => (
    <Dialog visible={true} header={title} modal={true} onHide={hideDialog}
            footer={
                <div className="ui-dialog-buttonpane p-clearfix">
                    <Button label="Save" icon="pi pi-check" onClick={form.onSubmit}/>
                    <Button label="Cancel" icon="pi pi-times" onClick={hideDialog}/>
                </div>
            }>

        <form style={{width: '300px'}} onSubmit={form.onSubmit}>

            <div className="p-grid p-fluid">
                <div className="p-col-4" style={{padding:'.75em'}}>
                    <label htmlFor={form.$('title').id}>
                        {form.$('title').label}
                    </label>
                </div>
                <div className="p-col-8" style={{padding:'.5em'}}>
                    <InputText {...form.$('title').bind()} />
                    <span className="error-text">{form.$('title').error}</span>
                </div>
                <div className="p-col-4" style={{padding:'.75em'}}>
                    <label htmlFor={form.$('value').id}>
                        {form.$('value').label}
                    </label>
                </div>
                <div className="p-col-8" style={{padding:'.5em'}}>
                    <ColorPicker {...form.$('value').bind()} />
                    <span className="error-text">{form.$('value').error}</span>
                </div>
                <input type="hidden" {...form.$('statusid').bind()} />
            </div>

            <p>{form.error}</p>
        </form>

    </Dialog>
))
