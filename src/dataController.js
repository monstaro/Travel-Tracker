const dataController = {
  loadSingleUser(id) {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/')
      .then(response => response.json())
      .then(data => console.log(data.travelers[id - 1]))
      .catch(err => console.log(err.message))
  }
}

export default dataController