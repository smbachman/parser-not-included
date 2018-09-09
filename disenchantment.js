undum.game.id = "e0b6ad04-e0a6-4be6-80ff-f5ea391809d3";
undum.game.version = "1.0";

undum.game.start = "the-cabin";

pni.situation(
  'the-cabin',
  {
    enter: (c, system, from) => {
      system.write(
`<h1>The Cabin</h1>
    
<p>The front of the small cabin is entirely occupied with navigational instruments, a radar display, and radios for calling back to shore. Along each side runs a bench with faded blue vinyl cushions, which can be lifted to reveal the storage space underneath. A glass case against the wall contains severalfishing rods.</p>

<p>Scratched windows offer a view of the surrounding bay, and there is a door south to the deck. A sign taped to one wall announces the menu of tours offered by the Yakutat Charter Boat Company.</p>`);
      system.doLink('the-cabin-choices');
    }
  });
  
pni.simple(
  'the-cabin-choices', ``, 
  {
    choices: ['#the-cabin']
  });
  
pni.situation('examine-radios',
  {
    enter: (character, system, from) => {
      system.write(
`<p>With any luck you 
will not need to radio
for help, but it is reassuring that 
these things are here.</p>`);
      character.sandbox.examinedRadios = true;
      system.doLink('the-cabin-choices');
    },
    canView: (character, sys, sit) => {
      return !character.sandbox.examinedRadios;
    },
    optionText: 'Examine the radios',
    tags: 'the-cabin'
  });

pni.situation('lift-compartment',
  {
    enter: (character, system, from) => {
      system.write(`<p>You lift one of the cushions and discover some nets and a coke in the storage compartment.</p>`);
      character.sandbox.liftedCushions = true;
      system.doLink('the-cabin-choices');
    },
    optionText: 'Lift the cushions',
    tags: 'the-cabin'
  });


