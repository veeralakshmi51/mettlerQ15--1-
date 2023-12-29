import { combineReducers } from 'redux'
import LoginReducer from './login/reducer'
import PSConfigReducer from './staffConfiguration/reducer'
import AccessControlReducer from './accesscontrol/reducer'
import StaffReducer from './staff/reducer'
import BeaconReducer from './beaconDevices/reducer'
import OrganizationDetailsReducer from './organizationDetails/reducer'

const rootReducer = combineReducers({
  Login: LoginReducer,
  PSConfig: PSConfigReducer,
  Access: AccessControlReducer,
  Staff: StaffReducer,
  Beacon: BeaconReducer,
  Organization:OrganizationDetailsReducer
})

export default rootReducer
