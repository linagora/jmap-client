# How to contribute to JMAP-CLIENT ?

If you read this page, you're probably interested in contributing to the jmap-client library. That's awesome !

## Contributing code

jmap-client tries to respect state of the art javascript coding guidelines. Here are some tips to get started

### getting started

We use [GitHub](https://github.com/linagora/jmap-client) fork/pull request workflow to allow everyone to send patches to the project.

Once you cloned the repository, use npm to install the dependencies:
```javascript
npm install
```

You can then transpile the library and run the tests by using grunt:

```javascript
grunt
```

If you don't have grunt installed, use the following command:

```javascript
npm install -g grunt-cli
```

### philosophy

jmap-client has been built around two well known patterns: promises, and fluent interface.

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a pattern to deal with asynchronous code.
Instead of using callbacks, you return an object that represent the result of your async call, be it successful or not.
It's so widely used that it has been included in the EcmaScript 2015 specification, which is the specification of the JavaScript language itself.
The jmap-client library uses the promise implementation of your choice, we already provide [the EcmaScript 2015 Promise provider](https://github.com/linagora/jmap-client/blob/master/lib/promises/ES6PromiseProvider.js) and the [Q provider](https://github.com/linagora/jmap-client/blob/master/lib/promises/QPromiseProvider.js).

Fluent interface is a nice way of writing code: you can chain calls to different class methods. An example is worth a thousand words:

```javascript
new jmap.Client(<your Transport>, <your PromiseProvider>)
    .withAPIUrl('https://jmap.my.server.com')
    .withAuthenticationToken('YourAuthenticationToken')
    .getMailboxes()
    .then((mailboxes) => {
        // Do something with the list of mailboxes
    }, (err) => {
        // An error occured
    });
```

### Code formating and check

The jmap-client use the [AirBNB JavaScript style convention](https://github.com/airbnb/javascript), with some relaxed rules:

* we do not require new lines after block
* we do not require a trailing comma at the end of arrays & objects
* we allow declaration of multiple variables in a single "var" statement
* we do not require a new line before a line comment
* we do not enforce a special case for object properties

All those settings can be found in the [code style checker configuration file](./.jscsrc).

. We use [jshint](http://jshint.com/) static code analyser, and [jscs](http://jscs.info/) code style checker.

At any moment, you can see if your code validates by running

```javascript
grunt linters
```

### documentation

The jmap-client project uses [jsdoc](http://usejsdoc.org/) version 3 and up. When you change code, please make sure to write or modify the related documentation, and make sure that the documentation displays nicely. We need a 100% coverage on public API documentation.
At any moment, you can run

```javascript
grunt apidoc
```

to generate the documentation. Please note that the documentation is not commited in the repository.

### tests

Tests are a super-important thing for the project developers.
If you ever contribute code to the jmap-client library, please make sure you also provide the associated tests, with 100% coverage on your code.
Tests is what ensure that the library will rock on the long run, and that many developers can work together on the same codebase.

Thanks to the wonderfull abilities of the node.js ecosystem, we are able to have the same tests for the backend (read: node.js) and the frontend (browsers).
You'll find all the tests in the [test/common](https://github.com/linagora/jmap-client/tree/master/test/common) folder.
Tests specific to the frontend are located in [test/frontend](https://github.com/linagora/jmap-client/tree/master/test/frontend),
and backend specifics... [you guessed it](https://github.com/linagora/jmap-client/tree/master/test/frontend).

You can run tests at any moment in your development process by using the grunt command:
```javascript
grunt
```

### Fill the change log

The last step!

Please before to open your pull-request, write in the CHANGELOG.md file a line explaining briefly your changes under the 'master' section.

    ## [master]
    ### Added
    - What I did #GITHUB_ISSUE
