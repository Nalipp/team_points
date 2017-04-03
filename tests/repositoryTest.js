const Repository = require('../src/repository')
const expect = require('chai').expect
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/test_split_teams'

let repo
let testId
describe('Repository', function () {
  before(function (done) {
    repo = new Repository()
    let data = [
        {
          teamNumber: 1,
          name: 'julia',
          inactive: false,
          points: 0,
        },
        {
          teamNumber: 1,
          name: 'nate',
          inactive: false,
          points: 0,
        },
        {
          teamNumber: 1,
          name: 'hyeonu',
          inactive: false,
          points: 0,
        },
        {
          teamNumber: 2,
          name: 'bill',
          inactive: false,
          points: 0,
        },
        {
          teamNumber: 2,
          name: 'tom',
          inactive: false,
          points: 0,
        }
      ]

    MongoClient.connect(url, (err, db) => {
      expect(err).to.be.equal(null)
      console.log('Connected successfully to server')
      db.collection('students').insertMany(data, (err, result) => {
        expect(err).to.be.equal(null)
        console.log('data Initialized')
        expect(result.result.n).to.be.equal(5)
        db.close()
        done()
      })
    })


  })

  describe('#loadTeams', function () {
    it('should load all the students with either team id', function (done) {
      repo.loadTeams((students) => {
        console.log('- after loadTeams:', students)
        expect(students).to.have.lengthOf(5)
        done()
      })
    })
  })

  describe('#addTeamOneMember', function () {
    it('should add a team two member', function (done) {
      repo.addTeamOneMember(({
          teamNumber: 1,
          name: 'Rice',
          inactive: false,
          points: 0,
        }), (id) => {
        console.log('new TeamOneMember id : ' + id)
        expect(id).to.not.be.equal(null)
        testId = id

        repo.loadTeams(students => {
          console.log('- after addTeamOneMember => loadTeams:', students)
          expect(students).to.have.lengthOf(6)
          done()
        })
      })
    })
  })

  describe('#addTeamTwoMember', function () {
    it('should add a team two member', function (done) {
      repo.addTeamOneMember(({
          teamNumber: 2,
          name: 'Cake',
          inactive: false,
          points: 0,
        }), (id) => {
        console.log('new TeamOneMember id : ' + id)
        expect(id).to.not.be.equal(null)

        repo.loadTeams(students => {
          console.log('- after addTeamOneMember => loadTeams:', students)
          expect(students).to.have.lengthOf(7)
          done()
        })
      })
    })
  })

  describe('#deleteTeamMember', function () {
    it('should delete a team member', function (done) {
      repo.deleteTeamMember(testId, _ => {
        repo.loadTeams(students => {
          console.log('- after deleteTeamMember => loadTeams:', students)
          expect(students).to.have.lengthOf(6)
          done()
        })
      })
    })
  })

  after(function (done) {
    MongoClient.connect(url, (err, db) => {
      expect(err).to.be.equal(null)
      console.log('Cleaning up')
      db.collection('students').drop((err, result) => {
        expect(err).to.be.equal(null)
        console.log('Data cleaned')
        console.log(result)
        db.close()
        done()
      })
    })
  })
})
