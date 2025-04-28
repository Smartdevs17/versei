import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import React from "react"

const LandingPageLayout = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Outlet />
    </React.Fragment>
  )
}

export default LandingPageLayout
