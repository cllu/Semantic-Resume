let expect = require('chai').expect;

import render from '../app/scripts/renderer';

describe('renderer', function () {

  it('render empty string', function () {
    expect(render('')).to.have.string('itemtype="http://schema.org/Person"');
  });

  it('render only title', function () {
    let text = render('# Chunliang Lyu');
    expect(text).to.have.string('<h1 itemprop="name">Chunliang Lyu</h1>');
  })
});
