import React from "react"

import About from "../components/About"
import HeaderHome from "../components/HeaderHome"

function Home() {
    return (
        <div className="home">
            <HeaderHome />
            <About />
        </div>
    )
}

export default Home
