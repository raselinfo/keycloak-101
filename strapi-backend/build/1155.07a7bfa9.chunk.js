(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[1155],{

/***/ 64060:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var get = __webpack_require__(98934);
function baseAt(object, paths) {
  var index = -1, length = paths.length, result = Array(length), skip = object == null;
  while (++index < length) {
    result[index] = skip ? void 0 : get(object, paths[index]);
  }
  return result;
}
module.exports = baseAt;


/***/ }),

/***/ 33812:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseAt = __webpack_require__(64060), flatRest = __webpack_require__(16065);
var at = flatRest(baseAt);
module.exports = at;


/***/ }),

/***/ 50185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const Yallist = __webpack_require__(76178);
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = { max: options };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    const max = this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  // resize the cache when the max changes.
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = /* @__PURE__ */ new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h) => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key))
      return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE])
    return false;
  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};
const trim = (self) => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};
const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self);
};
module.exports = LRUCache;


/***/ }),

/***/ 36294:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isSafari = exports.isFirefox = void 0;
var _jsUtilsJs = __webpack_require__(64799);
const isFirefox = (0, _jsUtilsJs).memoize(
  () => /firefox/i.test(navigator.userAgent)
);
exports.isFirefox = isFirefox;
const isSafari = (0, _jsUtilsJs).memoize(
  () => Boolean(window.safari)
);
exports.isSafari = isSafari;


/***/ }),

/***/ 81564:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _jsUtilsJs = __webpack_require__(64799);
class EnterLeaveCounter {
  enter(enteringNode) {
    const previousLength = this.entered.length;
    const isNodeEntered = (node) => this.isNodeInDocument(node) && (!node.contains || node.contains(enteringNode));
    this.entered = (0, _jsUtilsJs).union(this.entered.filter(isNodeEntered), [
      enteringNode
    ]);
    return previousLength === 0 && this.entered.length > 0;
  }
  leave(leavingNode) {
    const previousLength = this.entered.length;
    this.entered = (0, _jsUtilsJs).without(this.entered.filter(this.isNodeInDocument), leavingNode);
    return previousLength > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(isNodeInDocument) {
    this.entered = [];
    this.isNodeInDocument = isNodeInDocument;
  }
}
exports.EnterLeaveCounter = EnterLeaveCounter;


/***/ }),

