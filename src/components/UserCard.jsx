import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const UserCard = ({ user, dragAreaRef }) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const { _id, firstName, lastName, age, gender, about, skills } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) { }
  };

  useEffect(() => {
    if (!cardRef.current || !dragAreaRef?.current) return;

    const card = cardRef.current;
    const dragArea = dragAreaRef.current;
    const bounds = dragArea.getBoundingClientRect();
    const centerX = bounds.width / 2;

    const draggable = Draggable.create(card, {
      type: "x,y",
      inertia: true,
      bounds: dragArea,
      onDragEnd: function () {
        const cardBounds = card.getBoundingClientRect();
        const cardCenterX = cardBounds.x + cardBounds.width / 2 - bounds.x;

        gsap.to(card, {
          duration: 0.5,
          x: 0,
          y: 0,
          rotation: 0,
          ease: "power2.out",
          onComplete: () => {
            if (cardCenterX > centerX) {
              handleSendRequest("interested", _id);
            } else if (cardCenterX < centerX) {
              handleSendRequest("ignored", _id);
            }
          },
        });
      },
      onDrag: function () {
        const rotation = (this.x / bounds.width) * 20;
        gsap.set(card, { rotation: rotation });

        const progress = Math.abs(this.x) / (bounds.width / 4);
        if (this.x > 0) {
          card.style.backgroundColor = `rgba(0, 255, 0, ${progress * 0.2})`;
        } else {
          card.style.backgroundColor = `rgba(255, 0, 0, ${progress * 0.2})`;
        }
      },
    })[0];

    return () => {
      draggable.kill();
    };
  }, [_id, dragAreaRef]);

  return (
    <div
      ref={cardRef}
      className="card w-96 bg-gradient-to-br from-base-200 to-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 cursor-grab active:cursor-grabbing"
    >
      <figure className="relative overflow-hidden">
        <img
          src={user.photoURL}
          alt="photo"
          className="w-full h-64 object-cover object-top transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-base-300 to-transparent"></div>
      </figure>

      <div className="card-body p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="card-title text-2xl font-bold text-primary">
            {firstName + " " + lastName}
          </h2>
          <div className="badge badge-secondary font-medium"> 
            {`${age}, ${gender.charAt(0).toUpperCase()}${gender.slice(1)}`}
          </div>

        </div>

        <div className="divider my-2"></div>

        <p className="text-sm opacity-90 mb-2">
          {Array.isArray(skills)
            ? skills.length > 0
              ? skills.join(", ")
              : "No skills listed"
            : skills || "No skills listed"}
        </p>

        <p className="text-sm opacity-80 line-clamp-3">{about}</p>

        <div className="card-actions justify-center mt-4 space-x-4">
          <button
            className="btn btn-error btn-outline hover:scale-105 transform transition-transform duration-200 min-w-[100px]"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-success btn-outline hover:scale-105 transform transition-transform duration-200 min-w-[100px]"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
