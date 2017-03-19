const Repository = require('../src/repository')
const expect = require('chai').expect
const fs = require('fs')
const path = require('path')

let repo
describe('Repository', function () {
  before(function (done) {
    repo = new Repository()
    let data = '[["nate", "julia", "hyeonu"],["billy","drake","heidi"]]'
    fs.writeFile(path.join(__dirname, '../src/team_members.dat'), data, (err) => {
      if (err) console.log('unable to write teames: ' + err)
      console.log('teams have been successfully created')
      done()
    })
  })

  describe('#loadTeams', function () {
    it('should find all the team members', function (done) {
      repo.loadTeams((data) => {
        console.log('- after loadTeams:', data.toString())
        expect(JSON.parse(data.toString())).have.length.at.least(2)
        done()
      })
    })
  })

  describe('#AddTeamOneMember', function () {
    it('should add a new team one member', function (done) {
      repo.addTeamOneMember('billy', () => {
        repo.loadTeams((data) => {
          console.log('- after addTeamOneMember:', data.toString())
          expect(JSON.parse(data.toString())[0]).lengthOf(4)
          expect(data.toString()).to.include('billy')
          done()
        })
      })
    })
  })
})
