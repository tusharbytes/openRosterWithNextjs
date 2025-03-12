"use client"
import Container from '@/app/common/Container'
import Middleware from '@/app/components/(protectedRoute)/page'
import Topbar from '@/app/components/(topbar)/page'
import React from 'react'

export default function layout({ children }) {
    return (
        <Container>
<Middleware>
           
                {children}
                </Middleware>
                
        </Container>
    )
}
