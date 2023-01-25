import { Link } from "react-router-dom"
import { useState } from "react"

function NavBar() {

    const [currentPage, setCurrentPage] = useState("home")

    function renderPage() {
        if (currentPage === "horns") {
            return (
                <>
                    <Link to="/" onClick={(e) => setCurrentPage("home")}>
                        Main
                    </Link>
                </>
            )
        }
        if (currentPage === "home") {
            return (
                <>
                    <Link to='/horns' onClick={(e) => setCurrentPage("horns")}>
                        Horns
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