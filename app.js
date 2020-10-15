
// BUDGET CONTROLLER
let budgetController = (function() { 

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

            // 1. get the field input data 
            let input = UICtrl.getinput(); 
            
            // 2. add item to budget controller 

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