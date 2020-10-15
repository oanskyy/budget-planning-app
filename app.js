
// BUDGET CONTROLLER
let budgetController = (function() { 

})();


// UI CONTROLLER
let UIController = (function() { 
      // some code 
      
})();


// GLBAL APP CONTROLLER


let controller = (function(budgetCtrl, UICtrl) { 


      let ctrlAddItem = function() { 

            // 1. get the field input data 

            // 2. add item to budget controller 

            // 3. add the new item to the UI 

            // 4. calculate the budget 

            // 5. display the budget of the UI 

      }

      document.querySelector('.add__btn').addEventListener('click', ctrlAddItem); 

      document.addEventListener('keypress', function() { 
            if(event.keyCode === 13 || event.which === 13) { 
                  ctrlAddItem();
            }
      }); 

})(budgetController, UIController);