# JMAP-CLIENT

[![Build Status](https://ci.open-paas.org/jenkins/buildStatus/icon?job=jmap-client)](https://ci.open-paas.org/jenkins/job/jmap-client/)

This repository provides a javascript lib to make requests against a JMAP server.

It allows to hide bothering things by using a more object oriented pattern like:

    var myMailboxes = new JMAP({transport: "xhr"})
       .connect({server: "https://myjmap.org"})
       .getMailboxes({user: "user@myjmap.org"})

## Documentation

TODO

## How to contribute

1. clone the repository

        git clone https://ci.open-paas.org/stash/scm/olibs/jmap-client.git

2. Install dependencies then run the tests

        cd jmap-client
        npm install
        grunt

3. Code, execute tests then pull request !

## License

TODO
