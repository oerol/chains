import * as React from "react";
import { Link } from "react-router-dom";
import PomodoroTimer from "./PomodoroTimer";
import ReviewButton from "./ReviewButton";

interface NavigationProps {
  changeGlobalReviewMode: () => any;
  reviewMode: boolean;
}

const Navigation: React.FunctionComponent<NavigationProps> = (
  props: NavigationProps
) => {
  const handleReviewButton = () => {
    props.changeGlobalReviewMode();
  };
  return (
    <nav id="navigation-wrapper">
      <PomodoroTimer durationInMinutes={1} />
      <Link to={"/"}>
        <button id="switchToDeckSelection">Decks</button>
      </Link>
      <ReviewButton
        changeReviewMode={() => handleReviewButton()}
        reviewMode={props.reviewMode}
      ></ReviewButton>
    </nav>
  );
};

export default Navigation;
