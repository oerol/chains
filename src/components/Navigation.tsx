import * as React from "react";
import { setEnvironmentData } from "worker_threads";
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

      <ReviewButton
        changeReviewMode={() => handleReviewButton()}
        reviewMode={props.reviewMode}
      ></ReviewButton>
    </nav>
  );
};

export default Navigation;
