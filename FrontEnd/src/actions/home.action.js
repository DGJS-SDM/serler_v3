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
        //const newData = data.filter(queryBuilder(condition));
        //console.log(newData);
        //getDataSuccess(dispatch, newData);
        getDataSuccess(dispatch, data);
        
      })
      .catch(function(err) {console.log(err)});
    };
    
function queryBuilder(condition)
{
  


  return condition;
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
