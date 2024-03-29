const { findToken, findUserById } = require("../models/commonModle");
const apiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

exports.refresh = async (req, res, next) => {
  token = req.get("Authorization");

  if (!token) {
    return res.json("null");
  }
  try {
    rawToken = token.split(" ")[1];

    const expired = await jwt.verify(rawToken, process.env.SECRET, {
      ignoreExpiration: true,
    });

    if (!expired) {
      return res.json.status(401)(apiError.unauthorized("unauthorized"));
    } else {
      const mainToken = await findToken(expired.id);
      const user = await findUserById(expired.id);

      if (!mainToken) {
        next(apiError.unauthorized());
        return;
      } else {
        const valid = await jwt.verify(mainToken.token, process.env.SECRET);
        if (valid) {
          const newToken = await jwt.sign(
            {
              id: user.user_id,
              department: user.department,
              type: user.type,
              email: user.email,
            },
            process.env.SECRET,
            { expiresIn: "2h" }
          );
          res.json({
            token: newToken,
            id: user.user_id,
            type: user.type,
            name: user.name,
            email: user.email,
          });
        } else {
          next(apiError.unauthorized());
        }
      }
    }
  } catch (err) {
    next(err);
  }
};