/***/ 69456:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _enterLeaveCounterJs = __webpack_require__(81564);
var _offsetUtilsJs = __webpack_require__(36975);
var _indexJs = __webpack_require__(56635);
var NativeTypes = _interopRequireWildcard(__webpack_require__(20911));
var _optionsReaderJs = __webpack_require__(71169);
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}
class HTML5BackendImpl {
  /**
  * Generate profiling statistics for the HTML5Backend.
  */
  profile() {
    var ref, ref1;
    return {
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      sourceNodeOptions: this.sourceNodeOptions.size,
      sourceNodes: this.sourceNodes.size,
      dragStartSourceIds: ((ref = this.dragStartSourceIds) === null || ref === void 0 ? void 0 : ref.length) || 0,
      dropTargetIds: this.dropTargetIds.length,
      dragEnterTargetIds: this.dragEnterTargetIds.length,
      dragOverTargetIds: ((ref1 = this.dragOverTargetIds) === null || ref1 === void 0 ? void 0 : ref1.length) || 0
    };
  }
  // public for test
  get window() {
    return this.options.window;
  }
  get document() {
    return this.options.document;
  }
  /**
  * Get the root element to use for event subscriptions
  */
  get rootElement() {
    return this.options.rootElement;
  }
  setup() {
    const root = this.rootElement;
    if (root === void 0) {
      return;
    }
    if (root.__isReactDndBackendSetUp) {
      throw new Error("Cannot have two HTML5 backends at the same time.");
    }
    root.__isReactDndBackendSetUp = true;
    this.addEventListeners(root);
  }
  teardown() {
    const root = this.rootElement;
    if (root === void 0) {
      return;
    }
    root.__isReactDndBackendSetUp = false;
    this.removeEventListeners(this.rootElement);
    this.clearCurrentDragSourceNode();
    if (this.asyncEndDragFrameId) {
      var ref;
      (ref = this.window) === null || ref === void 0 ? void 0 : ref.cancelAnimationFrame(this.asyncEndDragFrameId);
    }
  }
  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodeOptions.set(sourceId, options);
    this.sourcePreviewNodes.set(sourceId, node);
    return () => {
      this.sourcePreviewNodes.delete(sourceId);
      this.sourcePreviewNodeOptions.delete(sourceId);
    };
  }
  connectDragSource(sourceId, node, options) {
    this.sourceNodes.set(sourceId, node);
    this.sourceNodeOptions.set(sourceId, options);
    const handleDragStart = (e) => this.handleDragStart(e, sourceId);
    const handleSelectStart = (e) => this.handleSelectStart(e);
    node.setAttribute("draggable", "true");
    node.addEventListener("dragstart", handleDragStart);
    node.addEventListener("selectstart", handleSelectStart);
    return () => {
      this.sourceNodes.delete(sourceId);
      this.sourceNodeOptions.delete(sourceId);
      node.removeEventListener("dragstart", handleDragStart);
      node.removeEventListener("selectstart", handleSelectStart);
      node.setAttribute("draggable", "false");
    };
  }
  connectDropTarget(targetId, node) {
    const handleDragEnter = (e) => this.handleDragEnter(e, targetId);
    const handleDragOver = (e) => this.handleDragOver(e, targetId);
    const handleDrop = (e) => this.handleDrop(e, targetId);
    node.addEventListener("dragenter", handleDragEnter);
    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("drop", handleDrop);
    return () => {
      node.removeEventListener("dragenter", handleDragEnter);
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("drop", handleDrop);
    };
  }
  addEventListeners(target) {
    if (!target.addEventListener) {
      return;
    }
    target.addEventListener("dragstart", this.handleTopDragStart);
    target.addEventListener("dragstart", this.handleTopDragStartCapture, true);
    target.addEventListener("dragend", this.handleTopDragEndCapture, true);
    target.addEventListener("dragenter", this.handleTopDragEnter);
    target.addEventListener("dragenter", this.handleTopDragEnterCapture, true);
    target.addEventListener("dragleave", this.handleTopDragLeaveCapture, true);
    target.addEventListener("dragover", this.handleTopDragOver);
    target.addEventListener("dragover", this.handleTopDragOverCapture, true);
    target.addEventListener("drop", this.handleTopDrop);
    target.addEventListener("drop", this.handleTopDropCapture, true);
  }
  removeEventListeners(target) {
    if (!target.removeEventListener) {
      return;
    }
    target.removeEventListener("dragstart", this.handleTopDragStart);
    target.removeEventListener("dragstart", this.handleTopDragStartCapture, true);
    target.removeEventListener("dragend", this.handleTopDragEndCapture, true);
    target.removeEventListener("dragenter", this.handleTopDragEnter);
    target.removeEventListener("dragenter", this.handleTopDragEnterCapture, true);
    target.removeEventListener("dragleave", this.handleTopDragLeaveCapture, true);
    target.removeEventListener("dragover", this.handleTopDragOver);
    target.removeEventListener("dragover", this.handleTopDragOverCapture, true);
    target.removeEventListener("drop", this.handleTopDrop);
    target.removeEventListener("drop", this.handleTopDropCapture, true);
  }
  getCurrentSourceNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourceNodeOptions = this.sourceNodeOptions.get(sourceId);
    return _objectSpread({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, sourceNodeOptions || {});
  }
  getCurrentDropEffect() {
    if (this.isDraggingNativeItem()) {
      return "copy";
    }
    return this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourcePreviewNodeOptions = this.sourcePreviewNodeOptions.get(sourceId);
    return _objectSpread({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: false
    }, sourcePreviewNodeOptions || {});
  }
  isDraggingNativeItem() {
    const itemType = this.monitor.getItemType();
    return Object.keys(NativeTypes).some(
      (key) => NativeTypes[key] === itemType
    );
  }
  beginDragNativeItem(type, dataTransfer) {
    this.clearCurrentDragSourceNode();
    this.currentNativeSource = (0, _indexJs).createNativeDragSource(type, dataTransfer);
    this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
    this.actions.beginDrag([
      this.currentNativeHandle
    ]);
  }
  setCurrentDragSourceNode(node) {
    this.clearCurrentDragSourceNode();
    this.currentDragSourceNode = node;
    const MOUSE_MOVE_TIMEOUT = 1e3;
    this.mouseMoveTimeoutTimer = setTimeout(() => {
      var ref;
      return (ref = this.rootElement) === null || ref === void 0 ? void 0 : ref.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
    }, MOUSE_MOVE_TIMEOUT);
  }
  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      if (this.rootElement) {
        var ref;
        (ref = this.window) === null || ref === void 0 ? void 0 : ref.clearTimeout(this.mouseMoveTimeoutTimer || void 0);
        this.rootElement.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
      }
      this.mouseMoveTimeoutTimer = null;
      return true;
    }
    return false;
  }
  handleDragStart(e, sourceId) {
    if (e.defaultPrevented) {
      return;
    }
    if (!this.dragStartSourceIds) {
      this.dragStartSourceIds = [];
    }
    this.dragStartSourceIds.unshift(sourceId);
  }
  handleDragEnter(_e, targetId) {
    this.dragEnterTargetIds.unshift(targetId);
  }
  handleDragOver(_e, targetId) {
    if (this.dragOverTargetIds === null) {
      this.dragOverTargetIds = [];
    }
    this.dragOverTargetIds.unshift(targetId);
  }
  handleDrop(_e, targetId) {
    this.dropTargetIds.unshift(targetId);
  }
  constructor(manager, globalContext, options) {
    this.sourcePreviewNodes = /* @__PURE__ */ new Map();
    this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map();
    this.sourceNodes = /* @__PURE__ */ new Map();
    this.sourceNodeOptions = /* @__PURE__ */ new Map();
    this.dragStartSourceIds = null;
    this.dropTargetIds = [];
    this.dragEnterTargetIds = [];
    this.currentNativeSource = null;
    this.currentNativeHandle = null;
    this.currentDragSourceNode = null;
    this.altKeyPressed = false;
    this.mouseMoveTimeoutTimer = null;
    this.asyncEndDragFrameId = null;
    this.dragOverTargetIds = null;
    this.lastClientOffset = null;
    this.hoverRafId = null;
    this.getSourceClientOffset = (sourceId) => {
      const source = this.sourceNodes.get(sourceId);
      return source && (0, _offsetUtilsJs).getNodeClientOffset(source) || null;
    };
    this.endDragNativeItem = () => {
      if (!this.isDraggingNativeItem()) {
        return;
      }
      this.actions.endDrag();
      if (this.currentNativeHandle) {
        this.registry.removeSource(this.currentNativeHandle);
      }
      this.currentNativeHandle = null;
      this.currentNativeSource = null;
    };
    this.isNodeInDocument = (node) => {
      return Boolean(node && this.document && this.document.body && this.document.body.contains(node));
    };
    this.endDragIfSourceWasRemovedFromDOM = () => {
      const node = this.currentDragSourceNode;
      if (node == null || this.isNodeInDocument(node)) {
        return;
      }
      if (this.clearCurrentDragSourceNode() && this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.scheduleHover = (dragOverTargetIds) => {
      if (this.hoverRafId === null && typeof requestAnimationFrame !== "undefined") {
        this.hoverRafId = requestAnimationFrame(() => {
          if (this.monitor.isDragging()) {
            this.actions.hover(dragOverTargetIds || [], {
              clientOffset: this.lastClientOffset
            });
          }
          this.hoverRafId = null;
        });
      }
    };
    this.cancelHover = () => {
      if (this.hoverRafId !== null && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(this.hoverRafId);
        this.hoverRafId = null;
      }
    };
    this.handleTopDragStartCapture = () => {
      this.clearCurrentDragSourceNode();
      this.dragStartSourceIds = [];
    };
    this.handleTopDragStart = (e) => {
      if (e.defaultPrevented) {
        return;
      }
      const { dragStartSourceIds } = this;
      this.dragStartSourceIds = null;
      const clientOffset = (0, _offsetUtilsJs).getEventClientOffset(e);
      if (this.monitor.isDragging()) {
        this.actions.endDrag();
        this.cancelHover();
      }
      this.actions.beginDrag(dragStartSourceIds || [], {
        publishSource: false,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset
      });
      const { dataTransfer } = e;
      const nativeType = (0, _indexJs).matchNativeItemType(dataTransfer);
      if (this.monitor.isDragging()) {
        if (dataTransfer && typeof dataTransfer.setDragImage === "function") {
          const sourceId = this.monitor.getSourceId();
          const sourceNode = this.sourceNodes.get(sourceId);
          const dragPreview = this.sourcePreviewNodes.get(sourceId) || sourceNode;
          if (dragPreview) {
            const { anchorX, anchorY, offsetX, offsetY } = this.getCurrentSourcePreviewNodeOptions();
            const anchorPoint = {
              anchorX,
              anchorY
            };
            const offsetPoint = {
              offsetX,
              offsetY
            };
            const dragPreviewOffset = (0, _offsetUtilsJs).getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint);
            dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
          }
        }
        try {
          dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setData("application/json", {});
        } catch (err) {
        }
        this.setCurrentDragSourceNode(e.target);
        const { captureDraggingState } = this.getCurrentSourcePreviewNodeOptions();
        if (!captureDraggingState) {
          setTimeout(
            () => this.actions.publishDragSource(),
            0
          );
        } else {
          this.actions.publishDragSource();
        }
      } else if (nativeType) {
        this.beginDragNativeItem(nativeType);
      } else if (dataTransfer && !dataTransfer.types && (e.target && !e.target.hasAttribute || !e.target.hasAttribute("draggable"))) {
        return;
      } else {
        e.preventDefault();
      }
    };
    this.handleTopDragEndCapture = () => {
      if (this.clearCurrentDragSourceNode() && this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.handleTopDragEnterCapture = (e) => {
      this.dragEnterTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e.dataTransfer);
      }
      const isFirstEnter = this.enterLeaveCounter.enter(e.target);
      if (!isFirstEnter || this.monitor.isDragging()) {
        return;
      }
      const { dataTransfer } = e;
      const nativeType = (0, _indexJs).matchNativeItemType(dataTransfer);
      if (nativeType) {
        this.beginDragNativeItem(nativeType, dataTransfer);
      }
    };
    this.handleTopDragEnter = (e) => {
      const { dragEnterTargetIds } = this;
      this.dragEnterTargetIds = [];
      if (!this.monitor.isDragging()) {
        return;
      }
      this.altKeyPressed = e.altKey;
      if (dragEnterTargetIds.length > 0) {
        this.actions.hover(dragEnterTargetIds, {
          clientOffset: (0, _offsetUtilsJs).getEventClientOffset(e)
        });
      }
      const canDrop = dragEnterTargetIds.some(
        (targetId) => this.monitor.canDropOnTarget(targetId)
      );
      if (canDrop) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = this.getCurrentDropEffect();
        }
      }
    };
    this.handleTopDragOverCapture = (e) => {
      this.dragOverTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e.dataTransfer);
      }
    };
    this.handleTopDragOver = (e) => {
      const { dragOverTargetIds } = this;
      this.dragOverTargetIds = [];
      if (!this.monitor.isDragging()) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "none";
        }
        return;
      }
      this.altKeyPressed = e.altKey;
      this.lastClientOffset = (0, _offsetUtilsJs).getEventClientOffset(e);
      this.scheduleHover(dragOverTargetIds);
      const canDrop = (dragOverTargetIds || []).some(
        (targetId) => this.monitor.canDropOnTarget(targetId)
      );
      if (canDrop) {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = this.getCurrentDropEffect();
        }
      } else if (this.isDraggingNativeItem()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "none";
        }
      }
    };
    this.handleTopDragLeaveCapture = (e) => {
      if (this.isDraggingNativeItem()) {
        e.preventDefault();
      }
      const isLastLeave = this.enterLeaveCounter.leave(e.target);
      if (!isLastLeave) {
        return;
      }
      if (this.isDraggingNativeItem()) {
        setTimeout(
          () => this.endDragNativeItem(),
          0
        );
      }
      this.cancelHover();
    };
    this.handleTopDropCapture = (e) => {
      this.dropTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        e.preventDefault();
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e.dataTransfer);
      } else if ((0, _indexJs).matchNativeItemType(e.dataTransfer)) {
        e.preventDefault();
      }
      this.enterLeaveCounter.reset();
    };
    this.handleTopDrop = (e) => {
      const { dropTargetIds } = this;
      this.dropTargetIds = [];
      this.actions.hover(dropTargetIds, {
        clientOffset: (0, _offsetUtilsJs).getEventClientOffset(e)
      });
      this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      });
      if (this.isDraggingNativeItem()) {
        this.endDragNativeItem();
      } else if (this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.handleSelectStart = (e) => {
      const target = e.target;
      if (typeof target.dragDrop !== "function") {
        return;
      }
      if (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      e.preventDefault();
      target.dragDrop();
    };
    this.options = new _optionsReaderJs.OptionsReader(globalContext, options);
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();
    this.enterLeaveCounter = new _enterLeaveCounterJs.EnterLeaveCounter(this.isNodeInDocument);
  }
}
exports.HTML5BackendImpl = HTML5BackendImpl;


