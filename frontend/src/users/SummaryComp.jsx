import "./SummaryComp.css";
import { useEffect, useState } from "react";

function SummaryComp({ userData, settingData }) {
  const [total, setTotal] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [lateCount, setLateCount] = useState([]);
  const [ratio, setRatio] = useState(0);

  const totalNum = async () => {
    let data = await fetch("http://localhost:3000/grades/macro", {
      method: "GET",
      credentials: "include",
    });
    data = await data.json();
    return [data.projectCount, data.sessionCount];
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

    const countTotals = async () => {
      const totals = await totalNum();
      setTotal(totals[0]);
    };
    const lateTotals = () => {
      let count = 0;
      for (let i = 0; i < completed; i++) {
        if (userData[0][i].late) {
          count += 1;
        }
      }
      setLateCount(count);
    };
    setCompleted(userData[0].length);
    countTotals();
    lateTotals();
  }, [userData, settingData]);

  useEffect(() => {
    const newRatio = Math.ceil((completed / total) * 100);
    setRatio(newRatio);
    console.log(ratio);
  }, [completed, total]);

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
        {!completed || !total ? (
          <p className="cabin-font summaryText text1">Loading...</p>
        ) : (
          <p className=" cabin-font summaryText text1">
            {completed} out of {total} requirements completed
          </p>
        )}
        <p className=" cabin-font summaryText">
          {lateCount} out of 2 late submissions used
        </p>
        <p className="cabin-font" id="summaryComment">
          (Placement into EIIG will not be guaranteed if more than 2 late
          submissions submitted)
        </p>
      </div>
    </div>
  );
}

export default SummaryComp;
