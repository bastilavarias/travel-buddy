import Database from "../index";
import Nationality from "../entities/Nationality";
import Sex from "../entities/Sex";
import nationalities from "./modules/nationalities";
import sexes from "./modules/sexes";
import AccountType from "../entities/AccountType";
import accountTypes from "./modules/accountTypes";
import Destination from "../entities/Destination";
import destinations from "./modules/destinations";
import Transportation from "../entities/Transportation";
import transportation from "./modules/transportation";
import ProfileImage from "../entities/ProfileImage";
import defaultAdministratorProfileImage from "./modules/default-administrator/profileImage";
import Profile from "../entities/Profile";
import defaultAdministratorProfile from "./modules/default-administrator/profile";
import Account from "../entities/Account";
import defaultAdministratorAccount from "./modules/default-administrator/account";
import ItineraryPost from "../entities/ItineraryPost";
import defaultItineraryPosts from "./modules/default-itineraries/post";
import defaultItineraryPostDays from "./modules/default-itineraries/days";
import ItineraryPostDay from "../entities/ItineraryPostDay";

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
  await connection
    .createQueryBuilder()
    .insert()
    .into(Destination)
    .values(destinations)
    .onConflict(`("name") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(Transportation)
    .values(transportation)
    .onConflict(`("name") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(ProfileImage)
    .values(defaultAdministratorProfileImage)
    .onConflict(`("id") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(Profile)
    .values(defaultAdministratorProfile)
    .onConflict(`("id") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(Account)
    .values(defaultAdministratorAccount)
    .onConflict(`("email") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(ItineraryPost)
    .values(defaultItineraryPosts)
    .onConflict(`("id") do nothing`)
    .execute();
  await connection
    .createQueryBuilder()
    .insert()
    .into(ItineraryPostDay)
    .values(defaultItineraryPostDays)
    .onConflict(`("id") do nothing`)
    .execute();
};

generateSeeds()
  .then(() => console.log("Seeds was successfully generated."))
  .catch((error) => console.log(error));