/***/ }),

/***/ 82272:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
class MonotonicInterpolant {
  interpolate(x) {
    const { xs, ys, c1s, c2s, c3s } = this;
    let i = xs.length - 1;
    if (x === xs[i]) {
      return ys[i];
    }
    let low = 0;
    let high = c3s.length - 1;
    let mid;
    while (low <= high) {
      mid = Math.floor(0.5 * (low + high));
      const xHere = xs[mid];
      if (xHere < x) {
        low = mid + 1;
      } else if (xHere > x) {
        high = mid - 1;
      } else {
        return ys[mid];
      }
    }
    i = Math.max(0, high);
    const diff = x - xs[i];
    const diffSq = diff * diff;
    return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
  }
  constructor(xs, ys) {
    const { length } = xs;
    const indexes = [];
    for (let i = 0; i < length; i++) {
      indexes.push(i);
    }
    indexes.sort(
      (a, b) => xs[a] < xs[b] ? -1 : 1
    );
    const dys = [];
    const dxs = [];
    const ms = [];
    let dx;
    let dy;
    for (let i1 = 0; i1 < length - 1; i1++) {
      dx = xs[i1 + 1] - xs[i1];
      dy = ys[i1 + 1] - ys[i1];
      dxs.push(dx);
      dys.push(dy);
      ms.push(dy / dx);
    }
    const c1s = [
      ms[0]
    ];
    for (let i2 = 0; i2 < dxs.length - 1; i2++) {
      const m2 = ms[i2];
      const mNext = ms[i2 + 1];
      if (m2 * mNext <= 0) {
        c1s.push(0);
      } else {
        dx = dxs[i2];
        const dxNext = dxs[i2 + 1];
        const common = dx + dxNext;
        c1s.push(3 * common / ((common + dxNext) / m2 + (common + dx) / mNext));
      }
    }
    c1s.push(ms[ms.length - 1]);
    const c2s = [];
    const c3s = [];
    let m;
    for (let i3 = 0; i3 < c1s.length - 1; i3++) {
      m = ms[i3];
      const c1 = c1s[i3];
      const invDx = 1 / dxs[i3];
      const common = c1 + c1s[i3 + 1] - m - m;
      c2s.push((m - c1 - common) * invDx);
      c3s.push(common * invDx * invDx);
    }
    this.xs = xs;
    this.ys = ys;
    this.c1s = c1s;
    this.c2s = c2s;
    this.c3s = c3s;
  }
}
exports.MonotonicInterpolant = MonotonicInterpolant;


/***/ }),

/***/ 75679:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
class NativeDragSource {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((property) => {
      Object.defineProperty(this.item, property, {
        configurable: true,
        enumerable: true,
        get() {
          console.warn(`Browser doesn't allow reading "${property}" until the drop event.`);
          return null;
        }
      });
    });
  }
  loadDataTransfer(dataTransfer) {
    if (dataTransfer) {
      const newProperties = {};
      Object.keys(this.config.exposeProperties).forEach((property) => {
        const propertyFn = this.config.exposeProperties[property];
        if (propertyFn != null) {
          newProperties[property] = {
            value: propertyFn(dataTransfer, this.config.matchesTypes),
            configurable: true,
            enumerable: true
          };
        }
      });
      Object.defineProperties(this.item, newProperties);
    }
  }
  canDrag() {
    return true;
  }
  beginDrag() {
    return this.item;
  }
  isDragging(monitor, handle) {
    return handle === monitor.getSourceId();
  }
  endDrag() {
  }
  constructor(config) {
    this.config = config;
    this.item = {};
    this.initializeExposedProperties();
  }
}
exports.NativeDragSource = NativeDragSource;


/***/ }),

/***/ 28779:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getDataFromDataTransfer = getDataFromDataTransfer;
function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
  const result = typesToTry.reduce(
    (resultSoFar, typeToTry) => resultSoFar || dataTransfer.getData(typeToTry),
    ""
  );
  return result != null ? result : defaultValue;
}


/***/ }),

/***/ 56635:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createNativeDragSource = createNativeDragSource;
exports.matchNativeItemType = matchNativeItemType;
var _nativeTypesConfigJs = __webpack_require__(66420);
var _nativeDragSourceJs = __webpack_require__(75679);
function createNativeDragSource(type, dataTransfer) {
  const config = _nativeTypesConfigJs.nativeTypesConfig[type];
  if (!config) {
    throw new Error(`native type ${type} has no configuration`);
  }
  const result = new _nativeDragSourceJs.NativeDragSource(config);
  result.loadDataTransfer(dataTransfer);
  return result;
}
function matchNativeItemType(dataTransfer) {
  if (!dataTransfer) {
    return null;
  }
  const dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
  return Object.keys(_nativeTypesConfigJs.nativeTypesConfig).filter((nativeItemType) => {
    const typeConfig = _nativeTypesConfigJs.nativeTypesConfig[nativeItemType];
    if (!(typeConfig === null || typeConfig === void 0 ? void 0 : typeConfig.matchesTypes)) {
      return false;
    }
    return typeConfig.matchesTypes.some(
      (t) => dataTransferTypes.indexOf(t) > -1
    );
  })[0] || null;
}


/***/ }),

/***/ 66420:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.nativeTypesConfig = void 0;
var NativeTypes = _interopRequireWildcard(__webpack_require__(20911));
var _getDataFromDataTransferJs = __webpack_require__(28779);
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
const nativeTypesConfig = {
  [NativeTypes.FILE]: {
    exposeProperties: {
      files: (dataTransfer) => Array.prototype.slice.call(dataTransfer.files),
      items: (dataTransfer) => dataTransfer.items,
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Files"
    ]
  },
  [NativeTypes.HTML]: {
    exposeProperties: {
      html: (dataTransfer, matchesTypes) => (0, _getDataFromDataTransferJs).getDataFromDataTransfer(dataTransfer, matchesTypes, ""),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [NativeTypes.URL]: {
    exposeProperties: {
      urls: (dataTransfer, matchesTypes) => (0, _getDataFromDataTransferJs).getDataFromDataTransfer(dataTransfer, matchesTypes, "").split("\n"),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [NativeTypes.TEXT]: {
    exposeProperties: {
      text: (dataTransfer, matchesTypes) => (0, _getDataFromDataTransferJs).getDataFromDataTransfer(dataTransfer, matchesTypes, ""),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
exports.nativeTypesConfig = nativeTypesConfig;


/***/ }),

/***/ 20911:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HTML = exports.TEXT = exports.URL = exports.FILE = void 0;
const FILE = "__NATIVE_FILE__";
exports.FILE = FILE;
const URL = "__NATIVE_URL__";
exports.URL = URL;
const TEXT = "__NATIVE_TEXT__";
exports.TEXT = TEXT;
const HTML = "__NATIVE_HTML__";
exports.HTML = HTML;


/***/ }),

/***/ 36975:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getNodeClientOffset = getNodeClientOffset;
exports.getEventClientOffset = getEventClientOffset;
exports.getDragPreviewOffset = getDragPreviewOffset;
var _browserDetectorJs = __webpack_require__(36294);
var _monotonicInterpolantJs = __webpack_require__(82272);
const ELEMENT_NODE = 1;
function getNodeClientOffset(node) {
  const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;
  if (!el) {
    return null;
  }
  const { top, left } = el.getBoundingClientRect();
  return {
    x: left,
    y: top
  };
}
function getEventClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}
function isImageNode(node) {
  var ref;
  return node.nodeName === "IMG" && ((0, _browserDetectorJs).isFirefox() || !((ref = document.documentElement) === null || ref === void 0 ? void 0 : ref.contains(node)));
}
function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
  let dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  let dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;
  if ((0, _browserDetectorJs).isSafari() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  }
  return {
    dragPreviewWidth,
    dragPreviewHeight
  };
}
function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
  const isImage = isImageNode(dragPreview);
  const dragPreviewNode = isImage ? sourceNode : dragPreview;
  const dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
  const offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
  };
  const { offsetWidth: sourceWidth, offsetHeight: sourceHeight } = sourceNode;
  const { anchorX, anchorY } = anchorPoint;
  const { dragPreviewWidth, dragPreviewHeight } = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight);
  const calculateYOffset = () => {
    const interpolantY = new _monotonicInterpolantJs.MonotonicInterpolant([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      offsetFromDragPreview.y,
      // Align at the center
      offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
      // Dock to the bottom
      offsetFromDragPreview.y + dragPreviewHeight - sourceHeight
    ]);
    let y = interpolantY.interpolate(anchorY);
    if ((0, _browserDetectorJs).isSafari() && isImage) {
      y += (window.devicePixelRatio - 1) * dragPreviewHeight;
    }
    return y;
  };
  const calculateXOffset = () => {
    const interpolantX = new _monotonicInterpolantJs.MonotonicInterpolant([
      0,
      0.5,
      1
    ], [
      // Dock to the left
      offsetFromDragPreview.x,
      // Align at the center
      offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
      // Dock to the right
      offsetFromDragPreview.x + dragPreviewWidth - sourceWidth
    ]);
    return interpolantX.interpolate(anchorX);
  };
  const { offsetX, offsetY } = offsetPoint;
  const isManualOffsetX = offsetX === 0 || offsetX;
  const isManualOffsetY = offsetY === 0 || offsetY;
  return {
    x: isManualOffsetX ? offsetX : calculateXOffset(),
    y: isManualOffsetY ? offsetY : calculateYOffset()
  };
}


