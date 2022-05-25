import { Card } from "./entity/card";
import { User } from "./entity/user";

export const getUsers = async () => {
  try {
    const data = await User.find();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (id: number) => {
  try {
    const data = await User.findOne({
      where: { id: id },
    });
    return data;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
export const postUser = async (input: User) => {
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

//card

export const getCards = () => {
  try {
    const data = Card.find();
    return data;
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const postCard = (input: any) => {
  try {
    const newCard = new Card();
    newCard["title"] = input["title"];
    newCard["price"] = input["price"];
    newCard["description"] = input["description"];
    return newCard.save();
  } catch (error) {
    console.log("error :>> ", error);
  }
};
