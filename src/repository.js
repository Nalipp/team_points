const fs = require('fs')
const path = require('path')

class Repository {
  loadTeams (callback) {
    fs.readFile(path.join(__dirname, 'team_members.dat'), (err, data) => {
      if (err) {
        console.log('unable to loadTeamMembers ' + err)
      } else {
        callback(data)
      }
    })
  }

  addTeamOneMember (teamOneMember, callback) {
    console.log('addTeamOneMember')

    fs.readFile(path.join(__dirname, 'team_members.dat'), (err, data) => {
      if (err) {
        console.log('error adding team one member : ' + err)
      } else {
        let teamsArr = JSON.parse(data)
        teamsArr[0].push(teamOneMember)
        console.log('added team one with new team member : ' + teamsArr[0])

        fs.writeFile(path.join(__dirname, 'team_members.dat'), JSON.stringify(teamsArr), (err) => {
          if (err) {
            console.log('error updating team')
          } else {
            console.log('new team member added successfully')
            if (callback) callback()
          }
        })
      }
    })
  }

  addTeamTwoMember (teamTwoMember, callback) {
    console.log('addTeamTwoMember')

    fs.readFile(path.join(__dirname, 'team_members.dat'), (err, data) => {
      if (err) {
        console.log('error adding team one member : ' + err)
      } else {
        let teamsArr = JSON.parse(data)
        teamsArr[1].push(teamTwoMember)
        console.log('added team one with new team member : ' + teamsArr[1])

        fs.writeFile(path.join(__dirname, 'team_members.dat'), JSON.stringify(teamsArr), (err) => {
          if (err) {
            console.log('error updating team')
          } else {
            console.log('new team member added successfully')
            if (callback) callback()
          }
        })
      }
    })
  }
}

module.exports = Repository
