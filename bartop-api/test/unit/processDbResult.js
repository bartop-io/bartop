const expect = require('chai').expect;
const processDbResult = require('../../src/utils/processDbResult');

describe('Util - Process DB Result', function() {
  it('returns with correct metadata if dbOp.unchanged > 0', function(done) {
    const dbOpResult = {
      changes: [],
      deleted: 0,
      errors: 0,
      inserted: 0,
      replaced: 0,
      skipped: 0,
      unchanged: 1
    };
    const result = processDbResult(dbOpResult);
    expect(result).to.be.an('object');
    expect(result.unchanged).to.equal(true);
    done();
  });

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
    let err = null;
    try {
      processDbResult(dbOpResult, id);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(null);
    expect(err.name).to.equal('ResourceNotFoundError');
    expect(err.message).to.equal(`Resource with ID:${id} does not exist.`);
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
    let err = null;
    try {
      processDbResult(dbOpResult);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(null);
    expect(err.name).to.equal('RethinkPostWriteError');
    expect(err.message).to.equal(fakeError);
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
    let err = null;
    try {
      processDbResult(dbOpResult);
    } catch (e) {
      err = e;
    }
    expect(err).to.not.equal(null);
    expect(err.name).to.equal('InternalDatabaseOperationError');
    expect(err.message).to.equal(JSON.stringify(dbOpResult, null, 2));
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
