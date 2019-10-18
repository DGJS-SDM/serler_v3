import React from "react";
import axios from "axios";
import Header from "../commons/Header";
import Footer from "../commons/Footer";

class ArticleDetails extends React.Component {
  constructor(props) {
    super(props);

    // declare the state of the article field
    this.state = {
      title: "",
      authors: "",
      semethod: "",
      semethodology: "",
      researchQuestion: "",
      researchResult: "",
      publication_type: "",
      publication: "",
      doi: "",
      year: "",
      location: "",
      rating: ""
    };
  }

  // call API to get article details by id
  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/articles/detail/" + this.props.match.params.id
      )
      .then(response => {
        // get value of all the fields from database and set for the state
        this.setState({
          title: response.data.article_title,
          authors: response.data.article_authors,
          semethod: response.data.article_seMethod,
          semethodology: response.data.article_seMethodology,
          researchQuestion: response.data.article_research_question,
          researchResult: response.data.article_researchResult,
          publication_type: response.data.article_publication_type,
          publication: response.data.article_publication,
          doi: response.data.article_doi,
          year: response.data.article_year,
          location: response.data.article_location,
          rating: response.data.article_rating
        });
        console.log(this.state.article_title);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // display article details by assign all the states to the htlm tag
  render() {
    return (
      <div className="container">
        <Header title="Article Details" />
        <ul className="collection with-header">
          <li className="collection-header">
            <h4>{this.state.title}</h4>
          </li>

          <table>
            <tr>
              <td colspan="2">
                <h6 className="thick-blue">General Information</h6>
              </td>
            </tr>
            <tr>
              <td>
                <span className="thick">Author</span>
              </td>
              <td>{this.state.authors}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Publication Type: </span>
              </td>
              <td>{this.state.publication_type}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Publication:</span>
              </td>
              <td>{this.state.publication}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Year:</span>
              </td>
              <td>{this.state.year}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Location:</span>
              </td>
              <td>{this.state.location}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Rating:</span>
              </td>
              <td>{this.state.rating}</td>
            </tr>

            <tr>
              <td colspan="2">
                <h6 className="thick-blue">Analysis Information</h6>
              </td>
            </tr>
            <tr>
              <td>
                <span className="thick">SE Method:</span>
              </td>
              <td>{this.state.semethod}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">SE Methodology:</span>
              </td>
              <td>{this.state.semethodology}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Research Question:</span>
              </td>
              <td>{this.state.researchQuestion}</td>
            </tr>
            <tr>
              <td>
                <span className="thick">Research Result:</span>
              </td>
              <td>{this.state.researchResult}</td>
            </tr>
          </table>
        </ul>
        <Footer />
      </div>
    );
  }
}

export default ArticleDetails;
