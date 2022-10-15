/* eslint-disable max-nested-callbacks */
/* eslint-disable array-callback-return */
/* eslint-disable no-sparse-arrays */
import assert from 'assert';
import lodashStable from 'lodash';
import { identity, falsey, stubArray, document } from '../const';
import itools from '../itools';

describe('map', function () {
  let array = [1, 2];

  it('should map values in `collection` to a new array', function () {
    let object = { a: 1, b: 2 };
    let expected = ['1', '2'];

    assert.deepStrictEqual(itools.map(array, String), expected);
    assert.deepStrictEqual(itools.map(object, String), expected);
  });

  it('should iterate over own string keyed properties of objects', function () {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    let actual = itools.map(new Foo(), identity);
    assert.deepStrictEqual(actual, [1]);
  });

  it('should accept a falsey `collection`', function () {
    let expected = lodashStable.map(falsey, stubArray);

    let actual = lodashStable.map(falsey, function (collection, index) {
      try {
        return index ? itools.map(collection) : itools.map();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should treat number values for `collection` as empty', function () {
    assert.deepStrictEqual(itools.map(1), []);
  });

  it('should treat a nodelist as an array-like object', function () {
    if (document) {
      let actual = itools.map(
        document.getElementsByTagName('body'),
        function (element) {
          return element.nodeName.toLowerCase();
        }
      );

      assert.deepStrictEqual(actual, ['body']);
    }
  });

  it('should work with objects with non-number length properties', function () {
    let value = { value: 'x' };
    let object = { length: { value: 'x' } };

    assert.deepStrictEqual(itools.map(object, identity), [value]);
  });
});
