import * as React from "react";
import Countdown from "react-countdown";
import "./pomodoro-timer-style.css";

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
  const Completionist = () => (
    <div id="pomodoroTimer">
      <span>End!</span>
    </div>
  );

  // Renderer callback with condition
  const renderer = ({
    formatted: { minutes = "00", seconds = "00" },
  }: Bleed) => {
    if (minutes === "00" && seconds === "00") {
      return <Completionist />;
    } else {
      return (
        <div id="pomodoroTimer">
          <span>{minutes}</span>
          <span id="pomodoroTimerSpacer">:</span>
          <span>{seconds}</span>
        </div>
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
