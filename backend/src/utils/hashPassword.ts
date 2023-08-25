import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

export const comParePassword = async (password: string, hash: string) => {
  try {
    const checkPassword = bcrypt.compareSync(password, hash);
    return checkPassword;
  } catch (error) {
    throw error;
  }
};
