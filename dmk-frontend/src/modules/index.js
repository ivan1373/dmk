// Redux
import { combineReducers } from "redux";

// Units
import auth from "Modules/units/Auth";
import users from "Modules/units/Users";
import cities from "Modules/units/Cities";
import districts from "Modules/units/Districts";
import states from "Modules/units/States";
import permissions from "Modules/units/Permissions";
import privileges from "Modules/units/Privileges";
import roles from "Modules/units/Roles";

export default combineReducers({
  auth,
  users,
  cities,
  districts,
  states,
  permissions,
  privileges,
  roles
});
