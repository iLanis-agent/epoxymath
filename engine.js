/* EpoxyMath engine - honest epoxy math: mix by volume, respect the layer depth. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.EpoxyEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var IN3_PER_FLOZ = 1 / 0.554113;

  /* ratioResin:hardener parts by VOLUME (what the jug says). */
  var PRODUCTS = {
    deep:    { name: 'Deep-pour resin (2:1)', resinParts: 2, hardParts: 1, maxLayerIn: 2,    note: 'slow cure, low exotherm' },
    thick:   { name: 'Thick-pour resin (2:1)', resinParts: 2, hardParts: 1, maxLayerIn: 1,   note: 'general casting' },
    topcoat: { name: 'Tabletop / topcoat (1:1)', resinParts: 1, hardParts: 1, maxLayerIn: 0.125, note: 'flood coats only' }
  };

  function voidIn3(lenIn, widIn, depthIn) { return lenIn * widIn * depthIn; }
  function floz(in3) { return in3 / IN3_PER_FLOZ; }

  /* Always order extra: spills, drips up the mixing cup, and the level you thought you had. */
  function withWaste(volumeFloz, wastePct) { return volumeFloz * (1 + wastePct / 100); }

  function mixSplit(totalFloz, productKey) {
    var p = PRODUCTS[productKey];
    var parts = p.resinParts + p.hardParts;
    return {
      resin: Math.round(totalFloz * p.resinParts / parts * 100) / 100,
      hardener: Math.round(totalFloz * p.hardParts / parts * 100) / 100
    };
  }

  /* Layers needed at the product's max pour depth. */
  function layers(depthIn, productKey) {
    var p = PRODUCTS[productKey];
    return Math.max(1, Math.ceil(depthIn / p.maxLayerIn));
  }

  function fitsProduct(depthIn, productKey) {
    return depthIn <= PRODUCTS[productKey].maxLayerIn;
  }

  /* Flood coat over the tabletop itself, 1/16 inch. */
  function floodCoatFloz(lenIn, widIn) {
    return floz(lenIn * widIn * 0.0625);
  }

  function costDollars(totalFloz, pricePerGallon) {
    return Math.round(totalFloz / 128 * pricePerGallon * 100) / 100;
  }

  function kitGallons(totalFloz) { return Math.ceil(totalFloz / 128 * 100) / 100; }

  function r2(x) { return Math.round(x * 100) / 100; }

  return {
    PRODUCTS: PRODUCTS,
    voidIn3: voidIn3,
    floz: floz,
    withWaste: withWaste,
    mixSplit: mixSplit,
    layers: layers,
    fitsProduct: fitsProduct,
    floodCoatFloz: floodCoatFloz,
    costDollars: costDollars,
    kitGallons: kitGallons,
    r2: r2
  };
});
