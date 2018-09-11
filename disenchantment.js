undum.game.id = "e0b6ad04-e0a6-4be6-80ff-f5ea391809d3";
undum.game.version = "1.0";

undum.game.start = "the-cabin";

pni.situation('the-cabin',
{
  enter: (ch, sys, from) => {
    sys.write(marked(
`# The Cabin
    
The front of the small cabin is entirely occupied with navigational instruments, a radar display, and radios for calling back to shore. Along each side runs a bench with faded blue vinyl cushions, which can be lifted to reveal the storage space underneath. A glass case against the wall contains several fishing rods.

Scratched windows offer a view of the surrounding bay, and there is a door south to the deck. A sign taped to one wall announces the menu of tours offered by the Yakutat Charter Boat Company.

The captain sits at the wheel, steering the boat and occasionally checking the radar readout.`));
    sys.doLink('the-cabin-choices');
  }
});

pni.simple(`the-cabin-choices`, '',
{ 
  choices: ['#the-cabin'],
  minChoices: 3,
  maxChoices: 5
});
  
pni.delayed('examine-the-captain',
{
  optionText: 'Examine the captain',
  tags: 'the-cabin',
  frequency: 20,
  enter: (ch, sys, from) => {
    sys.write(marked(
`The captain is wearing a baseball cap and carrying a silver key.`));
    sys.doLink('the-cabin-choices');
    ch.sandbox.sawKey = true;
    ch.sandbox.sawCap = true;
  }
});

pni.situation('ask-captain-for-key',
{
  optionText: 
    'Ask the captain for the key',
  tags: 'the-cabin',
  frequency: 50,
  enter: (ch, sys, from) => {
    sys.write(marked(
`"Captain, can I have that key?" you ask.

"Sure, you can -- well, get me a drink first, would you?"`));
    sys.doLink('the-cabin-choices');
    ch.sandbox.sawKey = true;
  },
  canView: (ch, sys, sit) => {
    return ch.sandbox.sawKey;
  }
});

pni.delayed('examine-ball-cap',
{
  optionText: 'Examine the ball cap',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You examine the ball cap. It says, THE WORST DAY FISHING IS BETTER THAN THE BEST DAY WORKING.`));
    sys.doLink('the-cabin-choices');
  },
  canView: (ch, sys, sit) => {
    return ch.sandbox.sawCap;
  }
});

pni.delayed('examine-radios',
{
  optionText: 'Examine the radios',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You examine the radios. With any luck you will not need to radio for help, but it is reassuring that these things are here.`));
    sys.doLink('the-cabin-choices');
  }
});

pni.delayed('examine-instruments', 
{
  optionText: 'Examine the instruments',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You take a closer look at the navigational instruments; knowing what they do is the captain's job.`));
    sys.doLink('the-cabin-choices');
  }
});

pni.delayed('examine-radar-screen',
{
  optionText: 'Examine the radar',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You look at the radar. Phantom lights move across the screen.`));
    sys.doLink('the-cabin-choices');
  }
});

