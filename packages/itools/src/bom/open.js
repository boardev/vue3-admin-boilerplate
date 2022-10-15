import setStyle from './set_style';
import attr from './attr';
import trigger from '../behavior/trigger';
import g from './g';
import c from './c';

/**
 * open new url dont not blocked by browser
 */
const open = href => {
  let id = '_itools_open_proxy';
  let a = g(id) || c('a', id, '', id);
  setStyle(a, 'display', 'none');
  attr(a, 'href', href);
  attr(a, 'target', '_blank');
  if (!a.parentNode) document.body.appendChild(a);
  trigger(a, 'click', 'MouseEvents');
};

export default open;