/***/ }),

/***/ 71169:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
class OptionsReader {
  get window() {
    if (this.globalContext) {
      return this.globalContext;
    } else if (typeof window !== "undefined") {
      return window;
    }
    return void 0;
  }
  get document() {
    var ref;
    if ((ref = this.globalContext) === null || ref === void 0 ? void 0 : ref.document) {
      return this.globalContext.document;
    } else if (this.window) {
      return this.window.document;
    } else {
      return void 0;
    }
  }
  get rootElement() {
    var ref;
    return ((ref = this.optionsArgs) === null || ref === void 0 ? void 0 : ref.rootElement) || this.window;
  }
  constructor(globalContext, options) {
    this.ownerDocument = null;
    this.globalContext = globalContext;
    this.optionsArgs = options;
  }
}
exports.OptionsReader = OptionsReader;


/***/ }),

/***/ 64657:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getEmptyImage = getEmptyImage;
let emptyImage;
function getEmptyImage() {
  if (!emptyImage) {
    emptyImage = new Image();
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
  return emptyImage;
}


/***/ }),

/***/ 92241:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
  value: true
});
Object.defineProperty(exports, "rX", ({
  enumerable: true,
  get: function() {
    return _getEmptyImageJs.getEmptyImage;
  }
}));
exports.PD = __webpack_unused_export__ = void 0;
var _html5BackendImplJs = __webpack_require__(69456);
var _NativeTypes = _interopRequireWildcard(__webpack_require__(20911));
var _getEmptyImageJs = __webpack_require__(64657);
__webpack_unused_export__ = _NativeTypes;
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
const HTML5Backend = function createBackend(manager, context, options) {
  return new _html5BackendImplJs.HTML5BackendImpl(manager, context, options);
};
exports.PD = HTML5Backend;


/***/ }),

/***/ 64799:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.memoize = memoize;
exports.without = without;
exports.union = union;
function memoize(fn) {
  let result = null;
  const memoized = () => {
    if (result == null) {
      result = fn();
    }
    return result;
  };
  return memoized;
}
function without(items, item) {
  return items.filter(
    (i) => i !== item
  );
}
function union(itemsA, itemsB) {
  const set = /* @__PURE__ */ new Set();
  const insertItem = (item) => set.add(item);
  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);
  const result = [];
  set.forEach(
    (key) => result.push(key)
  );
  return result;
}


/***/ }),

