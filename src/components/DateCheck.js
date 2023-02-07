import AllGames from "./AllGames"
import Offseason from "./Offseason"

function DateCheck({ setCurrentPage, logos, horns }) {

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