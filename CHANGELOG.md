# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [master]

## [0.0.30]
### Added
- add 'to', 'cc', 'recipients' and 'subject' conditions to filter rules (#80)

## [0.0.29]
### Added
- add JMap's filter feature #79 

## [0.0.28] - 2018-05-17
### Added
- add 'isForwarded' property to 'Message' #77

## [0.0.27] - 2018-03-12
### Added
- add 'quota' property to 'Mailbox' #74

## [0.0.26] - 2018-03-08
### Added
- add properties 'MDNSent' and 'MDNNotSent' to 'SetResponse' for read receipt notifications #72

### Changed
- main entry point is now located in dist folder.

## [0.0.25] - 2017-10-10
### Added
- Add 'namespace' and 'sharedWith' property to Mailbox. Fixes #69
- JSONBuilder.appendObject
- The ServerCapabilities model
- AuthAccess.accounts. #58
- AuthAccess.serverCapabilites. #58
- AuthAccess.mailCapabilities. #58

### Changed
- Migrate accounts + capabilities to new JMAP authentication spec. #58

## Removed
- The AccountCapabilities model

## [0.0.24] - 2017-26-09
### Added
- add required property blobId to Message. Fixes #65

## [0.0.23] - 2017-03-20
### Fixed
- The Message model was not creating EMailer instances for To, CC and BCC fields. #63

## [0.0.22] - 2017-03-10
### Added
- The AuthMethod model
- The TransportError class. #18
- The JmapError class. #18

### Changed
- Use the X-JMAP authentication scheme to construct the Authorization header. #44
- Data structures used during authentication procedure after changes to the JMAP spec. #44
- The AuthContinuation model
- Updated all development dependencies
- SetError instances are now JmapError instances
- Client.send now supports using an already available Outbox

## [0.0.20] - 2016-08-22
### Fixed
- Utils.fillURITemplate now correctly encode replaced values.

## [0.0.19] - 2016-07-21
### Added
- Added support for VacationResponse.isActivated. #53

### Changed
- Attachment.size now defaults to 0 (was: null). #54

## [0.0.18] - 2016-07-08
### Added
- Attachment.getSignedDownloadUrl. #50
- Transport.post 'raw' parameter
- Utils.appendQueryParameter

## [0.0.17] - 2016-07-06
### Changed
- Client.createMailbox now resolves with a Mailbox object

### Removed
- The CreateMailboxAck class.

## [0.0.16] - 2016-06-27
### Added
- Client.destroyMailboxes #47

## [0.0.15] - 2016-06-17
### Added
- Client.withAuthAccess
- The VacationResponse model. #45
- Client.getVacationResponse
- The SetResponse class
- Client.setVacationResponse

### Fixed
- New/changed JMAP endpoint properties in AuthAcces. #38

### Removed
- The MessagesSet class
- The MailboxesSet class

## [0.0.14] - 2016-05-19
### Added
- The AccountCapabilities class
- The MailCapabilities class
- Refactored Account capabilities to match the spec. #13
- Account.hasMail
- Account.hasCalendars
- Account.hasContacts

### Fixed
- Message.replyTo is now an array. #39

## [0.0.13] - 2016-02-24
### Fixed
- getMessages responses now filter messages without mailboxIds

## [0.0.12] - 2016-02-18
### Added
- Support multiple auth continue iterations #12
- Client.promiseProvider
- Client.send

## [0.0.11] - 2016-02-01
### Added
- Client.destroyMessages
- Thread.destroy
- Thread.setIsFlagged
- Thread.setIsUnread
- Thread.move
- Thread.moveToMailboxWithRole

## [0.0.10] - 2016-01-20
### Added
- Support updateMessage #23
- Add Client.updateMessage
- Add Message.update
- Add Message.setIsFlagged
- Add Message.setIsUnread
- Add Message.setIsAnswered

## [0.0.8] - 2016-01-18
### Added
- Support setMailboxes #20
- Add CreateMailboxAck class
- Add MailboxesSet class
- Add Client.setMailboxes
- Add Client.createMailbox
- Add Client.updateMailbox
- Add Client.destroyMailbox
- Add Mailbox.update
- Add Mailbox.destroy

## [0.0.7] - 2015-12-21
### Added
- Code style rules #9
- Client.destroyMessage and Message.destroy #14
- Password authentication method #8
- Coverage tools #3
- Add contribution detailled instructions

## [0.0.5] - 2015-11-02
### Added
- The OutboundMessage and CreateMessageAck classes
- The Client.saveAsDraft method
- The JSONBuilder class to serialize models

## [0.0.4] - 2015-10-16
### Added
- The Attachment class
- Client.withDownloadUrl
- Message.attachments
- Utils.fillURITemplate

## [0.0.3] - 2015-10-05
### Added
- The MessagesSet class
- Client.setMessages
- Client.moveMessage
- Message.move
- Utils.assertRequiredParameterIsArrayWithMinimumLength
- The MailboxRole class
- Client.getMailboxWithRole
- Message.moveToMailboxWithRole
- Client.authExternal
- The Constants class

## [0.0.2] - 2015-09-22
- First public release
