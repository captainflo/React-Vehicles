import React from "react";


class Footer extends React.Component {


  render() {
    return (
      <footer className="page-footer color-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Project by</h5>
            <p className="grey-text text-lighten-4">Florian Lahitte</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" href="https://github.com/captainflo" target='_blank'><i className="fab fa-github"></i> Github</a></li>
              <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" href="https://www.linkedin.com/in/florianlahitte/" target='_blank'><i className="fab fa-linkedin"></i> Linkedin</a></li>
              <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" href="http://floweb.co/" target='_blank'><i className="fas fa-laptop"></i> webSite</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2019 Copyright Text
        </div>
      </div>
    </footer>
    );
  }
}



export default (Footer);
