import "./SummaryComp.css";

function SummaryComp() {
  return (
    <div id="sumCompAll">
      <div id="progressAll">
        <p id="progressText">80%</p>
        <progress value={80} max={100} id="progressBar">
          80%
        </progress>
      </div>
      <div id="summaryAll">
        <p className=" cabin-font summaryText" id="text1">
          5 out of 6 requirements completed
        </p>
        <p className=" cabin-font summaryText">
          1 out of 2 late submissions used
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
