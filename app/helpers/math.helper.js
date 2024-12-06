function generateNumericUUID() {
  const length = 10;
  let uuid = '';
  for (let i = 0; i < length; i++) {
    uuid += Math.floor(Math.random() * 10);
  }
  return parseInt(uuid);
}


module.exports = {
  generateNumericUUID
};
