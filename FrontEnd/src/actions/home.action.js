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

        const date_filter = data.filter(dateQuery(condition));
        const newData = dynamicSearch(condition.conditions, date_filter); //Replace date_filter with data to remove date constraint
        getDataSuccess(dispatch, newData);        
      })
      .catch(function(err) {console.log(err)});
    };

    //Takes in the condition array, and a list of articles
function dynamicSearch(conditions, inputList)
{
  let newList = inputList.filter(queryBuilder(conditions, 0)); //first query
  let i = 1; // is 1 because the first(0th) query is already applied

  while(i<conditions.length) //while there are more than 1 condition to fill
  {
    //If OR
    if(conditions[i].syntax === "OR")
    {
      let tempList = inputList.filter(queryBuilder(conditions, i)); //store list filter applied on entire list
      newList = newList.concat(tempList); //Merge with the returning list
    } 
    else
    {
      newList = newList.filter(queryBuilder(conditions, i)); //overwrite the list with the filtered list based on the condition applied
    }
    i++; //increment the iterator
  }

  newList = [...new Set(newList)]; //removing duplicates by converting to set and back to array
  return newList;
}

function queryBuilder(conditions, i)
{
  var myCond = conditions[i]; // The current condition thats being applied.
  var authQ;
  var DOIQ;
  var seMethQ;
  var seMethodQ;
  var titQ;
  var typeQ;

  return function(x)
  {//Check the field that has been selected
    switch(myCond.field) {
      case 1: //author
        authQ = StringCompare(x.article_authors, myCond.value); //HELPER FUNCTION SEE BELOW
        if (myCond.operator === "Not equal") { authQ = !authQ }; 
        if (myCond.syntax === "NOT") { authQ = !authQ }; 
        return authQ
      case 2: //doi
        DOIQ = (x.article_doi === parseInt(myCond.value));
        if (myCond.operator === "Not equal") { DOIQ = !DOIQ }; 
        if (myCond.syntax === "NOT") { DOIQ = !DOIQ };  // if NOT, negate the result. 
        return DOIQ;
      case 3: //SE method
        seMethQ = StringCompare(x.article_seMethod, myCond.value);
        if (myCond.operator === "Not equal") { seMethQ = !seMethQ }; 
        if (myCond.syntax === "NOT") { seMethQ = !seMethQ }; 
        return seMethQ;
      case 4: //SE methodology
        seMethodQ = StringCompare(x.article_seMethodology, myCond.value);
        if (myCond.operator === "Not equal") { seMethodQ = !seMethodQ }; 
        if (myCond.syntax === "NOT") { seMethodQ = !seMethodQ }; 
        return seMethodQ;
      case 5: //Title
        titQ = StringCompare(x.article_title, myCond.value);
        if (myCond.operator === "Not equal") { titQ = !titQ }; 
        if (myCond.syntax === "NOT") { titQ = !titQ }; 
        return titQ;
      case 6: //Type
        typeQ = StringCompare(x.article_publication_type, myCond.value);
        if (myCond.operator === "Not equal") { typeQ = !typeQ }; 
        if (myCond.syntax === "NOT") { typeQ = !typeQ }; 
        return typeQ;
      default:
        console.log("Nothing is selected!!"); // If nothing is selected, return true for all.
        return true;
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

//helper function to compare string values by converting both to lowercase and seeing if it includes. 
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
