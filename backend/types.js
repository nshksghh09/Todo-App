const zod = require("zod");

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTodo = zod.object({
  id: zod.string(),
});

//this is how you export this file to other
module.exports = {
  createTodo,
  updateTodo,
};
