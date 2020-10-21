
// BUDGET CONTROLLER
let budgetController = (function() { 

      let Expense = function(id, description, value) { 
            this.id = id; 
            this.description = description; 
            this.value = value; 
            this.percentage = -1;
      }; 

      Expense.prototype.calcPercentage = function(totalIncome) { 
            if(totalIncome > 0) { 
                  this.percentage = Math.round((this.value / totalIncome) * 100); 
            } else { 
                  this.percentage = -1;
            }
      };

      Expense.prototype.getPercentage = function() { 
            return this.percentage;
      }

      let Income = function(id, description, value) { 
            this.id = id; 
            this.description = description; 
            this.value = value;
      }; 

      // let allExpenses = []; 
      // let allIncomes = []; 
      // let totalExpenses = 0; 

      let calculateTotal = function(type) { 
            let sum = 0;  
            data.allItems[type].forEach(function(cur) { 
                  sum += cur.value; 
            }); 
            data.totals[type] = sum;
      };

      let data = { 
            allItems: { 
                  exp: [], 
                  inc: []
            }, 
            totals: { 
                  exp: 0, 
                  inc: 0
            }, 
            budget: 0, 
            percentage: -1 
      };

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

                  // Push it into our data structure
                  data.allItems[type].push(newItem); 

                  // Return the new element 
                  return newItem;
            }, 


            deleteItem: function(type, id) { 

                  let ids = data.allItems[type].map(function(current) { 
                        return current.id;
                  });

                  index = ids.indexOf(id); 

                  if (index !== -1) { 
                        data.allItems[type].splice(index, 1);
                  }

            }, 


            calculateBudget: function() { 

                  // Calculate total income and expenses 
                  calculateTotal('exp'); 
                  calculateTotal('inc'); 

                  // Calculate the budget: income - expenses 
                  data.budget = data.totals.inc - data.totals.exp;

                  // Calculate the percentage of income we spent 
                  if(data.totals.inc > 0) { 
                        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
                  } else { 
                        data.percentage = -1;
                  }
                  
            },

            calculatePercentages: function() { 

                  data.allItems.exp.forEach(function(cur) { 
                        cur.calcPercentage(data.totals.inc);
                  });
            },

            getPercentages: function() { 
                  let allPerc = data.allItems.exp.map(function(cur) { 
                        return cur.getPercentage();
                  })
                  return allPerc;
            },

            getBudget: function() { 
                  return { 
                        budget: data.budget, 
                        totalInc: data.totals.inc, 
                        totalExp: data.totals.exp, 
                        percentage: data.percentage
                  }
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
            inputBtn: '.add__btn',
            incomeContainer: '.income__list',
            expensesContainer: '.expenses__list',
            budgetLabel: '.budget__value', 
            incomeLabel: '.budget__income--value', 
            expensesLabel: '.budget__expenses--value', 
            percentageLabel: '.budget__expenses--percentage', 
            container: '.container', 
            expensesPercLabel: '.item__percentage'
      };

      let formatNumber = function(num, type) { 
            let numSplit, int, dec;
            /*  
            + or - before number 
            exactly 2 decimal points 
            comma separating the thousands
            */

            num = Math.abs(num); 
            num = num.toFixed(2);

            numSplit = num.split('.'); 
            int = numSplit[0]; 
            if (int.length > 3) { 
                  int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }
            dec = numSplit[1];
            // type === 'exp' ? sign = '-' : sign = '+'; 
            // type === 'exp' ? '-' : '+'; 
            // return type + ' ' + int + '.' + dec;
            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

      };

      return { 
            getinput: function() {
                  return { 
                        type: document.querySelector(DOMstrings.inputType).value, 
                        description: document.querySelector(DOMstrings.inputDescription).value, 
                        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
                  };
            }, 

            addListItem: function(obj, type) { 
                  let html, newHtml, element;

                  // Create HTML string with placeholder text 
                  if (type === 'inc') {
                        element = DOMstrings.incomeContainer;
                        
                        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                  } else if (type === 'exp') {
                        element = DOMstrings.expensesContainer;
                        
                        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                  }
                  
                  // Replace placeholder text with some actual data from OBJ 
                  newHtml = html.replace('%id%', obj.id);
                  newHtml = newHtml.replace('%description%', obj.description);
                  newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
                  
                  // Insert the HTML into the DOM
                  document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            }, 

            deleteListItem: function(selectorID) { 
                  let el = document.getElementById(selectorID);
                  el.parentNode.removeChild(el);

            },

            // How to clear HTML fields
            clearFields: function() { 
                  let fields, fieldsArr;

                  fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

                  fieldsArr = Array.prototype.slice.call(fields); 

                  fieldsArr.forEach(function(current, index, array) { 
                        current.value = "";
                  });

                  fieldsArr[0].focus();
            },

            displayBudget: function(obj){ 
                  let type;
                  obj.budget > 0 ? type = 'inc' : type = 'exp';

                  document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
                  document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc'); 
                  document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp') 

                  // document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage; 

                  if(obj.percentage > 0) { 
                        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%'; 
                  } else { 
                        document.querySelector(DOMstrings.percentageLabel).textContent = '---'
                  }
            },

            displayPercentages: function(percentages) {     
                  
                  let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
                  
                  let nodeListForEach = function(list, callback) { 
                        for (let i = 0; i < list.length; i++) { 
                              callback(list[i], i);
                        }
                  };

                  nodeListForEach(fields, function(current, index) { 
                        if(percentags[index] > 0) { 
                              current.textContent = percentages[index] + '%';
                        } else { 
                              current.textContent = '---';
                        }
                  })
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


            document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
      }

      let updateBudget = function() { 

            // 1. Calculate the budget 
            budgetCtrl.calculateBudget(); 

            // 2. Return the budget method 
            let budget = budgetCtrl.getBudget();

            // 3. Display the budget of the UI 
            UICtrl.displayBudget(budget);
      }

      let updatePercentages = function() { 

            // 1. Calculate percentage 
            budgetCtrl.calculatePercentages();

            // 2. Read % from the budget controller 
            let percentages = budgetCtrl.getPercentages(); 

            // 3. Update the user interface with the new percentage
            UICtrl.displayPercentages(percentages);
      }


      let ctrlAddItem = function() { 
            let input, newItem; 

            // 1. get the field input data 
            input = UICtrl.getinput(); 
            
            if(input.description !== "" && !isNaN(input.value) && input.value > 0) { 
                  // 2. add item to budget controller 
                  newItem = budgetCtrl.addItem(input.type, input.description, input.value);

                  // 3. add the new item to the UI 
                  UICtrl.addListItem(newItem, input.type);

                  // 4. Clear the fields 
                  UICtrl.clearFields();

                  // 5. Calculate and update budget 
                  updateBudget();

                  // 6. Calculate and update % 
                  updatePercentages();
            };
      }
            

      let ctrlDeleteItem = function(event) { 
            let itemID, splitID, type, ID; 

            if(itemID) { 

                  //inc-1
                  splitID = itemID.split('-'); 
                  type = splitID[0];
                  ID = parseInt(splitID[1]); 

                  // 1. Delete the item form the data structure 
                  budgetCtrl.deleteItem(type, ID);

                  // 2. Delete the item from the UI 
                  UICtrl.deleteListItem(itemID); 

                  // 3. Update and show the new budget 
                  updateBudget();

                  // 4. Calculate and update percentages 
                  updatePercentages();
            }

            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
      }

      return { 
            init: function() { 
                  console.log("works");
                  UICtrl.displayBudget({ 
                        budget: 0, 
                        totalInc: 0, 
                        totalExp: 0, 
                        percentage: -1
                  });
                  setupEventListeners(); 
            }
      }

})(budgetController, UIController);

controller.init(); 