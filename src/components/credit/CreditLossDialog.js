import React from 'react'
import { observer } from 'mobx-react'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Dialog} from 'primereact/components/dialog/Dialog'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import classNames from 'classnames/dedupe'

export default observer(({ form, isShowDialog, title, hideDialog }) => (
    <Dialog visible={isShowDialog}
            header={title}
            modal={true}
            onHide={hideDialog}
            closeOnEscape={false}
            footer={
                <div className="ui-dialog-buttonpane p-clearfix">
                    <Button label="Save" icon="pi pi-check" onClick={form.onSubmit}/>
                    <Button label="Cancel" icon="pi pi-times" onClick={hideDialog}/>
                </div>
            }
            style={{zIndex: 10000}} >

        <form onSubmit={form.onSubmit}>

            <div className="p-grid p-fluid">
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor={form.$('losstypeid').id}>{form.$('losstypeid').label}</label>
                        <Dropdown {...form.$('losstypeid').bind()}
                                  filter={true}
                                  filterBy="label"
                                  showClear={true}
                                  options={form.losstypes}
                                  className={classNames({ 'p-error': form.$('losstypeid').error })}/>
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor={form.$('rate').id}>{form.$('rate').label}</label>
                        <InputText {...form.$('rate').bind()}
                                   className={classNames({ 'p-error': form.$('rate').error })}/>
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor={form.$('notes').id}>{form.$('notes').label}</label>
                        <InputText {...form.$('notes').bind()}
                                   className={classNames({ 'p-error': form.$('notes').error })}/>
                    </div>
                </div>
                <input type="hidden" {...form.$('creditid').bind()} />
            </div>
        </form>

    </Dialog>
))
