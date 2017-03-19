$(document).ready(function () {
  loadTeams()
  addEventListenersListOne()
  addEventListenersListTwo()
})

function loadTeams () {
  $.get('http://localhost:4000/teams')
    .done(data => {
      console.log('populateTeamOne successful : ' + data)
      let teamsArr = JSON.parse(data)
      $('#list1').empty()
      $('#list2').empty()
      $('form').trigger('reset')
      $('#addName').focus()
      for (let i = 0; i < teamsArr[0].length; i++) {
        $('#list1').append(
          '<li>' + teamsArr[0][i] + '</li>'
        )
      }
      for (let i = 0; i < teamsArr[1].length; i++) {
        $('#list2').append(
          '<li>' + teamsArr[1][i] + '</li>'
        )
      }
    })
}

function addEventListenersListOne () {
  $('#btn-team1').click(function () {
    let addName = $('input').val()
    console.log('addName :' + addName)

    $.get('http://localhost:4000/teams')
      .done(data => {
        let teamsArr = JSON.parse(data)

        if (teamsArr[0].indexOf(addName) === -1 && addName.length > 0) {
          console.log('teamsArr[0] ' + teamsArr[0])
          console.log('posting teamsArr[0] with new team member : ' + addName)
          $.post('http://localhost:4000/team_one', addName)
        .done(data => {
          loadTeams()
        })
        } else {
          if (addName.length < 1) {
            window.alert('name must not be blank')
          } else {
            window.alert('That team member is already on the list.')
          }
        }
      })
  })
}

function addEventListenersListTwo () {
  $('#btn-team2').click(function () {
    let addName = $('input').val()
    console.log('addName :' + addName)

    $.get('http://localhost:4000/teams')
      .done(data => {
        let teamsArr = JSON.parse(data)

        if (teamsArr[1].indexOf(addName) === -1 && addName.length > 0) {
          console.log('teamsArr[0] ' + teamsArr[1])
          console.log('posting teamsArr[0] with new team member : ' + addName)
          $.post('http://localhost:4000/team_two', addName)
        .done(data => {
          loadTeams()
        })
        } else {
          if (addName.length < 1) {
            window.alert('name must not be blank')
          } else {
            window.alert('That team member is already on the list.')
          }
        }
      })
  })
}
