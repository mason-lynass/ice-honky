import "../CSS/HornButton.css";
import useSound from "use-sound";

function HornButton({ logo, horn }) {

    const [soundHorn] = useSound(horn)

    return (
        <div class="button-div" onClick={soundHorn}>
            <button class="button-82-pushable" role="button">
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">
                    <img className="logo" src={logo} />
                </span>
            </button> 
        </div>
    )
}

export default HornButton