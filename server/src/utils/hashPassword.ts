import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const checkPassword = async (password: string, hash: string) => {
  const checkPassword = bcrypt.compareSync(password, hash);
  return checkPassword;
};
