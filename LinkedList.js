function Node (val = null, next = null, prev = null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
}

// Doubly Linked list with dummy head and tail
function LinkedList (fromArray = null) {
  this.dHead = new Node();
  this.dTail = new Node();
  this.dHead.next = this.dTail;
  this.dTail.prev = this.dHead;

  if (fromArray != null) {
    fromArray.forEach((entry) => {
      this.append(entry);
    });
  }
}

LinkedList.prototype.getHead = function () {
  if (this.dHead.next !== this.dTail) {
    return this.dHead.next;
  } else {
    return null;
  }
};

LinkedList.prototype.removeHead = function () {
  if (this.dHead.next !== this.dTail) {
    const head = this.dHead.next;
    this.dHead.next = head.next;
    head.next.prev = this.dHead;
  } else {
    return null;
  }
};

// Given a node, insert new node with val = val before it.
LinkedList.prototype.insertBefore = function (val, nextNode) {
  if (!nextNode || nextNode === this.dHead) {
    console.log('Cannot insert new node before provided nextNode.');
    return;
  }

  const node = new Node(val, nextNode, nextNode.prev);
  node.next.prev = node;
  node.prev.next = node;
};

// Add new node to head of list
LinkedList.prototype.prepend = function (val) {
  const node = new Node(val, this.dHead.next, this.dHead);
  node.next.prev = node;
  this.dHead.next = node;
};

// Add new node to tail of list
LinkedList.prototype.append = function (val) {
  const node = new Node(val, this.dTail, this.dTail.prev);
  node.prev.next = node;
  this.dTail.prev = node;
};

LinkedList.prototype.printList = function () {
  let node = this.getHead();
  if (!node) {
    console.log('entries.json is empty.');
    return;
  }

  let temp;
  while (node !== this.dTail) {
    temp = node.val.nextScheduled;
    node.val.nextScheduled = new Date(node.val.nextScheduled).toString();
    console.log(node.val);
    node.val.nextScheduled = temp;
    node = node.next;
  }
};

LinkedList.prototype.toArray = function () {
  let node = this.getHead();
  let arr = [];

  while (node && node !== this.dTail) {
    arr.push(node.val);
    node = node.next;
  }

  return arr;
};

module.exports = LinkedList;
