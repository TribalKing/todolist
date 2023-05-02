import React from "react";
import {
  List,
  ListItem,
  Flex,
  Checkbox,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import useApi from "../../hooks/useApi";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Todo } from "../../libs/types";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const { put } = useApi();

  // Checking a todo to completed or not
  const check = (name: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.name === name) {
        todo.completed = !todo.completed;

        const putData = {
          id: todo.id,
          completed: todo.completed,
          sort: todos.length + 1,
          name: todo.name,
        };
        put("todos", putData, todo.id);
      }

      return todo;
    });
    setTodos(updatedTodos);
  };

  // Updating a todo
  const update = (name: string, newName: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.name === name) {
        todo.name = newName;
        const putData = {
          id: todo.id,
          completed: todo.completed,
          sort: todos.length + 1,
          name: newName,
        };
        put("todos", putData, todo.id);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Reordering a todo by direction
  const reorder = (name: string, direction: string) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.name === name) {
        if (direction === "up") {
          todos[todo.sort - 1].sort = todo.sort;
          todo.sort = todo.sort - 1;
          setTodos(todos);
        } else {
          todos[todo.sort + 1].sort = todo.sort;
          todo.sort = todo.sort + 1;
          setTodos(todos);
        }
        const putData = {
          id: todo.id,
          completed: todo.completed,
          sort: todo.sort,
          name: todo.name,
        };
        put("todos", putData, todo.id);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  todos.sort((a, b) => (a.sort > b.sort ? 1 : -1));

  return (
    <>
      <Box marginTop={10}>
        {todos.map((todo: Todo) => (
          <Flex alignItems={"center"} justifyContent={"center"} key={todo.name}>
            <List>
              <Flex>
                <Checkbox
                  size="lg"
                  colorScheme="green"
                  isChecked={todo.completed}
                  onChange={() => check(todo.name)}
                  m={1}
                />
                <ListItem paddingLeft={3}>
                  <Input
                    defaultValue={todo.name}
                    onBlur={(e) => update(todo.name, e.target.value)}
                    size={"lg"}
                    width={500}
                    disabled={todo.completed}
                    m={1}
                  />
                </ListItem>
                <Button m={1} onClick={() => reorder(todo.name, "up")}>
                  <ArrowUpIcon />
                </Button>
                <Button m={1} onClick={() => reorder(todo.name, "down")}>
                  <ArrowDownIcon />
                </Button>
              </Flex>
            </List>
          </Flex>
        ))}
      </Box>
    </>
  );
};
