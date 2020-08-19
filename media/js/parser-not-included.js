(function () {
  
//   undum.game.init = function(ch, sys) {
//     ch.sandbox.visitCount = {};
//   };

  function situationState(ch, id) {
    if (!ch.sandbox[id]) {
      ch.sandbox[id] = {
        visitCount: 0              
      };
    }
    return ch.sandbox[id];
  }
  
  function situation(id, opts) {
    undum.game.situations[id] =
      new undum.Situation(
        Object.assign({}, opts, {
          enter: (ch, sys, from) => {            
            let state = situationState(ch, id);
            state.lastEnter = sys.time;
            opts.enter && opts.enter(ch, sys, from);
          },
          exit: (ch, sys, to) => {
            opts.exit && opts.exit(ch, sys, to);
            let state = situationState(ch, id);            
            state.visitCount++;
          }
        }));      
  }
  
  function visited(id, atLeast = 1, atMost = Number.MAX_VALUE) {
    return (ch, sys, sit) => {
      let state = situationState(ch, id);
      return state.visitCount >= atLeast && state.visitCount <= atMost;
    };
  }
  
  function once(id) {
    return visited(id, 0, 0);
  }

  function cooled(id, elapsed = 60) {
    return (ch, sys, sit) => {
      let state = situationState(ch, id);
      return !state.lastEnter || sys.time >= state.lastEnter + elapsed;
    }
  }

  function and(a, b) {
    return (ch, sys, sit) => {
      return a(ch, sys, sit) && b(ch, sys, sit);
    }
  }

  function or(a, b) {
    return (ch, sys, sit) => {
      return a(ch, sys, sit) || b(ch, sys, sit);
    }
  }
  
  function simple(id, desc, opts) {
    undum.game.situations[id] =
      new undum.SimpleSituation(
        desc, opts);
  }
  
  function action(id, opts) {
    situation(id, opts);
    
    undum.game.situations[id].choiceData = function(ch, sys, sit) {
        return {
          priority: this._priority,
          frequency: this._frequency,
          displayOrder: sys.rnd.randomInt(1, 100)
        }; 
      };
  }
      
  window.pni = {
    situation: situation,
    simple: simple,
    action: action,
    visited: visited,
    once: once,
    cooled: cooled,
    and: and,
    or: or
  }
})();