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
    
  function room(id, desc, opts) {
    simple(id, desc, 
      Object.assign(
        {}, 
        opts, 
        {
          choices: [`#${id}`]
        }));
  }
      
  window.pni = {
    situation: situation,
    simple: simple,
    room: room
  }
})();