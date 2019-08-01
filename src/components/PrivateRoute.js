import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Component {...props}
                           pageTitle={rest.pageTitle}
                           notify={rest.notify}
                />
            ) : (
                <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }
                } />
            )
        }
    />
)
