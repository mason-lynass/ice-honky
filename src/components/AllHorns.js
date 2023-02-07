import HornButton from "./HornButton";
import "../CSS/HornButton.css";
import { useEffect } from "react";

function AllHorns({ horns, logos, setCurrentPage }) {
  useEffect(() => {
    setCurrentPage("horns");
  });

  // divisions:
  // Metro - CAR, CLB, NJD, NYI, NYR, PHI, PIT, WSH
  // Atlantic - BOS, BUF, DET, FLA, MTL, OTT, TBL, TOR
  // Central - ARI, CHI, COL, DAL, MIN, NSH, STL, WPG
  // Pacific - ANA, CGY, EDM, LAK, SEA, SJS, VAN, VGK

  const metroHorns = Object.fromEntries(
    Object.entries(horns).filter(
      ([key]) =>
        key === "CAR" ||
        key === "CBJ" ||
        key === "NJD" ||
        key === "NYI" ||
        key === "NYR" ||
        key === "PHI" ||
        key === "PIT" ||
        key === "WSH"
    )
  );

  const atlanticHorns = Object.fromEntries(
    Object.entries(horns).filter(
      ([key]) =>
        key === "BOS" ||
        key === "BUF" ||
        key === "DET" ||
        key === "FLA" ||
        key === "MTL" ||
        key === "OTT" ||
        key === "TBL" ||
        key === "TOR"
    )
  );

  const centralHorns = Object.fromEntries(
    Object.entries(horns).filter(
      ([key]) =>
        key === "ARI" ||
        key === "CHI" ||
        key === "COL" ||
        key === "DAL" ||
        key === "MIN" ||
        key === "NSH" ||
        key === "STL" ||
        key === "WPG"
    )
  );

  const pacificHorns = Object.fromEntries(
    Object.entries(horns).filter(
      ([key]) =>
        key === "ANA" ||
        key === "CGY" ||
        key === "EDM" ||
        key === "LAK" ||
        key === "SEA" ||
        key === "SJS" ||
        key === "VAN" ||
        key === "VGK"
    )
  );

  const metroLogos = Object.fromEntries(
    Object.entries(logos).filter(
      ([key]) =>
        key === "CAR" ||
        key === "CBJ" ||
        key === "NJD" ||
        key === "NYI" ||
        key === "NYR" ||
        key === "PHI" ||
        key === "PIT" ||
        key === "WSH"
    )
  );

  const atlanticLogos = Object.fromEntries(
    Object.entries(logos).filter(
      ([key]) =>
        key === "BOS" ||
        key === "BUF" ||
        key === "DET" ||
        key === "FLA" ||
        key === "MTL" ||
        key === "OTT" ||
        key === "TBL" ||
        key === "TOR"
    )
  );

  const centralLogos = Object.fromEntries(
    Object.entries(logos).filter(
      ([key]) =>
        key === "ARI" ||
        key === "CHI" ||
        key === "COL" ||
        key === "DAL" ||
        key === "MIN" ||
        key === "NSH" ||
        key === "STL" ||
        key === "WPG"
    )
  );

  const pacificLogos = Object.fromEntries(
    Object.entries(logos).filter(
      ([key]) =>
        key === "ANA" ||
        key === "CGY" ||
        key === "EDM" ||
        key === "LAK" ||
        key === "SEA" ||
        key === "SJS" ||
        key === "VAN" ||
        key === "VGK"
    )
  );

  function renderButtons(logos, horns) {
    return Object.entries(logos).map((logo) => {
      const hornArray = Object.entries(horns).filter((horn) => horn[0] === logo[0]);
        const horn = hornArray[0][1]
        console.log(hornArray)
      return <HornButton logo={logo[1]} horn={horn} key={logo[0]} />;
    });
  }

  return (
    <>
      <div className="">
      <h2 className="divh2">Metro Division</h2>
        <div className="div-buttons" id="metro">{renderButtons(metroLogos, metroHorns)}</div>
        <h2 className="divh2">Atlantic Division</h2>
        <div className="div-buttons" id="atlantic">{renderButtons(atlanticLogos, atlanticHorns)}</div>
        <h2 className="divh2">Central Division</h2>
        <div className="div-buttons" id="central">{renderButtons(centralLogos, centralHorns)}</div>
        <h2 className="divh2">Pacific Division</h2>
        <div className="div-buttons" id="pacific">{renderButtons(pacificLogos, pacificHorns)}</div>
      </div>
    </>
  );
}

export default AllHorns;
