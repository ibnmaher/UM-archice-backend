const db = require("../data/db");

exports.addUser = async ({ name, email, phone, department, superviser }) => {
  let text =
    "INSERT INTO employees (name,email,phone_number,department,type) VALUES(?,?,?,?,?)";
  let vals = [name, email, phone, department, superviser];
  console.log(vals);
  let res = await db
    .promise()
    .query(text, vals)
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
  console.log(res);
};
exports.getNames = async (string) => {
  let text = "SELECT name,email FROM employees WHERE name LIKE CONCAT(?,'%')";
  let vals = [string];
  let res = await db
    .promise()
    .query(text, vals)
    .then(([rows]) => rows)
    .catch((err) => {
      throw err;
    });
  console.log(res);
};
