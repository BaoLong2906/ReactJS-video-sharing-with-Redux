let goAbroadOrStay = () => {
    let branch;
    if (localStorage.getItem('MaCN') == localStorage.getItem('GoAbroad')) {
      branch = localStorage.getItem('MaCN');
    }
    if (localStorage.getItem('MaCN') != localStorage.getItem('GoAbroad')) {
      branch = localStorage.getItem('GoAbroad');
    }
    return branch;
}

export default goAbroadOrStay;