import * as React from "react";
import "./deck-selection.css";
import database from "./database";
import algorithm from "./algorithm";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";

export interface DeckSelectionState {
  id: number;
  module: number;
  title: string;
  description: string;
  dateCreated: string;
  reviewStatus: number;
  nextReviewDate: string;
}

const DeckSelection: React.FunctionComponent = () => {
  const [decks, setDecks] = React.useState<DeckSelectionState[]>([]);

  React.useEffect(() => {
    console.log("AINT NO WAY");
    database.getDecks().then((response) => {
      setDecks(response);
    });
  }, []);

  const handleOnClick = () => {
    let titleText = (document.getElementById("title") as HTMLInputElement)
      .value;
    let descriptionText = (
      document.getElementById("description") as HTMLInputElement
    ).value;

    database.createDeck(titleText, descriptionText).then((response) => {
      let copy = [...decks];
      copy.push(response);
      console.log(copy);
      setDecks(copy);
    });
  };

  const switchToDeckOverview = (deck: DeckSelectionState) => {
    console.log(deck);
  };

  const convertDate = (date: string) => {
    let result = new Date(date).toLocaleDateString("de-DE");

    return result;
  };
  return (
    <React.Fragment>
      <div className="placeholder-title">
        you can select a deck here.. if you'd like..
      </div>
      <main>
        <div className="createDeck">
          <input type="text" name="title" id="title" placeholder="Modulname" />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Beschreibung"
          />
          <button type="submit" onClick={handleOnClick}>
            Erstellen
          </button>
        </div>
        <div className="listDecks">
          <p>-- now the available ones.. sir.. --</p>
          {decks.map((deck, i) => (
            <Link to={`/deck/${deck.id}`} key={i}>
              <div
                className="deckOverview"
                key={deck.id}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  switchToDeckOverview(deck);
                }}
              >
                {i + 1}. {deck.title}{" "}
                <span className="date">{convertDate(deck.nextReviewDate)}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default DeckSelection;
