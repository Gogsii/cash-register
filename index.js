//I begin by creating an array of objects for the currency denoms, in descending order, I will use it as a reference later
const denominations = [
    { name: "ONE HUNDRED", val: 100.0 },
    { name: "TWENTY", val: 20.0 },
    { name: "TEN", val: 10.0 },
    { name: "FIVE", val: 5.0 },
    { name: "ONE", val: 1.0 },
    { name: "QUARTER", val: 0.25 },
    { name: "DIME", val: 0.1 },
    { name: "NICKEL", val: 0.05 },
    { name: "PENNY", val: 0.01 }
  ];
  
  //I create a function to check if I have just enough change in the register or if I am short on change
  function checkCashRegister(price, cash, cid) {
    let output = { status: '', change: [] }; //since the problem asks for an output in the format of an object
    let change = cash - price; //this is the required amount of change I need to return to the costumer
  
  //here I create a function to tally up all the change in the drawer and store it in a variable called register
    let register = cid.reduce(
      function(acc, curr) {
        acc.total += curr[1]; //curr[1] is the integer, or the second element in each denom-value pair in the passed array
        acc[curr[0]] = curr[1]; //this copies the denomination name from the passed in array and sends it to new array
        return acc; //the return is important in a reduce function, because it sets the acc value before running again
      },
      { total: 0 } //this is the second part of a reducer function, it is the initial value of the output
    );
  
  //here I test to see if I have an equal amount of change as reuqired, if so give the change and close register
    if (register.total === change) {
      output.status = "CLOSED";
      output.change = cid;
      return output;
    }
  
  //here I check to see if I have less than the amount of change required, if so return insufficient funds
    if (register.total < change) {
      output.status = "INSUFFICIENT_FUNDS";
      return output;
    }
  
  //here I create a new array to store the returned change into, by running a reducer function on denominations
    let change_arr = denominations.reduce(function(acc, curr) {
      var value = 0;
      //here I run a while loop to keep checking and extracting the denom value from biggest to smallest amounts
      while (register[curr.name] > 0 && change >= curr.val) {
        change -= curr.val; //subtract the denom value amount from the total change needed amount
        register[curr.name] -= curr.val; //subtract the denom value amount from the cash inside the register
        value += curr.val; //assign the denom value amount to the initialized value variable
  
        change = change.toFixed(2); //this limits the floating integer to only 2 decimal points
      }
  
      //meaning if there is a positive value to return at all
      if (value > 0) {
        acc.push([curr.name, value]); //pushes it into the initialized empty array (2nd parameter of reduce)
      }
      return acc; //the return is important in a reduce function, because it sets the acc value before running again
    }, []);
  
    //if the drawer is empty, but we need to give back change, insufficient funds
    if (change_arr.length < 1 || change > 0) {
      output.status = "INSUFFICIENT_FUNDS";
      return output;
    }
    //if all checks out, we set the output object param status and change to have values of Open and the returned change_arr
    output.status = "OPEN";
    output.change = change_arr;
    return output;
  }
  
  
  checkCashRegister(19.5, 20, 
  [["PENNY", 1.01], ["NICKEL", 2.05],
   ["DIME", 3.1], ["QUARTER", 4.25],
    ["ONE", 90], ["FIVE", 55],
     ["TEN", 20], ["TWENTY", 60],
      ["ONE HUNDRED", 100]]);
      
  ================================================================================================================
  const denominations = [
    { name: "ONE HUNDRED", val: 100.0 },
    { name: "TWENTY", val: 20.0 },
    { name: "TEN", val: 10.0 },
    { name: "FIVE", val: 5.0 },
    { name: "ONE", val: 1.0 },
    { name: "QUARTER", val: 0.25 },
    { name: "DIME", val: 0.1 },
    { name: "NICKEL", val: 0.05 },
    { name: "PENNY", val: 0.01 }
  ];
  
  function checkCashRegister(price, cash, cid) {
    let output = { status: '', change: [] };
    let change = cash - price;
  
    let drawer = cid.reduce(function (acc, curr) {
        acc.total += curr[1];
        acc[curr[0]] = curr[1];
        return acc;
      }, 
      {total: 0}
    );
  
    if(drawer.total === change) {
      output.status = 'CLOSED';
      output.change = cid;
      return output;
    }
  
    if(drawer.total < change) {
      output.status = 'INSUFFICIENT_FUNDS';
      return output;
    }
  
    let change_arr = denominations.reduce(function(acc, curr) {
        let value = 0;
  
        while(drawer[curr.name] > 0 && change >= curr.val) {
          change -= curr.val;
          drawer[curr.name] -= curr.val;
          value += curr.val;        
          change = change.toFixed(2);
        }
  
      if(value > 0) {
        acc.push([curr.name, value]);
        }
  
      return acc;
      }, []);
  
      if(change_arr.length < 1 || change > 0) {
        output.status = "INSUFFICIENT_FUNDS";
        return output;
      }
  
    output.status = "OPEN";
    output.change = change_arr;
    return output;
  }
  
  checkCashRegister(16.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))