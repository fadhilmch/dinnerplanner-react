import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/29/";
const httpOptions = {
  headers: {
    "X-Mashape-Key": '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.currentDish = 0;
    this.selectedDish = [];
    this._searchQuery = {type: 'all', query: ''};
  }

  /**
   * Fetch data based on filter query from the API
   * @return {Array} 
   */
  getAllDishes = () => {
    let {query, type} = this.getSearchQuery();
    query = query.toLowerCase().replace(/\s/g, '+');
    type = type.toLowerCase().replace(/\s/g, '+');
    query = (query === 'all') ? '' : query;
    // this.setIsLoading(true);
    let tempUrl = (query === "") ? `${BASE_URL}/recipes/search?number=20&offset=0&type=${type}` : 
      `${BASE_URL}/recipes/search?number=20&offset=0&type=${type}&query=${query}`;
    return fetch(tempUrl, httpOptions).then(res => res.json())
      .then(data => {
        return data.results;
      })
      .catch(err => {
        return Promise.reject(Error(err.message))
      })
  }

  /**
   * Set dishes fetched from API
   * @param {Array} dish
   */
  setDishes = (dishes) => {
    this._dishes = dishes;
    this.notifyObservers();
  }

    /**
   * Set search query parameter
   * @param {String} type
   * @param {String} query
   */
  setSearchQuery = (type='all', query='') => {
    this._searchQuery = {type, query};
    this.notifyObservers();
  }

    /**
   * Set dishes fetched from API
   * @param {Array} dish
   */
  getSearchQuery = () => {
    return {...this._searchQuery};
  }
 
  getCurrentDish() {
    return this.currentDish;
  }

  setCurrentDish(id) {
    this.currentDish = id;
    console.log('Ini id: ' + this.currentDish)
    this.notifyObservers();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }


  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  getDish(id) {
    const url = `${BASE_URL}recipes/` + id + '/information?includeNutrition=false';
    return fetch(url, httpOptions).then(this.processResponse);
  }
  getDish2(id) {
    const url = `${BASE_URL}recipes/` + id + '/information?includeNutrition=false';
    return fetch(url, httpOptions).then(this.getDishInfo);
  }

  getDishInfo(response) {
    if (response.ok) {
      return response.json()
        .then(dish => dish)
    }

    throw response;
  }

  addDishToMenu(id) {
    let dishTemp = this.selectedDish;
    this.getDish2(id).then(dish => {
      if (dishTemp.indexOf(dish.id) === -1)
          dishTemp.push(dish);
          this.notifyObservers();
    });
  }

     //Returns all the dishes on the menu.
    getFullMenu = () =>{
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

  //Get dish total price per dish
    dishPrice = (id) => {
        let dishes = this.getFullMenu();
        let price = dishes.filter(dish => { return dish.id === id })[0].pricePerServing;
        return price * this.getNumberOfGuests();
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