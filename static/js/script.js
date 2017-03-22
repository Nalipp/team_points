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
        let $teamMember = $('#list1').append('<li>' + teamsArr[0][i].name + '</li>')
        let $btnTrash = $('<span class="delete-x">').attr('id', teamsArr[0][i]._id).click(deleteTeamMember)
        $teamMember.append($btnTrash)
      }
      for (let i = 0; i < teamsArr[1].length; i++) {
        let $teamMember = $('#list2').append('<li>' + teamsArr[1][i].name + '</li>')
        let $btnTrash = $('<span class="delete-x">').attr('id', teamsArr[1][i]._id).click(deleteTeamMember)
        $teamMember.append($btnTrash)
      }
    })
}

function deleteTeamMember (event) {
  let id = event.target.id
  console.log('preparing to delete id:', id)
  $.ajax({
    url: 'http://localhost:4000/teams',
    method: 'DELETE',
    data: JSON.stringify(id)
  }).done(data => {
    loadTeams()
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

  // function deleteTeamOneMember(event) {
  //   window.alert('hi')
  //   let id = event.target.id
  //   console.log('id:', id)
  //   $.ajax({
  //     url: 'http://localhost:4000/team_one',
  //     method: 'DELETE',
  //     data: JSON.stringify([id])
  //   }).done(data => {
  //     loadTeams()
  //   })
  // }
}
