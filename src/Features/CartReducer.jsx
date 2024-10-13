const CartReducer = (state, action) => {
    switch (action.type) {
      case "Add":
        // Check if item is already in the cart
        const existingItem = state.find((item) => item.id === action.product.id);
        if (existingItem) {
          return state.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...state, { ...action.product, quantity: 1 }];
        }
  
      case "Increase":
        return state.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
  
      case "Decrease":
        return state.map((item) =>
          item.id === action.id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item // keep item if quantity > 1
            : item
        );
  
      case "Remove":
        return state.filter((item) => item.id !== action.id);
  
      default:
        return state;
    }
  };
  
  export default CartReducer;
  

