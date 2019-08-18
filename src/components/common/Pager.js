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
        this.state ={
            pageCount: Math.ceil(this.props.totalCount / this.props.rowsPerPage),
            currentPage: 1
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.rowsPerPage !== state.rowsPerPage) {
            return {
                pageCount: Math.ceil(props.totalCount / props.rowsPerPage)
            }
        }

        if (props.firstPage !== state.currentPage) {
            return {
                currentPage: props.firstPage
            }
        }
        return null
    }

    onPagerFirstPage = e => {
        this.setState({currentPage: 1})
        this.props.onPagerChange({event: 'firstPage'})
    }

    onPagerPrevPage = e => {
        this.setState((prevState, props) => {
            return {currentPage: prevState.currentPage - 1}
        })
        this.props.onPagerChange({event: 'prevPage'})
    }

    onPagerNextPage = e => {
        this.setState((prevState, props) => {
            return {currentPage: prevState.currentPage + 1}
        })
        this.props.onPagerChange({event: 'nextPage'})
    }

    onPagerLastPage = e => {
        this.setState({currentPage: this.state.pageCount})
        this.props.onPagerChange({event: 'lastPage'})
    }

    onPagerChangeRowsPerPage = e => {
        this.setState({
            pageCount: Math.ceil(this.props.totalCount / e.target.value),
            currentPage: 1
        })
        this.props.onPagerChangeRowsPerPage(e)
    }

    get isFirstPage() {
        return this.state.currentPage === 1
    }

    get isLastPage() {
        return this.state.currentPage === this.state.pageCount
    }

    render() {
        const { totalCount } = this.props

        return (<Fragment>
                <div className="p-paginator p-component p-unselectable-text">
                    <Button icon="pi pi-step-backward" style={{marginRight: '3px'}}
                            onClick={this.onPagerFirstPage}
                            className={classNames('p-button-secondary', {'p-disabled': this.isFirstPage })}
                            disabled={this.isFirstPage}/>
                    <Button icon="pi pi-caret-left" style={{marginRight: '3px'}}
                            onClick={this.onPagerPrevPage}
                            className={classNames('p-button-secondary', {'p-disabled': this.isFirstPage })}
                            disabled={this.isFirstPage} />
                    <span className="p-paginator-current">Total rows: {totalCount} - Page {this.state.currentPage} of {this.state.pageCount}</span>
                    <Button icon="pi pi-caret-right" style={{marginRight: '3px'}}
                            onClick={this.onPagerNextPage}
                            className={classNames('p-button-secondary', {'p-disabled': this.isLastPage })}
                            disabled={this.isLastPage} />
                    <Button icon="pi pi-step-forward" style={{marginRight: '3px'}}
                            onClick={this.onPagerLastPage}
                            className={classNames('p-button-secondary', {'p-disabled': this.isLastPage })}
                            disabled={this.isLastPage} />
                    <Dropdown className="p-paginator-rpp-options"
                              options={this.rowsPerPageList}
                              onChange={this.onPagerChangeRowsPerPage}
                              value={this.props.rowsPerPage} />
                </div>
            </Fragment>
        )
    }

    static propTypes = {
        firstPage: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
        rowsPerPageList: PropTypes.array.isRequired,
        totalCount: PropTypes.number.isRequired,
        realRowsCount: PropTypes.number.isRequired,
        onPagerChange: PropTypes.func.isRequired,
        onPagerChangeRowsPerPage: PropTypes.func.isRequired
    }
}

export default Pager
