import database from "./database";

const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

const algorithm = {
  getNextLearningDate: function (deckId: number) {
    database
      .getDeck(deckId)
      .then((response: { reviewStatus: number; nextReviewDate: string }[]) => {
        console.log(response[0].reviewStatus);
        console.log(response[0].nextReviewDate);
        let nextReviewInDays =
          fibonacci[response[0].reviewStatus] +
          fibonacci[response[0].reviewStatus + 1];
        let getNextReviewDate = this.addDays(
          response[0].nextReviewDate,
          nextReviewInDays
        )
          .toISOString()
          .substring(0, 10);

        console.log("PAPY: " + getNextReviewDate);

        database.updateDeck(
          deckId,
          getNextReviewDate,
          response[0].reviewStatus + 1
        );
      });
  },
  addDays: function (date: string, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
};

export default algorithm;
