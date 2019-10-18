/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import M from "materialize-css";
import "./Home.css";
import Header from "../commons/Header";
import Footer from "../commons/Footer";
import { getDataByCondition } from "../../actions/home.action";

class Home extends Component {
  constructor(props) {
    super(props);
    // Declare and set default values for state
    this.state = {
      articles: [],
      type: "keywords", // keywords - filters
      search: "",

      // The below 4 variables are applied for year range
      min: 1960,
      // the 'max' value of year is the current
      max: new Date().getFullYear(),
      // the intial 'from' value is the current minus 1
      from: new Date().getFullYear() - 1,
      // the intial 'to' value is the current year
      to: new Date().getFullYear(),

      // Declare and assign initial values to the checkboxes that will appear on the popup for selecting columns
      checkBox: {
        analyst: true,
        author: false,
        doi: false,
        participants: false,
        researchQuestion: true,
        researchResult: false,
        seMethod: true,
        seMethodology: true,
        title: true,
        type: true,
        year: true
      },

      // Declare the fields and their fixed values (if any) that will be used on the search filter
      field: [
        {
          id: 0,
          name: "Select Category"
        },
        {
          id: 1,
          name: "Author"
        },
        {
          id: 2,
          name: "DOI"
        },
        {
          id: 3,
          name: "SE Method",
          option: [
            { name: "BDD", value: "BDD" },
            { name: "Burn down charts", value: "Burn down charts" },
            { name: "Code sharing", value: "Code sharing" },
            { name: "Continuous integration", value: "Continuous integration" },
            { name: "Daily standup", value: "Daily standup" },
            { name: "Meeting", value: "Meeting" },
            { name: "Pair programming", value: "Pair programming" },
            { name: "Planning poker", value: "Planning poker" },
            {
              name: "Requirements prioritisation",
              value: "Requirements prioritisation"
            },
            { name: "Restrospectives", value: "Restrospectives" },
            { name: "Storyboards", value: "Storyboards" },
            { name: "TDD", value: "TDD" },
            { name: "User story mapping", value: "User story mapping" },
            { name: "Version control", value: "Version control" }
          ]
        },
        {
          id: 4,
          name: "SE Methodology",
          option: [
            { name: "Agile", value: "Agile" },
            {
              name: "Aspect Oriented Development",
              value: "Aspect Oriented Development"
            },
            { name: "Clean Room", value: "Clean Room" },
            { name: "Cloud computing", value: "Cloud computing" },
            { name: "Crystal", value: "Crystal" },
            {
              name: "Domain Driven Development",
              value: "Domain Driven Development"
            },
            {
              name: "Feature Driven Development",
              value: "Feature Driven Development"
            },
            { name: "Formal methods", value: "Formal methods" },
            {
              name: "Model Driven Development",
              value: "Model Driven Development"
            },
            {
              name: "Problem Driven Development",
              value: "Problem Driven Development"
            },
            {
              name: "Product Driven Development",
              value: "Product Driven Development"
            },
            { name: "Scrum", value: "Scrum" },
            {
              name: "Service Oriented Development",
              value: "Service Oriented Development"
            },
            {
              name: "Spiral Rational Unified Process",
              value: "Spiral Rational Unified Process"
            },
            {
              name: "Values Driven Development",
              value: "Values Driven Development"
            },
            { name: "Waterfall", value: "Waterfall" },
            { name: "XP", value: "XP" }
          ]
        },
        {
          id: 5,
          name: "Title"
        },
        {
          id: 6,
          name: "Type",
          option: [
            { name: "Article", value: "Article" },
            { name: "Book", value: "Book" },
            { name: "Master thesis", value: "Master thesis" },
            { name: "Misc", value: "Misc" },
            { name: "Phd thesis", value: "Phd thesis" },
            { name: "Conference", value: "Conference" },
            { name: "Journal", value: "Journal" }
          ]
        }
      ],

      // Each condition row contains 4 elements: syntax, field, operator and field value
      conditions: [
        {
          syntax: "AND", // AND - OR - NOT
          field: 0, // field ID
          operator: "Equal to", // Equal to - Not Equal to
          value: "" // field's value
        }
      ]
    };
  }

  // ------------------ Start to render the page -------------------
  componentDidMount() {
    M.AutoInit();
    document
      .getElementById("tableSection")
      .addEventListener("contextmenu", function(event) {
        event.preventDefault();
        console.log("right click table");
        M.Modal.init(document.getElementById("modalCheckBox")).open();
      });
  }

  // -------------------------- FUNCTIONS --------------------------

