import "../CSS/HornButton.css";
import useSound from "use-sound";
import { useState } from "react";

function HornButton({ logo, horn }) {

    const [soundHorn] = useSound(horn)

    const [logoLoaded, setLogoLoaded] = useState(false)

    return (
        <div className="button-div" onClick={soundHorn}>
            <button className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    {logoLoaded ? null :
                    <div style={{
                        background: 'rgb(163, 0, 54) 8%',
                        height: '138.7',
                        width: '228.01px'
                      }}>
                    </div>}
                    <img className="logo"
                        style={logoLoaded ? {} : { display: 'none' }}
                        src={logo}
                        onLoad={() => setLogoLoaded(true)}
                    />
                    
                </span>
            </button>
        </div>
    )
}

export default HornButton