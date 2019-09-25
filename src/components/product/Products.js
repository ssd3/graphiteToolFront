import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

export class Products extends Component {
    constructor(props) {
        super(props)
        this.props.pageTitle('Products')
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}
