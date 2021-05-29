import "./Contacts.css";

function Contacts() {
  return (
    <div className="wholePage">
      <h1>Contacts</h1>
      <h3>A Portland State University Student Production</h3>
      <br></br>
      <p className="descrip">
        This is a joint school project by the following individuals:
      </p>
      <div id="cardHolder">
        <div className="card">
          <img src="/icons/mushroom.png" alt="mushroom" />
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
    </div>
  );
}

export default Contacts;
