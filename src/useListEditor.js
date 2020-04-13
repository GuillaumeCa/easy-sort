import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return {
        ...state,
        title: action.title,
      };

    case "SET_ITEMS":
      return {
        ...state,
        items: action.items,
      };

    case "ADD_ITEMS":
      return {
        ...state,
        items: [...state.items, ...action.items],
      };

    case "EDIT_ITEM":
      return {
        ...state,
        items: state.items.map((it) => {
          if (it.id === action.item.id) {
            return action.item;
          }
          return it;
        }),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.id),
      };

    case "CLEAR_ITEMS":
      return {
        ...state,
        items: [],
      };

    default:
      throw new Error("unsupported action: " + action.type);
  }
}

export function useListEditor() {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    items: [],
  });

  return {
    list: state,
    setTitle: () => dispatch({ type: "SET_TITLE" }),
    setItems: (items) => dispatch({ type: "SET_ITEMS", items }),
    addItems: (items) => dispatch({ type: "ADD_ITEMS", items }),
    editItem: (item) => dispatch({ type: "EDIT_ITEM", item }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    clearItems: () => dispatch({ type: "CLEAR_ITEMS" }),
  };
}
