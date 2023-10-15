import { useEffect } from "react"
import InSeason from '../images/ice-honky-in-season.png'

function Offseason( {setCurrentPage} ) {

    useEffect(() => {
        setCurrentPage("home")
    }, [])

    // return (
    //     <div>
    //         sorry, come back in october<br></br>
    //         check out those horns tho eh?
    //     </div>
    // )

    return (
        <>
        <main>
            <div>
                <h1>Welcome to IceHonky.net!</h1>
                <h2>Your home for NHL scores and audio score alerts, with goal horns!</h2>
            </div>
            <hr id='offseason-hr'></hr>
            <div>
                <h3>It's the offseason, and there aren't any games right now, so this homepage will look pretty empty until games start back up in October</h3>
                <p>During the season, we're polling an NHL Scores API and using that data to display scores and game info like this:</p>
            </div>
            <img id='in-season' src={InSeason} alt='what this page looks like during the NHL season' loading='lazy'/>
            <p>We hope you'll come back and check scores when the season starts back up.</p>
            <p></p>
        </main>
        <div id='made-by'>
            <p>this website was made by <a href='https://lexdotcom.com/' target='_blank' rel='noopener noreferrer'>Alex Naughton</a> and <a href='https://www.masonlynass.com' target='_blank' rel='noopener noreferrer'>Mason Lynass</a></p>
        </div>
        </>
    )
}

export default Offseason