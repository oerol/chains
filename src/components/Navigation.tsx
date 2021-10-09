import * as React from "react";
import { setEnvironmentData } from "worker_threads";
import PomodoroTimer from "./PomodoroTimer";
import ReviewButton from "./ReviewButton";
import Axious from "axios";

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

  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    writeToDatabase();
  });

  const writeToDatabase = () => {
    Axious.post("http://localhost:3001/write", {
      insertQuestion: "baby",
      insertAnswer: "nein lol",
    }).then(() => {
      alert("wooback baby");
    });
  };
  return (
    <nav id="navigation-wrapper">
      <PomodoroTimer durationInMinutes={1} />

      <ReviewButton
        changeReviewMode={() => handleReviewButton()}
        reviewMode={props.reviewMode}
      ></ReviewButton>
      {data ? data : "Lade..."}
    </nav>
  );
};

export default Navigation;
