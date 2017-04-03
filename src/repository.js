const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/test_split_teams'

class Repository {
  loadTeams (callback) {
    console.log('loadStudents')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('students').find({}).toArray((err, students) => {
        if (err) return console.error('Failed to load students.', err)
        callback(students)
      })
    })
  }

  addTeamOneMember (name, callback) {
    console.log('addTeamOneMember')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('students').insertOne(name, (err, result) => {
        if (err) return console.error('Failed to add team one member.', err)
        callback(result.ops[0]._id)
      })
    })
  }

  addTeamTwoMember (name, callback) {
    console.log('addTeamTwoMember')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('students').insertOne(name, (err, students) => {
        if (err) return console.error('Failed to add team one member.', err)
        callback(students)
      })
    })
  }

  deleteTeamMember (id, callback) {
    console.log('deleteTeamMember')
    MongoClient.connect(url, (err, db) => {
      if (err) return console.error('Failed to connect.', err)
      db.collection('students').deleteOne({_id: new ObjectID(id)}, (err, students) => {
        if (err) return console.error('Failed to delete team member.', err)
        callback()
      })
    })
  }
}

module.exports = Repository
