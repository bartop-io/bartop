module.exports = {
  type: 'object',
  required: ['userId', 'drinkIds'],
  properties: {
    userId: {
      type: 'string'
    },
    drinkIds: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};
