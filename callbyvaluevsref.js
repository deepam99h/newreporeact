{/*
In the context of React (or programming in general), the distinction between call by reference and call by parameter (or value) refers to how arguments are passed to functions or components.

1. Call by Value (or Parameter):
Definition: A copy of the actual value is passed to the function or component. The original value remains unchanged if the copy is modified within the function.
Behavior in React:
Primitive types (e.g., number, string, boolean) are passed by value because they are immutable.
Changes made to the argument inside the function or component do not affect the original value. */}

function updateValue(value) {
    value = value + 1; // Modifies the local copy
    console.log("Inside function:", value);
  }
  
  let number = 5;
  updateValue(number); // Passes a copy
  console.log("Outside function:", number); // Original value remains 5

  
  {/*2. Call by Reference:
Definition: A reference (or memory address) to the original object is passed to the function or component. Changes made to the object inside the function are reflected in the original object.
Behavior in React:
Complex types (e.g., objects, arrays) are passed by reference because they are mutable.
Modifying a reference type inside the function will directly affect the original object.
Important in React: Directly mutating objects or arrays can lead to unexpected behavior, especially with state, as React relies on immutability to detect changes.*/}

function updateObject(obj) {
    obj.value = obj.value + 1; // Modifies the original object
    console.log("Inside function:", obj);
  }
  
  let obj = { value: 5 };
  updateObject(obj); // Passes a reference
  console.log("Outside function:", obj); // Original object is modified
  