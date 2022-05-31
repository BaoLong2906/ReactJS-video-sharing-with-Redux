let initialState = {
    maSuatChieu: '',
    maPhongChieu: '',
}
  
  let phimReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_MASUATCHIEU":
          let newMaSuatChieu = action.payload.maSuatChieu;
          localStorage.setItem("MaSuatChieu", newMaSuatChieu);
          return {
            ...state,
            maSuatChieu: newMaSuatChieu,
          }

          case "SAVE_MAPHONGCHIEU":
            let newMaPhongChieu = action.payload.maPhongChieu;
            localStorage.setItem("MaPhongChieu", newMaPhongChieu);
            return {
              ...state,
              maPhongChieu: newMaPhongChieu,
            }
    
      default:
        return state;
    }
  }
  
  export default phimReducer;