import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import {Provider} from 'mobx-react'
import RootStore from './store/rootStore'

ReactDOM.render(
    <Provider rootStore={new RootStore()}>
        <HashRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </HashRouter>
    </Provider>, document.getElementById('root')
)
