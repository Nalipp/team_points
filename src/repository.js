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

  addTeamOneMember (name, callback) {
    console.log('addteamOneMember')

    fs.readFile(path.join(__dirname, 'team_members.dat'), (err, data) => {
      if (err) {
        console.log('error adding team one member : ' + err)
      } else {
        let teamsArr = JSON.parse(data)
        let allIds = []
        for (var i = 0; i < teamsArr[0].length; i++) {
          console.log(teamsArr[0][i]._id)
          allIds.push(teamsArr[0][i]._id)
        }
        var maxId = allIds.reduce(function(a, b) {
          return Math.max(a, b);
        });
        let newTeamMember = {
          _id: maxId + 1,
          teamNumber: 1,
          name: name,
          inactive: false,
          points: 0,
        }
        teamsArr[0].push(newTeamMember)

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

  addTeamTwoMember (name, callback) {
    console.log('addTeamTwoMember')

    fs.readFile(path.join(__dirname, 'team_members.dat'), (err, data) => {
      if (err) {
        console.log('error adding team one member : ' + err)
      } else {
        let teamsArr = JSON.parse(data)
        let allIds = []
        for (var i = 0; i < teamsArr[1].length; i++) {
          console.log(teamsArr[1][i]._id)
          allIds.push(teamsArr[1][i]._id)
        }
        var maxId = allIds.reduce(function(a, b) {
          return Math.max(a, b);
        });
        let newTeamMember = {
          _id: maxId + 1,
          teamNumber: 1,
          name: name,
          inactive: false,
          points: 0,
        }
        teamsArr[1].push(newTeamMember)

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

  deleteTeamMember (id, callback) {
    console.log('delete team one member id ' + id)

    fs.readFile(path.join(__dirname, 'team_members.dat'), (err, data) => {
      if (err) {
        console.log('error reading file to delete team one member : ' + err)
      } else {
        let teamsArr = JSON.parse(data)
        console.log('this is the teamsArr ' + teamsArr)
        for (let i = 0; i < teamsArr.length; i++) {
          teamsArr[i] = teamsArr[i].filter((teamMember) => {
            return teamMember._id !== Number(id)
          })
        }
        console.log('It\'s not me!!! ')
        let updatedArr = [teamsArr[0], teamsArr[1]]

        fs.writeFile(path.join(__dirname, 'team_members.dat'), JSON.stringify(updatedArr), (err) => {
          if (err) {
            console.log('error updating team')
          } else {
            console.log('team member deleted successfully')
            if (callback) callback()
          }
        })
      }
    })
  }
}

module.exports = Repository
