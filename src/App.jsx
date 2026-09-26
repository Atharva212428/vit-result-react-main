import { useState } from "react";
import "./App.css";

function App() {
  const subjects = [
    "Data Structures",
    "Database Management System",
    "Operating System",
    "Computer Networks",
  ];

  const [student, setStudent] = useState({
    name: "",
    prn: "",
    className: "",
  });

  const [errors, setErrors] = useState({});

  const [marks, setMarks] = useState(
    subjects.map(() => ({
      mse: "",
      ese: "",
    }))
  );

  const [result, setResult] = useState(null);

  // Handle student information
  const handleStudentChange = (field, value) => {
    setStudent({
      ...student,
      [field]: value,
    });

    // Remove error while typing
    setErrors({
      ...errors,
      [field]: "",
    });
  };

  // Handle marks
  const handleChange = (index, field, value) => {
    const updatedMarks = [...marks];

    // Limit MSE to 30
    if (field === "mse" && Number(value) > 30) {
      value = "30";
    }

    // Limit ESE to 70
    if (field === "ese" && Number(value) > 70) {
      value = "70";
    }

    updatedMarks[index][field] = value;

    setMarks(updatedMarks);
  };

  // Validate student information
  const validateStudent = () => {
    const newErrors = {};

    // Name validation
    if (!student.name.trim()) {
      newErrors.name = "Student name is required.";
    } else if (!/^[A-Za-z ]+$/.test(student.name.trim())) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    // PRN validation
    if (!student.prn.trim()) {
      newErrors.prn = "PRN is required.";
    } else if (!/^\d{8}$/.test(student.prn.trim())) {
      newErrors.prn = "PRN must contain exactly 8 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Calculate result
  const calculateResult = () => {
    // First validate student information
    if (!validateStudent()) {
      setResult(null);
      return;
    }

    const calculatedResult = marks.map((subject) => {
      const mse = Number(subject.mse) || 0;
      const ese = Number(subject.ese) || 0;

      const finalMarks = mse + ese;

      let grade;

      if (finalMarks >= 90) {
        grade = "A+";
      } else if (finalMarks >= 80) {
        grade = "A";
      } else if (finalMarks >= 70) {
        grade = "B+";
      } else if (finalMarks >= 60) {
        grade = "B";
      } else if (finalMarks >= 50) {
        grade = "C";
      } else if (finalMarks >= 40) {
        grade = "D";
      } else {
        grade = "F";
      }

      return {
        mse,
        ese,
        finalMarks,
        grade,
      };
    });

    setResult(calculatedResult);
  };

  const calculateAverage = () => {
    if (!result) return 0;

    const total = result.reduce(
      (sum, subject) => sum + subject.finalMarks,
      0
    );

    return (total / result.length).toFixed(2);
  };

  return (
    <div className="app">
      {/* Header */}
      <header>
        <div className="header-content">
          <div className="logo">VIT</div>

          <div>
            <h1>VIT Semester Result</h1>
            <p>Semester Result Preparation System</p>
          </div>

          <div className="student-tag">
            <p className="student-tag-name">Atharva H Narharshettiwar</p>
            <p className="student-tag-roll">Roll No: 46</p>
          </div>
        </div>
      </header>

      {/* Student Information */}
      <section className="student-card">
        <div className="section-title">
          <span className="section-icon">👨‍🎓</span>
          <div>
            <h2>Student Information</h2>
            <p>Enter your basic academic details</p>
          </div>
        </div>

        <div className="student-grid">
          {/* Name */}
          <div className="input-group">
            <label>
              Student Name <span>*</span>
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={student.name}
              onChange={(e) =>
                handleStudentChange("name", e.target.value)
              }
              className={errors.name ? "input-error" : ""}
            />

            {errors.name && (
              <small className="error-message">
                ⚠ {errors.name}
              </small>
            )}
          </div>

          {/* PRN */}
          <div className="input-group">
            <label>
              PRN <span>*</span>
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength="8"
              placeholder="Enter 8-digit PRN"
              value={student.prn}
              onChange={(e) => {
                const value = e.target.value;

                // Only allow numbers
                if (/^\d*$/.test(value)) {
                  handleStudentChange("prn", value);
                }
              }}
              className={errors.prn ? "input-error" : ""}
            />

            {errors.prn && (
              <small className="error-message">
                ⚠ {errors.prn}
              </small>
            )}
          </div>

          {/* Class */}
          <div className="input-group">
            <label>Class</label>

            <input
              type="text"
              placeholder="Example: TY CS-H"
              value={student.className}
              onChange={(e) =>
                handleStudentChange("className", e.target.value)
              }
            />
          </div>

          {/* Semester */}
          <div className="input-group">
            <label>Semester</label>

            <input
              type="text"
              value="Semester 1"
              readOnly
              className="readonly-input"
            />
          </div>
        </div>
      </section>

      {/* Marks */}
      <section className="result-card">
        <div className="section-title">
          <span className="section-icon">📊</span>
          <div>
            <h2>Enter Subject Marks</h2>
            <p>Enter MSE and ESE marks for each subject</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>MSE / 30</th>
                <th>ESE / 70</th>
                <th>Final / 100</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject}>
                  <td className="subject-name">{subject}</td>

                  <td>
                    <input
                      className="marks-input"
                      type="number"
                      min="0"
                      max="30"
                      placeholder="0-30"
                      value={marks[index].mse}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "mse",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      className="marks-input"
                      type="number"
                      min="0"
                      max="70"
                      placeholder="0-70"
                      value={marks[index].ese}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "ese",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td className="final-marks">
                    {result ? result[index].finalMarks : "-"}
                  </td>

                  <td>
                    {result ? (
                      <span
                        className={`grade grade-${result[
                          index
                        ].grade.replace("+", "plus")}`}
                      >
                        {result[index].grade}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={calculateResult}
          className="calculate-btn"
        >
          Calculate Result
        </button>
      </section>

      {/* Summary */}
      {result && (
        <section className="summary">
          <div className="section-title">
            <span className="section-icon">🏆</span>
            <div>
              <h2>Result Summary</h2>
              <p>Your calculated semester performance</p>
            </div>
          </div>

          <div className="summary-grid">
            <div className="summary-box">
              <span className="summary-icon">📈</span>
              <h3>Average Marks</h3>
              <p>{calculateAverage()}/100</p>
            </div>

            <div className="summary-box">
              <span className="summary-icon">📚</span>
              <h3>Total Subjects</h3>
              <p>{subjects.length}</p>
            </div>

            <div className="summary-box">
              <span className="summary-icon">
                {result.some(
                  (subject) => subject.grade === "F"
                )
                  ? "❌"
                  : "✅"}
              </span>

              <h3>Status</h3>

              <p
                className={
                  result.some(
                    (subject) => subject.grade === "F"
                  )
                    ? "fail"
                    : "pass"
                }
              >
                {result.some(
                  (subject) => subject.grade === "F"
                )
                  ? "FAIL"
                  : "PASS"}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer>
        <p>VIT Semester Result Preparation System</p>
        <span>© 2026 | Developed for Academic Use</span>
      </footer>
    </div>
  );
}

export default App;
