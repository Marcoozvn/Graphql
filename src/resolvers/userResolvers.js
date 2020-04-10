module.exports = {
  postedPhotos: (parent, args, { db }) => db.collection('photos').find({ userID: parent.githubLogin }).toArray(),

  inPhotos: async ({ githubLogin }, args, { db }) => db.collection('photos').find({ taggedUsers: [githubLogin] }).toArray()
}