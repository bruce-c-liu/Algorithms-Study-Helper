const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('SIGINT', () => {
  process.kill(process.pid, 'SIGINT');
});

// Read entries into memory
let entries = JSON.parse(fs.readFileSync('entries.json', 'utf8') || '[]');

let entriesDue = 0;
// Find how many entries are due.
function findEntriesDue () {
  let now = Date.now();
  for (let i = entries.length - 1 - entriesDue; i >= 0; i--) {
    if (entries[i].nextScheduled > now) {
      break;
    }
    entriesDue++;
  }

  return entriesDue;
}

function prompt () {
  const PROMPT =
`==================================================================================
[1] Review (${findEntriesDue()} of ${entries.length} Due) | [2] Add Entry | [3] Show Schedule | [4] Exit
> `;

  rl.question(PROMPT, (answer) => {
    switch (answer) {
      case '1': review(); break;
      case '2': promptAndAddEntry(); break;
      case '3': printSchedule(); prompt(); break;
      case '4': process.exit(0);
      default:
        console.log('That is not a valid option. Please enter a number.');
        prompt();
    }
  });
}

function promptAndAddEntry () {
  rl.question('What is the entry name?\n> ', (answer) => {
    let entry = {
      name: answer,
      lastStudied: 'Never',
      nextScheduled: Date.now(),
      mastery: 0,
      subMastery: 0
    };

    addEntry(entry);
    entriesDue++;
    prompt();
  });
}

// Inserts entry into schedule based on nextScheduled property
function addEntry (entry) {
  if (entries.length === 0) {
    entries.push(entry);
  } else {
    for (var i = entries.length - 1; i >= 0; i--) {
      if (entries[i].nextScheduled > entry.nextScheduled) {
        break;
      }
    }
    entries.splice(i + 1, 0, entry);
  }
}

const ONE_DAY_IN_MILLISECONDS = 86400000; // 1000*60*60*24

// Higher retention rate = longer interval between studying algorithms
const RETENTION_RATE = 1.5;

const QUESTION =
`How difficult was it?
[1] Easy | [2] Medium | [3] Hard | [4] Buggy Solution | [5] Failed to Complete
> `;

function review () {
  if (entries.length === 0) {
    console.log('You have no algorithms in your library. Please add an entry.');
    prompt();
  } else {
    let entry = entries[entries.length - 1];

    if (entry.nextScheduled <= Date.now()) {
      console.log('==================================================================================');
      console.log(`Implement the following: [${entry.name}].`);
      rl.question(QUESTION, (answer) => {
        let subMasteryPoints = 0;

        switch (answer) {
          case '1': subMasteryPoints = 3; break;
          case '2': subMasteryPoints = 2; break;
          case '3': subMasteryPoints = 1; break;
          case '4': subMasteryPoints = 0; break;
          case '5':
            entry.mastery = 0;
            entry.subMastery = 0;
            break;
          default:
            console.log('That is not a valid option. Please enter a number.');
            review();
            return;
        }

        entry.subMastery += subMasteryPoints;
        if (entry.subMastery >= 4) {
          entry.subMastery -= 4;
          if (entry.mastery < 5) {
            entry.mastery += 1;
          }
        }
        entry.lastStudied = Date.now();
        entry.nextScheduled = Date.now() + ONE_DAY_IN_MILLISECONDS * (entry.mastery * RETENTION_RATE + 1);

        entries.pop();
        entriesDue--;
        addEntry(entry);

        prompt();
      });
    } else {
      console.log('You have finished reviewing all scheduled algorithms.\nGood job! Come back later. :)');
      prompt();
    }
  }
}

const NUM_ENTRIES_TO_DISPLAY = 10;
function printSchedule () {
  if (entries.length === 0) {
    console.log('You have no algorithms in your library. Please add some.');
  } else {
    let tempLastStudied;
    let tempNextScheduled;

    let i = entries.length >= NUM_ENTRIES_TO_DISPLAY ? entries.length - NUM_ENTRIES_TO_DISPLAY : 0;
    for (; i < entries.length; i++) {
      let entry = entries[i];
      tempLastStudied = entry.lastStudied;
      tempNextScheduled = entry.nextScheduled;
      entry.lastStudied = entry.lastStudied === 'Never' ? 'Never' : new Date(entry.lastStudied).toString();
      entry.nextScheduled = new Date(entry.nextScheduled).toString();
      console.log(entry);
      entry.lastStudied = tempLastStudied;
      entry.nextScheduled = tempNextScheduled;
    }

    console.log('Showing next 10 scheduled entries.\nEntry with closest next scheduled date is at the bottom.');
  }
}

// Advance mastery when submastery >= 4
// failed to complete: Drop back to mastery 0
// Buggy solution: Add 0 to sub-mastery.
// Hard: Add 1 to sub-mastery.
// Medium: Add 2 to sub-mastery.
// Easy: Add 3 to sub-mastery.

// mastery 0: every 1 day
// mastery 1: every 2.5 days
// mastery 2: every 4 days
// mastery 3: every 5.5 days
// mastery 4: every 7 days
// mastery 5: every 8.5 days

module.exports = {
  prompt: prompt,
  entries: entries
};
