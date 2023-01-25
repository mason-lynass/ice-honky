import HornButton from "./HornButton"
import "../CSS/HornButton.css";

function AllHorns({ horns, logos, setCurrentPage }) {

    function renderButtons() {
        setCurrentPage("horns")
        return (
            Object.entries(logos).map((logo) => {
                return (
                    <HornButton
                        logo={logo[1]}
                        horn={horns[logo[0]]}
                    />
                )
            })
        )
    }

    return (
        <>
            <div class="all-buttons-div">
                {renderButtons()}
            </div>
        </>
    )
}

export default AllHorns