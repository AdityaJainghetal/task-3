import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <br />
        <Outlet/>
        <br />
              
    </>
  )
}

export default Layout
