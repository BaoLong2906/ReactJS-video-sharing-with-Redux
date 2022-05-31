export let pickSeat = (MaSlot) => {
  return {
    type: "PICK_SEAT",
    payload: {
      MaSlot: MaSlot,
    }
  };
}

export let unpickSeat = (MaSlot) => {
  return {
    type: "UNPICK_SEAT",
    payload: {
      MaSlot: MaSlot,
    },
  };
}


export let deleteALLSeatPicked = () => {
  return {
    type: "DELETE_ALL_SEAT_PICKED",
    payload: {
      
    }
  }
}