import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Dropdown} from 'primereact/components/dropdown/Dropdown'
import {Button} from 'primereact/button'
import classNames from 'classnames/dedupe'

class Pager extends Component {
    constructor(props){
        super(props)
        this.rowsPerPageList = []
        this.props.rowsPerPageList.map(item => this.rowsPerPageList.push({value: item, label: item}))
    }

    onPagerFirstPage = e => {
        this.props.onPagerChange({event: 'firstPage'})
    }

    onPagerPrevPage = e => {
        this.props.onPagerChange({event: 'prevPage'})
    }

    onPagerNextPage = e => {
        this.props.onPagerChange({event: 'nextPage'})
    }

    onPagerLastPage = e => {
        this.props.onPagerChange({event: 'lastPage'})
    }


    render() {
        const { hasPreviousPage, hasNextPage } = this.props.pageInfo

        return (<Fragment>
                <div className="p-paginator p-component p-unselectable-text">
                    <Button icon="pi pi-step-backward" style={{marginRight: '3px'}}
                            onClick={this.onPagerFirstPage}
                            className="p-button-secondary"/>
                    <Button icon="pi pi-caret-left" style={{marginRight: '3px'}}
                            onClick={this.onPagerPrevPage}
                            className={classNames('p-button-secondary', {'p-disabled': hasNextPage })}
                            disabled={hasNextPage} />
                    <span className="p-paginator-current">({this.props.realRowsCount} of {this.props.totalCount})</span>
                    <Button icon="pi pi-caret-right" style={{marginRight: '3px'}}
                            onClick={this.onPagerNextPage}
                            className={classNames('p-button-secondary', {'p-disabled': hasPreviousPage })}
                            disabled={hasPreviousPage} />
                    <Button icon="pi pi-step-forward" className="p-button-secondary" style={{marginRight: '3px'}}
                            onClick={this.onPagerLastPage} />
                    <Dropdown className="p-paginator-rpp-options"
                              options={this.rowsPerPageList}
                              onChange={this.props.onPagerChangeRowsPerPage}
                              value={this.props.rowsPerPage} />
                </div>
            </Fragment>
        )
    }

    static propTypes = {
        rowsPerPage: PropTypes.number.isRequired,
        rowsPerPageList: PropTypes.array.isRequired,
        totalCount: PropTypes.number.isRequired,
        pageInfo: PropTypes.object.isRequired,
        cursors: PropTypes.array.isRequired,
        realRowsCount: PropTypes.number.isRequired,
        onPagerChange: PropTypes.func.isRequired,
        onPagerChangeRowsPerPage: PropTypes.func.isRequired
    }
}

export default Pager
