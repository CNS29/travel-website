const currentTime = new Date().toISOString().slice(0, 10);

export function dateFormat(date) {
  if (!date) return;
  return date.split("-").reverse().join("/");
}

export function ratingPoint(tourId, listComment) {
  if (!listComment || listComment.length === 0) return "Not list comment";
  const newComment = [];
  let tong = 0;
  for (let i = 0; i < listComment.length; i++) {
    listComment[i].status === 1 &&
      listComment[i].tourId === tourId &&
      newComment.push(listComment[i]);
  }
  for (let i = 0; i < newComment.length; i++) {
    tong += newComment[i].star;
  }
  let score = Math.round(tong / newComment.length);
  score = isNaN(score) ? 0 : score;
  return score;
}

export function validDate(listDate) {
  if (!listDate || listDate.length === 0) return "Not list date";
  let validDay = false;
  for (let i = 0; i < listDate.length; i++) {
    if (listDate[i].ngay >= currentTime) {
      validDay = true;
      break;
    }
  }
  return validDay;
}