/***/ 45287:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ANY = Symbol("SemVer ANY");
class Comparator {
  static get ANY() {
    return ANY;
  }
  constructor(comp, options) {
    options = parseOptions(options);
    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    comp = comp.trim().split(/\s+/).join(" ");
    debug("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug("comp", this);
  }
  parse(comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    const m = comp.match(r);
    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`);
    }
    this.operator = m[1] !== void 0 ? m[1] : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer(m[2], this.options.loose);
    }
  }
  toString() {
    return this.value;
  }
  test(version) {
    debug("Comparator.test", version, this.options.loose);
    if (this.semver === ANY || version === ANY) {
      return true;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }
    return cmp(version, this.operator, this.semver, this.options);
  }
  intersects(comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError("a Comparator is required");
    }
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      return new Range(comp.value, options).test(this.value);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      return new Range(this.value, options).test(comp.semver);
    }
    options = parseOptions(options);
    if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
      return false;
    }
    if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
      return false;
    }
    if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
      return true;
    }
    if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
      return true;
    }
    if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
      return true;
    }
    if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
      return true;
    }
    if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
      return true;
    }
    return false;
  }
}
module.exports = Comparator;
const parseOptions = __webpack_require__(43363);
const { safeRe: re, t } = __webpack_require__(3094);
const cmp = __webpack_require__(26498);
const debug = __webpack_require__(18774);
const SemVer = __webpack_require__(45669);
const Range = __webpack_require__(65439);


/***/ }),

/***/ 65439:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

class Range {
  constructor(range, options) {
    options = parseOptions(options);
    if (range instanceof Range) {
      if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
        return range;
      } else {
        return new Range(range.raw, options);
      }
    }
    if (range instanceof Comparator) {
      this.raw = range.value;
      this.set = [[range]];
      this.format();
      return this;
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range.trim().split(/\s+/).join(" ");
    this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
    }
    if (this.set.length > 1) {
      const first = this.set[0];
      this.set = this.set.filter((c) => !isNullSet(c[0]));
      if (this.set.length === 0) {
        this.set = [first];
      } else if (this.set.length > 1) {
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c];
            break;
          }
        }
      }
    }
    this.format();
  }
  format() {
    this.range = this.set.map((comps) => comps.join(" ").trim()).join("||").trim();
    return this.range;
  }
  toString() {
    return this.range;
  }
  parseRange(range) {
    const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
    const memoKey = memoOpts + ":" + range;
    const cached = cache.get(memoKey);
    if (cached) {
      return cached;
    }
    const loose = this.options.loose;
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
    debug("hyphen replace", range);
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug("comparator trim", range);
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
    debug("tilde trim", range);
    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
    debug("caret trim", range);
    let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
    if (loose) {
      rangeList = rangeList.filter((comp) => {
        debug("loose invalid filter", comp, this.options);
        return !!comp.match(re[t.COMPARATORLOOSE]);
      });
    }
    debug("range list", rangeList);
    const rangeMap = /* @__PURE__ */ new Map();
    const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp];
      }
      rangeMap.set(comp.value, comp);
    }
    if (rangeMap.size > 1 && rangeMap.has("")) {
      rangeMap.delete("");
    }
    const result = [...rangeMap.values()];
    cache.set(memoKey, result);
    return result;
  }
  intersects(range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some((thisComparators) => {
      return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
        return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
          return rangeComparators.every((rangeComparator) => {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  }
  // if ANY of the sets match ALL of its comparators, then pass
  test(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer(version, this.options);
      } catch (er) {
        return false;
      }
    }
    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true;
      }
    }
    return false;
  }
}
module.exports = Range;
const LRU = __webpack_require__(50185);
const cache = new LRU({ max: 1e3 });
const parseOptions = __webpack_require__(43363);
const Comparator = __webpack_require__(45287);
const debug = __webpack_require__(18774);
const SemVer = __webpack_require__(45669);
const {
  safeRe: re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = __webpack_require__(3094);
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __webpack_require__(70983);
const isNullSet = (c) => c.value === "<0.0.0-0";
const isAny = (c) => c.value === "";
const isSatisfiable = (comparators, options) => {
  let result = true;
  const remainingComparators = comparators.slice();
  let testComparator = remainingComparators.pop();
  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }
  return result;
};
const parseComparator = (comp, options) => {
  debug("comp", comp, options);
  comp = replaceCarets(comp, options);
  debug("caret", comp);
  comp = replaceTildes(comp, options);
  debug("tildes", comp);
  comp = replaceXRanges(comp, options);
  debug("xrange", comp);
  comp = replaceStars(comp, options);
  debug("stars", comp);
  return comp;
};
const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
const replaceTildes = (comp, options) => {
  return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
};
const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
  return comp.replace(r, (_, M, m, p, pr) => {
    debug("tilde", comp, _, M, m, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
    } else if (pr) {
      debug("replaceTilde pr", pr);
      ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
    } else {
      ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
    }
    debug("tilde return", ret);
    return ret;
  });
};
const replaceCarets = (comp, options) => {
  return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
};
const replaceCaret = (comp, options) => {
  debug("caret", comp, options);
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
  const z = options.includePrerelease ? "-0" : "";
  return comp.replace(r, (_, M, m, p, pr) => {
    debug("caret", comp, _, M, m, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      if (M === "0") {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
      }
    } else if (pr) {
      debug("replaceCaret pr", pr);
      if (M === "0") {
        if (m === "0") {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
      }
    } else {
      debug("no pr");
      if (M === "0") {
        if (m === "0") {
          ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
      }
    }
    debug("caret return", ret);
    return ret;
  });
};
const replaceXRanges = (comp, options) => {
  debug("replaceXRanges", comp, options);
  return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
};
const replaceXRange = (comp, options) => {
  comp = comp.trim();
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug("xRange", comp, ret, gtlt, M, m, p, pr);
    const xM = isX(M);
    const xm = xM || isX(m);
    const xp = xm || isX(p);
    const anyX = xp;
    if (gtlt === "=" && anyX) {
      gtlt = "";
    }
    pr = options.includePrerelease ? "-0" : "";
    if (xM) {
      if (gtlt === ">" || gtlt === "<") {
        ret = "<0.0.0-0";
      } else {
        ret = "*";
      }
    } else if (gtlt && anyX) {
      if (xm) {
        m = 0;
      }
      p = 0;
      if (gtlt === ">") {
        gtlt = ">=";
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === "<=") {
        gtlt = "<";
        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }
      if (gtlt === "<") {
        pr = "-0";
      }
      ret = `${gtlt + M}.${m}.${p}${pr}`;
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
    }
    debug("xRange return", ret);
    return ret;
  });
};
const replaceStars = (comp, options) => {
  debug("replaceStars", comp, options);
  return comp.trim().replace(re[t.STAR], "");
};
const replaceGTE0 = (comp, options) => {
  debug("replaceGTE0", comp, options);
  return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
};
const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = "";
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
  } else if (fpr) {
    from = `>=${from}`;
  } else {
    from = `>=${from}${incPr ? "-0" : ""}`;
  }
  if (isX(tM)) {
    to = "";
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`;
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`;
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`;
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`;
  } else {
    to = `<=${to}`;
  }
  return `${from} ${to}`.trim();
};
const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === Comparator.ANY) {
        continue;
      }
      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver;
        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    }
    return false;
  }
  return true;
};


/***/ }),

/***/ 45669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(18774);
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(70983);
const { safeRe: re, t } = __webpack_require__(3094);
const parseOptions = __webpack_require__(43363);
const { compareIdentifiers } = __webpack_require__(33503);
class SemVer {
  constructor(version, options) {
    options = parseOptions(options);
    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      );
    }
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease = [identifier, base];
          if (identifierBase === false) {
            prerelease = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease;
            }
          } else {
            this.prerelease = prerelease;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
}
module.exports = SemVer;


/***/ }),

/***/ 12651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(53077);
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ""), options);
  return s ? s.version : null;
};
module.exports = clean;


/***/ }),

/***/ 26498:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const eq = __webpack_require__(56190);
const neq = __webpack_require__(40611);
const gt = __webpack_require__(7983);
const gte = __webpack_require__(38576);
const lt = __webpack_require__(64797);
const lte = __webpack_require__(57835);
const cmp = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a === b;
    case "!==":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq(a, b, loose);
    case "!=":
      return neq(a, b, loose);
    case ">":
      return gt(a, b, loose);
    case ">=":
      return gte(a, b, loose);
    case "<":
      return lt(a, b, loose);
    case "<=":
      return lte(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
module.exports = cmp;


/***/ }),

/***/ 34677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const parse = __webpack_require__(53077);
const { safeRe: re, t } = __webpack_require__(3094);
const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(re[t.COERCE]);
  } else {
    let next;
    while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    re[t.COERCERTL].lastIndex = -1;
  }
  if (match === null) {
    return null;
  }
  return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
module.exports = coerce;


/***/ }),

/***/ 31573:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose);
  const versionB = new SemVer(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = compareBuild;


/***/ }),

/***/ 68367:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const compareLoose = (a, b) => compare(a, b, true);
module.exports = compareLoose;


/***/ }),

/***/ 58328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
module.exports = compare;


/***/ }),

/***/ 5918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(53077);
const diff = (version1, version2) => {
  const v1 = parse(version1, null, true);
  const v2 = parse(version2, null, true);
  const comparison = v1.compare(v2);
  if (comparison === 0) {
    return null;
  }
  const v1Higher = comparison > 0;
  const highVersion = v1Higher ? v1 : v2;
  const lowVersion = v1Higher ? v2 : v1;
  const highHasPre = !!highVersion.prerelease.length;
  const lowHasPre = !!lowVersion.prerelease.length;
  if (lowHasPre && !highHasPre) {
    if (!lowVersion.patch && !lowVersion.minor) {
      return "major";
    }
    if (highVersion.patch) {
      return "patch";
    }
    if (highVersion.minor) {
      return "minor";
    }
    return "major";
  }
  const prefix = highHasPre ? "pre" : "";
  if (v1.major !== v2.major) {
    return prefix + "major";
  }
  if (v1.minor !== v2.minor) {
    return prefix + "minor";
  }
  if (v1.patch !== v2.patch) {
    return prefix + "patch";
  }
  return "prerelease";
};
module.exports = diff;


/***/ }),

/***/ 56190:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const eq = (a, b, loose) => compare(a, b, loose) === 0;
module.exports = eq;


/***/ }),

/***/ 7983:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const gt = (a, b, loose) => compare(a, b, loose) > 0;
module.exports = gt;


/***/ }),

/***/ 38576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const gte = (a, b, loose) => compare(a, b, loose) >= 0;
module.exports = gte;


/***/ }),

/***/ 1284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const inc = (version, release, options, identifier, identifierBase) => {
  if (typeof options === "string") {
    identifierBase = identifier;
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer(
      version instanceof SemVer ? version.version : version,
      options
    ).inc(release, identifier, identifierBase).version;
  } catch (er) {
    return null;
  }
};
module.exports = inc;


/***/ }),

/***/ 64797:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const lt = (a, b, loose) => compare(a, b, loose) < 0;
module.exports = lt;


/***/ }),

/***/ 57835:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const lte = (a, b, loose) => compare(a, b, loose) <= 0;
module.exports = lte;


/***/ }),

/***/ 98100:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const major = (a, loose) => new SemVer(a, loose).major;
module.exports = major;


/***/ }),

/***/ 68299:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const minor = (a, loose) => new SemVer(a, loose).minor;
module.exports = minor;


/***/ }),

/***/ 40611:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const neq = (a, b, loose) => compare(a, b, loose) !== 0;
module.exports = neq;


/***/ }),

/***/ 53077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const parse = (version, options, throwErrors = false) => {
  if (version instanceof SemVer) {
    return version;
  }
  try {
    return new SemVer(version, options);
  } catch (er) {
    if (!throwErrors) {
      return null;
    }
    throw er;
  }
};
module.exports = parse;


/***/ }),

/***/ 8710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const patch = (a, loose) => new SemVer(a, loose).patch;
module.exports = patch;


/***/ }),

/***/ 55305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(53077);
const prerelease = (version, options) => {
  const parsed = parse(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = prerelease;


/***/ }),

/***/ 23019:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(58328);
const rcompare = (a, b, loose) => compare(b, a, loose);
module.exports = rcompare;


/***/ }),

/***/ 72239:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(31573);
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
module.exports = rsort;


/***/ }),

/***/ 12753:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(65439);
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false;
  }
  return range.test(version);
};
module.exports = satisfies;


/***/ }),

/***/ 98097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(31573);
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
module.exports = sort;


/***/ }),

/***/ 85811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(53077);
const valid = (version, options) => {
  const v = parse(version, options);
  return v ? v.version : null;
};
module.exports = valid;


/***/ }),

/***/ 96487:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const internalRe = __webpack_require__(3094);
const constants = __webpack_require__(70983);
const SemVer = __webpack_require__(45669);
const identifiers = __webpack_require__(33503);
const parse = __webpack_require__(53077);
const valid = __webpack_require__(85811);
const clean = __webpack_require__(12651);
const inc = __webpack_require__(1284);
const diff = __webpack_require__(5918);
const major = __webpack_require__(98100);
const minor = __webpack_require__(68299);
const patch = __webpack_require__(8710);
const prerelease = __webpack_require__(55305);
const compare = __webpack_require__(58328);
const rcompare = __webpack_require__(23019);
const compareLoose = __webpack_require__(68367);
const compareBuild = __webpack_require__(31573);
const sort = __webpack_require__(98097);
const rsort = __webpack_require__(72239);
const gt = __webpack_require__(7983);
const lt = __webpack_require__(64797);
const eq = __webpack_require__(56190);
const neq = __webpack_require__(40611);
const gte = __webpack_require__(38576);
const lte = __webpack_require__(57835);
const cmp = __webpack_require__(26498);
const coerce = __webpack_require__(34677);
const Comparator = __webpack_require__(45287);
const Range = __webpack_require__(65439);
const satisfies = __webpack_require__(12753);
const toComparators = __webpack_require__(75299);
const maxSatisfying = __webpack_require__(87304);
const minSatisfying = __webpack_require__(16552);
const minVersion = __webpack_require__(21465);
const validRange = __webpack_require__(67522);
const outside = __webpack_require__(34332);
const gtr = __webpack_require__(48322);
const ltr = __webpack_require__(55653);
const intersects = __webpack_require__(41134);
const simplifyRange = __webpack_require__(14952);
const subset = __webpack_require__(19134);
module.exports = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers
};


/***/ }),

/***/ 70983:
/***/ ((module) => {

const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH = 256;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
const RELEASE_TYPES = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
module.exports = {
  MAX_LENGTH,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};


/***/ }),

/***/ 18774:
/***/ ((module) => {

const debug = typeof process === "object" && ({"ADMIN_PATH":"/admin/","NODE_ENV":"production","STRAPI_ADMIN_BACKEND_URL":"","STRAPI_TELEMETRY_DISABLED":undefined}) && ({"ADMIN_PATH":"/admin/","NODE_ENV":"production","STRAPI_ADMIN_BACKEND_URL":"","STRAPI_TELEMETRY_DISABLED":undefined}).NODE_DEBUG && /\bsemver\b/i.test(({"ADMIN_PATH":"/admin/","NODE_ENV":"production","STRAPI_ADMIN_BACKEND_URL":"","STRAPI_TELEMETRY_DISABLED":undefined}).NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
module.exports = debug;


/***/ }),

/***/ 33503:
/***/ ((module) => {

const numeric = /^[0-9]+$/;
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
module.exports = {
  compareIdentifiers,
  rcompareIdentifiers
};


/***/ }),

/***/ 43363:
/***/ ((module) => {

const looseOption = Object.freeze({ loose: true });
const emptyOpts = Object.freeze({});
const parseOptions = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
module.exports = parseOptions;


/***/ }),

/***/ 3094:
/***/ ((module, exports, __webpack_require__) => {

const {
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_LENGTH
} = __webpack_require__(70983);
const debug = __webpack_require__(18774);
exports = module.exports = {};
const re = exports.re = [];
const safeRe = exports.safeRe = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;
const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
const safeRegexReplacements = [
  ["\\s", 1],
  ["\\d", MAX_LENGTH],
  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
];
const makeSafeRegex = (value) => {
  for (const [token, max] of safeRegexReplacements) {
    value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
  }
  return value;
};
const createToken = (name, value, isGlobal) => {
  const safe = makeSafeRegex(value);
  const index = R++;
  debug(name, index, value);
  t[name] = index;
  src[index] = value;
  re[index] = new RegExp(value, isGlobal ? "g" : void 0);
  safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
};
createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
createToken("FULL", `^${src[t.FULLPLAIN]}$`);
createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
createToken("GTLT", "((?:<|>)?=?)");
createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
createToken("COERCERTL", src[t.COERCE], true);
createToken("LONETILDE", "(?:~>?)");
createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = "$1~";
createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
createToken("LONECARET", "(?:\\^)");
createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = "$1^";
createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = "$1$2$3";
createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
createToken("STAR", "(<|>)?=?\\s*\\*");
createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");


/***/ }),

/***/ 48322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const outside = __webpack_require__(34332);
const gtr = (version, range, options) => outside(version, range, ">", options);
module.exports = gtr;


/***/ }),

/***/ 41134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(65439);
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options);
  r2 = new Range(r2, options);
  return r1.intersects(r2, options);
};
module.exports = intersects;


/***/ }),

/***/ 55653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const outside = __webpack_require__(34332);
const ltr = (version, range, options) => outside(version, range, "<", options);
module.exports = ltr;


/***/ }),

/***/ 87304:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const Range = __webpack_require__(65439);
const maxSatisfying = (versions, range, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer(max, options);
      }
    }
  });
  return max;
};
module.exports = maxSatisfying;


/***/ }),

/***/ 16552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const Range = __webpack_require__(65439);
const minSatisfying = (versions, range, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range(range, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer(min, options);
      }
    }
  });
  return min;
};
module.exports = minSatisfying;


/***/ }),

/***/ 21465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const Range = __webpack_require__(65439);
const gt = __webpack_require__(7983);
const minVersion = (range, loose) => {
  range = new Range(range, loose);
  let minver = new SemVer("0.0.0");
  if (range.test(minver)) {
    return minver;
  }
  minver = new SemVer("0.0.0-0");
  if (range.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i];
    let setMin = null;
    comparators.forEach((comparator) => {
      const compver = new SemVer(comparator.semver.version);
      switch (comparator.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`);
      }
    });
    if (setMin && (!minver || gt(minver, setMin))) {
      minver = setMin;
    }
  }
  if (minver && range.test(minver)) {
    return minver;
  }
  return null;
};
module.exports = minVersion;


