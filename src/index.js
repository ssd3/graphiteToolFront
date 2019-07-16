import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
)
