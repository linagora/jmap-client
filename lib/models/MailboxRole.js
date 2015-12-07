'use strict';

class MailboxRole {
  /**
   * The MailboxRole class is simply a holder for predefined JMAP mailbox roles.<br />
   * It exposes class constants for every predefined roles (trash, inbox, etc.)
   *
   * @constructor
   *
   * @param role {String} The JMAP mailbox role. This is exposed as the `value` property.
   *
   * @see http://jmap.io/spec.html#mailboxes
   */
  constructor(role) {
    this.value = role;
  }

  /**
   * Returns the class constant mapping to the given JMAP role, or {@link MailboxRole.UNKNOWN}
   * if the role is undefined, null or isn't a predefined role.
   *
   * @param role {String} The JMAP role to find the {@link MailboxRole} for.
   *
   * @return {MailboxRole}
   */
  static fromRole(role) {
    if (role) {
      for (let key in MailboxRole) {
        if (MailboxRole.hasOwnProperty(key) && MailboxRole[key].value === role) {
          return MailboxRole[key];
        }
      }
    }

    return MailboxRole.UNKNOWN;
  }
}

['inbox', 'archive', 'drafts', 'outbox', 'sent', 'trash', 'spam', 'templates'].forEach((role) => {
  MailboxRole[role.toUpperCase()] = new MailboxRole(role);
});
MailboxRole.UNKNOWN = new MailboxRole(null);

export default MailboxRole;
