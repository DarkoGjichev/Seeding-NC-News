const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupRef = (data, currentKey, targetKey) => {
  const ref = {};
  data.forEach((element) => {
    ref[element[currentKey]] = element[targetKey];
  });
  return ref;
};
