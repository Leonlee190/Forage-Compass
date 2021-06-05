import "./Contacts.css";

function Requests() {
  return (
    <div className="wholePage">
      <h1>Request</h1>
      <h3>
        If you want a specific item, type, or functionality to be added please
        let us know!
      </h3>
      <form className="report-form" action="/support" method="post">
        <label htmlFor="category">Type of Request:</label>
        <select name="category" id="category">
          <option value="Feature">Feature Request</option>
          <option value="Bug">Report a Bug</option>
          <option value="Data">Data Changes</option>
        </select>
        <label htmlFor="request">Request: </label>
        <input type="text" id="report" name="message"></input>
        <input type="submit" id="report-submit"></input>
      </form>
    </div>
  );
}

export default Requests;
