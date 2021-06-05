import "./Contacts.css";
import axios from "axios";

function Requests() {
  const handleSubmit = (event) => {
    // We are handling the activity ourself, so we don't want default behavior
    event.preventDefault();

    // Prepare a payload for the sending to the REST API server:
    const dataPackage = {
      category: document.getElementById("category").value,
      message: document.getElementById("message").value,
    };

    // Since we're handling this ourselves, we need to make the call to the server vs. relying simply
    // on the path redirect the normal behavior would perform
    axios
      .post("/support", dataPackage)
      .then((response) => {
        alert("Thank you! We'll look into it");
        // Since we were successfull, we'll redirect back to the main map page
        window.location.replace("/");
      })
      .catch((error) => {
        if (
          error.response.status === 406 &&
          error.response.data.includes("Message")
        ) {
          alert("Oops! Looks like there was no request entered.");
        } else {
          alert(
            "Oops! An error occurred during submission.  Please try again later."
          );
          console.log(
            `Request submission error:  ${error.response.status}: ${error.response.data}`
          );
        }
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    window.location = "/";
    return false;
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
        <label htmlFor="message">Request: </label>
        <textarea id="message" name="message"></textarea>
        <input type="submit" id="request-submit" value="Submit"></input>
        <button type="button" id="request-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Requests;
