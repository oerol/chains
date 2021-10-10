import * as React from "react";

import Card from "./components/Card";
import Navigation from "./components/Navigation";

interface DeckOverviewProps {}

const DeckOverview: React.FunctionComponent<DeckOverviewProps> = () => {
  const [editable, setEditable] = React.useState(true);
  const [reviewMode, setReviewMode] = React.useState(false);

  const handleOnClick = () => {
    console.log(reviewMode);

    setEditable((previous) => !previous);
    setReviewMode((previous) => !previous);
  };

  return (
    <React.Fragment>
      <Navigation
        changeGlobalReviewMode={() => handleOnClick()}
        reviewMode={!reviewMode}
      />
      <div id="mainContent">
        <Card editable={editable} reviewMode={!reviewMode} />
      </div>
    </React.Fragment>
  );
};

export default DeckOverview;
