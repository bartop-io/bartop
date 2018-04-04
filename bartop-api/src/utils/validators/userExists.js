module.exports = async (db, userId) => {
  const userToUpdate = await db.find('users', userId);
  if (!userToUpdate) {
    const newError = new Error('User does not exist.');
    newError.name = 'ResourceNotFoundError';
    throw newError;
  }
  return userToUpdate;
};
