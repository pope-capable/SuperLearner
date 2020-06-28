import React from 'react'
import Navbar from "../common/Navbar"
import Authentication from "../common/Auth"
import "../styles/entry.css"


function Entry() {
    return (
        <div className = "entry">
            <Navbar showEntry = {true} />
            <section className = "pillar">
                <Authentication />
            </section>
        </div>
    )
}

export default Entry