import { Link } from "react-router-dom"
import useSound from "use-sound"
import puckSound from "../audio/mp3s/a.pucksound.mp3"


function NavBar({ currentPage, setCurrentPage, volume, setVolume }) {

    const [puck] = useSound(puckSound)

    function playPuckSound() {
        if (volume) {
            return puck()
        }
    }


    function hornButton() {
        if (currentPage === "horns") {
            return (
                <>
                    <Link to="/">
                        {/* <div className="nav-div"> */}
                        <button className="button-nav-pushable nav-front" onClick={playPuckSound} role="button">
                            <span className="button-nav-shadow"></span>
                            <span className="button-nav-edge"></span>
                            <span className="button-nav-front text">
                                Main
                            </span>
                        </button>
                        {/* </div> */}
                    </Link >
                </>
            )
        }
        if (currentPage === "home" || currentPage === "about") {
            return (
                <>
                    <Link to='/horns'>
                        {/* <div className="nav-div"> */}
                        <button onClick={playPuckSound} className="button-nav-pushable nav-front" role="button">
                            <span className="button-nav-shadow"></span>
                            <span className="button-nav-edge"></span>
                            <span className="button-nav-front text">
                                Horns
                            </span>
                        </button>
                        {/* </div> */}
                    </Link>
                </>
            )
        }
    }

    function aboutButton() {
        if (currentPage === "home" || currentPage === "horns") {
            return (
                <Link to="/about">
                    <button className="button-nav-pushable nav-front" onClick={playPuckSound} role="button">
                        <span className="button-nav-shadow"></span>
                        <span className="button-nav-edge"></span>
                        <span className="button-nav-front text">
                            About
                        </span>
                    </button>
                </Link >
            )
        }
        if (currentPage === "about") {
            return (
                <Link to="/">
                    {/* <div className="nav-div"> */}
                    <button className="button-nav-pushable nav-front" onClick={playPuckSound} role="button">
                        <span className="button-nav-shadow"></span>
                        <span className="button-nav-edge"></span>
                        <span className="button-nav-front text">
                            Main
                        </span>
                    </button>
                    {/* </div> */}
                </Link >
            )
        }
    }

    return (
        <div className="nav-div">
            {/* {currentPage === "home" ? soundButton() : null} */}
            {aboutButton()}
            {hornButton()}
        </div>
    )
}

export default NavBar