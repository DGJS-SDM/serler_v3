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
    this.state = {
      article_title: "",
      article_authors: "",
      article_publication_type: "",
      article_publication: "",
      article_doi: "",
      article_year: "",
      article_location: "",
      article_method: "",
      article_status: "",
      article_rating: ""
    };
  }

  readBibFile(e) {
    let _input = null;
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = (e) => {
      _input = e.target.result;
      var sample = BibtexParse.toJSON(_input);
      var tags = sample[0].entryTags;
      this.setState({ article_title: tags.title });
      this.setState({ article_authors: tags.author });
      this.setState({ article_publication_type: tags.journal });
      this.setState({ article_publication: tags.publisher });
      this.setState({ article_doi: tags.volume });
      this.setState({ article_year: tags.year });
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      article_title: this.state.article_title,
      article_authors: this.state.article_authors,
      article_publication_type: this.state.article_publication_type,
      article_publication: this.state.article_publication,
      article_doi: this.state.article_doi,
      article_year: this.state.article_year,
      article_location: "N/A",
      article_method: "N/A",
      article_status: "on_hold",
      article_rating: "0"
    };
    axios.post("http://localhost:3001/articles/add", obj);
    var preview = document.getElementById("show-text");
    preview.innerHTML = "<span>Article has been added</span>";
    //.then((res) => console.log(res.data));
  }

  render() {
    return (
      <div>
        <Header title="Upload Bibtex File" />
        <input
          className="btn"
          type="file"
          onChange={(e) => this.readBibFile(e)}
        />
        <div id="show-text"> Choose Bibtex file to import</div>
        <h1>Preview</h1>
        <p>Title: {this.state.article_title}</p>
        <p>Author: {this.state.article_authors}</p>
        <p>Type: {this.state.article_publication_type}</p>
        <p>Publiccation: {this.state.article_publication}</p>
        <p>DOI: {this.state.article_doi}</p>
        <p>Year: {this.state.article_year}</p>
        <button className="btn" onClick={this.onSubmit}>
          Submit
        </button>
        <Footer />
      </div>
    );
  }
}

export default ImportBibtex;
