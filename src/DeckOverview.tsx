import * as React from "react";
import { RouteComponentProps } from "react-router";

import Card from "./components/Card";
import Navigation from "./components/Navigation";

export interface DeckOverviewProps
  extends RouteComponentProps<{ id: string }> {}

const DeckOverview: React.FunctionComponent<DeckOverviewProps> = ({
  match: {
    params: { id },
  },
}) => {
  const [editable, setEditable] = React.useState(true);
  const [reviewMode, setReviewMode] = React.useState(false);

  const handleOnClick = () => {
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
        <Card
          editable={editable}
          reviewMode={!reviewMode}
          currentDeck={parseInt(id)}
        />
      </div>
    </React.Fragment>
  );
};

export default DeckOverview;
