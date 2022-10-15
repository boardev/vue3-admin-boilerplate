import itools from '../itools';

describe('getStyle', () => {
  test('return getComputedStyle', function () {
    const button = document.createElement('button');
    button.innerText = 'click me';
    button.setAttribute('class', 'className');
    button.style['display'] = 'none';
    document.body.appendChild(button);

    expect(getComputedStyle(button)['display']).toEqual('none');
    expect(itools.getStyle(button, 'display')).toEqual('none');
  });
});
