import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {inject, observer} from 'mobx-react'

@inject('rootStore')
@observer
class Pager extends Component {
    constructor(props){
        super(props)
        this.state = {
            rowsPerPage: '20'
        }
    }

    changePageCount = e => {

    }

    render() {
        const { rowsPerPage } = this.state
        const { pageInfo, totalCount } = this.props
        console.log('pageInfo', pageInfo)
        return (
            <div>
                {pageInfo.hasPrevPage && <span>Prev Page&nbsp;</span>}
                {pageInfo.hasNextPage && <span>Next Page&nbsp;</span>}
                {totalCount && <span>totalCount: {totalCount}</span>}
                <Dropdown value={rowsPerPage}
                          options={this.props.rowsPerPageList}
                          onChange={this.changePageCount} />
            </div>
        )
    }

    static defaultProps = {
        rowsPerPageList: [{value: '5', label: '5'},{value: '15', label: '15'},{value: '25', label: '25'},{value: '50', label: '50'},{value: '100', label: '100'}]
    }

    static propTypes = {
        totalCount: PropTypes.number,
        pageInfo: PropTypes.object.isRequired,
        onPageChange: PropTypes.func.isRequired
    }
}

export default Pager
