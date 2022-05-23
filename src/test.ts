import { User } from "./entity";
export type inputUser = {
  userName: string;
  Email: string;
  password: string;
};
export const getUser = async (todoId?: number) => {
  console.log("todoId :>> ", todoId);
  try {
    if (todoId) {
      const data = await User.findOne({
        where: { id: todoId },
      }); // get specific todo
      return data;
    } else {
      // get all todos
      const data = await User.find();
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getDetailUser = async (id: number) => {
  try {
    const data = await User.findOne({
      where: { id: id },
    });
    console.log("data :>> ", data);

    return data;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
export const createUser = async (input: User) => {
  console.log("input_test :>> ", input);
  try {
    const _newTodo = new User();
    _newTodo["userName"] = input["userName"];
    _newTodo["Email"] = input["Email"];
    _newTodo["Password"] = input["Password"];
    return await _newTodo.save();
  } catch (e) {
    console.error(e);
  }
};
