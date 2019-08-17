import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {inject, observer} from 'mobx-react'

@inject('rootStore')
@observer
class Pager extends Component {
    constructor(props){
        super(props)
        this.state = {
            rowsPerPage: '10'
        }
    }

    changePageCount = e => {
        //
    }

    render() {
        const { pageInfo, totalCount } = this.props
        console.log('pageInfo', pageInfo)
        return (
            <div>Pager</div>
        )
    }

    static defaultProps = {
        rowsPerPageList: [5, 10, 20, 50, 100]
    }

    static propTypes = {
        totalCount: PropTypes.number.isRequired,
        pageInfo: PropTypes.object.isRequired,
        onPageChange: PropTypes.func.isRequired
    }
}

export default Pager
