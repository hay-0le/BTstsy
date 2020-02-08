var LRUCache = function (limit) {
  this._limit = limit || 25;
  this._cache = {};
  this._size = 0;

  this._orderList = [];
};

var Node = function (val, key) {
  this._val = val || null;
  this._key = key || null;
};

LRUCache.prototype.size = function () {
  return this._size;
};

LRUCache.prototype.promote = function (key) {
  //get index of key in the orderList array
  if (this._orderList.length === 0) {
    this._orderList.push(key);
    return;
  }

  let keyIdx = this._orderList.indexOf(key);
  if (keyIdx > -1) {
    this._orderList.splice(keyIdx, 1)
    this._orderList.unshift(key);
  } else {
    this._orderList.unshift(key)
  }
}

LRUCache.prototype.get = function (key) {
  //if key does not exist return null
  if (!this._cache[key]) return null;

  let node = this._cache[key];
  this.promote(key);
  return node._val;
}

LRUCache.prototype.set = function (key, val) {
  if (this._cache[key] === undefined) return null;
  //check if cache is at limit
  if (this._size >= this._limit) {
      this.delete();
  }

  //create new node
  let node = new Node(key, val);
  //add item to cache (over writing value if key already exists)
  this._cache[key] = node;
  //move to front of the list
  this.promote(key);
  this._size++;
}

LRUCache.prototype.delete = function () {
  //set variable removedItem to orderList.pop (removes from list)
  let removedItem = this._orderList.pop();
  console.log('deleting: ', removedItem)

  //Use removedItem to delete from cache
  delete this._cache[removedItem];
  this._size--;
}

module.exports = {
  LRUCache: LRUCache
}