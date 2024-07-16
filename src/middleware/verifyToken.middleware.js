import catchError from "../utils/Handle Errrors/catchError";

export const verifyToken = catchError((req, res, next) => {
  const { token } = req.headers;

  jwt;
});
