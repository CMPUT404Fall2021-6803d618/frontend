import React, { useState, ChangeEvent, useEffect } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    const newTodos = [...todos, value];
    setTodos(newTodos);
    setValue("");
  };

  return (
    <div className="container">
      <input onChange={handleValueChange} value={value} />
      <button onClick={handleButtonClick}>Add</button>
      {todos.map((todo) => {
        return <div key={todo}>{todo}</div>;
      })}
    </div>
  );
};

export default Home;
