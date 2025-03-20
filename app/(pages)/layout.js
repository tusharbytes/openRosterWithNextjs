"use client"
import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/Store'
import Container from '../common/Container'

export default function layout({children}) {
  
  return (
    <Container>
      <Provider store={store}>
     {children} 
     </Provider>
    </Container>
  )
}
