import * as React from "react";
import Countdown from "react-countdown";

interface Duration {
  durationInMinutes: number;
}

type Bleed = {
  formatted: {
    minutes: string;
    seconds: string;
  };
};

let minute: number = 1000 * 60;

const PomodoroTimer: React.FunctionComponent<Duration> = ({
  durationInMinutes,
}) => {
  // Random component
  const Completionist = () => <span>End of Learnsession</span>;

  // Renderer callback with condition
  const renderer = ({
    formatted: { minutes = "00", seconds = "00" },
  }: Bleed) => {
    if (minutes === "00" && seconds === "00") {
      return <Completionist />;
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };
  return (
    <Countdown
      date={Date.now() + durationInMinutes * minute}
      renderer={renderer}
    />
  );
};

export default PomodoroTimer;
