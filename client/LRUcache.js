var LRUCache = function (limit) {
  // A map of key -> LRUCacheItem
  this._items = {};

  // A list of LRUCacheItem.node
  this._ordering = new List();

  this._limit = limit || 10000;
  this._size = 0;

};

var LRUCacheItem = function (val, key) {

  this.val = val === undefined ? null : val;
  this.key = key === undefined ? null : key;
  this.node = null;

};

LRUCache.prototype.size = function () {

  return this._size;

};

LRUCache.prototype.get = function (key) {

  if (!(key in this._items)) { return null; }

  var item = this._items[key];
  this.promote(item);
  return item.val;
};

LRUCache.prototype.set = function (key, val) {
  var item;
  // Set an existing item
  if (key in this._items) {
    item = this._items[key];
    item.val = val;
    this.promote(item);

  // Set a new item
  } else {
    // Make space if necessary
    if (this.full()) { this.prune(); }
    this._size += 1;

    item = new LRUCacheItem(val, key);
    item.node = this._ordering.unshift(item);
    this._items[key] = item;
  }
  console.log("cached!")

};


LRUCache.prototype.full = function () {
  return this._size >= this._limit;
};

LRUCache.prototype.prune = function () {
  var oldest = this._ordering.pop();
  delete this._items[oldest.key];
  this._size = Math.max(0, this._size - 1);
};

LRUCache.prototype.promote = function (item) {
  this._ordering.moveToFront(item.node);
};

var List = function () {
  this.head = null;
  this.tail = null;
};

var ListNode = function (prev, val, next) {
  this.prev = prev || null;
  this.val = val;
  this.next = next || null;
};

// Insert at the head of the list.
List.prototype.unshift = function (val) {
  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = new ListNode(null, val, null);
  // Not empty list.
  } else {
    this.head = new ListNode(null, val, this.head);
    this.head.next.prev = this.head;
  }
  return this.head;
};

// Delete at the head of the list.
List.prototype.shift = function () {
  // Empty list
  if (this.head === null && this.tail === null) {
    return null;
  // Not empty list.
  } else {
    var head = this.head;
    this.head = this.head.next;
    head.delete();
    return head.val;
  }
};

// Insert at the end of the list.
List.prototype.push = function (val) {
  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = new ListNode(null, val, null);
  // Not empty list.
  } else {
    this.tail = new ListNode(this.tail, val, null);
    this.tail.prev.next = this.tail;
  }

  return this.tail;
};

// Delete at the end of the list.
List.prototype.pop = function () {
  // Empty list
  if (this.head === null && this.tail === null) {
    return null;
  // Not empty list.
  } else {
    var tail = this.tail;
    this.tail = this.tail.prev;
    tail.delete();
    return tail.val;
  }
};

// Move a node to the front of the List
List.prototype.moveToFront = function (node) {
  if (node === this.tail) {
    this.pop();
  } else if (node === this.head) {
    return;
  } else {
    node.delete();
  }

  node.prev = node.next = null;

  // Don't delegate to shift, since we want to keep the same
  // object.

  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = node;
  // At least one node.
  } else {
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }
};

// Move a node to the end of the List
List.prototype.moveToEnd = function (node) {
  if (node === this.head) {
    this.shift();
  } else if (node === this.tail) {
    return;
  } else {
    node.delete();
  }

  // Don't delegate to push, since we want to keep the same
  // object.

  node.prev = node.next = null;

  // Empty list
  if (this.head === null && this.tail === null) {
    this.head = this.tail = node;
  // At least one node.
  } else {
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
};

ListNode.prototype.delete = function () {
  if (this.prev) { this.prev.next = this.next; }
  if (this.next) { this.next.prev = this.prev; }
};


module.exports = {
  LRUCache: LRUCache
}