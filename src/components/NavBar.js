import { Link } from "react-router-dom"


function NavBar( {currentPage, setCurrentPage} ) {



    function renderPage() {
        if (currentPage === "horns") {
            return (
                <>
                    <Link to="/">
                        Main
                    </Link>
                </>
            )
        }
        if (currentPage === "home") {
            return (
                <>
                    <Link to='/horns'>
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