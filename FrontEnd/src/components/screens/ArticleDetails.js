import React, { Component } from "react";

class ArticleDetails extends Component {
  render() {
    console.log(this.props.location.state); // Save data of the section
    return (
      <div>
        <div> New Screen </div>
      </div>
    );
  }
}

export default ArticleDetails;