/***/ }),

/***/ 34332:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(45669);
const Comparator = __webpack_require__(45287);
const { ANY } = Comparator;
const Range = __webpack_require__(65439);
const satisfies = __webpack_require__(12753);
const gt = __webpack_require__(7983);
const lt = __webpack_require__(64797);
const lte = __webpack_require__(57835);
const gte = __webpack_require__(38576);
const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options);
  range = new Range(range, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies(version, range, options)) {
    return false;
  }
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i];
    let high = null;
    let low = null;
    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator(">=0.0.0");
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
module.exports = outside;


/***/ }),

/***/ 14952:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const satisfies = __webpack_require__(12753);
const compare = __webpack_require__(58328);
module.exports = (versions, range, options) => {
  const set = [];
  let first = null;
  let prev = null;
  const v = versions.sort((a, b) => compare(a, b, options));
  for (const version of v) {
    const included = satisfies(version, range, options);
    if (included) {
      prev = version;
      if (!first) {
        first = version;
      }
    } else {
      if (prev) {
        set.push([first, prev]);
      }
      prev = null;
      first = null;
    }
  }
  if (first) {
    set.push([first, null]);
  }
  const ranges = [];
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min);
    } else if (!max && min === v[0]) {
      ranges.push("*");
    } else if (!max) {
      ranges.push(`>=${min}`);
    } else if (min === v[0]) {
      ranges.push(`<=${max}`);
    } else {
      ranges.push(`${min} - ${max}`);
    }
  }
  const simplified = ranges.join(" || ");
  const original = typeof range.raw === "string" ? range.raw : String(range);
  return simplified.length < original.length ? simplified : range;
};


/***/ }),

/***/ 19134:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(65439);
const Comparator = __webpack_require__(45287);
const { ANY } = Comparator;
const satisfies = __webpack_require__(12753);
const compare = __webpack_require__(58328);
const subset = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true;
  }
  sub = new Range(sub, options);
  dom = new Range(dom, options);
  let sawNonNull = false;
  OUTER:
    for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
  return true;
};
const minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
const minimumVersion = [new Comparator(">=0.0.0")];
const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true;
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true;
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease;
    } else {
      sub = minimumVersion;
    }
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true;
    } else {
      dom = minimumVersion;
    }
  }
  const eqSet = /* @__PURE__ */ new Set();
  let gt, lt;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=") {
      gt = higherGT(gt, c, options);
    } else if (c.operator === "<" || c.operator === "<=") {
      lt = lowerLT(lt, c, options);
    } else {
      eqSet.add(c.semver);
    }
  }
  if (eqSet.size > 1) {
    return null;
  }
  let gtltComp;
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options);
    if (gtltComp > 0) {
      return null;
    } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
      return null;
    }
  }
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options)) {
      return null;
    }
    if (lt && !satisfies(eq, String(lt), options)) {
      return null;
    }
    for (const c of dom) {
      if (!satisfies(eq, String(c), options)) {
        return false;
      }
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
  let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt, c, options);
        if (higher === c && higher !== gt) {
          return false;
        }
      } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
        return false;
      }
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt, c, options);
        if (lower === c && lower !== lt) {
          return false;
        }
      } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
        return false;
      }
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0) {
      return false;
    }
  }
  if (gt && hasDomLT && !lt && gtltComp !== 0) {
    return false;
  }
  if (lt && hasDomGT && !gt && gtltComp !== 0) {
    return false;
  }
  if (needDomGTPre || needDomLTPre) {
    return false;
  }
  return true;
};
const higherGT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
module.exports = subset;


