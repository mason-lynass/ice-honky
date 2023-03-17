import { useEffect } from "react"

function Offseason( {setCurrentPage} ) {

    useEffect(() => {
        setCurrentPage("home")
    }, [])

    return(
        <div>
            sorry, come back in October.<br></br>
            check out those horns tho eh?
        </div>
    )
}

export default Offseason