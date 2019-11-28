
const INITIAL_STATE = {
  activityDetailItem: {},
}

export default function activityDetail(state = {}, action) {
  switch(action.type) {
    case 'ACTIVITY-DETAIL': {
      const activityDetailItem = action.payload
      return { ...state, activityDetailItem: activityDetailItem}
    }
    default:
      return state
  }
}
