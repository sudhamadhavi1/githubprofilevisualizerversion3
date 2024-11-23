// import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";

import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";

const CommitGraph = (props) => {
 const {sampleDates} = props

  // const sampleDates = [
  //   { date: new Date("2024-08-17"), count: 5 },
  //   { date: new Date("2024-04-26"), count: 2 },
  //   { date: new Date("2024-04-28"), count: 4 },
  //   { date: new Date("2024-06-28"), count: 2 },
  //   { date: new Date("2024-01-28"), count: 1 },
  // ];

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 232); // Past six months from today

  return (
    <div>
      <h1>Commit History</h1>
      <p>Commit history of the last six months</p>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={sampleDates}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-gitlab-${value.count}`;
        }}
        tooltipDataAttrs={(value) => ({
          "data-tooltip-id": "commit-tooltip",
          "data-tooltip-content": `Commits: ${value?.count || 0}`,
        })}
        showWeekdayLabels={true}
      />
      <Tooltip
        id="commit-tooltip"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white" }}
      />
    </div>
  );
};

export default CommitGraph;

