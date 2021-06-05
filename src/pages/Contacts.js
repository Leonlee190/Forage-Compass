import "./Contacts.css";
import * as imIcons from "react-icons/im";

// current build responsive up until about
// height less than 600.. then need to redesign css, or build more.
function Contacts() {
  return (
    <div className="wholePage">
      <h1>Contacts</h1>
      <h3>A Portland State University Student Production</h3>
      <p className="descrip">
        This is a joint school project by the following individuals:
      </p>
      <div id="cardHolder">
        <div className="card">
          <img src="/icons/chantrelle.png" alt="mushroom" />
          <h3>Leon Lee</h3>
          <p>seung2 AT pdx DOT edu</p>
        </div>
        <div className="card">
          <img src="/icons/blackberry.png" alt="blackberry" />
          <h3>Camilo Schaser-Hughes</h3>
          <p>camilo3 AT pdx DOT edu</p>
        </div>

        <div className="card">
          <img src="/icons/cherry.png" alt="blackberry" />
          <h3>Mark Wingall</h3>
          <p>mwignall AT pdx DOT edu</p>
        </div>
      </div>
      <p className="talking">
        Please let us know if you tried out our web application and how you
        liked it, or if you have any questions, comments, concerns, etc.
        Hopefully we can continue to work on, update, and improve over time.
      </p>
      <p className="talking">
        <imIcons.ImGithub
          className="icon-git"
          size={30}
          onClick={() =>
            window.open(
              "https://github.com/Leonlee190/Forage-Compass",
              "_blank"
            )
          }
        />
      </p>
    </div>
  );
}

export default Contacts;
