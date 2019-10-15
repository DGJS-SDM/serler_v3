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
        
        //If a filter is selected by the user
        if(condition.filterAuthor.checked || condition.filterAuthor.checked || condition.filterTitle.checked)
        {
          console.log("Calling condition present!!!")
          const newData = data.filter(queryBuilder(condition));
          console.log(newData);
          getDataSuccess(dispatch, newData);
        }
        else //If not
        {
          console.log("No condition present")
          getDataSuccess(dispatch, data);
        }
      })
      .catch(function(err) {console.log(err)});
    };
    
function queryBuilder(condition)
{
  var authIsChecked = condition.filterAuthor.checked;
  var pubIsChecked = condition.filterPublisher.checked;
  var titIsChecked = condition.filterTitle.checked;
  //Variables to hold results from each query - used to simplify return value
  var authQuery;
  var titQuery;
  var pubQuery;

  //This function applies to each element of the json array
  return function(x)
  {
    if(authIsChecked)
    {
      console.log("Filter author is checked")
      authQuery = x.article_authors.toLowerCase().includes(condition.filterAuthor.text.toLowerCase());
    }
    if(titIsChecked)
    {
      console.log("Filter Title is checked")
      titQuery = x.article_title.toLowerCase().includes(condition.filterTitle.text.toLowerCase());
    }
    if(pubIsChecked)
    {
      console.log("Filter publisher is checked")
      pubQuery = x.article_publication.toLowerCase().includes(condition.filterPublisher.text.toLowerCase());
    }

    if(authIsChecked && titIsChecked && pubIsChecked) // if all 3 are checked
    {
      return authQuery && titQuery && pubQuery;
    }
    else if (authIsChecked && titIsChecked && !pubIsChecked) //if author and title is checked
    {
      return authQuery && titQuery;
    }
    else if( authIsChecked && !titIsChecked && pubIsChecked) // if author and publisher is checked
    {
      return authQuery && pubQuery;
    }
    else if(!authIsChecked && titIsChecked && pubIsChecked) // if publisher and title is checked
    {
      return pubQuery && titQuery;
    }
    else if (authIsChecked && !titIsChecked && !pubIsChecked) //if author is checked
    {
      return authQuery;
    }
    else if( !authIsChecked && titIsChecked && !pubIsChecked) // if title is checked
    {
      return titQuery;
    }
    else if(!authIsChecked && !titIsChecked && pubIsChecked) // if publisher is checked
    {
      return pubQuery;
    }
    //Needs work to change return value depending on what is checked
    return null;
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
