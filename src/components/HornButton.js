import "../CSS/HornButton.css";
import useSound from "use-sound";

function HornButton({ logo, horn }) {

    const [soundHorn] = useSound(horn)

    return (
        <div className="button-div" onClick={soundHorn}>
            {<button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    <img className="logo" src={logo} />
                </span>
            </button> }
        </div>
    )
}

export default HornButton