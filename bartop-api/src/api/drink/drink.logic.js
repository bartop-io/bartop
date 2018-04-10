module.exports = r => {
  // list all drinks
  const list = async () => {
    return await r.table('drinks');
  };

  return { list };
};
