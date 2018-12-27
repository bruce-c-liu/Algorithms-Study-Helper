# Algorithms Study Helper

TLDR: Automatic scheduler for studying algorithms!  
## Why?
I wrote this app to help me study for Leetcode-style interview questions. While some believe "memorizing" interview questions is not productive, I find that to be untrue. This is because with interview questions, it's never really "rote" memorization. It requires active thinking to recall the key insights of a solution. With more questions mastered in one's toolbox, new problems definitely become easier to solve. e.g. If you can readily implement MergeSort, divide and conquer type problems would require less mental overhead to crack.

However, while I was trying to study these questions, I noticed I was often either (1) wasting time redoing problems I've already mastered or (2) wasting time having to remaster an old problem that I'd forgotten the key insight to. This app solves that problem by acting as an automatic scheduler. 

"Why did you make this app when more mature solutions like [Anki](https://apps.ankiweb.net/) exist?"  
I did use Anki at first, but I had a difficult time coming up with settings that were suitable for studying interview type questions. 

## What?
Enter algorithms you want to study into Algorithms Study Helper, and the app will automatically schedule when you should study an algorithm next! As you successfully review an algorithm, it will be scheduled less and less frequently.

## How?
This part explains the algorithm I use to schedule when to study problems.  

**Disclaimer**: It is currently tweaked for my own retention/learning rate. Read on to customize it to your liking!

**Scheduling Algorithm**  
**RETENTION_RATE** = 1.5 (default)

**_nextScheduled_** =   
(current time when you studied it) + 24 hours * (**_mastery_** * RETENTION_RATE + 1)

Each problem you enter into the app is an entry. It is stored in entries.json. An entry looks like this:

```javascript
const entry = {
	"name": "dijkstra's shortest path algorithm",
	"lastStudied": "Tue Dec 25 2018 22:54:21",
	"nextScheduled": "Wed Dec 26 2018 22:54:21",
	"mastery": 0,
	"subMastery": 3
};
```
After you review a scheduled problem, you will be asked "How difficult was it?" Your answer affects the entry's **_subMastery_** and/or **_mastery_**.

1. Easy: **_subMastery_** + 3
2. Medium: **_subMastery_** + 2
3. Hard: **_subMastery_** + 1
4. Buggy Solution*: **_subMastery_** + 0
5. Failed to Complete: **_mastery_** and **_subMastery_** both reset to 0.

(*Personally, I choose this option even if there's a single bug in my solution, because I consider even array index off-by-one errors a lack of mastery.)

Once you reach **_subMastery_** 4 on an entry, you will gain 1 **_mastery_** (up to 5). **_subMastery_** is reset to 0 and excess points gained from your answer is carried over.

**EXAMPLE**: Given a completely new entry with **_subMastery_**: 0 and **_mastery_**: 0. Say your 3 study sessions look like the following:
1. You answer Medium. (**_subMastery_**: 2 and **_mastery_**: 0)  
   It will be scheduled again in 1 day.
2. You answer Hard. (**_subMastery_**: 3 and **_mastery_**: 0)  
   It will be scheduled again in 1 day.
3. You answer Easy. (**_subMastery_**: 2 and **_mastery_**: 1)  
   It will be scheduled again in 2.5 days.


## Installation

Navigate into Algorithms-Study-Helper and run:

```bash
npm install
```

## Usage
Simply follow the prompts. 

```bash
node index.js
```

## Modifying entries.json
Modify manually at your own risk! This file contains all your entries. The entries are in order of nextScheduled date. The file is overwritten when the app exits. Only modify entries.json while the app is not running or else it will be overwritten.

## Contributing
You're welcome to fork this repo or provide feedback by opening issues!