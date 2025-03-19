"use client"
import Container from '@/app/common/Container'
import Middleware from '@/app/components/(protectedRoute)/page'
import Topbar from '@/app/components/Topbar/Topbar'
import store from '@/app/store/Store'
import React from 'react'
import { Provider } from 'react-redux'

export default function layout({ children }) {
    console.log(children)
    return (
      <Provider store={store}>

        <Container>
            {/* <Middleware> */}
          <Topbar />

                {children}
            {/* </Middleware> */}

        </Container>
        </Provider>
    )
}
