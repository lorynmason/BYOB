var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare 
  .goto('https://www.coloradobrewerylist.com/brewery/')
  .evaluate(function () {
    var table = document.querySelector('cbg-table')
    var rows = document.querySelectorAll(tr)
    var list = []
    for(let i=1; i<rows.length; i++) {
      let breweryName = rows[i].children[i].innerText
      let cityName = rows[i].children[2].innerText
      let brewery = {
        breweryName, cityName
      }
      list.push(brewery)
    }
    return list;
    
  })
  .end()
  .then(function (result) {
    console.log(result);
  }) 
  .catch(function (error) {
    console.error('Search failed:', error)
  });