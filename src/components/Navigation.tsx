import * as React from "react";
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
      <ReviewButton
        changeReviewMode={() => handleReviewButton()}
        reviewMode={props.reviewMode}
      ></ReviewButton>
    </nav>
  );
};

export default Navigation;
