import React from "react";
import Searchbar from "./mini_components/Searchbar";
import Topbar from "./mini_components/Topbar";

const FaqsHelp = () => {
  return (
    <>
      <Topbar />
      <div className="notification p-5">
        <div className="p-4 shadow">
          <div>
            <h1 style={{ color: "#8443e5" }}>Faq's and Help </h1>
            <p className="purple_title">How we can help you?</p>
          </div>
          <Searchbar />
          <hr />
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h3>Popular Guides</h3>
            <div className="d-flex justify-content-between w-50">
              <div className="text-primary">
                <p>Installation Guides</p>
                <p>Installation Guides</p>
              </div>
              <div className="text-primary">
                <p>Installation Guides</p>
                <p>Installation Guides</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div class="card" style={{ width: "20rem" }}>
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div class="card" style={{ width: "20rem" }}>
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div class="card" style={{ width: "20rem" }}>
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div class="card" style={{ width: "20rem" }}>
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div class="card" style={{ width: "20rem" }}>
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div class="card" style={{ width: "20rem" }}>
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqsHelp;
