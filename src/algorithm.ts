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
        let getNextReviewDate = this.toIsoString(
          this.addDays(response[0].nextReviewDate, nextReviewInDays)
        );

        console.log(nextReviewInDays, getNextReviewDate);

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
    console.log(result);
    return result;
  },
  toIsoString: function (date: Date) {
    // https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num: number) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
      };

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ":" +
      pad(tzo % 60)
    );
  },
};

export default algorithm;
