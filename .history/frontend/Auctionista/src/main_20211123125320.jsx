import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BidContext from "./contexts/BidContextProvider";
import CategoryContext from "./contexts/CategoryContextProvider";
import ImageContext from "./contexts/ImageContextProvider";
import LocationContext from "./contexts/LocationContextProvider";
import ProductContext from "./contexts/ProductContextProvider";
import SearchParmContext from "./contexts/SearchParmContextProvider";
import UserContext from "./contexts/UserContextProvider";
import "./index.css";

const CLIENT_ID = "90167992744-ke5qisilesjagf66v907i2te58gjaufg.apps.googleusercontent.com";

function start() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: CLIENT_ID,
      // scope: "https://www.googleapis.com/auth/calendar.events"
    });
  });
}

document.querySelector('#signinButton').addEventlistener('click', () => {
  auth2.grantOfflineAccess().then(signInCallback);
});

async function signInCallback(authResult) {
  console.log('authResult', authResult);

  if (authResult['code']) {

    // Hide the sign-in button now that the user is authorized

    // Send the code to the server
    let result = await fetch('/storeauthcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: authResult['code']
    });
    // etc...
  } else {
    // There was an error.
  }
}

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <ProductContext>
        <LocationContext>
          <CategoryContext>
            <SearchParmContext>
              <ImageContext>
                <BidContext>
                  <App />
                </BidContext>
              </ImageContext>
            </SearchParmContext>
          </CategoryContext>
        </LocationContext>
      </ProductContext>
    </UserContext>
  </React.StrictMode>,
  document.getElementById("root")
);
