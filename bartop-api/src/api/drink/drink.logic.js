const TABLE_NAME = 'drinks';

module.exports = r => {
  // list all drinks
  const list = async () => {
    return await r.table(TABLE_NAME);
  };

  return { list };
};
