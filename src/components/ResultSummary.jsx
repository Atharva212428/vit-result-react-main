function calculateGrade(percentage) {
  if (percentage >= 90) return 'S';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  if (percentage >= 40) return 'E';
  return 'F';
}

function ResultSummary({ totalWeighted, totalCredits, percentage }) {
  const grade = calculateGrade(percentage);
  const isPass = percentage >= 40;

  return (
    <div className={`result-summary ${isPass ? 'pass' : 'fail'}`}>
      <h3>Result Summary</h3>
      <div className="summary-grid">
        <div>
          <span className="label">Total Credits</span>
          <span className="value">{totalCredits}</span>
        </div>
        <div>
          <span className="label">Total Weighted Marks</span>
          <span className="value">{totalWeighted.toFixed(2)} / 400</span>
        </div>
        <div>
          <span className="label">Percentage</span>
          <span className="value">{percentage.toFixed(2)}%</span>
        </div>
        <div>
          <span className="label">Grade</span>
          <span className="value grade-badge">{grade}</span>
        </div>
        <div>
          <span className="label">Status</span>
          <span className="value">{isPass ? 'PASS' : 'FAIL'}</span>
        </div>
      </div>
    </div>
  );
}

export default ResultSummary;