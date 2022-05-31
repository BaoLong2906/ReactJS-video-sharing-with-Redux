let initialState = {
    phimList: [],
}
  
  let QLPhimReducer = (state = initialState, action) => {
    switch (action.type) {
        case "":
          let newPhimList = action.payload.phimList;

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
  
  export default QLPhimReducer;