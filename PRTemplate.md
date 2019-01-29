# PR template

## Description:

This PR addresses issue #`<NUMBER>`.

_If relevant, include screenshots of the *before* state of the application/test suite/whatever, which demonstrates the issue needing to be fixed._

**Before:**

`![semantic description of "before" screenshot](link to screenshot hosted somewhere stable like imgur, etc)`

The changes made to the codebase in this PR:

* List the changes made
  * as specifically as possible.
* Assume that the reader
  * is not familiar with the entire codebase

```
Include relevant code snippets if applicable - do not paste in the entire PR's changes;
merely highlight some key changes if they are unusual or especially relevant.
```
**After:**

`![semantic description of "after" screenshot](link to screenshot hosted somewhere stable like imgur, etc)`

## Testing 

These changes affect the following tests:

`![Screenshot of test suite output](link to screenshot hosted somewhere stable like imgur, etc)`

As a result, issue #`<NUMBER>` was created to refactor those tests: `[Issue #<NUMBER>](link to the github/waffle/etc issue)`

_ALTERNATIVELY, if no tests are adversely affected:_

These changes did not affect the existing test suite.

`![Screenshot of unaffected "after" test suite output](link to screenshot hosted somewhere stable like imgur, etc)`

## Requests for review

Areas of concern:

* List areas you would like reviewers to focus on
* Ex: The function beginning on line 72 is not pure; would love to have suggestions for improvement
* This is your opportunity to solicit particular attention for areas of code you are concerned about
