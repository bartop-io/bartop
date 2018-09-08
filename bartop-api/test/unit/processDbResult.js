const expect = require('chai').expect;
const processDbResult = require('../../src/utils/processDbResult');

describe('Util - Process DB Result', function() {
  it('throws a `not found` error if dbOp.skipped > 0', function(done) {
    const dbOpResult = {
      changes: [],
      deleted: 0,
      errors: 0,
      inserted: 0,
      replaced: 0,
      skipped: 1,
      unchanged: 0
    };
    const id = '05041995';
    const result = processDbResult(dbOpResult, id);
    expect(result.error).to.not.equal(undefined);
    expect(result.error.message).to.equal('Resource not found.');
    expect(result.error.id[0]).to.equal(id);
    done();
  });

  it('throws a `post-write` error if dbOp.errors > 0', function(done) {
    const fakeError = 'There was a error after writing data.';
    const dbOpResult = {
      changes: [],
      deleted: 0,
      errors: 1,
      first_error: fakeError, // eslint-disable-line camelcase
      inserted: 0,
      replaced: 0,
      skipped: 0,
      unchanged: 0
    };
    const result = processDbResult(dbOpResult);
    expect(result.error).to.not.equal(undefined);
    expect(result.error.message).to.equal('Something went wrong.');
    done();
  });

  it('throws a `internal db` error if everything is zero', function(done) {
    // this is a test purely for coverage, this 'if' branch should never be
    // triggered, i just included it to be safe rather than sorry
    const dbOpResult = {
      changes: [],
      deleted: 0,
      errors: 0,
      inserted: 0,
      replaced: 0,
      skipped: 0,
      unchanged: 0
    };
    const result = processDbResult(dbOpResult);
    expect(result.error).to.not.equal(undefined);
    expect(result.error.message).to.equal('Something went wrong.');
    done();
  });

  it('returns with changes if they were successfully made', function(done) {
    const dbOpResult = {
      changes: [{ new_val: { test: 'data' }, old_val: null }], // eslint-disable-line camelcase
      deleted: 0,
      errors: 0,
      inserted: 0,
      replaced: 1,
      skipped: 0,
      unchanged: 0
    };
    const result = processDbResult(dbOpResult);
    expect(result).to.be.an('object');
    expect(result.test).to.equal('data');
    done();
  });
});
