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
    this.selectedDish = 0;
  }

getCurrentDish(){
  console.log('ini id get: '+this.currentDish)
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
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getDish(id) {
     const url = `${BASE_URL}recipes/` + id +'/information?includeNutrition=false';
    return fetch(url, httpOptions).then(this.processResponse);
  }

   // Add dish to menu
    /** @param {number} id */
    addDishToMenu = (id) => {
        let dishTemp = this.selectedDish.getValue();
        let dish = this.getDish(id);
        if (dishTemp.map(value => (value.id)).indexOf(dish.id) === -1)
            dishTemp.push(dish);
        this.selectedDish.notifyObserver(dishTemp);
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
