import { useEffect } from "react"

function Offseason( {setCurrentPage} ) {

    useEffect(() => {
        setCurrentPage("home")
    }, [])

    return(
        <div>
            sorry, boys, come back in october<br></br>
            check out those horns tho
        </div>
    )
}

export default Offseason