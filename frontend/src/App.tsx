// import { useEffect, useState } from 'react'
// import { type ApiRoutes } from '../../server/app'
// import { hc } from 'hono/client'

import { Route, Routes } from "react-router"

import NavBar from "./components/NavBar/NavBar"
import Home from "./components/pages/Home/Home"
import About from "./components/pages/About/About"
import ErrorPage from "./components/pages/ErrorPage/ErrorPage"
import CreatePost from "./components/CreatePost/CreatePost"

// const client = hc<ApiRoutes>('/')

function App() {
 
  return (
    <>
        <NavBar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
            <Route path={"*"} element={<ErrorPage />} />

            {/* <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            <Route path="concerts">
                <Route index element={<ConcertsHome />} />
                <Route path=":city" element={<City />} />
                <Route path="trending" element={<Trending />} />
            </Route> */}
        </Routes>
    </>
  )
}

export default App