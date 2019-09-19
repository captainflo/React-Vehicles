import React from "react";


class Footer extends React.Component {


  render() {
    return (
      <footer class="page-footer color-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Project by</h5>
            <p class="grey-text text-lighten-4">Florian Lahitte</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <ul>
              <li><a class="grey-text text-lighten-3" href="https://github.com/captainflo" target='_blank'><i class="fab fa-github"></i> Github</a></li>
              <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/florianlahitte/" target='_blank'><i class="fab fa-linkedin"></i> Linkedin</a></li>
              <li><a class="grey-text text-lighten-3" href="http://floweb.co/" target='_blank'><i class="fas fa-laptop"></i> webSite</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
        © 2019 Copyright Text
        </div>
      </div>
    </footer>
    );
  }
}



export default (Footer);
