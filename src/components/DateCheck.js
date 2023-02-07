import AllGames from "./AllGames"
import Offseason from "./Offseason"
import { useEffect } from "react"

function DateCheck({ setCurrentPage, logos, horns }) {

    useEffect(() => {
        setCurrentPage("home")
    }, [])

    function hockeySeason() {
        const date = new Date()
        return date.getMonth() < 6 || date.getMonth() > 8
    }

    return (
        <>
            {hockeySeason() ?
                <AllGames
                    setCurrentPage={setCurrentPage}
                    logos={logos}
                    horns={horns}>
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