import React from "react";


class Footer extends React.Component {


  render() {
    return (
      <div className="footer">
        <div className="footer-links">
          <a href="#!"><i className="fab fa-github"></i></a>
          <a href="#!"><i className="fab fa-instagram"></i></a>
          <a href="#!"><i className="fab fa-facebook"></i></a>
          <a href="#!"><i className="fab fa-twitter"></i></a>
          <a href="#!"><i className="fab fa-linkedin"></i></a>
        </div>
        <div className="footer-copyright">
          This footer is made with <i className="fas fa-heart"></i> at Le Wagon
        </div>
      </div>
    );
  }
}



export default (Footer);
