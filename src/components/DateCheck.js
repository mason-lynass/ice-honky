import AllGames from "./AllGames"
import Offseason from "./Offseason"
import { useEffect } from "react"
import BG from '../images/honky-rink-vert.png'

import "../CSS/DateCheck.css"

function DateCheck({ setCurrentPage, logos, horns, volume, setVolume }) {

    useEffect(() => {
        setCurrentPage("home")
    }, [])

    function hockeySeason() {
        const date = new Date()
        // console.log(date.getMonth())
        return date.getMonth() < 5 || date.getMonth() > 8
    }

    return (
        <>
            {hockeySeason() ?
                <AllGames
                    setCurrentPage={setCurrentPage}
                    logos={logos}
                    horns={horns}
                    volume={volume}
                    setVolume={setVolume}>
                </AllGames>
                :
                <Offseason
                    setCurrentPage={setCurrentPage}>
                </Offseason>
            }
        </>
    )
}

export default DateCheck