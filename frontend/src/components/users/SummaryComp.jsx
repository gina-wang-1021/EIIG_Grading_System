import "../../styles/SummaryComp.css";
import { useEffect, useState } from "react";

function SummaryComp({ userData, settingData }) {
  const [total, setTotal] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [lateCount, setLateCount] = useState(null);
  const [ratio, setRatio] = useState(null);

  const totalNum = async () => {
    let data = await fetch("http://localhost:3000/grades/macro", {
      method: "GET",
      credentials: "include",
    });
    data = await data.json();
    return [data.projectCount, data.sessionCount];
  };

  const calculateData = async () => {
    const totals = await totalNum();
    setTotal(totals[0]);

    const completedCount = userData[0].length;
    setCompleted(completedCount);

    let lateSubmissionCount = 0;
    for (let i = 0; i < completedCount; i++) {
      if (userData[0][i].late) {
        lateSubmissionCount += 1;
      }
    }
    setLateCount(lateSubmissionCount);
  };

  useEffect(() => {
    if (
      !userData ||
      !settingData ||
      userData.length === 0 ||
      settingData.length === 0
    ) {
      return;
    }

    calculateData();
  }, [userData, settingData]);

  useEffect(() => {
    const newRatio = Math.ceil((completed / total) * 100);
    setRatio(newRatio);
  }, [total]);

  return (
    <div id="sumCompAll">
      <div id="progressAll">
        {!ratio ? (
          <>
            <p id="progressText">0%</p>
            <progress value={ratio} max={100} id="progressBar">
              0%
            </progress>
          </>
        ) : (
          <>
            <p id="progressText">{ratio}%</p>
            <progress value={ratio} max={100} id="progressBar">
              {ratio}%
            </progress>
          </>
        )}
      </div>
      <div id="summaryAll">
        {!completed || !total || !lateCount ? (
          <>
            <p className="cabin-font summaryText" id="summaryLoading">
              Loading...
            </p>
          </>
        ) : (
          <>
            <p className=" cabin-font summaryText text1">
              {completed} out of {total} requirements completed
            </p>
            <p className=" cabin-font summaryText">
              {lateCount} out of 2 late submissions used
            </p>
            <p className="cabin-font summaryComment">
              (Placement into EIIG will not be guaranteed if more than 2 late
              submissions submitted)
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SummaryComp;
