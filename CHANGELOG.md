# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [master]

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