/***/ }),

/***/ 75299:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(65439);
const toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
module.exports = toComparators;


/***/ }),

/***/ 67522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(65439);
const validRange = (range, options) => {
  try {
    return new Range(range, options).range || "*";
  } catch (er) {
    return null;
  }
};
module.exports = validRange;


/***/ }),

/***/ 20193:
/***/ ((module) => {

"use strict";

module.exports = function(Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value;
    }
  };
};


/***/ }),

/***/ 76178:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;
function Yallist(list) {
  var self = this;
  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }
  self.tail = null;
  self.head = null;
  self.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }
  return self;
}
Yallist.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist.prototype.push = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist.prototype.unshift = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist.prototype.get = function(n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist.prototype.getReverse = function(n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }
  self.length++;
  return inserted;
}
function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}
function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  __webpack_require__(20193)(Yallist);
} catch (er) {
}


/***/ }),

/***/ 31380:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ c)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37652);
/* harmony import */ var _MainNavContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15356);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33110);




const a = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_2__/* .Flex */ .k))`
  width: ${({ condensed: r }) => r ? "max-content" : `${224 / 16}rem`};
  border-right: 1px solid ${({ theme: r }) => r.colors.neutral150};
`, c = ({ condensed: r = false, ...t }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_MainNavContext_js__WEBPACK_IMPORTED_MODULE_3__/* .MainNavContext */ .f.Provider, { value: r, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(a, { alignItems: "normal", as: "nav", background: "neutral0", condensed: r, direction: "column", height: "100vh", position: "sticky", top: 0, zIndex: 2, ...t }) });



/***/ }),

/***/ 15356:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ a),
/* harmony export */   f: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27279);

const o = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false), a = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(o);



/***/ }),

/***/ 74577:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ W)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37652);
/* harmony import */ var _MainNavContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15356);
/* harmony import */ var _BaseLink_BaseLink_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18041);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(68263);
/* harmony import */ var _VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30249);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(33110);
/* harmony import */ var _Typography_Typography_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19915);









const h = styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP.div`
  border-radius: ${({ theme: r }) => r.borderRadius};

  svg,
  img {
    height: ${({ condensed: r }) => r ? `${40 / 16}rem` : `${32 / 16}rem`};
    width: ${({ condensed: r }) => r ? `${40 / 16}rem` : `${32 / 16}rem`};
  }
`, x = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_BaseLink_BaseLink_js__WEBPACK_IMPORTED_MODULE_3__/* .BaseLink */ .f))`
  text-decoration: unset;
  color: inherit;
`, W = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ workplace: r, title: t, icon: o, ...i }, a) => {
  const s = (0,_MainNavContext_js__WEBPACK_IMPORTED_MODULE_4__/* .useMainNav */ .S)();
  return i.to = i?.to ?? "/", s ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_BaseLink_BaseLink_js__WEBPACK_IMPORTED_MODULE_3__/* .BaseLink */ .f, { ref: a, ...i, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_5__/* .Box */ .x, { paddingLeft: 3, paddingRight: 3, paddingTop: 4, paddingBottom: 4, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(h, { condensed: true, children: [o, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_6__/* .VisuallyHidden */ .T, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: t }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: r })] })] }) }) }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(x, { ref: a, ...i, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_5__/* .Box */ .x, { paddingLeft: 3, paddingRight: 3, paddingTop: 4, paddingBottom: 4, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_7__/* .Flex */ .k, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(h, { "aria-hidden": true, tabIndex: -1, children: o }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_5__/* .Box */ .x, { paddingLeft: 2, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_8__/* .Typography */ .Z, { fontWeight: "bold", textColor: "neutral800", as: "span", children: [t, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_6__/* .VisuallyHidden */ .T, { as: "span", children: r })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_8__/* .Typography */ .Z, { variant: "pi", as: "p", textColor: "neutral600", "aria-hidden": true, children: r })] })] }) }) });
});



/***/ }),

/***/ 68996:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   w: () => (/* binding */ x)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61437);
/* harmony import */ var _strapi_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(53762);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37652);
/* harmony import */ var _MainNavContext_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15356);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33110);
/* harmony import */ var _Icon_Icon_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24204);
/* harmony import */ var _VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30249);







const c = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_2__/* .Flex */ .k)).attrs((r) => ({
  justifyContent: "center",
  ...r
}))`
  background: ${({ theme: r }) => r.colors.neutral0};
  border: 1px solid ${({ theme: r }) => r.colors.neutral150};
  border-radius: ${({ theme: r }) => r.borderRadius};
  position: absolute;
  bottom: ${(9 + 4) / 16}rem; // 9 is the height of the svg and 4 is the padding below
  right: ${({ theme: r, condensed: e }) => e ? 0 : r.spaces[5]};
  transform: ${({ condensed: r }) => r ? "translateX(50%)" : void 0};
  z-index: 2;
  width: ${18 / 16}rem;
  height: ${25 / 16}rem;

  svg {
    width: ${6 / 16}rem;
    height: ${9 / 16}rem;
  }
`, x = ({ children: r, ...e }) => {
  const o = (0,_MainNavContext_js__WEBPACK_IMPORTED_MODULE_3__/* .useMainNav */ .S)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(c, { as: "button", condensed: o, ...e, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Icon_Icon_js__WEBPACK_IMPORTED_MODULE_4__/* .Icon */ .J, { as: o ? _strapi_icons__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z : _strapi_icons__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, "aria-hidden": true, color: "neutral600" }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_7__/* .VisuallyHidden */ .T, { children: r })] });
};



/***/ }),

/***/ 69254:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68263);


const m = ({ children: o }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, { position: "relative", children: o });



/***/ }),

/***/ 47061:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ C)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37652);
/* harmony import */ var _MainNavContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15356);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68263);
/* harmony import */ var _BaseLink_BaseLink_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18041);
/* harmony import */ var _Typography_Typography_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19915);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33110);
/* harmony import */ var _Badge_Badge_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15050);
/* harmony import */ var _Tooltip_Tooltip_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(72929);










const p = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .x))`
  svg {
    width: 1rem;
    height: 1rem;
  }
`, d = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_BaseLink_BaseLink_js__WEBPACK_IMPORTED_MODULE_4__/* .BaseLink */ .f))`
  position: relative;
  text-decoration: none;
  display: block;
  border-radius: ${({ theme: r }) => r.borderRadius};
  background: ${({ theme: r }) => r.colors.neutral0};

  ${_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_5__/* .Typography */ .Z} {
    color: ${({ theme: r }) => r.colors.neutral600};
  }

  svg path {
    fill: ${({ theme: r }) => r.colors.neutral500};
  }

  &:hover {
    background: ${({ theme: r }) => r.colors.neutral100};

    ${_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_5__/* .Typography */ .Z} {
      color: ${({ theme: r }) => r.colors.neutral700};
    }

    svg path {
      fill: ${({ theme: r }) => r.colors.neutral600};
    }
  }

  &.active {
    background: ${({ theme: r }) => r.colors.primary100};

    svg path {
      fill: ${({ theme: r }) => r.colors.primary600};
    }

    ${_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_5__/* .Typography */ .Z} {
      color: ${({ theme: r }) => r.colors.primary600};
      font-weight: 500;
    }
  }
`, m = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_6__/* .Flex */ .k))`
  padding: ${({ theme: r }) => `${r.spaces[2]} ${r.spaces[3]}`};
`, u = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Badge_Badge_js__WEBPACK_IMPORTED_MODULE_7__/* .Badge */ .C))`
  ${({ theme: r, condensed: i }) => i && `
	  position: absolute;
    // Values based on visual aspect 
    top: -${r.spaces[3]};
    right:  -${r.spaces[1]};
  `}

  ${_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_5__/* .Typography */ .Z} {
    //find a solution to remove !important
    color: ${({ theme: r }) => r.colors.neutral0} !important;
    line-height: 0;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ theme: r }) => r.spaces[6]};
  height: ${({ theme: r }) => r.spaces[5]};
  padding: ${({ theme: r }) => `0 ${r.spaces[2]}`};
  border-radius: ${({ theme: r }) => r.spaces[10]};
  background: ${({ theme: r }) => r.colors.primary600};
`, C = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ children: r, icon: i, badgeContent: a, badgeAriaLabel: n, ...l }, c) => (0,_MainNavContext_js__WEBPACK_IMPORTED_MODULE_8__/* .useMainNav */ .S)() ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(d, { ref: c, ...l, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Tooltip_Tooltip_js__WEBPACK_IMPORTED_MODULE_9__/* .Tooltip */ .u, { position: "right", label: r, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(m, { as: "span", justifyContent: "center", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(p, { "aria-hidden": true, paddingRight: 0, as: "span", children: i }), a && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(u, { condensed: true, "aria-label": n, children: a })] }) }) }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(d, { ref: c, ...l, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(m, { as: "span", justifyContent: "space-between", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_6__/* .Flex */ .k, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(p, { "aria-hidden": true, paddingRight: 3, as: "span", children: i }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_5__/* .Typography */ .Z, { children: r })] }), a && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(u, { justifyContent: "center", "aria-label": n, children: a })] }) }));



