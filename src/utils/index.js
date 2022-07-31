export const convertTime = (second) => {
  const d = Number(second);

  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var sDisplay = s > 0 ? (s > 9 ? s : "0" + s) : "00";
  var mDisplay = m > 0 ? (m > 9 ? m + ":" : "0" + m + ":") : "00:";
  var hDisplay = h > 0 ? (h > 9 ? h + ":" : "0" + h + ":") : "";

  return hDisplay + mDisplay + sDisplay;
};

export const convertViewMethodA = (view) => {
  var result;
  if (view < 1000) {
    result = view;
  } else if (view < 1000000) {
    result = (view / 1000).toFixed(1) + " N";
  } else if (view < 1000000000) {
    result = (view / 1000000).toFixed(1) + " Tr";
  } else {
    result = (view / 1000000000).toFixed(1) + " T";
  }
  return result;
};

export const convertViewMethodB = (view) => {
  return (Math.round(view * 100) / 100).toLocaleString();
};

export const filterUnique = (arr) => {
  return [...new Map(arr.map((item) => [item._id, item])).values()];
};
