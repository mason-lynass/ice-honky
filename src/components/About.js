import { useEffect } from "react"
import "../CSS/About.css";

function About({ setCurrentPage }) {

    useEffect(() => {
        setCurrentPage("about")
    }, [])

    return (
        <div>
            <div id="about-div">
                <div id="white-background">
                    <h2>
                        IceHonky.Net is a live-updating NHL Scoreboard celebrating the sounds of the sport. When a team scores, you'll hear their goal horn!
                    </h2>
                    <h3>
                        You can also check out our horns page, which is a soundboard of each NHL team's stadium goal horn.
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default About