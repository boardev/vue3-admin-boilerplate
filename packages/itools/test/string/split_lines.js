import itools from '../itools';

describe('splitLines', function () {
  it('should pass base example 1', function (done) {
    const before = 'This\nis a\nmultiline\nstring.\n';
    const after = ['This', 'is a', 'multiline', 'string.', ''];
    expect(itools.splitLines(before)).toEqual(after);
    done();
  });
});
