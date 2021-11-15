# BCE

This script offers better automatic face expression changes based on events in the club, such as arousal level and activities that show up in chat, both automatic and manual. Manual overrides are respected and retained, unless the manual override corresponds to the blank face.

## How to install and use

With Tampermonkey you can control when and if you want to update BCE, but Tampermonkey is only available for desktop browsers. The manual bookmark will always load the latest version. You can use different methods on different devices, but be mindful of using wildly different versions of BCE: some settings may reset.

### Autoload with Tampermonkey

1. Install Tampermonkey.
1. Open Tampermonkey's dashboard from its button top-right, and go to the Utilities on the right.
1. Paste `https://sidiousious.gitlab.io/bce/bce.user.js` into the "Install from URL" field, and click "Install". Tampermonkey should ask for a confirmation, and then the script will show up in its main view.
1. Reload your BC tab (F5, Ctrl-R), as changes to the script are only picked up on a page refresh.
   Then go to the preferences screen and click onto "BCE Settings" to enable (or disable) components you wish to use.

### Manual bookmark

1. Save `javascript:(() => { fetch('https://sidiousious.gitlab.io/bce/bce.user.js').then(r=>r.text()).then(r=>eval(r)); })();` as a bookmark on your devices.
1. Use the bookmark with the club open, if used on the login page you should see the "SAVE (BCE)" button appear:

- Desktop: use from your bookmarks menu
- Android (Chrome): search for your bookmark in the navigation bar, _not in the bookmarks menu_!
- Others: this should work in any browser that supports the club and [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).

## Features

At a glance:

- Improved automatic facial expressions that play nice with manual control
- Automatic relogin after disconnect
- [BCX](https://github.com/Jomshir98/bondage-club-extended) loader for both stable and devel
- Clickable links and embedded images from trusted websites in chat (e.g. imgur, Discord)
- Lockpicking helper
- Convenient chat commands, such as `/w <name> <message>` to whisper another player
- Full wardrobe in chatrooms (preview before saving/loading).
- Anti-garble for gagspeak and deafening
- Anti-anti-garble for your own speech: prevent others from understanding you with anti-garbling solutions while gagged

### Automatic relogin

BCE can automatically enter your password, when you lose connection to the game. You can enable this by choosing to save your login after entering your details, but before clicking login, by clicking on the "Save (BCE)" button. You can then populate the login by pressing the name on the left for future logins, and remove it there, also disabling the auto-relogin. **Warning**: this does store your password in plaintext in your local storage, where malicious scripts could theoretically read it.

### Layer-priority editor and ability to loosen/tighten restraints

BCE allows manual editing of an asset's priority — the value the game uses to decide what item shows over others — as well as the difficulty to struggle out of a restraint. When you select an item, you should see either:

- a number field and a validate button at the top-right for clothing,
- two white boxes at bottom-left for restraints: one will open the option to modify layer priority while the other allows loosening/tightening restraints.

This allow manually overriding the assets' relative positioning, giving better flexibility when doing outfits, or slapping restraints. Note that there's no way to reset the priority to its default value, so you have to take note of it or take it off and put it on again.

**Note**: the difficulty modification is technically cheating and should be used for roleplay purposes only. This does also allow struggling out of items you are not supposed to remove, such as a slave collar. Both of these features can be used to break the game, so use them responsibly. The main intent here is along the lines of choosing whether a shirt goes on top of your pants or vice-versa, or modifying the tightness of a rope tie without having to remove it, modify your bondage skill, and re-apply.

### Expanded wardrobe slots

Double your wardrobe size to 48 slots at the press of a button. **Warning**: this is currently not persistent and you will likely lose outfits 25-48 on next login.

### Customizable automated expressions

BCE has an expression animator that replaces the game's default animator. It uses both the arousal meter, and messages posted in chat, and respects manual changes you make to your face (not overriding them every 2 seconds like the game's own face animator).

Yield control of manual expressions back to the automator by using the chat command `/r`, or you can choose which part of your face to give back e.g. `/r eyes`.

#### Arousal expressions

Arousal-based expressions are just that: your facial expression will change depending on changes to your arousal. This is compatible with both manual and automatic arousal meter. For customization refer to the comments in the example script `bce-custom-expressions-example.user.js`, which you can separately install via Tampermonkey. Advanced users can host their own bookmarklet for it.

#### Event-driven expressions

Messages in chat can trigger animations on your face. These can vary from the (click actions) to \*roleplayed /me\* messages.

#### Expression cheatsheet

This is for the purposes of customizing `bce-custom-expressions-example.user.js`. The lists are in the same order as the menu in the game for the purposes of knowing which is which.

```js
  Eyes: [
    "Closed",
    "Dazed",
    "Shy",
    "Sad",
    "Horny",
    "Lewd",
    "VeryLewd",
    "Heart",
    "HeartPink",
    "LewdHeart",
    "LewdHeartPink",
    "Dizzy",
    "Daydream",
    "ShylyHappy",
    "Angry",
    "Surprised",
    "Scared",
  ],
  Eyes2: [], // Same as Eyes above
  Mouth: [
    "Frown",
    "Sad",
    "Pained",
    "Angry",
    "HalfOpen",
    "Open",
    "Ahegao",
    "Moan",
    "TonguePinch",
    "LipBite",
    "Happy",
    "Devious",
    "Laughing",
    "Grin",
    "Smirk",
    "Pout",
  ],
  Blush: ["Low", "Medium", "High", "VeryHigh", "Extreme", "ShortBreath"],
  Fluids: [
    "DroolLow",
    "DroolMedium",
    "DroolHigh",
    "DroolSides",
    "DroolMessy",
    "DroolTearsLow",
    "DroolTearsMedium",
    "DroolTearsHigh",
    "DroolTearsMessy",
    "DroolTearsSides",
    "TearsHigh",
    "TearsMedium",
    "TearsLow",
  ],
  Emoticon: [
    "Afk",
    "Whisper",
    "Sleep",
    "Hearts",
    "Tear",
    "Hearing",
    "Confusion",
    "Exclamation",
    "Annoyed",
    "Read",
    "RaisedHand",
    "Spectator",
    "ThumbsDown",
    "ThumbsUp",
    "LoveRope",
    "LoveGag",
    "LoveLock",
    "Wardrobe",
    "Gaming",
  ],
  Eyebrows: ["Raised", "Lowered", "OneRaised", "Harsh", "Angry", "Soft"],
```
