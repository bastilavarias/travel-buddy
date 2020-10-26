import Database from "../index";
import Nationality from "../entities/Nationality";
import Sex from "../entities/Sex";
import nationalities from "./modules/nationalities";
import sexes from "./modules/sexes";
import AccountType from "../entities/AccountType";
import accountTypes from "./modules/accountTypes";

const generateSeeds = async () => {
  const connection = await Database.init();
  await connection
    .createQueryBuilder()
    .insert()
    .into(Nationality)
    .values(nationalities)
    .onConflict(`("name") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(Sex)
    .values(sexes)
    .onConflict(`("name") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(AccountType)
    .values(accountTypes)
    .onConflict(`("name") do nothing`)
    .execute();
};

generateSeeds()
  .then(() => console.log("Seeds was successfully generated."))
  .catch((error) => console.log(error));