/***/ }),

/***/ 57661:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ k)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var _MainNavContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15356);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(33110);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68263);
/* harmony import */ var _Divider_Divider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(61696);
/* harmony import */ var _VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30249);
/* harmony import */ var _Typography_Typography_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(19915);








const k = ({ label: o, children: a, horizontal: n = false, spacing: c = 2, ...m }) => (0,_MainNavContext_js__WEBPACK_IMPORTED_MODULE_2__/* .useMainNav */ .S)() ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .k, { direction: "column", alignItems: "stretch", gap: 2, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_4__/* .Box */ .x, { paddingTop: 1, paddingBottom: 1, background: "neutral0", hasRadius: true, as: "span", children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Divider_Divider_js__WEBPACK_IMPORTED_MODULE_5__/* .Divider */ .i, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_6__/* .VisuallyHidden */ .T, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: o }) })] }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .k, { as: "ul", gap: c, direction: n ? "row" : "column", alignItems: n ? "center" : "stretch", ...m, children: react__WEBPACK_IMPORTED_MODULE_1__.Children.map(a, (i, t) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", { children: i }, t)) })] }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .k, { direction: "column", alignItems: "stretch", gap: 2, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_4__/* .Box */ .x, { paddingTop: 1, paddingBottom: 1, background: "neutral0", paddingRight: 3, paddingLeft: 3, hasRadius: true, as: "span", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_7__/* .Typography */ .Z, { variant: "sigma", textColor: "neutral600", children: o }) }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .k, { as: "ul", gap: c, direction: n ? "row" : "column", alignItems: n ? "center" : "stretch", ...m, children: react__WEBPACK_IMPORTED_MODULE_1__.Children.map(a, (i, t) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", { children: i }, t)) })] });



/***/ }),

/***/ 74729:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ u)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37652);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68263);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33110);





const c = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .x))`
  flex-grow: 1;
  overflow-y: auto;
`, u = ({ children: t, spacing: e = 4, horizontal: r = false, ...i }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(c, { paddingLeft: 3, paddingRight: 2, paddingTop: 3, paddingBottom: 8, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_4__/* .Flex */ .k, { as: "ul", gap: e, direction: r ? "row" : "column", alignItems: r ? "center" : "stretch", ...i, children: react__WEBPACK_IMPORTED_MODULE_1__.Children.map(t, (n, d) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", { children: n }, d)) }) });



/***/ }),

/***/ 92258:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ L)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37652);
/* harmony import */ var _MainNavContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15356);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(68263);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33110);
/* harmony import */ var _Avatar_Avatar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(91212);
/* harmony import */ var _VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30249);
/* harmony import */ var _Typography_Typography_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(19915);









const g = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .x))`
  border-top: 1px solid ${({ theme: o }) => o.colors.neutral150};
`, L = react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ src: o, children: t, initials: n, ...d }, a) => {
  const e = (0,_MainNavContext_js__WEBPACK_IMPORTED_MODULE_4__/* .useMainNav */ .S)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(g, { paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, ...d, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_5__/* .Flex */ .k, { as: "button", justifyContent: e ? "center" : void 0, ref: a, children: [o ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Avatar_Avatar_js__WEBPACK_IMPORTED_MODULE_6__/* .Avatar */ .q, { src: o, alt: "", "aria-hidden": true }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Avatar_Avatar_js__WEBPACK_IMPORTED_MODULE_6__/* .Initials */ .L, { children: n }), e ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_VisuallyHidden_VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_7__/* .VisuallyHidden */ .T, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", { children: t }) }) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .x, { width: `${130 / 16}rem`, paddingLeft: 2, as: "span", children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_8__/* .Typography */ .Z, { ellipsis: true, textColor: "neutral600", children: t }) })] }) });
});



/***/ }),

/***/ 62447:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ e)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const o = (v) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...v, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
  "path",
  {
    fill: "#212134",
    d: "M13 21v2.5l-3-2-3 2V21h-.5A3.5 3.5 0 0 1 3 17.5V5a3 3 0 0 1 3-3h14a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1h-7Zm-6-2v-2h6v2h6v-3H6.5a1.5 1.5 0 1 0 0 3H7ZM7 5v2h2V5H7Zm0 3v2h2V8H7Zm0 3v2h2v-2H7Z"
  }
) }), e = o;



/***/ }),

/***/ 306:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const h = (t) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...t, children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { fill: "#212134", d: "M11.987 23.036v-.964H1.876V1.876h10.111V0H0v24h11.987v-.964Z" }),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M8 11.2c0-.11.09-.2.2-.2h11.973l-5.445-5.445a.2.2 0 0 1 0-.283l1.13-1.13a.2.2 0 0 1 .283 0l7.718 7.717a.2.2 0 0 1 0 .282L16.14 19.86a.2.2 0 0 1-.282 0l-1.13-1.13a.2.2 0 0 1 0-.284L20.172 13H8.2a.2.2 0 0 1-.2-.2v-1.6Z"
    }
  )
] }), s = h;



/***/ }),

/***/ 74362:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const v = (h) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...h, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
  "path",
  {
    fill: "#212134",
    d: "M6.455 19 2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455ZM7 10v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z"
  }
) }), t = v;



/***/ }),

/***/ 29971:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const t = (l) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...l, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
  "path",
  {
    fill: "#212134",
    d: "M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.53-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685Z"
  }
) }), n = t;



/***/ }),

/***/ 37836:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ i)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const e = (t) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 8 8", ...t, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { fill: "#212134", d: "M2 .93c0-.4.45-.63.78-.41l4.6 3.06c.3.2.3.64 0 .84l-4.6 3.06A.5.5 0 0 1 2 7.07V.93Z" }) }), i = e;



/***/ }),

/***/ 29746:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ i)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const o = (e) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 15 14", ...e, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
  "path",
  {
    fill: "#212134",
    d: "M5.08 4.1c0-1.19 1.18-2.17 2.42-2.17s2.43.98 2.43 2.17c0 1.1-.56 1.61-1.31 2.28l-.03.03c-.75.65-1.66 1.47-1.66 3.09a.57.57 0 1 0 1.15 0c0-1.08.55-1.6 1.3-2.26l.02-.02c.75-.66 1.67-1.48 1.67-3.12C11.07 2.13 9.22.78 7.5.78 5.78.78 3.93 2.13 3.93 4.1a.57.57 0 1 0 1.15 0Zm2.42 9.26a.88.88 0 1 0 0-1.75.88.88 0 0 0 0 1.75Z"
  }
) }), i = o;



/***/ }),

/***/ 67423:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ v)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const l = (e) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...e, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
  "path",
  {
    fill: "#212134",
    fillRule: "evenodd",
    d: "M23.707.297A1 1 0 0 0 23 .004h-2a13.907 13.907 0 0 0-5.38 1.077 1 1 0 0 0-.615.923V4.92a.035.035 0 0 1-.022.038l-2-1.47a1 1 0 0 0-1.265.052A14 14 0 0 0 7 14.004v1.585l-2.707 2.707a1 1 0 1 0 1.415 1.415l2.707-2.708H10a14.014 14.014 0 0 0 14-14v-2a1 1 0 0 0-.293-.706ZM18 23.999H3a3 3 0 0 1-3-3V6A3 3 0 0 1 3 3h3a1 1 0 1 1 0 2H3a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3Z",
    clipRule: "evenodd"
  }
) }), v = l;



/***/ })

}]);