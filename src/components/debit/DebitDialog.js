import React from 'react'
import { observer } from 'mobx-react'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Dialog} from 'primereact/components/dialog/Dialog'
import {Panel} from 'primereact/components/panel/Panel'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {InputTextarea} from 'primereact/components/inputtextarea/InputTextarea'
import classNames from 'classnames/dedupe'

export default observer(({ form, isShowDebit, title, hideDialog }) => (
    <Dialog visible={isShowDebit}
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
            maximizable={true}
            style={{width: '80%'}}>

        <form onSubmit={form.onSubmit}>

            <div className="p-grid p-fluid" style={{padding: '1em'}}>
                <div className="p-col-12">
                    <div className="p-grid">
                        <div className="p-md-3">
                            <Panel header="Product price details">
                                <div className="p-grid p-fluid" style={{height: '55vh'}}>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('tracknumber').id}>{form.$('tracknumber').label}</label>
                                        <InputText {...form.$('tracknumber').bind()}
                                                   className={classNames({ 'p-error': form.$('tracknumber').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('warehouseid').id}>{form.$('warehouseid').label}</label>
                                        <Dropdown {...form.$('warehouseid').bind()}
                                                  options={form.in_warehouses}
                                                  className={classNames({ 'p-error': form.$('warehouseid').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('statusid').id}>{form.$('statusid').label}</label>
                                        <Dropdown {...form.$('statusid').bind()}
                                                  options={form.statuses}
                                                  className={classNames({ 'p-error': form.$('statusid').error })}/>
                                    </div>
                                    <div className="p-grid p-fluid p-col-12">
                                        <div className="p-md-6">
                                            <label htmlFor={form.$('qty').id}>{form.$('qty').label}</label>
                                            <InputText {...form.$('qty').bind()}
                                                       keyfilter="num"/>
                                        </div>
                                        <div className="p-md-6">
                                            <label htmlFor={form.$('price').id}>{form.$('price').label}</label>
                                            <InputText {...form.$('price').bind()}
                                                       keyfilter="num"/>
                                        </div>
                                    </div>
                                    <div className="p-grid p-fluid p-col-12">
                                        <div className="p-md-6">
                                            <label htmlFor={form.$('pricetypeid').id}>{form.$('pricetypeid').label}</label>
                                            <Dropdown {...form.$('pricetypeid').bind()}
                                                      options={form.pricetypes}
                                                      className={classNames({ 'p-error': form.$('pricetypeid').error })}/>
                                        </div>
                                        <div className="p-md-6">
                                            <label htmlFor={form.$('discountid').id}>{form.$('discountid').label}</label>
                                            <Dropdown {...form.$('discountid').bind()}
                                                      options={form.discounts}
                                                      className={classNames({ 'p-error': form.$('discountid').error })}/>
                                        </div>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('notes').id}>{form.$('notes').label}</label>
                                        <InputTextarea {...form.$('notes').bind()}
                                                       rows={5} cols={30}/>
                                    </div>
                                    <input type="hidden" name="debitid" value="" />
                                </div>
                            </Panel>
                        </div>
                        <div className="p-md-3">
                            <Panel header="Product">
                                <div className="p-grid p-fluid" style={{height: '55vh'}}>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('categoryid').id}>{form.$('categoryid').label}</label>
                                        <Dropdown {...form.$('categoryid').bind()}
                                                  options={form.categories}
                                                  className={classNames({ 'p-error': form.$('categoryid').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('title').id}>{form.$('title').label}</label>
                                        <InputText {...form.$('title').bind()}
                                                   className={classNames({ 'p-error': form.$('title').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('description').id}>{form.$('description').label}</label>
                                        <InputTextarea {...form.$('description').bind()}
                                                       rows={16} cols={30}/>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="p-md-3">
                            <Panel header="Product Details">
                                <div className="p-grid p-fluid" style={{height: '55vh'}}>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('model').id}>{form.$('model').label}</label>
                                        <InputText {...form.$('model').bind()}
                                                   className={classNames({ 'p-error': form.$('model').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('url').id}>{form.$('url').label}</label>
                                        <InputText {...form.$('url').bind()}
                                                   className={classNames({ 'p-error': form.$('url').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('serialno').id}>{form.$('serialno').label}</label>
                                        <InputText {...form.$('serialno').bind()}
                                                   className={classNames({ 'p-error': form.$('serialno').error })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('weight').id}>{form.$('weight').label}</label>
                                        <InputText {...form.$('weight').bind()}
                                                   className={classNames({ 'p-error': form.$('weight').error })}
                                                   keyfilter="num"/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('height').id}>{form.$('height').label}</label>
                                        <InputText {...form.$('height').bind()}
                                                   className={classNames({ 'p-error': form.$('height').error })}
                                                   keyfilter="num"/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('width').id}>{form.$('width').label}</label>
                                        <InputText {...form.$('width').bind()}
                                                   className={classNames({ 'p-error': form.$('width').error })}
                                                   keyfilter="num"/>
                                    </div>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('lenght').id}>{form.$('lenght').label}</label>
                                        <InputText {...form.$('lenght').bind()}
                                                   className={classNames({ 'p-error': form.$('lenght').error })}
                                                   keyfilter="num"/>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="p-md-3">
                            <Panel header="Product Comment">
                                <div className="p-grid p-fluid" style={{height: '55vh'}}>
                                    <div className="p-col-12">
                                        <label htmlFor={form.$('comment').id}>{form.$('comment').label}</label>
                                        <InputTextarea {...form.$('comment').bind()}
                                                       rows={22} cols={30}/>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </div>
            <p>{form.error}</p>
        </form>

    </Dialog>
))
