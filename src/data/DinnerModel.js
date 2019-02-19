import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/29/";
const httpOptions = {
  headers: { "X-Mashape-Key": '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767' }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this.getCurrentDish();
    this.currentDish = 0;
    this.selectedDish = new Array();
    this.searchQuery = { 'type': 'all', 'query': '' };
  }

  getSearchQuery = () => {
    return this.searchQuery;
  };

  setSearchQuery = (query) => {
    if (query) {
        this.searchQuery = { 'type': query.type, 'query': query.query };
        // this.searchQuery.notifyObserver({ 'type': query.type, 'query': query.query });
    } else {
        this.searchQuery = { 'type': 'all', 'query': '' };
        // this.searchQuery.notifyObserver({ 'type': 'all', 'query': '' });
    };
  };

  getCurrentDish(){
    return this.currentDish;
  }
 
  setCurrentDish(id){
    this.currentDish = id;
    console.log('Ini id: '+ this.currentDish)
    this.notifyObservers();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  // fetchSearch = (type, query) => {
  //   query = query.toLowerCase().replace(/\s/g, '+');
  //   type = type.toLowerCase().replace(/\s/g, '+');
  //   query = query === 'all' ? '' : query;
  //   this._isLoading.notifyObserver(true);
  //   let tempUrl = query == "" ? `${searchUrl}type=${type}` : `${searchUrl}type=${type}&query=${query}`;
  //   return fetch(tempUrl, {
  //           method: 'GET',
  //           headers: {
  //               'X-Mashape-key': header
  //           }
  //       }).then(res => res.json())
  //       .then(data => {
  //           this._isLoading.notifyObserver(false);
  //           this.fetchedDishes.notifyObserver([...data.results]);
  //           return data.recipes;
  //       })
  //       .catch(err => {
  //           this._isLoading.notifyObserver(false);
  //           return Promise.reject(Error(err.message))
  //       })
  // }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search?number=20&offset=0&`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getDish(id) {
    const url = `${BASE_URL}recipes/` + id +'/information?includeNutrition=false';
    return fetch(url, httpOptions).then(this.processResponse);
  }
  getDish2(id){
    const url = `${BASE_URL}recipes/` + id +'/information?includeNutrition=false';
    return fetch(url, httpOptions).then(this.getDishInfo);
  }

  getDishInfo(response){
    if(response.ok){
      return response.json()
      .then(dish => dish)
    }

    throw response;
   
      
  }

  addDishToMenu(id){
    let dishTemp = this.selectedDish;
    let dishInfo = this.getDish2(id).then(dish => dish).then(console.log);
    dishTemp.push(dishInfo);
    console.log('abis ditambahkan')
    console.log(dishTemp);
    this.notifyObservers();
  }



     //Returns all the dishes on the menu.
    getFullMenu (){
        console.log('selected menu');
        return this.selectedDish;

    };

    getDishType = () => {
        let dishType = [];
        console.log(this.fetchedDishes)
        this.fetchedDishes.forEach(dish => {
            dish.dishTypes.forEach(type => {
                if (dishType.indexOf(type) === -1)
                    dishType.push(type);
            })
        });
        return dishType;
    };


  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }


}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
