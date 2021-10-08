import * as React from "react";
import ReviewButton from "./ReviewButton";

interface NavigationProps {
  changeGlobalReviewMode: () => any;
}

const Navigation: React.FunctionComponent<NavigationProps> = (
  props: NavigationProps
) => {
  const [reviewMode, setReviewMode] = React.useState(false);
  const handleReviewButton = () => {
    setReviewMode(!reviewMode);
    props.changeGlobalReviewMode();
  };
  return (
    <nav id="navigation-wrapper">
      <ReviewButton
        changeReviewMode={() => handleReviewButton()}
        reviewMode={!reviewMode}
      ></ReviewButton>
    </nav>
  );
};

export default Navigation;
