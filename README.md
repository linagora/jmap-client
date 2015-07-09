# JMAP-CLIENT

This repository provides a javascript lib to make requests against a JMAP server.

It allows to hide bothering things by using a more object oriented pattern like:

    var myMailboxes = new JMAP({transport: "xhr"})
       .connect({server: "https://myjmap.org"})
       .getMailboxes({user: "user@myjmap.org"})

## Documentation

TODO

## License

TODO
