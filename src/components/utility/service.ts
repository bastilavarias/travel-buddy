import bcrypt from "bcryptjs";

const utilityService = {
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(
      parseInt(<string>process.env.BCRYPT_SALT_ROUNDS)
    );
    return bcrypt.hashSync(password, salt);
  },

  checkErrorIfValid: (error: object): boolean => {
    return Object.values(error).filter((message) => message).length > 0;
  },
};

export default utilityService;
