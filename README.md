TODO:
2. Add config file and put retention rate into it
3. Failed to complete indicates a fundamental lack of understanding about
a particular algorithm.
- Log changes to mastery/submastery of an algorithm after review
9. Check app RAM usage


let entry = {
  name: 'Shortest Path',
  lastStudied: 'Tue Dec 25 2018 22:54:21',
  nextScheduled: 'Wed Dec 26 2018 22:54:21',
  mastery: 2,
  subMastery: 3
};

Advance mastery when submastery >= 4
[1] Easy: +3 submastery
[2] Medium: +2 submastery
[3] Hard: +1 submastery
[4] Buggy Solution: +0 submastery
[5] Failed to Complete: Reset to 0 mastery and 0 submastery 

mastery 0: every 1 day
mastery 1: every 2.5 days
mastery 2: every 4 days
mastery 3: every 5.5 days
mastery 4: every 7 days
mastery 5: every 8.5 days
