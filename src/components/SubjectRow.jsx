function SubjectRow({ subject, mse, ese, onMseChange, onEseChange }) {
  const weighted = ((mse / 50) * 30) + ((ese / 100) * 70);

  return (
    <tr>
      <td>{subject.code}</td>
      <td>{subject.name}</td>
      <td>{subject.credits}</td>
      <td>
        <input
          type="number"
          min="0"
          max="50"
          value={mse}
          onChange={(e) => onMseChange(e.target.value)}
          className="mark-input"
        />
      </td>
      <td>
        <input
          type="number"
          min="0"
          max="100"
          value={ese}
          onChange={(e) => onEseChange(e.target.value)}
          className="mark-input"
        />
      </td>
      <td>{weighted.toFixed(2)}</td>
    </tr>
  );
}

export default SubjectRow;