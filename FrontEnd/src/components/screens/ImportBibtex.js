import React from "react";
import BibtexParse from "bibtex-parse-js";
import axios from "axios";
import Header from "../commons/Header";
import Footer from "../commons/Footer";

class ImportBibtex extends React.Component {
  constructor(props) {
    super(props);
    this.readBibFile = this.readBibFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // declare the state of the article field
    this.state = {
      title: "",
      authors: "",
      publication_type: "",
      publication: "",
      doi: "",
      year: "",
      location: "",
      status: "",
      rating: "",
      //isActive to check if the bib text file is selected
      isActive: false
    };
  }
  // read the bib file
  readBibFile(e) {
    let _input = null;
    let files = e.target.files;
    let reader = new FileReader();

    reader.readAsText(files[0]);

    reader.onload = e => {
      _input = e.target.result;
      // part the conent from the bibtex file to json format
      var sample = BibtexParse.toJSON(_input);
      var tags = sample[0].entryTags;
      // get all the elements from the json format and set for the states
      this.setState({ title: tags.title });
      this.setState({ authors: tags.author });
      this.setState({ publication_type: tags.journal });
      this.setState({ publication: tags.publisher });
      this.setState({ doi: tags.volume });
      this.setState({ year: tags.year });
      this.setState({ isActive: true });
    };
  }
  // handle the onSubmit event
  onSubmit(e) {
    if (this.state.isActive == false) {
      var preview = document.getElementById("show-text");
      preview.innerHTML = "<span>Please select a Bibtex file</span>";
    } else {
      e.preventDefault();
      const obj = {
        article_title: this.state.title,
        article_authors: this.state.authors,
        article_publication_type: this.state.publication_type,
        article_publication: this.state.publication,
        article_doi: this.state.doi,
        article_year: this.state.year,
        article_location: "N/A",
        article_status: "on_hold",
        article_rating: "0"
      };
      // call the api to add article to database
      axios.post("http://localhost:3001/articles/add", obj);
      this.setState({
        title: "",
        authors: "",
        publication_type: "",
        publication: "",
        doi: "",
        year: "",
        location: "",
        status: "",
        rating: ""
      });
      // inform user the article is added
      var preview = document.getElementById("show-ms");
      preview.innerHTML = "<span>Article has been added</span>";
    }
  }

  render() {
    return (
      <div className="container">
        <Header title="Upload Bibtex File" />
        <input
          className="btn"
          type="file"
          accept=".bib"
          onChange={e => this.readBibFile(e)}
        />
        <div id="show-text"> Choose Bibtex file to import</div>
        {/*  Load the value from bibtex file for user to preview */}
        <h4>Preview</h4>
        <table>
          <tr>
            <td>
              <span className="thick">Title:</span>
            </td>
            <td>{this.state.title}</td>
          </tr>
          <tr>
            <td>
              <span className="thick">Author:</span>
            </td>
            <td>{this.state.authors}</td>
          </tr>
          <tr>
            <td>
              <span className="thick">Publication Type:</span>
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
              <span className="thick">DOI:</span>
            </td>
            <td>{this.state.doi}</td>
          </tr>
          <tr>
            <td>
              <span className="thick">Year:</span>
            </td>
            <td>{this.state.year}</td>
          </tr>
        </table>
        <button className="btn" onClick={this.onSubmit}>
          Submit
        </button>
        <div id="show-ms"></div>
        <Footer />
      </div>
    );
  }
}

export default ImportBibtex;
