import { useState } from "react";
import NotificationsCard from "./components/NotificationsCard.jsx";
import info from "./components/NotificationInfo.json";
import "./App.css";

function App() {
  //state for the number of read notifications, initial count based on the read state in the info json file
  const [readCount, setReadCount] = useState(
    info.reduce((acc, infoObj) => {
      !infoObj.read && acc++;
      return acc;
    }, 0)
  );
  // state for the mark as all read link
  const [markAllAsRead, setMarkAllAsRead] = useState(false);

  //function to calculate the ReadCount based on read state of each notification
  const countRead = (args) => {
    setMarkAllAsRead(false);

    //switch case to increment, decrement or reset count;
    switch (args) {
      case "plus":
        setReadCount((readCount) => readCount + 1);
        break;
      case "minus":
        //decrements read count if it's bigger than 0
        readCount > 0 && setReadCount((readCount) => readCount - 1);
        break;
      case "clear":
        setReadCount(0);
        setMarkAllAsRead(true);
        break;
      default:
        setReadCount(0);
        break;
    }
  };

  return (
    <section className="container">
      <header>
        <h2>
          Notifications <span>{readCount}</span>
        </h2>
        <a href="#" className="mark-link" onClick={() => countRead("clear")}>
          Mark all as read
        </a>
      </header>
      <article>
        {info.map((ele, ind) => (
          <NotificationsCard
            key={ind}
            obj={ele}
            countRead={countRead}
            markAllAsRead={markAllAsRead}
          />
        ))}
      </article>
    </section>
  );
}

export default App;
