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
    this._numberOfGuests = 1;
    this._currentDish = 0;
    this._selectedDish = [];
    this._searchQuery = {
      type: 'all',
      query: ''
    };
  };



  /**
   * Fetch data based on filter query from the API
   * @return {Array} 
   */
  getAllDishes = () => {
    let {
      query,
      type
    } = this.getSearchQuery();
    query = query.toLowerCase().replace(/\s/g, '+');
    type = type.toLowerCase().replace(/\s/g, '+');
    query = (query === 'all') ? '' : query;
    // this.setIsLoading(true);
    let tempUrl = (query === "") ? `${BASE_URL}recipes/search?number=20&offset=0&type=${type}` :
      `${BASE_URL}recipes/search?number=20&offset=0&type=${type}&query=${query}`;
    return fetch(tempUrl, httpOptions).then(res => res.json())
      .then(data => {
        return data.results;
      })
      .catch(err => {
        return Promise.reject(Error(err.message))
      })
  };

  /**
   * Set dishes fetched from API
   * @param {Array} dish
   */
  setDishes = (dishes) => {
    this._dishes = dishes;
    this.notifyObservers();
  };

  /**
   * Set search query parameter
   * @param {String} type
   * @param {String} query
   */
  setSearchQuery = (type = 'all', query = '') => {
    this._searchQuery = {
      type,
      query
    };
    this.notifyObservers();
  };

  /**
   * Set dishes fetched from API
   * @param {Array} dish
   */
  getSearchQuery = () => {
    return {
      ...this._searchQuery
    };
  };

    /**
   * Get current dish id
   * @return {Number}
   */
  getCurrentDish() {
    return this._currentDish;
  };

    /**
   * Set current dish id
   * @param {Number} dish
   */
  setCurrentDish(id) {
    this._currentDish = id;
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

    /**
   * Add dish to mmenu
   * @param {number} id
   */
  addDishToMenu() {
    let dishTemp = this._selectedDish;
    this.getDish().then(dish => {
      if (dishTemp.map(dish => dish.id).indexOf(dish.id) === -1)
      {
        dishTemp.push(dish);
        this.notifyObservers();
      };
    });
  };

    /**
   * Get full menu
   * @return {Array}
   */
  getFullMenu = () => {
    return [...this._selectedDish];
  };

    /**
   * Get dish price
   * @param {Number} id
   * @return {Number}
   */
  dishPrice = (id) => {
    let dishes = this.getFullMenu();
    let price = dishes.filter(dish => {
      return dish.id === id
    })[0].pricePerServing;
    return parseInt(price * this.getNumberOfGuests(),10);
  };

    /**
   * Fetch dish detail information based on ID
   * @param {Number} id
   * @return {Object}
   */
  getDish() {
    const url = `${BASE_URL}recipes/` + this._currentDish + '/information?includeNutrition=false';
    return fetch(url, httpOptions).then(this.processResponse);
  }


    /**
   * Get total menu price
   * @return {Number}
   */
  getTotalMenuPrice = () => {
    let selectedDish = this.getFullMenu();
    if (selectedDish) {
        return parseInt(this.getNumberOfGuests() * selectedDish.map(dish => {
                return dish.pricePerServing;
            }).reduce((acc, cur) => {
                return acc + cur;
            }, 0),10);
    };
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