{/*In React, using an array index as a key for rendering lists is generally not recommended because it can lead to subtle bugs 
    and performance issues, especially when the list changes dynamically. Here's an explanation of why this happens, 
    along with an example.

Why Not Use Indexes as Keys?
Unstable Keys:
Keys are used by React to uniquely identify elements in a list. If you use an array index as the key, the key might 
change when the list is reordered, items are added, or items are removed. This confuses React, leading to:

Incorrect component re-rendering.
Loss of component state (like input values or UI focus).
Performance Issues:
React uses keys to determine which items have changed, been added, or removed. If keys are unstable (e.g., changing
 when the list updates), React has to re-render more components than necessary, reducing performance. */}


 //exapmle

 import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(['Task 1', 'Task 2', 'Task 3']);

  const removeItem = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo} <button onClick={() => removeItem(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
{/*Issue with the Above Code:
Initial Render:
Task 1 → key: 0
Task 2 → key: 1
Task 3 → key: 2
Remove Task 1:
Remaining list: Task 2, Task 3
Keys after re-render:
Task 2 → key: 0
Task 3 → key: 1
React sees the changes and reuses components incorrectly. If the <li> elements had input fields or internal state, 
those states might get mixed up. */}



function TodoList() {
    const [todos, setTodos] = useState([
      { id: '1', text: 'Task 1' },
      { id: '2', text: 'Task 2' },
      { id: '3', text: 'Task 3' },
    ]);
  
    const removeItem = (idToRemove) => {
      setTodos(todos.filter((todo) => todo.id !== idToRemove));
    };
  
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => removeItem(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    );
  }
  