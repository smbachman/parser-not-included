undum.game.id = "e0b6ad04-e0a6-4be6-80ff-f5ea391809d3";
undum.game.version = "1.0";

undum.game.start = "the-cabin";

/*
undum.game.qualityGroups = {
  inventory: new undum.QualityGroup('Carrying', {priority:"0001"})
};

undum.game.qualities = {
  sunglasses: new undum.OnOffQuality("a pair of sunglasses (worn)", {priority:"0001", group: "inventory"}),
  nets: new undum.OnOffQuality(
    "some nets", {priority:"0002", group:'inventory'})
}

undum.game.init = function(character, system) {
    character.qualities.sunglasses = 1;
};
*/

pni.situation('the-cabin',
{
  enter: (ch, sys, from) => {
    sys.write(marked(
`<h1>The Cabin</h1>
    
<p class="lead">The front of the small cabin is entirely occupied with navigational instruments, a radar display, and radios for calling back to shore. Along each side runs a bench with faded blue vinyl cushions, which can be lifted to reveal the storage space underneath. A glass case against the wall contains several fishing rods.</p>

<p class="lead">Scratched windows offer a view of the surrounding bay, and there is a door south to the deck. A sign taped to one wall announces the menu of tours offered by the Yakutat Charter Boat Company.</p>

<p class="lead">The captain sits at the wheel, steering the boat and occasionally checking the radar readout.</p>`));
    sys.doLink('the-cabin-choices');
  }
});

pni.simple(`the-cabin-choices`,
marked(`<div class="transient text-center col-sm-6">
[Go south (to deck)](the-deck)
</div>`),
{ 
  choices: ['#the-cabin'],
  minChoices: 2,
  maxChoices: 3
});
  
pni.action('examine-the-captain',
{
  optionText: 'Examine the captain',
  tags: 'the-cabin',
  frequency: 20,
  enter: (ch, sys, from) => {
    sys.write(marked(
`The captain is wearing a baseball cap and carrying a silver key.`));
    sys.doLink('the-cabin-choices');
    ch.sandbox.sawCap = true;
  },
  canView: pni.cooled('examine-the-captain')
});

pni.action('ask-captain-for-key',
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
  },
  canView: pni.and(pni.cooled('ask-captain-for-key', 30), pni.visited('examine-the-captain'))
});

pni.action('examine-ball-cap',
{
  optionText: 'Examine the ball cap',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You examine the ball cap. It says, THE WORST DAY FISHING IS BETTER THAN THE BEST DAY WORKING.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.and(pni.cooled('examine-ball-cap'), pni.visited('examine-the-captain'))
});

pni.action('examine-radios',
{
  optionText: 'Examine the radios',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You examine the radios. With any luck you will not need to radio for help, but it is reassuring that these things are here.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.cooled('examine-radios')
});

pni.action('examine-instruments', 
{
  optionText: 'Examine the instruments',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You take a closer look at the navigational instruments; knowing what they do is the captain's job.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.cooled('examine-instruments')
});

pni.action('examine-radar',
{
  optionText: 'Examine the radar',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You look at the radar. Apparently it's necessary to avoid the larger icebergs.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.cooled('examine-radar')
});

pni.action('examine-windows',
{
  optionText: 'Examine the windows',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You examine the windows. They're a bit the worse for wear, but you can still get an impressive view of the glacier through them. There were whales earlier, but they're gone now.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.cooled('examine-windows')
});

pni.action('lift-cushions',
{
  optionText: 'Lift the cushions',
  tags: 'the-cabin',
  frequency: 40,
  enter: (ch, sys, from) => {
    sys.write(marked(
`You lift one of the blue vinyl cushions, revealing some nets and a Coke.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.once('lift-cushions')
});

pni.action('examine-nets',
{
  optionText: 'Examine the nets',
  tags: 'the-cabin',
  enter: (ch, sys, from) => {
    sys.write(marked(
`You look at the nets. They must have something to do with fish as well. Really, you're just here for the sights.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.and(pni.cooled('examine-nets'), pni.visited('lift-cushions'))
});

pni.action('take-nets',
{
  optionText: 'Take the nets',
  tags: 'the-cabin',
  frequency: 50,
  enter: (ch, sys, from) => {
    sys.write(marked(
`You take the nets.`));
    ch.sandbox.haveNets = true;
    //sys.setQuality('nets', 'on');
    sys.doLink('the-cabin-choices');
  },
  canView: pni.and(pni.visited('lift-cushions'), pni.once('take-nets'))
});

pni.action('take-coke',
{
  optionText: 'Take Coke',
  tags: 'the-cabin',
  frequency: 50,
  enter: (ch, sys, from) => {
    sys.write(marked(
`You take the coke.`));
    sys.doLink('the-cabin-choices');
  },
  canView: pni.and(pni.visited('lift-cushions'), pni.once('take-coke'))
});


pni.situation('the-deck',
{
  enter: (ch, sys, from) => {
    sys.write(marked(
`<h1>The Deck</h1>

<p class="lead">The whole back half of the boat is open, allowing you to view the surroundings without intervening windows -- if you can stand the cold.</p>

<p class="lead">A very heavy ice chest sits on the ground.</p>

<p class="lead">All around the boat bob chunks of glacier ice.</p>`));
    sys.doLink('the-deck-choices');
  }
});

pni.simple(`the-deck-choices`,
marked(`<center class="transient">
[Go north (to the Cabin)](the-cabin)
</center>`),
{ 
  choices: ['#the-deck'],
  minChoices: 3,
  maxChoices: 4
});

pni.action('take-ice',
{
  optionText: 'Take ice',
  tags: 'the-deck',
  frequency: 50,
  enter: (ch, sys, from) => {
    if (!ch.sandbox.haveNets) {
      sys.write(marked(
`You are having a hard time fishing out the ice with your bare hands.`));
    } else {
      sys.write(marked(
`You scoop up the ice with the net.`));
      ch.sandbox.haveIce = true;
    }
    sys.doLink('the-deck-choices');
  },
  canView: pni.and(
    pni.cooled('take-ice', 1), 
    (ch, sys, sit) => {
      return !ch.sandbox.haveIce;
    })
});
