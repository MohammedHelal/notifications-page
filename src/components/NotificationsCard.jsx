import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./NotificationsCard.css";

function NotificationsCard({ obj, countRead, markAllAsRead }) {
  //state if the notification is read, boolean
  const [read, setRead] = useState(obj.read);

  //useEffect to set the initial state of notification read
  useEffect(() => {
    markAllAsRead && setRead(true);

    return () => {};
  }, [markAllAsRead, read]);

  //notification card click handler
  function onClickHandler() {
    //increments or decrements the read count based on read state
    if (read) {
      countRead("plus");
    } else {
      countRead("minus");
    }
    //toggles the read state, true to false, false to true
    setRead((read) => !read);
  }

  //variable that specifies the card classes based on the read states
  const cardClass = "card" + (!read ? " card-clicked" : "");

  return (
    <aside className={cardClass} onClick={onClickHandler}>
      <div className="flex-parent">
        <div className="flex-child">
          <img src={obj.profileImage} alt="profile image" />
          <div className="text-wrapper">
            <p className="notification-text">
              <span className="profile-name">{obj.profileName}</span>{" "}
              {obj.notificationText}{" "}
              <a className="notification-link" href="#">
                {obj.notificationLink}
              </a>
              {!read && <span className="red-circle"></span>}
            </p>
            <p className="notification-time">{obj.time}</p>
          </div>
        </div>
        {obj.picture !== "" && (
          <img className="own-image" src={obj.picture} alt="own image" />
        )}
      </div>
      {obj.msg !== "" && <p className="notification-msg">{obj.msg}</p>}
    </aside>
  );
}

NotificationsCard.propTypes = {
  obj: PropTypes.object,
  countRead: PropTypes.func,
  markAllAsRead: PropTypes.bool,
};

export default NotificationsCard;
