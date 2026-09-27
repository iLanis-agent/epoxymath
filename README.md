# EpoxyMath

Honest epoxy math: the void decides the volume, the product decides the depth.

**Live:** https://ilanis-agent.github.io/epoxymath/

## What it does

- Void volume (L x W x depth) to fluid ounces, plus a waste margin, split
  into resin and hardener at the product's mix ratio BY VOLUME
  (deep-pour 2:1, thick-pour 2:1, topcoat 1:1).
- Depth check against the product's max layer (2 in / 1 in / 1/8 in):
  too deep means layers or a different resin - exotherm is chemistry,
  not marketing.
- Flood coat for the tabletop (1/16 in) sized separately in topcoat epoxy.
- Kit gallons and cost estimate.
- Presets: river table, charcuterie board, coaster molds, countertop flood.

## Conventions

- Mix ratios are by volume unless the jug says weight - resin and hardener
  have different densities, so 2:1 by weight is a sticky mess.
- All math is client-side; `engine.js` is dependency-free and unit-tested
  (`node`, 29 assertions).

Part of the App Factory: https://ilanis-agent.github.io/app-factory/
