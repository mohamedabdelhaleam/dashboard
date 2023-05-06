import React from 'react';
import "./CountCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine,faBookmark,faGem} from '@fortawesome/free-solid-svg-icons'

const CountCard = ({count,title}) => {
  return (
    <div className={
      title === "Students Number"?  "count-card student" :
      title === "Doctors Number" ? "count-card doctor" : 
      "count-card default"
    }>
        <div className="circle1 top">

        </div>
        <div className="circle2 bottom">

        </div>
        <h2>{title} <FontAwesomeIcon icon={
          title === "Students Number"?  faChartLine :
          title === "Doctors Number" ? faBookmark : 
          title === "Online Users" ? faGem : 
          faBookmark
        } size="md" style={{marginLeft:"10px"}}/></h2>
        <h1>{count}</h1>
    </div>
  );
}

export default CountCard;

// "Online Users"
//Classes Number