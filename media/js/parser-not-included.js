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
    
  function room(id, desc, things) {
    situation(id,
      {
        enter: (character, system, from) => {
          system.write(marked(desc));
          system.doLink(`${id}-choices`);
        }
      });
      
    simple(`${id}-choices`, ``,
      { choices: `#${id}` });
    
    things.forEach(thing => {
      thing(`${id}`);
    });
  }

  function thing(thingId, actions) {
    return (scopeId) => {      
      for (const actionId in actions) {
        const action = actions[actionId];
        situation(`${actionId}-${thingId}`,
          {
            enter: (character, system, from) => {
              system.write(marked(action.message));
              system.doLink(`${scopeId}-choices`);
              performedAction(character, `${actionId}-${thingId}`);
            },
            canView: (character, system, situation) => {
              return (!action.once ||(action.once 
                && actionPerformedCount(character, `${actionId}-${thingId}`) < 1));
            },
            optionText: action.optionText,
            displayOrder: action.displayOrder,
            tags: `${scopeId}`
          });        
      }
    }
  }

  function person(thingId, actions) {
    return thing(thingId, actions);
  }

  function actionPerformedCount(character, id) {
    if (character.sandbox.actionPerformed && character.sandbox.actionPerformed[id]) {
      return character.sandbox.actionPerformed[id];
    } else {
      return 0;
    }
  }

  function performedAction(character, id) {
    if (!character.sandbox.actionPerformed) {
      character.sandbox.actionPerformed = {};
    }
    if (!character.sandbox.actionPerformed[id]) {
      character.sandbox.actionPerformed[id] = 0;
    }
    character.sandbox.actionPerformed[id]++;
  }

  function action(optionText, message) {
    return {
      optionText: optionText,
      message: message
    };
  }

  function onceAction(optionText, message)
  {
    return Object.assign({},
      action(optionText, message),
      { once: true });
  }
      
  window.pni = {
    situation: situation,
    simple: simple,
    room: room,
    thing: thing,
    person: person,
    action: action,
    onceAction: onceAction
  }
})();