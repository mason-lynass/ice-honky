import { Link } from "react-router-dom"
import useSound from "use-sound"
import puckSound from "../audio/mp3s/a.pucksound.mp3"


function NavBar({ currentPage, setCurrentPage }) {

    const [puck] = useSound(puckSound)

    function renderPage() {
        if (currentPage === "horns") {
            return (
                <>
                    <Link to="/">
                        <div className="nav-div">
                            <button className="button-nav-pushable nav-front" onClick={puck} role="button">
                                <span className="button-nav-shadow"></span>
                                <span className="button-nav-edge"></span>
                                <span className="button-nav-front text">
                                    Main
                                </span>
                            </button>
                        </div>
                    </Link >
                </>
            )
        }
        if (currentPage === "home") {
            return (
                <>
                    <Link to='/horns'>
                        <div className="nav-div">
                            <button onClick={puck}className="button-nav-pushable nav-front" role="button">
                                <span className="button-nav-shadow"></span>
                                <span className="button-nav-edge"></span>
                                <span className="button-nav-front text">
                                    Horns
                                </span>
                            </button>
                        </div>
                    </Link>
                </>
            )
        }
    }

    return (
        <>
            {renderPage()}
        </>
    )
}

export default NavBar