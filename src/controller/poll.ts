import { getCardFromFile } from ".";
import { jsonPoll } from "../utils/index";
export const getPoll = async (req: any, res: any) => {
  const { collectionId } = req.params;
  const poll = await getCardFromFile(jsonPoll);
  poll.filter((item: any, idx: number) => {
    if (collectionId === item.collectionId) {
      console.log("item :>> ", item);
    }
  });
  res.status(200).send(JSON.stringify(collectionId));
};
