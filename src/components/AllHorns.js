import HornButton from "./HornButton"
import "../CSS/HornButton.css";
import { useEffect } from "react";

function AllHorns({ horns, logos, setCurrentPage }) {
    useEffect(() => {
         setCurrentPage("horns")
    })

    function renderButtons() {
        return (
            Object.entries(logos).map((logo) => {
                return (
                    <HornButton
                        logo={logo[1]}
                        horn={horns[logo[0]]}
                        key={logo[0]}
                    />
                )
            })
        )
    }

    return (
        <>
            <div className="all-buttons-div">
                {renderButtons()}
            </div>
        </>
    )
}

export default AllHorns