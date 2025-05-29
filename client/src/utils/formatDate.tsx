export const formatDate = (date: any) => {
    if (date) {
      const dt = new Date(date);
      const month =
        dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
      return day + "/" + month + "/" + dt.getFullYear();
    }
    return "";
  };

  export const formatDateString = (date: any) => {
    if (date) {
      const dt = new Date(date);
      return dt.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
    return "";
  };



  function getOrdinalSuffix(day:any) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  
  export const formatOrdinalSuffixDate = (date:any) => {
    if (date) {
      const dt = new Date(date);
      const day = dt.getDate();
      const ordinalSuffix = getOrdinalSuffix(day);
      return `${day}${ordinalSuffix} ${dt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    }
    return "";
  };