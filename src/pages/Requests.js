// import { Redirect } from "react-router";
import "./Contacts.css";
// import { Link } from "react-router-dom";

function Requests() {
  const handleSubmit = (event) => {
    // event.preventDefault(); // we want default.
    // default is to actually post, but then returns page just with text: Support item created
    alert("Thank you! We'll look into it.");
    // can't figure out how to a. redirect, or b. respond to different post responses.
  };

  return (
    <div className="wholePage">
      <h1>Request</h1>
      <h3>
        If you want a specific item, type, or functionality to be added please
        let us know!
      </h3>
      <form
        className="report-form"
        action="/support"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="category">Type of Request:</label>
        <select name="category" id="category">
          <option value="Feature">Feature Request</option>
          <option value="Bug">Report a Bug</option>
          <option value="Data">Data Changes</option>
        </select>
        <label htmlFor="report">Request: </label>
        <textarea id="report" name="message"></textarea>
        {/* <Link to={"/"}> */}
        <input type="submit" id="report-submit"></input>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default Requests;
