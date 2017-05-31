'use strict'

var path = require('path')

var download = require('download-git-repo')
var tap = require('tap')
var condom = require('../condom')

download('expressjs/express', 'test/data/express', function (err) {
  if (err) throw err

  tap.test('express should be ok', function (t) {
    t.plan(1)

    var stream = condom({
      packageJson: require(path.join(__dirname, '/data/express', 'package.json')),
      globPattern: ['**/*.js', '!node_modules/**/*', '!test/**/*', '!tests/**/*', '!examples/**/*'],
      globOptions: {
        cwd: path.join(__dirname, '/data/express')
      }
    })

    stream.on('data', function (d) {
      t.fail(d)
    })
    stream.on('end', function () {
      t.ok(true)
      t.end()
    })
  })
})
