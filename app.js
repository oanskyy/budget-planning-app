
// BUDGET CONTROLLER
let budgetController = (function() { 

      let Expense = function(id, description, value) { 
            this.id = id; 
            this.description = description; 
            this.value = value; 
      }; 

      let Income = function(id, description, value) { 
            this.id = id; 
            this.description = description; 
            this.value = value;
      }; 

      // let allExpenses = []; 
      // let allIncomes = []; 
      // let totalExpenses = 0; 

      let data = { 
            allItems: { 
                  exp: [], 
                  inc: []
            }, 
            totals: { 
                  exp: 0, 
                  inc: 0
            }
      }

      return { 
            addItem: function(type, des, val) { 
                  let newItem, ID; 

                  // Create new ID 
                  if (data.allItems[type].length > 0) { 
                        ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
                  } else { 
                        ID = 0; 
                  }

                  // Create new item based on 'inc' or 'exp' type
                  if (type === 'exp') { 
                        newItem = new Expense(ID, des, val);
                  } else if (type === 'inc') { 
                        newItem = new Income(ID, des, val);
                  }

                  // push it into our data structure
                  data.allItems[type].push(newItem); 

                  // Return the new element 
                  return newItem;
            }, 
            testing: function() { 
                  console.log(data);
            }
      }


})();


// UI CONTROLLER
let UIController = (function() { 
      let DOMstrings = { 
            inputType: '.add__type',
            inputDescription: '.add__description', 
            inputValue: '.add__value',
            inputBtn: '.add__btn'
      }

      return { 
            getinput: function() {
                  return { 
                        type: document.querySelector(DOMstrings.inputType).value, 
                        description: document.querySelector(DOMstrings.inputDescription).value, 
                        value: document.querySelector(DOMstrings.inputValue).value
                  }
            }, 
            getDOMstrings: function() { 
                  return DOMstrings;
            }
      }
      
})();


// GLBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl) { 

      const setupEventListeners = function () { 
            let DOM = UICtrl.getDOMstrings();

            document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); 

            document.addEventListener('keypress', function() { 
                  if(event.keyCode === 13 || event.which === 13) { 
                        ctrlAddItem();
                  }
            }); 
      }

      let ctrlAddItem = function() { 
            let input, newItem; 

            // 1. get the field input data 
            input = UICtrl.getinput(); 
            
            // 2. add item to budget controller 
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the new item to the UI 

            // 4. calculate the budget 

            // 5. display the budget of the UI 

      };

      return { 
            init: function() { 
                  console.log("works"); 
                  setupEventListeners(); 
            }
      }

})(budgetController, UIController);

controller.init(); 