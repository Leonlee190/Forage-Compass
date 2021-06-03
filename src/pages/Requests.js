import "./Contacts.css";

function Requests() {
  return (
    <div className="wholePage">
      <h1>Request</h1>
      <h3>
        If you want a specific item, type, or functionality to be added please
        let us know!
      </h3>
      <form className="report-form">
        <label htmlFor="request">Request: </label>
        <input type="text" id="report" name="report"></input>
        <input type="submit" id="report-submit"></input>
      </form>
    </div>
  );
}

export default Requests;
