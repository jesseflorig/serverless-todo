import React from "react"
import nanoid from "nanoid"
import todoReducer from "./todoReducer"

type TodoList = {}

const TodoList = () => {
  // The reducer defined before
  const [state, dispatch] = React.useReducer(todoReducer, {
    currentTodo: "",
    todos: []
  });
  const add = () => {
    dispatch({
      type: "add",
      payload: {
        id: nanoid(),
        name: state.currentTodo,
        completed: false,
        createdAt: `${Date.now()}`
      }
    });
    dispatch({ type: "set-current", payload: "" });
  };
  const edit = (todo /*:Todo*/) => {
    dispatch({ type: "update", payload: todo });
  };
  const del = (todo /*:Todo*/) => {
    dispatch({ type: "delete", payload: todo });
  };
  return (
    <>
        <form
          onSubmit={event => {
            event.preventDefault();
            add();
          }}
        >
          <input
            type="text"
            value={state.currentTodo}
            onChange={event => {
              dispatch({ type: "set-current", payload: event.target.value });
            }}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {state.todos.map(todo => {
            return (
              <li key={todo.id}>
                <input
                  type={"text"}
                  value={todo.name}
                  onChange={event => {
                    edit({ ...todo, name: event.target.value });
                  }}
                />
                <button
                  onClick={() => {
                    del(todo);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
    </>
  );
};

export default TodoList
