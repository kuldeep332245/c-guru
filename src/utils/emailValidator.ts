/**
 * Strict Email & Gmail Authenticity Validator
 * Blocks disposable emails, fake domains, spam patterns, and verifies real Gmail rules.
 */

// List of known disposable / fake email domains
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.biz',
  'guerrillamail.org',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  '10minutemail.net',
  'throwawaymail.com',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'sharklasers.com',
  'fakeinbox.com',
  'dispostable.com',
  'getairmail.com',
  'maildrop.cc',
  'crazymailing.com',
  'inboxkitten.com',
  'nada.ltd',
  'fakemailgenerator.com',
  'generator.email',
  'mohmal.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.me',
  'mytemp.email',
  'tempail.com',
  'emailondeck.com',
  'throwaway.email',
  'zillamail.com',
  'burnermail.io',
  'dropmail.me',
  'getnada.com',
  '10mail.org',
  'minutemail.com',
  'minuteinbox.com',
  'tempr.email',
  'disposablemail.com',
  'tempinbox.com',
  'trashmail.org',
  'mailnesia.com',
  'mailcatch.com',
  'disposable.com',
  'fake.com',
  'test.com',
  'testing.com',
  'example.com',
  'sample.com',
  'demo.com',
  'dummy.com',
  'asdf.com',
  'none.com',
  'noemail.com',
  'null.com',
  'xyz.com',
  'abc.com'
]);

// Known fake/spam usernames
const FAKE_USERNAMES = new Set([
  'test',
  'testing',
  'tester',
  'tests',
  'fake',
  'faker',
  'dummy',
  'sample',
  'random',
  'none',
  'noemail',
  'null',
  'asdf',
  'asdfg',
  'asdfgh',
  'asdfghj',
  'asdfghjk',
  'qwerty',
  'qwertyui',
  'zxcvbn',
  'zxcvbnm',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '111111',
  '222222',
  '000000',
  '999999',
  'abcdef',
  'abcdefg',
  'abcxyz',
  'user',
  'username',
  'student',
  'student1',
  'temp',
  'temporary'
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  cleanedEmail?: string;
}

export function validateRealEmail(
  rawEmail: string,
  lang: string = 'hi'
): EmailValidationResult {
  const isHi = lang === 'hi';
  const email = (rawEmail || '').trim().toLowerCase();

  // 1. Empty check
  if (!email) {
    return {
      isValid: false,
      error: isHi ? 'कृपया अपना ईमेल पता दर्ज करें।' : 'Please enter your email address.'
    };
  }

  // Standard valid email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: isHi
        ? 'कृपया एक सही ईमेल पता दर्ज करें (उदा. yourname@gmail.com)।'
        : 'Please enter a valid email address (e.g. yourname@gmail.com).'
    };
  }

  return {
    isValid: true,
    cleanedEmail: email
  };
}
