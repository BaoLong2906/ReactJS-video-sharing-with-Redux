
export let saveMaPhongChieu = (maPhongChieu) => {
  return {
    type: "SAVE_MAPHONGCHIEU",
    payload: {
      maPhongChieu: maPhongChieu,
    }
  }
}

export let saveMaSuatChieu = (maSuatChieu) => {
  return {
    type: "SAVE_MASUATCHIEU",
    payload: {
      maSuatChieu: maSuatChieu,
    }
  }
}
