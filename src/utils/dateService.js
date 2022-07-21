const getWeekday = (inputdate) => {
    const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var date = new Date(inputdate);
    let day = weekday[date.getDay()];
    return day;
}

export { getWeekday }