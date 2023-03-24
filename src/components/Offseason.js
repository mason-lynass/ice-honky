import { useEffect } from "react"

function Offseason( {setCurrentPage} ) {

    useEffect(() => {
        setCurrentPage("home")
    }, [])

    return(
        <div>
            sorry, come back in october<br></br>
            check out those horns tho eh?
        </div>
    )
}

export default Offseason