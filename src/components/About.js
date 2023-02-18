import { useEffect } from "react"
import "../CSS/About.css";

function About({ setCurrentPage }) {

    useEffect(() => {
        setCurrentPage("about")
    }, [])

    return (
        <main>
            <div id="about-div">
                <div id="white-background">
                    <h2 id="bigger">
                        IceHonky.Net is a live-updating NHL Scoreboard celebrating the sounds of the sport. When a team scores, you'll hear their goal horn!
                    </h2>
                    <h3 id="smaller">
                        You can also check out our horns page, which is a soundboard of each NHL team's stadium goal horn.
                    </h3>
                </div>
            </div>
        </main>
    )
}

export default About