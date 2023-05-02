import React, { useEffect, useState } from "react";
import { Input, Button, Flex, useToast } from "@chakra-ui/react";
import { TodoList } from "./TodoList";
import useApi from "../../hooks/useApi";
import { Todo } from "../../libs/types";

interface TodosProps {}

export const Todos: React.FC<TodosProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTodo, setInputTodo] = useState<string>("");

  const { get, post } = useApi();

  const toast = useToast();

  // Getting all the todos from the database
  const getTodos = async () => {
    const data = (await get("todos")) as { todos: Todo[] };
    data.todos.forEach((todo, index) => {
      todo.sort = index;
    });
    setTodos(data.todos);
  };

  const saveNewTodo = async () => {
    toast({
      title: "Todo Added.",
      description: "We've added your todo for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    const postData = { name: inputTodo };
    const postTodo = await post("todos", postData);
    return postTodo as Todo;
  };

  // Adding a todo in the todos
  const Todos = async () => {
    if (!inputTodo) {
      toast({
        title: "Todo Not Added.",
        description: "We've not added your todo for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      return;
    }
    const newTodo = {
      name: inputTodo,
      completed: false,
      sort: todos.length + 1,
      id: todos.length + 100,
    };
    setTodos([...todos, newTodo]);
    setInputTodo("");

    // Saving a todo in the database
    await saveNewTodo();
  };

  // Getting all the todos from the database first time the page loads
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Input
          type="text"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
          size="md"
          width={300}
        />
        <Button onClick={Todos}>Add Todo</Button>
      </Flex>

      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
};
