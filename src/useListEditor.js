import { useEffect, useReducer } from "react";

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

    case "CLEAR":
      return initState;

    default:
      throw new Error("unsupported action: " + action.type);
  }
}

const initState = {
  title: "",
  items: [],
};

export function useListEditor() {
  const [state, dispatch] = useReducer(reducer, initState, () => {
    const storedList = localStorage.getItem("list");
    if (!storedList) {
      return initState;
    }

    try {
      const list = JSON.parse(storedList);
      return list;
    } catch (err) {
      return initState;
    }
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(state));
  }, [state]);

  return {
    list: state,
    setTitle: (title) => dispatch({ type: "SET_TITLE", title }),
    setItems: (items) => dispatch({ type: "SET_ITEMS", items }),
    addItems: (items) => dispatch({ type: "ADD_ITEMS", items }),
    editItem: (item) => dispatch({ type: "EDIT_ITEM", item }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    clear: () => dispatch({ type: "CLEAR" }),
  };
}
