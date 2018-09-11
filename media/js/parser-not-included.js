(function () {
  function situation(id, opts) {
    undum.game.situations[id] =
      new undum.Situation(opts);
  }
  
  function simple(id, desc, opts) {
    undum.game.situations[id] =
      new undum.SimpleSituation(
        desc, opts);
  }
  
  function delayed(id, opts, delay = 60) {
    var lastEnter = -delay;
    situation(id,
      Object.assign({}, opts, {
        enter: (ch, sys, from) => {
          lastEnter = sys.time;
          opts.enter(ch, sys, from);
        },
        canView: (ch, sys, sit) => {
          return sys.time >= lastEnter + delay && (!opts.canView || opts.canView(ch, sys, sit));
        }
      }));
  }
      
  window.pni = {
    situation: situation,
    simple: simple,
    delayed: delayed
  }
})();