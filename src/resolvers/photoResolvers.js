module.exports = {
  id: parent => parent.id || parent._id,

  url: parent => `/img/photos/${parent._id}.jpg`,

  postedBy: (parent, args, { db }) => db.collection('users').findOne({ githubLogin: parent.userID }),

  taggedUsers: async ({ taggedUsers }, args, { db }) => {
    if (taggedUsers) {
      return taggedUsers.map(id => db.collection('users').findOne({githubLogin: id}))
    }
    return []
  }
}