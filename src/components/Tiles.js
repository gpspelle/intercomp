import React from "react";
import { COMPETITORS } from "../constants/constants";

import "./Tiles.css"
const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i)

const numberOfCompetitors = COMPETITORS.length
const competitorNumberToCompetitorName = {
    1: 'UNICAMP',
    2: 'UFU',
    3: 'EACH'
}

export default function Tiles () {
    return (
        <div className="wrap">
            {range(0, 119).map((i) => {
                return <div key={i} className={`${competitorNumberToCompetitorName[i % numberOfCompetitors]}`} ></div>
            })}
        </div>
    )
}