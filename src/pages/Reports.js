import "./Contacts.css";

function Reports() {
  return (
    <div className="wholePage">
      <h1>Reports</h1>
      <h3>
        If there is any bugs or incorrectness of data please submit the issue to
        us!
      </h3>
      <form className="report-form">
        <label htmlFor="report">Issue: </label>
        <input type="text" id="report" name="report"></input>
        <input type="submit" id="report-submit"></input>
      </form>
    </div>
  );
}

export default Reports;
