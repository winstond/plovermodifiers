# plovermodifiers
Plover modifiers using # key

## Usage
1. Download the files in this repo (specifical generator.html and generator.js) to an empty folder.  
2. Open generator.html in your browser.
3. Select "Plover" or "Phoenix" for your theory.
(Note: All this does is change two letters, AOEU for I and SWR for Z)
4. Click "Generate Dictionaries.
5. Understanding the output.
    * There are "single stroke", and "two stroke" outputs.  As expected one defines everything as a single stroke (so Ctrl+Shift+A would be one stroke for example), the other set defines everything as two strokes (so Ctrl+Shift+A would be two strokes).  As mentioned the two stroke option reduces the likelihood of conflicts with the default way of stroking numbers in Plover.
    * For both sets, there are "real" and "practice" dictionary outputs.  When "real" is used in Plover it will actually execute the modifiers (so pressing the stroke for Ctrl+Shift+A will actually send that to the operating system).  When "practice" is used it will just output the modifiers as text (so pressing the stroke for Ctrl+Shift+A will simply output the text "#Control_L(Shift_L(a))").  Use this to practice the strokes you want to use.
    * For each there is a StenoJig translations file if you use Stenojig.  When used with Stenojig properly you can create Stenojig practice exercises for your favorite shortcuts.
    * StenoJig All Exercise outputs one massive Stenojig exercise with ALL the shortcuts (there are many!).
    
## What is included?
* Modifiers: Ctrl, Shift, Alt, Super (aka Win key on Windows)
* All letters: (however note that {#letter} is used, necessary when using ALT to activates menus and doesn't go to the undo buffer)
* Digits: from 1 to 12 (but not using the typical Plover number scheme)
* Function Keys: F1 to F12
* Special keys: like Enter, Escape, Backspace, Delete, Slash, Backslash, - (minus), + (plus), Insert, Delete, Home, End, Page Up, Page Down, Up/Down/Left/Right arrow, \{ (braces), [ (brackets), | (pipe), tab, ~/` (tilde/backtick/accent grave)

## Why
I currently use a number system that does not use the # key to stroke numbers.  Therefore, I decided to use the # key to create much simpler modifiers for efficient OS navigation.

## Concerns
If you use the "normal" number system in Plover or Nimble Numbers, the single stroke dictionary will be virtually unusable.  However, the two stroke dictionary should word with minimal conflicts.  Note however I have not thoroughly tested this yet.
