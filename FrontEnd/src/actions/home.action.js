/*
condition.filterAuthor
condition.filterTitle
condition.filterPublisher
The above three ^^^^^ have .text, .value and .checked properties
.text is the textfield, 
.value is the AND/OR operator
.checked is if toggled
condition.method
condition.search
*/

// -------------------------- GET DATA --------------------------
export const getDataByCondition = condition => dispatch => {
  console.log(condition);

  //Fetch the data from the backend
  fetch('http://localhost:3001/articles')
      .then(results => results.json())
      .then(d => {
        const data = d.articles

        //console.log("Calling condition present!!!" + condition, [0])
        const date_filter = data.filter(dateQuery(condition));
        const newData = date_filter.filter(queryBuilder(condition.conditions));
        //const newData = data.filter(queryBuilder(condition.conditions)); TO TEST WITHOUT DATE CONSTRAINT
        getDataSuccess(dispatch, newData);        
      })
      .catch(function(err) {console.log(err)});
    };
    
function queryBuilder(conditions)
{
  var myCond = conditions[0];
  var authQ;
  var DOIQ;
  var seMethQ;
  var seMethodQ;
  var titQ;
  var typeQ;

  return function(x)
  {
    if(myCond.syntax == "AND")
    {
      switch(myCond.field) {
        case 1: //author
          authQ = StringCompare(x.article_authors, myCond.value);
          return authQ;
        case 2: //doi
          DOIQ = (x.article_doi == myCond.value);
          return DOIQ;
        case 3:
          seMethQ = StringCompare(x.article_seMethod, myCond.value);
          return seMethQ;
          //break;
        case 4:
          seMethodQ = StringCompare(x.article_seMethodology, myCond.value);
          return seMethodQ;
        case 5:
          titQ = StringCompare(x.article_title, myCond.value);
          return titQ;
        case 6:
          typeQ = StringCompare(x.article_publication_type, myCond.value);
          return typeQ;
        default:
          console.log("Nothing is selected!!");
          return true;
      } 
    }
  }
}

function dateQuery(condition)
{
  return function(x)
  {
    //dirty fix for front end constratiants of year input
    if (condition.to > new Date().getFullYear())
    {
      condition.to = new Date().getFullYear();
    }
    if (condition.from > condition.to)
    {
      var temp = condition.to;
      condition.to = condition.from;
      condition.from = temp;
    }
    if (condition.to >= x.article_year && condition.from <= x.article_year)
    {
      return true;
    }
  };
}

function StringCompare(myField, value)
{
  if(myField != null)
  {
    return myField.toLowerCase().includes(value.toLowerCase());
  }
}

const getDataSuccess = (dispatch, data) => {
  dispatch({
    type: "filter_data",
    data
  });
};

export const setDataSuccess = (data) => (dispatch) => {
  console.log('d', data)
  dispatch({
    type: "home_data_success",
    data
  });
};
