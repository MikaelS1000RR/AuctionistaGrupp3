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
