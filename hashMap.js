function HashMap() {
  let tableSize = 16;
  let hashTable = new Array(tableSize);
  let keyCount = 0;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  function set(value) {
    const key = hash(value);
    const index = key % tableSize;
    const currentBucket = hashTable[index];

    // Key Found
    if (currentBucket) {
      // Key is the same change value out
      if (currentBucket.key === key) {
        currentBucket.value = value;
        // Key is different
      } else {
        while (currentBucket.next) {
          currentBucket = currentBucket.next;
        }
        currentBucket.next = { key, value, next: null };
        keyCount++;
      }
    } else {
      hashTable[index] = { key, value };
      keyCount++;
    }
  }

  function get(key) {
    const index = key % tableSize;
    const currentBucket = hashTable[index];
    if (currentBucket) {
      return currentBucket.value;
    } else {
      return null;
    }
  }

  function has(key) {
    const item = get(key);
    return item !== null;
  }

  function remove(key) {
    const index = key % tableSize;
    const currentBucket = hashTable[index];

    // Bucket Found, Find Item in list
    if (currentBucket != null) {
      // Set an upper bound on while loop
      let currentCount = 0;
      while (
        currentBucket.key != key &&
        currentBucket.next &&
        currentCount < 1000
      ) {
        currentCount++;
        currentBucket = currentBucket.next;
      }

      if (currentCount >= 1000) {
        console.log('Infinite Loop found');
        return false;
      }

      // If the key si the same then remove it
      if (currentBucket.key === key) {
        // This will break the chain, need to update the linked list to remove the item
        hashTable[index] = null;
        keyCount--;
        return true;
      }
      return false;
    }
    return false;
  }

  function length() {
    return keyCount;
  }

  function clear() {
    hashTable = new Array(tableSize);
    keyCount = 0;
  }

  function keys() {
    const keys = [];
    for (let i = 0; i < tableSize; i++) {
      let currentBucket = hashTable[i];
      if (currentBucket) {
        keys.push(currentBucket.key);
        while (currentBucket.next) {
          currentBucket = currentBucket.next;
          keys.push(currentBucket.key);
        }
      }
    }
    return keys;
  }

  function values() {
    const values = [];
    for (let i = 0; i < tableSize; i++) {
      let currentBucket = hashTable[i];
      if (currentBucket) {
        values.push(currentBucket.value);
        while (currentBucket.next) {
          currentBucket = currentBucket.next;
          values.push(currentBucket.value);
        }
      }
    }
    return values;
  }

  function entries() {
    const entries = [];
    for (let i = 0; i < tableSize; i++) {
      let currentBucket = hashTable[i];
      if (currentBucket) {
        entries.push([currentBucket.key, currentBucket.value]);
        while (currentBucket.next) {
          currentBucket = currentBucket.next;
          entries.push([currentBucket.key, currentBucket.value]);
        }
      }
    }
    return entries;
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

const hashMap = new HashMap();

hashMap.set('Made');
hashMap.set('By');
hashMap.set('Javan');
hashMap.set('Friedel');

console.log('Table Length ' + hashMap.length());

console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
