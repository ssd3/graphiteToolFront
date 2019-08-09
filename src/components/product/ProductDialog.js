import React from 'react'
import { observer } from 'mobx-react'
import {InputText} from 'primereact/components/inputtext/InputText'
import {Dropdown} from 'primereact/dropdown'


export default observer(({ form }) => (
        <form style={{width: '300px'}} onSubmit={form.onSubmit}>

            <div className="p-grid p-fluid">
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor={form.$('title').id}>
                            {form.$('title').label}
                        </label>
                        <InputText {...form.$('title').bind()} />
                        <span className="error-text">{form.$('title').error}</span>
                    </div>
                </div>
                <div className="p-grid">
                    <div className="p-col-12" style={{padding:'.75em'}}>
                        <label htmlFor={form.$('categoryid').id}>
                            {form.$('categoryid').label}
                        </label>
                        <Dropdown {...form.$('categoryid').bind()} style={{width:'80%'}} />
                        <span className="error-text">{form.$('categoryid').error}</span>
                    </div>
                </div>
                <input type="hidden" {...form.$('productid').bind()} />
            </div>

            <p>{form.error}</p>
        </form>
))