  // Set the value of Analyst checkbox
  toggleAnalystCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        title: !checkBox.analyst
      }
    });
  };

  // Set the value of Author checkbox
  toggleAuthorCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        author: !checkBox.author
      }
    });
  };

  // Set the value of DOI checkbox
  toggleDoiCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        doi: !checkBox.doi
      }
    });
  };

  // Set the value of Participants checkbox
  toggleParticipantsCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        participants: !checkBox.participants
      }
    });
  };

  // Set the value of Research Question checkbox
  toggleResearchQuestionCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        researchQuestion: !checkBox.researchQuestion
      }
    });
  };

  // Set the value of Research Result checkbox
  toggleResearchResultCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        researchResult: !checkBox.researchResult
      }
    });
  };

  // Set the value of SE Method checkbox
  toggleSeMethodCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        seMethod: !checkBox.seMethod
      }
    });
  };

  // Set the value of SE Methodology checkbox
  toggleSeMethodologyCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        seMethodology: !checkBox.seMethodology
      }
    });
  };

  // Set the value of Title checkbox
  toggleTitleCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        title: !checkBox.title
      }
    });
  };

  // Set the value of Type checkbox
  toggleTypeCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        type: !checkBox.type
      }
    });
  };

  // Set the value of Year checkbox
  toggleYearCheckBox = () => {
    const { checkBox } = this.state;
    this.setState({
      checkBox: {
        ...checkBox,
        year: !checkBox.year
      }
    });
  };

  // Set the value of Text Input for Search by Keywords
  onTextInputSearchChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  // -------------------------- Select Year Range --------------------------
  onSelectBoxSearch = (type, event) => {
    if (event.target.value === "on") {
      this.setState({
        type
      });
    }
  };

  // Change value on 'from year'
  onFromChange = event => {
    const { to } = this.state;
    const date = event.target.value;
    // This condition is about to calculate the range of 'from' year ends by 'to' year minus 1
    if (date >= to) {
      this.setState({
        from: parseInt(to - 1)
      });
    } else {
      this.setState({
        from: parseInt(date)
      });
    }
  };

  // Change value on 'to year'
  onToChange = event => {
    const { from } = this.state;
    const date = event.target.value;
    // This condition is about to calculate the range of 'to' year starts from 'from' year plus 1
    if (date <= from) {
      this.setState({
        to: parseInt(from + 1)
      });
    } else {
      this.setState({
        to: parseInt(date)
      });
    }
  };
  // -------------------------- END Select Year Range --------------------------

  // -------------------------- Set values for Filter Panel --------------------------
  // Add one more filter row
  onAddMoreCondition = index => {
    const { conditions } = this.state;
    const newCondition = {
      syntax: "AND", // AND - OR - NOT
      name: "",
      operator: "Equal to", // Equal to - Not Equal to
      value: ""
    };
    conditions.splice(index + 1, 0, newCondition);
    this.setState({
      conditions
    });
  };

  // Remove the filter row
  onRemoveCondition = index => {
    const { conditions } = this.state;
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    this.setState({
      conditions: newConditions
    });
  };

  // Change the value of syntax dropdown on a specified index row
  onDropDownSyntaxChange = (event, index) => {
    const { conditions } = this.state;
    conditions[index].syntax = event.target.value;
    this.setState({
      conditions
    });
  };

  // Change the value of field dropdown on a specified index row
  onDropDownFieldChange = (event, index) => {
    const { conditions, field } = this.state;
    const fieldId = parseInt(event.target.value);
    const selectdField = field && field.find(f => f.id === fieldId);

    // If the selected field got a fixed value list, the first value would be selected as default
    const value =
      selectdField && selectdField.option ? selectdField.option[0].value : "";

    conditions[index].field = fieldId;
    conditions[index].value = value;
    this.setState({
      conditions
    });
  };

  // Change the value of Operator dropdown on a specified index row
  onDropDownOperatorChange = (event, index) => {
    const { conditions } = this.state;
    conditions[index].operator = event.target.value;
    this.setState({
      conditions
    });
  };

  // Change the value of Dropdown Value on a specified index row
  onDropDownValueChange = (event, index) => {
    const { conditions } = this.state;
    conditions[index].value = event.target.value;
    this.setState({
      conditions
    });
  };

  // Change the value of Input Value on a specified index row
  onInputValueChange = (event, index) => {
    const { conditions } = this.state;
    conditions[index].value = event.target.value;
    this.setState({
      conditions
    });
  };
  //-------------------------- END Set values for Filter Panel --------------------------

  // -------------------------- FUNCTION Press Button Search --------------------------
  onPressButtonSearch = () => {
    const { type, search, from, to, conditions } = this.state;
    const data = { type, search, from, to, conditions };
    this.props.getDataByCondition(data);
  };
  // -------------------------- END FUNCTION Press Button Search -----------------------

  // -------------------------- RENDER TOP SECTIONS --------------------------
  // This row is about to select either "Search by Keywords" or "Search by Filters"
  renderSearchSelectBox() {
    const { type } = this.state;
    return (
      <div className="row">
        <label className="col">
          <input
            name="searchType"
            className="with-gap"
            type="radio"
            checked={type === "keywords"}
            onChange={e => {
              this.onSelectBoxSearch("keywords", e);
            }}
          />
          <span>Search by Keywords</span>
        </label>
        <label className="col">
          <input
            name="searchType"
            className="with-gap"
            type="radio"
            checked={type === "filters"}
            onChange={e => {
              this.onSelectBoxSearch("filters", e);
            }}
          />
          <span>Search by Filters</span>
        </label>
      </div>
    );
  }

  // Panel of "Search by Keywords"
  renderSearchSection() {
    const { type, search } = this.state;
    if (type === "keywords") {
      return (
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col s10">
            <input
              type="text"
              placeholder="Enter keyword to search"
              value={search}
              onChange={e => {
                this.onTextInputSearchChange(e);
              }}
            />
          </div>
          <div className="col s2">
            <button
              className="btn"
              onClick={() => {
                this.onPressButtonSearch();
              }}
            >
              Search
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  // Panel of "Search by Filters"
  renderFilterSection() {
    const { type } = this.state;
    if (type === "filters") {
      return (
        <div className="row" style={{ marginTop: 10 }}>
          {this.renderFromToSection()}
          {this.renderConditionSection()}
        </div>
      );
    }
    return null;
  }

  // this row shows Year Range and Search Button
  renderFromToSection() {
    return (
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col s2" />

        <div className="col s8">
          <div className="row">
            <div className="col s4">
              <p style={{ textAlign: "left" }}>Year range:</p>
            </div>
            <div className="col s1">
              <p style={{ textAlign: "right" }}>From </p>
            </div>
            <div className="col s3">{this.renderFromDropDown()}</div>

            <div className="col s1">
              <p style={{ textAlign: "right" }}>To </p>
            </div>
            <div className="col s3">{this.renderToDropDown()}</div>
          </div>
        </div>

        <div className="col s2">
          <button
            className="btn"
            onClick={() => {
              this.onPressButtonSearch();
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }

  renderFromDropDown() {
    const { from, to, min } = this.state;
    const options = [];
    // the array values of 'from' year will start from 'min' to the 'to' year minus 1
    for (let i = 0; i < to - min; i++) {
      const year = min + i;
      options.push(
        <option key={i} value={year}>
          {year}
        </option>
      );
    }
    return (
      <select
        className="browser-default"
        value={from}
        onChange={e => {
          this.onFromChange(e);
        }}
      >
        {options}
      </select>
    );
  }

  renderToDropDown() {
    const { from, to, max } = this.state;
    const options = [];
    // the array values of 'to' year will start from 'from' year plus 1 to the 'max'
    for (let i = 1; i <= max - from; i++) {
      const year = from + i;
      options.push(
        <option key={i} value={year}>
          {year}
        </option>
      );
    }
    return (
      <select
        className="browser-default"
        value={to}
        onChange={e => {
          this.onToChange(e);
        }}
      >
        {options}
      </select>
    );
  }

  // ------------------ Render Condition Section -----------------
  renderConditionSection() {
    const { conditions } = this.state;
    if (conditions) {
      return conditions.map((item, index) =>
        this.renderSingleCondition(item, index)
      );
    }
    return null;
  }

  // ---------------- Render one signle condition row -----------------
  renderSingleCondition(condition, index) {
    return (
      <div className="row condition-row" key={index}>
        <div className="col s2">
          {this.renderSingleConditionFirstField(condition, index)}
        </div>
        <div className="col s8">
          <div className="row">
            <div className="col s4">
              {this.renderSingleConditionSecondField(condition, index)}
            </div>
            <div className="col s4">
              {this.renderSingleConditionThirdField(condition, index)}
            </div>
            <div className="col s4">
              {this.renderSingleConditionLastField(condition, index)}
            </div>
          </div>
        </div>
        <div className="col s2">{this.renderSingleConditionButton(index)}</div>
      </div>
    );
  }

  // FirstField is the syntax field (AND/OR/NOT)
  renderSingleConditionFirstField(condition, index) {
    if (index === 0) {
      // Check if this is the first condition row, then not appear
      return null;
    }
    return (
      <select
        className="browser-default"
        onChange={e => {
          this.onDropDownSyntaxChange(e, index);
        }}
        value={condition.syntax}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
        <option value="NOT">NOT</option>
      </select>
    );
  }

  // SecondField is the Category field
  renderSingleConditionSecondField(condition, index) {
    const { field } = this.state;
    if (field) {
      const fieldOptions = field.map((f, i) => {
        return (
          <option key={i} value={f.id}>
            {f.name}
          </option>
        );
      });
      return (
        <select
          className="browser-default"
          onChange={e => {
            this.onDropDownFieldChange(e, index);
          }}
          value={condition.field}
        >
          {fieldOptions}
        </select>
      );
    }
    return null;
  }

  // ThirdField is the operation field (Equal to/ Not equal to)
  renderSingleConditionThirdField(condition, index) {
    return (
      <select
        className="browser-default"
        onChange={e => {
          this.onDropDownOperatorChange(e, index);
        }}
        value={condition.operator}
      >
        <option value="Equal to">Equal to</option>
        <option value="Not equal">Not equal</option>
      </select>
    );
  }

  // LastField is the value(s) of the SecondField
  renderSingleConditionLastField(condition, index) {
    const { field } = this.state;
    const selectedField = field.find(f => f.id === condition.field);
    if (selectedField && selectedField.option) {
      // If the selected field got fixed value list, then show them up.
      const fieldOptions = selectedField.option.map((f, i) => {
        return (
          <option key={i} value={f.value}>
            {f.name}
          </option>
        );
      });
      return (
        <select
          className="browser-default"
          onChange={e => {
            this.onDropDownValueChange(e, index);
          }}
          value={condition.value}
        >
          {fieldOptions}
        </select>
      );
    } else if (selectedField && !selectedField.option) {
      // Otherwise, show up the textbox to type in value
      return (
        <input
          type="text"
          placeholder="Input value"
          value={condition.value}
          onChange={e => {
            this.onInputValueChange(e, index);
          }}
        />
      );
    }
    return null;
  }

  // ConditionButton includes 'AddMoreCondition' button and 'RemoveCondition' button
  renderSingleConditionButton(index) {
    // On the first condition row, just have the 'add' button only to add more condition
    if (index === 0) {
      return (
        <div className="row">
          <div className="col">
            <p>
              <i
                className="material-icons"
                style={{ fontSize: 30, cursor: "pointer", color: "green" }}
                onClick={() => {
                  this.onAddMoreCondition(index);
                }}
              >
                add_circle_outline
              </i>
            </p>
          </div>
        </div>
      );
    }
    // From the second row will have both 'add' and 'remove' button to either add more or remove condition
    return (
      <div className="row">
        <div className="col">
          <p>
            <i
              className="material-icons"
              style={{ fontSize: 30, cursor: "pointer", color: "red" }}
              onClick={() => {
                this.onRemoveCondition(index);
              }}
            >
              remove_circle_outline
            </i>
          </p>
        </div>
        <div className="col">
          <p>
            <i
              className="material-icons"
              style={{ fontSize: 30, cursor: "pointer", color: "green" }}
              onClick={() => {
                this.onAddMoreCondition(index);
              }}
            >
              add_circle_outline
            </i>
          </p>
        </div>
      </div>
    );
    // ---------------- END Render one signle condition row -----------------
  }
  // -------------- END Render Condition Section ---------------

  renderTopSection() {
    return (
      <div
        className="row"
        style={{
          border: "1px solid #c8c8c8",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#fff"
        }}
      >
        {this.renderSearchSelectBox()}
        {this.renderSearchSection()}
        {this.renderFilterSection()}
      </div>
    );
  }
  // -------------------------- END RENDER TOP SECTIONS --------------------------

  // -------------------------- RENDER BOTTOM SECTIONS --------------------------
  // Declare popup that contains the list of checkboxes to edit the visibility of columns
  renderModalCheckBox() {
    const { checkBox } = this.state;
    return (
      <div id="modalCheckBox" className="modal">
        <div className="modal-content">
          {/* Row 1: table title */}
          <h4 style={{ textAlign: "left" }}>Select Table Columns</h4>

          {/* Row 2: Analyst, Authour, DOI, Participants, Research Question */}
          <div className="row">
            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.analyst}
                onChange={() => {
                  this.toggleAnalystCheckBox();
                }}
              />
              <span>Analyst</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.author}
                onChange={() => {
                  this.toggleAuthorCheckBox();
                }}
              />
              <span>Author</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.doi}
                onChange={() => {
                  this.toggleDoiCheckBox();
                }}
              />
              <span>DOI</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.participants}
                onChange={() => {
                  this.toggleParticipantsCheckBox();
                }}
              />
              <span>Participants</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.researchQuestion}
                onChange={() => {
                  this.toggleResearchQuestionCheckBox();
                }}
              />
              <span>Research Question</span>
            </label>
          </div>

          {/* Row 3: Research Result, SE Method, SE Methodology, Title, Type */}
          <div className="row">
            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.researchResult}
                onChange={() => {
                  this.toggleResearchResultCheckBox();
                }}
              />
              <span>Research Result</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.seMethod}
                onChange={() => {
                  this.toggleSeMethodCheckBox();
                }}
              />
              <span>SE Method</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.seMethodology}
                onChange={() => {
                  this.toggleSeMethodologyCheckBox();
                }}
              />
              <span>SE Methodology</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.title}
                onChange={() => {
                  this.toggleTitleCheckBox();
                }}
              />
              <span>Title</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.type}
                onChange={() => {
                  this.toggleTypeCheckBox();
                }}
              />
              <span>Type</span>
            </label>

            <label className="col">
              <input
                type="checkbox"
                checked={checkBox.year}
                onChange={() => {
                  this.toggleYearCheckBox();
                }}
              />
              <span>Year</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  // Render the Search Result Table
  renderBottomSection() {
    const { checkBox } = this.state;
    const { data } = this.props;
    // Check the conditions of the checkboxes in order to show the selected columns only
    let columns = [];
    if (checkBox.type) {
      columns = [
        ...columns,
        { title: "Type", field: "article_publication_type" }
      ];
    }
    if (checkBox.title) {
      columns = [...columns, { title: "Title", field: "article_title" }];
    }
    if (checkBox.seMethodology) {
      columns = [
        ...columns,
        { title: "SE Methodology", field: "article_seMethodology" }
      ];
    }
    if (checkBox.seMethod) {
      columns = [...columns, { title: "SE Method", field: "article_seMethod" }];
    }
    if (checkBox.author) {
      columns = [...columns, { title: "Author", field: "article_authors" }];
    }
    if (checkBox.doi) {
      columns = [...columns, { title: "DOI", field: "article_doi" }];
    }
    if (checkBox.participants) {
      columns = [
        ...columns,
        { title: "Participants", field: "article_participants" }
      ];
    }
    if (checkBox.researchQuestion) {
      columns = [
        ...columns,
        { title: "Research Question", field: "article_researchQuestion" }
      ];
    }
    if (checkBox.researchResult) {
      columns = [
        ...columns,
        { title: "Research Result", field: "article_researchResult" }
      ];
    }
    if (checkBox.year) {
      columns = [...columns, { title: "Year", field: "article_year" }];
    }
    if (checkBox.analyst) {
      columns = [...columns, { title: "Analyst", field: "article_analyst" }];
    }

    return (
      // The <div> tag below is Search Result table
      <div
        className="row"
        style={{
          border: "1px solid #c8c8c8",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#fff"
        }}
      >
        <div className="col s12">
          <h5>Search Result:</h5>
        </div>
        <div className="col s12" id="tableSection">
          <MaterialTable
            options={{
              search: false,
              showTitle: false,
              pageSize: 10,
              pageSizeOptions: [5, 10, 20, 50]
            }}
            columns={columns}
            data={data}
            style={{ boxShadow: "none", borderBottom: 0 }}
            // When click on a row, get details of selected record then push the details to the screen 'article-details
            onRowClick={(e, rowData) => {
              this.props.history.push("/detail/" + rowData._id);
            }}
          />
        </div>
      </div>
    );
  }

  // This section combines all components to show up on this page: header, body, footer
  render() {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="container">
          <Header title="Home" />
          {this.renderTopSection()}
          {this.renderBottomSection()}
          {this.renderModalCheckBox()}
          <Footer />
        </div>
      </div>
    );
  }
}
// -------------------------- END RENDER BOTTOM SECTIONS --------------------------

// Get the relevant fields in that 'state' of redux then pass those values to 'props' via reducer
const mapStateToProps = state => {
  return {
    data: state.homeReducer.data
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      getDataByCondition
    }
  )
)(Home);
