const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose
      .connect(`mongodb://localhost:27017/Todo_App_Dev`)
      .then(() => console.log("Connected database succces !"));
  } catch (error) {
    console.error.bind("Connection error:", error);
  }
};

module.exports = { connect };
