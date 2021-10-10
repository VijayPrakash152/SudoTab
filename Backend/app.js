/* eslint-disable */
const express = require("express");
const cors = require("cors");
const { data: parentData } = require("./assets/Parent.json");
const { data: childData } = require("./assets/Child.json");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
//esl
// Api endpoint for data related to parent  [1st task]
app.get("/transactions", async (req, res) => {
  let parentResponseData = parentData.map((pData) => {
    const totalPaidAmount = childData
      .filter((cData) => cData.parentId == pData.id)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.paidAmount;
      }, 0);
    return {
      ...pData,
      totalPaidAmount,
    };
  });
  const totalCount = parentResponseData.length;
  const { _page, _order } = req.query;
  if (_order && _order == "asc") {
    parentResponseData.sort((a, b) => a.id - b.id);
  } else if (_order && _order == "desc") {
    parentResponseData.sort((a, b) => b.id - a.id);
  }

  if (_page) {
    let startIdx = (_page - 1) * 2;
    parentResponseData = parentResponseData.splice(startIdx, 2);
  }
  return res.json({ parentResponseData, totalCount });
});

// Api endpoint for data related to child  [2nd task]

app.get("/installments/:id", (req, res) => {
  const { id } = req.params;
  const { _order } = req.query;
  const parentObj = parentData.find((elem) => elem.id == id);
  let childResponseData = childData
    .filter((cData) => cData.parentId == id)
    .map((cData) => ({
      id: cData.id,
      sender: parentObj.sender,
      receiver: parentObj.receiver,
      totalAmount: parentObj.totalAmount,
      paidAmount: cData.paidAmount,
    }));
  if (_order && _order == "asc") {
    childResponseData.sort((a, b) => a.id - b.id);
  } else if (_order && _order == "desc") {
    childResponseData.sort((a, b) => b.id - a.id);
  }
  return res.send(childResponseData);
});

app.listen(PORT, () => {
  console.log(`The app is running at ${PORT}...`);
});
