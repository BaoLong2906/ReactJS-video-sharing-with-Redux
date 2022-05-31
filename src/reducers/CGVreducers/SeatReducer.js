import removeItemInArrayByValue from "../../helper/removeItemInArrayByValue.js";

let initialState = {
  MaSlot: '',
  ListSeatPicked: [],
}

let newListSeatPicked;

let seatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PICK_SEAT":
      newListSeatPicked = [...state.ListSeatPicked];
      newListSeatPicked.push(action.payload.MaSlot)
      localStorage.setItem("listseat", newListSeatPicked);
      return {
          ...state,
          ListSeatPicked: newListSeatPicked,
      };
      
    
    case "UNPICK_SEAT":
      newListSeatPicked = removeItemInArrayByValue(state.ListSeatPicked, action.payload.MaSlot);  
      localStorage.setItem("listseat", newListSeatPicked);
      return {
        ...state,
        ListSeatPicked: newListSeatPicked,
      };

    case "DELETE_ALL_SEAT_PICKED":
      localStorage.setItem("listseat", "");
      return {
        ...state,
        ListSeatPicked: [],
      }


    default:
      return state;
  }
}

export default seatReducer;