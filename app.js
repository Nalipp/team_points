
const http = require('http')
const fs = require('fs')

let Repository = require('./src/repository')
let repo = new Repository()

var server = http.createServer(function (req, res) {
  if (req.url === '/') {
    serveStatic('/index.html', res)
  } else if (req.method === 'GET' && req.url === '/teams') {
    repo.loadTeams((data) => {
      res.end(data)
    })
  } else if (req.method === 'POST' && req.url === '/team_one') {
    req.setEncoding('utf8')
    req.on('data', (teamTwoMember) => {
      repo.addTeamOneMember(teamTwoMember)
      res.end(teamTwoMember)
    })
  } else if (req.method === 'POST' && req.url === '/team_two') {
    req.setEncoding('utf8')
    req.on('data', (teamTwoMember) => {
      repo.addTeamTwoMember(teamTwoMember)
      res.end(teamTwoMember)
    })
  } else {
    serveStatic(req.url, res)
  }

  function serveStatic (path, res) {
    fs.readFile('static' + path, function (err, data) {
      if (err) pageNotFound(res)
      res.end(data)
    })
  }

  function pageNotFound (res) {
    console.log('Page Not Found')
    res.statusCode = 404
    res.end('Page Not Found')
  }
})

server.listen(4000, () => console.log('running on 4000'))
