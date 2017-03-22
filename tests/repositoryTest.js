const Repository = require('../src/repository')
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

let repo
describe('Repository', function () {
  before(function (done) {
    repo = new Repository()
    let data =
    [
      [
        {
          _id: 1,
          teamNumber: 1,
          name: 'julia',
          inactive: false,
          points: 0,
        },
        {
          _id: 2,
          teamNumber: 1,
          name: 'nate',
          inactive: false,
          points: 0,
        },
        {
          _id: 3,
          teamNumber: 1,
          name: 'hyeonu',
          inactive: false,
          points: 0,
        },
      ],
      [
        {
          _id: 4,
          teamNumber: 2,
          name: 'bill',
          inactive: false,
          points: 0,
        },
        {
          _id: 5,
          teamNumber: 2,
          name: 'tom',
          inactive: false,
          points: 0,
        }
      ]
    ]
    fs.writeFile(path.join(__dirname, '../src/team_members.dat'), JSON.stringify(data), (err) => {
      if (err) console.log('unable to write teames: ' + err)
      console.log('teams have been successfully created')
      done()
    })
  })

  describe('#loadTeams', function () {
    it('should find all the team members', function (done) {
      repo.loadTeams((data) => {
        console.log('- after loadTeams:', data)
        expect(data).have.length.at.least(2)
        done()
      })
    })
  })

  describe('#addTeamOneMember', function () {
    it('should add a new team one member', function (done) {
      repo.addTeamOneMember('chris', () => {
        repo.loadTeams((data) => {
          console.log('- after addTeamOneMember:', data)
          expect(data).have.length.at.least(3)
          console.log('this is the data ' + data)
          expect(data.toString()).to.include('chris')
          done()
        })
      })
    })
  })

  describe('#addTeamTwoMember', function () {
    it('should add a new team two member', function (done) {
      repo.addTeamTwoMember('sally', () => {
        repo.loadTeams((data) => {
          console.log('- after addTeamTwoMember:', data)
          expect(data).have.length.at.least(3)
          console.log('this is the data ' + data)
          expect(data.toString()).to.include('sally')
          done()
        })
      })
    })
  })

  describe('#deleteTeamMember', function () {
    it('should add a new team two member', function (done) {
      repo.deleteTeamMember(3, () => {
        repo.loadTeams((data) => {
          console.log('- after deleteTeamMember:', data)
          expect(data.toString()).not.to.include(3)
          done()
        })
      })
    })
  })
})
