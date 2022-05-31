let getThuTrongTuan = (date) => {
    // Khai báo đối tượng Date
var date = new Date();
 
// Lấy số thứ tự của ngày hiện tại
var current_day = date.getDay();
 
// Biến lưu tên của thứ
var day_name = '';
 
// Lấy tên thứ của ngày hiện tại
switch (current_day) {
case 0:
    day_name = "Chủ nhật";
    break;
case 1:
    day_name = "Thứ hai";
    break;
case 2:
    day_name = "Thứ ba";
    break;
case 3:
    day_name = "Thứ tư";
    break;
case 4:
    day_name = "Thứ năm";
    break;
case 5:
    day_name = "Thứ sau";
    break;
case 6:
    day_name = "Thứ bảy";
    break;
default:
    day_name = 'dont know';

}
return day_name;
}

export default getThuTrongTuan;