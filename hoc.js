{/*A Higher-Order Component (HOC) is an advanced technique in React for reusing component logic.
 It is a function that takes a component as an argument and returns a new component, typically wrapping the original 
 component to add extra functionality or modify its behavior.

Characteristics of HOCs:
Function as Input and Output: A HOC accepts a component and returns another component.
Logic Sharing: HOCs allow you to reuse logic across multiple components without duplicating code.
Composition over Inheritance: HOCs follow the composition principle rather than inheritance.
Doesn't Modify Input: The original component is left unmodified; a new enhanced component is created*/}


import React from 'react';

// Higher-Order Component
function withLogging(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component Mounted with props:', this.props);
    }

    componentDidUpdate(prevProps) {
      console.log('Component Updated. Previous props:', prevProps);
      console.log('New props:', this.props);
    }

    render() {
      // Render the wrapped component with all props
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Example Component
function SimpleComponent({ message }) {
  return <div>{message}</div>;
}

// Enhancing SimpleComponent with the HOC
const EnhancedComponent = withLogging(SimpleComponent);

// Usage
export default function App() {
  return <EnhancedComponent message="Hello, World!" />;
}


{/*Benefits:
Encourages code reuse.
Keeps components focused on their core responsibilities.
Easy to test and debug individual functionalities added by the HOC.
Note:
HOCs are a powerful pattern but can sometimes lead to a complex hierarchy, often referred to as a "wrapper hell."
 Modern React also provides hooks (e.g., useEffect, useContext) as a preferred way to share logic in functional 
 components. */}