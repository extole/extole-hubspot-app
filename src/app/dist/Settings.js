(function(require$$0, react) {
  "use strict";
  const isRunningInWorker = () => typeof self !== "undefined" && self.__HUBSPOT_EXTENSION_WORKER__ === true;
  const fakeWorkerGlobals = {
    logger: {
      debug: (data) => {
        console.log(data);
      },
      info: (data) => {
        console.info(data);
      },
      warn: (data) => {
        console.warn(data);
      },
      error: (data) => {
        console.error(data);
      }
    },
    extend_V2: () => {
    },
    // @ts-expect-error we are not using the worker endpoint in tests env.
    __useExtensionContext: () => {
    }
  };
  const getWorkerGlobals = () => {
    return isRunningInWorker() ? self : fakeWorkerGlobals;
  };
  const extend_V2 = getWorkerGlobals().extend_V2;
  function serverless(name, options) {
    return self.serverless(name, options);
  }
  function fetch(url, options) {
    return self.hsFetch(url, options);
  }
  const hubspot = {
    extend: extend_V2,
    serverless,
    fetch
  };
  var ServerlessExecutionStatus;
  (function(ServerlessExecutionStatus2) {
    ServerlessExecutionStatus2["Success"] = "SUCCESS";
    ServerlessExecutionStatus2["Error"] = "ERROR";
  })(ServerlessExecutionStatus || (ServerlessExecutionStatus = {}));
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_development = {};
  var hasRequiredReactJsxRuntime_development;
  function requireReactJsxRuntime_development() {
    if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
    hasRequiredReactJsxRuntime_development = 1;
    /**
     * @license React
     * react-jsx-runtime.development.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    {
      (function() {
        var React2 = require$$0;
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self2) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self2) ;
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement = function(type, key, ref, self2, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self2) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self2);
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        var didWarnAboutKeySpread = {};
        function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum();
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self2);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            {
              if (hasOwnProperty.call(props, "key")) {
                var componentName = getComponentNameFromType(type);
                var keys = Object.keys(props).filter(function(k) {
                  return k !== "key";
                });
                var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                  var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                  error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                  didWarnAboutKeySpread[componentName + beforeExample] = true;
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx = jsxWithValidationDynamic;
        var jsxs = jsxWithValidationStatic;
        reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
        reactJsxRuntime_development.jsx = jsx;
        reactJsxRuntime_development.jsxs = jsxs;
      })();
    }
    return reactJsxRuntime_development;
  }
  var hasRequiredJsxRuntime;
  function requireJsxRuntime() {
    if (hasRequiredJsxRuntime) return jsxRuntime.exports;
    hasRequiredJsxRuntime = 1;
    {
      jsxRuntime.exports = requireReactJsxRuntime_development();
    }
    return jsxRuntime.exports;
  }
  var jsxRuntimeExports = requireJsxRuntime();
  const createRemoteComponentRegistry = () => {
    const componentMetadataLookup = /* @__PURE__ */ new Map();
    const componentNameByComponentMap = /* @__PURE__ */ new Map();
    const registerComponent = (component, componentName, fragmentProps) => {
      componentNameByComponentMap.set(component, componentName);
      componentMetadataLookup.set(componentName, {
        fragmentPropsSet: new Set(fragmentProps),
        fragmentPropsArray: fragmentProps
      });
      return component;
    };
    return {
      getComponentName: (component) => {
        const componentName = componentNameByComponentMap.get(component);
        if (!componentName) {
          return null;
        }
        return componentName;
      },
      isAllowedComponentName: (componentName) => {
        return componentMetadataLookup.has(componentName);
      },
      isComponentFragmentProp: (componentName, propName) => {
        const componentMetadata = componentMetadataLookup.get(componentName);
        if (!componentMetadata) {
          return false;
        }
        return componentMetadata.fragmentPropsSet.has(propName);
      },
      getComponentFragmentPropNames: (componentName) => {
        const componentMetadata = componentMetadataLookup.get(componentName);
        if (!componentMetadata) {
          return [];
        }
        const { fragmentPropsArray } = componentMetadata;
        return fragmentPropsArray;
      },
      createAndRegisterRemoteReactComponent: (componentName, options = {}) => {
        const { fragmentProps = [] } = options;
        const remoteReactComponent = react.createRemoteReactComponent(componentName, {
          fragmentProps
        });
        return registerComponent(remoteReactComponent, componentName, fragmentProps);
      },
      createAndRegisterRemoteCompoundReactComponent: (componentName, options) => {
        const { fragmentProps = [] } = options;
        const RemoteComponentType = react.createRemoteReactComponent(componentName, {
          fragmentProps
        });
        const CompoundFunctionComponentType = typeof RemoteComponentType === "function" ? RemoteComponentType : (props) => jsxRuntimeExports.jsx(RemoteComponentType, { ...props });
        Object.assign(CompoundFunctionComponentType, options.compoundComponentProperties);
        return registerComponent(CompoundFunctionComponentType, componentName, fragmentProps);
      }
    };
  };
  const __hubSpotComponentRegistry = createRemoteComponentRegistry();
  const { createAndRegisterRemoteReactComponent, createAndRegisterRemoteCompoundReactComponent } = __hubSpotComponentRegistry;
  createAndRegisterRemoteReactComponent("Alert");
  const Button = createAndRegisterRemoteReactComponent("Button", {
    fragmentProps: ["overlay"]
  });
  createAndRegisterRemoteReactComponent("ButtonRow");
  createAndRegisterRemoteReactComponent("Card");
  createAndRegisterRemoteReactComponent("DescriptionList");
  createAndRegisterRemoteReactComponent("DescriptionListItem");
  const Divider = createAndRegisterRemoteReactComponent("Divider");
  const Spacer = createAndRegisterRemoteReactComponent("Spacer");
  createAndRegisterRemoteReactComponent("EmptyState");
  createAndRegisterRemoteReactComponent("ErrorState");
  const Form = createAndRegisterRemoteReactComponent("Form");
  const Heading = createAndRegisterRemoteReactComponent("Heading");
  createAndRegisterRemoteReactComponent("Image", {
    fragmentProps: ["overlay"]
  });
  const Input = createAndRegisterRemoteReactComponent("Input");
  const Link = createAndRegisterRemoteReactComponent("Link", {
    fragmentProps: ["overlay"]
  });
  const TextArea = createAndRegisterRemoteReactComponent("TextArea");
  createAndRegisterRemoteReactComponent("Textarea");
  const LoadingSpinner = createAndRegisterRemoteReactComponent("LoadingSpinner");
  createAndRegisterRemoteReactComponent("ProgressBar");
  const Select = createAndRegisterRemoteReactComponent("Select");
  createAndRegisterRemoteReactComponent("Tag", {
    fragmentProps: ["overlay"]
  });
  const Text = createAndRegisterRemoteReactComponent("Text");
  createAndRegisterRemoteReactComponent("Tile");
  createAndRegisterRemoteReactComponent("Stack");
  createAndRegisterRemoteReactComponent("ToggleGroup");
  createAndRegisterRemoteReactComponent("StatisticsItem");
  createAndRegisterRemoteReactComponent("Statistics");
  createAndRegisterRemoteReactComponent("StatisticsTrend");
  const Table = createAndRegisterRemoteReactComponent("Table");
  createAndRegisterRemoteReactComponent("TableFooter");
  const TableCell = createAndRegisterRemoteReactComponent("TableCell");
  const TableRow = createAndRegisterRemoteReactComponent("TableRow");
  const TableBody = createAndRegisterRemoteReactComponent("TableBody");
  const TableHeader = createAndRegisterRemoteReactComponent("TableHeader");
  const TableHead = createAndRegisterRemoteReactComponent("TableHead");
  createAndRegisterRemoteReactComponent("NumberInput");
  const Box = createAndRegisterRemoteReactComponent("Box");
  createAndRegisterRemoteReactComponent("StepIndicator");
  createAndRegisterRemoteReactComponent("Accordion");
  createAndRegisterRemoteReactComponent("MultiSelect");
  const Flex = createAndRegisterRemoteReactComponent("Flex");
  createAndRegisterRemoteReactComponent("DateInput");
  createAndRegisterRemoteReactComponent("Checkbox");
  createAndRegisterRemoteReactComponent("RadioButton");
  createAndRegisterRemoteReactComponent("List");
  const Toggle = createAndRegisterRemoteReactComponent("Toggle");
  const Dropdown = createAndRegisterRemoteCompoundReactComponent("Dropdown", {
    compoundComponentProperties: {
      /**
       * The `Dropdown.ButtonItem` component represents a single option within a `Dropdown` menu. Use this component as a child of the `Dropdown` component.
       *
       * **Links:**
       *
       * - {@link https://developers.hubspot.com/docs/reference/ui-components/standard-components/dropdown Docs}
       */
      ButtonItem: createAndRegisterRemoteReactComponent("DropdownButtonItem", {
        fragmentProps: ["overlay"]
      })
    }
  });
  createAndRegisterRemoteReactComponent("Panel");
  createAndRegisterRemoteReactComponent("PanelFooter");
  createAndRegisterRemoteReactComponent("PanelBody");
  createAndRegisterRemoteReactComponent("PanelSection");
  createAndRegisterRemoteReactComponent("StepperInput");
  createAndRegisterRemoteReactComponent("Modal");
  createAndRegisterRemoteReactComponent("ModalBody");
  createAndRegisterRemoteReactComponent("ModalFooter");
  createAndRegisterRemoteReactComponent("Icon");
  const StatusTag = createAndRegisterRemoteReactComponent("StatusTag");
  createAndRegisterRemoteReactComponent("LoadingButton", {
    fragmentProps: ["overlay"]
  });
  createAndRegisterRemoteReactComponent("BarChart");
  createAndRegisterRemoteReactComponent("LineChart");
  createAndRegisterRemoteReactComponent("ScoreCircle");
  createAndRegisterRemoteReactComponent("Tabs");
  createAndRegisterRemoteReactComponent("Tab");
  createAndRegisterRemoteReactComponent("Illustration");
  createAndRegisterRemoteReactComponent("Tooltip");
  createAndRegisterRemoteReactComponent("SearchInput");
  createAndRegisterRemoteReactComponent("TimeInput");
  createAndRegisterRemoteReactComponent("CurrencyInput");
  createAndRegisterRemoteReactComponent("Inline");
  createAndRegisterRemoteReactComponent("AutoGrid");
  createAndRegisterRemoteReactComponent("CrmPropertyList");
  createAndRegisterRemoteReactComponent("CrmAssociationTable");
  createAndRegisterRemoteReactComponent("CrmDataHighlight");
  createAndRegisterRemoteReactComponent("CrmReport");
  createAndRegisterRemoteReactComponent("CrmAssociationPivot");
  createAndRegisterRemoteReactComponent("CrmAssociationPropertyList");
  createAndRegisterRemoteReactComponent("CrmAssociationStageTracker");
  createAndRegisterRemoteReactComponent("CrmSimpleDeadline");
  createAndRegisterRemoteReactComponent("CrmStageTracker");
  createAndRegisterRemoteReactComponent("CrmStatistics");
  createAndRegisterRemoteReactComponent("CrmActionButton");
  createAndRegisterRemoteReactComponent("CrmActionLink");
  createAndRegisterRemoteReactComponent("CrmCardActions");
  createAndRegisterRemoteReactComponent("HeaderActions");
  createAndRegisterRemoteReactComponent("PrimaryHeaderActionButton", {
    fragmentProps: ["overlay"]
  });
  createAndRegisterRemoteReactComponent("SecondaryHeaderActionButton", {
    fragmentProps: ["overlay"]
  });
  createAndRegisterRemoteCompoundReactComponent("PageHeader", {
    compoundComponentProperties: {
      PrimaryAction: createAndRegisterRemoteReactComponent("PageHeaderPrimaryAction"),
      SecondaryActions: createAndRegisterRemoteReactComponent("PageHeaderSecondaryActions"),
      Link: createAndRegisterRemoteReactComponent("PageHeaderLink"),
      PageLink: createAndRegisterRemoteReactComponent("PageHeaderPageLink")
    }
  });
  createAndRegisterRemoteCompoundReactComponent("PageBreadcrumbs", {
    compoundComponentProperties: {
      PageLink: createAndRegisterRemoteReactComponent("PageBreadcrumbsPageLink"),
      Current: createAndRegisterRemoteReactComponent("PageBreadcrumbsCurrent")
    }
  });
  createAndRegisterRemoteReactComponent("PageLink");
  createAndRegisterRemoteReactComponent("PageTitle");
  createAndRegisterRemoteReactComponent("Iframe");
  createAndRegisterRemoteReactComponent("MediaObject", {
    fragmentProps: ["itemRight", "itemLeft"]
  });
  createAndRegisterRemoteReactComponent("Stack2");
  createAndRegisterRemoteReactComponent("Center");
  createAndRegisterRemoteReactComponent("Grid");
  createAndRegisterRemoteReactComponent("GridItem");
  createAndRegisterRemoteReactComponent("SettingsView");
  createAndRegisterRemoteReactComponent("ExpandableText");
  createAndRegisterRemoteReactComponent("Popover");
  createAndRegisterRemoteReactComponent("FileInput");
  const ReactRenderMocksContext = require$$0.createContext(null);
  ReactRenderMocksContext.Provider;
  hubspot.extend(({ runServerlessFunction, context }) => {
    var _a, _b;
    return /* @__PURE__ */ React.createElement(
      ExtoleSettings,
      {
        runServerlessFunction,
        portalId: context.portal.id,
        locale: (_a = context.user) == null ? void 0 : _a.locale,
        actor: ((_b = context.user) == null ? void 0 : _b.email) ?? ""
      }
    );
  });
  const DEFAULT_HUBSPOTUTK_PROPERTY = "extole_hubspotutk";
  const DEFAULT_ADVOCATE_CODE_PROPERTY = "extole_advocate_code";
  const DEFAULT_REFERRAL_URL_PARAMS = "extole_shareable_code";
  const DEFAULT_SHARE_LINK_PROPERTY = "extole_share_link";
  const CONTACT_DEFAULTS = [
    { extoleKey: "email", source: "property", value: "email" },
    { extoleKey: "contact_id", source: "property", value: "hs_object_id" },
    { extoleKey: "first_name", source: "property", value: "firstname" },
    { extoleKey: "last_name", source: "property", value: "lastname" },
    { extoleKey: "hubspotutk", source: "property", value: "extole_hubspotutk" }
  ];
  const DEAL_DEFAULTS = [
    { extoleKey: "deal_id", source: "property", value: "hs_object_id" },
    { extoleKey: "deal_name", source: "property", value: "dealname" },
    { extoleKey: "amount", source: "property", value: "amount" },
    { extoleKey: "close_date", source: "property", value: "closedate" }
  ];
  const COMPANY_DEFAULTS = [
    { extoleKey: "company_id", source: "property", value: "hs_object_id" },
    { extoleKey: "company_name", source: "property", value: "name" },
    { extoleKey: "domain", source: "property", value: "domain" }
  ];
  const TICKET_DEFAULTS = [
    { extoleKey: "ticket_id", source: "property", value: "hs_object_id" },
    { extoleKey: "subject", source: "property", value: "subject" },
    { extoleKey: "status", source: "property", value: "hs_pipeline_stage" }
  ];
  const QUOTE_DEFAULTS = [
    { extoleKey: "quote_id", source: "property", value: "hs_object_id" },
    { extoleKey: "quote_name", source: "property", value: "hs_title" },
    { extoleKey: "amount", source: "property", value: "hs_total_amount" },
    { extoleKey: "status", source: "property", value: "hs_status" }
  ];
  const DEFAULT_MAPPINGS = {
    contact: CONTACT_DEFAULTS,
    deal: DEAL_DEFAULTS,
    company: COMPANY_DEFAULTS,
    ticket: TICKET_DEFAULTS,
    quote: QUOTE_DEFAULTS
  };
  const OBJECT_TYPE_LABELS = {
    "0-1": "Contact",
    "0-3": "Deal",
    "0-2": "Company",
    "0-5": "Ticket",
    "0-14": "Quote"
  };
  const LOG_ACTION_LABELS = {
    property_created: "Property Created",
    share_link_property_created: "Share Link Property Created",
    share_link_backfill_completed: "Share Link Backfill",
    share_link_backfill_error: "Share Link Backfill Error",
    auto_share_link_enabled: "Auto Share Link Enabled",
    auto_share_link_disabled: "Auto Share Link Disabled",
    workflow_created: "Workflow Created",
    workflow_deleted: "Workflow Deleted",
    workflow_toggled: "Workflow Toggled"
  };
  const BLANK_EVENT_FORM = {
    eventName: "",
    triggerObject: "contact",
    triggerType: "RECORD_CREATED",
    triggerProperty: "",
    triggerToValue: "",
    fieldMappings: [...CONTACT_DEFAULTS]
  };
  const DATE_FORMAT_OPTS = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  function formatDate(isoString, locale) {
    if (!isoString) return "—";
    return new Intl.DateTimeFormat(locale || void 0, DATE_FORMAT_OPTS).format(new Date(isoString));
  }
  function ExtoleSettings({ runServerlessFunction, portalId, locale, actor }) {
    const [hubspotutkStatus, setHubspotutkStatus] = require$$0.useState({ exists: null });
    const [hubspotutkCreating, setHubspotutkCreating] = require$$0.useState(false);
    const [hubspotutkCreateResult, setHubspotutkCreateResult] = require$$0.useState(null);
    const [connectionStatus, setConnectionStatus] = require$$0.useState("unknown");
    const [connectionDetail, setConnectionDetail] = require$$0.useState("");
    const [connectionTesting, setConnectionTesting] = require$$0.useState(false);
    const [workflows, setWorkflows] = require$$0.useState([]);
    const [workflowsError, setWorkflowsError] = require$$0.useState(null);
    const [showEventForm, setShowEventForm] = require$$0.useState(false);
    const [editingWorkflowId, setEditingWorkflowId] = require$$0.useState(null);
    const [eventForm, setEventForm] = require$$0.useState(BLANK_EVENT_FORM);
    const [creatingWorkflow, setCreatingWorkflow] = require$$0.useState(false);
    const [createResult, setCreateResult] = require$$0.useState("");
    const [confirmDeleteId, setConfirmDeleteId] = require$$0.useState(null);
    const [activeTab, setActiveTab] = require$$0.useState("onboarding");
    const [sortCol, setSortCol] = require$$0.useState(null);
    const [sortDir, setSortDir] = require$$0.useState("ascending");
    const [contactTotal, setContactTotal] = require$$0.useState(null);
    const [backfillRunning, setBackfillRunning] = require$$0.useState(false);
    const [backfillProgress, setBackfillProgress] = require$$0.useState(null);
    const [backfillDone, setBackfillDone] = require$$0.useState(false);
    const [campaigns, setCampaigns] = require$$0.useState([]);
    const [campaignsLoading, setCampaignsLoading] = require$$0.useState(false);
    const [campaignsError, setCampaignsError] = require$$0.useState(null);
    const [selectedProgramLabel, setSelectedProgramLabel] = require$$0.useState("");
    const [shareLinkPropertyStatus, setShareLinkPropertyStatus] = require$$0.useState({ exists: null });
    const [shareLinkPropertyCreating, setShareLinkPropertyCreating] = require$$0.useState(false);
    const [shareLinkPropertyCreateResult, setShareLinkPropertyCreateResult] = require$$0.useState(null);
    const [shareLinkBackfillRunning, setShareLinkBackfillRunning] = require$$0.useState(false);
    const [shareLinkBackfillProgress, setShareLinkBackfillProgress] = require$$0.useState(null);
    const [shareLinkBackfillDone, setShareLinkBackfillDone] = require$$0.useState(false);
    const [autoShareEnabled, setAutoShareEnabled] = require$$0.useState(null);
    const [autoShareLoading, setAutoShareLoading] = require$$0.useState(false);
    const [autoShareProgramLabel, setAutoShareProgramLabel] = require$$0.useState("");
    const [autoShareError, setAutoShareError] = require$$0.useState(null);
    const [logEntries, setLogEntries] = require$$0.useState([]);
    const [logLoading, setLogLoading] = require$$0.useState(false);
    const [logError, setLogError] = require$$0.useState(null);
    const [logPageStack, setLogPageStack] = require$$0.useState([]);
    const [logNextAfter, setLogNextAfter] = require$$0.useState(null);
    const [logHasMore, setLogHasMore] = require$$0.useState(false);
    const [clearLogConfirm, setClearLogConfirm] = require$$0.useState(false);
    const [clearLogLoading, setClearLogLoading] = require$$0.useState(false);
    const [hubspotutkProperty, setHubspotutkProperty] = require$$0.useState(DEFAULT_HUBSPOTUTK_PROPERTY);
    const [includeAdvocateCode, setIncludeAdvocateCode] = require$$0.useState(true);
    const [advocateCodeProperty, setAdvocateCodeProperty] = require$$0.useState(DEFAULT_ADVOCATE_CODE_PROPERTY);
    const [referralUrlParam, setReferralUrlParam] = require$$0.useState(DEFAULT_REFERRAL_URL_PARAMS);
    const [formTargeting, setFormTargeting] = require$$0.useState("all");
    const [availableForms, setAvailableForms] = require$$0.useState([]);
    const [availableFormsLoading, setAvailableFormsLoading] = require$$0.useState(false);
    const [selectedFormIds, setSelectedFormIds] = require$$0.useState([]);
    const [advocateCodePropertyStatus, setAdvocateCodePropertyStatus] = require$$0.useState({ exists: null });
    const [advocateCodeCreating, setAdvocateCodeCreating] = require$$0.useState(false);
    const [advocateCodeCreateResult, setAdvocateCodeCreateResult] = require$$0.useState(null);
    const snippet = generateSnippet({
      advocateCodeProperty: includeAdvocateCode ? advocateCodeProperty : "",
      referralUrlParams: referralUrlParam.split(",").map((s) => s.trim()).filter(Boolean),
      formIds: formTargeting === "specific" ? selectedFormIds : []
    });
    const sortedWorkflows = sortCol === null ? workflows : [...workflows].sort((a, b) => {
      let aVal, bVal;
      if (sortCol === "name") {
        aVal = a.eventName;
        bVal = b.eventName;
      } else if (sortCol === "object") {
        aVal = OBJECT_TYPE_LABELS[a.objectTypeId ?? ""] ?? a.objectTypeId ?? "";
        bVal = OBJECT_TYPE_LABELS[b.objectTypeId ?? ""] ?? b.objectTypeId ?? "";
      } else if (sortCol === "status") {
        aVal = a.enabled ? "Active" : "Inactive";
        bVal = b.enabled ? "Active" : "Inactive";
      } else {
        aVal = a.createdAt ?? "";
        bVal = b.createdAt ?? "";
      }
      const cmp = aVal.localeCompare(bVal);
      return sortDir === "ascending" ? cmp : -cmp;
    });
    require$$0.useEffect(() => {
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "getWorkflows" },
        propertiesToSend: []
      }).then((res) => {
        const r = res.response || {};
        if (r.error) setWorkflowsError(r.error);
        setWorkflows(r.workflows ?? []);
        runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "checkProperties", propertyNames: [DEFAULT_HUBSPOTUTK_PROPERTY] },
          propertiesToSend: []
        }).then((res2) => {
          var _a, _b;
          const status = (_b = (_a = res2 == null ? void 0 : res2.response) == null ? void 0 : _a.properties) == null ? void 0 : _b[DEFAULT_HUBSPOTUTK_PROPERTY];
          setHubspotutkStatus(status ?? { exists: false });
        }).catch(() => {
          setHubspotutkStatus({ exists: false });
        });
      }).catch(() => {
        setHubspotutkStatus({ exists: false });
      });
    }, []);
    require$$0.useEffect(() => {
      if (activeTab !== "sharelinks") return;
      if (campaigns.length > 0 || campaignsLoading) return;
      setCampaignsLoading(true);
      setCampaignsError(null);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "getCampaigns" },
        propertiesToSend: []
      }).then((res) => {
        if (!res.response) {
          setCampaignsError("Failed to load campaigns");
          return;
        }
        const r = res.response;
        if (r.error) {
          setCampaignsError(r.error);
          setCampaigns([]);
          return;
        }
        const seen = /* @__PURE__ */ new Set();
        const camps = (r.campaigns ?? []).filter((c) => {
          if (seen.has(c.programLabel)) return false;
          seen.add(c.programLabel);
          return true;
        });
        setCampaigns(camps);
        return runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "checkProperties", propertyNames: [DEFAULT_SHARE_LINK_PROPERTY] },
          propertiesToSend: []
        });
      }).then((res2) => {
        var _a, _b;
        const status = (_b = (_a = res2 == null ? void 0 : res2.response) == null ? void 0 : _a.properties) == null ? void 0 : _b[DEFAULT_SHARE_LINK_PROPERTY];
        setShareLinkPropertyStatus(status ?? { exists: false });
        return runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "getAutoShareLinkStatus" },
          propertiesToSend: []
        });
      }).then((res3) => {
        var _a;
        const w = (_a = res3 == null ? void 0 : res3.response) == null ? void 0 : _a.workflow;
        setAutoShareEnabled(w ? w.enabled : false);
      }).catch(() => {
        setShareLinkPropertyStatus({ exists: false });
        setAutoShareEnabled(false);
      }).finally(() => {
        setCampaignsLoading(false);
      });
    }, [activeTab]);
    require$$0.useEffect(() => {
      if (activeTab !== "forms") return;
      if (advocateCodePropertyStatus.exists === null) {
        runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "checkProperties", propertyNames: [advocateCodeProperty] },
          propertiesToSend: []
        }).then((res) => {
          var _a, _b;
          const status = (_b = (_a = res == null ? void 0 : res.response) == null ? void 0 : _a.properties) == null ? void 0 : _b[advocateCodeProperty];
          setAdvocateCodePropertyStatus(status ?? { exists: false });
        }).catch(() => {
          setAdvocateCodePropertyStatus({ exists: false });
        });
      }
      if (availableForms.length === 0 && !availableFormsLoading) {
        setAvailableFormsLoading(true);
        runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "getForms" },
          propertiesToSend: []
        }).then((res) => {
          var _a;
          setAvailableForms(((_a = res == null ? void 0 : res.response) == null ? void 0 : _a.forms) ?? []);
        }).catch(() => {
          setAvailableForms([]);
        }).finally(() => {
          setAvailableFormsLoading(false);
        });
      }
    }, [activeTab]);
    function fetchLogPage(after) {
      setLogLoading(true);
      setLogError(null);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "createLogSchema" },
        propertiesToSend: []
      }).then((res) => {
        const r = res.response || {};
        if (r.error) {
          setLogError(`Schema init failed: ${r.error}`);
          return null;
        }
        return runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "getLogEntries", ...after ? { after } : {} },
          propertiesToSend: []
        });
      }).then((res) => {
        if (!res) return;
        const r = res.response || {};
        if (r.error) {
          setLogError(r.error);
          return;
        }
        setLogEntries(r.entries ?? []);
        setLogHasMore(r.hasMore ?? false);
        setLogNextAfter(r.nextAfter ?? null);
      }).catch((e) => {
        setLogError((e == null ? void 0 : e.message) ?? "Failed to load log");
      }).finally(() => {
        setLogLoading(false);
      });
    }
    require$$0.useEffect(() => {
      if (activeTab !== "log") return;
      if (logLoading) return;
      setLogPageStack([]);
      fetchLogPage();
    }, [activeTab]);
    function handleLogNextPage() {
      if (!logNextAfter) return;
      setLogPageStack((s) => [...s, logNextAfter]);
      fetchLogPage(logNextAfter);
    }
    function handleLogPrevPage() {
      const stack = [...logPageStack];
      stack.pop();
      const prev = stack[stack.length - 1];
      setLogPageStack(stack);
      fetchLogPage(prev);
    }
    function handleClearLog() {
      setClearLogLoading(true);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "clearLog" },
        propertiesToSend: []
      }).then((res) => {
        const r = res.response || {};
        if (r.error) {
          setLogError(r.error);
          return;
        }
        setLogEntries([]);
        setLogPageStack([]);
        setLogHasMore(false);
        setLogNextAfter(null);
        setClearLogConfirm(false);
      }).catch((e) => {
        setLogError((e == null ? void 0 : e.message) ?? "Failed to clear log");
      }).finally(() => {
        setClearLogLoading(false);
      });
    }
    function handleCheckHubspotutkProperty() {
      if (hubspotutkStatus.exists === null) return;
      setHubspotutkStatus({ exists: null });
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "checkProperties", propertyNames: [DEFAULT_HUBSPOTUTK_PROPERTY] },
        propertiesToSend: []
      }).then((res) => {
        var _a, _b;
        const status = (_b = (_a = res.response) == null ? void 0 : _a.properties) == null ? void 0 : _b[DEFAULT_HUBSPOTUTK_PROPERTY];
        setHubspotutkStatus(status ?? { exists: false });
      }).catch(() => {
        setHubspotutkStatus({ exists: false });
      });
    }
    function handleCreateHubspotutkProperty() {
      setHubspotutkCreating(true);
      setHubspotutkCreateResult(null);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "createProperties", hubspotutkProperty: DEFAULT_HUBSPOTUTK_PROPERTY, advocateCodeProperty: "" },
        propertiesToSend: []
      }).then((res) => {
        const { created = [], errors = [] } = res.response || {};
        setHubspotutkCreating(false);
        if (errors.length === 0) {
          setHubspotutkCreateResult(created.length ? "Property created." : "Property already exists.");
          handleCheckHubspotutkProperty();
        } else {
          setHubspotutkCreateResult(`Error: ${errors[0].error}`);
        }
      }).catch((err) => {
        setHubspotutkCreating(false);
        setHubspotutkCreateResult(`Error: ${err.message}`);
      });
    }
    function handleCreateAdvocateCodeProperty() {
      setAdvocateCodeCreating(true);
      setAdvocateCodeCreateResult(null);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "createProperties", hubspotutkProperty: "", advocateCodeProperty },
        propertiesToSend: []
      }).then((res) => {
        const { created = [], errors = [] } = res.response || {};
        if (errors.length === 0) {
          return runServerlessFunction({
            name: "extole_settings",
            parameters: { action: "checkProperties", propertyNames: [advocateCodeProperty] },
            propertiesToSend: []
          }).then((res2) => {
            var _a, _b;
            const status = (_b = (_a = res2 == null ? void 0 : res2.response) == null ? void 0 : _a.properties) == null ? void 0 : _b[advocateCodeProperty];
            setAdvocateCodePropertyStatus(status ?? { exists: true });
          });
        } else {
          setAdvocateCodeCreateResult(`Error: ${errors[0].error}`);
        }
      }).catch((err) => {
        setAdvocateCodeCreateResult(`Error: ${err.message}`);
      }).finally(() => {
        setAdvocateCodeCreating(false);
      });
    }
    function handleTestConnection() {
      setConnectionTesting(true);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "testConnection" },
        propertiesToSend: []
      }).then((res) => {
        const r = res.response;
        setConnectionStatus((r == null ? void 0 : r.connected) ? "ok" : "error");
        setConnectionDetail((r == null ? void 0 : r.connected) ? "" : `status=${(r == null ? void 0 : r.status) ?? "unknown"} error=${(r == null ? void 0 : r.error) ?? "none"} prefix=${(r == null ? void 0 : r.tokenPrefix) ?? "n/a"}`);
      }).catch((err) => {
        setConnectionStatus("error");
        setConnectionDetail((err == null ? void 0 : err.message) ?? "function call failed");
      }).finally(() => {
        setConnectionTesting(false);
      });
    }
    function handleLoadContactCount() {
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "getContactCount" },
        propertiesToSend: []
      }).then((res) => {
        var _a;
        setContactTotal(((_a = res.response) == null ? void 0 : _a.total) ?? null);
      });
    }
    async function handleRunBackfill() {
      setBackfillRunning(true);
      setBackfillDone(false);
      setBackfillProgress({ enrolled: 0, skipped: 0, errors: 0 });
      let cursor = null;
      let totalEnrolled = 0, totalSkipped = 0, totalErrors = 0;
      while (true) {
        const res = await runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "runBackfillBatch", cursor, hubspotutkProperty },
          propertiesToSend: []
        });
        const batch = res.response || {};
        totalEnrolled += batch.enrolled || 0;
        totalSkipped += batch.skipped || 0;
        totalErrors += (batch.errors || []).length;
        cursor = batch.cursor || null;
        setBackfillProgress({ enrolled: totalEnrolled, skipped: totalSkipped, errors: totalErrors });
        if (batch.done || !cursor) break;
      }
      setBackfillRunning(false);
      setBackfillDone(true);
    }
    function handleCreateShareLinkProperty() {
      setShareLinkPropertyCreating(true);
      setShareLinkPropertyCreateResult(null);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "createShareLinkProperty", propertyName: DEFAULT_SHARE_LINK_PROPERTY, actor },
        propertiesToSend: []
      }).then((res) => {
        const { created = [], errors = [] } = res.response || {};
        if (errors.length === 0) {
          setShareLinkPropertyCreateResult(created.length ? "Property created." : "Property already exists.");
          runServerlessFunction({
            name: "extole_settings",
            parameters: { action: "checkProperties", propertyNames: [DEFAULT_SHARE_LINK_PROPERTY] },
            propertiesToSend: []
          }).then((res2) => {
            var _a, _b;
            const status = (_b = (_a = res2 == null ? void 0 : res2.response) == null ? void 0 : _a.properties) == null ? void 0 : _b[DEFAULT_SHARE_LINK_PROPERTY];
            setShareLinkPropertyStatus(status ?? { exists: false });
          });
        } else {
          setShareLinkPropertyCreateResult(`Error: ${errors[0].error}`);
        }
      }).catch((err) => {
        setShareLinkPropertyCreateResult(`Error: ${err.message}`);
      }).finally(() => {
        setShareLinkPropertyCreating(false);
      });
    }
    function handleToggleAutoShare(enable) {
      setAutoShareLoading(true);
      setAutoShareError(null);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "toggleAutoShareLink", enable, programLabel: autoShareProgramLabel, actor },
        propertiesToSend: []
      }).then((res) => {
        var _a, _b;
        if ((_a = res.response) == null ? void 0 : _a.error) {
          setAutoShareError(res.response.error);
          return;
        }
        setAutoShareEnabled(((_b = res.response) == null ? void 0 : _b.enabled) ?? enable);
      }).catch((e) => setAutoShareError(String(e))).finally(() => setAutoShareLoading(false));
    }
    async function handleRunShareLinkBackfill() {
      setShareLinkBackfillRunning(true);
      setShareLinkBackfillDone(false);
      setShareLinkBackfillProgress({ created: 0, existing: 0, skipped: 0, errors: 0 });
      let cursor = null;
      let totalCreated = 0, totalExisting = 0, totalSkipped = 0, totalErrors = 0;
      while (true) {
        const res = await runServerlessFunction({
          name: "extole_settings",
          parameters: {
            action: "runShareLinkBackfillBatch",
            cursor,
            programLabel: selectedProgramLabel,
            shareLinkProperty: DEFAULT_SHARE_LINK_PROPERTY,
            actor
          },
          propertiesToSend: []
        });
        const batch = res.response || {};
        totalCreated += batch.created || 0;
        totalExisting += batch.existing || 0;
        totalSkipped += batch.skipped || 0;
        const batchErrors = batch.errors || [];
        totalErrors += batchErrors.length;
        cursor = batch.cursor || null;
        setShareLinkBackfillProgress({ created: totalCreated, existing: totalExisting, skipped: totalSkipped, errors: totalErrors });
        if (batch.done || !cursor) break;
      }
      setShareLinkBackfillRunning(false);
      setShareLinkBackfillDone(true);
    }
    function handleLoadWorkflows() {
      setWorkflowsError(null);
      setWorkflows([]);
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "getWorkflows" },
        propertiesToSend: []
      }).then((res) => {
        const r = res.response || {};
        if (r.error) setWorkflowsError(r.error);
        setWorkflows(r.workflows ?? []);
      }).catch(() => {
        setWorkflowsError("Failed to load workflows");
      });
    }
    function handleToggleWorkflow(flowId, enabled) {
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "toggleWorkflow", flowId, enabled, actor },
        propertiesToSend: []
      }).then(() => handleLoadWorkflows());
    }
    function handleDeleteWorkflow(flowId, workflowName) {
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "deleteWorkflow", flowId, workflowName, actor },
        propertiesToSend: []
      }).then(() => {
        setConfirmDeleteId(null);
        handleLoadWorkflows();
      });
    }
    function handleEditWorkflow(w) {
      setEditingWorkflowId(w.id);
      setShowEventForm(true);
      setCreateResult("Loading...");
      runServerlessFunction({
        name: "extole_settings",
        parameters: { action: "getWorkflowConfig", flowId: w.id },
        propertiesToSend: []
      }).then((res) => {
        var _a;
        const cfg = (_a = res.response) == null ? void 0 : _a.config;
        setEventForm({
          eventName: (cfg == null ? void 0 : cfg.eventName) ?? w.eventName,
          triggerObject: (cfg == null ? void 0 : cfg.triggerObject) ?? "contact",
          triggerType: (cfg == null ? void 0 : cfg.triggerType) ?? "RECORD_CREATED",
          triggerProperty: (cfg == null ? void 0 : cfg.triggerProperty) ?? "",
          triggerToValue: (cfg == null ? void 0 : cfg.triggerToValue) ?? "",
          fieldMappings: (cfg == null ? void 0 : cfg.fieldMappings) ?? [...CONTACT_DEFAULTS]
        });
        setCreateResult("");
      }).catch(() => {
        setEventForm({ ...BLANK_EVENT_FORM, eventName: w.eventName });
        setCreateResult("");
      });
    }
    function closeEventForm() {
      setShowEventForm(false);
      setEditingWorkflowId(null);
      setEventForm(BLANK_EVENT_FORM);
      setCreateResult("");
    }
    function handleCreateEventWorkflow(enabled) {
      setCreatingWorkflow(true);
      setCreateResult("");
      runServerlessFunction({
        name: "extole_settings",
        parameters: {
          action: "createWorkflow",
          eventName: eventForm.eventName,
          triggerObject: eventForm.triggerObject,
          triggerType: eventForm.triggerType,
          triggerProperty: eventForm.triggerProperty || void 0,
          triggerToValue: eventForm.triggerToValue || void 0,
          fieldMappings: eventForm.fieldMappings,
          enabled,
          actor
        },
        propertiesToSend: []
      }).then((res) => {
        var _a, _b;
        if ((_a = res.response) == null ? void 0 : _a.error) {
          setCreateResult(`Error: ${res.response.error}`);
        } else {
          setCreateResult(`Created "${(_b = res.response) == null ? void 0 : _b.name}".`);
          closeEventForm();
          handleLoadWorkflows();
        }
      }).catch((err) => setCreateResult(`Error: ${err.message}`)).finally(() => setCreatingWorkflow(false));
    }
    function handleUpdateEventWorkflow() {
      if (!editingWorkflowId) return;
      setCreatingWorkflow(true);
      setCreateResult("");
      runServerlessFunction({
        name: "extole_settings",
        parameters: {
          action: "updateWorkflow",
          flowId: editingWorkflowId,
          eventName: eventForm.eventName,
          triggerObject: eventForm.triggerObject,
          triggerType: eventForm.triggerType,
          triggerProperty: eventForm.triggerProperty || void 0,
          triggerToValue: eventForm.triggerToValue || void 0,
          fieldMappings: eventForm.fieldMappings
        },
        propertiesToSend: []
      }).then((res) => {
        var _a, _b;
        if ((_a = res.response) == null ? void 0 : _a.error) {
          setCreateResult(`Error: ${res.response.error}`);
        } else {
          setCreateResult(`Saved "${(_b = res.response) == null ? void 0 : _b.name}".`);
          closeEventForm();
          handleLoadWorkflows();
        }
      }).catch((err) => setCreateResult(`Error: ${err.message}`)).finally(() => setCreatingWorkflow(false));
    }
    return /* @__PURE__ */ React.createElement(Form, null, /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "extra-small" }, /* @__PURE__ */ React.createElement(Button, { variant: activeTab === "onboarding" ? void 0 : "transparent", onClick: () => setActiveTab("onboarding") }, "Onboarding"), /* @__PURE__ */ React.createElement(Button, { variant: activeTab === "events" ? void 0 : "transparent", onClick: () => setActiveTab("events") }, "Event Configuration"), /* @__PURE__ */ React.createElement(Button, { variant: activeTab === "forms" ? void 0 : "transparent", onClick: () => setActiveTab("forms") }, "Form Instrumentation"), /* @__PURE__ */ React.createElement(Button, { variant: activeTab === "sharelinks" ? void 0 : "transparent", onClick: () => setActiveTab("sharelinks") }, "Share Links"), /* @__PURE__ */ React.createElement(Button, { variant: activeTab === "log" ? void 0 : "transparent", onClick: () => setActiveTab("log") }, "Log")), /* @__PURE__ */ React.createElement(Divider, null), activeTab === "onboarding" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Step 1: Create Contact Property"), /* @__PURE__ */ React.createElement(Text, null, "Creates the extole_hubspotutk property on Contacts. This stores the HubSpot visitor cookie at form submission and is used by both Form Instrumentation and Event Configuration workflows."), /* @__PURE__ */ React.createElement(Spacer, null), hubspotutkStatus.exists === null ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Checking...", showLabel: true }) : hubspotutkStatus.exists ? /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small", align: "center" }, /* @__PURE__ */ React.createElement(StatusTag, { variant: "success" }, "Created ", formatDate(hubspotutkStatus.createdAt, locale)), /* @__PURE__ */ React.createElement(Button, { onClick: handleCheckHubspotutkProperty, variant: "transparent" }, "Refresh")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { onClick: handleCreateHubspotutkProperty, disabled: hubspotutkCreating }, hubspotutkCreating ? "Creating..." : "Create Property"), hubspotutkCreateResult && /* @__PURE__ */ React.createElement(Text, null, hubspotutkCreateResult)), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Heading, null, "Step 2: Enroll Existing Contacts"), /* @__PURE__ */ React.createElement(Text, null, "Registers your existing HubSpot contacts with Extole so they can participate in referral programs immediately. Safe to re-run — Extole's register call is idempotent."), contactTotal !== null && /* @__PURE__ */ React.createElement(Text, null, contactTotal.toLocaleString(), " contacts to enroll"), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small", align: "center" }, /* @__PURE__ */ React.createElement(Button, { onClick: handleLoadContactCount, disabled: backfillRunning }, "Count Contacts"), /* @__PURE__ */ React.createElement(Button, { onClick: handleRunBackfill, disabled: backfillRunning, variant: "primary" }, backfillRunning ? "Enrolling..." : "Enroll Contacts")), backfillRunning && /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Enrolling contacts...", showLabel: true }), backfillProgress && /* @__PURE__ */ React.createElement(Text, null, "Enrolled: ", backfillProgress.enrolled, " | Skipped: ", backfillProgress.skipped, " | Errors: ", backfillProgress.errors), backfillDone && /* @__PURE__ */ React.createElement(Text, null, "Enrollment complete."), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Heading, null, "Step 3: Add CRM Cards"), /* @__PURE__ */ React.createElement(Text, null, "Add the Extole card to your Contact and Deal record pages so your team can see referral activity inline within HubSpot CRM."), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Link, { href: { url: `https://app.hubspot.com/connected-apps/${portalId}/cards`, external: true } }, "Open App Cards settings →")), activeTab === "events" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Extole Connection"), /* @__PURE__ */ React.createElement(Text, null, "Verify your Extole API token is configured and reachable."), /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small", align: "center" }, /* @__PURE__ */ React.createElement(Button, { onClick: handleTestConnection, disabled: connectionTesting }, connectionTesting ? "Testing..." : "Test Connection"), connectionStatus === "ok" && /* @__PURE__ */ React.createElement(StatusTag, { variant: "success" }, "Connection functioning properly"), connectionStatus === "error" && /* @__PURE__ */ React.createElement(StatusTag, { variant: "danger" }, connectionDetail || "Check EXTOLE_API_TOKEN secret")), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Heading, null, "Workflows"), /* @__PURE__ */ React.createElement(Text, null, "Create HubSpot Workflows that fire events to Extole. Choose any event name your Extole program expects, pick a trigger object, and map HubSpot properties to Extole data fields. Workflows are pre-wired with the correct endpoint and auth."), workflowsError && /* @__PURE__ */ React.createElement(StatusTag, { variant: "danger" }, workflowsError), /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small", align: "center" }, !workflowsError && workflows.length === 0 && /* @__PURE__ */ React.createElement(Text, null, "No Extole workflows found."), /* @__PURE__ */ React.createElement(Button, { onClick: handleLoadWorkflows, variant: "transparent" }, "Refresh")), workflows.length > 0 && /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHead, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(
      TableHeader,
      {
        sortDirection: sortCol === "name" ? sortDir : "none",
        onSortChange: (dir) => {
          setSortCol("name");
          setSortDir(dir);
        }
      },
      "Extole Event"
    ), /* @__PURE__ */ React.createElement(
      TableHeader,
      {
        sortDirection: sortCol === "object" ? sortDir : "none",
        onSortChange: (dir) => {
          setSortCol("object");
          setSortDir(dir);
        }
      },
      "Object"
    ), /* @__PURE__ */ React.createElement(
      TableHeader,
      {
        sortDirection: sortCol === "status" ? sortDir : "none",
        onSortChange: (dir) => {
          setSortCol("status");
          setSortDir(dir);
        }
      },
      "Status"
    ), /* @__PURE__ */ React.createElement(
      TableHeader,
      {
        sortDirection: sortCol === "created" ? sortDir : "none",
        onSortChange: (dir) => {
          setSortCol("created");
          setSortDir(dir);
        }
      },
      "Created"
    ), /* @__PURE__ */ React.createElement(TableHeader, null, "Actions"))), /* @__PURE__ */ React.createElement(TableBody, null, sortedWorkflows.map((w) => /* @__PURE__ */ React.createElement(TableRow, { key: w.id }, /* @__PURE__ */ React.createElement(TableCell, null, w.eventName), /* @__PURE__ */ React.createElement(TableCell, null, OBJECT_TYPE_LABELS[w.objectTypeId ?? ""] ?? w.objectTypeId ?? "Unknown"), /* @__PURE__ */ React.createElement(TableCell, null, w.status === "DRAFT" ? "Draft" : w.enabled ? "Active" : "Inactive"), /* @__PURE__ */ React.createElement(TableCell, null, formatDate(w.createdAt, locale)), /* @__PURE__ */ React.createElement(TableCell, null, confirmDeleteId === w.id ? /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "extra-small", align: "center" }, /* @__PURE__ */ React.createElement(Button, { onClick: () => handleDeleteWorkflow(w.id, w.name), variant: "destructive" }, "Confirm delete"), /* @__PURE__ */ React.createElement(Button, { onClick: () => setConfirmDeleteId(null) }, "Cancel")) : /* @__PURE__ */ React.createElement(Dropdown, { variant: "transparent" }, /* @__PURE__ */ React.createElement(Dropdown.ButtonItem, { onClick: () => handleEditWorkflow(w) }, "Edit"), /* @__PURE__ */ React.createElement(Dropdown.ButtonItem, null, /* @__PURE__ */ React.createElement(Link, { href: { url: `https://app.hubspot.com/workflows/${portalId}/platform/flow/${w.id}/edit`, external: true } }, "Open Workflow")), w.enabled ? /* @__PURE__ */ React.createElement(Dropdown.ButtonItem, { onClick: () => handleToggleWorkflow(w.id, false) }, "Deactivate") : /* @__PURE__ */ React.createElement(Dropdown.ButtonItem, { onClick: () => handleToggleWorkflow(w.id, true) }, "Activate"), /* @__PURE__ */ React.createElement(Dropdown.ButtonItem, { onClick: () => setConfirmDeleteId(w.id) }, "Delete"))))))), !showEventForm ? /* @__PURE__ */ React.createElement(React.Fragment, null, createResult && /* @__PURE__ */ React.createElement(Text, null, createResult), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Button, { onClick: () => {
      setShowEventForm(true);
      setCreateResult("");
    } }, "+ Add Event")) : /* @__PURE__ */ React.createElement(
      EventForm,
      {
        form: eventForm,
        onChange: setEventForm,
        onSubmit: editingWorkflowId ? () => handleUpdateEventWorkflow() : handleCreateEventWorkflow,
        onCancel: closeEventForm,
        creating: creatingWorkflow,
        createResult,
        isEditing: !!editingWorkflowId,
        onValidateProperty: (objectType, propertyName) => runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "validateProperty", objectType, propertyName },
          propertiesToSend: []
        }).then((res) => {
          var _a;
          return ((_a = res.response) == null ? void 0 : _a.valid) ?? false;
        }).catch(() => false),
        onLoadObjectTypes: () => runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "getObjectTypes" },
          propertiesToSend: []
        }).then((res) => {
          var _a;
          return ((_a = res.response) == null ? void 0 : _a.objectTypes) ?? [];
        }).catch(() => []),
        onLoadObjectProperties: (objectType) => runServerlessFunction({
          name: "extole_settings",
          parameters: { action: "getObjectProperties", objectType },
          propertiesToSend: []
        }).then((res) => {
          var _a, _b;
          if ((_a = res.response) == null ? void 0 : _a.error) throw new Error(res.response.error);
          return ((_b = res.response) == null ? void 0 : _b.properties) ?? [];
        })
      }
    )), activeTab === "forms" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Form Instrumentation"), /* @__PURE__ */ React.createElement(Text, null, "Captures the referral advocate code at form submission and stores it on the Contact for Extole attribution. Before deploying the snippet, add extole_advocate_code as a hidden field on each form you want to instrument in HubSpot's form builder. Skip this section if you're using server-side identity resolution or don't need form-based attribution."), /* @__PURE__ */ React.createElement(
      Toggle,
      {
        name: "includeAdvocateCode",
        label: "Capture advocate code",
        checked: includeAdvocateCode,
        onChange: (val) => setIncludeAdvocateCode(val)
      }
    ), /* @__PURE__ */ React.createElement(Text, null, "Reads the referral code from the URL param and stores it on the Contact for HubSpot reporting."), includeAdvocateCode && /* @__PURE__ */ React.createElement(Flex, { direction: "row" }, /* @__PURE__ */ React.createElement(Box, { flex: "none" }, /* @__PURE__ */ React.createElement(Text, null, "      ")), /* @__PURE__ */ React.createElement(Box, { flex: 1 }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Advocate code Contact property",
        name: "advocateCodeProperty",
        value: advocateCodeProperty,
        onChange: (val) => setAdvocateCodeProperty(val)
      }
    ), /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Advocate code URL parameter(s)",
        name: "referralUrlParam",
        value: referralUrlParam,
        onChange: (val) => setReferralUrlParam(val),
        description: "Comma-separated URL params to check, in order. First match wins. Confirm with your Extole implementation team."
      }
    ))), includeAdvocateCode && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Spacer, null), advocateCodePropertyStatus.exists === null ? /* @__PURE__ */ React.createElement(Text, null, "Checking property...") : advocateCodePropertyStatus.exists ? /* @__PURE__ */ React.createElement(Text, null, advocateCodeProperty, " — Created ", formatDate(advocateCodePropertyStatus.createdAt, locale)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { onClick: handleCreateAdvocateCodeProperty, disabled: advocateCodeCreating }, advocateCodeCreating ? "Creating..." : "Create Property"), advocateCodeCreateResult && /* @__PURE__ */ React.createElement(Text, null, advocateCodeCreateResult))), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Form targeting",
        name: "formTargeting",
        value: formTargeting,
        onChange: (val) => setFormTargeting(val),
        options: [
          { label: "All Embedded Forms", value: "all" },
          { label: "Specific forms", value: "specific" }
        ]
      }
    ), formTargeting === "specific" && /* @__PURE__ */ React.createElement(React.Fragment, null, availableFormsLoading ? /* @__PURE__ */ React.createElement(Text, null, "Loading forms...") : /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Add a form",
        name: "addForm",
        value: "",
        onChange: (val) => {
          if (val && !selectedFormIds.includes(val)) {
            setSelectedFormIds([...selectedFormIds, val]);
          }
        },
        options: [
          { label: "— select a form —", value: "" },
          ...availableForms.filter((f) => !selectedFormIds.includes(f.id)).map((f) => ({ label: f.name, value: f.id }))
        ]
      }
    ), selectedFormIds.length > 0 && /* @__PURE__ */ React.createElement(Box, null, selectedFormIds.map((id) => {
      const form = availableForms.find((f) => f.id === id);
      return /* @__PURE__ */ React.createElement(Flex, { key: id, direction: "row", justify: "between", align: "center" }, /* @__PURE__ */ React.createElement(Text, null, form ? form.name : id, " ", /* @__PURE__ */ React.createElement(Text, { format: { color: "medium" } }, "(", id, ")")), /* @__PURE__ */ React.createElement(
        Button,
        {
          variant: "transparent",
          onClick: () => setSelectedFormIds(selectedFormIds.filter((fid) => fid !== id))
        },
        "Remove"
      ));
    })), selectedFormIds.length === 0 && !availableFormsLoading && /* @__PURE__ */ React.createElement(Text, { format: { color: "medium" } }, "No forms selected — snippet will not instrument any forms.")), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Text, { format: { fontWeight: "bold" } }, "Generated Snippet"), /* @__PURE__ */ React.createElement(Text, null, "Copy this snippet and embed it on your site, after the HubSpot tracking script. Works with both classic (v2) and new form builder (v3) embeds."), /* @__PURE__ */ React.createElement(
      TextArea,
      {
        label: "",
        name: "snippet",
        value: snippet,
        readOnly: true,
        rows: 12
      }
    )), activeTab === "sharelinks" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Create Share Link Property"), /* @__PURE__ */ React.createElement(Text, null, "Creates the Extole Share Link property on Contacts. Share links are written here after generation and can be used in HubSpot emails and reporting."), /* @__PURE__ */ React.createElement(Spacer, null), shareLinkPropertyStatus.exists === null ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Checking...", showLabel: true }) : shareLinkPropertyStatus.exists ? /* @__PURE__ */ React.createElement(StatusTag, { variant: "success" }, DEFAULT_SHARE_LINK_PROPERTY, " — Created ", formatDate(shareLinkPropertyStatus.createdAt, locale)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { onClick: handleCreateShareLinkProperty, disabled: shareLinkPropertyCreating }, shareLinkPropertyCreating ? "Creating..." : "Create Property"), shareLinkPropertyCreateResult && /* @__PURE__ */ React.createElement(Text, null, shareLinkPropertyCreateResult)), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Heading, null, "Auto-generate Share Links for New Contacts"), /* @__PURE__ */ React.createElement(Text, null, "Generate a share link using Extole whenever a new contact is created in HubSpot, and save that link to the Extole Share Link property automatically."), /* @__PURE__ */ React.createElement(Spacer, null), autoShareEnabled === null ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Checking status...", showLabel: true }) : /* @__PURE__ */ React.createElement(
      Toggle,
      {
        label: autoShareEnabled ? "Enabled" : "Disabled",
        name: "autoShare",
        checked: autoShareEnabled,
        onChange: (val) => handleToggleAutoShare(val),
        disabled: autoShareLoading
      }
    ), autoShareError && /* @__PURE__ */ React.createElement(StatusTag, { variant: "danger" }, autoShareError), autoShareEnabled && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Spacer, null), campaignsLoading ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Loading...", showLabel: true }) : campaignsError ? /* @__PURE__ */ React.createElement(StatusTag, { variant: "danger" }, campaignsError) : /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Campaign Targeting Label (optional)",
        name: "autoShareCampaign",
        value: autoShareProgramLabel,
        onChange: (val) => setAutoShareProgramLabel(val),
        options: [{ label: "None", value: "" }, ...campaigns.map((c) => ({ label: c.name, value: c.programLabel }))]
      }
    )), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Heading, null, "Generate Share Links for Existing HubSpot Contacts"), /* @__PURE__ */ React.createElement(Text, null, "Run once to generate share links for contacts already in HubSpot. Safe to re-run — contacts who already have a link are updated in place."), /* @__PURE__ */ React.createElement(Spacer, null), campaignsLoading ? null : campaignsError ? null : /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Campaign Targeting Label (optional)",
        name: "backfillCampaign",
        value: selectedProgramLabel,
        onChange: (val) => setSelectedProgramLabel(val),
        options: [{ label: "None", value: "" }, ...campaigns.map((c) => ({ label: c.name, value: c.programLabel }))]
      }
    ), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: handleRunShareLinkBackfill,
        disabled: shareLinkBackfillRunning,
        variant: "primary"
      },
      shareLinkBackfillRunning ? "Generating..." : "Generate Share Links"
    ), shareLinkBackfillRunning && /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Generating share links...", showLabel: true }), shareLinkBackfillProgress && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, null, "Created: ", shareLinkBackfillProgress.created, " | Already had link: ", shareLinkBackfillProgress.existing, " | Skipped: ", shareLinkBackfillProgress.skipped, " | Errors: ", shareLinkBackfillProgress.errors)), shareLinkBackfillDone && /* @__PURE__ */ React.createElement(Text, null, "Share link generation complete.")), activeTab === "log" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Heading, null, "Activity Log"), /* @__PURE__ */ React.createElement(Text, null, "Recent actions performed in this app, newest first."), /* @__PURE__ */ React.createElement(Spacer, null), logLoading ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Loading...", showLabel: true }) : logError ? /* @__PURE__ */ React.createElement(StatusTag, { variant: "danger" }, logError) : logEntries.length === 0 ? /* @__PURE__ */ React.createElement(Text, null, "No activity logged yet.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHead, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableHeader, null, "When"), /* @__PURE__ */ React.createElement(TableHeader, null, "Action"), /* @__PURE__ */ React.createElement(TableHeader, null, "User"), /* @__PURE__ */ React.createElement(TableHeader, null, "Details"), /* @__PURE__ */ React.createElement(TableHeader, null, "Status"))), /* @__PURE__ */ React.createElement(TableBody, null, logEntries.map((entry) => /* @__PURE__ */ React.createElement(TableRow, { key: entry.id }, /* @__PURE__ */ React.createElement(TableCell, null, formatDate(entry.timestamp, locale)), /* @__PURE__ */ React.createElement(TableCell, null, LOG_ACTION_LABELS[entry.action] ?? entry.action), /* @__PURE__ */ React.createElement(TableCell, null, entry.actor), /* @__PURE__ */ React.createElement(TableCell, null, entry.details), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(StatusTag, { variant: entry.status === "success" ? "success" : "danger" }, entry.status === "success" ? "Success" : "Error")))))), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small" }, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: handleLogPrevPage, disabled: logPageStack.length === 0 || logLoading }, "← Prev"), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: handleLogNextPage, disabled: !logHasMore || logLoading }, "Next →"), clearLogConfirm ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "destructive", onClick: handleClearLog, disabled: clearLogLoading }, clearLogLoading ? "Clearing..." : "Confirm Clear"), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: () => setClearLogConfirm(false), disabled: clearLogLoading }, "Cancel")) : /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: () => setClearLogConfirm(true) }, "Clear Log")))));
  }
  function EventForm({
    form,
    onChange,
    onSubmit,
    onCancel,
    creating,
    createResult,
    isEditing,
    onValidateProperty,
    onLoadObjectTypes,
    onLoadObjectProperties
  }) {
    const [propErrors, setPropErrors] = require$$0.useState({});
    const [triggerFieldError, setTriggerFieldError] = require$$0.useState(false);
    const [objectTypes, setObjectTypes] = require$$0.useState([
      { value: "contact", label: "Contact", objectTypeId: "0-1" },
      { value: "deal", label: "Deal", objectTypeId: "0-3" }
    ]);
    require$$0.useEffect(() => {
      if (onLoadObjectTypes) {
        onLoadObjectTypes().then((types) => {
          if (types.length) setObjectTypes(types);
        }).catch(() => {
        });
      }
    }, []);
    const [objectProperties, setObjectProperties] = require$$0.useState([]);
    const [propertiesLoading, setPropertiesLoading] = require$$0.useState(false);
    const [propertiesError, setPropertiesError] = require$$0.useState("");
    require$$0.useEffect(() => {
      const needsProperty = form.triggerType === "FIELD_CHANGED" || form.triggerType === "FIELD_VALUE";
      if (!needsProperty || !onLoadObjectProperties || !form.triggerObject) return;
      setPropertiesLoading(true);
      setPropertiesError("");
      onLoadObjectProperties(form.triggerObject).then((props) => setObjectProperties(props)).catch((e) => {
        setObjectProperties([]);
        setPropertiesError(String(e));
      }).finally(() => setPropertiesLoading(false));
    }, [form.triggerObject, form.triggerType]);
    function setTriggerObject(v) {
      const defaults = DEFAULT_MAPPINGS[v] ? [...DEFAULT_MAPPINGS[v]] : [];
      onChange({ ...form, triggerObject: v, triggerProperty: "", fieldMappings: defaults });
      setPropErrors({});
      setTriggerFieldError(false);
    }
    function setTriggerType(v) {
      onChange({ ...form, triggerType: v, triggerProperty: "", triggerToValue: "" });
      setTriggerFieldError(false);
    }
    async function validateTriggerField(propertyName) {
      if (!onValidateProperty || !propertyName.trim()) return;
      const valid = await onValidateProperty(form.triggerObject, propertyName.trim());
      setTriggerFieldError(!valid);
    }
    function updateMapping(index, field, value) {
      const updated = form.fieldMappings.map((m, i) => i === index ? { ...m, [field]: value } : m);
      onChange({ ...form, fieldMappings: updated });
      if (field === "source" || field === "value" && !value) {
        setPropErrors((prev) => {
          const n = { ...prev };
          delete n[index];
          return n;
        });
      }
    }
    function addMapping() {
      onChange({ ...form, fieldMappings: [...form.fieldMappings, { extoleKey: "", source: "property", value: "" }] });
    }
    function removeMapping(index) {
      onChange({ ...form, fieldMappings: form.fieldMappings.filter((_, i) => i !== index) });
      setPropErrors((prev) => {
        const n = {};
        Object.entries(prev).forEach(([k, v]) => {
          const ki = Number(k);
          if (ki < index) n[ki] = v;
          else if (ki > index) n[ki - 1] = v;
        });
        return n;
      });
    }
    async function validatePropertyAt(index, propertyName) {
      if (!onValidateProperty || !propertyName.trim()) return;
      const valid = await onValidateProperty(form.triggerObject, propertyName.trim());
      setPropErrors((prev) => ({ ...prev, [index]: !valid }));
    }
    const canSubmit = !!form.eventName.trim() && !creating;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Event name",
        name: "eventName",
        value: form.eventName,
        onChange: (v) => onChange({ ...form, eventName: v }),
        placeholder: "e.g. purchase, referral_sent, account_upgrade",
        description: "The exact Extole event name your program expects."
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Trigger object",
        name: "triggerObject",
        value: form.triggerObject,
        onChange: setTriggerObject,
        options: objectTypes.map((o) => ({ label: o.label, value: o.value }))
      }
    ), /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Trigger",
        name: "triggerType",
        value: form.triggerType,
        onChange: setTriggerType,
        options: [
          { label: "Record created", value: "RECORD_CREATED" },
          { label: "Field changed", value: "FIELD_CHANGED" },
          { label: "Field changed to value", value: "FIELD_VALUE" }
        ],
        description: form.triggerType === "RECORD_CREATED" ? "Fires once when a new record is created." : form.triggerType === "FIELD_CHANGED" ? "Fires each time the selected property changes to any value." : "Fires when the selected property changes to a specific value (e.g. dealstage → closedwon)."
      }
    ), (form.triggerType === "FIELD_CHANGED" || form.triggerType === "FIELD_VALUE") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Spacer, null), propertiesLoading ? /* @__PURE__ */ React.createElement(LoadingSpinner, { label: "Loading fields..." }) : propertiesError ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Field",
        name: "triggerProperty",
        value: form.triggerProperty,
        onChange: (v) => {
          onChange({ ...form, triggerProperty: v });
          setTriggerFieldError(false);
        },
        onBlur: (v) => validateTriggerField(v),
        placeholder: form.triggerObject === "deal" ? "e.g. dealstage" : form.triggerObject === "contact" ? "e.g. lifecyclestage" : "e.g. hs_pipeline_stage",
        error: triggerFieldError,
        validationMessage: triggerFieldError ? "Field not found in HubSpot" : void 0
      }
    )) : objectProperties.length > 0 ? /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Field",
        name: "triggerProperty",
        value: form.triggerProperty,
        onChange: (v) => {
          onChange({ ...form, triggerProperty: v });
          setTriggerFieldError(false);
        },
        options: objectProperties.map((p) => ({ label: `${p.label} (${p.value})`, value: p.value }))
      }
    ) : /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Field",
        name: "triggerProperty",
        value: form.triggerProperty,
        onChange: (v) => {
          onChange({ ...form, triggerProperty: v });
          setTriggerFieldError(false);
        },
        onBlur: (v) => validateTriggerField(v),
        placeholder: form.triggerObject === "deal" ? "e.g. dealstage" : form.triggerObject === "contact" ? "e.g. lifecyclestage" : "e.g. hs_pipeline_stage",
        error: triggerFieldError,
        validationMessage: triggerFieldError ? "Field not found in HubSpot" : void 0
      }
    )), form.triggerType === "FIELD_VALUE" && (() => {
      const selectedProp = objectProperties.find((p) => p.value === form.triggerProperty);
      const opts = (selectedProp == null ? void 0 : selectedProp.options) ?? [];
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Spacer, null), opts.length > 0 ? /* @__PURE__ */ React.createElement(
        Select,
        {
          label: "Value",
          name: "triggerToValue",
          value: form.triggerToValue,
          onChange: (v) => onChange({ ...form, triggerToValue: v }),
          options: opts
        }
      ) : /* @__PURE__ */ React.createElement(
        Input,
        {
          label: "Value",
          name: "triggerToValue",
          value: form.triggerToValue,
          onChange: (v) => onChange({ ...form, triggerToValue: v }),
          placeholder: "e.g. closedwon"
        }
      ));
    })(), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(Text, { format: { fontWeight: "bold" } }, "Field Mappings"), /* @__PURE__ */ React.createElement(Text, null, "Map Extole parameter names to HubSpot property internal names. Use the internal name exactly as it appears in HubSpot (e.g. email, firstname, hs_object_id). Static values are passed through as literals."), form.fieldMappings.map((mapping, i) => /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small", align: "end", key: i }, /* @__PURE__ */ React.createElement(Box, { flex: 2 }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: "Extole parameter",
        name: `ek_${i}`,
        value: mapping.extoleKey,
        onChange: (v) => updateMapping(i, "extoleKey", v),
        placeholder: "e.g. email"
      }
    )), /* @__PURE__ */ React.createElement(Box, { flex: 1 }, /* @__PURE__ */ React.createElement(
      Select,
      {
        label: "Source",
        name: `src_${i}`,
        value: mapping.source,
        onChange: (v) => updateMapping(i, "source", v),
        options: [
          { label: "Property", value: "property" },
          { label: "Static", value: "static" }
        ]
      }
    )), /* @__PURE__ */ React.createElement(Box, { flex: 2 }, /* @__PURE__ */ React.createElement(
      Input,
      {
        label: mapping.source === "property" ? "HubSpot property" : "Static value",
        name: `val_${i}`,
        value: mapping.value,
        onChange: (v) => updateMapping(i, "value", v),
        onBlur: (v) => {
          if (mapping.source === "property") validatePropertyAt(i, v);
        },
        placeholder: mapping.source === "property" ? "e.g. email" : "e.g. hubspot_crm",
        error: mapping.source === "property" && !!propErrors[i],
        validationMessage: mapping.source === "property" && propErrors[i] ? "Property not found in HubSpot" : void 0
      }
    )), /* @__PURE__ */ React.createElement(Button, { onClick: () => removeMapping(i) }, "Delete"))), /* @__PURE__ */ React.createElement(Divider, null), createResult && /* @__PURE__ */ React.createElement(Text, null, createResult), /* @__PURE__ */ React.createElement(Spacer, null), /* @__PURE__ */ React.createElement(Flex, { direction: "row", gap: "small", align: "center" }, /* @__PURE__ */ React.createElement(Button, { onClick: addMapping }, "+ Add field"), isEditing ? /* @__PURE__ */ React.createElement(Button, { onClick: () => onSubmit(true), disabled: !canSubmit, variant: "primary" }, creating ? "Saving..." : "Save Changes") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { onClick: () => onSubmit(true), disabled: !canSubmit, variant: "primary" }, creating ? "Creating..." : "Create Workflow"), /* @__PURE__ */ React.createElement(Button, { onClick: () => onSubmit(false), disabled: !canSubmit }, creating ? "Creating..." : "Save as Draft")), /* @__PURE__ */ React.createElement(Button, { onClick: onCancel, disabled: creating }, "Cancel")));
  }
  function generateSnippet({ advocateCodeProperty, referralUrlParams, formIds }) {
    const paramsJson = referralUrlParams.length > 0 ? JSON.stringify(referralUrlParams) : JSON.stringify(["extole_shareable_code"]);
    const formIdsJson = JSON.stringify(formIds);
    return `<!-- Extole Form Configurator — place anywhere on the page, before forms load -->
<script>
(function() {
  var ADVOCATE_CODE_PROPERTY = '${advocateCodeProperty}';
  var REFERRAL_URL_PARAMS = ${paramsJson}; // first match wins
  var FORM_IDS = ${formIdsJson}; // empty = all forms
  var STORAGE_KEY = 'extole_advocate_code';
  var COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

  function getFirstUrlParam(names) {
    for (var i = 0; i < names.length; i++) {
      var match = window.location.search.match(new RegExp('[?&]' + names[i] + '=([^&]+)'));
      if (match) return decodeURIComponent(match[1]);
    }
    return '';
  }

  function isValidCode(value) {
    return typeof value === 'string' && value.length > 0 && value.length <= 128 &&
      /^[A-Za-z0-9._-]+$/.test(value);
  }

  function setCookie(value) {
    document.cookie = STORAGE_KEY + '=' + encodeURIComponent(value) +
      '; path=/; max-age=' + COOKIE_MAX_AGE + '; SameSite=Lax';
  }

  function getCookie() {
    var match = document.cookie.match(new RegExp('(^|;\\s*)' + STORAGE_KEY + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : '';
  }

  function setLocalStorage(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch(e) {}
  }

  function getLocalStorage() {
    try { return window.localStorage.getItem(STORAGE_KEY) || ''; } catch(e) { return ''; }
  }

  // On landing: persist advocate code to cookie + localStorage so it survives navigation and tab changes
  (function() {
    var code = getFirstUrlParam(REFERRAL_URL_PARAMS);
    if (isValidCode(code)) {
      setCookie(code);
      setLocalStorage(code);
    }
  })();

  function getAdvocateCode() {
    var fromUrl = getFirstUrlParam(REFERRAL_URL_PARAMS);
    if (isValidCode(fromUrl)) return fromUrl;
    var fromCookie = getCookie();
    if (isValidCode(fromCookie)) return fromCookie;
    var fromStorage = getLocalStorage();
    if (isValidCode(fromStorage)) return fromStorage;
    return '';
  }

  function shouldInstrument(formId) {
    return !FORM_IDS.length || FORM_IDS.indexOf(formId) !== -1;
  }

  // ── v2 classic forms (hbspt.forms.create) ──
  // Sets the value of an existing hidden field — does not inject new fields.
  // Add ADVOCATE_CODE_PROPERTY as a hidden field in HubSpot's form builder for each form.
  function setHiddenField(form, name, value) {
    if (!name || !value) return;
    var el = form.querySelector('[name="' + name + '"]');
    if (el) el.value = value;
  }

  function updateDataField(data, name, value) {
    if (!name || !value) return;
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === name) { data[i].value = value; return; }
    }
  }

  function makeWrappedCreate(orig) {
    return function(options) {
      if (!shouldInstrument(options && options.formId)) return orig.call(this, options);
      var opts = {};
      for (var k in options) { if (options.hasOwnProperty(k)) opts[k] = options[k]; }
      var origOnReady = opts.onFormReady;
      var origOnBeforeSubmit = opts.onBeforeFormSubmit;
      opts.onFormReady = function($form) {
        var code = getAdvocateCode();
        if (code) {
          var form = ($form && $form[0]) ? $form[0] : $form;
          if (form) setHiddenField(form, ADVOCATE_CODE_PROPERTY, code);
        }
        if (origOnReady) origOnReady.apply(this, arguments);
      };
      opts.onBeforeFormSubmit = function($form, data) {
        var code = getAdvocateCode();
        if (code) updateDataField(data, ADVOCATE_CODE_PROPERTY, code);
        if (origOnBeforeSubmit) origOnBeforeSubmit.apply(this, arguments);
      };
      return orig.call(this, opts);
    };
  }

  function wrapForms(forms) {
    if (forms._extoleWrapped) return;
    forms._extoleWrapped = true;
    if (forms.create) {
      forms.create = makeWrappedCreate(forms.create);
    } else {
      var _create;
      Object.defineProperty(forms, 'create', {
        configurable: true,
        get: function() { return _create; },
        set: function(fn) { _create = fn ? makeWrappedCreate(fn) : fn; }
      });
    }
  }

  function watchHbspt(hbspt) {
    if (hbspt.forms) { wrapForms(hbspt.forms); return; }
    var _forms;
    Object.defineProperty(hbspt, 'forms', {
      configurable: true,
      get: function() { return _forms; },
      set: function(f) { _forms = f; if (f) wrapForms(f); }
    });
  }

  if (window.hbspt) { watchHbspt(window.hbspt); }
  else {
    var _hbspt;
    Object.defineProperty(window, 'hbspt', {
      configurable: true,
      get: function() { return _hbspt; },
      set: function(val) { _hbspt = val; if (val) watchHbspt(val); }
    });
  }

  // ── v3 new form builder (HubSpotFormsV4 API) ──
  // Add ADVOCATE_CODE_PROPERTY as a hidden field in HubSpot's form builder for each form.
  window.addEventListener('hs-form-event:on-ready', function(event) {
    var code = getAdvocateCode();
    if (!code || !ADVOCATE_CODE_PROPERTY) return;
    var detail = event.detail || {};
    if (!shouldInstrument(detail.formId)) return;
    try {
      var hsForm = window.HubSpotFormsV4 && window.HubSpotFormsV4.getFormFromEvent(event);
      if (hsForm) hsForm.setFieldValue('0-1/' + ADVOCATE_CODE_PROPERTY, code);
    } catch(e) {}
  });
})();
<\/script>`;
  }
})(React, RemoteUI);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3MuanMiLCJzb3VyY2VzIjpbIi4uL3NldHRpbmdzL25vZGVfbW9kdWxlcy9AaHVic3BvdC91aS1leHRlbnNpb25zL2Rpc3QvaW50ZXJuYWwvZ2xvYmFsLXV0aWxzLmpzIiwiLi4vc2V0dGluZ3Mvbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC9odWJzcG90LmpzIiwiLi4vc2V0dGluZ3Mvbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC9zaGFyZWQvdHlwZXMvaHR0cC1yZXF1ZXN0cy5qcyIsIi4uL3NldHRpbmdzL25vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMiLCIuLi9zZXR0aW5ncy9ub2RlX21vZHVsZXMvcmVhY3QvanN4LXJ1bnRpbWUuanMiLCIuLi9zZXR0aW5ncy9ub2RlX21vZHVsZXMvQGh1YnNwb3QvdWktZXh0ZW5zaW9ucy9kaXN0L3NoYXJlZC91dGlscy9yZW1vdGUtY29tcG9uZW50LXJlZ2lzdHJ5LmpzIiwiLi4vc2V0dGluZ3Mvbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC9zaGFyZWQvcmVtb3RlQ29tcG9uZW50cy5qcyIsIi4uL3NldHRpbmdzL25vZGVfbW9kdWxlcy9AaHVic3BvdC91aS1leHRlbnNpb25zL2Rpc3QvaW50ZXJuYWwvaG9vay11dGlscy5qcyIsIi4uL3NldHRpbmdzL1NldHRpbmdzLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBlbnZpcm9ubWVudCBpcyBhIEh1YlNwb3QgZXh0ZW5zaW9uIHdvcmtlci5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgaXMgYSBIdWJTcG90IGV4dGVuc2lvbiB3b3JrZXIuXG4gKi9cbmNvbnN0IGlzUnVubmluZ0luV29ya2VyID0gKCkgPT4gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmXG4gICAgc2VsZi5fX0hVQlNQT1RfRVhURU5TSU9OX1dPUktFUl9fID09PSB0cnVlO1xuLyoqXG4gKiBBIGZha2Ugd29ya2VyIGdsb2JhbHMgb2JqZWN0IGZvciB1c2UgaW4gdGVzdCBlbnZpcm9ubWVudHMuXG4gKi9cbmNvbnN0IGZha2VXb3JrZXJHbG9iYWxzID0ge1xuICAgIGxvZ2dlcjoge1xuICAgICAgICBkZWJ1ZzogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBpbmZvOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICB3YXJuOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBleHRlbmRfVjI6ICgpID0+IHtcbiAgICAgICAgLy8gTm8tb3AgaW4gdGVzdCBlbnZpcm9ubWVudFxuICAgIH0sXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSBhcmUgbm90IHVzaW5nIHRoZSB3b3JrZXIgZW5kcG9pbnQgaW4gdGVzdHMgZW52LlxuICAgIF9fdXNlRXh0ZW5zaW9uQ29udGV4dDogKCkgPT4ge1xuICAgICAgICAvLyBOby1vcCBpbiB0ZXN0IGVudmlyb25tZW50XG4gICAgfSxcbn07XG4vKipcbiAqIEdldHMgdGhlIHdvcmtlciBnbG9iYWxzIG9iamVjdCBmb3IgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuXG4gKiBAcmV0dXJucyBUaGUgd29ya2VyIGdsb2JhbHMgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZ2V0V29ya2VyR2xvYmFscyA9ICgpID0+IHtcbiAgICByZXR1cm4gaXNSdW5uaW5nSW5Xb3JrZXIoKVxuICAgICAgICA/IHNlbGZcbiAgICAgICAgOiBmYWtlV29ya2VyR2xvYmFscztcbn07XG4iLCJpbXBvcnQgeyBnZXRXb3JrZXJHbG9iYWxzIH0gZnJvbSBcIi4vaW50ZXJuYWwvZ2xvYmFsLXV0aWxzLmpzXCI7XG5jb25zdCBleHRlbmRfVjIgPSBnZXRXb3JrZXJHbG9iYWxzKCkuZXh0ZW5kX1YyO1xuZXhwb3J0IGZ1bmN0aW9uIHNlcnZlcmxlc3MobmFtZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBzZWxmLnNlcnZlcmxlc3MobmFtZSwgb3B0aW9ucyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHNlbGYuaHNGZXRjaCh1cmwsIG9wdGlvbnMpO1xufVxuZXhwb3J0IGNvbnN0IGh1YnNwb3QgPSB7XG4gICAgZXh0ZW5kOiBleHRlbmRfVjIsXG4gICAgc2VydmVybGVzcyxcbiAgICBmZXRjaCxcbn07XG4iLCIvKipcbiAqIEBjYXRlZ29yeSBTZXJ2ZXJsZXNzXG4gKi9cbmV4cG9ydCB2YXIgU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1cztcbihmdW5jdGlvbiAoU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1cykge1xuICAgIFNlcnZlcmxlc3NFeGVjdXRpb25TdGF0dXNbXCJTdWNjZXNzXCJdID0gXCJTVUNDRVNTXCI7XG4gICAgU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1c1tcIkVycm9yXCJdID0gXCJFUlJPUlwiO1xufSkoU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1cyB8fCAoU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1cyA9IHt9KSk7XG4iLCIvKipcbiAqIEBsaWNlbnNlIFJlYWN0XG4gKiByZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbi8vIEFUVEVOVElPTlxuLy8gV2hlbiBhZGRpbmcgbmV3IHN5bWJvbHMgdG8gdGhpcyBmaWxlLFxuLy8gUGxlYXNlIGNvbnNpZGVyIGFsc28gYWRkaW5nIHRvICdyZWFjdC1kZXZ0b29scy1zaGFyZWQvc3JjL2JhY2tlbmQvUmVhY3RTeW1ib2xzJ1xuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50LWxpa2UgdHlwZXMuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpO1xudmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJyk7XG52YXIgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmZyYWdtZW50Jyk7XG52YXIgUkVBQ1RfU1RSSUNUX01PREVfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN0cmljdF9tb2RlJyk7XG52YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJyk7XG52YXIgUkVBQ1RfUFJPVklERVJfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnByb3ZpZGVyJyk7XG52YXIgUkVBQ1RfQ09OVEVYVF9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuY29udGV4dCcpO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJyk7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QubGF6eScpO1xudmFyIFJFQUNUX09GRlNDUkVFTl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Qub2Zmc2NyZWVuJyk7XG52YXIgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIGlmIChtYXliZUl0ZXJhYmxlID09PSBudWxsIHx8IHR5cGVvZiBtYXliZUl0ZXJhYmxlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuXG4gIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBtYXliZUl0ZXJhdG9yO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBSZWFjdFNoYXJlZEludGVybmFscyA9IFJlYWN0Ll9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEO1xuXG5mdW5jdGlvbiBlcnJvcihmb3JtYXQpIHtcbiAge1xuICAgIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiA+IDEgPyBfbGVuMiAtIDEgOiAwKSwgX2tleTIgPSAxOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZygnZXJyb3InLCBmb3JtYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAvLyBXaGVuIGNoYW5naW5nIHRoaXMgbG9naWMsIHlvdSBtaWdodCB3YW50IHRvIGFsc29cbiAgLy8gdXBkYXRlIGNvbnNvbGVXaXRoU3RhY2tEZXYud3d3LmpzIGFzIHdlbGwuXG4gIHtcbiAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICBpZiAoc3RhY2sgIT09ICcnKSB7XG4gICAgICBmb3JtYXQgKz0gJyVzJztcbiAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbc3RhY2tdKTtcbiAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuXG5cbiAgICB2YXIgYXJnc1dpdGhGb3JtYXQgPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIFN0cmluZyhpdGVtKTtcbiAgICB9KTsgLy8gQ2FyZWZ1bDogUk4gY3VycmVudGx5IGRlcGVuZHMgb24gdGhpcyBwcmVmaXhcblxuICAgIGFyZ3NXaXRoRm9ybWF0LnVuc2hpZnQoJ1dhcm5pbmc6ICcgKyBmb3JtYXQpOyAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBzcHJlYWQgKG9yIC5hcHBseSkgZGlyZWN0bHkgYmVjYXVzZSBpdFxuICAgIC8vIGJyZWFrcyBJRTk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTM2MTBcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nXG5cbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlW2xldmVsXSwgY29uc29sZSwgYXJnc1dpdGhGb3JtYXQpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBlbmFibGVTY29wZUFQSSA9IGZhbHNlOyAvLyBFeHBlcmltZW50YWwgQ3JlYXRlIEV2ZW50IEhhbmRsZSBBUEkuXG52YXIgZW5hYmxlQ2FjaGVFbGVtZW50ID0gZmFsc2U7XG52YXIgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgPSBmYWxzZTsgLy8gTm8ga25vd24gYnVncywgYnV0IG5lZWRzIHBlcmZvcm1hbmNlIHRlc3RpbmdcblxudmFyIGVuYWJsZUxlZ2FjeUhpZGRlbiA9IGZhbHNlOyAvLyBFbmFibGVzIHVuc3RhYmxlX2F2b2lkVGhpc0ZhbGxiYWNrIGZlYXR1cmUgaW4gRmliZXJcbi8vIHN0dWZmLiBJbnRlbmRlZCB0byBlbmFibGUgUmVhY3QgY29yZSBtZW1iZXJzIHRvIG1vcmUgZWFzaWx5IGRlYnVnIHNjaGVkdWxpbmdcbi8vIGlzc3VlcyBpbiBERVYgYnVpbGRzLlxuXG52YXIgZW5hYmxlRGVidWdUcmFjaW5nID0gZmFsc2U7IC8vIFRyYWNrIHdoaWNoIEZpYmVyKHMpIHNjaGVkdWxlIHJlbmRlciB3b3JrLlxuXG52YXIgUkVBQ1RfTU9EVUxFX1JFRkVSRU5DRTtcblxue1xuICBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFID0gU3ltYm9sLmZvcigncmVhY3QubW9kdWxlLnJlZmVyZW5jZScpO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gTm90ZTogdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgKGUuZy4gaWYgaXQncyBhIHBvbHlmaWxsKS5cblxuXG4gIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgZW5hYmxlRGVidWdUcmFjaW5nICB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IGVuYWJsZUxlZ2FjeUhpZGRlbiAgfHwgdHlwZSA9PT0gUkVBQ1RfT0ZGU0NSRUVOX1RZUEUgfHwgZW5hYmxlU2NvcGVBUEkgIHx8IGVuYWJsZUNhY2hlRWxlbWVudCAgfHwgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IC8vIFRoaXMgbmVlZHMgdG8gaW5jbHVkZSBhbGwgcG9zc2libGUgbW9kdWxlIHJlZmVyZW5jZSBvYmplY3RcbiAgICAvLyB0eXBlcyBzdXBwb3J0ZWQgYnkgYW55IEZsaWdodCBjb25maWd1cmF0aW9uIGFueXdoZXJlIHNpbmNlXG4gICAgLy8gd2UgZG9uJ3Qga25vdyB3aGljaCBGbGlnaHQgYnVpbGQgdGhpcyB3aWxsIGVuZCB1cCBiZWluZyB1c2VkXG4gICAgLy8gd2l0aC5cbiAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFIHx8IHR5cGUuZ2V0TW9kdWxlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRXcmFwcGVkTmFtZShvdXRlclR5cGUsIGlubmVyVHlwZSwgd3JhcHBlck5hbWUpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lO1xuXG4gIGlmIChkaXNwbGF5TmFtZSkge1xuICAgIHJldHVybiBkaXNwbGF5TmFtZTtcbiAgfVxuXG4gIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyBcIihcIiArIGZ1bmN0aW9uTmFtZSArIFwiKVwiIDogd3JhcHBlck5hbWU7XG59IC8vIEtlZXAgaW4gc3luYyB3aXRoIHJlYWN0LXJlY29uY2lsZXIvZ2V0Q29tcG9uZW50TmFtZUZyb21GaWJlclxuXG5cbmZ1bmN0aW9uIGdldENvbnRleHROYW1lKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgJ0NvbnRleHQnO1xufSAvLyBOb3RlIHRoYXQgdGhlIHJlY29uY2lsZXIgcGFja2FnZSBzaG91bGQgZ2VuZXJhbGx5IHByZWZlciB0byB1c2UgZ2V0Q29tcG9uZW50TmFtZUZyb21GaWJlcigpIGluc3RlYWQuXG5cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgIC8vIEhvc3Qgcm9vdCwgdGV4dCBub2RlIG9yIGp1c3QgaW52YWxpZCB0eXBlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAge1xuICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICBlcnJvcignUmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBvYmplY3QgaW4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdGcmFnbWVudCc7XG5cbiAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgcmV0dXJuICdQb3J0YWwnO1xuXG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuICdQcm9maWxlcic7XG5cbiAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgIHJldHVybiAnU3VzcGVuc2VMaXN0JztcblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIGdldENvbnRleHROYW1lKGNvbnRleHQpICsgJy5Db25zdW1lcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgdmFyIHByb3ZpZGVyID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIGdldENvbnRleHROYW1lKHByb3ZpZGVyLl9jb250ZXh0KSArICcuUHJvdmlkZXInO1xuXG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRXcmFwcGVkTmFtZSh0eXBlLCB0eXBlLnJlbmRlciwgJ0ZvcndhcmRSZWYnKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHZhciBvdXRlck5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKG91dGVyTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvdXRlck5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ01lbW8nO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoaW5pdChwYXlsb2FkKSk7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1mYWxsdGhyb3VnaFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gSGVscGVycyB0byBwYXRjaCBjb25zb2xlLmxvZ3MgdG8gYXZvaWQgbG9nZ2luZyBkdXJpbmcgc2lkZS1lZmZlY3QgZnJlZVxuLy8gcmVwbGF5aW5nIG9uIHJlbmRlciBmdW5jdGlvbi4gVGhpcyBjdXJyZW50bHkgb25seSBwYXRjaGVzIHRoZSBvYmplY3Rcbi8vIGxhemlseSB3aGljaCB3b24ndCBjb3ZlciBpZiB0aGUgbG9nIGZ1bmN0aW9uIHdhcyBleHRyYWN0ZWQgZWFnZXJseS5cbi8vIFdlIGNvdWxkIGFsc28gZWFnZXJseSBwYXRjaCB0aGUgbWV0aG9kLlxudmFyIGRpc2FibGVkRGVwdGggPSAwO1xudmFyIHByZXZMb2c7XG52YXIgcHJldkluZm87XG52YXIgcHJldldhcm47XG52YXIgcHJldkVycm9yO1xudmFyIHByZXZHcm91cDtcbnZhciBwcmV2R3JvdXBDb2xsYXBzZWQ7XG52YXIgcHJldkdyb3VwRW5kO1xuXG5mdW5jdGlvbiBkaXNhYmxlZExvZygpIHt9XG5cbmRpc2FibGVkTG9nLl9fcmVhY3REaXNhYmxlZExvZyA9IHRydWU7XG5mdW5jdGlvbiBkaXNhYmxlTG9ncygpIHtcbiAge1xuICAgIGlmIChkaXNhYmxlZERlcHRoID09PSAwKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICAgIHByZXZMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgIHByZXZJbmZvID0gY29uc29sZS5pbmZvO1xuICAgICAgcHJldldhcm4gPSBjb25zb2xlLndhcm47XG4gICAgICBwcmV2RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuICAgICAgcHJldkdyb3VwID0gY29uc29sZS5ncm91cDtcbiAgICAgIHByZXZHcm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQ7XG4gICAgICBwcmV2R3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kOyAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzE5MDk5XG5cbiAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZGlzYWJsZWRMb2csXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9OyAvLyAkRmxvd0ZpeE1lIEZsb3cgdGhpbmtzIGNvbnNvbGUgaXMgaW1tdXRhYmxlLlxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb25zb2xlLCB7XG4gICAgICAgIGluZm86IHByb3BzLFxuICAgICAgICBsb2c6IHByb3BzLFxuICAgICAgICB3YXJuOiBwcm9wcyxcbiAgICAgICAgZXJyb3I6IHByb3BzLFxuICAgICAgICBncm91cDogcHJvcHMsXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBwcm9wcyxcbiAgICAgICAgZ3JvdXBFbmQ6IHByb3BzXG4gICAgICB9KTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgfVxuXG4gICAgZGlzYWJsZWREZXB0aCsrO1xuICB9XG59XG5mdW5jdGlvbiByZWVuYWJsZUxvZ3MoKSB7XG4gIHtcbiAgICBkaXNhYmxlZERlcHRoLS07XG5cbiAgICBpZiAoZGlzYWJsZWREZXB0aCA9PT0gMCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH07IC8vICRGbG93Rml4TWUgRmxvdyB0aGlua3MgY29uc29sZSBpcyBpbW11dGFibGUuXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNvbnNvbGUsIHtcbiAgICAgICAgbG9nOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZMb2dcbiAgICAgICAgfSksXG4gICAgICAgIGluZm86IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkluZm9cbiAgICAgICAgfSksXG4gICAgICAgIHdhcm46IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldldhcm5cbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZFcnJvclxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXA6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cENvbGxhcHNlZDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBDb2xsYXBzZWRcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwRW5kOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cEVuZFxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZERlcHRoIDwgMCkge1xuICAgICAgZXJyb3IoJ2Rpc2FibGVkRGVwdGggZmVsbCBiZWxvdyB6ZXJvLiAnICsgJ1RoaXMgaXMgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudERpc3BhdGNoZXI7XG52YXIgcHJlZml4O1xuZnVuY3Rpb24gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUobmFtZSwgc291cmNlLCBvd25lckZuKSB7XG4gIHtcbiAgICBpZiAocHJlZml4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEV4dHJhY3QgdGhlIFZNIHNwZWNpZmljIHByZWZpeCB1c2VkIGJ5IGVhY2ggbGluZS5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHguc3RhY2sudHJpbSgpLm1hdGNoKC9cXG4oICooYXQgKT8pLyk7XG4gICAgICAgIHByZWZpeCA9IG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xuICAgICAgfVxuICAgIH0gLy8gV2UgdXNlIHRoZSBwcmVmaXggdG8gZW5zdXJlIG91ciBzdGFja3MgbGluZSB1cCB3aXRoIG5hdGl2ZSBzdGFjayBmcmFtZXMuXG5cblxuICAgIHJldHVybiAnXFxuJyArIHByZWZpeCArIG5hbWU7XG4gIH1cbn1cbnZhciByZWVudHJ5ID0gZmFsc2U7XG52YXIgY29tcG9uZW50RnJhbWVDYWNoZTtcblxue1xuICB2YXIgUG9zc2libHlXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgPyBXZWFrTWFwIDogTWFwO1xuICBjb21wb25lbnRGcmFtZUNhY2hlID0gbmV3IFBvc3NpYmx5V2Vha01hcCgpO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKGZuLCBjb25zdHJ1Y3QpIHtcbiAgLy8gSWYgc29tZXRoaW5nIGFza2VkIGZvciBhIHN0YWNrIGluc2lkZSBhIGZha2UgcmVuZGVyLCBpdCBzaG91bGQgZ2V0IGlnbm9yZWQuXG4gIGlmICggIWZuIHx8IHJlZW50cnkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB7XG4gICAgdmFyIGZyYW1lID0gY29tcG9uZW50RnJhbWVDYWNoZS5nZXQoZm4pO1xuXG4gICAgaWYgKGZyYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29udHJvbDtcbiAgcmVlbnRyeSA9IHRydWU7XG4gIHZhciBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlID0gRXJyb3IucHJlcGFyZVN0YWNrVHJhY2U7IC8vICRGbG93Rml4TWUgSXQgZG9lcyBhY2NlcHQgdW5kZWZpbmVkLlxuXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gdW5kZWZpbmVkO1xuICB2YXIgcHJldmlvdXNEaXNwYXRjaGVyO1xuXG4gIHtcbiAgICBwcmV2aW91c0Rpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQ7IC8vIFNldCB0aGUgZGlzcGF0Y2hlciBpbiBERVYgYmVjYXVzZSB0aGlzIG1pZ2h0IGJlIGNhbGwgaW4gdGhlIHJlbmRlciBmdW5jdGlvblxuICAgIC8vIGZvciB3YXJuaW5ncy5cblxuICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudCA9IG51bGw7XG4gICAgZGlzYWJsZUxvZ3MoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBzaG91bGQgdGhyb3cuXG4gICAgaWYgKGNvbnN0cnVjdCkge1xuICAgICAgLy8gU29tZXRoaW5nIHNob3VsZCBiZSBzZXR0aW5nIHRoZSBwcm9wcyBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICB2YXIgRmFrZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH07IC8vICRGbG93Rml4TWVcblxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRmFrZS5wcm90b3R5cGUsICdwcm9wcycsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gV2UgdXNlIGEgdGhyb3dpbmcgc2V0dGVyIGluc3RlYWQgb2YgZnJvemVuIG9yIG5vbi13cml0YWJsZSBwcm9wc1xuICAgICAgICAgIC8vIGJlY2F1c2UgdGhhdCB3b24ndCB0aHJvdyBpbiBhIG5vbi1zdHJpY3QgbW9kZSBmdW5jdGlvbi5cbiAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmNvbnN0cnVjdCkge1xuICAgICAgICAvLyBXZSBjb25zdHJ1Y3QgYSBkaWZmZXJlbnQgY29udHJvbCBmb3IgdGhpcyBjYXNlIHRvIGluY2x1ZGUgYW55IGV4dHJhXG4gICAgICAgIC8vIGZyYW1lcyBhZGRlZCBieSB0aGUgY29uc3RydWN0IGNhbGwuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgUmVmbGVjdC5jb25zdHJ1Y3QoRmFrZSwgW10pO1xuICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgIH1cblxuICAgICAgICBSZWZsZWN0LmNvbnN0cnVjdChmbiwgW10sIEZha2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBGYWtlLmNhbGwoKTtcbiAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm4uY2FsbChGYWtlLnByb3RvdHlwZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgfVxuXG4gICAgICBmbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoc2FtcGxlKSB7XG4gICAgLy8gVGhpcyBpcyBpbmxpbmVkIG1hbnVhbGx5IGJlY2F1c2UgY2xvc3VyZSBkb2Vzbid0IGRvIGl0IGZvciB1cy5cbiAgICBpZiAoc2FtcGxlICYmIGNvbnRyb2wgJiYgdHlwZW9mIHNhbXBsZS5zdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoaXMgZXh0cmFjdHMgdGhlIGZpcnN0IGZyYW1lIGZyb20gdGhlIHNhbXBsZSB0aGF0IGlzbid0IGFsc28gaW4gdGhlIGNvbnRyb2wuXG4gICAgICAvLyBTa2lwcGluZyBvbmUgZnJhbWUgdGhhdCB3ZSBhc3N1bWUgaXMgdGhlIGZyYW1lIHRoYXQgY2FsbHMgdGhlIHR3by5cbiAgICAgIHZhciBzYW1wbGVMaW5lcyA9IHNhbXBsZS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgY29udHJvbExpbmVzID0gY29udHJvbC5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgcyA9IHNhbXBsZUxpbmVzLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgYyA9IGNvbnRyb2xMaW5lcy5sZW5ndGggLSAxO1xuXG4gICAgICB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCAmJiBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgIC8vIFdlIGV4cGVjdCBhdCBsZWFzdCBvbmUgc3RhY2sgZnJhbWUgdG8gYmUgc2hhcmVkLlxuICAgICAgICAvLyBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIHRoZSByb290IG1vc3Qgb25lLiBIb3dldmVyLCBzdGFjayBmcmFtZXMgbWF5IGJlXG4gICAgICAgIC8vIGN1dCBvZmYgZHVlIHRvIG1heGltdW0gc3RhY2sgbGltaXRzLiBJbiB0aGlzIGNhc2UsIG9uZSBtYXliZSBjdXQgb2ZmXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB0aGUgb3RoZXIuIFdlIGFzc3VtZSB0aGF0IHRoZSBzYW1wbGUgaXMgbG9uZ2VyIG9yIHRoZSBzYW1lXG4gICAgICAgIC8vIGFuZCB0aGVyZSBmb3IgY3V0IG9mZiBlYXJsaWVyLiBTbyB3ZSBzaG91bGQgZmluZCB0aGUgcm9vdCBtb3N0IGZyYW1lIGluXG4gICAgICAgIC8vIHRoZSBzYW1wbGUgc29tZXdoZXJlIGluIHRoZSBjb250cm9sLlxuICAgICAgICBjLS07XG4gICAgICB9XG5cbiAgICAgIGZvciAoOyBzID49IDEgJiYgYyA+PSAwOyBzLS0sIGMtLSkge1xuICAgICAgICAvLyBOZXh0IHdlIGZpbmQgdGhlIGZpcnN0IG9uZSB0aGF0IGlzbid0IHRoZSBzYW1lIHdoaWNoIHNob3VsZCBiZSB0aGVcbiAgICAgICAgLy8gZnJhbWUgdGhhdCBjYWxsZWQgb3VyIHNhbXBsZSBmdW5jdGlvbiBhbmQgdGhlIGNvbnRyb2wuXG4gICAgICAgIGlmIChzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgLy8gSW4gVjgsIHRoZSBmaXJzdCBsaW5lIGlzIGRlc2NyaWJpbmcgdGhlIG1lc3NhZ2UgYnV0IG90aGVyIFZNcyBkb24ndC5cbiAgICAgICAgICAvLyBJZiB3ZSdyZSBhYm91dCB0byByZXR1cm4gdGhlIGZpcnN0IGxpbmUsIGFuZCB0aGUgY29udHJvbCBpcyBhbHNvIG9uIHRoZSBzYW1lXG4gICAgICAgICAgLy8gbGluZSwgdGhhdCdzIGEgcHJldHR5IGdvb2QgaW5kaWNhdG9yIHRoYXQgb3VyIHNhbXBsZSB0aHJldyBhdCBzYW1lIGxpbmUgYXNcbiAgICAgICAgICAvLyB0aGUgY29udHJvbC4gSS5lLiBiZWZvcmUgd2UgZW50ZXJlZCB0aGUgc2FtcGxlIGZyYW1lLiBTbyB3ZSBpZ25vcmUgdGhpcyByZXN1bHQuXG4gICAgICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHlvdSBwYXNzZWQgYSBjbGFzcyB0byBmdW5jdGlvbiBjb21wb25lbnQsIG9yIG5vbi1mdW5jdGlvbi5cbiAgICAgICAgICBpZiAocyAhPT0gMSB8fCBjICE9PSAxKSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgIHMtLTtcbiAgICAgICAgICAgICAgYy0tOyAvLyBXZSBtYXkgc3RpbGwgaGF2ZSBzaW1pbGFyIGludGVybWVkaWF0ZSBmcmFtZXMgZnJvbSB0aGUgY29uc3RydWN0IGNhbGwuXG4gICAgICAgICAgICAgIC8vIFRoZSBuZXh0IG9uZSB0aGF0IGlzbid0IHRoZSBzYW1lIHNob3VsZCBiZSBvdXIgbWF0Y2ggdGhvdWdoLlxuXG4gICAgICAgICAgICAgIGlmIChjIDwgMCB8fCBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgICAgICAgLy8gVjggYWRkcyBhIFwibmV3XCIgcHJlZml4IGZvciBuYXRpdmUgY2xhc3Nlcy4gTGV0J3MgcmVtb3ZlIGl0IHRvIG1ha2UgaXQgcHJldHRpZXIuXG4gICAgICAgICAgICAgICAgdmFyIF9mcmFtZSA9ICdcXG4nICsgc2FtcGxlTGluZXNbc10ucmVwbGFjZSgnIGF0IG5ldyAnLCAnIGF0ICcpOyAvLyBJZiBvdXIgY29tcG9uZW50IGZyYW1lIGlzIGxhYmVsZWQgXCI8YW5vbnltb3VzPlwiXG4gICAgICAgICAgICAgICAgLy8gYnV0IHdlIGhhdmUgYSB1c2VyLXByb3ZpZGVkIFwiZGlzcGxheU5hbWVcIlxuICAgICAgICAgICAgICAgIC8vIHNwbGljZSBpdCBpbiB0byBtYWtlIHRoZSBzdGFjayBtb3JlIHJlYWRhYmxlLlxuXG5cbiAgICAgICAgICAgICAgICBpZiAoZm4uZGlzcGxheU5hbWUgJiYgX2ZyYW1lLmluY2x1ZGVzKCc8YW5vbnltb3VzPicpKSB7XG4gICAgICAgICAgICAgICAgICBfZnJhbWUgPSBfZnJhbWUucmVwbGFjZSgnPGFub255bW91cz4nLCBmbi5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgX2ZyYW1lKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vIFJldHVybiB0aGUgbGluZSB3ZSBmb3VuZC5cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mcmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgcmVlbnRyeSA9IGZhbHNlO1xuXG4gICAge1xuICAgICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50ID0gcHJldmlvdXNEaXNwYXRjaGVyO1xuICAgICAgcmVlbmFibGVMb2dzKCk7XG4gICAgfVxuXG4gICAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSBwcmV2aW91c1ByZXBhcmVTdGFja1RyYWNlO1xuICB9IC8vIEZhbGxiYWNrIHRvIGp1c3QgdXNpbmcgdGhlIG5hbWUgaWYgd2UgY291bGRuJ3QgbWFrZSBpdCB0aHJvdy5cblxuXG4gIHZhciBuYW1lID0gZm4gPyBmbi5kaXNwbGF5TmFtZSB8fCBmbi5uYW1lIDogJyc7XG4gIHZhciBzeW50aGV0aWNGcmFtZSA9IG5hbWUgPyBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lKSA6ICcnO1xuXG4gIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgc3ludGhldGljRnJhbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzeW50aGV0aWNGcmFtZTtcbn1cbmZ1bmN0aW9uIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZShmbiwgc291cmNlLCBvd25lckZuKSB7XG4gIHtcbiAgICByZXR1cm4gZGVzY3JpYmVOYXRpdmVDb21wb25lbnRGcmFtZShmbiwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZENvbnN0cnVjdChDb21wb25lbnQpIHtcbiAgdmFyIHByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gIHJldHVybiAhIShwcm90b3R5cGUgJiYgcHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpO1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZSwgc291cmNlLCBvd25lckZuKSB7XG5cbiAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHtcbiAgICAgIHJldHVybiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKHR5cGUsIHNob3VsZENvbnN0cnVjdCh0eXBlKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSh0eXBlKTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgIHJldHVybiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZSgnU3VzcGVuc2UnKTtcblxuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFOlxuICAgICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKCdTdXNwZW5zZUxpc3QnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgcmV0dXJuIGRlc2NyaWJlRnVuY3Rpb25Db21wb25lbnRGcmFtZSh0eXBlLnJlbmRlcik7XG5cbiAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAvLyBNZW1vIG1heSBjb250YWluIGFueSBjb21wb25lbnQgdHlwZSBzbyB3ZSByZWN1cnNpdmVseSByZXNvbHZlIGl0LlxuICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKHR5cGUudHlwZSwgc291cmNlLCBvd25lckZuKTtcblxuICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgbGF6eUNvbXBvbmVudCA9IHR5cGU7XG4gICAgICAgICAgdmFyIHBheWxvYWQgPSBsYXp5Q29tcG9uZW50Ll9wYXlsb2FkO1xuICAgICAgICAgIHZhciBpbml0ID0gbGF6eUNvbXBvbmVudC5faW5pdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBMYXp5IG1heSBjb250YWluIGFueSBjb21wb25lbnQgdHlwZSBzbyB3ZSByZWN1cnNpdmVseSByZXNvbHZlIGl0LlxuICAgICAgICAgICAgcmV0dXJuIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihpbml0KHBheWxvYWQpLCBzb3VyY2UsIG93bmVyRm4pO1xuICAgICAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuZnVuY3Rpb24gc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCkge1xuICB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuICAgICAgdmFyIHN0YWNrID0gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGVsZW1lbnQudHlwZSwgZWxlbWVudC5fc291cmNlLCBvd25lciA/IG93bmVyLnR5cGUgOiBudWxsKTtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuc2V0RXh0cmFTdGFja0ZyYW1lKHN0YWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5zZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZWxlbWVudCkge1xuICB7XG4gICAgLy8gJEZsb3dGaXhNZSBUaGlzIGlzIG9rYXkgYnV0IEZsb3cgZG9lc24ndCBrbm93IGl0LlxuICAgIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoaGFzT3duUHJvcGVydHkpO1xuXG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yJDEgPSB2b2lkIDA7IC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9wcm9kLWVycm9yLWNvZGVzXG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICsgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJyArICdUaGlzIG9mdGVuIGhhcHBlbnMgYmVjYXVzZSBvZiB0eXBvcyBzdWNoIGFzIGBQcm9wVHlwZXMuZnVuY3Rpb25gIGluc3RlYWQgb2YgYFByb3BUeXBlcy5mdW5jYC4nKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVycm9yJDEgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCcpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yJDEgPSBleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvciQxICYmICEoZXJyb3IkMSBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgZXJyb3IoJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMnICsgJyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IkMSk7XG5cbiAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvciQxIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvciQxLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yJDEubWVzc2FnZV0gPSB0cnVlO1xuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpO1xuXG4gICAgICAgICAgZXJyb3IoJ0ZhaWxlZCAlcyB0eXBlOiAlcycsIGxvY2F0aW9uLCBlcnJvciQxLm1lc3NhZ2UpO1xuXG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGlzQXJyYXlJbXBsID0gQXJyYXkuaXNBcnJheTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlZGVjbGFyZVxuXG5mdW5jdGlvbiBpc0FycmF5KGEpIHtcbiAgcmV0dXJuIGlzQXJyYXlJbXBsKGEpO1xufVxuXG4vKlxuICogVGhlIGAnJyArIHZhbHVlYCBwYXR0ZXJuICh1c2VkIGluIGluIHBlcmYtc2Vuc2l0aXZlIGNvZGUpIHRocm93cyBmb3IgU3ltYm9sXG4gKiBhbmQgVGVtcG9yYWwuKiB0eXBlcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzIyMDY0LlxuICpcbiAqIFRoZSBmdW5jdGlvbnMgaW4gdGhpcyBtb2R1bGUgd2lsbCB0aHJvdyBhbiBlYXNpZXItdG8tdW5kZXJzdGFuZCxcbiAqIGVhc2llci10by1kZWJ1ZyBleGNlcHRpb24gd2l0aCBhIGNsZWFyIGVycm9ycyBtZXNzYWdlIG1lc3NhZ2UgZXhwbGFpbmluZyB0aGVcbiAqIHByb2JsZW0uIChJbnN0ZWFkIG9mIGEgY29uZnVzaW5nIGV4Y2VwdGlvbiB0aHJvd24gaW5zaWRlIHRoZSBpbXBsZW1lbnRhdGlvblxuICogb2YgdGhlIGB2YWx1ZWAgb2JqZWN0KS5cbiAqL1xuLy8gJEZsb3dGaXhNZSBvbmx5IGNhbGxlZCBpbiBERVYsIHNvIHZvaWQgcmV0dXJuIGlzIG5vdCBwb3NzaWJsZS5cbmZ1bmN0aW9uIHR5cGVOYW1lKHZhbHVlKSB7XG4gIHtcbiAgICAvLyB0b1N0cmluZ1RhZyBpcyBuZWVkZWQgZm9yIG5hbWVzcGFjZWQgdHlwZXMgbGlrZSBUZW1wb3JhbC5JbnN0YW50XG4gICAgdmFyIGhhc1RvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wudG9TdHJpbmdUYWc7XG4gICAgdmFyIHR5cGUgPSBoYXNUb1N0cmluZ1RhZyAmJiB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ09iamVjdCc7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbn0gLy8gJEZsb3dGaXhNZSBvbmx5IGNhbGxlZCBpbiBERVYsIHNvIHZvaWQgcmV0dXJuIGlzIG5vdCBwb3NzaWJsZS5cblxuXG5mdW5jdGlvbiB3aWxsQ29lcmNpb25UaHJvdyh2YWx1ZSkge1xuICB7XG4gICAgdHJ5IHtcbiAgICAgIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSkge1xuICAvLyBJZiB5b3UgZW5kZWQgdXAgaGVyZSBieSBmb2xsb3dpbmcgYW4gZXhjZXB0aW9uIGNhbGwgc3RhY2ssIGhlcmUncyB3aGF0J3NcbiAgLy8gaGFwcGVuZWQ6IHlvdSBzdXBwbGllZCBhbiBvYmplY3Qgb3Igc3ltYm9sIHZhbHVlIHRvIFJlYWN0IChhcyBhIHByb3AsIGtleSxcbiAgLy8gRE9NIGF0dHJpYnV0ZSwgQ1NTIHByb3BlcnR5LCBzdHJpbmcgcmVmLCBldGMuKSBhbmQgd2hlbiBSZWFjdCB0cmllZCB0b1xuICAvLyBjb2VyY2UgaXQgdG8gYSBzdHJpbmcgdXNpbmcgYCcnICsgdmFsdWVgLCBhbiBleGNlcHRpb24gd2FzIHRocm93bi5cbiAgLy9cbiAgLy8gVGhlIG1vc3QgY29tbW9uIHR5cGVzIHRoYXQgd2lsbCBjYXVzZSB0aGlzIGV4Y2VwdGlvbiBhcmUgYFN5bWJvbGAgaW5zdGFuY2VzXG4gIC8vIGFuZCBUZW1wb3JhbCBvYmplY3RzIGxpa2UgYFRlbXBvcmFsLkluc3RhbnRgLiBCdXQgYW55IG9iamVjdCB0aGF0IGhhcyBhXG4gIC8vIGB2YWx1ZU9mYCBvciBgW1N5bWJvbC50b1ByaW1pdGl2ZV1gIG1ldGhvZCB0aGF0IHRocm93cyB3aWxsIGFsc28gY2F1c2UgdGhpc1xuICAvLyBleGNlcHRpb24uIChMaWJyYXJ5IGF1dGhvcnMgZG8gdGhpcyB0byBwcmV2ZW50IHVzZXJzIGZyb20gdXNpbmcgYnVpbHQtaW5cbiAgLy8gbnVtZXJpYyBvcGVyYXRvcnMgbGlrZSBgK2Agb3IgY29tcGFyaXNvbiBvcGVyYXRvcnMgbGlrZSBgPj1gIGJlY2F1c2UgY3VzdG9tXG4gIC8vIG1ldGhvZHMgYXJlIG5lZWRlZCB0byBwZXJmb3JtIGFjY3VyYXRlIGFyaXRobWV0aWMgb3IgY29tcGFyaXNvbi4pXG4gIC8vXG4gIC8vIFRvIGZpeCB0aGUgcHJvYmxlbSwgY29lcmNlIHRoaXMgb2JqZWN0IG9yIHN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZyBiZWZvcmVcbiAgLy8gcGFzc2luZyBpdCB0byBSZWFjdC4gVGhlIG1vc3QgcmVsaWFibGUgd2F5IGlzIHVzdWFsbHkgYFN0cmluZyh2YWx1ZSlgLlxuICAvL1xuICAvLyBUbyBmaW5kIHdoaWNoIHZhbHVlIGlzIHRocm93aW5nLCBjaGVjayB0aGUgYnJvd3NlciBvciBkZWJ1Z2dlciBjb25zb2xlLlxuICAvLyBCZWZvcmUgdGhpcyBleGNlcHRpb24gd2FzIHRocm93biwgdGhlcmUgc2hvdWxkIGJlIGBjb25zb2xlLmVycm9yYCBvdXRwdXRcbiAgLy8gdGhhdCBzaG93cyB0aGUgdHlwZSAoU3ltYm9sLCBUZW1wb3JhbC5QbGFpbkRhdGUsIGV0Yy4pIHRoYXQgY2F1c2VkIHRoZVxuICAvLyBwcm9ibGVtIGFuZCBob3cgdGhhdCB0eXBlIHdhcyB1c2VkOiBrZXksIGF0cnJpYnV0ZSwgaW5wdXQgdmFsdWUgcHJvcCwgZXRjLlxuICAvLyBJbiBtb3N0IGNhc2VzLCB0aGlzIGNvbnNvbGUgb3V0cHV0IGFsc28gc2hvd3MgdGhlIGNvbXBvbmVudCBhbmQgaXRzXG4gIC8vIGFuY2VzdG9yIGNvbXBvbmVudHMgd2hlcmUgdGhlIGV4Y2VwdGlvbiBoYXBwZW5lZC5cbiAgLy9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3NhZmUtc3RyaW5nLWNvZXJjaW9uXG4gIHJldHVybiAnJyArIHZhbHVlO1xufVxuZnVuY3Rpb24gY2hlY2tLZXlTdHJpbmdDb2VyY2lvbih2YWx1ZSkge1xuICB7XG4gICAgaWYgKHdpbGxDb2VyY2lvblRocm93KHZhbHVlKSkge1xuICAgICAgZXJyb3IoJ1RoZSBwcm92aWRlZCBrZXkgaXMgYW4gdW5zdXBwb3J0ZWQgdHlwZSAlcy4nICsgJyBUaGlzIHZhbHVlIG11c3QgYmUgY29lcmNlZCB0byBhIHN0cmluZyBiZWZvcmUgYmVmb3JlIHVzaW5nIGl0IGhlcmUuJywgdHlwZU5hbWUodmFsdWUpKTtcblxuICAgICAgcmV0dXJuIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7IC8vIHRocm93ICh0byBoZWxwIGNhbGxlcnMgZmluZCB0cm91Ymxlc2hvb3RpbmcgY29tbWVudHMpXG4gICAgfVxuICB9XG59XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0Q3VycmVudE93bmVyO1xudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bjtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcbnZhciBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzO1xuXG57XG4gIGRpZFdhcm5BYm91dFN0cmluZ1JlZnMgPSB7fTtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuXG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuXG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZywgc2VsZikge1xuICB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcucmVmID09PSAnc3RyaW5nJyAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ICYmIHNlbGYgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5zdGF0ZU5vZGUgIT09IHNlbGYpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQudHlwZSk7XG5cbiAgICAgIGlmICghZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSkge1xuICAgICAgICBlcnJvcignQ29tcG9uZW50IFwiJXNcIiBjb250YWlucyB0aGUgc3RyaW5nIHJlZiBcIiVzXCIuICcgKyAnU3VwcG9ydCBmb3Igc3RyaW5nIHJlZnMgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIG1ham9yIHJlbGVhc2UuICcgKyAnVGhpcyBjYXNlIGNhbm5vdCBiZSBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCB0byBhbiBhcnJvdyBmdW5jdGlvbi4gJyArICdXZSBhc2sgeW91IHRvIG1hbnVhbGx5IGZpeCB0aGlzIGNhc2UgYnkgdXNpbmcgdXNlUmVmKCkgb3IgY3JlYXRlUmVmKCkgaW5zdGVhZC4gJyArICdMZWFybiBtb3JlIGFib3V0IHVzaW5nIHJlZnMgc2FmZWx5IGhlcmU6ICcgKyAnaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3N0cmljdC1tb2RlLXN0cmluZy1yZWYnLCBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKSwgY29uZmlnLnJlZik7XG5cbiAgICAgICAgZGlkV2FybkFib3V0U3RyaW5nUmVmc1tjb21wb25lbnROYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB7XG4gICAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB7XG4gICAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCBub3Qgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG5cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93cyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTsgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9KTsgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzZWxmXG4gICAgfSk7IC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc291cmNlXG4gICAgfSk7XG5cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZmNzL3B1bGwvMTA3XG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICovXG5cbmZ1bmN0aW9uIGpzeERFVih0eXBlLCBjb25maWcsIG1heWJlS2V5LCBzb3VyY2UsIHNlbGYpIHtcbiAge1xuICAgIHZhciBwcm9wTmFtZTsgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuXG4gICAgdmFyIHByb3BzID0ge307XG4gICAgdmFyIGtleSA9IG51bGw7XG4gICAgdmFyIHJlZiA9IG51bGw7IC8vIEN1cnJlbnRseSwga2V5IGNhbiBiZSBzcHJlYWQgaW4gYXMgYSBwcm9wLiBUaGlzIGNhdXNlcyBhIHBvdGVudGlhbFxuICAgIC8vIGlzc3VlIGlmIGtleSBpcyBhbHNvIGV4cGxpY2l0bHkgZGVjbGFyZWQgKGllLiA8ZGl2IHsuLi5wcm9wc30ga2V5PVwiSGlcIiAvPlxuICAgIC8vIG9yIDxkaXYga2V5PVwiSGlcIiB7Li4ucHJvcHN9IC8+ICkuIFdlIHdhbnQgdG8gZGVwcmVjYXRlIGtleSBzcHJlYWQsXG4gICAgLy8gYnV0IGFzIGFuIGludGVybWVkaWFyeSBzdGVwLCB3ZSB3aWxsIHVzZSBqc3hERVYgZm9yIGV2ZXJ5dGhpbmcgZXhjZXB0XG4gICAgLy8gPGRpdiB7Li4ucHJvcHN9IGtleT1cIkhpXCIgLz4sIGJlY2F1c2Ugd2UgYXJlbid0IGN1cnJlbnRseSBhYmxlIHRvIHRlbGwgaWZcbiAgICAvLyBrZXkgaXMgZXhwbGljaXRseSBkZWNsYXJlZCB0byBiZSB1bmRlZmluZWQgb3Igbm90LlxuXG4gICAgaWYgKG1heWJlS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihtYXliZUtleSk7XG4gICAgICB9XG5cbiAgICAgIGtleSA9ICcnICsgbWF5YmVLZXk7XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihjb25maWcua2V5KTtcbiAgICAgIH1cblxuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZywgc2VsZik7XG4gICAgfSAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG5cblxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfSAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcblxuXG4gICAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcblxuICAgICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlZikge1xuICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xuICB9XG59XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50T3duZXI7XG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuZnVuY3Rpb24gc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQkMShlbGVtZW50KSB7XG4gIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG4gICAgICB2YXIgc3RhY2sgPSBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYoZWxlbWVudC50eXBlLCBlbGVtZW50Ll9zb3VyY2UsIG93bmVyID8gb3duZXIudHlwZSA6IG51bGwpO1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxLnNldEV4dHJhU3RhY2tGcmFtZShzdGFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5zZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bjtcblxue1xuICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xufVxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBAZmluYWxcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIHtcbiAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIkMS5jdXJyZW50KSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZShSZWFjdEN1cnJlbnRPd25lciQxLmN1cnJlbnQudHlwZSk7XG5cbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oc291cmNlKSB7XG4gIHtcbiAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB5b3VyIGNvZGUgYXQgJyArIGZpbGVOYW1lICsgJzonICsgbGluZU51bWJlciArICcuJztcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG5cblxudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAge1xuICAgIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuXG4gICAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgICBpbmZvID0gXCJcXG5cXG5DaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDxcIiArIHBhcmVudE5hbWUgKyBcIj4uXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZm87XG4gIH1cbn1cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAge1xuICAgIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcblxuICAgIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlOyAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAgIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG5cbiAgICB2YXIgY2hpbGRPd25lciA9ICcnO1xuXG4gICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyJDEuY3VycmVudCkge1xuICAgICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgICBjaGlsZE93bmVyID0gXCIgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gXCIgKyBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoZWxlbWVudC5fb3duZXIudHlwZSkgKyBcIi5cIjtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGVsZW1lbnQpO1xuXG4gICAgZXJyb3IoJ0VhY2ggY2hpbGQgaW4gYSBsaXN0IHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay93YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICB9XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAge1xuICAgIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShub2RlKSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG5cbiAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgICAvLyBidXQgbm93IHdlIHByaW50IGEgc2VwYXJhdGUgd2FybmluZyBmb3IgdGhlbSBsYXRlci5cbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcblxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAge1xuICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwcm9wVHlwZXM7XG5cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IC8vIE5vdGU6IE1lbW8gb25seSBjaGVja3Mgb3V0ZXIgcHJvcHMgaGVyZS5cbiAgICAvLyBJbm5lciBwcm9wcyBhcmUgY2hlY2tlZCBpbiB0aGUgcmVjb25jaWxlci5cbiAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUpKSB7XG4gICAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9wVHlwZXMpIHtcbiAgICAgIC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcbiAgICAgIGNoZWNrUHJvcFR5cGVzKHByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgJ3Byb3AnLCBuYW1lLCBlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUuUHJvcFR5cGVzICE9PSB1bmRlZmluZWQgJiYgIXByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duKSB7XG4gICAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7IC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG5cbiAgICAgIHZhciBfbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcblxuICAgICAgZXJyb3IoJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIF9uYW1lIHx8ICdVbmtub3duJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0eXBlLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJyAmJiAhdHlwZS5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQpIHtcbiAgICAgIGVycm9yKCdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJyk7XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBrZXkgIT09ICdrZXknKSB7XG4gICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZnJhZ21lbnQpO1xuXG4gICAgICAgIGVycm9yKCdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJywga2V5KTtcblxuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGZyYWdtZW50KTtcblxuICAgICAgZXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJyk7XG5cbiAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBkaWRXYXJuQWJvdXRLZXlTcHJlYWQgPSB7fTtcbmZ1bmN0aW9uIGpzeFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBrZXksIGlzU3RhdGljQ2hpbGRyZW4sIHNvdXJjZSwgc2VsZikge1xuICB7XG4gICAgdmFyIHZhbGlkVHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKTsgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuXG4gICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgIHZhciBpbmZvID0gJyc7XG5cbiAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oc291cmNlKTtcblxuICAgICAgaWYgKHNvdXJjZUluZm8pIHtcbiAgICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHR5cGVTdHJpbmc7XG5cbiAgICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSAnbnVsbCc7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodHlwZSkpIHtcbiAgICAgICAgdHlwZVN0cmluZyA9ICdhcnJheSc7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdHlwZVN0cmluZyA9IFwiPFwiICsgKGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlLnR5cGUpIHx8ICdVbmtub3duJykgKyBcIiAvPlwiO1xuICAgICAgICBpbmZvID0gJyBEaWQgeW91IGFjY2lkZW50YWxseSBleHBvcnQgYSBKU1ggbGl0ZXJhbCBpbnN0ZWFkIG9mIGEgY29tcG9uZW50Pyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlU3RyaW5nID0gdHlwZW9mIHR5cGU7XG4gICAgICB9XG5cbiAgICAgIGVycm9yKCdSZWFjdC5qc3g6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZVN0cmluZywgaW5mbyk7XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBqc3hERVYodHlwZSwgcHJvcHMsIGtleSwgc291cmNlLCBzZWxmKTsgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG5cbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcblxuXG4gICAgaWYgKHZhbGlkVHlwZSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XG5cbiAgICAgIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpc1N0YXRpY0NoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKGlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGNoaWxkcmVuW2ldLCB0eXBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yKCdSZWFjdC5qc3g6IFN0YXRpYyBjaGlsZHJlbiBzaG91bGQgYWx3YXlzIGJlIGFuIGFycmF5LiAnICsgJ1lvdSBhcmUgbGlrZWx5IGV4cGxpY2l0bHkgY2FsbGluZyBSZWFjdC5qc3hzIG9yIFJlYWN0LmpzeERFVi4gJyArICdVc2UgdGhlIEJhYmVsIHRyYW5zZm9ybSBpbnN0ZWFkLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhjaGlsZHJlbiwgdHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChwcm9wcywgJ2tleScpKSB7XG4gICAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICByZXR1cm4gayAhPT0gJ2tleSc7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgYmVmb3JlRXhhbXBsZSA9IGtleXMubGVuZ3RoID4gMCA/ICd7a2V5OiBzb21lS2V5LCAnICsga2V5cy5qb2luKCc6IC4uLiwgJykgKyAnOiAuLi59JyA6ICd7a2V5OiBzb21lS2V5fSc7XG5cbiAgICAgICAgaWYgKCFkaWRXYXJuQWJvdXRLZXlTcHJlYWRbY29tcG9uZW50TmFtZSArIGJlZm9yZUV4YW1wbGVdKSB7XG4gICAgICAgICAgdmFyIGFmdGVyRXhhbXBsZSA9IGtleXMubGVuZ3RoID4gMCA/ICd7JyArIGtleXMuam9pbignOiAuLi4sICcpICsgJzogLi4ufScgOiAne30nO1xuXG4gICAgICAgICAgZXJyb3IoJ0EgcHJvcHMgb2JqZWN0IGNvbnRhaW5pbmcgYSBcImtleVwiIHByb3AgaXMgYmVpbmcgc3ByZWFkIGludG8gSlNYOlxcbicgKyAnICBsZXQgcHJvcHMgPSAlcztcXG4nICsgJyAgPCVzIHsuLi5wcm9wc30gLz5cXG4nICsgJ1JlYWN0IGtleXMgbXVzdCBiZSBwYXNzZWQgZGlyZWN0bHkgdG8gSlNYIHdpdGhvdXQgdXNpbmcgc3ByZWFkOlxcbicgKyAnICBsZXQgcHJvcHMgPSAlcztcXG4nICsgJyAgPCVzIGtleT17c29tZUtleX0gey4uLnByb3BzfSAvPicsIGJlZm9yZUV4YW1wbGUsIGNvbXBvbmVudE5hbWUsIGFmdGVyRXhhbXBsZSwgY29tcG9uZW50TmFtZSk7XG5cbiAgICAgICAgICBkaWRXYXJuQWJvdXRLZXlTcHJlYWRbY29tcG9uZW50TmFtZSArIGJlZm9yZUV4YW1wbGVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSB7XG4gICAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59IC8vIFRoZXNlIHR3byBmdW5jdGlvbnMgZXhpc3QgdG8gc3RpbGwgZ2V0IGNoaWxkIHdhcm5pbmdzIGluIGRldlxuLy8gZXZlbiB3aXRoIHRoZSBwcm9kIHRyYW5zZm9ybS4gVGhpcyBtZWFucyB0aGF0IGpzeERFViBpcyBwdXJlbHlcbi8vIG9wdC1pbiBiZWhhdmlvciBmb3IgYmV0dGVyIG1lc3NhZ2VzIGJ1dCB0aGF0IHdlIHdvbid0IHN0b3Bcbi8vIGdpdmluZyB5b3Ugd2FybmluZ3MgaWYgeW91IHVzZSBwcm9kdWN0aW9uIGFwaXMuXG5cbmZ1bmN0aW9uIGpzeFdpdGhWYWxpZGF0aW9uU3RhdGljKHR5cGUsIHByb3BzLCBrZXkpIHtcbiAge1xuICAgIHJldHVybiBqc3hXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywga2V5LCB0cnVlKTtcbiAgfVxufVxuZnVuY3Rpb24ganN4V2l0aFZhbGlkYXRpb25EeW5hbWljKHR5cGUsIHByb3BzLCBrZXkpIHtcbiAge1xuICAgIHJldHVybiBqc3hXaXRoVmFsaWRhdGlvbih0eXBlLCBwcm9wcywga2V5LCBmYWxzZSk7XG4gIH1cbn1cblxudmFyIGpzeCA9ICBqc3hXaXRoVmFsaWRhdGlvbkR5bmFtaWMgOyAvLyB3ZSBtYXkgd2FudCB0byBzcGVjaWFsIGNhc2UganN4cyBpbnRlcm5hbGx5IHRvIHRha2UgYWR2YW50YWdlIG9mIHN0YXRpYyBjaGlsZHJlbi5cbi8vIGZvciBub3cgd2UgY2FuIHNoaXAgaWRlbnRpY2FsIHByb2QgZnVuY3Rpb25zXG5cbnZhciBqc3hzID0gIGpzeFdpdGhWYWxpZGF0aW9uU3RhdGljIDtcblxuZXhwb3J0cy5GcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG5leHBvcnRzLmpzeCA9IGpzeDtcbmV4cG9ydHMuanN4cyA9IGpzeHM7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LXJ1bnRpbWUucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCB9IGZyb20gJ0ByZW1vdGUtdWkvcmVhY3QnO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVJlbW90ZUNvbXBvbmVudFJlZ2lzdHJ5ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbXBvbmVudE1ldGFkYXRhTG9va3VwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGNvbXBvbmVudE5hbWVCeUNvbXBvbmVudE1hcCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCByZWdpc3RlckNvbXBvbmVudCA9IChjb21wb25lbnQsIGNvbXBvbmVudE5hbWUsIGZyYWdtZW50UHJvcHMpID0+IHtcbiAgICAgICAgY29tcG9uZW50TmFtZUJ5Q29tcG9uZW50TWFwLnNldChjb21wb25lbnQsIGNvbXBvbmVudE5hbWUpO1xuICAgICAgICBjb21wb25lbnRNZXRhZGF0YUxvb2t1cC5zZXQoY29tcG9uZW50TmFtZSwge1xuICAgICAgICAgICAgZnJhZ21lbnRQcm9wc1NldDogbmV3IFNldChmcmFnbWVudFByb3BzKSxcbiAgICAgICAgICAgIGZyYWdtZW50UHJvcHNBcnJheTogZnJhZ21lbnRQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRDb21wb25lbnROYW1lOiAoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZUJ5Q29tcG9uZW50TWFwLmdldChjb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKCFjb21wb25lbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50TmFtZTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNBbGxvd2VkQ29tcG9uZW50TmFtZTogKGNvbXBvbmVudE5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRNZXRhZGF0YUxvb2t1cC5oYXMoY29tcG9uZW50TmFtZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcG9uZW50RnJhZ21lbnRQcm9wOiAoY29tcG9uZW50TmFtZSwgcHJvcE5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudE1ldGFkYXRhID0gY29tcG9uZW50TWV0YWRhdGFMb29rdXAuZ2V0KGNvbXBvbmVudE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFjb21wb25lbnRNZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRNZXRhZGF0YS5mcmFnbWVudFByb3BzU2V0Lmhhcyhwcm9wTmFtZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBvbmVudEZyYWdtZW50UHJvcE5hbWVzOiAoY29tcG9uZW50TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50TWV0YWRhdGEgPSBjb21wb25lbnRNZXRhZGF0YUxvb2t1cC5nZXQoY29tcG9uZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudE1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBmcmFnbWVudFByb3BzQXJyYXkgfSA9IGNvbXBvbmVudE1ldGFkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIGZyYWdtZW50UHJvcHNBcnJheTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudDogKGNvbXBvbmVudE5hbWUsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBmcmFnbWVudFByb3BzID0gW10gfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCByZW1vdGVSZWFjdENvbXBvbmVudCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KGNvbXBvbmVudE5hbWUsIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudFByb3BzOiBmcmFnbWVudFByb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0ZXJDb21wb25lbnQocmVtb3RlUmVhY3RDb21wb25lbnQsIGNvbXBvbmVudE5hbWUsIGZyYWdtZW50UHJvcHMpO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZUNvbXBvdW5kUmVhY3RDb21wb25lbnQ6IChjb21wb25lbnROYW1lLCBvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGZyYWdtZW50UHJvcHMgPSBbXSB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIGNvbnN0IFJlbW90ZUNvbXBvbmVudFR5cGUgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudChjb21wb25lbnROYW1lLCB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnRQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gV2UgY2FuIG9ubHkgYXR0YWNoIHByb3BlcnRpZXMgdG8gYSBmdW5jdGlvbiBjb21wb25lbnQgdHlwZSwgc28gd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgcmVtb3RlIGNvbXBvbmVudCB0eXBlIGlzIGEgZnVuY3Rpb24uXG4gICAgICAgICAgICAvLyBJZiB0aGUgcmVtb3RlIGNvbXBvbmVudCB0eXBlIGlzIG5vdCBhIGZ1bmN0aW9uLCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSBmdW5jdGlvbiBjb21wb25lbnQuXG4gICAgICAgICAgICBjb25zdCBDb21wb3VuZEZ1bmN0aW9uQ29tcG9uZW50VHlwZSA9IHR5cGVvZiBSZW1vdGVDb21wb25lbnRUeXBlID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgPyBSZW1vdGVDb21wb25lbnRUeXBlXG4gICAgICAgICAgICAgICAgOiAocHJvcHMpID0+IChfanN4KFJlbW90ZUNvbXBvbmVudFR5cGUsIHsgLi4ucHJvcHMgfSkpO1xuICAgICAgICAgICAgLy8gQXR0YWNoIHRoZSBjb21wb3VuZCBjb21wb25lbnQgcHJvcGVydGllcyB0byB0aGUgZnVuY3Rpb24gY29tcG9uZW50IHRoYXQgd2Ugd2lsbCBiZSByZXR1cm5pbmcuXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKENvbXBvdW5kRnVuY3Rpb25Db21wb25lbnRUeXBlLCBvcHRpb25zLmNvbXBvdW5kQ29tcG9uZW50UHJvcGVydGllcyk7XG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgY29tcG91bmQgZnVuY3Rpb24gY29tcG9uZW50IHdpdGggdGhlIHJlZ2lzdHJ5IGFuZCByZXR1cm4gaXQuXG4gICAgICAgICAgICByZXR1cm4gcmVnaXN0ZXJDb21wb25lbnQoQ29tcG91bmRGdW5jdGlvbkNvbXBvbmVudFR5cGUsIGNvbXBvbmVudE5hbWUsIGZyYWdtZW50UHJvcHMpO1xuICAgICAgICB9LFxuICAgIH07XG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlUmVtb3RlQ29tcG9uZW50UmVnaXN0cnkgfSBmcm9tIFwiLi91dGlscy9yZW1vdGUtY29tcG9uZW50LXJlZ2lzdHJ5LmpzXCI7XG4vKipcbiAqIFJlcHJlc2VudHMgYSByZWdpc3RyeSBvZiBIdWJTcG90LXByb3ZpZGVkIFJlYWN0IGNvbXBvbmVudHMgdGhhdCBzaG91bGQgb25seSBiZSB1c2VkICoqaW50ZXJuYWxseSoqIGJ5IHRoZSBVSSBleHRlbnNpb24gU0RLLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgX19odWJTcG90Q29tcG9uZW50UmVnaXN0cnkgPSBjcmVhdGVSZW1vdGVDb21wb25lbnRSZWdpc3RyeSgpO1xuY29uc3QgeyBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50LCBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZUNvbXBvdW5kUmVhY3RDb21wb25lbnQsIH0gPSBfX2h1YlNwb3RDb21wb25lbnRSZWdpc3RyeTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBTkRBUkQgQ09NUE9ORU5UU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vKipcbiAqIFRoZSBgQWxlcnRgIGNvbXBvbmVudCByZW5kZXJzIGFuIGFsZXJ0IHdpdGhpbiBhIGNhcmQuIFVzZSB0aGlzIGNvbXBvbmVudCB0byBnaXZlIHVzYWdlIGd1aWRhbmNlLCBub3RpZnkgdXNlcnMgb2YgYWN0aW9uIHJlc3VsdHMsIG9yIHdhcm4gdGhlbSBhYm91dCBwb3RlbnRpYWwgaXNzdWVzIG9yIGZhaWx1cmVzLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2FsZXJ0IERvY3N9XG4gKiAtIHtAbGluayBodHRwczovL2FwcC5odWJzcG90LmNvbS9kb2NzLzQ4MDA4OTE2L3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvYWxlcnQjdmFyaWFudHMgVmFyaWFudHN9XG4gKi9cbmV4cG9ydCBjb25zdCBBbGVydCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0FsZXJ0Jyk7XG4vKipcbiAqIFRoZSBgQnV0dG9uYCBjb21wb25lbnQgcmVuZGVycyBhIHNpbmdsZSBidXR0b24uIFVzZSB0aGlzIGNvbXBvbmVudCB0byBlbmFibGUgdXNlcnMgdG8gcGVyZm9ybSBhY3Rpb25zLCBzdWNoIGFzIHN1Ym1pdHRpbmcgYSBmb3JtLCBzZW5kaW5nIGRhdGEgdG8gYW4gZXh0ZXJuYWwgc3lzdGVtLCBvciBkZWxldGluZyBkYXRhLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2J1dHRvbiBEb2NzfVxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9idXR0b24jdXNhZ2UtZXhhbXBsZXMgRXhhbXBsZXN9XG4gKiAtIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vSHViU3BvdC91aS1leHRlbnNpb25zLWV4YW1wbGVzL3RyZWUvbWFpbi9kZXNpZ24tcGF0dGVybnMjYnV0dG9uIERlc2lnbiBQYXR0ZXJuIEV4YW1wbGVzfVxuICovXG5leHBvcnQgY29uc3QgQnV0dG9uID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQnV0dG9uJywge1xuICAgIGZyYWdtZW50UHJvcHM6IFsnb3ZlcmxheSddLFxufSk7XG4vKipcbiAqIFRoZSBgQnV0dG9uUm93YCBjb21wb25lbnQgcmVuZGVycyBhIHJvdyBvZiBzcGVjaWZpZWQgYEJ1dHRvbmAgY29tcG9uZW50cy4gVXNlIHRoaXMgY29tcG9uZW50IHdoZW4geW91IHdhbnQgdG8gaW5jbHVkZSBtdWx0aXBsZSBidXR0b25zIGluIGEgcm93LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2J1dHRvbi1yb3cgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IEJ1dHRvblJvdyA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0J1dHRvblJvdycpO1xuZXhwb3J0IGNvbnN0IENhcmQgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdDYXJkJyk7XG4vKipcbiAqIFRoZSBgRGVzY3JpcHRpb25MaXN0YCBjb21wb25lbnQgcmVuZGVycyBwYWlycyBvZiBsYWJlbHMgYW5kIHZhbHVlcy4gVXNlIHRoaXMgY29tcG9uZW50IHRvIGRpc3BsYXkgcGFpcnMgb2YgbGFiZWxzIGFuZCB2YWx1ZXMgaW4gYSB3YXkgdGhhdCdzIGVhc3kgdG8gcmVhZCBhdCBhIGdsYW5jZS5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9kZXNjcmlwdGlvbi1saXN0IERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBEZXNjcmlwdGlvbkxpc3QgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdEZXNjcmlwdGlvbkxpc3QnKTtcbi8qKlxuICogVGhlIGBEZXNjcmlwdGlvbkxpc3RJdGVtYCBjb21wb25lbnQgcmVuZGVycyBhIHNpbmdsZSBzZXQgb2YgYSBsYWJlbCBhbmQgdmFsdWUuIFVzZSB0aGlzIGNvbXBvbmVudCB3aXRoaW4gYSBgRGVzY3JpcHRpb25MaXN0YCBjb21wb25lbnQuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvZGVzY3JpcHRpb24tbGlzdCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgRGVzY3JpcHRpb25MaXN0SXRlbSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0Rlc2NyaXB0aW9uTGlzdEl0ZW0nKTtcbi8qKlxuICogVGhlIGBEaXZpZGVyYCBjb21wb25lbnQgcmVuZGVycyBhIGdyZXksIGhvcml6b250YWwgbGluZSBmb3Igc3BhY2luZyBvdXQgY29tcG9uZW50cyB2ZXJ0aWNhbGx5IG9yIGNyZWF0aW5nIHNlY3Rpb25zIGluIGFuIGV4dGVuc2lvbi4gVXNlIHRoaXMgY29tcG9uZW50IHRvIHNwYWNlIG91dCBvdGhlciBjb21wb25lbnRzIHdoZW4gdGhlIGNvbnRlbnQgbmVlZHMgbW9yZSBzZXBhcmF0aW9uIHRoYW4gd2hpdGUgc3BhY2UuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvZGl2aWRlciBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgRGl2aWRlciA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0RpdmlkZXInKTtcbi8qKlxuICogVGhlIGBTcGFjZXJgIGNvbXBvbmVudCByZW5kZXJzIHZlcnRpY2FsIHNwYWNlIGJldHdlZW4gY29tcG9uZW50cy4gVXNlIHRoaXMgY29tcG9uZW50XG4gKiB0byBhZGQgY29uc2lzdGVudCBzcGFjaW5nIHdpdGhvdXQgdXNpbmcgZW1wdHkgd3JhcHBlciBjb21wb25lbnRzLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3NwYWNlciBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgU3BhY2VyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnU3BhY2VyJyk7XG4vKipcbiAqIFRoZSBgRW1wdHlTdGF0ZWAgY29tcG9uZW50IHNldHMgdGhlIGNvbnRlbnQgdGhhdCBhcHBlYXJzIHdoZW4gdGhlIGV4dGVuc2lvbiBpcyBpbiBhbiBlbXB0eSBzdGF0ZS4gVXNlIHRoaXMgY29tcG9uZW50IHdoZW4gdGhlcmUncyBubyBjb250ZW50IG9yIGRhdGEgdG8gaGVscCBndWlkZSB1c2Vycy5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9lbXB0eS1zdGF0ZSBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgRW1wdHlTdGF0ZSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0VtcHR5U3RhdGUnKTtcbi8qKlxuICogVGhlIGBFcnJvclN0YXRlYCBjb21wb25lbnQgc2V0cyB0aGUgY29udGVudCBvZiBhbiBlcnJvcmluZyBleHRlbnNpb24uIFVzZSB0aGlzIGNvbXBvbmVudCB0byBndWlkZSB1c2VycyB0aHJvdWdoIHJlc29sdmluZyBlcnJvcnMgdGhhdCB5b3VyIGV4dGVuc2lvbiBtaWdodCBlbmNvdW50ZXIuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvZXJyb3Itc3RhdGUgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IEVycm9yU3RhdGUgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdFcnJvclN0YXRlJyk7XG4vKipcbiAqIFRoZSBgRm9ybWAgY29tcG9uZW50IHJlbmRlcnMgYSBmb3JtIHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgc3ViY29tcG9uZW50cywgc3VjaCBhcyBgSW5wdXRgLCBgU2VsZWN0YCwgYW5kIGBCdXR0b25gLiBVc2UgdGhpcyBjb21wb25lbnQgdG8gZW5hYmxlIHVzZXJzIHRvIHN1Ym1pdCBkYXRhIHRvIEh1YlNwb3Qgb3IgYW4gZXh0ZXJuYWwgc3lzdGVtLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2Zvcm0gRG9jc31cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9IdWJTcG90L3VpLWV4dGVuc2lvbnMtZXhhbXBsZXMvdHJlZS9tYWluL2Rlc2lnbi1wYXR0ZXJucyNmb3JtIERlc2lnbiBQYXR0ZXJuIEV4YW1wbGVzfVxuICovXG5leHBvcnQgY29uc3QgRm9ybSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0Zvcm0nKTtcbi8qKlxuICogVGhlIGBIZWFkaW5nYCBjb21wb25lbnQgcmVuZGVycyBsYXJnZSBoZWFkaW5nIHRleHQuIFVzZSB0aGlzIGNvbXBvbmVudCB0byBpbnRyb2R1Y2Ugb3IgZGlmZmVyZW50aWF0ZSBzZWN0aW9ucyBvZiB5b3VyIGNvbXBvbmVudC5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9oZWFkaW5nIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBIZWFkaW5nID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnSGVhZGluZycpO1xuLyoqXG4gKiBUaGUgYEltYWdlYCBjb21wb25lbnQgcmVuZGVycyBhbiBpbWFnZS4gVXNlIHRoaXMgY29tcG9uZW50IHRvIGFkZCBhIGxvZ28gb3Igb3RoZXIgdmlzdWFsIGJyYW5kIGlkZW50aXR5IGFzc2V0LCBvciB0byBhY2NlbnR1YXRlIG90aGVyIGNvbnRlbnQgaW4gdGhlIGV4dGVuc2lvbi5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9pbWFnZSBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgSW1hZ2UgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdJbWFnZScsIHtcbiAgICBmcmFnbWVudFByb3BzOiBbJ292ZXJsYXknXSxcbn0pO1xuLyoqXG4gKiBUaGUgYElucHV0YCBjb21wb25lbnQgcmVuZGVycyBhIHRleHQgaW5wdXQgZmllbGQgd2hlcmUgYSB1c2VyIGNhbiBlbnRlciBhIGN1c3RvbSB0ZXh0IHZhbHVlLiBMaWtlIG90aGVyIGlucHV0cywgdGhpcyBjb21wb25lbnQgc2hvdWxkIGJlIHVzZWQgd2l0aGluIGEgYEZvcm1gIHRoYXQgaGFzIGEgc3VibWl0IGJ1dHRvbi5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9pbnB1dCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgSW5wdXQgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdJbnB1dCcpO1xuLyoqXG4gKiBUaGUgYExpbmtgIGNvbXBvbmVudCByZW5kZXJzIGEgY2xpY2thYmxlIGh5cGVybGluay4gVXNlIGxpbmtzIHRvIGRpcmVjdCB1c2VycyB0byBhbiBleHRlcm5hbCB3ZWIgcGFnZSBvciBhbm90aGVyIHBhcnQgb2YgdGhlIEh1YlNwb3QgYXBwLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2xpbmsgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IExpbmsgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdMaW5rJywge1xuICAgIGZyYWdtZW50UHJvcHM6IFsnb3ZlcmxheSddLFxufSk7XG4vKipcbiAqIFRoZSBgVGV4dEFyZWFgIGNvbXBvbmVudCByZW5kZXJzIGEgZmlsbGFibGUgdGV4dCBmaWVsZC4gTGlrZSBvdGhlciBpbnB1dHMsIHRoaXMgY29tcG9uZW50IHNob3VsZCBiZSB1c2VkIHdpdGhpbiBhIGBGb3JtYCB0aGF0IGhhcyBhIHN1Ym1pdCBidXR0b24uXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvdGV4dC1hcmVhIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBUZXh0QXJlYSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RleHRBcmVhJyk7XG4vLyBUZXh0YXJlYSB3YXMgY2hhbmdlZCB0byBUZXh0QXJlYVxuLy8gRXhwb3J0aW5nIGJvdGggZm9yIGJhY2t3YXJkcyBjb21wYXRcbi8qKiBAZGVwcmVjYXRlZCB1c2UgVGV4dEFyZWEgaW5zdGVhZC4gV2l0aCBhIGNhcGl0YWwgQS4qL1xuZXhwb3J0IGNvbnN0IFRleHRhcmVhID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGV4dGFyZWEnKTtcbi8qKlxuICogVGhlIGBMb2FkaW5nU3Bpbm5lcmAgY29tcG9uZW50IHJlbmRlcnMgYSB2aXN1YWwgaW5kaWNhdG9yIGZvciB3aGVuIGFuIGV4dGVuc2lvbiBpcyBsb2FkaW5nIG9yIHByb2Nlc3NpbmcgZGF0YS5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9sb2FkaW5nLXNwaW5uZXIgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IExvYWRpbmdTcGlubmVyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnTG9hZGluZ1NwaW5uZXInKTtcbi8qKlxuICogVGhlIGBQcm9ncmVzc0JhcmAgY29tcG9uZW50IHJlbmRlcnMgYSB2aXN1YWwgaW5kaWNhdG9yIHNob3dpbmcgYSBudW1lcmljIGFuZC9vciBwZXJjZW50YWdlLWJhc2VkIHJlcHJlc2VudGF0aW9uIG9mIHByb2dyZXNzLiBUaGUgcGVyY2VudGFnZSBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBtYXhpbXVtIHBvc3NpYmxlIHZhbHVlIHNwZWNpZmllZCBpbiB0aGUgY29tcG9uZW50LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3Byb2dyZXNzLWJhciBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NCYXIgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQcm9ncmVzc0JhcicpO1xuLyoqXG4gKiBUaGUgYFNlbGVjdGAgY29tcG9uZW50IHJlbmRlcnMgYSBkcm9wZG93biBtZW51IHNlbGVjdCBmaWVsZCB3aGVyZSBhIHVzZXIgY2FuIHNlbGVjdCBhIHNpbmdsZSB2YWx1ZS4gQSBzZWFyY2ggYmFyIHdpbGwgYmUgYXV0b21hdGljYWxseSBpbmNsdWRlZCB3aGVuIHRoZXJlIGFyZSBtb3JlIHRoYW4gc2V2ZW4gb3B0aW9ucy4gTGlrZSBvdGhlciBpbnB1dHMsIHRoaXMgY29tcG9uZW50IHNob3VsZCBiZSB1c2VkIHdpdGhpbiBhIGBGb3JtYCB0aGF0IGhhcyBhIHN1Ym1pdCBidXR0b24uXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvc2VsZWN0IERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBTZWxlY3QgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTZWxlY3QnKTtcbi8qKlxuICogVGhlIGBUYWdgIGNvbXBvbmVudCByZW5kZXJzIGEgdGFnIHRvIGxhYmVsIG9yIGNhdGVnb3JpemUgaW5mb3JtYXRpb24gb3Igb3RoZXIgY29tcG9uZW50cy4gVGFncyBjYW4gYmUgc3RhdGljIG9yIGNsaWNrYWJsZSBmb3IgaW52b2tpbmcgZnVuY3Rpb25zLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3RhZyBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgVGFnID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFnJywge1xuICAgIGZyYWdtZW50UHJvcHM6IFsnb3ZlcmxheSddLFxufSk7XG4vKipcbiAqIFRoZSBgVGV4dGAgY29tcG9uZW50IHJlbmRlcnMgdGV4dCB3aXRoIGZvcm1hdHRpbmcgb3B0aW9ucy5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy90ZXh0IERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGV4dCcpO1xuLyoqXG4gKiBUaGUgYFRpbGVgIGNvbXBvbmVudCByZW5kZXJzIGEgc3F1YXJlIHRpbGUgdGhhdCBjYW4gY29udGFpbiBvdGhlciBjb21wb25lbnRzLiBVc2UgdGhpcyBjb21wb25lbnQgdG8gY3JlYXRlIGdyb3VwcyBvZiByZWxhdGVkIGNvbXBvbmVudHMuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvdGlsZSBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgVGlsZSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RpbGUnKTtcbi8qKiBAZGVwcmVjYXRlZCB1c2UgRmxleCBpbnN0ZWFkLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgcmVsZWFzZS4gKi9cbmV4cG9ydCBjb25zdCBTdGFjayA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1N0YWNrJyk7XG4vKipcbiAqIFRoZSBgVG9nZ2xlR3JvdXBgIGNvbXBvbmVudCByZW5kZXJzIGEgbGlzdCBvZiBzZWxlY3RhYmxlIG9wdGlvbnMsIGVpdGhlciBpbiByYWRpbyBidXR0b24gb3IgY2hlY2tib3ggZm9ybS5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy90b2dnbGUtZ3JvdXAgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFRvZ2dsZUdyb3VwID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVG9nZ2xlR3JvdXAnKTtcbi8qKlxuICogVGhlIGBTdGF0aXN0aWNzSXRlbWAgY29tcG9uZW50IHJlbmRlcnMgYSBzaW5nbGUgZGF0YSBwb2ludCB3aXRoaW4gYSBgU3RhdGlzdGljc2AgY29tcG9uZW50LiBVc2UgdGhpcyBjb21wb25lbnQgdG8gZGlzcGxheSBhIHNpbmdsZSBkYXRhIHBvaW50LCBzdWNoIGFzIGEgbnVtYmVyIG9yIHBlcmNlbnRhZ2UuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvc3RhdGlzdGljcyBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgU3RhdGlzdGljc0l0ZW0gPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGF0aXN0aWNzSXRlbScpO1xuLyoqXG4gKiBUaGUgYFN0YXRpc3RpY3NgIGNvbXBvbmVudCByZW5kZXJzIGEgdmlzdWFsIHNwb3RsaWdodCBvZiBvbmUgb3IgbW9yZSBkYXRhIHBvaW50cy4gSW5jbHVkZXMgdGhlIGBTdGF0aXN0aWNzSXRlbWAgYW5kIGBTdGF0aXN0aWNzVHJlbmRgIHN1YmNvbXBvbmVudHMuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvc3RhdGlzdGljcyBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgU3RhdGlzdGljcyA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1N0YXRpc3RpY3MnKTtcbi8qKlxuICogVGhlIGBTdGF0aXN0aWNzVHJlbmRgIGNvbXBvbmVudCByZW5kZXJzIGEgcGVyY2VudGFnZSB0cmVuZCB2YWx1ZSBhbmQgZGlyZWN0aW9uIGFsb25zaWRlIGEgYFN0YXRpc3RpY3NJdGVtYCBjb21wb25lbnQuIFVzZSB0aGlzIGNvbXBvbmVudCB3aXRoaW4gdGhlIGBTdGF0aXN0aWNzSXRlbWAgY29tcG9uZW50LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3N0YXRpc3RpY3MgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFN0YXRpc3RpY3NUcmVuZCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1N0YXRpc3RpY3NUcmVuZCcpO1xuLyoqXG4gKiBUaGUgYFRhYmxlYCBjb21wb25lbnQgcmVuZGVycyBhIHRhYmxlLiBUbyBmb3JtYXQgdGhlIHRhYmxlLCB1c2UgdGhlIHN1YmNvbXBvbmVudHMgYFRhYmxlSGVhZGAsIGBUYWJsZVJvd2AsIGBUYWJsZUhlYWRlcmAsIGBUYWJsZUJvZHlgLCBgVGFibGVDZWxsYGFuZCBgVGFibGVGb290ZXJgLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3RhYmxlIERvY3N9XG4gKiAtIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vSHViU3BvdC91aS1leHRlbnNpb25zLWV4YW1wbGVzL3RyZWUvbWFpbi9kZXNpZ24tcGF0dGVybnMjdGFibGUgRGVzaWduIFBhdHRlcm4gRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IFRhYmxlID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGUnKTtcbi8qKlxuICogVGhlIGBUYWJsZUZvb3RlcmAgY29tcG9uZW50IHJlbmRlcnMgYSBmb290ZXIgd2l0aGluIGEgYFRhYmxlYCBjb21wb25lbnQuIFVzZSB0aGlzIGNvbXBvbmVudCB0byBkaXNwbGF5IHRvdGFscyBvciBvdGhlciBzdW1tYXJ5IGluZm9ybWF0aW9uLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3RhYmxlIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBUYWJsZUZvb3RlciA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlRm9vdGVyJyk7XG4vKipcbiAqIFRoZSBgVGFibGVDZWxsYCBjb21wb25lbnQgcmVuZGVycyBpbmRpdmlkdWFsIGNlbGxzIHdpdGhpbiB0aGUgYFRhYmxlQm9keWAgY29tcG9uZW50LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3RhYmxlIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBUYWJsZUNlbGwgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdUYWJsZUNlbGwnKTtcbi8qKlxuICogVGhlIGBUYWJsZVJvd2AgY29tcG9uZW50IHJlbmRlcnMgYSByb3cgd2l0aGluIHRoZSBgVGFibGVCb2R5YCBvciBgVGFibGVIZWFkYCBjb21wb25lbnQuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvdGFibGUgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFRhYmxlUm93ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVSb3cnKTtcbi8qKlxuICogVGhlIGBUYWJsZUJvZHlgIGNvbXBvbmVudCByZW5kZXJzIHRoZSBib2R5IChyb3dzIGFuZCBjZWxscykgb2YgYSB0YWJsZSB3aXRoaW4gdGhlIGBUYWJsZWAgY29tcG9uZW50LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3RhYmxlIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBUYWJsZUJvZHkgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdUYWJsZUJvZHknKTtcbi8qKlxuICogVGhlIGBUYWJsZUhlYWRlcmAgY29tcG9uZW50IHJlbmRlcnMgaW5kaXZpZHVhbCBjZWxscyBjb250YWluaW5nIGJvbGRlZCBjb2x1bW4gbGFiZWxzLCB3aXRoaW4gYFRhYmxlSGVhZGAuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvdGFibGUgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFRhYmxlSGVhZGVyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVIZWFkZXInKTtcbi8qKlxuICogVGhlIGBUYWJsZUhlYWRgIGNvbXBvbmVudCByZW5kZXJzIHRoZSBoZWFkZXIgc2VjdGlvbiBvZiB0aGUgYFRhYmxlYCBjb21wb25lbnQsIGNvbnRhaW5pbmcgY29sdW1uIGxhYmVscy5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy90YWJsZSBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgVGFibGVIZWFkID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVIZWFkJyk7XG4vKipcbiAqIFRoZSBgTnVtYmVySW5wdXRgIGNvbXBvbmVudCByZW5kZXJzIGEgbnVtYmVyIGlucHV0IGZpZWxkLiBMaWtlIG90aGVyIGlucHV0cywgdGhpcyBjb21wb25lbnQgc2hvdWxkIGJlIHVzZWQgd2l0aGluIGEgYEZvcm1gIHRoYXQgaGFzIGEgc3VibWl0IGJ1dHRvbi5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9udW1iZXItaW5wdXQgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IE51bWJlcklucHV0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnTnVtYmVySW5wdXQnKTtcbi8qKlxuICogVGhlIGBCb3hgIGNvbXBvbmVudCByZW5kZXJzIGFuIGVtcHR5IGRpdiBjb250YWluZXIgZm9yIGZpbmUgdHVuaW5nIHRoZSBzcGFjaW5nIG9mIGNvbXBvbmVudHMuIENvbW1vbmx5IHVzZWQgd2l0aCB0aGUgYEZsZXhgIGNvbXBvbmVudC5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9ib3ggRG9jc31cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9IdWJTcG90L3VpLWV4dGVuc2lvbnMtZXhhbXBsZXMvdHJlZS9tYWluL2ZsZXgtYW5kLWJveCBGbGV4IGFuZCBCb3ggRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IEJveCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0JveCcpO1xuLyoqXG4gKiBUaGUgYFN0ZXBJbmRpY2F0b3JgIGNvbXBvbmVudCByZW5kZXJzIGFuIGluZGljYXRvciB0byBzaG93IHRoZSBjdXJyZW50IHN0ZXAgb2YgYSBtdWx0aS1zdGVwIHByb2Nlc3MuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvc3RlcC1pbmRpY2F0b3IgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFN0ZXBJbmRpY2F0b3IgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGVwSW5kaWNhdG9yJyk7XG4vKipcbiAqIFRoZSBgQWNjb3JkaW9uYCBjb21wb25lbnQgcmVuZGVycyBhbiBleHBhbmRhYmxlIGFuZCBjb2xsYXBzYWJsZSBzZWN0aW9uIHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgY29tcG9uZW50cy4gVGhpcyBjb21wb25lbnQgY2FuIGJlIGhlbHBmdWwgZm9yIHNhdmluZyBzcGFjZSBhbmQgYnJlYWtpbmcgdXAgZXh0ZW5zaW9uIGNvbnRlbnQuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvYWNjb3JkaW9uIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBBY2NvcmRpb24gPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdBY2NvcmRpb24nKTtcbi8qKlxuICogVGhlIE11bHRpU2VsZWN0IGNvbXBvbmVudCByZW5kZXJzIGEgZHJvcGRvd24gbWVudSBzZWxlY3QgZmllbGQgd2hlcmUgYSB1c2VyIGNhbiBzZWxlY3QgbXVsdGlwbGUgdmFsdWVzLiBDb21tb25seSB1c2VkIHdpdGhpbiB0aGUgYEZvcm1gIGNvbXBvbmVudC5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9tdWx0aS1zZWxlY3QgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IE11bHRpU2VsZWN0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnTXVsdGlTZWxlY3QnKTtcbi8qKlxuICogVGhlIGBGbGV4YCBjb21wb25lbnQgcmVuZGVycyBhIGZsZXggY29udGFpbmVyIHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgY29tcG9uZW50cywgYW5kIGFycmFuZ2UgdGhlbSB3aXRoIHByb3BzLiBVc2UgdGhpcyBjb21wb25lbnQgdG8gY3JlYXRlIGEgZmxleGlibGUgYW5kIHJlc3BvbnNpdmUgbGF5b3V0LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2ZsZXggRG9jc31cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9IdWJTcG90L3VpLWV4dGVuc2lvbnMtZXhhbXBsZXMvdHJlZS9tYWluL2ZsZXgtYW5kLWJveCBGbGV4IGFuZCBCb3ggRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IEZsZXggPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdGbGV4Jyk7XG4vKipcbiAqIFRoZSBgRGF0ZUlucHV0YCBjb21wb25lbnQgcmVuZGVycyBhbiBpbnB1dCBmaWVsZCB3aGVyZSBhIHVzZXIgY2FuIHNlbGVjdCBhIGRhdGUuIENvbW1vbmx5IHVzZWQgd2l0aGluIHRoZSBgRm9ybWAgY29tcG9uZW50LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2RhdGUtaW5wdXQgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IERhdGVJbnB1dCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0RhdGVJbnB1dCcpO1xuLyoqXG4gKiBUaGUgYENoZWNrYm94YCBjb21wb25lbnQgcmVuZGVycyBhIHNpbmdsZSBjaGVja2JveCBpbnB1dC4gQ29tbW9ubHkgdXNlZCB3aXRoaW4gdGhlIGBGb3JtYCBjb21wb25lbnQuIElmIHlvdSB3YW50IHRvIGRpc3BsYXkgbXVsdGlwbGUgY2hlY2tib3hlcywgeW91IHNob3VsZCB1c2UgYFRvZ2dsZUdyb3VwYCBpbnN0ZWFkLCBhcyBpdCBjb21lcyB3aXRoIGV4dHJhIGxvZ2ljIGZvciBoYW5kbGluZyBtdWx0aXBsZSBjaGVja2JveGVzLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2NoZWNrYm94IERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBDaGVja2JveCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NoZWNrYm94Jyk7XG4vKipcbiAqIFRoZSBgUmFkaW9CdXR0b25gIGNvbXBvbmVudCByZW5kZXJzIGEgc2luZ2xlIHJhZGlvIGlucHV0LiBDb21tb25seSB1c2VkIHdpdGhpbiB0aGUgYEZvcm1gIGNvbXBvbmVudC4gSWYgeW91IHdhbnQgdG8gZGlzcGxheSBtdWx0aXBsZSByYWRpbyBpbnB1dHMsIHlvdSBzaG91bGQgdXNlIGBUb2dnbGVHcm91cGAgaW5zdGVhZCwgYXMgaXQgY29tZXMgd2l0aCBleHRyYSBsb2dpYyBmb3IgaGFuZGxpbmcgbXVsdGlwbGUgaW5wdXRzLlxuICovXG5leHBvcnQgY29uc3QgUmFkaW9CdXR0b24gPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdSYWRpb0J1dHRvbicpO1xuLyoqXG4gKiBUaGUgYExpc3RgIGNvbXBvbmVudCByZW5kZXJzIGEgbGlzdCBvZiBpdGVtcy4gVXNlIHRoaXMgY29tcG9uZW50IHRvIGRpc3BsYXkgYSBsaXN0IG9mIGl0ZW1zLCBzdWNoIGFzIGEgbGlzdCBvZiBjb250YWN0cywgdGFza3MsIG9yIG90aGVyIGRhdGEuIEEgbGlzdCBjYW4gYmUgc3R5bGVkIGFzIGEgYnVsbGV0ZWQgbGlzdCBvciBhIG51bWJlcmVkIGxpc3QuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvbGlzdCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgTGlzdCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0xpc3QnKTtcbi8qKlxuICogVGhlIGBUb2dnbGVgIGNvbXBvbmVudCByZW5kZXJzIGEgYm9vbGVhbiB0b2dnbGUgc3dpdGNoIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQgd2l0aCBzaXppbmcsIGxhYmVsIHBvc2l0aW9uLCByZWFkLW9ubHksIGFuZCBtb3JlLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3RvZ2dsZSBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgVG9nZ2xlID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVG9nZ2xlJyk7XG4vKipcbiAqIFRoZSBgRHJvcGRvd25gIGNvbXBvbmVudCByZW5kZXJzIGEgZHJvcGRvd24gbWVudSB0aGF0IGNhbiBhcHBlYXIgYXMgYSBidXR0b24gb3IgaHlwZXJsaW5rLiBVc2UgdGhpcyBjb21wb25lbnQgdG8gZW5hYmxlIHVzZXJzIHRvIHNlbGVjdCBmcm9tIG11bHRpcGxlIG9wdGlvbnMgaW4gYSBjb21wYWN0IGxpc3QuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvZHJvcGRvd24gRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IERyb3Bkb3duID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVDb21wb3VuZFJlYWN0Q29tcG9uZW50KCdEcm9wZG93bicsIHtcbiAgICBjb21wb3VuZENvbXBvbmVudFByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBgRHJvcGRvd24uQnV0dG9uSXRlbWAgY29tcG9uZW50IHJlcHJlc2VudHMgYSBzaW5nbGUgb3B0aW9uIHdpdGhpbiBhIGBEcm9wZG93bmAgbWVudS4gVXNlIHRoaXMgY29tcG9uZW50IGFzIGEgY2hpbGQgb2YgdGhlIGBEcm9wZG93bmAgY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiAqKkxpbmtzOioqXG4gICAgICAgICAqXG4gICAgICAgICAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvZHJvcGRvd24gRG9jc31cbiAgICAgICAgICovXG4gICAgICAgIEJ1dHRvbkl0ZW06IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0Ryb3Bkb3duQnV0dG9uSXRlbScsIHtcbiAgICAgICAgICAgIGZyYWdtZW50UHJvcHM6IFsnb3ZlcmxheSddLFxuICAgICAgICB9KSxcbiAgICB9LFxufSk7XG4vKipcbiAqIFRoZSBQYW5lbCBjb21wb25lbnQgcmVuZGVycyBhIHBhbmVsIG92ZXJsYXkgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHBhZ2UgYW5kIGNvbnRhaW5zIG90aGVyIGNvbXBvbmVudHMuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvcGFuZWwgRG9jc31cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9IdWJTcG90L3VpLWV4dGVuc2lvbnMtZXhhbXBsZXMvdHJlZS9tYWluL292ZXJsYXktZXhhbXBsZSBPdmVybGF5IEV4YW1wbGV9XG4gKiAtIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vSHViU3BvdC91aS1leHRlbnNpb25zLWV4YW1wbGVzL3RyZWUvbWFpbi9kZXNpZ24tcGF0dGVybnMjcGFuZWwgRGVzaWduIFBhdHRlcm4gRXhhbXBsZXN9XG4gKi9cbmV4cG9ydCBjb25zdCBQYW5lbCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1BhbmVsJyk7XG4vKipcbiAqIFRoZSBgUGFuZWxGb290ZXJgIGlzIGEgc3RpY2t5IGZvb3RlciBjb21wb25lbnQgZGlzcGxheWVkIGF0IHRoZSBib3R0b20gb2YgYSBgUGFuZWxgIGNvbXBvbmVudC4gVXNlIHRoaXMgY29tcG9uZW50IHRvIGRpc3BsYXkgYWN0aW9ucyBvciBvdGhlciBjb250ZW50IHRoYXQgc2hvdWxkIGJlIHZpc2libGUgYXQgYWxsIHRpbWVzLiBJbmNsdWRlIG9ubHkgb25lIGBQYW5lbEZvb3RlcmAgY29tcG9uZW50IHBlciBgUGFuZWxgLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3BhbmVsLWZvb3RlciBEb2NzfVxuICogLSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdWktZXh0ZW5zaW9ucy1leGFtcGxlcy90cmVlL21haW4vb3ZlcmxheS1leGFtcGxlIE92ZXJsYXkgRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IFBhbmVsRm9vdGVyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnUGFuZWxGb290ZXInKTtcbi8qKlxuICogVGhlIGBQYW5lbEJvZHlgIGNvbXBvbmVudCBpcyBhIGNvbnRhaW5lciB0aGF0IHdyYXBzIHRoZSBwYW5lbCdzIGNvbnRlbnQgYW5kIG1ha2VzIGl0IHNjcm9sbGFibGUuIEluY2x1ZGUgb25seSBvbmUgYFBhbmVsQm9keWAgY29tcG9uZW50IHBlciBgUGFuZWxgLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3BhbmVsLWZvb3RlciBEb2NzfVxuICogLSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdWktZXh0ZW5zaW9ucy1leGFtcGxlcy90cmVlL21haW4vb3ZlcmxheS1leGFtcGxlIE92ZXJsYXkgRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IFBhbmVsQm9keSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1BhbmVsQm9keScpO1xuLyoqXG4gKiBUaGUgYFBhbmVsU2VjdGlvbmAgY29tcG9uZW50IGlzIGEgY29udGFpbmVyIHRoYXQgYWRkcyBwYWRkaW5nIGFuZCBib3R0b20gbWFyZ2luIHRvIHByb3ZpZGUgc3BhY2luZyBiZXR3ZWVuIGNvbnRlbnQuIFVzZSB0aGUgYFBhbmVsU2VjdGlvbmAgY29tcG9uZW50IHRvIHNlcGFyYXRlIGNvbnRlbnQgd2l0aGluIGEgYFBhbmVsQm9keWAuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvcGFuZWwtZm9vdGVyIERvY3N9XG4gKiAtIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vSHViU3BvdC91aS1leHRlbnNpb25zLWV4YW1wbGVzL3RyZWUvbWFpbi9vdmVybGF5LWV4YW1wbGUgT3ZlcmxheSBFeGFtcGxlfVxuICovXG5leHBvcnQgY29uc3QgUGFuZWxTZWN0aW9uID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnUGFuZWxTZWN0aW9uJyk7XG4vKipcbiAqIFRoZSBgU3RlcHBlcklucHV0YCBjb21wb25lbnQgcmVuZGVycyBhIG51bWJlciBpbnB1dCBmaWVsZCB0aGF0IGNhbiBiZSBpbmNyZWFzZWQgb3IgZGVjcmVhc2VkIGJ5IGEgc2V0IG51bWJlci4gQ29tbW9ubHkgdXNlZCB3aXRoaW4gdGhlIGBGb3JtYCBjb21wb25lbnQuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvc3RlcHBlci1pbnB1dCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgU3RlcHBlcklucHV0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnU3RlcHBlcklucHV0Jyk7XG4vKipcbiAqIFRoZSBNb2RhbCBjb21wb25lbnQgcmVuZGVycyBhIHBvcC11cCBvdmVybGF5IHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgY29tcG9uZW50cy5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9tb2RhbCBEb2NzfVxuICogLSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdWktZXh0ZW5zaW9ucy1leGFtcGxlcy90cmVlL21haW4vb3ZlcmxheS1leGFtcGxlIE92ZXJsYXkgRXhhbXBsZX1cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9IdWJTcG90L3VpLWV4dGVuc2lvbnMtZXhhbXBsZXMvdHJlZS9tYWluL2Rlc2lnbi1wYXR0ZXJucyNtb2RhbCBEZXNpZ24gUGF0dGVybiBFeGFtcGxlc31cbiAqL1xuZXhwb3J0IGNvbnN0IE1vZGFsID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnTW9kYWwnKTtcbi8qKlxuICogVGhlIGBNb2RhbEJvZHlgIGNvbXBvbmVudCBjb250YWlucyB0aGUgbWFpbiBjb250ZW50IG9mIHRoZSBtb2RhbC4gT25lIGBNb2RhbEJvZHlgIGlzIHJlcXVpcmVkIHBlciBgTW9kYWxgLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL21vZGFsIERvY3N9XG4gKiAtIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vSHViU3BvdC91aS1leHRlbnNpb25zLWV4YW1wbGVzL3RyZWUvbWFpbi9vdmVybGF5LWV4YW1wbGUgT3ZlcmxheSBFeGFtcGxlfVxuICovXG5leHBvcnQgY29uc3QgTW9kYWxCb2R5ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnTW9kYWxCb2R5Jyk7XG4vKipcbiAqIFRoZSBgTW9kYWxGb290ZXJgIGNvbXBvbmVudCBpcyBhbiBvcHRpb25hbCBjb21wb25lbnQgdG8gZm9ybWF0IHRoZSBmb290ZXIgc2VjdGlvbiBvZiB0aGUgbW9kYWwuIFVzZSBvbmUgYE1vZGFsRm9vdGVyYCBwZXIgYE1vZGFsYC5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9tb2RhbCBEb2NzfVxuICogLSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdWktZXh0ZW5zaW9ucy1leGFtcGxlcy90cmVlL21haW4vb3ZlcmxheS1leGFtcGxlIE92ZXJsYXkgRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IE1vZGFsRm9vdGVyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnTW9kYWxGb290ZXInKTtcbi8qKlxuICogVXNlIHRoZSBgSWNvbmAgY29tcG9uZW50IHRvIHJlbmRlciBhIHZpc3VhbCBpY29uIHdpdGhpbiBvdGhlciBjb21wb25lbnRzLiBJdCBjYW4gZ2VuZXJhbGx5IGJlIHVzZWQgaW5zaWRlIG1vc3QgY29tcG9uZW50cywgZXhjbHVkaW5nIG9uZXMgdGhhdCBkb24ndCBzdXBwb3J0IGNoaWxkIGNvbXBvbmVudHMuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvaWNvbiBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgSWNvbiA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0ljb24nKTtcbi8qKlxuICogVGhlIGBTdGF0dXNUYWdgIGNvbXBvbmVudCByZW5kZXJzIGEgdmlzdWFsIGluZGljYXRvciB0byBkaXNwbGF5IHRoZSBjdXJyZW50IHN0YXR1cyBvZiBhbiBpdGVtLiBTdGF0dXMgdGFncyBjYW4gYmUgc3RhdGljIG9yIGNsaWNrYWJsZS5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9zdGF0dXMtdGFnIERvY3N9XG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3N0YXR1cy10YWcjdmFyaWFudHMgVmFyaWFudHN9XG4gKi9cbmV4cG9ydCBjb25zdCBTdGF0dXNUYWcgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGF0dXNUYWcnKTtcbi8qKlxuICogVGhlIGBMb2FkaW5nQnV0dG9uYCBjb21wb25lbnQgcmVuZGVycyBhIGJ1dHRvbiB3aXRoIGxvYWRpbmcgc3RhdGUgb3B0aW9ucy5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9sb2FkaW5nLWJ1dHRvbiBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgTG9hZGluZ0J1dHRvbiA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0xvYWRpbmdCdXR0b24nLCB7XG4gICAgZnJhZ21lbnRQcm9wczogWydvdmVybGF5J10sXG59KTtcbi8qKlxuICogVGhlIGBCYXJDaGFydGAgY29tcG9uZW50IHJlbmRlcnMgYSBiYXIgY2hhcnQgZm9yIHZpc3VhbGl6aW5nIGRhdGEuIFRoaXMgdHlwZSBvZiBjaGFydCBpcyBiZXN0IHN1aXRlZCBmb3IgY29tcGFyaW5nIGNhdGVnb3JpY2FsIGRhdGEuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvYmFyLWNoYXJ0IEJhckNoYXJ0IERvY3N9XG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2NoYXJ0cyBDaGFydHMgRG9jc31cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9IdWJTcG90L3VpLWV4dGVuc2lvbnMtZXhhbXBsZXMvdHJlZS9tYWluL2NoYXJ0cy1leGFtcGxlIENoYXJ0cyBFeGFtcGxlfVxuICovXG5leHBvcnQgY29uc3QgQmFyQ2hhcnQgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdCYXJDaGFydCcpO1xuLyoqXG4gKiBUaGUgYExpbmVDaGFydGAgY29tcG9uZW50IHJlbmRlcnMgYSBsaW5lIGNoYXJ0IGZvciB2aXN1YWxpemluZyBkYXRhLiBUaGlzIHR5cGUgb2YgY2hhcnQgaXMgYmVzdCBzdWl0ZWQgZm9yIHRpbWUgc2VyaWVzIHBsb3RzIG9yIHRyZW5kIGRhdGEuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvbGluZS1jaGFydCBMaW5lQ2hhcnQgRG9jc31cbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvY2hhcnRzIENoYXJ0cyBEb2NzfVxuICogLSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdWktZXh0ZW5zaW9ucy1leGFtcGxlcy90cmVlL21haW4vY2hhcnRzLWV4YW1wbGUgQ2hhcnRzIEV4YW1wbGV9XG4gKi9cbmV4cG9ydCBjb25zdCBMaW5lQ2hhcnQgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdMaW5lQ2hhcnQnKTtcbi8qKlxuICogVGhlIGBTY29yZUNpcmNsZWAgY29tcG9uZW50IGRpc3BsYXlzIGEgc2NvcmUgdmFsdWUgKDAtMTAwKSBhcyBhIGNpcmN1bGFyIHByb2dyZXNzIGluZGljYXRvciB3aXRoIGNvbG9yLWNvZGVkIGJhbmRzLlxuICogU2NvcmVzIGFyZSBjb2xvci1jb2RlZDogMC0zMiAoYWxlcnQvcmVkKSwgMzMtNjUgKHdhcm5pbmcveWVsbG93KSwgNjYtMTAwIChzdWNjZXNzL2dyZWVuKS5cbiAqIEBleGFtcGxlXG4gKiBgYGB0c3hcbiAqICAgPFNjb3JlQ2lyY2xlIHNjb3JlPXs3NX0gLz5cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgU2NvcmVDaXJjbGUgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTY29yZUNpcmNsZScpO1xuLyoqXG4gKiBgVGFic2AgYWxsb3cgeW91IHRvIGdyb3VwIHJlbGF0ZWQgY29udGVudCBpbiBhIGNvbXBhY3Qgc3BhY2UsIGFsbG93aW5nIHVzZXJzIHRvIHN3aXRjaCBiZXR3ZWVuIHZpZXdzIHdpdGhvdXQgbGVhdmluZyB0aGUgcGFnZS5cbiAqIEBleGFtcGxlXG4gKiBgYGB0c3hcbiAqIDxUYWJzIGRlZmF1bHRTZWxlY3RlZD1cIjFcIj5cbiAqICAgPFRhYiB0YWJJZD1cIjFcIj5GaXJzdCB0YWIgY29udGVudDwvVGFiPlxuICogICA8VGFiIHRhYklkPVwiMlwiPlNlY29uZCB0YWIgY29udGVudDwvVGFiPlxuICogPC9UYWJzPlxuICogYGBgXG4gKlxuICogKipMaW5rczoqKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy90YWJzIERvY3VtZW50YXRpb259XG4gKiAtIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vaHVic3BvdGRldi91aWUtdGFiYmVkLXByb2R1Y3QtY2Fyb3VzZWwgVGFicyBFeGFtcGxlfVxuICovXG5leHBvcnQgY29uc3QgVGFicyA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYnMnKTtcbi8qKlxuICogRWFjaCBgVGFiYCByZXByZXNlbnRzIGEgc2luZ2xlIHRhYiAob3IgXCJ2aWV3XCIpIHdpdGhpbiB0aGUgcGFyZW50IGBUYWJzYCBjb21wb25lbnQuXG4gKiBAZXhhbXBsZVxuICogYGBgdHN4XG4gKiA8VGFicyBkZWZhdWx0U2VsZWN0ZWQ9XCIxXCI+XG4gKiAgIDxUYWIgdGFiSWQ9XCIxXCI+Rmlyc3QgdGFiIGNvbnRlbnQ8L1RhYj5cbiAqICAgPFRhYiB0YWJJZD1cIjJcIj5TZWNvbmQgdGFiIGNvbnRlbnQ8L1RhYj5cbiAqIDwvVGFicz5cbiAqIGBgYFxuICpcbiAqICoqTGlua3M6KipcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvdGFicyBEb2N1bWVudGF0aW9ufVxuICogLSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2h1YnNwb3RkZXYvdWllLXRhYmJlZC1wcm9kdWN0LWNhcm91c2VsIFRhYnMgRXhhbXBsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IFRhYiA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYicpO1xuLyoqXG4gKiBUaGUgYElsbHVzdHJhdGlvbmAgY29tcG9uZW50IHJlbmRlcnMgYW4gaWxsdXN0cmF0aW9uLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2lsbHVzdHJhdGlvbiBJbGx1c3RyYXRpb24gRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IElsbHVzdHJhdGlvbiA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0lsbHVzdHJhdGlvbicpO1xuLyoqXG4gKiBUaGUgYFRvb2x0aXBgIGNvbXBvbmVudCByZW5kZXJzIGEgdG9vbHRpcCBmb3IgYSBjb21wb25lbnQuXG4gKlxuICogKipMaW5rczoqKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy90b29sdGlwIERvY3VtZW50YXRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBUb29sdGlwID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVG9vbHRpcCcpO1xuLyoqXG4gKiBUaGUgYFNlYXJjaElucHV0YCBjb21wb25lbnQgcmVuZGVycyBhIHNlYXJjaCBpbnB1dCBmaWVsZC5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9zZWFyY2gtaW5wdXQgU2VhcmNoSW5wdXQgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFNlYXJjaElucHV0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnU2VhcmNoSW5wdXQnKTtcbi8qKlxuICogVGhlIGBUaW1lSW5wdXRgIGNvbXBvbmVudCByZW5kZXJzIGFuIGlucHV0IGZpZWxkIHdoZXJlIGEgdXNlciBjYW4gc2VsZWN0IGEgdGltZS4gQ29tbW9ubHkgdXNlZCB3aXRoaW4gdGhlIGBGb3JtYCBjb21wb25lbnQuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL3N0YW5kYXJkLWNvbXBvbmVudHMvdGltZS1pbnB1dCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgVGltZUlucHV0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnVGltZUlucHV0Jyk7XG4vKipcbiAqIFRoZSBgQ3VycmVuY3lJbnB1dGAgY29tcG9uZW50IHJlbmRlcnMgYSBjdXJyZW5jeSBpbnB1dCBmaWVsZCB3aXRoIHByb3BlciBmb3JtYXR0aW5nLFxuICogY3VycmVuY3kgc3ltYm9scywgYW5kIGxvY2FsZS1zcGVjaWZpYyBkaXNwbGF5IHBhdHRlcm5zLiBDb21tb25seSB1c2VkIHdpdGhpbiB0aGUgYEZvcm1gIGNvbXBvbmVudC5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9jdXJyZW5jeS1pbnB1dCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgQ3VycmVuY3lJbnB1dCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0N1cnJlbmN5SW5wdXQnKTtcbi8qKlxuICogVGhlIGBJbmxpbmVgIGNvbXBvbmVudCBzcHJlYWRzIGFsaWducyBpdHMgY2hpbGRyZW4gaG9yaXpvbnRhbGx5IChhbG9uZyB0aGUgeC1heGlzKS5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9pbmxpbmUgRG9jc31cbiAqLyBleHBvcnQgY29uc3QgSW5saW5lID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnSW5saW5lJyk7XG4vKipcbiAqIFRoZSBgQXV0b0dyaWRgIGNvbXBvbmVudCByZW5kZXJzIGEgcmVzcG9uc2l2ZSBncmlkIGxheW91dCB0aGF0IGF1dG9tYXRpY2FsbHkgYWRqdXN0cyB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYmFzZWQgb24gYXZhaWxhYmxlIHNwYWNlLiBVc2UgdGhpcyBjb21wb25lbnQgdG8gY3JlYXRlIGZsZXhpYmxlIGdyaWQgbGF5b3V0cyBmb3IgY2FyZHMsIHRpbGVzLCBvciBvdGhlciBjb250ZW50LlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL3NpbXBsZS1ncmlkIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBBdXRvR3JpZCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0F1dG9HcmlkJyk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ1JNIENPTVBPTkVOVFNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5leHBvcnQgY29uc3QgQ3JtUHJvcGVydHlMaXN0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQ3JtUHJvcGVydHlMaXN0Jyk7XG5leHBvcnQgY29uc3QgQ3JtQXNzb2NpYXRpb25UYWJsZSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NybUFzc29jaWF0aW9uVGFibGUnKTtcbmV4cG9ydCBjb25zdCBDcm1EYXRhSGlnaGxpZ2h0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQ3JtRGF0YUhpZ2hsaWdodCcpO1xuZXhwb3J0IGNvbnN0IENybVJlcG9ydCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NybVJlcG9ydCcpO1xuZXhwb3J0IGNvbnN0IENybUFzc29jaWF0aW9uUGl2b3QgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdDcm1Bc3NvY2lhdGlvblBpdm90Jyk7XG5leHBvcnQgY29uc3QgQ3JtQXNzb2NpYXRpb25Qcm9wZXJ0eUxpc3QgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdDcm1Bc3NvY2lhdGlvblByb3BlcnR5TGlzdCcpO1xuZXhwb3J0IGNvbnN0IENybUFzc29jaWF0aW9uU3RhZ2VUcmFja2VyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQ3JtQXNzb2NpYXRpb25TdGFnZVRyYWNrZXInKTtcbmV4cG9ydCBjb25zdCBDcm1TaW1wbGVEZWFkbGluZSA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NybVNpbXBsZURlYWRsaW5lJyk7XG5leHBvcnQgY29uc3QgQ3JtU3RhZ2VUcmFja2VyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQ3JtU3RhZ2VUcmFja2VyJyk7XG5leHBvcnQgY29uc3QgQ3JtU3RhdGlzdGljcyA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NybVN0YXRpc3RpY3MnKTtcbmV4cG9ydCBjb25zdCBDcm1BY3Rpb25CdXR0b24gPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdDcm1BY3Rpb25CdXR0b24nKTtcbmV4cG9ydCBjb25zdCBDcm1BY3Rpb25MaW5rID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQ3JtQWN0aW9uTGluaycpO1xuZXhwb3J0IGNvbnN0IENybUNhcmRBY3Rpb25zID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnQ3JtQ2FyZEFjdGlvbnMnKTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBUFAgSE9NRSBDT01QT05FTlRTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLyoqXG4gKiBUaGUgYEhlYWRlckFjdGlvbnNgIGNvbXBvbmVudCByZW5kZXJzIGEgY29udGFpbmVyIGZvciBhY3Rpb24gYnV0dG9ucyBpbiB0aGUgYXBwIGhvbWUgaGVhZGVyLiBJdCBhY2NlcHRzIGBQcmltYXJ5SGVhZGVyQWN0aW9uQnV0dG9uYCBhbmQgYFNlY29uZGFyeUhlYWRlckFjdGlvbkJ1dHRvbmAgYXMgY2hpbGRyZW4uXG4gKlxuICovXG5leHBvcnQgY29uc3QgSGVhZGVyQWN0aW9ucyA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ0hlYWRlckFjdGlvbnMnKTtcbi8qKlxuICogVGhlIGBQcmltYXJ5SGVhZGVyQWN0aW9uQnV0dG9uYCBjb21wb25lbnQgcmVuZGVycyBhIHByaW1hcnkgYWN0aW9uIGJ1dHRvbiBpbiB0aGUgYXBwIGhvbWUgaGVhZGVyLiBUaGlzIGJ1dHRvbiBpcyBzdHlsZWQgYXMgdGhlIG1haW4gY2FsbC10by1hY3Rpb24gYW5kIG9ubHkgb25lIHNob3VsZCBiZSB1c2VkIHBlciBgSGVhZGVyQWN0aW9uc2AgY29udGFpbmVyLlxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IFByaW1hcnlIZWFkZXJBY3Rpb25CdXR0b24gPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQcmltYXJ5SGVhZGVyQWN0aW9uQnV0dG9uJywge1xuICAgIGZyYWdtZW50UHJvcHM6IFsnb3ZlcmxheSddLFxufSk7XG4vKipcbiAqIFRoZSBgU2Vjb25kYXJ5SGVhZGVyQWN0aW9uQnV0dG9uYCBjb21wb25lbnQgcmVuZGVycyBhIHNlY29uZGFyeSBhY3Rpb24gYnV0dG9uIGluIHRoZSBhcHAgaG9tZSBoZWFkZXIuIE11bHRpcGxlIHNlY29uZGFyeSBhY3Rpb25zIGNhbiBiZSB1c2VkIGFuZCB0aGV5IHdpbGwgYmUgZ3JvdXBlZCBhcHByb3ByaWF0ZWx5IGluIHRoZSBoZWFkZXIuXG4gKlxuICovXG5leHBvcnQgY29uc3QgU2Vjb25kYXJ5SGVhZGVyQWN0aW9uQnV0dG9uID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnU2Vjb25kYXJ5SGVhZGVyQWN0aW9uQnV0dG9uJywge1xuICAgIGZyYWdtZW50UHJvcHM6IFsnb3ZlcmxheSddLFxufSk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQVBQIFBBR0UgQ09NUE9ORU5UU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8qKlxuICogVGhlIGBQYWdlSGVhZGVyYCBjb21wb25lbnQgcmVuZGVycyB0aGUgYWN0aW9ucyB3aXRoaW4gdGhlIGhlYWRlciBvZiB0aGUgcGFnZS4gSXQgYWNjZXB0cyBgUHJpbWFyeUFjdGlvbmAgYW5kIGBTZWNvbmRhcnlBY3Rpb25zYCBhcyBjaGlsZHJlbi5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9hcHAtcGFnZS1jb21wb25lbnRzL3BhZ2UtaGVhZGVyIERvY3N9XG4gKi9cbmV4cG9ydCBjb25zdCBQYWdlSGVhZGVyID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVDb21wb3VuZFJlYWN0Q29tcG9uZW50KCdQYWdlSGVhZGVyJywge1xuICAgIGNvbXBvdW5kQ29tcG9uZW50UHJvcGVydGllczoge1xuICAgICAgICBQcmltYXJ5QWN0aW9uOiBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQYWdlSGVhZGVyUHJpbWFyeUFjdGlvbicpLFxuICAgICAgICBTZWNvbmRhcnlBY3Rpb25zOiBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQYWdlSGVhZGVyU2Vjb25kYXJ5QWN0aW9ucycpLFxuICAgICAgICBMaW5rOiBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQYWdlSGVhZGVyTGluaycpLFxuICAgICAgICBQYWdlTGluazogY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnUGFnZUhlYWRlclBhZ2VMaW5rJyksXG4gICAgfSxcbn0pO1xuLyoqXG4gKiBUaGUgJ1BhZ2VCcmVhZGNydW1icycgY29tcG9uZW50IHJlbmRlcnMgYSBsaXN0IG9mIGxpbmtzIHRvIHNob3cgdGhlIHVzZXIncyBjdXJyZW50IGxvY2F0aW9uIHdpdGhpbiB0aGUgYXBwIGFuZCBhbGxvdyB0aGVtIHRvIG5hdmlnYXRlIGJhY2sgdG8gcHJldmlvdXMgcGFnZXMuXG4gKlxuICogKipMaW5rczoqKlxuICpcbiAqIC0ge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5odWJzcG90LmNvbS9kb2NzL3JlZmVyZW5jZS91aS1jb21wb25lbnRzL2FwcC1wYWdlLWNvbXBvbmVudHMvcGFnZS1icmVhZGNydW1icyBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgUGFnZUJyZWFkY3J1bWJzID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVDb21wb3VuZFJlYWN0Q29tcG9uZW50KCdQYWdlQnJlYWRjcnVtYnMnLCB7XG4gICAgY29tcG91bmRDb21wb25lbnRQcm9wZXJ0aWVzOiB7XG4gICAgICAgIFBhZ2VMaW5rOiBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQYWdlQnJlYWRjcnVtYnNQYWdlTGluaycpLFxuICAgICAgICBDdXJyZW50OiBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQYWdlQnJlYWRjcnVtYnNDdXJyZW50JyksXG4gICAgfSxcbn0pO1xuZXhwb3J0IGNvbnN0IFBhZ2VMaW5rID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnUGFnZUxpbmsnKTtcbmV4cG9ydCBjb25zdCBQYWdlVGl0bGUgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQYWdlVGl0bGUnKTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBFWFBFUklNRU5UQUwgQ09NUE9ORU5UU1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBUaGlzIGNvbXBvbmVudCBpcyBleHBlcmltZW50YWwuIEF2b2lkIHVzaW5nIGl0IGluIHByb2R1Y3Rpb24gZHVlIHRvIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBZb3VyIGZlZWRiYWNrIGlzIHZhbHVhYmxlIGZvciBpbXByb3ZlbWVudHMuIFN0YXkgdHVuZWQgZm9yIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBJZnJhbWUgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdJZnJhbWUnKTtcbi8qKlxuICogQGV4cGVyaW1lbnRhbCBUaGlzIGNvbXBvbmVudCBpcyBleHBlcmltZW50YWwuIEF2b2lkIHVzaW5nIGl0IGluIHByb2R1Y3Rpb24gZHVlIHRvIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBZb3VyIGZlZWRiYWNrIGlzIHZhbHVhYmxlIGZvciBpbXByb3ZlbWVudHMuIFN0YXkgdHVuZWQgZm9yIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBNZWRpYU9iamVjdCA9IGNyZWF0ZUFuZFJlZ2lzdGVyUmVtb3RlUmVhY3RDb21wb25lbnQoJ01lZGlhT2JqZWN0Jywge1xuICAgIGZyYWdtZW50UHJvcHM6IFsnaXRlbVJpZ2h0JywgJ2l0ZW1MZWZ0J10sXG59KTtcbi8qKlxuICogQGV4cGVyaW1lbnRhbCBUaGlzIGNvbXBvbmVudCBpcyBleHBlcmltZW50YWwuIEF2b2lkIHVzaW5nIGl0IGluIHByb2R1Y3Rpb24gZHVlIHRvIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBZb3VyIGZlZWRiYWNrIGlzIHZhbHVhYmxlIGZvciBpbXByb3ZlbWVudHMuIFN0YXkgdHVuZWQgZm9yIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBTdGFjazIgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGFjazInKTtcbi8qKlxuICogQGV4cGVyaW1lbnRhbCBUaGlzIGNvbXBvbmVudCBpcyBleHBlcmltZW50YWwuIEF2b2lkIHVzaW5nIGl0IGluIHByb2R1Y3Rpb24gZHVlIHRvIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBZb3VyIGZlZWRiYWNrIGlzIHZhbHVhYmxlIGZvciBpbXByb3ZlbWVudHMuIFN0YXkgdHVuZWQgZm9yIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBDZW50ZXIgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdDZW50ZXInKTtcbi8qKlxuICogQGV4cGVyaW1lbnRhbCBUaGlzIGNvbXBvbmVudCBpcyBleHBlcmltZW50YWwuIEF2b2lkIHVzaW5nIGl0IGluIHByb2R1Y3Rpb24gZHVlIHRvIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBZb3VyIGZlZWRiYWNrIGlzIHZhbHVhYmxlIGZvciBpbXByb3ZlbWVudHMuIFN0YXkgdHVuZWQgZm9yIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBHcmlkID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnR3JpZCcpO1xuLyoqXG4gKiBAZXhwZXJpbWVudGFsIFRoaXMgY29tcG9uZW50IGlzIGV4cGVyaW1lbnRhbC4gQXZvaWQgdXNpbmcgaXQgaW4gcHJvZHVjdGlvbiBkdWUgdG8gcG90ZW50aWFsIGJyZWFraW5nIGNoYW5nZXMuIFlvdXIgZmVlZGJhY2sgaXMgdmFsdWFibGUgZm9yIGltcHJvdmVtZW50cy4gU3RheSB0dW5lZCBmb3IgdXBkYXRlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IEdyaWRJdGVtID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnR3JpZEl0ZW0nKTtcbi8qKlxuICogQGV4cGVyaW1lbnRhbCBUaGlzIGNvbXBvbmVudCBpcyBleHBlcmltZW50YWwuIEF2b2lkIHVzaW5nIGl0IGluIHByb2R1Y3Rpb24gZHVlIHRvIHBvdGVudGlhbCBicmVha2luZyBjaGFuZ2VzLiBZb3VyIGZlZWRiYWNrIGlzIHZhbHVhYmxlIGZvciBpbXByb3ZlbWVudHMuIFN0YXkgdHVuZWQgZm9yIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBTZXR0aW5nc1ZpZXcgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdTZXR0aW5nc1ZpZXcnKTtcbi8qKlxuICogVGhlIGBFeHBhbmRhYmxlVGV4dGAgY29tcG9uZW50IHJlbmRlcnMgYSB0ZXh0IHRoYXQgY2FuIGJlIGV4cGFuZGVkIG9yIGNvbGxhcHNlZCBiYXNlZCBvbiBhIG1heGltdW0gaGVpZ2h0LlxuICpcbiAqIEBleHBlcmltZW50YWwgVGhpcyBjb21wb25lbnQgaXMgZXhwZXJpbWVudGFsLiBBdm9pZCB1c2luZyBpdCBpbiBwcm9kdWN0aW9uIGR1ZSB0byBwb3RlbnRpYWwgYnJlYWtpbmcgY2hhbmdlcy4gWW91ciBmZWVkYmFjayBpcyB2YWx1YWJsZSBmb3IgaW1wcm92ZW1lbnRzLiBTdGF5IHR1bmVkIGZvciB1cGRhdGVzLlxuICpcbiAqICoqTGlua3M6KipcbiAqXG4gKiAtIHtAbGluayBodHRwczovL2RldmVsb3BlcnMuaHVic3BvdC5jb20vZG9jcy9yZWZlcmVuY2UvdWktY29tcG9uZW50cy9zdGFuZGFyZC1jb21wb25lbnRzL2V4cGFuZGFibGUtdGV4dCBFeHBhbmRhYmxlVGV4dCBEb2NzfVxuICovXG5leHBvcnQgY29uc3QgRXhwYW5kYWJsZVRleHQgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdFeHBhbmRhYmxlVGV4dCcpO1xuLyoqXG4gKiBUaGUgYFBvcG92ZXJgIGNvbXBvbmVudCByZW5kZXJzIGEgcG9wb3ZlciBvdmVybGF5IHRoYXQgY2FuIGNvbnRhaW4gb3RoZXIgY29tcG9uZW50cy5cbiAqXG4gKiBAZXhwZXJpbWVudGFsIFRoaXMgY29tcG9uZW50IGlzIGV4cGVyaW1lbnRhbC4gQXZvaWQgdXNpbmcgaXQgaW4gcHJvZHVjdGlvbiBkdWUgdG8gcG90ZW50aWFsIGJyZWFraW5nIGNoYW5nZXMuIFlvdXIgZmVlZGJhY2sgaXMgdmFsdWFibGUgZm9yIGltcHJvdmVtZW50cy4gU3RheSB0dW5lZCBmb3IgdXBkYXRlcy5cbiAqXG4gKiAqKkxpbmtzOioqXG4gKlxuICogLSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmh1YnNwb3QuY29tL2RvY3MvcmVmZXJlbmNlL3VpLWNvbXBvbmVudHMvc3RhbmRhcmQtY29tcG9uZW50cy9wb3BvdmVyIFBvcG92ZXIgRG9jc31cbiAqL1xuZXhwb3J0IGNvbnN0IFBvcG92ZXIgPSBjcmVhdGVBbmRSZWdpc3RlclJlbW90ZVJlYWN0Q29tcG9uZW50KCdQb3BvdmVyJyk7XG4vKipcbiAqIEBleHBlcmltZW50YWwgVGhpcyBjb21wb25lbnQgaXMgZXhwZXJpbWVudGFsLiBBdm9pZCB1c2luZyBpdCBpbiBwcm9kdWN0aW9uIGR1ZSB0byBwb3RlbnRpYWwgYnJlYWtpbmcgY2hhbmdlcy4gWW91ciBmZWVkYmFjayBpcyB2YWx1YWJsZSBmb3IgaW1wcm92ZW1lbnRzLiBTdGF5IHR1bmVkIGZvciB1cGRhdGVzLlxuICovXG5leHBvcnQgY29uc3QgRmlsZUlucHV0ID0gY3JlYXRlQW5kUmVnaXN0ZXJSZW1vdGVSZWFjdENvbXBvbmVudCgnRmlsZUlucHV0Jyk7XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBSZWFjdFJlbmRlck1vY2tzQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQobnVsbCk7XG4vKipcbiAqIENyZWF0ZXMgYSBtb2NrLWF3YXJlIGhvb2sgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBtb2NrIHRoZSBvcmlnaW5hbCBob29rIGZ1bmN0aW9uLlxuICogVGhlIG1vY2stYXdhcmUgaG9vayBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgbW9ja2VkIGhvb2sgZnVuY3Rpb24gaWYgYSBtb2NrIGlzIGZvdW5kLCBvdGhlcndpc2UgaXQgd2lsbCByZXR1cm4gdGhlIG9yaWdpbmFsIGhvb2sgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIGhvb2tOYW1lIFRoZSBuYW1lIG9mIHRoZSBob29rIHRvIG1vY2sgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUga2V5IGluIHRoZSBNb2NrcyBpbnRlcmZhY2VcbiAqIEBwYXJhbSBvcmlnaW5hbEhvb2tGdW5jdGlvbiBUaGUgb3JpZ2luYWwgaG9vayBmdW5jdGlvbiB0byBjYWxsIGlmIG5vIG1vY2sgaXMgZm91bmRcbiAqIEByZXR1cm5zIFRoZSBtb2NrZWQgaG9vayBmdW5jdGlvbiBvciB0aGUgb3JpZ2luYWwgaG9vayBmdW5jdGlvbiBpZiBubyBtb2NrIGlzIGZvdW5kXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVNb2NrQXdhcmVIb29rID0gKGhvb2tOYW1lLCBvcmlnaW5hbEhvb2tGdW5jdGlvbikgPT4ge1xuICAgIGNvbnN0IHVzZVdyYXBwZXIgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBtb2Nrc0NvbnRleHQgPSB1c2VNb2Nrc0NvbnRleHQoKTtcbiAgICAgICAgaWYgKCFtb2Nrc0NvbnRleHQpIHtcbiAgICAgICAgICAgIC8vIElmIG5vIG1vY2tzIGFyZSBwcm92aWRlZCwgY2FsbCB0aGUgb3JpZ2luYWwgaG9vayBmdW5jdGlvblxuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsSG9va0Z1bmN0aW9uKC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbW9ja3MgfSA9IG1vY2tzQ29udGV4dDtcbiAgICAgICAgY29uc3QgbW9ja0hvb2sgPSBtb2Nrc1tob29rTmFtZV07XG4gICAgICAgIGlmICghbW9ja0hvb2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBTdGF0ZTogTW9jayBmb3IgaG9vayAke2hvb2tOYW1lfSBub3QgZm91bmQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vY2tIb29rKC4uLmFyZ3MpO1xuICAgIH07XG4gICAgcmV0dXJuIHVzZVdyYXBwZXI7XG59O1xuLyoqXG4gKiBBIGhvb2sgdGhhdCBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIE1vY2tzIGNvbnRleHQuXG4gKiBSZXR1cm5zIHRoZSBtb2NrcyBjb250ZXh0IHZhbHVlIGlmIGluc2lkZSBhIE1vY2tzQ29udGV4dFByb3ZpZGVyLCBvdGhlcndpc2UgcmV0dXJucyBudWxsLlxuICpcbiAqIEByZXR1cm5zIFRoZSBtb2NrcyBjb250ZXh0IHZhbHVlIG9yIG51bGwgaWYgbm90IGluIGEgdGVzdCBlbnZpcm9ubWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1vY2tzQ29udGV4dCgpIHtcbiAgICByZXR1cm4gdXNlQ29udGV4dChSZWFjdFJlbmRlck1vY2tzQ29udGV4dCk7XG59XG4vKipcbiAqIEEgUmVhY3QgY29tcG9uZW50IHRoYXQgcHJvdmlkZXMgdGhlIE1vY2tzIGNvbnRleHQgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIG1vY2tzIHRvIHRoZSBtb2NrLWF3YXJlIGhvb2sgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSBjaGlsZHJlbiBUaGUgY2hpbGRyZW4gdG8gcmVuZGVyLlxuICogQHJldHVybnMgVGhlIGNoaWxkcmVuIHdyYXBwZWQgaW4gdGhlIE1vY2tzIGNvbnRleHQgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBNb2Nrc0NvbnRleHRQcm92aWRlciA9IFJlYWN0UmVuZGVyTW9ja3NDb250ZXh0LlByb3ZpZGVyO1xuLyoqXG4gKiBTdGFiaWxpemVzIGEgdmFsdWUncyByZWZlcmVuY2UgaWRlbnRpdHkgYWNyb3NzIHJlLXJlbmRlcnMgdXNpbmcgZGVlcFxuICogY29tcGFyaXNvbiB2aWEgSlNPTi5zdHJpbmdpZnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGFibGVWYWx1ZSh2YWx1ZSkge1xuICAgIGNvbnN0IHN0YWJsZVJlZiA9IHVzZVJlZih7XG4gICAgICAgIGtleTogSlNPTi5zdHJpbmdpZnkodmFsdWUpLFxuICAgICAgICB2YWx1ZSxcbiAgICB9KTtcbiAgICBjb25zdCBrZXkgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgaWYgKGtleSAhPT0gc3RhYmxlUmVmLmN1cnJlbnQua2V5KSB7XG4gICAgICAgIHN0YWJsZVJlZi5jdXJyZW50ID0geyBrZXksIHZhbHVlIH07XG4gICAgfVxuICAgIHJldHVybiBzdGFibGVSZWYuY3VycmVudC52YWx1ZTtcbn1cbiIsImltcG9ydCB7XG4gIEJveCxcbiAgQnV0dG9uLFxuICBEaXZpZGVyLFxuICBGbGV4LFxuICBGb3JtLFxuICBJbnB1dCxcbiAgTGluayxcbiAgTG9hZGluZ1NwaW5uZXIsXG4gIERyb3Bkb3duLFxuICBTcGFjZXIsXG4gIFNlbGVjdCxcbiAgVGFibGUsXG4gIFRhYmxlQm9keSxcbiAgVGFibGVDZWxsLFxuICBUYWJsZUhlYWQsXG4gIFRhYmxlSGVhZGVyLFxuICBUYWJsZVJvdyxcbiAgVGV4dCxcbiAgVGV4dEFyZWEsXG4gIEhlYWRpbmcsXG4gIFN0YXR1c1RhZyxcbiAgVG9nZ2xlLFxuICBodWJzcG90LFxufSBmcm9tICdAaHVic3BvdC91aS1leHRlbnNpb25zJztcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmh1YnNwb3QuZXh0ZW5kKCh7IHJ1blNlcnZlcmxlc3NGdW5jdGlvbiwgY29udGV4dCB9KSA9PiAoXG4gIDxFeHRvbGVTZXR0aW5nc1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbj17cnVuU2VydmVybGVzc0Z1bmN0aW9ufVxuICAgIHBvcnRhbElkPXtjb250ZXh0LnBvcnRhbC5pZH1cbiAgICBsb2NhbGU9e2NvbnRleHQudXNlcj8ubG9jYWxlfVxuICAgIGFjdG9yPXtjb250ZXh0LnVzZXI/LmVtYWlsID8/ICcnfVxuICAvPlxuKSk7XG5cbmNvbnN0IERFRkFVTFRfSFVCU1BPVFVUS19QUk9QRVJUWSA9ICdleHRvbGVfaHVic3BvdHV0ayc7XG5jb25zdCBERUZBVUxUX0FEVk9DQVRFX0NPREVfUFJPUEVSVFkgPSAnZXh0b2xlX2Fkdm9jYXRlX2NvZGUnO1xuY29uc3QgREVGQVVMVF9SRUZFUlJBTF9VUkxfUEFSQU1TID0gJ2V4dG9sZV9zaGFyZWFibGVfY29kZSc7XG5jb25zdCBERUZBVUxUX1NIQVJFX0xJTktfUFJPUEVSVFkgPSAnZXh0b2xlX3NoYXJlX2xpbmsnO1xuXG4vLyDilIDilIDilIAgVHlwZXMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbnR5cGUgRmllbGRNYXBwaW5nID0geyBleHRvbGVLZXk6IHN0cmluZzsgc291cmNlOiAncHJvcGVydHknIHwgJ3N0YXRpYyc7IHZhbHVlOiBzdHJpbmcgfTtcblxudHlwZSBFdmVudEZvcm1TdGF0ZSA9IHtcbiAgZXZlbnROYW1lOiBzdHJpbmc7XG4gIHRyaWdnZXJPYmplY3Q6IHN0cmluZztcbiAgdHJpZ2dlclR5cGU6IHN0cmluZzsgICAgLy8gJ1JFQ09SRF9DUkVBVEVEJyB8ICdGSUVMRF9DSEFOR0VEJyB8ICdGSUVMRF9WQUxVRSdcbiAgdHJpZ2dlclByb3BlcnR5OiBzdHJpbmc7XG4gIHRyaWdnZXJUb1ZhbHVlOiBzdHJpbmc7XG4gIGZpZWxkTWFwcGluZ3M6IEZpZWxkTWFwcGluZ1tdO1xufTtcblxudHlwZSBPYmplY3RUeXBlT3B0aW9uID0geyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBvYmplY3RUeXBlSWQ6IHN0cmluZyB9O1xuXG50eXBlIFdvcmtmbG93SW5mbyA9IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBldmVudE5hbWU6IHN0cmluZzsgZW5hYmxlZDogYm9vbGVhbjsgc3RhdHVzPzogc3RyaW5nOyBvYmplY3RUeXBlSWQ/OiBzdHJpbmc7IGNyZWF0ZWRBdD86IHN0cmluZyB9O1xuXG50eXBlIFByb3BlcnR5U3RhdHVzID0geyBleGlzdHM6IGJvb2xlYW4gfCBudWxsOyBjcmVhdGVkQXQ/OiBzdHJpbmcgfTtcblxudHlwZSBMb2dFbnRyeSA9IHsgaWQ6IHN0cmluZzsgdGltZXN0YW1wOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nOyBhY3Rvcjogc3RyaW5nOyBkZXRhaWxzOiBzdHJpbmc7IHN0YXR1czogJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB9O1xuXG4vLyDilIDilIDilIAgRGVmYXVsdCBmaWVsZCBtYXBwaW5ncyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3QgQ09OVEFDVF9ERUZBVUxUUzogRmllbGRNYXBwaW5nW10gPSBbXG4gIHsgZXh0b2xlS2V5OiAnZW1haWwnLCBzb3VyY2U6ICdwcm9wZXJ0eScsIHZhbHVlOiAnZW1haWwnIH0sXG4gIHsgZXh0b2xlS2V5OiAnY29udGFjdF9pZCcsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdoc19vYmplY3RfaWQnIH0sXG4gIHsgZXh0b2xlS2V5OiAnZmlyc3RfbmFtZScsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdmaXJzdG5hbWUnIH0sXG4gIHsgZXh0b2xlS2V5OiAnbGFzdF9uYW1lJywgc291cmNlOiAncHJvcGVydHknLCB2YWx1ZTogJ2xhc3RuYW1lJyB9LFxuICB7IGV4dG9sZUtleTogJ2h1YnNwb3R1dGsnLCBzb3VyY2U6ICdwcm9wZXJ0eScsIHZhbHVlOiAnZXh0b2xlX2h1YnNwb3R1dGsnIH0sXG5dO1xuXG5jb25zdCBERUFMX0RFRkFVTFRTOiBGaWVsZE1hcHBpbmdbXSA9IFtcbiAgeyBleHRvbGVLZXk6ICdkZWFsX2lkJywgc291cmNlOiAncHJvcGVydHknLCB2YWx1ZTogJ2hzX29iamVjdF9pZCcgfSxcbiAgeyBleHRvbGVLZXk6ICdkZWFsX25hbWUnLCBzb3VyY2U6ICdwcm9wZXJ0eScsIHZhbHVlOiAnZGVhbG5hbWUnIH0sXG4gIHsgZXh0b2xlS2V5OiAnYW1vdW50Jywgc291cmNlOiAncHJvcGVydHknLCB2YWx1ZTogJ2Ftb3VudCcgfSxcbiAgeyBleHRvbGVLZXk6ICdjbG9zZV9kYXRlJywgc291cmNlOiAncHJvcGVydHknLCB2YWx1ZTogJ2Nsb3NlZGF0ZScgfSxcbl07XG5cbmNvbnN0IENPTVBBTllfREVGQVVMVFM6IEZpZWxkTWFwcGluZ1tdID0gW1xuICB7IGV4dG9sZUtleTogJ2NvbXBhbnlfaWQnLCBzb3VyY2U6ICdwcm9wZXJ0eScsIHZhbHVlOiAnaHNfb2JqZWN0X2lkJyB9LFxuICB7IGV4dG9sZUtleTogJ2NvbXBhbnlfbmFtZScsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICduYW1lJyB9LFxuICB7IGV4dG9sZUtleTogJ2RvbWFpbicsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdkb21haW4nIH0sXG5dO1xuXG5jb25zdCBUSUNLRVRfREVGQVVMVFM6IEZpZWxkTWFwcGluZ1tdID0gW1xuICB7IGV4dG9sZUtleTogJ3RpY2tldF9pZCcsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdoc19vYmplY3RfaWQnIH0sXG4gIHsgZXh0b2xlS2V5OiAnc3ViamVjdCcsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdzdWJqZWN0JyB9LFxuICB7IGV4dG9sZUtleTogJ3N0YXR1cycsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdoc19waXBlbGluZV9zdGFnZScgfSxcbl07XG5cbmNvbnN0IFFVT1RFX0RFRkFVTFRTOiBGaWVsZE1hcHBpbmdbXSA9IFtcbiAgeyBleHRvbGVLZXk6ICdxdW90ZV9pZCcsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdoc19vYmplY3RfaWQnIH0sXG4gIHsgZXh0b2xlS2V5OiAncXVvdGVfbmFtZScsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdoc190aXRsZScgfSxcbiAgeyBleHRvbGVLZXk6ICdhbW91bnQnLCBzb3VyY2U6ICdwcm9wZXJ0eScsIHZhbHVlOiAnaHNfdG90YWxfYW1vdW50JyB9LFxuICB7IGV4dG9sZUtleTogJ3N0YXR1cycsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICdoc19zdGF0dXMnIH0sXG5dO1xuXG5jb25zdCBERUZBVUxUX01BUFBJTkdTOiBSZWNvcmQ8c3RyaW5nLCBGaWVsZE1hcHBpbmdbXT4gPSB7XG4gIGNvbnRhY3Q6IENPTlRBQ1RfREVGQVVMVFMsXG4gIGRlYWw6IERFQUxfREVGQVVMVFMsXG4gIGNvbXBhbnk6IENPTVBBTllfREVGQVVMVFMsXG4gIHRpY2tldDogVElDS0VUX0RFRkFVTFRTLFxuICBxdW90ZTogUVVPVEVfREVGQVVMVFMsXG59O1xuXG5jb25zdCBPQkpFQ1RfVFlQRV9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICcwLTEnOiAnQ29udGFjdCcsICcwLTMnOiAnRGVhbCcsICcwLTInOiAnQ29tcGFueScsICcwLTUnOiAnVGlja2V0JywgJzAtMTQnOiAnUXVvdGUnLFxufTtcblxuY29uc3QgTE9HX0FDVElPTl9MQUJFTFM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHByb3BlcnR5X2NyZWF0ZWQ6ICAgICAgICAgICAgICdQcm9wZXJ0eSBDcmVhdGVkJyxcbiAgc2hhcmVfbGlua19wcm9wZXJ0eV9jcmVhdGVkOiAgJ1NoYXJlIExpbmsgUHJvcGVydHkgQ3JlYXRlZCcsXG4gIHNoYXJlX2xpbmtfYmFja2ZpbGxfY29tcGxldGVkOiAnU2hhcmUgTGluayBCYWNrZmlsbCcsXG4gIHNoYXJlX2xpbmtfYmFja2ZpbGxfZXJyb3I6ICAgICAnU2hhcmUgTGluayBCYWNrZmlsbCBFcnJvcicsXG4gIGF1dG9fc2hhcmVfbGlua19lbmFibGVkOiAgICAgICAnQXV0byBTaGFyZSBMaW5rIEVuYWJsZWQnLFxuICBhdXRvX3NoYXJlX2xpbmtfZGlzYWJsZWQ6ICAgICAgJ0F1dG8gU2hhcmUgTGluayBEaXNhYmxlZCcsXG4gIHdvcmtmbG93X2NyZWF0ZWQ6ICAgICAgICAgICAgICAnV29ya2Zsb3cgQ3JlYXRlZCcsXG4gIHdvcmtmbG93X2RlbGV0ZWQ6ICAgICAgICAgICAgICAnV29ya2Zsb3cgRGVsZXRlZCcsXG4gIHdvcmtmbG93X3RvZ2dsZWQ6ICAgICAgICAgICAgICAnV29ya2Zsb3cgVG9nZ2xlZCcsXG59O1xuXG5jb25zdCBDT01NT05fUFJPUEVSVElFUzogUmVjb3JkPHN0cmluZywgeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXT4gPSB7XG4gIGNvbnRhY3Q6IFtcbiAgICB7IHZhbHVlOiAnbGlmZWN5Y2xlc3RhZ2UnLCAgIGxhYmVsOiAnTGlmZWN5Y2xlIFN0YWdlJyB9LFxuICAgIHsgdmFsdWU6ICdoc19sZWFkX3N0YXR1cycsICAgbGFiZWw6ICdMZWFkIFN0YXR1cycgfSxcbiAgICB7IHZhbHVlOiAnZW1haWwnLCAgICAgICAgICAgIGxhYmVsOiAnRW1haWwnIH0sXG4gICAgeyB2YWx1ZTogJ2pvYnRpdGxlJywgICAgICAgICBsYWJlbDogJ0pvYiBUaXRsZScgfSxcbiAgICB7IHZhbHVlOiAnaHNfYnV5aW5nX3JvbGUnLCAgIGxhYmVsOiAnQnV5aW5nIFJvbGUnIH0sXG4gIF0sXG4gIGRlYWw6IFtcbiAgICB7IHZhbHVlOiAnZGVhbHN0YWdlJywgICAgICAgIGxhYmVsOiAnRGVhbCBTdGFnZScgfSxcbiAgICB7IHZhbHVlOiAncGlwZWxpbmUnLCAgICAgICAgIGxhYmVsOiAnUGlwZWxpbmUnIH0sXG4gICAgeyB2YWx1ZTogJ2Ftb3VudCcsICAgICAgICAgICBsYWJlbDogJ0Ftb3VudCcgfSxcbiAgICB7IHZhbHVlOiAnY2xvc2VkYXRlJywgICAgICAgIGxhYmVsOiAnQ2xvc2UgRGF0ZScgfSxcbiAgICB7IHZhbHVlOiAnZGVhbHR5cGUnLCAgICAgICAgIGxhYmVsOiAnRGVhbCBUeXBlJyB9LFxuICAgIHsgdmFsdWU6ICdodWJzcG90X293bmVyX2lkJywgbGFiZWw6ICdEZWFsIE93bmVyJyB9LFxuICBdLFxuICBjb21wYW55OiBbXG4gICAgeyB2YWx1ZTogJ2xpZmVjeWNsZXN0YWdlJywgICBsYWJlbDogJ0xpZmVjeWNsZSBTdGFnZScgfSxcbiAgICB7IHZhbHVlOiAnaW5kdXN0cnknLCAgICAgICAgIGxhYmVsOiAnSW5kdXN0cnknIH0sXG4gICAgeyB2YWx1ZTogJ2FubnVhbHJldmVudWUnLCAgICBsYWJlbDogJ0FubnVhbCBSZXZlbnVlJyB9LFxuICAgIHsgdmFsdWU6ICdudW1iZXJvZmVtcGxveWVlcycsbGFiZWw6ICdOdW1iZXIgb2YgRW1wbG95ZWVzJyB9LFxuICAgIHsgdmFsdWU6ICdoc19sZWFkX3N0YXR1cycsICAgbGFiZWw6ICdMZWFkIFN0YXR1cycgfSxcbiAgXSxcbiAgdGlja2V0OiBbXG4gICAgeyB2YWx1ZTogJ2hzX3BpcGVsaW5lX3N0YWdlJyxsYWJlbDogJ1RpY2tldCBTdGF0dXMnIH0sXG4gICAgeyB2YWx1ZTogJ2hzX3BpcGVsaW5lJywgICAgICBsYWJlbDogJ1BpcGVsaW5lJyB9LFxuICAgIHsgdmFsdWU6ICdoc190aWNrZXRfcHJpb3JpdHknLGxhYmVsOiAnUHJpb3JpdHknIH0sXG4gICAgeyB2YWx1ZTogJ3N1YmplY3QnLCAgICAgICAgICBsYWJlbDogJ1N1YmplY3QnIH0sXG4gIF0sXG4gIHF1b3RlOiBbXG4gICAgeyB2YWx1ZTogJ2hzX3N0YXR1cycsICAgICAgICBsYWJlbDogJ1F1b3RlIFN0YXR1cycgfSxcbiAgICB7IHZhbHVlOiAnaHNfZXhwaXJhdGlvbl9kYXRlJyxsYWJlbDogJ0V4cGlyYXRpb24gRGF0ZScgfSxcbiAgXSxcbn07XG5cbmNvbnN0IEJMQU5LX0VWRU5UX0ZPUk06IEV2ZW50Rm9ybVN0YXRlID0ge1xuICBldmVudE5hbWU6ICcnLFxuICB0cmlnZ2VyT2JqZWN0OiAnY29udGFjdCcsXG4gIHRyaWdnZXJUeXBlOiAnUkVDT1JEX0NSRUFURUQnLFxuICB0cmlnZ2VyUHJvcGVydHk6ICcnLFxuICB0cmlnZ2VyVG9WYWx1ZTogJycsXG4gIGZpZWxkTWFwcGluZ3M6IFsuLi5DT05UQUNUX0RFRkFVTFRTXSxcbn07XG5cbi8vIOKUgOKUgOKUgCBIZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5jb25zdCBEQVRFX0ZPUk1BVF9PUFRTOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHtcbiAgbW9udGg6ICdzaG9ydCcsIGRheTogJzItZGlnaXQnLCB5ZWFyOiAnbnVtZXJpYycsIGhvdXI6ICcyLWRpZ2l0JywgbWludXRlOiAnMi1kaWdpdCcsXG59O1xuXG5mdW5jdGlvbiBmb3JtYXREYXRlKGlzb1N0cmluZzogc3RyaW5nIHwgdW5kZWZpbmVkLCBsb2NhbGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIWlzb1N0cmluZykgcmV0dXJuICfigJQnO1xuICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlIHx8IHVuZGVmaW5lZCwgREFURV9GT1JNQVRfT1BUUykuZm9ybWF0KG5ldyBEYXRlKGlzb1N0cmluZykpO1xufVxuXG4vLyDilIDilIDilIAgTWFpbiBjb21wb25lbnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIEV4dG9sZVNldHRpbmdzKHsgcnVuU2VydmVybGVzc0Z1bmN0aW9uLCBwb3J0YWxJZCwgbG9jYWxlLCBhY3RvciB9OiB7XG4gIHJ1blNlcnZlcmxlc3NGdW5jdGlvbjogKG9wdHM6IGFueSkgPT4gUHJvbWlzZTxhbnk+O1xuICBwb3J0YWxJZDogbnVtYmVyO1xuICBsb2NhbGU/OiBzdHJpbmc7XG4gIGFjdG9yPzogc3RyaW5nO1xufSkge1xuICAvLyDilIDilIAgT25ib2FyZGluZyDilIDilIBcbiAgY29uc3QgW2h1YnNwb3R1dGtTdGF0dXMsIHNldEh1YnNwb3R1dGtTdGF0dXNdID0gdXNlU3RhdGU8UHJvcGVydHlTdGF0dXM+KHsgZXhpc3RzOiBudWxsIH0pOyAvLyBudWxsID0gY2hlY2tpbmdcbiAgY29uc3QgW2h1YnNwb3R1dGtDcmVhdGluZywgc2V0SHVic3BvdHV0a0NyZWF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2h1YnNwb3R1dGtDcmVhdGVSZXN1bHQsIHNldEh1YnNwb3R1dGtDcmVhdGVSZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8g4pSA4pSAIENvbm5lY3Rpb24g4pSA4pSAXG4gIGNvbnN0IFtjb25uZWN0aW9uU3RhdHVzLCBzZXRDb25uZWN0aW9uU3RhdHVzXSA9IHVzZVN0YXRlPCd1bmtub3duJyB8ICdvaycgfCAnZXJyb3InPigndW5rbm93bicpO1xuICBjb25zdCBbY29ubmVjdGlvbkRldGFpbCwgc2V0Q29ubmVjdGlvbkRldGFpbF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb25uZWN0aW9uVGVzdGluZywgc2V0Q29ubmVjdGlvblRlc3RpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIOKUgOKUgCBFdmVudCBDb25maWd1cmF0aW9uIOKUgOKUgFxuICBjb25zdCBbd29ya2Zsb3dzLCBzZXRXb3JrZmxvd3NdID0gdXNlU3RhdGU8V29ya2Zsb3dJbmZvW10+KFtdKTtcbiAgY29uc3QgW3dvcmtmbG93c0Vycm9yLCBzZXRXb3JrZmxvd3NFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Nob3dFdmVudEZvcm0sIHNldFNob3dFdmVudEZvcm1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZWRpdGluZ1dvcmtmbG93SWQsIHNldEVkaXRpbmdXb3JrZmxvd0lkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZXZlbnRGb3JtLCBzZXRFdmVudEZvcm1dID0gdXNlU3RhdGU8RXZlbnRGb3JtU3RhdGU+KEJMQU5LX0VWRU5UX0ZPUk0pO1xuICBjb25zdCBbY3JlYXRpbmdXb3JrZmxvdywgc2V0Q3JlYXRpbmdXb3JrZmxvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjcmVhdGVSZXN1bHQsIHNldENyZWF0ZVJlc3VsdF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb25maXJtRGVsZXRlSWQsIHNldENvbmZpcm1EZWxldGVJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvLyDilIDilIAgTmF2aWdhdGlvbiDilIDilIBcbiAgdHlwZSBOYXZUYWIgPSAnb25ib2FyZGluZycgfCAnZXZlbnRzJyB8ICdmb3JtcycgfCAnc2hhcmVsaW5rcycgfCAnbG9nJztcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPE5hdlRhYj4oJ29uYm9hcmRpbmcnKTtcblxuICAvLyBXb3JrZmxvdyB0YWJsZSBzb3J0XG4gIHR5cGUgU29ydENvbCA9ICduYW1lJyB8ICdvYmplY3QnIHwgJ3N0YXR1cycgfCAnY3JlYXRlZCc7XG4gIGNvbnN0IFtzb3J0Q29sLCBzZXRTb3J0Q29sXSA9IHVzZVN0YXRlPFNvcnRDb2wgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NvcnREaXIsIHNldFNvcnREaXJdID0gdXNlU3RhdGU8J2FzY2VuZGluZycgfCAnZGVzY2VuZGluZyc+KCdhc2NlbmRpbmcnKTtcblxuICAvLyDilIDilIAgQmFja2ZpbGwg4pSA4pSAXG4gIGNvbnN0IFtjb250YWN0VG90YWwsIHNldENvbnRhY3RUb3RhbF0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2JhY2tmaWxsUnVubmluZywgc2V0QmFja2ZpbGxSdW5uaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2JhY2tmaWxsUHJvZ3Jlc3MsIHNldEJhY2tmaWxsUHJvZ3Jlc3NdID0gdXNlU3RhdGU8eyBlbnJvbGxlZDogbnVtYmVyOyBza2lwcGVkOiBudW1iZXI7IGVycm9yczogbnVtYmVyIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2JhY2tmaWxsRG9uZSwgc2V0QmFja2ZpbGxEb25lXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyDilIDilIAgU2hhcmUgTGlua3Mg4pSA4pSAXG4gIGNvbnN0IFtjYW1wYWlnbnMsIHNldENhbXBhaWduc10gPSB1c2VTdGF0ZTx7IGlkOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgcHJvZ3JhbUxhYmVsOiBzdHJpbmcgfVtdPihbXSk7XG4gIGNvbnN0IFtjYW1wYWlnbnNMb2FkaW5nLCBzZXRDYW1wYWlnbnNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2NhbXBhaWduc0Vycm9yLCBzZXRDYW1wYWlnbnNFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkUHJvZ3JhbUxhYmVsLCBzZXRTZWxlY3RlZFByb2dyYW1MYWJlbF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzaGFyZUxpbmtQcm9wZXJ0eVN0YXR1cywgc2V0U2hhcmVMaW5rUHJvcGVydHlTdGF0dXNdID0gdXNlU3RhdGU8UHJvcGVydHlTdGF0dXM+KHsgZXhpc3RzOiBudWxsIH0pO1xuICBjb25zdCBbc2hhcmVMaW5rUHJvcGVydHlDcmVhdGluZywgc2V0U2hhcmVMaW5rUHJvcGVydHlDcmVhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaGFyZUxpbmtQcm9wZXJ0eUNyZWF0ZVJlc3VsdCwgc2V0U2hhcmVMaW5rUHJvcGVydHlDcmVhdGVSZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaGFyZUxpbmtCYWNrZmlsbFJ1bm5pbmcsIHNldFNoYXJlTGlua0JhY2tmaWxsUnVubmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzaGFyZUxpbmtCYWNrZmlsbFByb2dyZXNzLCBzZXRTaGFyZUxpbmtCYWNrZmlsbFByb2dyZXNzXSA9IHVzZVN0YXRlPHsgY3JlYXRlZDogbnVtYmVyOyBleGlzdGluZzogbnVtYmVyOyBza2lwcGVkOiBudW1iZXI7IGVycm9yczogbnVtYmVyIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NoYXJlTGlua0JhY2tmaWxsRG9uZSwgc2V0U2hhcmVMaW5rQmFja2ZpbGxEb25lXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2F1dG9TaGFyZUVuYWJsZWQsIHNldEF1dG9TaGFyZUVuYWJsZWRdID0gdXNlU3RhdGU8Ym9vbGVhbiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbYXV0b1NoYXJlTG9hZGluZywgc2V0QXV0b1NoYXJlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthdXRvU2hhcmVQcm9ncmFtTGFiZWwsIHNldEF1dG9TaGFyZVByb2dyYW1MYWJlbF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFthdXRvU2hhcmVFcnJvciwgc2V0QXV0b1NoYXJlRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8g4pSA4pSAIEFjdGl2aXR5IExvZyDilIDilIBcbiAgY29uc3QgW2xvZ0VudHJpZXMsIHNldExvZ0VudHJpZXNdID0gdXNlU3RhdGU8TG9nRW50cnlbXT4oW10pO1xuICBjb25zdCBbbG9nTG9hZGluZywgc2V0TG9nTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2dFcnJvciwgc2V0TG9nRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsb2dQYWdlU3RhY2ssIHNldExvZ1BhZ2VTdGFja10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pOyAvLyBzdGFjayBvZiBgYWZ0ZXJgIGN1cnNvcnMgZm9yIHByZXZcbiAgY29uc3QgW2xvZ05leHRBZnRlciwgc2V0TG9nTmV4dEFmdGVyXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbG9nSGFzTW9yZSwgc2V0TG9nSGFzTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjbGVhckxvZ0NvbmZpcm0sIHNldENsZWFyTG9nQ29uZmlybV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjbGVhckxvZ0xvYWRpbmcsIHNldENsZWFyTG9nTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8g4pSA4pSAIEZvcm0gSW5zdHJ1bWVudGF0aW9uIOKUgOKUgFxuICBjb25zdCBbaHVic3BvdHV0a1Byb3BlcnR5LCBzZXRIdWJzcG90dXRrUHJvcGVydHldID0gdXNlU3RhdGUoREVGQVVMVF9IVUJTUE9UVVRLX1BST1BFUlRZKTtcbiAgY29uc3QgW2luY2x1ZGVBZHZvY2F0ZUNvZGUsIHNldEluY2x1ZGVBZHZvY2F0ZUNvZGVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFthZHZvY2F0ZUNvZGVQcm9wZXJ0eSwgc2V0QWR2b2NhdGVDb2RlUHJvcGVydHldID0gdXNlU3RhdGUoREVGQVVMVF9BRFZPQ0FURV9DT0RFX1BST1BFUlRZKTtcbiAgY29uc3QgW3JlZmVycmFsVXJsUGFyYW0sIHNldFJlZmVycmFsVXJsUGFyYW1dID0gdXNlU3RhdGUoREVGQVVMVF9SRUZFUlJBTF9VUkxfUEFSQU1TKTtcbiAgY29uc3QgW2Zvcm1UYXJnZXRpbmcsIHNldEZvcm1UYXJnZXRpbmddID0gdXNlU3RhdGU8J2FsbCcgfCAnc3BlY2lmaWMnPignYWxsJyk7XG4gIGNvbnN0IFthdmFpbGFibGVGb3Jtcywgc2V0QXZhaWxhYmxlRm9ybXNdID0gdXNlU3RhdGU8eyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfVtdPihbXSk7XG4gIGNvbnN0IFthdmFpbGFibGVGb3Jtc0xvYWRpbmcsIHNldEF2YWlsYWJsZUZvcm1zTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWxlY3RlZEZvcm1JZHMsIHNldFNlbGVjdGVkRm9ybUlkc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuICBjb25zdCBbYWR2b2NhdGVDb2RlUHJvcGVydHlTdGF0dXMsIHNldEFkdm9jYXRlQ29kZVByb3BlcnR5U3RhdHVzXSA9IHVzZVN0YXRlPFByb3BlcnR5U3RhdHVzPih7IGV4aXN0czogbnVsbCB9KTtcbiAgY29uc3QgW2Fkdm9jYXRlQ29kZUNyZWF0aW5nLCBzZXRBZHZvY2F0ZUNvZGVDcmVhdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthZHZvY2F0ZUNvZGVDcmVhdGVSZXN1bHQsIHNldEFkdm9jYXRlQ29kZUNyZWF0ZVJlc3VsdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvLyDilIDilIAgRGVyaXZlZCBzbmlwcGV0IOKUgOKUgFxuICBjb25zdCBzbmlwcGV0ID0gZ2VuZXJhdGVTbmlwcGV0KHtcbiAgICBhZHZvY2F0ZUNvZGVQcm9wZXJ0eTogaW5jbHVkZUFkdm9jYXRlQ29kZSA/IGFkdm9jYXRlQ29kZVByb3BlcnR5IDogJycsXG4gICAgcmVmZXJyYWxVcmxQYXJhbXM6IHJlZmVycmFsVXJsUGFyYW0uc3BsaXQoJywnKS5tYXAocyA9PiBzLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pLFxuICAgIGZvcm1JZHM6IGZvcm1UYXJnZXRpbmcgPT09ICdzcGVjaWZpYycgPyBzZWxlY3RlZEZvcm1JZHMgOiBbXSxcbiAgfSk7XG5cbiAgLy8g4pSA4pSAIFNvcnRlZCB3b3JrZmxvd3Mg4pSA4pSAXG4gIGNvbnN0IHNvcnRlZFdvcmtmbG93cyA9IHNvcnRDb2wgPT09IG51bGwgPyB3b3JrZmxvd3MgOiBbLi4ud29ya2Zsb3dzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgbGV0IGFWYWw6IHN0cmluZywgYlZhbDogc3RyaW5nO1xuICAgIGlmIChzb3J0Q29sID09PSAnbmFtZScpICAgICAgICB7IGFWYWwgPSBhLmV2ZW50TmFtZTsgYlZhbCA9IGIuZXZlbnROYW1lOyB9XG4gICAgZWxzZSBpZiAoc29ydENvbCA9PT0gJ29iamVjdCcpIHsgYVZhbCA9IE9CSkVDVF9UWVBFX0xBQkVMU1thLm9iamVjdFR5cGVJZCA/PyAnJ10gPz8gYS5vYmplY3RUeXBlSWQgPz8gJyc7IGJWYWwgPSBPQkpFQ1RfVFlQRV9MQUJFTFNbYi5vYmplY3RUeXBlSWQgPz8gJyddID8/IGIub2JqZWN0VHlwZUlkID8/ICcnOyB9XG4gICAgZWxzZSBpZiAoc29ydENvbCA9PT0gJ3N0YXR1cycpIHsgYVZhbCA9IGEuZW5hYmxlZCA/ICdBY3RpdmUnIDogJ0luYWN0aXZlJzsgYlZhbCA9IGIuZW5hYmxlZCA/ICdBY3RpdmUnIDogJ0luYWN0aXZlJzsgfVxuICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFWYWwgPSBhLmNyZWF0ZWRBdCA/PyAnJzsgYlZhbCA9IGIuY3JlYXRlZEF0ID8/ICcnOyB9XG4gICAgY29uc3QgY21wID0gYVZhbC5sb2NhbGVDb21wYXJlKGJWYWwpO1xuICAgIHJldHVybiBzb3J0RGlyID09PSAnYXNjZW5kaW5nJyA/IGNtcCA6IC1jbXA7XG4gIH0pO1xuXG4gIC8vIOKUgOKUgCBPbiBtb3VudCDilIDilIAgKGNhbGxzIHNlcmlhbGl6ZWQg4oCUIEh1YlNwb3QgZGV2IGNhbid0IGhhbmRsZSBjb25jdXJyZW50IGNhbGxzKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnZ2V0V29ya2Zsb3dzJyB9LFxuICAgICAgcHJvcGVydGllc1RvU2VuZDogW10sXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zdCByID0gcmVzLnJlc3BvbnNlIHx8IHt9O1xuICAgICAgaWYgKHIuZXJyb3IpIHNldFdvcmtmbG93c0Vycm9yKHIuZXJyb3IpO1xuICAgICAgc2V0V29ya2Zsb3dzKHIud29ya2Zsb3dzID8/IFtdKTtcbiAgICAgIC8vIEZpcmUgY2hlY2tQcm9wZXJ0aWVzIGFmdGVyIGdldFdvcmtmbG93cyBjb21wbGV0ZXMg4oCUIG93biBjaGFpbiwgbm90IHJldHVybmVkXG4gICAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdjaGVja1Byb3BlcnRpZXMnLCBwcm9wZXJ0eU5hbWVzOiBbREVGQVVMVF9IVUJTUE9UVVRLX1BST1BFUlRZXSB9LFxuICAgICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICAgIH0pLnRoZW4oKHJlczI6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSByZXMyPy5yZXNwb25zZT8ucHJvcGVydGllcz8uW0RFRkFVTFRfSFVCU1BPVFVUS19QUk9QRVJUWV07XG4gICAgICAgIHNldEh1YnNwb3R1dGtTdGF0dXMoc3RhdHVzID8/IHsgZXhpc3RzOiBmYWxzZSB9KTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0SHVic3BvdHV0a1N0YXR1cyh7IGV4aXN0czogZmFsc2UgfSk7XG4gICAgICB9KTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBzZXRIdWJzcG90dXRrU3RhdHVzKHsgZXhpc3RzOiBmYWxzZSB9KTtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIExvYWQgY2FtcGFpZ25zICsgY2hlY2sgc2hhcmUgbGluayBwcm9wZXJ0eSB3aGVuIHNoYXJlIGxpbmtzIHRhYiBpcyBmaXJzdCBvcGVuZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoYWN0aXZlVGFiICE9PSAnc2hhcmVsaW5rcycpIHJldHVybjtcbiAgICBpZiAoY2FtcGFpZ25zLmxlbmd0aCA+IDAgfHwgY2FtcGFpZ25zTG9hZGluZykgcmV0dXJuO1xuICAgIHNldENhbXBhaWduc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0Q2FtcGFpZ25zRXJyb3IobnVsbCk7XG4gICAgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdnZXRDYW1wYWlnbnMnIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmICghcmVzLnJlc3BvbnNlKSB7IHNldENhbXBhaWduc0Vycm9yKCdGYWlsZWQgdG8gbG9hZCBjYW1wYWlnbnMnKTsgcmV0dXJuOyB9XG4gICAgICBjb25zdCByID0gcmVzLnJlc3BvbnNlO1xuICAgICAgaWYgKHIuZXJyb3IpIHsgc2V0Q2FtcGFpZ25zRXJyb3Ioci5lcnJvcik7IHNldENhbXBhaWducyhbXSk7IHJldHVybjsgfVxuICAgICAgY29uc3Qgc2VlbiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgY29uc3QgY2FtcHMgPSAoci5jYW1wYWlnbnMgPz8gW10pLmZpbHRlcigoYzogeyBwcm9ncmFtTGFiZWw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIGlmIChzZWVuLmhhcyhjLnByb2dyYW1MYWJlbCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgc2Vlbi5hZGQoYy5wcm9ncmFtTGFiZWwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgc2V0Q2FtcGFpZ25zKGNhbXBzKTtcbiAgICAgIHJldHVybiBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdjaGVja1Byb3BlcnRpZXMnLCBwcm9wZXJ0eU5hbWVzOiBbREVGQVVMVF9TSEFSRV9MSU5LX1BST1BFUlRZXSB9LFxuICAgICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICAgIH0pO1xuICAgIH0pLnRoZW4oKHJlczI6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc3RhdHVzID0gcmVzMj8ucmVzcG9uc2U/LnByb3BlcnRpZXM/LltERUZBVUxUX1NIQVJFX0xJTktfUFJPUEVSVFldO1xuICAgICAgc2V0U2hhcmVMaW5rUHJvcGVydHlTdGF0dXMoc3RhdHVzID8/IHsgZXhpc3RzOiBmYWxzZSB9KTtcbiAgICAgIHJldHVybiBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdnZXRBdXRvU2hhcmVMaW5rU3RhdHVzJyB9LFxuICAgICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICAgIH0pO1xuICAgIH0pLnRoZW4oKHJlczM6IGFueSkgPT4ge1xuICAgICAgY29uc3QgdyA9IHJlczM/LnJlc3BvbnNlPy53b3JrZmxvdztcbiAgICAgIHNldEF1dG9TaGFyZUVuYWJsZWQodyA/IHcuZW5hYmxlZCA6IGZhbHNlKTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBzZXRTaGFyZUxpbmtQcm9wZXJ0eVN0YXR1cyh7IGV4aXN0czogZmFsc2UgfSk7XG4gICAgICBzZXRBdXRvU2hhcmVFbmFibGVkKGZhbHNlKTtcbiAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgIHNldENhbXBhaWduc0xvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICB9LCBbYWN0aXZlVGFiXSk7XG5cbiAgLy8gQ2hlY2sgYWR2b2NhdGUgY29kZSBwcm9wZXJ0eSArIGxvYWQgYXZhaWxhYmxlIGZvcm1zIHdoZW4gZm9ybSBpbnN0cnVtZW50YXRpb24gdGFiIGlzIGZpcnN0IG9wZW5lZFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhY3RpdmVUYWIgIT09ICdmb3JtcycpIHJldHVybjtcbiAgICBpZiAoYWR2b2NhdGVDb2RlUHJvcGVydHlTdGF0dXMuZXhpc3RzID09PSBudWxsKSB7XG4gICAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdjaGVja1Byb3BlcnRpZXMnLCBwcm9wZXJ0eU5hbWVzOiBbYWR2b2NhdGVDb2RlUHJvcGVydHldIH0sXG4gICAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgICAgfSkudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gcmVzPy5yZXNwb25zZT8ucHJvcGVydGllcz8uW2Fkdm9jYXRlQ29kZVByb3BlcnR5XTtcbiAgICAgICAgc2V0QWR2b2NhdGVDb2RlUHJvcGVydHlTdGF0dXMoc3RhdHVzID8/IHsgZXhpc3RzOiBmYWxzZSB9KTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgc2V0QWR2b2NhdGVDb2RlUHJvcGVydHlTdGF0dXMoeyBleGlzdHM6IGZhbHNlIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChhdmFpbGFibGVGb3Jtcy5sZW5ndGggPT09IDAgJiYgIWF2YWlsYWJsZUZvcm1zTG9hZGluZykge1xuICAgICAgc2V0QXZhaWxhYmxlRm9ybXNMb2FkaW5nKHRydWUpO1xuICAgICAgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnZ2V0Rm9ybXMnIH0sXG4gICAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgICAgfSkudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgICAgc2V0QXZhaWxhYmxlRm9ybXMocmVzPy5yZXNwb25zZT8uZm9ybXMgPz8gW10pO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBzZXRBdmFpbGFibGVGb3JtcyhbXSk7XG4gICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgc2V0QXZhaWxhYmxlRm9ybXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2FjdGl2ZVRhYl0pO1xuXG4gIC8vIExvYWQgbG9nIGVudHJpZXMgd2hlbiBsb2cgdGFiIGlzIGZpcnN0IG9wZW5lZFxuICBmdW5jdGlvbiBmZXRjaExvZ1BhZ2UoYWZ0ZXI/OiBzdHJpbmcpIHtcbiAgICBzZXRMb2dMb2FkaW5nKHRydWUpO1xuICAgIHNldExvZ0Vycm9yKG51bGwpO1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnY3JlYXRlTG9nU2NoZW1hJyB9LFxuICAgICAgcHJvcGVydGllc1RvU2VuZDogW10sXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zdCByID0gcmVzLnJlc3BvbnNlIHx8IHt9O1xuICAgICAgaWYgKHIuZXJyb3IpIHsgc2V0TG9nRXJyb3IoYFNjaGVtYSBpbml0IGZhaWxlZDogJHtyLmVycm9yfWApOyByZXR1cm4gbnVsbDsgfVxuICAgICAgcmV0dXJuIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2dldExvZ0VudHJpZXMnLCAuLi4oYWZ0ZXIgPyB7IGFmdGVyIH0gOiB7fSkgfSxcbiAgICAgICAgcHJvcGVydGllc1RvU2VuZDogW10sXG4gICAgICB9KTtcbiAgICB9KS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKCFyZXMpIHJldHVybjtcbiAgICAgIGNvbnN0IHIgPSByZXMucmVzcG9uc2UgfHwge307XG4gICAgICBpZiAoci5lcnJvcikgeyBzZXRMb2dFcnJvcihyLmVycm9yKTsgcmV0dXJuOyB9XG4gICAgICBzZXRMb2dFbnRyaWVzKHIuZW50cmllcyA/PyBbXSk7XG4gICAgICBzZXRMb2dIYXNNb3JlKHIuaGFzTW9yZSA/PyBmYWxzZSk7XG4gICAgICBzZXRMb2dOZXh0QWZ0ZXIoci5uZXh0QWZ0ZXIgPz8gbnVsbCk7XG4gICAgfSkuY2F0Y2goKGU6IGFueSkgPT4ge1xuICAgICAgc2V0TG9nRXJyb3IoZT8ubWVzc2FnZSA/PyAnRmFpbGVkIHRvIGxvYWQgbG9nJyk7XG4gICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICBzZXRMb2dMb2FkaW5nKGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVRhYiAhPT0gJ2xvZycpIHJldHVybjtcbiAgICBpZiAobG9nTG9hZGluZykgcmV0dXJuO1xuICAgIHNldExvZ1BhZ2VTdGFjayhbXSk7XG4gICAgZmV0Y2hMb2dQYWdlKCk7XG4gIH0sIFthY3RpdmVUYWJdKTtcblxuICBmdW5jdGlvbiBoYW5kbGVMb2dOZXh0UGFnZSgpIHtcbiAgICBpZiAoIWxvZ05leHRBZnRlcikgcmV0dXJuO1xuICAgIHNldExvZ1BhZ2VTdGFjayhzID0+IFsuLi5zLCBsb2dOZXh0QWZ0ZXJdKTtcbiAgICBmZXRjaExvZ1BhZ2UobG9nTmV4dEFmdGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUxvZ1ByZXZQYWdlKCkge1xuICAgIGNvbnN0IHN0YWNrID0gWy4uLmxvZ1BhZ2VTdGFja107XG4gICAgc3RhY2sucG9wKCk7IC8vIHJlbW92ZSBjdXJyZW50IHBhZ2UgY3Vyc29yXG4gICAgY29uc3QgcHJldiA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdOyAvLyBjdXJzb3IgZm9yIHByZXZpb3VzIHBhZ2UgKHVuZGVmaW5lZCA9IGZpcnN0IHBhZ2UpXG4gICAgc2V0TG9nUGFnZVN0YWNrKHN0YWNrKTtcbiAgICBmZXRjaExvZ1BhZ2UocHJldik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGVhckxvZygpIHtcbiAgICBzZXRDbGVhckxvZ0xvYWRpbmcodHJ1ZSk7XG4gICAgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdjbGVhckxvZycgfSxcbiAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc3QgciA9IHJlcy5yZXNwb25zZSB8fCB7fTtcbiAgICAgIGlmIChyLmVycm9yKSB7IHNldExvZ0Vycm9yKHIuZXJyb3IpOyByZXR1cm47IH1cbiAgICAgIHNldExvZ0VudHJpZXMoW10pO1xuICAgICAgc2V0TG9nUGFnZVN0YWNrKFtdKTtcbiAgICAgIHNldExvZ0hhc01vcmUoZmFsc2UpO1xuICAgICAgc2V0TG9nTmV4dEFmdGVyKG51bGwpO1xuICAgICAgc2V0Q2xlYXJMb2dDb25maXJtKGZhbHNlKTtcbiAgICB9KS5jYXRjaCgoZTogYW55KSA9PiB7XG4gICAgICBzZXRMb2dFcnJvcihlPy5tZXNzYWdlID8/ICdGYWlsZWQgdG8gY2xlYXIgbG9nJyk7XG4gICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICBzZXRDbGVhckxvZ0xvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cblxuICAvLyDilIDilIDilIAgSGFuZGxlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2hlY2tIdWJzcG90dXRrUHJvcGVydHkoKSB7XG4gICAgaWYgKGh1YnNwb3R1dGtTdGF0dXMuZXhpc3RzID09PSBudWxsKSByZXR1cm47XG4gICAgc2V0SHVic3BvdHV0a1N0YXR1cyh7IGV4aXN0czogbnVsbCB9KTtcbiAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2NoZWNrUHJvcGVydGllcycsIHByb3BlcnR5TmFtZXM6IFtERUZBVUxUX0hVQlNQT1RVVEtfUFJPUEVSVFldIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc3RhdHVzID0gcmVzLnJlc3BvbnNlPy5wcm9wZXJ0aWVzPy5bREVGQVVMVF9IVUJTUE9UVVRLX1BST1BFUlRZXTtcbiAgICAgIHNldEh1YnNwb3R1dGtTdGF0dXMoc3RhdHVzID8/IHsgZXhpc3RzOiBmYWxzZSB9KTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBzZXRIdWJzcG90dXRrU3RhdHVzKHsgZXhpc3RzOiBmYWxzZSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUh1YnNwb3R1dGtQcm9wZXJ0eSgpIHtcbiAgICBzZXRIdWJzcG90dXRrQ3JlYXRpbmcodHJ1ZSk7XG4gICAgc2V0SHVic3BvdHV0a0NyZWF0ZVJlc3VsdChudWxsKTtcbiAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2NyZWF0ZVByb3BlcnRpZXMnLCBodWJzcG90dXRrUHJvcGVydHk6IERFRkFVTFRfSFVCU1BPVFVUS19QUk9QRVJUWSwgYWR2b2NhdGVDb2RlUHJvcGVydHk6ICcnIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnN0IHsgY3JlYXRlZCA9IFtdLCBlcnJvcnMgPSBbXSB9ID0gcmVzLnJlc3BvbnNlIHx8IHt9O1xuICAgICAgc2V0SHVic3BvdHV0a0NyZWF0aW5nKGZhbHNlKTtcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldEh1YnNwb3R1dGtDcmVhdGVSZXN1bHQoY3JlYXRlZC5sZW5ndGggPyAnUHJvcGVydHkgY3JlYXRlZC4nIDogJ1Byb3BlcnR5IGFscmVhZHkgZXhpc3RzLicpO1xuICAgICAgICBoYW5kbGVDaGVja0h1YnNwb3R1dGtQcm9wZXJ0eSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SHVic3BvdHV0a0NyZWF0ZVJlc3VsdChgRXJyb3I6ICR7ZXJyb3JzWzBdLmVycm9yfWApO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHNldEh1YnNwb3R1dGtDcmVhdGluZyhmYWxzZSk7XG4gICAgICBzZXRIdWJzcG90dXRrQ3JlYXRlUmVzdWx0KGBFcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUFkdm9jYXRlQ29kZVByb3BlcnR5KCkge1xuICAgIHNldEFkdm9jYXRlQ29kZUNyZWF0aW5nKHRydWUpO1xuICAgIHNldEFkdm9jYXRlQ29kZUNyZWF0ZVJlc3VsdChudWxsKTtcbiAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2NyZWF0ZVByb3BlcnRpZXMnLCBodWJzcG90dXRrUHJvcGVydHk6ICcnLCBhZHZvY2F0ZUNvZGVQcm9wZXJ0eSB9LFxuICAgICAgcHJvcGVydGllc1RvU2VuZDogW10sXG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zdCB7IGNyZWF0ZWQgPSBbXSwgZXJyb3JzID0gW10gfSA9IHJlcy5yZXNwb25zZSB8fCB7fTtcbiAgICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnY2hlY2tQcm9wZXJ0aWVzJywgcHJvcGVydHlOYW1lczogW2Fkdm9jYXRlQ29kZVByb3BlcnR5XSB9LFxuICAgICAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgICAgICB9KS50aGVuKChyZXMyOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBzdGF0dXMgPSByZXMyPy5yZXNwb25zZT8ucHJvcGVydGllcz8uW2Fkdm9jYXRlQ29kZVByb3BlcnR5XTtcbiAgICAgICAgICBzZXRBZHZvY2F0ZUNvZGVQcm9wZXJ0eVN0YXR1cyhzdGF0dXMgPz8geyBleGlzdHM6IHRydWUgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0QWR2b2NhdGVDb2RlQ3JlYXRlUmVzdWx0KGBFcnJvcjogJHtlcnJvcnNbMF0uZXJyb3J9YCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgc2V0QWR2b2NhdGVDb2RlQ3JlYXRlUmVzdWx0KGBFcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgIHNldEFkdm9jYXRlQ29kZUNyZWF0aW5nKGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRlc3RDb25uZWN0aW9uKCkge1xuICAgIHNldENvbm5lY3Rpb25UZXN0aW5nKHRydWUpO1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAndGVzdENvbm5lY3Rpb24nIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnN0IHIgPSByZXMucmVzcG9uc2U7XG4gICAgICBzZXRDb25uZWN0aW9uU3RhdHVzKHI/LmNvbm5lY3RlZCA/ICdvaycgOiAnZXJyb3InKTtcbiAgICAgIHNldENvbm5lY3Rpb25EZXRhaWwocj8uY29ubmVjdGVkID8gJycgOiBgc3RhdHVzPSR7cj8uc3RhdHVzID8/ICd1bmtub3duJ30gZXJyb3I9JHtyPy5lcnJvciA/PyAnbm9uZSd9IHByZWZpeD0ke3I/LnRva2VuUHJlZml4ID8/ICduL2EnfWApO1xuICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgc2V0Q29ubmVjdGlvblN0YXR1cygnZXJyb3InKTtcbiAgICAgIHNldENvbm5lY3Rpb25EZXRhaWwoZXJyPy5tZXNzYWdlID8/ICdmdW5jdGlvbiBjYWxsIGZhaWxlZCcpO1xuICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc2V0Q29ubmVjdGlvblRlc3RpbmcoZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTG9hZENvbnRhY3RDb3VudCgpIHtcbiAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2dldENvbnRhY3RDb3VudCcgfSxcbiAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgc2V0Q29udGFjdFRvdGFsKHJlcy5yZXNwb25zZT8udG90YWwgPz8gbnVsbCk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVSdW5CYWNrZmlsbCgpIHtcbiAgICBzZXRCYWNrZmlsbFJ1bm5pbmcodHJ1ZSk7XG4gICAgc2V0QmFja2ZpbGxEb25lKGZhbHNlKTtcbiAgICBzZXRCYWNrZmlsbFByb2dyZXNzKHsgZW5yb2xsZWQ6IDAsIHNraXBwZWQ6IDAsIGVycm9yczogMCB9KTtcbiAgICBsZXQgY3Vyc29yOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgdG90YWxFbnJvbGxlZCA9IDAsIHRvdGFsU2tpcHBlZCA9IDAsIHRvdGFsRXJyb3JzID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAncnVuQmFja2ZpbGxCYXRjaCcsIGN1cnNvciwgaHVic3BvdHV0a1Byb3BlcnR5IH0sXG4gICAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBiYXRjaCA9IHJlcy5yZXNwb25zZSB8fCB7fTtcbiAgICAgIHRvdGFsRW5yb2xsZWQgKz0gYmF0Y2guZW5yb2xsZWQgfHwgMDtcbiAgICAgIHRvdGFsU2tpcHBlZCArPSBiYXRjaC5za2lwcGVkIHx8IDA7XG4gICAgICB0b3RhbEVycm9ycyArPSAoYmF0Y2guZXJyb3JzIHx8IFtdKS5sZW5ndGg7XG4gICAgICBjdXJzb3IgPSBiYXRjaC5jdXJzb3IgfHwgbnVsbDtcbiAgICAgIHNldEJhY2tmaWxsUHJvZ3Jlc3MoeyBlbnJvbGxlZDogdG90YWxFbnJvbGxlZCwgc2tpcHBlZDogdG90YWxTa2lwcGVkLCBlcnJvcnM6IHRvdGFsRXJyb3JzIH0pO1xuICAgICAgaWYgKGJhdGNoLmRvbmUgfHwgIWN1cnNvcikgYnJlYWs7XG4gICAgfVxuICAgIHNldEJhY2tmaWxsUnVubmluZyhmYWxzZSk7XG4gICAgc2V0QmFja2ZpbGxEb25lKHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlU2hhcmVMaW5rUHJvcGVydHkoKSB7XG4gICAgc2V0U2hhcmVMaW5rUHJvcGVydHlDcmVhdGluZyh0cnVlKTtcbiAgICBzZXRTaGFyZUxpbmtQcm9wZXJ0eUNyZWF0ZVJlc3VsdChudWxsKTtcbiAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2NyZWF0ZVNoYXJlTGlua1Byb3BlcnR5JywgcHJvcGVydHlOYW1lOiBERUZBVUxUX1NIQVJFX0xJTktfUFJPUEVSVFksIGFjdG9yIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnN0IHsgY3JlYXRlZCA9IFtdLCBlcnJvcnMgPSBbXSB9ID0gcmVzLnJlc3BvbnNlIHx8IHt9O1xuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgc2V0U2hhcmVMaW5rUHJvcGVydHlDcmVhdGVSZXN1bHQoY3JlYXRlZC5sZW5ndGggPyAnUHJvcGVydHkgY3JlYXRlZC4nIDogJ1Byb3BlcnR5IGFscmVhZHkgZXhpc3RzLicpO1xuICAgICAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnY2hlY2tQcm9wZXJ0aWVzJywgcHJvcGVydHlOYW1lczogW0RFRkFVTFRfU0hBUkVfTElOS19QUk9QRVJUWV0gfSxcbiAgICAgICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICAgICAgfSkudGhlbigocmVzMjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RhdHVzID0gcmVzMj8ucmVzcG9uc2U/LnByb3BlcnRpZXM/LltERUZBVUxUX1NIQVJFX0xJTktfUFJPUEVSVFldO1xuICAgICAgICAgIHNldFNoYXJlTGlua1Byb3BlcnR5U3RhdHVzKHN0YXR1cyA/PyB7IGV4aXN0czogZmFsc2UgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2hhcmVMaW5rUHJvcGVydHlDcmVhdGVSZXN1bHQoYEVycm9yOiAke2Vycm9yc1swXS5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBzZXRTaGFyZUxpbmtQcm9wZXJ0eUNyZWF0ZVJlc3VsdChgRXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICBzZXRTaGFyZUxpbmtQcm9wZXJ0eUNyZWF0aW5nKGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRvZ2dsZUF1dG9TaGFyZShlbmFibGU6IGJvb2xlYW4pIHtcbiAgICBzZXRBdXRvU2hhcmVMb2FkaW5nKHRydWUpO1xuICAgIHNldEF1dG9TaGFyZUVycm9yKG51bGwpO1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAndG9nZ2xlQXV0b1NoYXJlTGluaycsIGVuYWJsZSwgcHJvZ3JhbUxhYmVsOiBhdXRvU2hhcmVQcm9ncmFtTGFiZWwsIGFjdG9yIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMucmVzcG9uc2U/LmVycm9yKSB7IHNldEF1dG9TaGFyZUVycm9yKHJlcy5yZXNwb25zZS5lcnJvcik7IHJldHVybjsgfVxuICAgICAgc2V0QXV0b1NoYXJlRW5hYmxlZChyZXMucmVzcG9uc2U/LmVuYWJsZWQgPz8gZW5hYmxlKTtcbiAgICB9KS5jYXRjaCgoZSkgPT4gc2V0QXV0b1NoYXJlRXJyb3IoU3RyaW5nKGUpKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHNldEF1dG9TaGFyZUxvYWRpbmcoZmFsc2UpKTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVJ1blNoYXJlTGlua0JhY2tmaWxsKCkge1xuICAgIHNldFNoYXJlTGlua0JhY2tmaWxsUnVubmluZyh0cnVlKTtcbiAgICBzZXRTaGFyZUxpbmtCYWNrZmlsbERvbmUoZmFsc2UpO1xuICAgIHNldFNoYXJlTGlua0JhY2tmaWxsUHJvZ3Jlc3MoeyBjcmVhdGVkOiAwLCBleGlzdGluZzogMCwgc2tpcHBlZDogMCwgZXJyb3JzOiAwIH0pO1xuICAgIGxldCBjdXJzb3I6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgIGxldCB0b3RhbENyZWF0ZWQgPSAwLCB0b3RhbEV4aXN0aW5nID0gMCwgdG90YWxTa2lwcGVkID0gMCwgdG90YWxFcnJvcnMgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgIGFjdGlvbjogJ3J1blNoYXJlTGlua0JhY2tmaWxsQmF0Y2gnLFxuICAgICAgICAgIGN1cnNvcixcbiAgICAgICAgICBwcm9ncmFtTGFiZWw6IHNlbGVjdGVkUHJvZ3JhbUxhYmVsLFxuICAgICAgICAgIHNoYXJlTGlua1Byb3BlcnR5OiBERUZBVUxUX1NIQVJFX0xJTktfUFJPUEVSVFksXG4gICAgICAgICAgYWN0b3IsXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBiYXRjaCA9IHJlcy5yZXNwb25zZSB8fCB7fTtcbiAgICAgIHRvdGFsQ3JlYXRlZCArPSBiYXRjaC5jcmVhdGVkIHx8IDA7XG4gICAgICB0b3RhbEV4aXN0aW5nICs9IGJhdGNoLmV4aXN0aW5nIHx8IDA7XG4gICAgICB0b3RhbFNraXBwZWQgKz0gYmF0Y2guc2tpcHBlZCB8fCAwO1xuICAgICAgY29uc3QgYmF0Y2hFcnJvcnMgPSBiYXRjaC5lcnJvcnMgfHwgW107XG4gICAgICB0b3RhbEVycm9ycyArPSBiYXRjaEVycm9ycy5sZW5ndGg7XG4gICAgICBjdXJzb3IgPSBiYXRjaC5jdXJzb3IgfHwgbnVsbDtcbiAgICAgIHNldFNoYXJlTGlua0JhY2tmaWxsUHJvZ3Jlc3MoeyBjcmVhdGVkOiB0b3RhbENyZWF0ZWQsIGV4aXN0aW5nOiB0b3RhbEV4aXN0aW5nLCBza2lwcGVkOiB0b3RhbFNraXBwZWQsIGVycm9yczogdG90YWxFcnJvcnMgfSk7XG4gICAgICBpZiAoYmF0Y2guZG9uZSB8fCAhY3Vyc29yKSBicmVhaztcbiAgICB9XG4gICAgc2V0U2hhcmVMaW5rQmFja2ZpbGxSdW5uaW5nKGZhbHNlKTtcbiAgICBzZXRTaGFyZUxpbmtCYWNrZmlsbERvbmUodHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVMb2FkV29ya2Zsb3dzKCkge1xuICAgIHNldFdvcmtmbG93c0Vycm9yKG51bGwpO1xuICAgIHNldFdvcmtmbG93cyhbXSk7XG4gICAgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdnZXRXb3JrZmxvd3MnIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnN0IHIgPSByZXMucmVzcG9uc2UgfHwge307XG4gICAgICBpZiAoci5lcnJvcikgc2V0V29ya2Zsb3dzRXJyb3Ioci5lcnJvcik7XG4gICAgICBzZXRXb3JrZmxvd3Moci53b3JrZmxvd3MgPz8gW10pO1xuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHNldFdvcmtmbG93c0Vycm9yKCdGYWlsZWQgdG8gbG9hZCB3b3JrZmxvd3MnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRvZ2dsZVdvcmtmbG93KGZsb3dJZDogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuKSB7XG4gICAgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICd0b2dnbGVXb3JrZmxvdycsIGZsb3dJZCwgZW5hYmxlZCwgYWN0b3IgfSxcbiAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgIH0pLnRoZW4oKCkgPT4gaGFuZGxlTG9hZFdvcmtmbG93cygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURlbGV0ZVdvcmtmbG93KGZsb3dJZDogc3RyaW5nLCB3b3JrZmxvd05hbWU/OiBzdHJpbmcpIHtcbiAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICBwYXJhbWV0ZXJzOiB7IGFjdGlvbjogJ2RlbGV0ZVdvcmtmbG93JywgZmxvd0lkLCB3b3JrZmxvd05hbWUsIGFjdG9yIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHNldENvbmZpcm1EZWxldGVJZChudWxsKTtcbiAgICAgIGhhbmRsZUxvYWRXb3JrZmxvd3MoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVkaXRXb3JrZmxvdyh3OiBXb3JrZmxvd0luZm8pIHtcbiAgICBzZXRFZGl0aW5nV29ya2Zsb3dJZCh3LmlkKTtcbiAgICBzZXRTaG93RXZlbnRGb3JtKHRydWUpO1xuICAgIHNldENyZWF0ZVJlc3VsdCgnTG9hZGluZy4uLicpO1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnZ2V0V29ya2Zsb3dDb25maWcnLCBmbG93SWQ6IHcuaWQgfSxcbiAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc3QgY2ZnID0gcmVzLnJlc3BvbnNlPy5jb25maWc7XG4gICAgICBzZXRFdmVudEZvcm0oe1xuICAgICAgICBldmVudE5hbWU6IGNmZz8uZXZlbnROYW1lID8/IHcuZXZlbnROYW1lLFxuICAgICAgICB0cmlnZ2VyT2JqZWN0OiBjZmc/LnRyaWdnZXJPYmplY3QgPz8gJ2NvbnRhY3QnLFxuICAgICAgICB0cmlnZ2VyVHlwZTogY2ZnPy50cmlnZ2VyVHlwZSA/PyAnUkVDT1JEX0NSRUFURUQnLFxuICAgICAgICB0cmlnZ2VyUHJvcGVydHk6IGNmZz8udHJpZ2dlclByb3BlcnR5ID8/ICcnLFxuICAgICAgICB0cmlnZ2VyVG9WYWx1ZTogY2ZnPy50cmlnZ2VyVG9WYWx1ZSA/PyAnJyxcbiAgICAgICAgZmllbGRNYXBwaW5nczogY2ZnPy5maWVsZE1hcHBpbmdzID8/IFsuLi5DT05UQUNUX0RFRkFVTFRTXSxcbiAgICAgIH0pO1xuICAgICAgc2V0Q3JlYXRlUmVzdWx0KCcnKTtcbiAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICBzZXRFdmVudEZvcm0oeyAuLi5CTEFOS19FVkVOVF9GT1JNLCBldmVudE5hbWU6IHcuZXZlbnROYW1lIH0pO1xuICAgICAgc2V0Q3JlYXRlUmVzdWx0KCcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlRXZlbnRGb3JtKCkge1xuICAgIHNldFNob3dFdmVudEZvcm0oZmFsc2UpO1xuICAgIHNldEVkaXRpbmdXb3JrZmxvd0lkKG51bGwpO1xuICAgIHNldEV2ZW50Rm9ybShCTEFOS19FVkVOVF9GT1JNKTtcbiAgICBzZXRDcmVhdGVSZXN1bHQoJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlRXZlbnRXb3JrZmxvdyhlbmFibGVkOiBib29sZWFuKSB7XG4gICAgc2V0Q3JlYXRpbmdXb3JrZmxvdyh0cnVlKTtcbiAgICBzZXRDcmVhdGVSZXN1bHQoJycpO1xuICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICBuYW1lOiAnZXh0b2xlX3NldHRpbmdzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgYWN0aW9uOiAnY3JlYXRlV29ya2Zsb3cnLFxuICAgICAgICBldmVudE5hbWU6IGV2ZW50Rm9ybS5ldmVudE5hbWUsXG4gICAgICAgIHRyaWdnZXJPYmplY3Q6IGV2ZW50Rm9ybS50cmlnZ2VyT2JqZWN0LFxuICAgICAgICB0cmlnZ2VyVHlwZTogZXZlbnRGb3JtLnRyaWdnZXJUeXBlLFxuICAgICAgICB0cmlnZ2VyUHJvcGVydHk6IGV2ZW50Rm9ybS50cmlnZ2VyUHJvcGVydHkgfHwgdW5kZWZpbmVkLFxuICAgICAgICB0cmlnZ2VyVG9WYWx1ZTogZXZlbnRGb3JtLnRyaWdnZXJUb1ZhbHVlIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmllbGRNYXBwaW5nczogZXZlbnRGb3JtLmZpZWxkTWFwcGluZ3MsXG4gICAgICAgIGVuYWJsZWQsXG4gICAgICAgIGFjdG9yLFxuICAgICAgfSxcbiAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYgKHJlcy5yZXNwb25zZT8uZXJyb3IpIHtcbiAgICAgICAgc2V0Q3JlYXRlUmVzdWx0KGBFcnJvcjogJHtyZXMucmVzcG9uc2UuZXJyb3J9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRDcmVhdGVSZXN1bHQoYENyZWF0ZWQgXCIke3Jlcy5yZXNwb25zZT8ubmFtZX1cIi5gKTtcbiAgICAgICAgY2xvc2VFdmVudEZvcm0oKTtcbiAgICAgICAgaGFuZGxlTG9hZFdvcmtmbG93cygpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnIpID0+IHNldENyZWF0ZVJlc3VsdChgRXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCkpXG4gICAgICAuZmluYWxseSgoKSA9PiBzZXRDcmVhdGluZ1dvcmtmbG93KGZhbHNlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVVcGRhdGVFdmVudFdvcmtmbG93KCkge1xuICAgIGlmICghZWRpdGluZ1dvcmtmbG93SWQpIHJldHVybjtcbiAgICBzZXRDcmVhdGluZ1dvcmtmbG93KHRydWUpO1xuICAgIHNldENyZWF0ZVJlc3VsdCgnJyk7XG4gICAgcnVuU2VydmVybGVzc0Z1bmN0aW9uKHtcbiAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBhY3Rpb246ICd1cGRhdGVXb3JrZmxvdycsXG4gICAgICAgIGZsb3dJZDogZWRpdGluZ1dvcmtmbG93SWQsXG4gICAgICAgIGV2ZW50TmFtZTogZXZlbnRGb3JtLmV2ZW50TmFtZSxcbiAgICAgICAgdHJpZ2dlck9iamVjdDogZXZlbnRGb3JtLnRyaWdnZXJPYmplY3QsXG4gICAgICAgIHRyaWdnZXJUeXBlOiBldmVudEZvcm0udHJpZ2dlclR5cGUsXG4gICAgICAgIHRyaWdnZXJQcm9wZXJ0eTogZXZlbnRGb3JtLnRyaWdnZXJQcm9wZXJ0eSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHRyaWdnZXJUb1ZhbHVlOiBldmVudEZvcm0udHJpZ2dlclRvVmFsdWUgfHwgdW5kZWZpbmVkLFxuICAgICAgICBmaWVsZE1hcHBpbmdzOiBldmVudEZvcm0uZmllbGRNYXBwaW5ncyxcbiAgICAgIH0sXG4gICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMucmVzcG9uc2U/LmVycm9yKSB7XG4gICAgICAgIHNldENyZWF0ZVJlc3VsdChgRXJyb3I6ICR7cmVzLnJlc3BvbnNlLmVycm9yfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0Q3JlYXRlUmVzdWx0KGBTYXZlZCBcIiR7cmVzLnJlc3BvbnNlPy5uYW1lfVwiLmApO1xuICAgICAgICBjbG9zZUV2ZW50Rm9ybSgpO1xuICAgICAgICBoYW5kbGVMb2FkV29ya2Zsb3dzKCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4gc2V0Q3JlYXRlUmVzdWx0KGBFcnJvcjogJHtlcnIubWVzc2FnZX1gKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHNldENyZWF0aW5nV29ya2Zsb3coZmFsc2UpKTtcbiAgfVxuXG4gIC8vIOKUgOKUgOKUgCBSZW5kZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybT5cbiAgICAgIHsvKiDilIDilIAgTmF2aWdhdGlvbiDilIDilIAgKi99XG4gICAgICA8RmxleCBkaXJlY3Rpb249XCJyb3dcIiBnYXA9XCJleHRyYS1zbWFsbFwiPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9e2FjdGl2ZVRhYiA9PT0gJ29uYm9hcmRpbmcnID8gdW5kZWZpbmVkIDogJ3RyYW5zcGFyZW50J30gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdvbmJvYXJkaW5nJyl9Pk9uYm9hcmRpbmc8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PXthY3RpdmVUYWIgPT09ICdldmVudHMnID8gdW5kZWZpbmVkIDogJ3RyYW5zcGFyZW50J30gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdldmVudHMnKX0+RXZlbnQgQ29uZmlndXJhdGlvbjwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9e2FjdGl2ZVRhYiA9PT0gJ2Zvcm1zJyA/IHVuZGVmaW5lZCA6ICd0cmFuc3BhcmVudCd9IG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignZm9ybXMnKX0+Rm9ybSBJbnN0cnVtZW50YXRpb248L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PXthY3RpdmVUYWIgPT09ICdzaGFyZWxpbmtzJyA/IHVuZGVmaW5lZCA6ICd0cmFuc3BhcmVudCd9IG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignc2hhcmVsaW5rcycpfT5TaGFyZSBMaW5rczwvQnV0dG9uPlxuICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9e2FjdGl2ZVRhYiA9PT0gJ2xvZycgPyB1bmRlZmluZWQgOiAndHJhbnNwYXJlbnQnfSBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2xvZycpfT5Mb2c8L0J1dHRvbj5cbiAgICAgIDwvRmxleD5cbiAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgIHsvKiDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcbiAgICAgICAgICBTRUNUSU9OIDEg4oCUIE9OQk9BUkRJTkdcbiAgICAgIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdvbmJvYXJkaW5nJyAmJiAoPD5cblxuICAgICAgICAgIHsvKiDilIDilIAgU3RlcCAxOiBodWJzcG90dXRrIHByb3BlcnR5IOKUgOKUgCAqL31cbiAgICAgICAgICA8SGVhZGluZz5TdGVwIDE6IENyZWF0ZSBDb250YWN0IFByb3BlcnR5PC9IZWFkaW5nPlxuICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgQ3JlYXRlcyB0aGUgZXh0b2xlX2h1YnNwb3R1dGsgcHJvcGVydHkgb24gQ29udGFjdHMuIFRoaXMgc3RvcmVzIHRoZSBIdWJTcG90IHZpc2l0b3JcbiAgICAgICAgICAgIGNvb2tpZSBhdCBmb3JtIHN1Ym1pc3Npb24gYW5kIGlzIHVzZWQgYnkgYm90aCBGb3JtIEluc3RydW1lbnRhdGlvbiBhbmQgRXZlbnRcbiAgICAgICAgICAgIENvbmZpZ3VyYXRpb24gd29ya2Zsb3dzLlxuICAgICAgICAgIDwvVGV4dD5cblxuICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICB7aHVic3BvdHV0a1N0YXR1cy5leGlzdHMgPT09IG51bGwgPyAoXG4gICAgICAgICAgICA8TG9hZGluZ1NwaW5uZXIgbGFiZWw9XCJDaGVja2luZy4uLlwiIHNob3dMYWJlbCAvPlxuICAgICAgICAgICkgOiBodWJzcG90dXRrU3RhdHVzLmV4aXN0cyA/IChcbiAgICAgICAgICAgIDxGbGV4IGRpcmVjdGlvbj1cInJvd1wiIGdhcD1cInNtYWxsXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgPFN0YXR1c1RhZyB2YXJpYW50PVwic3VjY2Vzc1wiPlxuICAgICAgICAgICAgICAgIENyZWF0ZWQge2Zvcm1hdERhdGUoaHVic3BvdHV0a1N0YXR1cy5jcmVhdGVkQXQsIGxvY2FsZSl9XG4gICAgICAgICAgICAgIDwvU3RhdHVzVGFnPlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUNoZWNrSHVic3BvdHV0a1Byb3BlcnR5fSB2YXJpYW50PVwidHJhbnNwYXJlbnRcIj5SZWZyZXNoPC9CdXR0b24+XG4gICAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlQ3JlYXRlSHVic3BvdHV0a1Byb3BlcnR5fSBkaXNhYmxlZD17aHVic3BvdHV0a0NyZWF0aW5nfT5cbiAgICAgICAgICAgICAgICB7aHVic3BvdHV0a0NyZWF0aW5nID8gJ0NyZWF0aW5nLi4uJyA6ICdDcmVhdGUgUHJvcGVydHknfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAge2h1YnNwb3R1dGtDcmVhdGVSZXN1bHQgJiYgPFRleHQ+e2h1YnNwb3R1dGtDcmVhdGVSZXN1bHR9PC9UZXh0Pn1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgICAgey8qIOKUgOKUgCBTdGVwIDI6IEVucm9sbCBleGlzdGluZyBjb250YWN0cyDilIDilIAgKi99XG4gICAgICAgICAgPEhlYWRpbmc+U3RlcCAyOiBFbnJvbGwgRXhpc3RpbmcgQ29udGFjdHM8L0hlYWRpbmc+XG4gICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICBSZWdpc3RlcnMgeW91ciBleGlzdGluZyBIdWJTcG90IGNvbnRhY3RzIHdpdGggRXh0b2xlIHNvIHRoZXkgY2FuIHBhcnRpY2lwYXRlIGluXG4gICAgICAgICAgICByZWZlcnJhbCBwcm9ncmFtcyBpbW1lZGlhdGVseS4gU2FmZSB0byByZS1ydW4g4oCUIEV4dG9sZSdzIHJlZ2lzdGVyIGNhbGwgaXMgaWRlbXBvdGVudC5cbiAgICAgICAgICA8L1RleHQ+XG5cbiAgICAgICAgICB7Y29udGFjdFRvdGFsICE9PSBudWxsICYmIChcbiAgICAgICAgICAgIDxUZXh0Pntjb250YWN0VG90YWwudG9Mb2NhbGVTdHJpbmcoKX0gY29udGFjdHMgdG8gZW5yb2xsPC9UZXh0PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgPEZsZXggZGlyZWN0aW9uPVwicm93XCIgZ2FwPVwic21hbGxcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVMb2FkQ29udGFjdENvdW50fSBkaXNhYmxlZD17YmFja2ZpbGxSdW5uaW5nfT5cbiAgICAgICAgICAgICAgQ291bnQgQ29udGFjdHNcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVSdW5CYWNrZmlsbH0gZGlzYWJsZWQ9e2JhY2tmaWxsUnVubmluZ30gdmFyaWFudD1cInByaW1hcnlcIj5cbiAgICAgICAgICAgICAge2JhY2tmaWxsUnVubmluZyA/ICdFbnJvbGxpbmcuLi4nIDogJ0Vucm9sbCBDb250YWN0cyd9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L0ZsZXg+XG5cbiAgICAgICAgICB7YmFja2ZpbGxSdW5uaW5nICYmIDxMb2FkaW5nU3Bpbm5lciBsYWJlbD1cIkVucm9sbGluZyBjb250YWN0cy4uLlwiIHNob3dMYWJlbCAvPn1cblxuICAgICAgICAgIHtiYWNrZmlsbFByb2dyZXNzICYmIChcbiAgICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgICBFbnJvbGxlZDoge2JhY2tmaWxsUHJvZ3Jlc3MuZW5yb2xsZWR9IHwgU2tpcHBlZDoge2JhY2tmaWxsUHJvZ3Jlc3Muc2tpcHBlZH0gfCBFcnJvcnM6IHtiYWNrZmlsbFByb2dyZXNzLmVycm9yc31cbiAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2JhY2tmaWxsRG9uZSAmJiA8VGV4dD5FbnJvbGxtZW50IGNvbXBsZXRlLjwvVGV4dD59XG5cbiAgICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgICAgey8qIOKUgOKUgCBTdGVwIDM6IEFkZCBDUk0gQ2FyZHMg4pSA4pSAICovfVxuICAgICAgICAgIDxIZWFkaW5nPlN0ZXAgMzogQWRkIENSTSBDYXJkczwvSGVhZGluZz5cbiAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgIEFkZCB0aGUgRXh0b2xlIGNhcmQgdG8geW91ciBDb250YWN0IGFuZCBEZWFsIHJlY29yZCBwYWdlcyBzbyB5b3VyIHRlYW0gY2FuIHNlZVxuICAgICAgICAgICAgcmVmZXJyYWwgYWN0aXZpdHkgaW5saW5lIHdpdGhpbiBIdWJTcG90IENSTS5cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgIDxMaW5rIGhyZWY9e3sgdXJsOiBgaHR0cHM6Ly9hcHAuaHVic3BvdC5jb20vY29ubmVjdGVkLWFwcHMvJHtwb3J0YWxJZH0vY2FyZHNgLCBleHRlcm5hbDogdHJ1ZSB9fT5cbiAgICAgICAgICAgIE9wZW4gQXBwIENhcmRzIHNldHRpbmdzIOKGklxuICAgICAgICAgIDwvTGluaz5cblxuICAgICAgPC8+KX1cblxuICAgICAgey8qIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuICAgICAgICAgIFNFQ1RJT04gMiDigJQgRVZFTlQgQ09ORklHVVJBVElPTlxuICAgICAg4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ2V2ZW50cycgJiYgKDw+XG5cbiAgICAgICAgICB7Lyog4pSA4pSAIENvbm5lY3Rpb24g4pSA4pSAICovfVxuICAgICAgICAgIDxIZWFkaW5nPkV4dG9sZSBDb25uZWN0aW9uPC9IZWFkaW5nPlxuICAgICAgICAgIDxUZXh0PlZlcmlmeSB5b3VyIEV4dG9sZSBBUEkgdG9rZW4gaXMgY29uZmlndXJlZCBhbmQgcmVhY2hhYmxlLjwvVGV4dD5cbiAgICAgICAgICA8RmxleCBkaXJlY3Rpb249XCJyb3dcIiBnYXA9XCJzbWFsbFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVRlc3RDb25uZWN0aW9ufSBkaXNhYmxlZD17Y29ubmVjdGlvblRlc3Rpbmd9PlxuICAgICAgICAgICAgICB7Y29ubmVjdGlvblRlc3RpbmcgPyAnVGVzdGluZy4uLicgOiAnVGVzdCBDb25uZWN0aW9uJ31cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge2Nvbm5lY3Rpb25TdGF0dXMgPT09ICdvaycgJiYgKFxuICAgICAgICAgICAgICA8U3RhdHVzVGFnIHZhcmlhbnQ9XCJzdWNjZXNzXCI+Q29ubmVjdGlvbiBmdW5jdGlvbmluZyBwcm9wZXJseTwvU3RhdHVzVGFnPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtjb25uZWN0aW9uU3RhdHVzID09PSAnZXJyb3InICYmIChcbiAgICAgICAgICAgICAgPFN0YXR1c1RhZyB2YXJpYW50PVwiZGFuZ2VyXCI+e2Nvbm5lY3Rpb25EZXRhaWwgfHwgJ0NoZWNrIEVYVE9MRV9BUElfVE9LRU4gc2VjcmV0J308L1N0YXR1c1RhZz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9GbGV4PlxuXG4gICAgICAgICAgPERpdmlkZXIgLz5cblxuICAgICAgICAgIHsvKiDilIDilIAgV29ya2Zsb3dzIOKUgOKUgCAqL31cbiAgICAgICAgICA8SGVhZGluZz5Xb3JrZmxvd3M8L0hlYWRpbmc+XG4gICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICBDcmVhdGUgSHViU3BvdCBXb3JrZmxvd3MgdGhhdCBmaXJlIGV2ZW50cyB0byBFeHRvbGUuIENob29zZSBhbnkgZXZlbnQgbmFtZSB5b3VyXG4gICAgICAgICAgICBFeHRvbGUgcHJvZ3JhbSBleHBlY3RzLCBwaWNrIGEgdHJpZ2dlciBvYmplY3QsIGFuZCBtYXAgSHViU3BvdCBwcm9wZXJ0aWVzIHRvXG4gICAgICAgICAgICBFeHRvbGUgZGF0YSBmaWVsZHMuIFdvcmtmbG93cyBhcmUgcHJlLXdpcmVkIHdpdGggdGhlIGNvcnJlY3QgZW5kcG9pbnQgYW5kIGF1dGguXG4gICAgICAgICAgPC9UZXh0PlxuXG4gICAgICAgICAge3dvcmtmbG93c0Vycm9yICYmIChcbiAgICAgICAgICAgIDxTdGF0dXNUYWcgdmFyaWFudD1cImRhbmdlclwiPnt3b3JrZmxvd3NFcnJvcn08L1N0YXR1c1RhZz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxGbGV4IGRpcmVjdGlvbj1cInJvd1wiIGdhcD1cInNtYWxsXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIHshd29ya2Zsb3dzRXJyb3IgJiYgd29ya2Zsb3dzLmxlbmd0aCA9PT0gMCAmJiA8VGV4dD5ObyBFeHRvbGUgd29ya2Zsb3dzIGZvdW5kLjwvVGV4dD59XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUxvYWRXb3JrZmxvd3N9IHZhcmlhbnQ9XCJ0cmFuc3BhcmVudFwiPlJlZnJlc2g8L0J1dHRvbj5cbiAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgICAge3dvcmtmbG93cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8VGFibGU+XG4gICAgICAgICAgICAgICAgICA8VGFibGVIZWFkPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uPXtzb3J0Q29sID09PSAnbmFtZScgPyBzb3J0RGlyIDogJ25vbmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXsoZGlyKSA9PiB7IHNldFNvcnRDb2woJ25hbWUnKTsgc2V0U29ydERpcihkaXIgYXMgJ2FzY2VuZGluZycgfCAnZGVzY2VuZGluZycpOyB9fVxuICAgICAgICAgICAgICAgICAgICAgID5FeHRvbGUgRXZlbnQ8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydERpcmVjdGlvbj17c29ydENvbCA9PT0gJ29iamVjdCcgPyBzb3J0RGlyIDogJ25vbmUnfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Tb3J0Q2hhbmdlPXsoZGlyKSA9PiB7IHNldFNvcnRDb2woJ29iamVjdCcpOyBzZXRTb3J0RGlyKGRpciBhcyAnYXNjZW5kaW5nJyB8ICdkZXNjZW5kaW5nJyk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgPk9iamVjdDwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0RGlyZWN0aW9uPXtzb3J0Q29sID09PSAnc3RhdHVzJyA/IHNvcnREaXIgOiAnbm9uZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnRDaGFuZ2U9eyhkaXIpID0+IHsgc2V0U29ydENvbCgnc3RhdHVzJyk7IHNldFNvcnREaXIoZGlyIGFzICdhc2NlbmRpbmcnIHwgJ2Rlc2NlbmRpbmcnKTsgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+U3RhdHVzPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnREaXJlY3Rpb249e3NvcnRDb2wgPT09ICdjcmVhdGVkJyA/IHNvcnREaXIgOiAnbm9uZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNvcnRDaGFuZ2U9eyhkaXIpID0+IHsgc2V0U29ydENvbCgnY3JlYXRlZCcpOyBzZXRTb3J0RGlyKGRpciBhcyAnYXNjZW5kaW5nJyB8ICdkZXNjZW5kaW5nJyk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgPkNyZWF0ZWQ8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlcj5BY3Rpb25zPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgIDwvVGFibGVIZWFkPlxuICAgICAgICAgICAgICAgICAgPFRhYmxlQm9keT5cbiAgICAgICAgICAgICAgICAgICAge3NvcnRlZFdvcmtmbG93cy5tYXAoKHcpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXt3LmlkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e3cuZXZlbnROYW1lfTwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge09CSkVDVF9UWVBFX0xBQkVMU1t3Lm9iamVjdFR5cGVJZCA/PyAnJ10gPz8gdy5vYmplY3RUeXBlSWQgPz8gJ1Vua25vd24nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDZWxsPnt3LnN0YXR1cyA9PT0gJ0RSQUZUJyA/ICdEcmFmdCcgOiB3LmVuYWJsZWQgPyAnQWN0aXZlJyA6ICdJbmFjdGl2ZSd9PC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGVDZWxsPntmb3JtYXREYXRlKHcuY3JlYXRlZEF0LCBsb2NhbGUpfTwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmZpcm1EZWxldGVJZCA9PT0gdy5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmxleCBkaXJlY3Rpb249XCJyb3dcIiBnYXA9XCJleHRyYS1zbWFsbFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlbGV0ZVdvcmtmbG93KHcuaWQsIHcubmFtZSl9IHZhcmlhbnQ9XCJkZXN0cnVjdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb25maXJtIGRlbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldENvbmZpcm1EZWxldGVJZChudWxsKX0+Q2FuY2VsPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93biB2YXJpYW50PVwidHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5CdXR0b25JdGVtIG9uQ2xpY2s9eygpID0+IGhhbmRsZUVkaXRXb3JrZmxvdyh3KX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uQnV0dG9uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5CdXR0b25JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXt7IHVybDogYGh0dHBzOi8vYXBwLmh1YnNwb3QuY29tL3dvcmtmbG93cy8ke3BvcnRhbElkfS9wbGF0Zm9ybS9mbG93LyR7dy5pZH0vZWRpdGAsIGV4dGVybmFsOiB0cnVlIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gV29ya2Zsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5CdXR0b25JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3cuZW5hYmxlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkJ1dHRvbkl0ZW0gb25DbGljaz17KCkgPT4gaGFuZGxlVG9nZ2xlV29ya2Zsb3cody5pZCwgZmFsc2UpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEZWFjdGl2YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uQnV0dG9uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5CdXR0b25JdGVtIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRvZ2dsZVdvcmtmbG93KHcuaWQsIHRydWUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY3RpdmF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkJ1dHRvbkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkJ1dHRvbkl0ZW0gb25DbGljaz17KCkgPT4gc2V0Q29uZmlybURlbGV0ZUlkKHcuaWQpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGVsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkJ1dHRvbkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgICAgICAgICAgICAgPC9UYWJsZT5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7IXNob3dFdmVudEZvcm0gPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIHtjcmVhdGVSZXN1bHQgJiYgPFRleHQ+e2NyZWF0ZVJlc3VsdH08L1RleHQ+fVxuICAgICAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7IHNldFNob3dFdmVudEZvcm0odHJ1ZSk7IHNldENyZWF0ZVJlc3VsdCgnJyk7IH19PlxuICAgICAgICAgICAgICAgICAgICArIEFkZCBFdmVudFxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPEV2ZW50Rm9ybVxuICAgICAgICAgICAgICAgICAgZm9ybT17ZXZlbnRGb3JtfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldEV2ZW50Rm9ybX1cbiAgICAgICAgICAgICAgICAgIG9uU3VibWl0PXtlZGl0aW5nV29ya2Zsb3dJZCA/ICgpID0+IGhhbmRsZVVwZGF0ZUV2ZW50V29ya2Zsb3coKSA6IGhhbmRsZUNyZWF0ZUV2ZW50V29ya2Zsb3d9XG4gICAgICAgICAgICAgICAgICBvbkNhbmNlbD17Y2xvc2VFdmVudEZvcm19XG4gICAgICAgICAgICAgICAgICBjcmVhdGluZz17Y3JlYXRpbmdXb3JrZmxvd31cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZVJlc3VsdD17Y3JlYXRlUmVzdWx0fVxuICAgICAgICAgICAgICAgICAgaXNFZGl0aW5nPXshIWVkaXRpbmdXb3JrZmxvd0lkfVxuICAgICAgICAgICAgICAgICAgb25WYWxpZGF0ZVByb3BlcnR5PXsob2JqZWN0VHlwZSwgcHJvcGVydHlOYW1lKSA9PlxuICAgICAgICAgICAgICAgICAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAndmFsaWRhdGVQcm9wZXJ0eScsIG9iamVjdFR5cGUsIHByb3BlcnR5TmFtZSB9LFxuICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNUb1NlbmQ6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXMpID0+IHJlcy5yZXNwb25zZT8udmFsaWQgPz8gZmFsc2UpLmNhdGNoKCgpID0+IGZhbHNlKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgb25Mb2FkT2JqZWN0VHlwZXM9eygpID0+XG4gICAgICAgICAgICAgICAgICAgIHJ1blNlcnZlcmxlc3NGdW5jdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2V4dG9sZV9zZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogeyBhY3Rpb246ICdnZXRPYmplY3RUeXBlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiByZXMucmVzcG9uc2U/Lm9iamVjdFR5cGVzID8/IFtdKS5jYXRjaCgoKSA9PiBbXSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uTG9hZE9iamVjdFByb3BlcnRpZXM9eyhvYmplY3RUeXBlKSA9PlxuICAgICAgICAgICAgICAgICAgICBydW5TZXJ2ZXJsZXNzRnVuY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdleHRvbGVfc2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHsgYWN0aW9uOiAnZ2V0T2JqZWN0UHJvcGVydGllcycsIG9iamVjdFR5cGUgfSxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzVG9TZW5kOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5yZXNwb25zZT8uZXJyb3IpIHRocm93IG5ldyBFcnJvcihyZXMucmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMucmVzcG9uc2U/LnByb3BlcnRpZXMgPz8gW107XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgPC8+KX1cblxuICAgICAgey8qIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuICAgICAgICAgIFNFQ1RJT04gMyDigJQgRk9STSBJTlNUUlVNRU5UQVRJT05cbiAgICAgIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdmb3JtcycgJiYgKDw+XG5cbiAgICAgICAgICA8SGVhZGluZz5Gb3JtIEluc3RydW1lbnRhdGlvbjwvSGVhZGluZz5cbiAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgIENhcHR1cmVzIHRoZSByZWZlcnJhbCBhZHZvY2F0ZSBjb2RlIGF0IGZvcm0gc3VibWlzc2lvbiBhbmQgc3RvcmVzIGl0IG9uIHRoZSBDb250YWN0XG4gICAgICAgICAgICBmb3IgRXh0b2xlIGF0dHJpYnV0aW9uLiBCZWZvcmUgZGVwbG95aW5nIHRoZSBzbmlwcGV0LCBhZGQgZXh0b2xlX2Fkdm9jYXRlX2NvZGUgYXMgYVxuICAgICAgICAgICAgaGlkZGVuIGZpZWxkIG9uIGVhY2ggZm9ybSB5b3Ugd2FudCB0byBpbnN0cnVtZW50IGluIEh1YlNwb3QncyBmb3JtIGJ1aWxkZXIuXG4gICAgICAgICAgICBTa2lwIHRoaXMgc2VjdGlvbiBpZiB5b3UncmUgdXNpbmcgc2VydmVyLXNpZGUgaWRlbnRpdHkgcmVzb2x1dGlvbiBvciBkb24ndCBuZWVkXG4gICAgICAgICAgICBmb3JtLWJhc2VkIGF0dHJpYnV0aW9uLlxuICAgICAgICAgIDwvVGV4dD5cblxuICAgICAgICAgIDxUb2dnbGVcbiAgICAgICAgICAgIG5hbWU9XCJpbmNsdWRlQWR2b2NhdGVDb2RlXCJcbiAgICAgICAgICAgIGxhYmVsPVwiQ2FwdHVyZSBhZHZvY2F0ZSBjb2RlXCJcbiAgICAgICAgICAgIGNoZWNrZWQ9e2luY2x1ZGVBZHZvY2F0ZUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17KHZhbCkgPT4gc2V0SW5jbHVkZUFkdm9jYXRlQ29kZSh2YWwpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFRleHQ+UmVhZHMgdGhlIHJlZmVycmFsIGNvZGUgZnJvbSB0aGUgVVJMIHBhcmFtIGFuZCBzdG9yZXMgaXQgb24gdGhlIENvbnRhY3QgZm9yIEh1YlNwb3QgcmVwb3J0aW5nLjwvVGV4dD5cblxuICAgICAgICAgIHtpbmNsdWRlQWR2b2NhdGVDb2RlICYmIChcbiAgICAgICAgICAgIDxGbGV4IGRpcmVjdGlvbj1cInJvd1wiPlxuICAgICAgICAgICAgICA8Qm94IGZsZXg9XCJub25lXCI+PFRleHQ+eydcXHUwMEEwXFx1MDBBMFxcdTAwQTBcXHUwMEEwXFx1MDBBMFxcdTAwQTAnfTwvVGV4dD48L0JveD5cbiAgICAgICAgICAgICAgPEJveCBmbGV4PXsxfT5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIGxhYmVsPVwiQWR2b2NhdGUgY29kZSBDb250YWN0IHByb3BlcnR5XCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJhZHZvY2F0ZUNvZGVQcm9wZXJ0eVwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17YWR2b2NhdGVDb2RlUHJvcGVydHl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHZhbCkgPT4gc2V0QWR2b2NhdGVDb2RlUHJvcGVydHkodmFsKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJBZHZvY2F0ZSBjb2RlIFVSTCBwYXJhbWV0ZXIocylcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInJlZmVycmFsVXJsUGFyYW1cIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlZmVycmFsVXJsUGFyYW19XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHZhbCkgPT4gc2V0UmVmZXJyYWxVcmxQYXJhbSh2YWwpfVxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb249XCJDb21tYS1zZXBhcmF0ZWQgVVJMIHBhcmFtcyB0byBjaGVjaywgaW4gb3JkZXIuIEZpcnN0IG1hdGNoIHdpbnMuIENvbmZpcm0gd2l0aCB5b3VyIEV4dG9sZSBpbXBsZW1lbnRhdGlvbiB0ZWFtLlwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpbmNsdWRlQWR2b2NhdGVDb2RlICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICAgICAge2Fkdm9jYXRlQ29kZVByb3BlcnR5U3RhdHVzLmV4aXN0cyA9PT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICA8VGV4dD5DaGVja2luZyBwcm9wZXJ0eS4uLjwvVGV4dD5cbiAgICAgICAgICAgICAgKSA6IGFkdm9jYXRlQ29kZVByb3BlcnR5U3RhdHVzLmV4aXN0cyA/IChcbiAgICAgICAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgICAgICAgIHthZHZvY2F0ZUNvZGVQcm9wZXJ0eX0g4oCUIENyZWF0ZWQge2Zvcm1hdERhdGUoYWR2b2NhdGVDb2RlUHJvcGVydHlTdGF0dXMuY3JlYXRlZEF0LCBsb2NhbGUpfVxuICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDcmVhdGVBZHZvY2F0ZUNvZGVQcm9wZXJ0eX0gZGlzYWJsZWQ9e2Fkdm9jYXRlQ29kZUNyZWF0aW5nfT5cbiAgICAgICAgICAgICAgICAgICAge2Fkdm9jYXRlQ29kZUNyZWF0aW5nID8gJ0NyZWF0aW5nLi4uJyA6ICdDcmVhdGUgUHJvcGVydHknfVxuICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICB7YWR2b2NhdGVDb2RlQ3JlYXRlUmVzdWx0ICYmIDxUZXh0PnthZHZvY2F0ZUNvZGVDcmVhdGVSZXN1bHR9PC9UZXh0Pn1cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICBsYWJlbD1cIkZvcm0gdGFyZ2V0aW5nXCJcbiAgICAgICAgICAgIG5hbWU9XCJmb3JtVGFyZ2V0aW5nXCJcbiAgICAgICAgICAgIHZhbHVlPXtmb3JtVGFyZ2V0aW5nfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyh2YWwpID0+IHNldEZvcm1UYXJnZXRpbmcodmFsIGFzICdhbGwnIHwgJ3NwZWNpZmljJyl9XG4gICAgICAgICAgICBvcHRpb25zPXtbXG4gICAgICAgICAgICAgIHsgbGFiZWw6ICdBbGwgRW1iZWRkZWQgRm9ybXMnLCB2YWx1ZTogJ2FsbCcgfSxcbiAgICAgICAgICAgICAgeyBsYWJlbDogJ1NwZWNpZmljIGZvcm1zJywgdmFsdWU6ICdzcGVjaWZpYycgfSxcbiAgICAgICAgICAgIF19XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtmb3JtVGFyZ2V0aW5nID09PSAnc3BlY2lmaWMnICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIHthdmFpbGFibGVGb3Jtc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPFRleHQ+TG9hZGluZyBmb3Jtcy4uLjwvVGV4dD5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICBsYWJlbD1cIkFkZCBhIGZvcm1cIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cImFkZEZvcm1cIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9XCJcIlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAhc2VsZWN0ZWRGb3JtSWRzLmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEZvcm1JZHMoWy4uLnNlbGVjdGVkRm9ybUlkcywgdmFsXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBvcHRpb25zPXtbXG4gICAgICAgICAgICAgICAgICAgIHsgbGFiZWw6ICfigJQgc2VsZWN0IGEgZm9ybSDigJQnLCB2YWx1ZTogJycgfSxcbiAgICAgICAgICAgICAgICAgICAgLi4uYXZhaWxhYmxlRm9ybXNcbiAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGYgPT4gIXNlbGVjdGVkRm9ybUlkcy5pbmNsdWRlcyhmLmlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAubWFwKGYgPT4gKHsgbGFiZWw6IGYubmFtZSwgdmFsdWU6IGYuaWQgfSkpLFxuICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7c2VsZWN0ZWRGb3JtSWRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgIDxCb3g+XG4gICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRGb3JtSWRzLm1hcChpZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBhdmFpbGFibGVGb3Jtcy5maW5kKGYgPT4gZi5pZCA9PT0gaWQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxGbGV4IGtleT17aWR9IGRpcmVjdGlvbj1cInJvd1wiIGp1c3RpZnk9XCJiZXR3ZWVuXCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0Pntmb3JtID8gZm9ybS5uYW1lIDogaWR9IDxUZXh0IGZvcm1hdD17eyBjb2xvcjogJ21lZGl1bScgfX0+KHtpZH0pPC9UZXh0PjwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRGb3JtSWRzKHNlbGVjdGVkRm9ybUlkcy5maWx0ZXIoZmlkID0+IGZpZCAhPT0gaWQpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgUmVtb3ZlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAge3NlbGVjdGVkRm9ybUlkcy5sZW5ndGggPT09IDAgJiYgIWF2YWlsYWJsZUZvcm1zTG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgPFRleHQgZm9ybWF0PXt7IGNvbG9yOiAnbWVkaXVtJyB9fT5ObyBmb3JtcyBzZWxlY3RlZCDigJQgc25pcHBldCB3aWxsIG5vdCBpbnN0cnVtZW50IGFueSBmb3Jtcy48L1RleHQ+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPERpdmlkZXIgLz5cbiAgICAgICAgICA8VGV4dCBmb3JtYXQ9e3sgZm9udFdlaWdodDogJ2JvbGQnIH19PkdlbmVyYXRlZCBTbmlwcGV0PC9UZXh0PlxuICAgICAgICAgIDxUZXh0PkNvcHkgdGhpcyBzbmlwcGV0IGFuZCBlbWJlZCBpdCBvbiB5b3VyIHNpdGUsIGFmdGVyIHRoZSBIdWJTcG90IHRyYWNraW5nIHNjcmlwdC4gV29ya3Mgd2l0aCBib3RoIGNsYXNzaWMgKHYyKSBhbmQgbmV3IGZvcm0gYnVpbGRlciAodjMpIGVtYmVkcy48L1RleHQ+XG4gICAgICAgICAgPFRleHRBcmVhXG4gICAgICAgICAgICBsYWJlbD1cIlwiXG4gICAgICAgICAgICBuYW1lPVwic25pcHBldFwiXG4gICAgICAgICAgICB2YWx1ZT17c25pcHBldH1cbiAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICByb3dzPXsxMn1cbiAgICAgICAgICAvPlxuXG4gICAgICA8Lz4pfVxuXG4gICAgICB7Lyog4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXG4gICAgICAgICAgU0VDVElPTiA0IOKAlCBTSEFSRSBMSU5LU1xuICAgICAg4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ3NoYXJlbGlua3MnICYmICg8PlxuXG4gICAgICAgICAgey8qIOKUgOKUgCBTdGVwIDE6IFNoYXJlIGxpbmsgcHJvcGVydHkg4pSA4pSAICovfVxuICAgICAgICAgIDxIZWFkaW5nPkNyZWF0ZSBTaGFyZSBMaW5rIFByb3BlcnR5PC9IZWFkaW5nPlxuICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgQ3JlYXRlcyB0aGUgRXh0b2xlIFNoYXJlIExpbmsgcHJvcGVydHkgb24gQ29udGFjdHMuIFNoYXJlIGxpbmtzIGFyZSB3cml0dGVuIGhlcmVcbiAgICAgICAgICAgIGFmdGVyIGdlbmVyYXRpb24gYW5kIGNhbiBiZSB1c2VkIGluIEh1YlNwb3QgZW1haWxzIGFuZCByZXBvcnRpbmcuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxTcGFjZXIgLz5cbiAgICAgICAgICB7c2hhcmVMaW5rUHJvcGVydHlTdGF0dXMuZXhpc3RzID09PSBudWxsID8gKFxuICAgICAgICAgICAgPExvYWRpbmdTcGlubmVyIGxhYmVsPVwiQ2hlY2tpbmcuLi5cIiBzaG93TGFiZWwgLz5cbiAgICAgICAgICApIDogc2hhcmVMaW5rUHJvcGVydHlTdGF0dXMuZXhpc3RzID8gKFxuICAgICAgICAgICAgPFN0YXR1c1RhZyB2YXJpYW50PVwic3VjY2Vzc1wiPlxuICAgICAgICAgICAgICB7REVGQVVMVF9TSEFSRV9MSU5LX1BST1BFUlRZfSDigJQgQ3JlYXRlZCB7Zm9ybWF0RGF0ZShzaGFyZUxpbmtQcm9wZXJ0eVN0YXR1cy5jcmVhdGVkQXQsIGxvY2FsZSl9XG4gICAgICAgICAgICA8L1N0YXR1c1RhZz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDcmVhdGVTaGFyZUxpbmtQcm9wZXJ0eX0gZGlzYWJsZWQ9e3NoYXJlTGlua1Byb3BlcnR5Q3JlYXRpbmd9PlxuICAgICAgICAgICAgICAgIHtzaGFyZUxpbmtQcm9wZXJ0eUNyZWF0aW5nID8gJ0NyZWF0aW5nLi4uJyA6ICdDcmVhdGUgUHJvcGVydHknfVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAge3NoYXJlTGlua1Byb3BlcnR5Q3JlYXRlUmVzdWx0ICYmIDxUZXh0PntzaGFyZUxpbmtQcm9wZXJ0eUNyZWF0ZVJlc3VsdH08L1RleHQ+fVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgICAgICB7Lyog4pSA4pSAIEF1dG8tZ2VuZXJhdGUgZm9yIG5ldyBjb250YWN0cyDilIDilIAgKi99XG4gICAgICAgICAgPEhlYWRpbmc+QXV0by1nZW5lcmF0ZSBTaGFyZSBMaW5rcyBmb3IgTmV3IENvbnRhY3RzPC9IZWFkaW5nPlxuICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgR2VuZXJhdGUgYSBzaGFyZSBsaW5rIHVzaW5nIEV4dG9sZSB3aGVuZXZlciBhIG5ldyBjb250YWN0IGlzIGNyZWF0ZWQgaW4gSHViU3BvdCxcbiAgICAgICAgICAgIGFuZCBzYXZlIHRoYXQgbGluayB0byB0aGUgRXh0b2xlIFNoYXJlIExpbmsgcHJvcGVydHkgYXV0b21hdGljYWxseS5cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFNwYWNlciAvPlxuXG4gICAgICAgICAge2F1dG9TaGFyZUVuYWJsZWQgPT09IG51bGwgPyAoXG4gICAgICAgICAgICA8TG9hZGluZ1NwaW5uZXIgbGFiZWw9XCJDaGVja2luZyBzdGF0dXMuLi5cIiBzaG93TGFiZWwgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFRvZ2dsZVxuICAgICAgICAgICAgICBsYWJlbD17YXV0b1NoYXJlRW5hYmxlZCA/ICdFbmFibGVkJyA6ICdEaXNhYmxlZCd9XG4gICAgICAgICAgICAgIG5hbWU9XCJhdXRvU2hhcmVcIlxuICAgICAgICAgICAgICBjaGVja2VkPXthdXRvU2hhcmVFbmFibGVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHZhbCkgPT4gaGFuZGxlVG9nZ2xlQXV0b1NoYXJlKHZhbCl9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXthdXRvU2hhcmVMb2FkaW5nfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIHthdXRvU2hhcmVFcnJvciAmJiA8U3RhdHVzVGFnIHZhcmlhbnQ9XCJkYW5nZXJcIj57YXV0b1NoYXJlRXJyb3J9PC9TdGF0dXNUYWc+fVxuXG4gICAgICAgICAge2F1dG9TaGFyZUVuYWJsZWQgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAgICB7Y2FtcGFpZ25zTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICA8TG9hZGluZ1NwaW5uZXIgbGFiZWw9XCJMb2FkaW5nLi4uXCIgc2hvd0xhYmVsIC8+XG4gICAgICAgICAgICAgICkgOiBjYW1wYWlnbnNFcnJvciA/IChcbiAgICAgICAgICAgICAgICA8U3RhdHVzVGFnIHZhcmlhbnQ9XCJkYW5nZXJcIj57Y2FtcGFpZ25zRXJyb3J9PC9TdGF0dXNUYWc+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgbGFiZWw9XCJDYW1wYWlnbiBUYXJnZXRpbmcgTGFiZWwgKG9wdGlvbmFsKVwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwiYXV0b1NoYXJlQ2FtcGFpZ25cIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2F1dG9TaGFyZVByb2dyYW1MYWJlbH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodmFsKSA9PiBzZXRBdXRvU2hhcmVQcm9ncmFtTGFiZWwodmFsKX1cbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1t7IGxhYmVsOiAnTm9uZScsIHZhbHVlOiAnJyB9LCAuLi5jYW1wYWlnbnMubWFwKGMgPT4gKHsgbGFiZWw6IGMubmFtZSwgdmFsdWU6IGMucHJvZ3JhbUxhYmVsIH0pKV19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8RGl2aWRlciAvPlxuXG4gICAgICAgICAgey8qIOKUgOKUgCBHZW5lcmF0ZSBmb3IgZXhpc3RpbmcgY29udGFjdHMg4pSA4pSAICovfVxuICAgICAgICAgIDxIZWFkaW5nPkdlbmVyYXRlIFNoYXJlIExpbmtzIGZvciBFeGlzdGluZyBIdWJTcG90IENvbnRhY3RzPC9IZWFkaW5nPlxuICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgUnVuIG9uY2UgdG8gZ2VuZXJhdGUgc2hhcmUgbGlua3MgZm9yIGNvbnRhY3RzIGFscmVhZHkgaW4gSHViU3BvdC5cbiAgICAgICAgICAgIFNhZmUgdG8gcmUtcnVuIOKAlCBjb250YWN0cyB3aG8gYWxyZWFkeSBoYXZlIGEgbGluayBhcmUgdXBkYXRlZCBpbiBwbGFjZS5cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFNwYWNlciAvPlxuXG4gICAgICAgICAge2NhbXBhaWduc0xvYWRpbmcgPyBudWxsIDogY2FtcGFpZ25zRXJyb3IgPyBudWxsIDogKFxuICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD1cIkNhbXBhaWduIFRhcmdldGluZyBMYWJlbCAob3B0aW9uYWwpXCJcbiAgICAgICAgICAgICAgbmFtZT1cImJhY2tmaWxsQ2FtcGFpZ25cIlxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRQcm9ncmFtTGFiZWx9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodmFsKSA9PiBzZXRTZWxlY3RlZFByb2dyYW1MYWJlbCh2YWwpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtbeyBsYWJlbDogJ05vbmUnLCB2YWx1ZTogJycgfSwgLi4uY2FtcGFpZ25zLm1hcChjID0+ICh7IGxhYmVsOiBjLm5hbWUsIHZhbHVlOiBjLnByb2dyYW1MYWJlbCB9KSldfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJ1blNoYXJlTGlua0JhY2tmaWxsfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3NoYXJlTGlua0JhY2tmaWxsUnVubmluZ31cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2hhcmVMaW5rQmFja2ZpbGxSdW5uaW5nID8gJ0dlbmVyYXRpbmcuLi4nIDogJ0dlbmVyYXRlIFNoYXJlIExpbmtzJ31cbiAgICAgICAgICA8L0J1dHRvbj5cblxuICAgICAgICAgIHtzaGFyZUxpbmtCYWNrZmlsbFJ1bm5pbmcgJiYgPExvYWRpbmdTcGlubmVyIGxhYmVsPVwiR2VuZXJhdGluZyBzaGFyZSBsaW5rcy4uLlwiIHNob3dMYWJlbCAvPn1cblxuICAgICAgICAgIHtzaGFyZUxpbmtCYWNrZmlsbFByb2dyZXNzICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgICAgIENyZWF0ZWQ6IHtzaGFyZUxpbmtCYWNrZmlsbFByb2dyZXNzLmNyZWF0ZWR9IHwgQWxyZWFkeSBoYWQgbGluazoge3NoYXJlTGlua0JhY2tmaWxsUHJvZ3Jlc3MuZXhpc3Rpbmd9IHwgU2tpcHBlZDoge3NoYXJlTGlua0JhY2tmaWxsUHJvZ3Jlc3Muc2tpcHBlZH0gfCBFcnJvcnM6IHtzaGFyZUxpbmtCYWNrZmlsbFByb2dyZXNzLmVycm9yc31cbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtzaGFyZUxpbmtCYWNrZmlsbERvbmUgJiYgPFRleHQ+U2hhcmUgbGluayBnZW5lcmF0aW9uIGNvbXBsZXRlLjwvVGV4dD59XG5cbiAgICAgIDwvPil9XG5cbiAgICAgIHsvKiDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcbiAgICAgICAgICBTRUNUSU9OIDUg4oCUIEFDVElWSVRZIExPR1xuICAgICAg4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ2xvZycgJiYgKDw+XG5cbiAgICAgICAgICA8SGVhZGluZz5BY3Rpdml0eSBMb2c8L0hlYWRpbmc+XG4gICAgICAgICAgPFRleHQ+UmVjZW50IGFjdGlvbnMgcGVyZm9ybWVkIGluIHRoaXMgYXBwLCBuZXdlc3QgZmlyc3QuPC9UZXh0PlxuICAgICAgICAgIDxTcGFjZXIgLz5cblxuICAgICAgICAgIHtsb2dMb2FkaW5nID8gKFxuICAgICAgICAgICAgPExvYWRpbmdTcGlubmVyIGxhYmVsPVwiTG9hZGluZy4uLlwiIHNob3dMYWJlbCAvPlxuICAgICAgICAgICkgOiBsb2dFcnJvciA/IChcbiAgICAgICAgICAgIDxTdGF0dXNUYWcgdmFyaWFudD1cImRhbmdlclwiPntsb2dFcnJvcn08L1N0YXR1c1RhZz5cbiAgICAgICAgICApIDogbG9nRW50cmllcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICA8VGV4dD5ObyBhY3Rpdml0eSBsb2dnZWQgeWV0LjwvVGV4dD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFRhYmxlPlxuICAgICAgICAgICAgICAgIDxUYWJsZUhlYWQ+XG4gICAgICAgICAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlcj5XaGVuPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyPkFjdGlvbjwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlcj5Vc2VyPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyPkRldGFpbHM8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXI+U3RhdHVzPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICAgICAgPC9UYWJsZUhlYWQ+XG4gICAgICAgICAgICAgICAgPFRhYmxlQm9keT5cbiAgICAgICAgICAgICAgICAgIHtsb2dFbnRyaWVzLm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17ZW50cnkuaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e2Zvcm1hdERhdGUoZW50cnkudGltZXN0YW1wLCBsb2NhbGUpfTwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e0xPR19BQ1RJT05fTEFCRUxTW2VudHJ5LmFjdGlvbl0gPz8gZW50cnkuYWN0aW9ufTwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e2VudHJ5LmFjdG9yfTwvVGFibGVDZWxsPlxuICAgICAgICAgICAgICAgICAgICAgIDxUYWJsZUNlbGw+e2VudHJ5LmRldGFpbHN9PC9UYWJsZUNlbGw+XG4gICAgICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0dXNUYWcgdmFyaWFudD17ZW50cnkuc3RhdHVzID09PSAnc3VjY2VzcycgPyAnc3VjY2VzcycgOiAnZGFuZ2VyJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtlbnRyeS5zdGF0dXMgPT09ICdzdWNjZXNzJyA/ICdTdWNjZXNzJyA6ICdFcnJvcid9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L1N0YXR1c1RhZz5cbiAgICAgICAgICAgICAgICAgICAgICA8L1RhYmxlQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvVGFibGVCb2R5PlxuICAgICAgICAgICAgICA8L1RhYmxlPlxuICAgICAgICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgICAgICAgIDxGbGV4IGRpcmVjdGlvbj1cInJvd1wiIGdhcD1cInNtYWxsXCI+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlTG9nUHJldlBhZ2V9IGRpc2FibGVkPXtsb2dQYWdlU3RhY2subGVuZ3RoID09PSAwIHx8IGxvZ0xvYWRpbmd9PuKGkCBQcmV2PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17aGFuZGxlTG9nTmV4dFBhZ2V9IGRpc2FibGVkPXshbG9nSGFzTW9yZSB8fCBsb2dMb2FkaW5nfT5OZXh0IOKGkjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIHtjbGVhckxvZ0NvbmZpcm0gPyAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJkZXN0cnVjdGl2ZVwiIG9uQ2xpY2s9e2hhbmRsZUNsZWFyTG9nfSBkaXNhYmxlZD17Y2xlYXJMb2dMb2FkaW5nfT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2xlYXJMb2dMb2FkaW5nID8gJ0NsZWFyaW5nLi4uJyA6ICdDb25maXJtIENsZWFyJ31cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9eygpID0+IHNldENsZWFyTG9nQ29uZmlybShmYWxzZSl9IGRpc2FibGVkPXtjbGVhckxvZ0xvYWRpbmd9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIG9uQ2xpY2s9eygpID0+IHNldENsZWFyTG9nQ29uZmlybSh0cnVlKX0+Q2xlYXIgTG9nPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cblxuICAgICAgPC8+KX1cbiAgICA8L0Zvcm0+XG4gICk7XG59XG5cbi8vIOKUgOKUgOKUgCBFdmVudCBGb3JtIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBFdmVudEZvcm0oe1xuICBmb3JtLFxuICBvbkNoYW5nZSxcbiAgb25TdWJtaXQsXG4gIG9uQ2FuY2VsLFxuICBjcmVhdGluZyxcbiAgY3JlYXRlUmVzdWx0LFxuICBpc0VkaXRpbmcsXG4gIG9uVmFsaWRhdGVQcm9wZXJ0eSxcbiAgb25Mb2FkT2JqZWN0VHlwZXMsXG4gIG9uTG9hZE9iamVjdFByb3BlcnRpZXMsXG59OiB7XG4gIGZvcm06IEV2ZW50Rm9ybVN0YXRlO1xuICBvbkNoYW5nZTogKGY6IEV2ZW50Rm9ybVN0YXRlKSA9PiB2b2lkO1xuICBvblN1Ym1pdDogKGVuYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xuICBjcmVhdGluZzogYm9vbGVhbjtcbiAgY3JlYXRlUmVzdWx0OiBzdHJpbmc7XG4gIGlzRWRpdGluZz86IGJvb2xlYW47XG4gIG9uVmFsaWRhdGVQcm9wZXJ0eT86IChvYmplY3RUeXBlOiBzdHJpbmcsIHByb3BlcnR5TmFtZTogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBvbkxvYWRPYmplY3RUeXBlcz86ICgpID0+IFByb21pc2U8T2JqZWN0VHlwZU9wdGlvbltdPjtcbiAgb25Mb2FkT2JqZWN0UHJvcGVydGllcz86IChvYmplY3RUeXBlOiBzdHJpbmcpID0+IFByb21pc2U8eyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyBmaWVsZFR5cGU/OiBzdHJpbmc7IG9wdGlvbnM/OiB7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdIH1bXT47XG59KSB7XG4gIGNvbnN0IFtwcm9wRXJyb3JzLCBzZXRQcm9wRXJyb3JzXSA9IHVzZVN0YXRlPFJlY29yZDxudW1iZXIsIGJvb2xlYW4+Pih7fSk7XG4gIGNvbnN0IFt0cmlnZ2VyRmllbGRFcnJvciwgc2V0VHJpZ2dlckZpZWxkRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb2JqZWN0VHlwZXMsIHNldE9iamVjdFR5cGVzXSA9IHVzZVN0YXRlPE9iamVjdFR5cGVPcHRpb25bXT4oW1xuICAgIHsgdmFsdWU6ICdjb250YWN0JywgbGFiZWw6ICdDb250YWN0Jywgb2JqZWN0VHlwZUlkOiAnMC0xJyB9LFxuICAgIHsgdmFsdWU6ICdkZWFsJywgICAgbGFiZWw6ICdEZWFsJywgICAgb2JqZWN0VHlwZUlkOiAnMC0zJyB9LFxuICBdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAob25Mb2FkT2JqZWN0VHlwZXMpIHtcbiAgICAgIG9uTG9hZE9iamVjdFR5cGVzKCkudGhlbih0eXBlcyA9PiB7IGlmICh0eXBlcy5sZW5ndGgpIHNldE9iamVjdFR5cGVzKHR5cGVzKTsgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IFtvYmplY3RQcm9wZXJ0aWVzLCBzZXRPYmplY3RQcm9wZXJ0aWVzXSA9IHVzZVN0YXRlPHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgZmllbGRUeXBlPzogc3RyaW5nOyBvcHRpb25zPzogeyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1bXSB9W10+KFtdKTtcbiAgY29uc3QgW3Byb3BlcnRpZXNMb2FkaW5nLCBzZXRQcm9wZXJ0aWVzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcm9wZXJ0aWVzRXJyb3IsIHNldFByb3BlcnRpZXNFcnJvcl0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBuZWVkc1Byb3BlcnR5ID0gZm9ybS50cmlnZ2VyVHlwZSA9PT0gJ0ZJRUxEX0NIQU5HRUQnIHx8IGZvcm0udHJpZ2dlclR5cGUgPT09ICdGSUVMRF9WQUxVRSc7XG4gICAgaWYgKCFuZWVkc1Byb3BlcnR5IHx8ICFvbkxvYWRPYmplY3RQcm9wZXJ0aWVzIHx8ICFmb3JtLnRyaWdnZXJPYmplY3QpIHJldHVybjtcbiAgICBzZXRQcm9wZXJ0aWVzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRQcm9wZXJ0aWVzRXJyb3IoJycpO1xuICAgIG9uTG9hZE9iamVjdFByb3BlcnRpZXMoZm9ybS50cmlnZ2VyT2JqZWN0KVxuICAgICAgLnRoZW4ocHJvcHMgPT4gc2V0T2JqZWN0UHJvcGVydGllcyhwcm9wcykpXG4gICAgICAuY2F0Y2goKGUpID0+IHsgc2V0T2JqZWN0UHJvcGVydGllcyhbXSk7IHNldFByb3BlcnRpZXNFcnJvcihTdHJpbmcoZSkpOyB9KVxuICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0UHJvcGVydGllc0xvYWRpbmcoZmFsc2UpKTtcbiAgfSwgW2Zvcm0udHJpZ2dlck9iamVjdCwgZm9ybS50cmlnZ2VyVHlwZV0pO1xuXG4gIGZ1bmN0aW9uIHNldFRyaWdnZXJPYmplY3Qodjogc3RyaW5nKSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSBERUZBVUxUX01BUFBJTkdTW3ZdID8gWy4uLkRFRkFVTFRfTUFQUElOR1Nbdl1dIDogW107XG4gICAgb25DaGFuZ2UoeyAuLi5mb3JtLCB0cmlnZ2VyT2JqZWN0OiB2LCB0cmlnZ2VyUHJvcGVydHk6ICcnLCBmaWVsZE1hcHBpbmdzOiBkZWZhdWx0cyB9KTtcbiAgICBzZXRQcm9wRXJyb3JzKHt9KTtcbiAgICBzZXRUcmlnZ2VyRmllbGRFcnJvcihmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRUcmlnZ2VyVHlwZSh2OiBzdHJpbmcpIHtcbiAgICBvbkNoYW5nZSh7IC4uLmZvcm0sIHRyaWdnZXJUeXBlOiB2LCB0cmlnZ2VyUHJvcGVydHk6ICcnLCB0cmlnZ2VyVG9WYWx1ZTogJycgfSk7XG4gICAgc2V0VHJpZ2dlckZpZWxkRXJyb3IoZmFsc2UpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVUcmlnZ2VyRmllbGQocHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIW9uVmFsaWRhdGVQcm9wZXJ0eSB8fCAhcHJvcGVydHlOYW1lLnRyaW0oKSkgcmV0dXJuO1xuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgb25WYWxpZGF0ZVByb3BlcnR5KGZvcm0udHJpZ2dlck9iamVjdCwgcHJvcGVydHlOYW1lLnRyaW0oKSk7XG4gICAgc2V0VHJpZ2dlckZpZWxkRXJyb3IoIXZhbGlkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZU1hcHBpbmcoaW5kZXg6IG51bWJlciwgZmllbGQ6IGtleW9mIEZpZWxkTWFwcGluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGNvbnN0IHVwZGF0ZWQgPSBmb3JtLmZpZWxkTWFwcGluZ3MubWFwKChtLCBpKSA9PiBpID09PSBpbmRleCA/IHsgLi4ubSwgW2ZpZWxkXTogdmFsdWUgfSA6IG0pO1xuICAgIG9uQ2hhbmdlKHsgLi4uZm9ybSwgZmllbGRNYXBwaW5nczogdXBkYXRlZCB9KTtcbiAgICBpZiAoZmllbGQgPT09ICdzb3VyY2UnIHx8IChmaWVsZCA9PT0gJ3ZhbHVlJyAmJiAhdmFsdWUpKSB7XG4gICAgICBzZXRQcm9wRXJyb3JzKHByZXYgPT4geyBjb25zdCBuID0geyAuLi5wcmV2IH07IGRlbGV0ZSBuW2luZGV4XTsgcmV0dXJuIG47IH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE1hcHBpbmcoKSB7XG4gICAgb25DaGFuZ2UoeyAuLi5mb3JtLCBmaWVsZE1hcHBpbmdzOiBbLi4uZm9ybS5maWVsZE1hcHBpbmdzLCB7IGV4dG9sZUtleTogJycsIHNvdXJjZTogJ3Byb3BlcnR5JywgdmFsdWU6ICcnIH1dIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTWFwcGluZyhpbmRleDogbnVtYmVyKSB7XG4gICAgb25DaGFuZ2UoeyAuLi5mb3JtLCBmaWVsZE1hcHBpbmdzOiBmb3JtLmZpZWxkTWFwcGluZ3MuZmlsdGVyKChfLCBpKSA9PiBpICE9PSBpbmRleCkgfSk7XG4gICAgc2V0UHJvcEVycm9ycyhwcmV2ID0+IHtcbiAgICAgIGNvbnN0IG46IFJlY29yZDxudW1iZXIsIGJvb2xlYW4+ID0ge307XG4gICAgICBPYmplY3QuZW50cmllcyhwcmV2KS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgICAgY29uc3Qga2kgPSBOdW1iZXIoayk7XG4gICAgICAgIGlmIChraSA8IGluZGV4KSBuW2tpXSA9IHY7XG4gICAgICAgIGVsc2UgaWYgKGtpID4gaW5kZXgpIG5ba2kgLSAxXSA9IHY7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0eUF0KGluZGV4OiBudW1iZXIsIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCFvblZhbGlkYXRlUHJvcGVydHkgfHwgIXByb3BlcnR5TmFtZS50cmltKCkpIHJldHVybjtcbiAgICBjb25zdCB2YWxpZCA9IGF3YWl0IG9uVmFsaWRhdGVQcm9wZXJ0eShmb3JtLnRyaWdnZXJPYmplY3QsIHByb3BlcnR5TmFtZS50cmltKCkpO1xuICAgIHNldFByb3BFcnJvcnMocHJldiA9PiAoeyAuLi5wcmV2LCBbaW5kZXhdOiAhdmFsaWQgfSkpO1xuICB9XG5cbiAgY29uc3QgY2FuU3VibWl0ID0gISFmb3JtLmV2ZW50TmFtZS50cmltKCkgJiYgIWNyZWF0aW5nO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxJbnB1dFxuICAgICAgICBsYWJlbD1cIkV2ZW50IG5hbWVcIlxuICAgICAgICBuYW1lPVwiZXZlbnROYW1lXCJcbiAgICAgICAgdmFsdWU9e2Zvcm0uZXZlbnROYW1lfVxuICAgICAgICBvbkNoYW5nZT17KHYpID0+IG9uQ2hhbmdlKHsgLi4uZm9ybSwgZXZlbnROYW1lOiB2IH0pfVxuICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gcHVyY2hhc2UsIHJlZmVycmFsX3NlbnQsIGFjY291bnRfdXBncmFkZVwiXG4gICAgICAgIGRlc2NyaXB0aW9uPVwiVGhlIGV4YWN0IEV4dG9sZSBldmVudCBuYW1lIHlvdXIgcHJvZ3JhbSBleHBlY3RzLlwiXG4gICAgICAvPlxuXG4gICAgICA8U2VsZWN0XG4gICAgICAgIGxhYmVsPVwiVHJpZ2dlciBvYmplY3RcIlxuICAgICAgICBuYW1lPVwidHJpZ2dlck9iamVjdFwiXG4gICAgICAgIHZhbHVlPXtmb3JtLnRyaWdnZXJPYmplY3R9XG4gICAgICAgIG9uQ2hhbmdlPXtzZXRUcmlnZ2VyT2JqZWN0fVxuICAgICAgICBvcHRpb25zPXtvYmplY3RUeXBlcy5tYXAobyA9PiAoeyBsYWJlbDogby5sYWJlbCwgdmFsdWU6IG8udmFsdWUgfSkpfVxuICAgICAgLz5cblxuICAgICAgPFNlbGVjdFxuICAgICAgICBsYWJlbD1cIlRyaWdnZXJcIlxuICAgICAgICBuYW1lPVwidHJpZ2dlclR5cGVcIlxuICAgICAgICB2YWx1ZT17Zm9ybS50cmlnZ2VyVHlwZX1cbiAgICAgICAgb25DaGFuZ2U9e3NldFRyaWdnZXJUeXBlfVxuICAgICAgICBvcHRpb25zPXtbXG4gICAgICAgICAgeyBsYWJlbDogJ1JlY29yZCBjcmVhdGVkJywgdmFsdWU6ICdSRUNPUkRfQ1JFQVRFRCcgfSxcbiAgICAgICAgICB7IGxhYmVsOiAnRmllbGQgY2hhbmdlZCcsIHZhbHVlOiAnRklFTERfQ0hBTkdFRCcgfSxcbiAgICAgICAgICB7IGxhYmVsOiAnRmllbGQgY2hhbmdlZCB0byB2YWx1ZScsIHZhbHVlOiAnRklFTERfVkFMVUUnIH0sXG4gICAgICAgIF19XG4gICAgICAgIGRlc2NyaXB0aW9uPXtcbiAgICAgICAgICBmb3JtLnRyaWdnZXJUeXBlID09PSAnUkVDT1JEX0NSRUFURUQnID8gJ0ZpcmVzIG9uY2Ugd2hlbiBhIG5ldyByZWNvcmQgaXMgY3JlYXRlZC4nIDpcbiAgICAgICAgICBmb3JtLnRyaWdnZXJUeXBlID09PSAnRklFTERfQ0hBTkdFRCcgID8gJ0ZpcmVzIGVhY2ggdGltZSB0aGUgc2VsZWN0ZWQgcHJvcGVydHkgY2hhbmdlcyB0byBhbnkgdmFsdWUuJyA6XG4gICAgICAgICAgJ0ZpcmVzIHdoZW4gdGhlIHNlbGVjdGVkIHByb3BlcnR5IGNoYW5nZXMgdG8gYSBzcGVjaWZpYyB2YWx1ZSAoZS5nLiBkZWFsc3RhZ2Ug4oaSIGNsb3NlZHdvbikuJ1xuICAgICAgICB9XG4gICAgICAvPlxuXG4gICAgICB7KGZvcm0udHJpZ2dlclR5cGUgPT09ICdGSUVMRF9DSEFOR0VEJyB8fCBmb3JtLnRyaWdnZXJUeXBlID09PSAnRklFTERfVkFMVUUnKSAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgIHtwcm9wZXJ0aWVzTG9hZGluZyA/IChcbiAgICAgICAgICAgIDxMb2FkaW5nU3Bpbm5lciBsYWJlbD1cIkxvYWRpbmcgZmllbGRzLi4uXCIgLz5cbiAgICAgICAgICApIDogcHJvcGVydGllc0Vycm9yID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgbGFiZWw9XCJGaWVsZFwiXG4gICAgICAgICAgICAgICAgbmFtZT1cInRyaWdnZXJQcm9wZXJ0eVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0udHJpZ2dlclByb3BlcnR5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4geyBvbkNoYW5nZSh7IC4uLmZvcm0sIHRyaWdnZXJQcm9wZXJ0eTogdiB9KTsgc2V0VHJpZ2dlckZpZWxkRXJyb3IoZmFsc2UpOyB9fVxuICAgICAgICAgICAgICAgIG9uQmx1cj17KHYpID0+IHZhbGlkYXRlVHJpZ2dlckZpZWxkKHYpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtmb3JtLnRyaWdnZXJPYmplY3QgPT09ICdkZWFsJyA/ICdlLmcuIGRlYWxzdGFnZScgOiBmb3JtLnRyaWdnZXJPYmplY3QgPT09ICdjb250YWN0JyA/ICdlLmcuIGxpZmVjeWNsZXN0YWdlJyA6ICdlLmcuIGhzX3BpcGVsaW5lX3N0YWdlJ31cbiAgICAgICAgICAgICAgICBlcnJvcj17dHJpZ2dlckZpZWxkRXJyb3J9XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1lc3NhZ2U9e3RyaWdnZXJGaWVsZEVycm9yID8gJ0ZpZWxkIG5vdCBmb3VuZCBpbiBIdWJTcG90JyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiBvYmplY3RQcm9wZXJ0aWVzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPVwiRmllbGRcIlxuICAgICAgICAgICAgICBuYW1lPVwidHJpZ2dlclByb3BlcnR5XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0udHJpZ2dlclByb3BlcnR5fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHsgb25DaGFuZ2UoeyAuLi5mb3JtLCB0cmlnZ2VyUHJvcGVydHk6IHYgfSk7IHNldFRyaWdnZXJGaWVsZEVycm9yKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17b2JqZWN0UHJvcGVydGllcy5tYXAocCA9PiAoeyBsYWJlbDogYCR7cC5sYWJlbH0gKCR7cC52YWx1ZX0pYCwgdmFsdWU6IHAudmFsdWUgfSkpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIGxhYmVsPVwiRmllbGRcIlxuICAgICAgICAgICAgICBuYW1lPVwidHJpZ2dlclByb3BlcnR5XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0udHJpZ2dlclByb3BlcnR5fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHsgb25DaGFuZ2UoeyAuLi5mb3JtLCB0cmlnZ2VyUHJvcGVydHk6IHYgfSk7IHNldFRyaWdnZXJGaWVsZEVycm9yKGZhbHNlKTsgfX1cbiAgICAgICAgICAgICAgb25CbHVyPXsodikgPT4gdmFsaWRhdGVUcmlnZ2VyRmllbGQodil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtmb3JtLnRyaWdnZXJPYmplY3QgPT09ICdkZWFsJyA/ICdlLmcuIGRlYWxzdGFnZScgOiBmb3JtLnRyaWdnZXJPYmplY3QgPT09ICdjb250YWN0JyA/ICdlLmcuIGxpZmVjeWNsZXN0YWdlJyA6ICdlLmcuIGhzX3BpcGVsaW5lX3N0YWdlJ31cbiAgICAgICAgICAgICAgZXJyb3I9e3RyaWdnZXJGaWVsZEVycm9yfVxuICAgICAgICAgICAgICB2YWxpZGF0aW9uTWVzc2FnZT17dHJpZ2dlckZpZWxkRXJyb3IgPyAnRmllbGQgbm90IGZvdW5kIGluIEh1YlNwb3QnIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG5cbiAgICAgIHtmb3JtLnRyaWdnZXJUeXBlID09PSAnRklFTERfVkFMVUUnICYmICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvcCA9IG9iamVjdFByb3BlcnRpZXMuZmluZChwID0+IHAudmFsdWUgPT09IGZvcm0udHJpZ2dlclByb3BlcnR5KTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHNlbGVjdGVkUHJvcD8ub3B0aW9ucyA/PyBbXTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPFNwYWNlciAvPlxuICAgICAgICAgICAge29wdHMubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgIGxhYmVsPVwiVmFsdWVcIlxuICAgICAgICAgICAgICAgIG5hbWU9XCJ0cmlnZ2VyVG9WYWx1ZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm0udHJpZ2dlclRvVmFsdWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiBvbkNoYW5nZSh7IC4uLmZvcm0sIHRyaWdnZXJUb1ZhbHVlOiB2IH0pfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e29wdHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICBsYWJlbD1cIlZhbHVlXCJcbiAgICAgICAgICAgICAgICBuYW1lPVwidHJpZ2dlclRvVmFsdWVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtLnRyaWdnZXJUb1ZhbHVlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gb25DaGFuZ2UoeyAuLi5mb3JtLCB0cmlnZ2VyVG9WYWx1ZTogdiB9KX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gY2xvc2Vkd29uXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC8+XG4gICAgICAgICk7XG4gICAgICB9KSgpfVxuXG4gICAgICA8RGl2aWRlciAvPlxuICAgICAgPFRleHQgZm9ybWF0PXt7IGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5GaWVsZCBNYXBwaW5nczwvVGV4dD5cbiAgICAgIDxUZXh0PlxuICAgICAgICBNYXAgRXh0b2xlIHBhcmFtZXRlciBuYW1lcyB0byBIdWJTcG90IHByb3BlcnR5IGludGVybmFsIG5hbWVzLlxuICAgICAgICBVc2UgdGhlIGludGVybmFsIG5hbWUgZXhhY3RseSBhcyBpdCBhcHBlYXJzIGluIEh1YlNwb3QgKGUuZy4gZW1haWwsIGZpcnN0bmFtZSwgaHNfb2JqZWN0X2lkKS5cbiAgICAgICAgU3RhdGljIHZhbHVlcyBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbGl0ZXJhbHMuXG4gICAgICA8L1RleHQ+XG5cbiAgICAgIHtmb3JtLmZpZWxkTWFwcGluZ3MubWFwKChtYXBwaW5nLCBpKSA9PiAoXG4gICAgICAgIDxGbGV4IGRpcmVjdGlvbj1cInJvd1wiIGdhcD1cInNtYWxsXCIgYWxpZ249XCJlbmRcIiBrZXk9e2l9PlxuICAgICAgICAgIDxCb3ggZmxleD17Mn0+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgbGFiZWw9XCJFeHRvbGUgcGFyYW1ldGVyXCJcbiAgICAgICAgICAgICAgbmFtZT17YGVrXyR7aX1gfVxuICAgICAgICAgICAgICB2YWx1ZT17bWFwcGluZy5leHRvbGVLZXl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gdXBkYXRlTWFwcGluZyhpLCAnZXh0b2xlS2V5Jywgdil9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiBlbWFpbFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDxCb3ggZmxleD17MX0+XG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgIGxhYmVsPVwiU291cmNlXCJcbiAgICAgICAgICAgICAgbmFtZT17YHNyY18ke2l9YH1cbiAgICAgICAgICAgICAgdmFsdWU9e21hcHBpbmcuc291cmNlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KHYpID0+IHVwZGF0ZU1hcHBpbmcoaSwgJ3NvdXJjZScsIHYgYXMgJ3Byb3BlcnR5JyB8ICdzdGF0aWMnKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdQcm9wZXJ0eScsIHZhbHVlOiAncHJvcGVydHknIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ1N0YXRpYycsIHZhbHVlOiAnc3RhdGljJyB9LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8Qm94IGZsZXg9ezJ9PlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIGxhYmVsPXttYXBwaW5nLnNvdXJjZSA9PT0gJ3Byb3BlcnR5JyA/ICdIdWJTcG90IHByb3BlcnR5JyA6ICdTdGF0aWMgdmFsdWUnfVxuICAgICAgICAgICAgICBuYW1lPXtgdmFsXyR7aX1gfVxuICAgICAgICAgICAgICB2YWx1ZT17bWFwcGluZy52YWx1ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyh2KSA9PiB1cGRhdGVNYXBwaW5nKGksICd2YWx1ZScsIHYpfVxuICAgICAgICAgICAgICBvbkJsdXI9eyh2KSA9PiB7IGlmIChtYXBwaW5nLnNvdXJjZSA9PT0gJ3Byb3BlcnR5JykgdmFsaWRhdGVQcm9wZXJ0eUF0KGksIHYpOyB9fVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17bWFwcGluZy5zb3VyY2UgPT09ICdwcm9wZXJ0eScgPyAnZS5nLiBlbWFpbCcgOiAnZS5nLiBodWJzcG90X2NybSd9XG4gICAgICAgICAgICAgIGVycm9yPXttYXBwaW5nLnNvdXJjZSA9PT0gJ3Byb3BlcnR5JyAmJiAhIXByb3BFcnJvcnNbaV19XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25NZXNzYWdlPXttYXBwaW5nLnNvdXJjZSA9PT0gJ3Byb3BlcnR5JyAmJiBwcm9wRXJyb3JzW2ldID8gJ1Byb3BlcnR5IG5vdCBmb3VuZCBpbiBIdWJTcG90JyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiByZW1vdmVNYXBwaW5nKGkpfT5EZWxldGU8L0J1dHRvbj5cbiAgICAgICAgPC9GbGV4PlxuICAgICAgKSl9XG5cbiAgICAgIDxEaXZpZGVyIC8+XG5cbiAgICAgIHtjcmVhdGVSZXN1bHQgJiYgPFRleHQ+e2NyZWF0ZVJlc3VsdH08L1RleHQ+fVxuXG4gICAgICA8U3BhY2VyIC8+XG4gICAgICA8RmxleCBkaXJlY3Rpb249XCJyb3dcIiBnYXA9XCJzbWFsbFwiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17YWRkTWFwcGluZ30+KyBBZGQgZmllbGQ8L0J1dHRvbj5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uU3VibWl0KHRydWUpfSBkaXNhYmxlZD17IWNhblN1Ym1pdH0gdmFyaWFudD1cInByaW1hcnlcIj5cbiAgICAgICAgICAgIHtjcmVhdGluZyA/ICdTYXZpbmcuLi4nIDogJ1NhdmUgQ2hhbmdlcyd9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gb25TdWJtaXQodHJ1ZSl9IGRpc2FibGVkPXshY2FuU3VibWl0fSB2YXJpYW50PVwicHJpbWFyeVwiPlxuICAgICAgICAgICAgICB7Y3JlYXRpbmcgPyAnQ3JlYXRpbmcuLi4nIDogJ0NyZWF0ZSBXb3JrZmxvdyd9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gb25TdWJtaXQoZmFsc2UpfSBkaXNhYmxlZD17IWNhblN1Ym1pdH0+XG4gICAgICAgICAgICAgIHtjcmVhdGluZyA/ICdDcmVhdGluZy4uLicgOiAnU2F2ZSBhcyBEcmFmdCd9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKX1cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNhbmNlbH0gZGlzYWJsZWQ9e2NyZWF0aW5nfT5DYW5jZWw8L0J1dHRvbj5cbiAgICAgIDwvRmxleD5cbiAgICA8Lz5cbiAgKTtcbn1cblxuLy8g4pSA4pSA4pSAIFNuaXBwZXQgR2VuZXJhdG9yIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNuaXBwZXQoeyBhZHZvY2F0ZUNvZGVQcm9wZXJ0eSwgcmVmZXJyYWxVcmxQYXJhbXMsIGZvcm1JZHMgfToge1xuICBhZHZvY2F0ZUNvZGVQcm9wZXJ0eTogc3RyaW5nO1xuICByZWZlcnJhbFVybFBhcmFtczogc3RyaW5nW107XG4gIGZvcm1JZHM6IHN0cmluZ1tdO1xufSk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcmFtc0pzb24gPSByZWZlcnJhbFVybFBhcmFtcy5sZW5ndGggPiAwID8gSlNPTi5zdHJpbmdpZnkocmVmZXJyYWxVcmxQYXJhbXMpIDogSlNPTi5zdHJpbmdpZnkoWydleHRvbGVfc2hhcmVhYmxlX2NvZGUnXSk7XG4gIGNvbnN0IGZvcm1JZHNKc29uID0gSlNPTi5zdHJpbmdpZnkoZm9ybUlkcyk7XG4gIHJldHVybiBgPCEtLSBFeHRvbGUgRm9ybSBDb25maWd1cmF0b3Ig4oCUIHBsYWNlIGFueXdoZXJlIG9uIHRoZSBwYWdlLCBiZWZvcmUgZm9ybXMgbG9hZCAtLT5cbjxzY3JpcHQ+XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBBRFZPQ0FURV9DT0RFX1BST1BFUlRZID0gJyR7YWR2b2NhdGVDb2RlUHJvcGVydHl9JztcbiAgdmFyIFJFRkVSUkFMX1VSTF9QQVJBTVMgPSAke3BhcmFtc0pzb259OyAvLyBmaXJzdCBtYXRjaCB3aW5zXG4gIHZhciBGT1JNX0lEUyA9ICR7Zm9ybUlkc0pzb259OyAvLyBlbXB0eSA9IGFsbCBmb3Jtc1xuICB2YXIgU1RPUkFHRV9LRVkgPSAnZXh0b2xlX2Fkdm9jYXRlX2NvZGUnO1xuICB2YXIgQ09PS0lFX01BWF9BR0UgPSAzMCAqIDI0ICogNjAgKiA2MDsgLy8gMzAgZGF5cyBpbiBzZWNvbmRzXG5cbiAgZnVuY3Rpb24gZ2V0Rmlyc3RVcmxQYXJhbShuYW1lcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2gobmV3IFJlZ0V4cCgnWz8mXScgKyBuYW1lc1tpXSArICc9KFteJl0rKScpKTtcbiAgICAgIGlmIChtYXRjaCkgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFsxXSk7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmFsaWRDb2RlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubGVuZ3RoID4gMCAmJiB2YWx1ZS5sZW5ndGggPD0gMTI4ICYmXG4gICAgICAvXltBLVphLXowLTkuXy1dKyQvLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q29va2llKHZhbHVlKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gU1RPUkFHRV9LRVkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpICtcbiAgICAgICc7IHBhdGg9LzsgbWF4LWFnZT0nICsgQ09PS0lFX01BWF9BR0UgKyAnOyBTYW1lU2l0ZT1MYXgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29va2llKCkge1xuICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKScgKyBTVE9SQUdFX0tFWSArICc9KFteO10qKScpKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbMl0pIDogJyc7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMb2NhbFN0b3JhZ2UodmFsdWUpIHtcbiAgICB0cnkgeyB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVksIHZhbHVlKTsgfSBjYXRjaChlKSB7fVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKCkge1xuICAgIHRyeSB7IHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RPUkFHRV9LRVkpIHx8ICcnOyB9IGNhdGNoKGUpIHsgcmV0dXJuICcnOyB9XG4gIH1cblxuICAvLyBPbiBsYW5kaW5nOiBwZXJzaXN0IGFkdm9jYXRlIGNvZGUgdG8gY29va2llICsgbG9jYWxTdG9yYWdlIHNvIGl0IHN1cnZpdmVzIG5hdmlnYXRpb24gYW5kIHRhYiBjaGFuZ2VzXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgY29kZSA9IGdldEZpcnN0VXJsUGFyYW0oUkVGRVJSQUxfVVJMX1BBUkFNUyk7XG4gICAgaWYgKGlzVmFsaWRDb2RlKGNvZGUpKSB7XG4gICAgICBzZXRDb29raWUoY29kZSk7XG4gICAgICBzZXRMb2NhbFN0b3JhZ2UoY29kZSk7XG4gICAgfVxuICB9KSgpO1xuXG4gIGZ1bmN0aW9uIGdldEFkdm9jYXRlQ29kZSgpIHtcbiAgICB2YXIgZnJvbVVybCA9IGdldEZpcnN0VXJsUGFyYW0oUkVGRVJSQUxfVVJMX1BBUkFNUyk7XG4gICAgaWYgKGlzVmFsaWRDb2RlKGZyb21VcmwpKSByZXR1cm4gZnJvbVVybDtcbiAgICB2YXIgZnJvbUNvb2tpZSA9IGdldENvb2tpZSgpO1xuICAgIGlmIChpc1ZhbGlkQ29kZShmcm9tQ29va2llKSkgcmV0dXJuIGZyb21Db29raWU7XG4gICAgdmFyIGZyb21TdG9yYWdlID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgaWYgKGlzVmFsaWRDb2RlKGZyb21TdG9yYWdlKSkgcmV0dXJuIGZyb21TdG9yYWdlO1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEluc3RydW1lbnQoZm9ybUlkKSB7XG4gICAgcmV0dXJuICFGT1JNX0lEUy5sZW5ndGggfHwgRk9STV9JRFMuaW5kZXhPZihmb3JtSWQpICE9PSAtMTtcbiAgfVxuXG4gIC8vIOKUgOKUgCB2MiBjbGFzc2ljIGZvcm1zIChoYnNwdC5mb3Jtcy5jcmVhdGUpIOKUgOKUgFxuICAvLyBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBleGlzdGluZyBoaWRkZW4gZmllbGQg4oCUIGRvZXMgbm90IGluamVjdCBuZXcgZmllbGRzLlxuICAvLyBBZGQgQURWT0NBVEVfQ09ERV9QUk9QRVJUWSBhcyBhIGhpZGRlbiBmaWVsZCBpbiBIdWJTcG90J3MgZm9ybSBidWlsZGVyIGZvciBlYWNoIGZvcm0uXG4gIGZ1bmN0aW9uIHNldEhpZGRlbkZpZWxkKGZvcm0sIG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKCFuYW1lIHx8ICF2YWx1ZSkgcmV0dXJuO1xuICAgIHZhciBlbCA9IGZvcm0ucXVlcnlTZWxlY3RvcignW25hbWU9XCInICsgbmFtZSArICdcIl0nKTtcbiAgICBpZiAoZWwpIGVsLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVEYXRhRmllbGQoZGF0YSwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIW5hbWUgfHwgIXZhbHVlKSByZXR1cm47XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGF0YVtpXS5uYW1lID09PSBuYW1lKSB7IGRhdGFbaV0udmFsdWUgPSB2YWx1ZTsgcmV0dXJuOyB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVdyYXBwZWRDcmVhdGUob3JpZykge1xuICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBpZiAoIXNob3VsZEluc3RydW1lbnQob3B0aW9ucyAmJiBvcHRpb25zLmZvcm1JZCkpIHJldHVybiBvcmlnLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgICB2YXIgb3B0cyA9IHt9O1xuICAgICAgZm9yICh2YXIgayBpbiBvcHRpb25zKSB7IGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGspKSBvcHRzW2tdID0gb3B0aW9uc1trXTsgfVxuICAgICAgdmFyIG9yaWdPblJlYWR5ID0gb3B0cy5vbkZvcm1SZWFkeTtcbiAgICAgIHZhciBvcmlnT25CZWZvcmVTdWJtaXQgPSBvcHRzLm9uQmVmb3JlRm9ybVN1Ym1pdDtcbiAgICAgIG9wdHMub25Gb3JtUmVhZHkgPSBmdW5jdGlvbigkZm9ybSkge1xuICAgICAgICB2YXIgY29kZSA9IGdldEFkdm9jYXRlQ29kZSgpO1xuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIHZhciBmb3JtID0gKCRmb3JtICYmICRmb3JtWzBdKSA/ICRmb3JtWzBdIDogJGZvcm07XG4gICAgICAgICAgaWYgKGZvcm0pIHNldEhpZGRlbkZpZWxkKGZvcm0sIEFEVk9DQVRFX0NPREVfUFJPUEVSVFksIGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmlnT25SZWFkeSkgb3JpZ09uUmVhZHkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBvcHRzLm9uQmVmb3JlRm9ybVN1Ym1pdCA9IGZ1bmN0aW9uKCRmb3JtLCBkYXRhKSB7XG4gICAgICAgIHZhciBjb2RlID0gZ2V0QWR2b2NhdGVDb2RlKCk7XG4gICAgICAgIGlmIChjb2RlKSB1cGRhdGVEYXRhRmllbGQoZGF0YSwgQURWT0NBVEVfQ09ERV9QUk9QRVJUWSwgY29kZSk7XG4gICAgICAgIGlmIChvcmlnT25CZWZvcmVTdWJtaXQpIG9yaWdPbkJlZm9yZVN1Ym1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBvcmlnLmNhbGwodGhpcywgb3B0cyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXBGb3Jtcyhmb3Jtcykge1xuICAgIGlmIChmb3Jtcy5fZXh0b2xlV3JhcHBlZCkgcmV0dXJuO1xuICAgIGZvcm1zLl9leHRvbGVXcmFwcGVkID0gdHJ1ZTtcbiAgICBpZiAoZm9ybXMuY3JlYXRlKSB7XG4gICAgICBmb3Jtcy5jcmVhdGUgPSBtYWtlV3JhcHBlZENyZWF0ZShmb3Jtcy5jcmVhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2NyZWF0ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmb3JtcywgJ2NyZWF0ZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gX2NyZWF0ZTsgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmbikgeyBfY3JlYXRlID0gZm4gPyBtYWtlV3JhcHBlZENyZWF0ZShmbikgOiBmbjsgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd2F0Y2hIYnNwdChoYnNwdCkge1xuICAgIGlmIChoYnNwdC5mb3JtcykgeyB3cmFwRm9ybXMoaGJzcHQuZm9ybXMpOyByZXR1cm47IH1cbiAgICB2YXIgX2Zvcm1zO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShoYnNwdCwgJ2Zvcm1zJywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIF9mb3JtczsgfSxcbiAgICAgIHNldDogZnVuY3Rpb24oZikgeyBfZm9ybXMgPSBmOyBpZiAoZikgd3JhcEZvcm1zKGYpOyB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAod2luZG93Lmhic3B0KSB7IHdhdGNoSGJzcHQod2luZG93Lmhic3B0KTsgfVxuICBlbHNlIHtcbiAgICB2YXIgX2hic3B0O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csICdoYnNwdCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBfaGJzcHQ7IH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkgeyBfaGJzcHQgPSB2YWw7IGlmICh2YWwpIHdhdGNoSGJzcHQodmFsKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8g4pSA4pSAIHYzIG5ldyBmb3JtIGJ1aWxkZXIgKEh1YlNwb3RGb3Jtc1Y0IEFQSSkg4pSA4pSAXG4gIC8vIEFkZCBBRFZPQ0FURV9DT0RFX1BST1BFUlRZIGFzIGEgaGlkZGVuIGZpZWxkIGluIEh1YlNwb3QncyBmb3JtIGJ1aWxkZXIgZm9yIGVhY2ggZm9ybS5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hzLWZvcm0tZXZlbnQ6b24tcmVhZHknLCBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBjb2RlID0gZ2V0QWR2b2NhdGVDb2RlKCk7XG4gICAgaWYgKCFjb2RlIHx8ICFBRFZPQ0FURV9DT0RFX1BST1BFUlRZKSByZXR1cm47XG4gICAgdmFyIGRldGFpbCA9IGV2ZW50LmRldGFpbCB8fCB7fTtcbiAgICBpZiAoIXNob3VsZEluc3RydW1lbnQoZGV0YWlsLmZvcm1JZCkpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgdmFyIGhzRm9ybSA9IHdpbmRvdy5IdWJTcG90Rm9ybXNWNCAmJiB3aW5kb3cuSHViU3BvdEZvcm1zVjQuZ2V0Rm9ybUZyb21FdmVudChldmVudCk7XG4gICAgICBpZiAoaHNGb3JtKSBoc0Zvcm0uc2V0RmllbGRWYWx1ZSgnMC0xLycgKyBBRFZPQ0FURV9DT0RFX1BST1BFUlRZLCBjb2RlKTtcbiAgICB9IGNhdGNoKGUpIHt9XG4gIH0pO1xufSkoKTtcbjwvc2NyaXB0PmA7XG59XG4iXSwibmFtZXMiOlsiU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1cyIsIlJlYWN0IiwiUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSIsInNlbGYiLCJqc3hSdW50aW1lTW9kdWxlIiwicmVxdWlyZSQkMCIsImNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50IiwiX2pzeCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFJQSxRQUFNLG9CQUFvQixNQUFNLE9BQU8sU0FBUyxlQUM1QyxLQUFLLGlDQUFpQztBQUkxQyxRQUFNLG9CQUFvQjtBQUFBLElBQ3RCLFFBQVE7QUFBQSxNQUNKLE9BQU8sQ0FBQyxTQUFTO0FBQ2IsZ0JBQVEsSUFBSSxJQUFJO0FBQUEsTUFDcEI7QUFBQSxNQUNBLE1BQU0sQ0FBQyxTQUFTO0FBQ1osZ0JBQVEsS0FBSyxJQUFJO0FBQUEsTUFDckI7QUFBQSxNQUNBLE1BQU0sQ0FBQyxTQUFTO0FBQ1osZ0JBQVEsS0FBSyxJQUFJO0FBQUEsTUFDckI7QUFBQSxNQUNBLE9BQU8sQ0FBQyxTQUFTO0FBQ2IsZ0JBQVEsTUFBTSxJQUFJO0FBQUEsTUFDdEI7QUFBQSxJQUNSO0FBQUEsSUFDSSxXQUFXLE1BQU07QUFBQSxJQUVqQjtBQUFBO0FBQUEsSUFFQSx1QkFBdUIsTUFBTTtBQUFBLElBRTdCO0FBQUEsRUFDSjtBQUtPLFFBQU0sbUJBQW1CLE1BQU07QUFDbEMsV0FBTyxrQkFBaUIsSUFDbEIsT0FDQTtBQUFBLEVBQ1Y7QUN2Q0EsUUFBTSxZQUFZLGlCQUFnQixFQUFHO0FBQzlCLFdBQVMsV0FBVyxNQUFNLFNBQVM7QUFDdEMsV0FBTyxLQUFLLFdBQVcsTUFBTSxPQUFPO0FBQUEsRUFDeEM7QUFDTyxXQUFTLE1BQU0sS0FBSyxTQUFTO0FBQ2hDLFdBQU8sS0FBSyxRQUFRLEtBQUssT0FBTztBQUFBLEVBQ3BDO0FBQ08sUUFBTSxVQUFVO0FBQUEsSUFDbkIsUUFBUTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQ1RPLE1BQUk7QUFDWCxHQUFDLFNBQVVBLDRCQUEyQjtBQUNsQyxJQUFBQSwyQkFBMEIsU0FBUyxJQUFJO0FBQ3ZDLElBQUFBLDJCQUEwQixPQUFPLElBQUk7QUFBQSxFQUN6QyxHQUFHLDhCQUE4Qiw0QkFBNEIsQ0FBQSxFQUFHOzs7Ozs7O0lDUGhFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVkyQztBQUN6QyxPQUFDLFdBQVc7QUFHZCxZQUFJQyxTQUFRO0FBTVosWUFBSSxxQkFBcUIsT0FBTyxJQUFJLGVBQWU7QUFDbkQsWUFBSSxvQkFBb0IsT0FBTyxJQUFJLGNBQWM7QUFDakQsWUFBSSxzQkFBc0IsT0FBTyxJQUFJLGdCQUFnQjtBQUNyRCxZQUFJLHlCQUF5QixPQUFPLElBQUksbUJBQW1CO0FBQzNELFlBQUksc0JBQXNCLE9BQU8sSUFBSSxnQkFBZ0I7QUFDckQsWUFBSSxzQkFBc0IsT0FBTyxJQUFJLGdCQUFnQjtBQUNyRCxZQUFJLHFCQUFxQixPQUFPLElBQUksZUFBZTtBQUNuRCxZQUFJLHlCQUF5QixPQUFPLElBQUksbUJBQW1CO0FBQzNELFlBQUksc0JBQXNCLE9BQU8sSUFBSSxnQkFBZ0I7QUFDckQsWUFBSSwyQkFBMkIsT0FBTyxJQUFJLHFCQUFxQjtBQUMvRCxZQUFJLGtCQUFrQixPQUFPLElBQUksWUFBWTtBQUM3QyxZQUFJLGtCQUFrQixPQUFPLElBQUksWUFBWTtBQUM3QyxZQUFJLHVCQUF1QixPQUFPLElBQUksaUJBQWlCO0FBQ3ZELFlBQUksd0JBQXdCLE9BQU87QUFDbkMsWUFBSSx1QkFBdUI7QUFDM0IsaUJBQVMsY0FBYyxlQUFlO0FBQ3BDLGNBQUksa0JBQWtCLFFBQVEsT0FBTyxrQkFBa0IsVUFBVTtBQUMvRCxtQkFBTztBQUFBLFVBQUE7QUFHVCxjQUFJLGdCQUFnQix5QkFBeUIsY0FBYyxxQkFBcUIsS0FBSyxjQUFjLG9CQUFvQjtBQUV2SCxjQUFJLE9BQU8sa0JBQWtCLFlBQVk7QUFDdkMsbUJBQU87QUFBQSxVQUFBO0FBR1QsaUJBQU87QUFBQSxRQUFBO0FBR1QsWUFBSSx1QkFBdUJBLE9BQU07QUFFakMsaUJBQVMsTUFBTSxRQUFRO0FBQ3JCO0FBQ0U7QUFDRSx1QkFBUyxRQUFRLFVBQVUsUUFBUSxPQUFPLElBQUksTUFBTSxRQUFRLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxRQUFRLEdBQUcsUUFBUSxPQUFPLFNBQVM7QUFDakgscUJBQUssUUFBUSxDQUFDLElBQUksVUFBVSxLQUFLO0FBQUEsY0FBQTtBQUduQywyQkFBYSxTQUFTLFFBQVEsSUFBSTtBQUFBLFlBQUE7QUFBQSxVQUNwQztBQUFBLFFBQ0Y7QUFHRixpQkFBUyxhQUFhLE9BQU8sUUFBUSxNQUFNO0FBR3pDO0FBQ0UsZ0JBQUlDLDBCQUF5QixxQkFBcUI7QUFDbEQsZ0JBQUksUUFBUUEsd0JBQXVCLGlCQUFBO0FBRW5DLGdCQUFJLFVBQVUsSUFBSTtBQUNoQix3QkFBVTtBQUNWLHFCQUFPLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQztBQUFBLFlBQUE7QUFJNUIsZ0JBQUksaUJBQWlCLEtBQUssSUFBSSxTQUFVLE1BQU07QUFDNUMscUJBQU8sT0FBTyxJQUFJO0FBQUEsWUFBQSxDQUNuQjtBQUVELDJCQUFlLFFBQVEsY0FBYyxNQUFNO0FBSTNDLHFCQUFTLFVBQVUsTUFBTSxLQUFLLFFBQVEsS0FBSyxHQUFHLFNBQVMsY0FBYztBQUFBLFVBQUE7QUFBQSxRQUN2RTtBQUtGLFlBQUksaUJBQWlCO0FBQ3JCLFlBQUkscUJBQXFCO0FBQ3pCLFlBQUksMEJBQTBCO0FBRTlCLFlBQUkscUJBQXFCO0FBSXpCLFlBQUkscUJBQXFCO0FBRXpCLFlBQUk7QUFFSjtBQUNFLG1DQUF5QixPQUFPLElBQUksd0JBQXdCO0FBQUEsUUFBQTtBQUc5RCxpQkFBUyxtQkFBbUIsTUFBTTtBQUNoQyxjQUFJLE9BQU8sU0FBUyxZQUFZLE9BQU8sU0FBUyxZQUFZO0FBQzFELG1CQUFPO0FBQUEsVUFBQTtBQUlULGNBQUksU0FBUyx1QkFBdUIsU0FBUyx1QkFBdUIsc0JBQXVCLFNBQVMsMEJBQTBCLFNBQVMsdUJBQXVCLFNBQVMsNEJBQTRCLHNCQUF1QixTQUFTLHdCQUF3QixrQkFBbUIsc0JBQXVCLHlCQUEwQjtBQUM3VCxtQkFBTztBQUFBLFVBQUE7QUFHVCxjQUFJLE9BQU8sU0FBUyxZQUFZLFNBQVMsTUFBTTtBQUM3QyxnQkFBSSxLQUFLLGFBQWEsbUJBQW1CLEtBQUssYUFBYSxtQkFBbUIsS0FBSyxhQUFhLHVCQUF1QixLQUFLLGFBQWEsc0JBQXNCLEtBQUssYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSWpMLEtBQUssYUFBYSwwQkFBMEIsS0FBSyxnQkFBZ0IsUUFBVztBQUMxRSxxQkFBTztBQUFBLFlBQUE7QUFBQSxVQUNUO0FBR0YsaUJBQU87QUFBQSxRQUFBO0FBR1QsaUJBQVMsZUFBZSxXQUFXLFdBQVcsYUFBYTtBQUN6RCxjQUFJLGNBQWMsVUFBVTtBQUU1QixjQUFJLGFBQWE7QUFDZixtQkFBTztBQUFBLFVBQUE7QUFHVCxjQUFJLGVBQWUsVUFBVSxlQUFlLFVBQVUsUUFBUTtBQUM5RCxpQkFBTyxpQkFBaUIsS0FBSyxjQUFjLE1BQU0sZUFBZSxNQUFNO0FBQUEsUUFBQTtBQUl4RSxpQkFBUyxlQUFlLE1BQU07QUFDNUIsaUJBQU8sS0FBSyxlQUFlO0FBQUEsUUFBQTtBQUk3QixpQkFBUyx5QkFBeUIsTUFBTTtBQUN0QyxjQUFJLFFBQVEsTUFBTTtBQUVoQixtQkFBTztBQUFBLFVBQUE7QUFHVDtBQUNFLGdCQUFJLE9BQU8sS0FBSyxRQUFRLFVBQVU7QUFDaEMsb0JBQU0sbUhBQXdIO0FBQUEsWUFBQTtBQUFBLFVBQ2hJO0FBR0YsY0FBSSxPQUFPLFNBQVMsWUFBWTtBQUM5QixtQkFBTyxLQUFLLGVBQWUsS0FBSyxRQUFRO0FBQUEsVUFBQTtBQUcxQyxjQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzVCLG1CQUFPO0FBQUEsVUFBQTtBQUdULGtCQUFRLE1BQUE7QUFBQSxZQUNOLEtBQUs7QUFDSCxxQkFBTztBQUFBLFlBRVQsS0FBSztBQUNILHFCQUFPO0FBQUEsWUFFVCxLQUFLO0FBQ0gscUJBQU87QUFBQSxZQUVULEtBQUs7QUFDSCxxQkFBTztBQUFBLFlBRVQsS0FBSztBQUNILHFCQUFPO0FBQUEsWUFFVCxLQUFLO0FBQ0gscUJBQU87QUFBQSxVQUFBO0FBSVgsY0FBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixvQkFBUSxLQUFLLFVBQUE7QUFBQSxjQUNYLEtBQUs7QUFDSCxvQkFBSSxVQUFVO0FBQ2QsdUJBQU8sZUFBZSxPQUFPLElBQUk7QUFBQSxjQUVuQyxLQUFLO0FBQ0gsb0JBQUksV0FBVztBQUNmLHVCQUFPLGVBQWUsU0FBUyxRQUFRLElBQUk7QUFBQSxjQUU3QyxLQUFLO0FBQ0gsdUJBQU8sZUFBZSxNQUFNLEtBQUssUUFBUSxZQUFZO0FBQUEsY0FFdkQsS0FBSztBQUNILG9CQUFJLFlBQVksS0FBSyxlQUFlO0FBRXBDLG9CQUFJLGNBQWMsTUFBTTtBQUN0Qix5QkFBTztBQUFBLGdCQUFBO0FBR1QsdUJBQU8seUJBQXlCLEtBQUssSUFBSSxLQUFLO0FBQUEsY0FFaEQsS0FBSyxpQkFDSDtBQUNFLG9CQUFJLGdCQUFnQjtBQUNwQixvQkFBSSxVQUFVLGNBQWM7QUFDNUIsb0JBQUksT0FBTyxjQUFjO0FBRXpCLG9CQUFJO0FBQ0YseUJBQU8seUJBQXlCLEtBQUssT0FBTyxDQUFDO0FBQUEsZ0JBQUEsU0FDdEMsR0FBRztBQUNWLHlCQUFPO0FBQUEsZ0JBQUE7QUFBQSxjQUNUO0FBQUEsWUFDRjtBQUFBLFVBR0o7QUFHRixpQkFBTztBQUFBLFFBQUE7QUFHVCxZQUFJLFNBQVMsT0FBTztBQU1wQixZQUFJLGdCQUFnQjtBQUNwQixZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUk7QUFDSixZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUk7QUFDSixZQUFJO0FBRUosaUJBQVMsY0FBYztBQUFBLFFBQUE7QUFFdkIsb0JBQVkscUJBQXFCO0FBQ2pDLGlCQUFTLGNBQWM7QUFDckI7QUFDRSxnQkFBSSxrQkFBa0IsR0FBRztBQUV2Qix3QkFBVSxRQUFRO0FBQ2xCLHlCQUFXLFFBQVE7QUFDbkIseUJBQVcsUUFBUTtBQUNuQiwwQkFBWSxRQUFRO0FBQ3BCLDBCQUFZLFFBQVE7QUFDcEIsbUNBQXFCLFFBQVE7QUFDN0IsNkJBQWUsUUFBUTtBQUV2QixrQkFBSSxRQUFRO0FBQUEsZ0JBQ1YsY0FBYztBQUFBLGdCQUNkLFlBQVk7QUFBQSxnQkFDWixPQUFPO0FBQUEsZ0JBQ1AsVUFBVTtBQUFBO0FBR1oscUJBQU8saUJBQWlCLFNBQVM7QUFBQSxnQkFDL0IsTUFBTTtBQUFBLGdCQUNOLEtBQUs7QUFBQSxnQkFDTCxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGdCQUNQLE9BQU87QUFBQSxnQkFDUCxnQkFBZ0I7QUFBQSxnQkFDaEIsVUFBVTtBQUFBLGNBQUEsQ0FDWDtBQUFBLFlBQUE7QUFJSDtBQUFBLFVBQUE7QUFBQSxRQUNGO0FBRUYsaUJBQVMsZUFBZTtBQUN0QjtBQUNFO0FBRUEsZ0JBQUksa0JBQWtCLEdBQUc7QUFFdkIsa0JBQUksUUFBUTtBQUFBLGdCQUNWLGNBQWM7QUFBQSxnQkFDZCxZQUFZO0FBQUEsZ0JBQ1osVUFBVTtBQUFBO0FBR1oscUJBQU8saUJBQWlCLFNBQVM7QUFBQSxnQkFDL0IsS0FBSyxPQUFPLENBQUEsR0FBSSxPQUFPO0FBQUEsa0JBQ3JCLE9BQU87QUFBQSxnQkFBQSxDQUNSO0FBQUEsZ0JBQ0QsTUFBTSxPQUFPLENBQUEsR0FBSSxPQUFPO0FBQUEsa0JBQ3RCLE9BQU87QUFBQSxnQkFBQSxDQUNSO0FBQUEsZ0JBQ0QsTUFBTSxPQUFPLENBQUEsR0FBSSxPQUFPO0FBQUEsa0JBQ3RCLE9BQU87QUFBQSxnQkFBQSxDQUNSO0FBQUEsZ0JBQ0QsT0FBTyxPQUFPLENBQUEsR0FBSSxPQUFPO0FBQUEsa0JBQ3ZCLE9BQU87QUFBQSxnQkFBQSxDQUNSO0FBQUEsZ0JBQ0QsT0FBTyxPQUFPLENBQUEsR0FBSSxPQUFPO0FBQUEsa0JBQ3ZCLE9BQU87QUFBQSxnQkFBQSxDQUNSO0FBQUEsZ0JBQ0QsZ0JBQWdCLE9BQU8sQ0FBQSxHQUFJLE9BQU87QUFBQSxrQkFDaEMsT0FBTztBQUFBLGdCQUFBLENBQ1I7QUFBQSxnQkFDRCxVQUFVLE9BQU8sQ0FBQSxHQUFJLE9BQU87QUFBQSxrQkFDMUIsT0FBTztBQUFBLGlCQUNSO0FBQUEsY0FBQSxDQUNGO0FBQUEsWUFBQTtBQUlILGdCQUFJLGdCQUFnQixHQUFHO0FBQ3JCLG9CQUFNLDhFQUFtRjtBQUFBLFlBQUE7QUFBQSxVQUMzRjtBQUFBLFFBQ0Y7QUFHRixZQUFJLHlCQUF5QixxQkFBcUI7QUFDbEQsWUFBSTtBQUNKLGlCQUFTLDhCQUE4QixNQUFNLFFBQVEsU0FBUztBQUM1RDtBQUNFLGdCQUFJLFdBQVcsUUFBVztBQUV4QixrQkFBSTtBQUNGLHNCQUFNLE1BQUE7QUFBQSxjQUFNLFNBQ0wsR0FBRztBQUNWLG9CQUFJLFFBQVEsRUFBRSxNQUFNLEtBQUEsRUFBTyxNQUFNLGNBQWM7QUFDL0MseUJBQVMsU0FBUyxNQUFNLENBQUMsS0FBSztBQUFBLGNBQUE7QUFBQSxZQUNoQztBQUlGLG1CQUFPLE9BQU8sU0FBUztBQUFBLFVBQUE7QUFBQSxRQUN6QjtBQUVGLFlBQUksVUFBVTtBQUNkLFlBQUk7QUFFSjtBQUNFLGNBQUksa0JBQWtCLE9BQU8sWUFBWSxhQUFhLFVBQVU7QUFDaEUsZ0NBQXNCLElBQUksZ0JBQUE7QUFBQSxRQUFnQjtBQUc1QyxpQkFBUyw2QkFBNkIsSUFBSSxXQUFXO0FBRW5ELGNBQUssQ0FBQyxNQUFNLFNBQVM7QUFDbkIsbUJBQU87QUFBQSxVQUFBO0FBR1Q7QUFDRSxnQkFBSSxRQUFRLG9CQUFvQixJQUFJLEVBQUU7QUFFdEMsZ0JBQUksVUFBVSxRQUFXO0FBQ3ZCLHFCQUFPO0FBQUEsWUFBQTtBQUFBLFVBQ1Q7QUFHRixjQUFJO0FBQ0osb0JBQVU7QUFDVixjQUFJLDRCQUE0QixNQUFNO0FBRXRDLGdCQUFNLG9CQUFvQjtBQUMxQixjQUFJO0FBRUo7QUFDRSxpQ0FBcUIsdUJBQXVCO0FBRzVDLG1DQUF1QixVQUFVO0FBQ2pDLHdCQUFBO0FBQUEsVUFBWTtBQUdkLGNBQUk7QUFFRixnQkFBSSxXQUFXO0FBRWIsa0JBQUksT0FBTyxXQUFZO0FBQ3JCLHNCQUFNLE1BQUE7QUFBQSxjQUFNO0FBSWQscUJBQU8sZUFBZSxLQUFLLFdBQVcsU0FBUztBQUFBLGdCQUM3QyxLQUFLLFdBQVk7QUFHZix3QkFBTSxNQUFBO0FBQUEsZ0JBQU07QUFBQSxjQUNkLENBQ0Q7QUFFRCxrQkFBSSxPQUFPLFlBQVksWUFBWSxRQUFRLFdBQVc7QUFHcEQsb0JBQUk7QUFDRiwwQkFBUSxVQUFVLE1BQU0sRUFBRTtBQUFBLGdCQUFBLFNBQ25CLEdBQUc7QUFDViw0QkFBVTtBQUFBLGdCQUFBO0FBR1osd0JBQVEsVUFBVSxJQUFJLENBQUEsR0FBSSxJQUFJO0FBQUEsY0FBQSxPQUN6QjtBQUNMLG9CQUFJO0FBQ0YsdUJBQUssS0FBQTtBQUFBLGdCQUFLLFNBQ0gsR0FBRztBQUNWLDRCQUFVO0FBQUEsZ0JBQUE7QUFHWixtQkFBRyxLQUFLLEtBQUssU0FBUztBQUFBLGNBQUE7QUFBQSxZQUN4QixPQUNLO0FBQ0wsa0JBQUk7QUFDRixzQkFBTSxNQUFBO0FBQUEsY0FBTSxTQUNMLEdBQUc7QUFDViwwQkFBVTtBQUFBLGNBQUE7QUFHWixpQkFBQTtBQUFBLFlBQUc7QUFBQSxVQUNMLFNBQ08sUUFBUTtBQUVmLGdCQUFJLFVBQVUsV0FBVyxPQUFPLE9BQU8sVUFBVSxVQUFVO0FBR3pELGtCQUFJLGNBQWMsT0FBTyxNQUFNLE1BQU0sSUFBSTtBQUN6QyxrQkFBSSxlQUFlLFFBQVEsTUFBTSxNQUFNLElBQUk7QUFDM0Msa0JBQUksSUFBSSxZQUFZLFNBQVM7QUFDN0Isa0JBQUksSUFBSSxhQUFhLFNBQVM7QUFFOUIscUJBQU8sS0FBSyxLQUFLLEtBQUssS0FBSyxZQUFZLENBQUMsTUFBTSxhQUFhLENBQUMsR0FBRztBQU83RDtBQUFBLGNBQUE7QUFHRixxQkFBTyxLQUFLLEtBQUssS0FBSyxHQUFHLEtBQUssS0FBSztBQUdqQyxvQkFBSSxZQUFZLENBQUMsTUFBTSxhQUFhLENBQUMsR0FBRztBQU10QyxzQkFBSSxNQUFNLEtBQUssTUFBTSxHQUFHO0FBQ3RCLHVCQUFHO0FBQ0Q7QUFDQTtBQUdBLDBCQUFJLElBQUksS0FBSyxZQUFZLENBQUMsTUFBTSxhQUFhLENBQUMsR0FBRztBQUUvQyw0QkFBSSxTQUFTLE9BQU8sWUFBWSxDQUFDLEVBQUUsUUFBUSxZQUFZLE1BQU07QUFLN0QsNEJBQUksR0FBRyxlQUFlLE9BQU8sU0FBUyxhQUFhLEdBQUc7QUFDcEQsbUNBQVMsT0FBTyxRQUFRLGVBQWUsR0FBRyxXQUFXO0FBQUEsd0JBQUE7QUFHdkQ7QUFDRSw4QkFBSSxPQUFPLE9BQU8sWUFBWTtBQUM1QixnREFBb0IsSUFBSSxJQUFJLE1BQU07QUFBQSwwQkFBQTtBQUFBLHdCQUNwQztBQUlGLCtCQUFPO0FBQUEsc0JBQUE7QUFBQSxvQkFDVCxTQUNPLEtBQUssS0FBSyxLQUFLO0FBQUEsa0JBQUE7QUFHMUI7QUFBQSxnQkFBQTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRixVQUNGO0FBQ0Usc0JBQVU7QUFFVjtBQUNFLHFDQUF1QixVQUFVO0FBQ2pDLDJCQUFBO0FBQUEsWUFBYTtBQUdmLGtCQUFNLG9CQUFvQjtBQUFBLFVBQUE7QUFJNUIsY0FBSSxPQUFPLEtBQUssR0FBRyxlQUFlLEdBQUcsT0FBTztBQUM1QyxjQUFJLGlCQUFpQixPQUFPLDhCQUE4QixJQUFJLElBQUk7QUFFbEU7QUFDRSxnQkFBSSxPQUFPLE9BQU8sWUFBWTtBQUM1QixrQ0FBb0IsSUFBSSxJQUFJLGNBQWM7QUFBQSxZQUFBO0FBQUEsVUFDNUM7QUFHRixpQkFBTztBQUFBLFFBQUE7QUFFVCxpQkFBUywrQkFBK0IsSUFBSSxRQUFRLFNBQVM7QUFDM0Q7QUFDRSxtQkFBTyw2QkFBNkIsSUFBSSxLQUFLO0FBQUEsVUFBQTtBQUFBLFFBQy9DO0FBR0YsaUJBQVMsZ0JBQWdCLFdBQVc7QUFDbEMsY0FBSSxZQUFZLFVBQVU7QUFDMUIsaUJBQU8sQ0FBQyxFQUFFLGFBQWEsVUFBVTtBQUFBLFFBQUE7QUFHbkMsaUJBQVMscUNBQXFDLE1BQU0sUUFBUSxTQUFTO0FBRW5FLGNBQUksUUFBUSxNQUFNO0FBQ2hCLG1CQUFPO0FBQUEsVUFBQTtBQUdULGNBQUksT0FBTyxTQUFTLFlBQVk7QUFDOUI7QUFDRSxxQkFBTyw2QkFBNkIsTUFBTSxnQkFBZ0IsSUFBSSxDQUFDO0FBQUEsWUFBQTtBQUFBLFVBQ2pFO0FBR0YsY0FBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixtQkFBTyw4QkFBOEIsSUFBSTtBQUFBLFVBQUE7QUFHM0Msa0JBQVEsTUFBQTtBQUFBLFlBQ04sS0FBSztBQUNILHFCQUFPLDhCQUE4QixVQUFVO0FBQUEsWUFFakQsS0FBSztBQUNILHFCQUFPLDhCQUE4QixjQUFjO0FBQUEsVUFBQTtBQUd2RCxjQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzVCLG9CQUFRLEtBQUssVUFBQTtBQUFBLGNBQ1gsS0FBSztBQUNILHVCQUFPLCtCQUErQixLQUFLLE1BQU07QUFBQSxjQUVuRCxLQUFLO0FBRUgsdUJBQU8scUNBQXFDLEtBQUssTUFBTSxRQUFRLE9BQU87QUFBQSxjQUV4RSxLQUFLLGlCQUNIO0FBQ0Usb0JBQUksZ0JBQWdCO0FBQ3BCLG9CQUFJLFVBQVUsY0FBYztBQUM1QixvQkFBSSxPQUFPLGNBQWM7QUFFekIsb0JBQUk7QUFFRix5QkFBTyxxQ0FBcUMsS0FBSyxPQUFPLEdBQUcsUUFBUSxPQUFPO0FBQUEsZ0JBQUEsU0FDbkUsR0FBRztBQUFBLGdCQUFBO0FBQUEsY0FBQztBQUFBLFlBQ2Y7QUFBQSxVQUNKO0FBR0YsaUJBQU87QUFBQSxRQUFBO0FBR1QsWUFBSSxpQkFBaUIsT0FBTyxVQUFVO0FBRXRDLFlBQUkscUJBQXFCLENBQUE7QUFDekIsWUFBSSx5QkFBeUIscUJBQXFCO0FBRWxELGlCQUFTLDhCQUE4QixTQUFTO0FBQzlDO0FBQ0UsZ0JBQUksU0FBUztBQUNYLGtCQUFJLFFBQVEsUUFBUTtBQUNwQixrQkFBSSxRQUFRLHFDQUFxQyxRQUFRLE1BQU0sUUFBUSxTQUFTLFFBQVEsTUFBTSxPQUFPLElBQUk7QUFDekcscUNBQXVCLG1CQUFtQixLQUFLO0FBQUEsWUFBQSxPQUMxQztBQUNMLHFDQUF1QixtQkFBbUIsSUFBSTtBQUFBLFlBQUE7QUFBQSxVQUNoRDtBQUFBLFFBQ0Y7QUFHRixpQkFBUyxlQUFlLFdBQVcsUUFBUSxVQUFVLGVBQWUsU0FBUztBQUMzRTtBQUVFLGdCQUFJLE1BQU0sU0FBUyxLQUFLLEtBQUssY0FBYztBQUUzQyxxQkFBUyxnQkFBZ0IsV0FBVztBQUNsQyxrQkFBSSxJQUFJLFdBQVcsWUFBWSxHQUFHO0FBQ2hDLG9CQUFJLFVBQVU7QUFJZCxvQkFBSTtBQUdGLHNCQUFJLE9BQU8sVUFBVSxZQUFZLE1BQU0sWUFBWTtBQUVqRCx3QkFBSSxNQUFNLE9BQU8saUJBQWlCLGlCQUFpQixPQUFPLFdBQVcsWUFBWSxlQUFlLCtGQUFvRyxPQUFPLFVBQVUsWUFBWSxJQUFJLGlHQUFzRztBQUMzVSx3QkFBSSxPQUFPO0FBQ1gsMEJBQU07QUFBQSxrQkFBQTtBQUdSLDRCQUFVLFVBQVUsWUFBWSxFQUFFLFFBQVEsY0FBYyxlQUFlLFVBQVUsTUFBTSw4Q0FBOEM7QUFBQSxnQkFBQSxTQUM5SCxJQUFJO0FBQ1gsNEJBQVU7QUFBQSxnQkFBQTtBQUdaLG9CQUFJLFdBQVcsRUFBRSxtQkFBbUIsUUFBUTtBQUMxQyxnREFBOEIsT0FBTztBQUVyQyx3QkFBTSw0UkFBcVQsaUJBQWlCLGVBQWUsVUFBVSxjQUFjLE9BQU8sT0FBTztBQUVqWSxnREFBOEIsSUFBSTtBQUFBLGdCQUFBO0FBR3BDLG9CQUFJLG1CQUFtQixTQUFTLEVBQUUsUUFBUSxXQUFXLHFCQUFxQjtBQUd4RSxxQ0FBbUIsUUFBUSxPQUFPLElBQUk7QUFDdEMsZ0RBQThCLE9BQU87QUFFckMsd0JBQU0sc0JBQXNCLFVBQVUsUUFBUSxPQUFPO0FBRXJELGdEQUE4QixJQUFJO0FBQUEsZ0JBQUE7QUFBQSxjQUNwQztBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUdGLFlBQUksY0FBYyxNQUFNO0FBRXhCLGlCQUFTLFFBQVEsR0FBRztBQUNsQixpQkFBTyxZQUFZLENBQUM7QUFBQSxRQUFBO0FBYXRCLGlCQUFTLFNBQVMsT0FBTztBQUN2QjtBQUVFLGdCQUFJLGlCQUFpQixPQUFPLFdBQVcsY0FBYyxPQUFPO0FBQzVELGdCQUFJLE9BQU8sa0JBQWtCLE1BQU0sT0FBTyxXQUFXLEtBQUssTUFBTSxZQUFZLFFBQVE7QUFDcEYsbUJBQU87QUFBQSxVQUFBO0FBQUEsUUFDVDtBQUlGLGlCQUFTLGtCQUFrQixPQUFPO0FBQ2hDO0FBQ0UsZ0JBQUk7QUFDRixpQ0FBbUIsS0FBSztBQUN4QixxQkFBTztBQUFBLFlBQUEsU0FDQSxHQUFHO0FBQ1YscUJBQU87QUFBQSxZQUFBO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFHRixpQkFBUyxtQkFBbUIsT0FBTztBQXdCakMsaUJBQU8sS0FBSztBQUFBLFFBQUE7QUFFZCxpQkFBUyx1QkFBdUIsT0FBTztBQUNyQztBQUNFLGdCQUFJLGtCQUFrQixLQUFLLEdBQUc7QUFDNUIsb0JBQU0sbUhBQXdILFNBQVMsS0FBSyxDQUFDO0FBRTdJLHFCQUFPLG1CQUFtQixLQUFLO0FBQUEsWUFBQTtBQUFBLFVBQ2pDO0FBQUEsUUFDRjtBQUdGLFlBQUksb0JBQW9CLHFCQUFxQjtBQUM3QyxZQUFJLGlCQUFpQjtBQUFBLFVBQ25CLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFBQSxVQUNMLFFBQVE7QUFBQSxVQUNSLFVBQVU7QUFBQTtBQUVaLFlBQUk7QUFDSixZQUFJO0FBT0osaUJBQVMsWUFBWSxRQUFRO0FBQzNCO0FBQ0UsZ0JBQUksZUFBZSxLQUFLLFFBQVEsS0FBSyxHQUFHO0FBQ3RDLGtCQUFJLFNBQVMsT0FBTyx5QkFBeUIsUUFBUSxLQUFLLEVBQUU7QUFFNUQsa0JBQUksVUFBVSxPQUFPLGdCQUFnQjtBQUNuQyx1QkFBTztBQUFBLGNBQUE7QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUdGLGlCQUFPLE9BQU8sUUFBUTtBQUFBLFFBQUE7QUFHeEIsaUJBQVMsWUFBWSxRQUFRO0FBQzNCO0FBQ0UsZ0JBQUksZUFBZSxLQUFLLFFBQVEsS0FBSyxHQUFHO0FBQ3RDLGtCQUFJLFNBQVMsT0FBTyx5QkFBeUIsUUFBUSxLQUFLLEVBQUU7QUFFNUQsa0JBQUksVUFBVSxPQUFPLGdCQUFnQjtBQUNuQyx1QkFBTztBQUFBLGNBQUE7QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUdGLGlCQUFPLE9BQU8sUUFBUTtBQUFBLFFBQUE7QUFHeEIsaUJBQVMscUNBQXFDLFFBQVFDLE9BQU07QUFDMUQ7QUFDRSxnQkFBSSxPQUFPLE9BQU8sUUFBUSxZQUFZLGtCQUFrQixXQUFXQSxNQUFzRDtBQUFBLFVBUXpIO0FBQUEsUUFDRjtBQUdGLGlCQUFTLDJCQUEyQixPQUFPLGFBQWE7QUFDdEQ7QUFDRSxnQkFBSSx3QkFBd0IsV0FBWTtBQUN0QyxrQkFBSSxDQUFDLDRCQUE0QjtBQUMvQiw2Q0FBNkI7QUFFN0Isc0JBQU0sNk9BQTRQLFdBQVc7QUFBQSxjQUFBO0FBQUEsWUFDL1E7QUFHRixrQ0FBc0IsaUJBQWlCO0FBQ3ZDLG1CQUFPLGVBQWUsT0FBTyxPQUFPO0FBQUEsY0FDbEMsS0FBSztBQUFBLGNBQ0wsY0FBYztBQUFBLFlBQUEsQ0FDZjtBQUFBLFVBQUE7QUFBQSxRQUNIO0FBR0YsaUJBQVMsMkJBQTJCLE9BQU8sYUFBYTtBQUN0RDtBQUNFLGdCQUFJLHdCQUF3QixXQUFZO0FBQ3RDLGtCQUFJLENBQUMsNEJBQTRCO0FBQy9CLDZDQUE2QjtBQUU3QixzQkFBTSw2T0FBNFAsV0FBVztBQUFBLGNBQUE7QUFBQSxZQUMvUTtBQUdGLGtDQUFzQixpQkFBaUI7QUFDdkMsbUJBQU8sZUFBZSxPQUFPLE9BQU87QUFBQSxjQUNsQyxLQUFLO0FBQUEsY0FDTCxjQUFjO0FBQUEsWUFBQSxDQUNmO0FBQUEsVUFBQTtBQUFBLFFBQ0g7QUF3QkYsWUFBSSxlQUFlLFNBQVUsTUFBTSxLQUFLLEtBQUtBLE9BQU0sUUFBUSxPQUFPLE9BQU87QUFDdkUsY0FBSSxVQUFVO0FBQUE7QUFBQSxZQUVaLFVBQVU7QUFBQTtBQUFBLFlBRVY7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQTtBQUFBLFlBRUEsUUFBUTtBQUFBO0FBR1Y7QUFLRSxvQkFBUSxTQUFTLENBQUE7QUFLakIsbUJBQU8sZUFBZSxRQUFRLFFBQVEsYUFBYTtBQUFBLGNBQ2pELGNBQWM7QUFBQSxjQUNkLFlBQVk7QUFBQSxjQUNaLFVBQVU7QUFBQSxjQUNWLE9BQU87QUFBQSxZQUFBLENBQ1I7QUFFRCxtQkFBTyxlQUFlLFNBQVMsU0FBUztBQUFBLGNBQ3RDLGNBQWM7QUFBQSxjQUNkLFlBQVk7QUFBQSxjQUNaLFVBQVU7QUFBQSxjQUNWLE9BQU9BO0FBQUEsWUFBQSxDQUNSO0FBR0QsbUJBQU8sZUFBZSxTQUFTLFdBQVc7QUFBQSxjQUN4QyxjQUFjO0FBQUEsY0FDZCxZQUFZO0FBQUEsY0FDWixVQUFVO0FBQUEsY0FDVixPQUFPO0FBQUEsWUFBQSxDQUNSO0FBRUQsZ0JBQUksT0FBTyxRQUFRO0FBQ2pCLHFCQUFPLE9BQU8sUUFBUSxLQUFLO0FBQzNCLHFCQUFPLE9BQU8sT0FBTztBQUFBLFlBQUE7QUFBQSxVQUN2QjtBQUdGLGlCQUFPO0FBQUEsUUFBQTtBQVNULGlCQUFTLE9BQU8sTUFBTSxRQUFRLFVBQVUsUUFBUUEsT0FBTTtBQUNwRDtBQUNFLGdCQUFJO0FBRUosZ0JBQUksUUFBUSxDQUFBO0FBQ1osZ0JBQUksTUFBTTtBQUNWLGdCQUFJLE1BQU07QUFPVixnQkFBSSxhQUFhLFFBQVc7QUFDMUI7QUFDRSx1Q0FBdUIsUUFBUTtBQUFBLGNBQUE7QUFHakMsb0JBQU0sS0FBSztBQUFBLFlBQUE7QUFHYixnQkFBSSxZQUFZLE1BQU0sR0FBRztBQUN2QjtBQUNFLHVDQUF1QixPQUFPLEdBQUc7QUFBQSxjQUFBO0FBR25DLG9CQUFNLEtBQUssT0FBTztBQUFBLFlBQUE7QUFHcEIsZ0JBQUksWUFBWSxNQUFNLEdBQUc7QUFDdkIsb0JBQU0sT0FBTztBQUNiLG1EQUFxQyxRQUFRQSxLQUFJO0FBQUEsWUFBQTtBQUluRCxpQkFBSyxZQUFZLFFBQVE7QUFDdkIsa0JBQUksZUFBZSxLQUFLLFFBQVEsUUFBUSxLQUFLLENBQUMsZUFBZSxlQUFlLFFBQVEsR0FBRztBQUNyRixzQkFBTSxRQUFRLElBQUksT0FBTyxRQUFRO0FBQUEsY0FBQTtBQUFBLFlBQ25DO0FBSUYsZ0JBQUksUUFBUSxLQUFLLGNBQWM7QUFDN0Isa0JBQUksZUFBZSxLQUFLO0FBRXhCLG1CQUFLLFlBQVksY0FBYztBQUM3QixvQkFBSSxNQUFNLFFBQVEsTUFBTSxRQUFXO0FBQ2pDLHdCQUFNLFFBQVEsSUFBSSxhQUFhLFFBQVE7QUFBQSxnQkFBQTtBQUFBLGNBQ3pDO0FBQUEsWUFDRjtBQUdGLGdCQUFJLE9BQU8sS0FBSztBQUNkLGtCQUFJLGNBQWMsT0FBTyxTQUFTLGFBQWEsS0FBSyxlQUFlLEtBQUssUUFBUSxZQUFZO0FBRTVGLGtCQUFJLEtBQUs7QUFDUCwyQ0FBMkIsT0FBTyxXQUFXO0FBQUEsY0FBQTtBQUcvQyxrQkFBSSxLQUFLO0FBQ1AsMkNBQTJCLE9BQU8sV0FBVztBQUFBLGNBQUE7QUFBQSxZQUMvQztBQUdGLG1CQUFPLGFBQWEsTUFBTSxLQUFLLEtBQUtBLE9BQU0sUUFBUSxrQkFBa0IsU0FBUyxLQUFLO0FBQUEsVUFBQTtBQUFBLFFBQ3BGO0FBR0YsWUFBSSxzQkFBc0IscUJBQXFCO0FBQy9DLFlBQUksMkJBQTJCLHFCQUFxQjtBQUVwRCxpQkFBUyxnQ0FBZ0MsU0FBUztBQUNoRDtBQUNFLGdCQUFJLFNBQVM7QUFDWCxrQkFBSSxRQUFRLFFBQVE7QUFDcEIsa0JBQUksUUFBUSxxQ0FBcUMsUUFBUSxNQUFNLFFBQVEsU0FBUyxRQUFRLE1BQU0sT0FBTyxJQUFJO0FBQ3pHLHVDQUF5QixtQkFBbUIsS0FBSztBQUFBLFlBQUEsT0FDNUM7QUFDTCx1Q0FBeUIsbUJBQW1CLElBQUk7QUFBQSxZQUFBO0FBQUEsVUFDbEQ7QUFBQSxRQUNGO0FBR0YsWUFBSTtBQUVKO0FBQ0UsMENBQWdDO0FBQUEsUUFBQTtBQVdsQyxpQkFBUyxlQUFlLFFBQVE7QUFDOUI7QUFDRSxtQkFBTyxPQUFPLFdBQVcsWUFBWSxXQUFXLFFBQVEsT0FBTyxhQUFhO0FBQUEsVUFBQTtBQUFBLFFBQzlFO0FBR0YsaUJBQVMsOEJBQThCO0FBQ3JDO0FBQ0UsZ0JBQUksb0JBQW9CLFNBQVM7QUFDL0Isa0JBQUksT0FBTyx5QkFBeUIsb0JBQW9CLFFBQVEsSUFBSTtBQUVwRSxrQkFBSSxNQUFNO0FBQ1IsdUJBQU8scUNBQXFDLE9BQU87QUFBQSxjQUFBO0FBQUEsWUFDckQ7QUFHRixtQkFBTztBQUFBLFVBQUE7QUFBQSxRQUNUO0FBR0YsaUJBQVMsMkJBQTJCLFFBQVE7QUFDMUM7QUFPRSxtQkFBTztBQUFBLFVBQUE7QUFBQSxRQUNUO0FBU0YsWUFBSSx3QkFBd0IsQ0FBQTtBQUU1QixpQkFBUyw2QkFBNkIsWUFBWTtBQUNoRDtBQUNFLGdCQUFJLE9BQU8sNEJBQUE7QUFFWCxnQkFBSSxDQUFDLE1BQU07QUFDVCxrQkFBSSxhQUFhLE9BQU8sZUFBZSxXQUFXLGFBQWEsV0FBVyxlQUFlLFdBQVc7QUFFcEcsa0JBQUksWUFBWTtBQUNkLHVCQUFPLGdEQUFnRCxhQUFhO0FBQUEsY0FBQTtBQUFBLFlBQ3RFO0FBR0YsbUJBQU87QUFBQSxVQUFBO0FBQUEsUUFDVDtBQWVGLGlCQUFTLG9CQUFvQixTQUFTLFlBQVk7QUFDaEQ7QUFDRSxnQkFBSSxDQUFDLFFBQVEsVUFBVSxRQUFRLE9BQU8sYUFBYSxRQUFRLE9BQU8sTUFBTTtBQUN0RTtBQUFBLFlBQUE7QUFHRixvQkFBUSxPQUFPLFlBQVk7QUFDM0IsZ0JBQUksNEJBQTRCLDZCQUE2QixVQUFVO0FBRXZFLGdCQUFJLHNCQUFzQix5QkFBeUIsR0FBRztBQUNwRDtBQUFBLFlBQUE7QUFHRixrQ0FBc0IseUJBQXlCLElBQUk7QUFJbkQsZ0JBQUksYUFBYTtBQUVqQixnQkFBSSxXQUFXLFFBQVEsVUFBVSxRQUFRLFdBQVcsb0JBQW9CLFNBQVM7QUFFL0UsMkJBQWEsaUNBQWlDLHlCQUF5QixRQUFRLE9BQU8sSUFBSSxJQUFJO0FBQUEsWUFBQTtBQUdoRyw0Q0FBZ0MsT0FBTztBQUV2QyxrQkFBTSw2SEFBa0ksMkJBQTJCLFVBQVU7QUFFN0ssNENBQWdDLElBQUk7QUFBQSxVQUFBO0FBQUEsUUFDdEM7QUFhRixpQkFBUyxrQkFBa0IsTUFBTSxZQUFZO0FBQzNDO0FBQ0UsZ0JBQUksT0FBTyxTQUFTLFVBQVU7QUFDNUI7QUFBQSxZQUFBO0FBR0YsZ0JBQUksUUFBUSxJQUFJLEdBQUc7QUFDakIsdUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDcEMsb0JBQUksUUFBUSxLQUFLLENBQUM7QUFFbEIsb0JBQUksZUFBZSxLQUFLLEdBQUc7QUFDekIsc0NBQW9CLE9BQU8sVUFBVTtBQUFBLGdCQUFBO0FBQUEsY0FDdkM7QUFBQSxZQUNGLFdBQ1MsZUFBZSxJQUFJLEdBQUc7QUFFL0Isa0JBQUksS0FBSyxRQUFRO0FBQ2YscUJBQUssT0FBTyxZQUFZO0FBQUEsY0FBQTtBQUFBLFlBQzFCLFdBQ1MsTUFBTTtBQUNmLGtCQUFJLGFBQWEsY0FBYyxJQUFJO0FBRW5DLGtCQUFJLE9BQU8sZUFBZSxZQUFZO0FBR3BDLG9CQUFJLGVBQWUsS0FBSyxTQUFTO0FBQy9CLHNCQUFJLFdBQVcsV0FBVyxLQUFLLElBQUk7QUFDbkMsc0JBQUk7QUFFSix5QkFBTyxFQUFFLE9BQU8sU0FBUyxLQUFBLEdBQVEsTUFBTTtBQUNyQyx3QkFBSSxlQUFlLEtBQUssS0FBSyxHQUFHO0FBQzlCLDBDQUFvQixLQUFLLE9BQU8sVUFBVTtBQUFBLG9CQUFBO0FBQUEsa0JBQzVDO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBVUYsaUJBQVMsa0JBQWtCLFNBQVM7QUFDbEM7QUFDRSxnQkFBSSxPQUFPLFFBQVE7QUFFbkIsZ0JBQUksU0FBUyxRQUFRLFNBQVMsVUFBYSxPQUFPLFNBQVMsVUFBVTtBQUNuRTtBQUFBLFlBQUE7QUFHRixnQkFBSTtBQUVKLGdCQUFJLE9BQU8sU0FBUyxZQUFZO0FBQzlCLDBCQUFZLEtBQUs7QUFBQSxZQUFBLFdBQ1IsT0FBTyxTQUFTLGFBQWEsS0FBSyxhQUFhO0FBQUE7QUFBQSxZQUUxRCxLQUFLLGFBQWEsa0JBQWtCO0FBQ2xDLDBCQUFZLEtBQUs7QUFBQSxZQUFBLE9BQ1o7QUFDTDtBQUFBLFlBQUE7QUFHRixnQkFBSSxXQUFXO0FBRWIsa0JBQUksT0FBTyx5QkFBeUIsSUFBSTtBQUN4Qyw2QkFBZSxXQUFXLFFBQVEsT0FBTyxRQUFRLE1BQU0sT0FBTztBQUFBLFlBQUEsV0FDckQsS0FBSyxjQUFjLFVBQWEsQ0FBQywrQkFBK0I7QUFDekUsOENBQWdDO0FBRWhDLGtCQUFJLFFBQVEseUJBQXlCLElBQUk7QUFFekMsb0JBQU0sdUdBQXVHLFNBQVMsU0FBUztBQUFBLFlBQUE7QUFHakksZ0JBQUksT0FBTyxLQUFLLG9CQUFvQixjQUFjLENBQUMsS0FBSyxnQkFBZ0Isc0JBQXNCO0FBQzVGLG9CQUFNLDRIQUFpSTtBQUFBLFlBQUE7QUFBQSxVQUN6STtBQUFBLFFBQ0Y7QUFRRixpQkFBUyxzQkFBc0IsVUFBVTtBQUN2QztBQUNFLGdCQUFJLE9BQU8sT0FBTyxLQUFLLFNBQVMsS0FBSztBQUVyQyxxQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNwQyxrQkFBSSxNQUFNLEtBQUssQ0FBQztBQUVoQixrQkFBSSxRQUFRLGNBQWMsUUFBUSxPQUFPO0FBQ3ZDLGdEQUFnQyxRQUFRO0FBRXhDLHNCQUFNLDRHQUFpSCxHQUFHO0FBRTFILGdEQUFnQyxJQUFJO0FBQ3BDO0FBQUEsY0FBQTtBQUFBLFlBQ0Y7QUFHRixnQkFBSSxTQUFTLFFBQVEsTUFBTTtBQUN6Qiw4Q0FBZ0MsUUFBUTtBQUV4QyxvQkFBTSx1REFBdUQ7QUFFN0QsOENBQWdDLElBQUk7QUFBQSxZQUFBO0FBQUEsVUFDdEM7QUFBQSxRQUNGO0FBR0YsWUFBSSx3QkFBd0IsQ0FBQTtBQUM1QixpQkFBUyxrQkFBa0IsTUFBTSxPQUFPLEtBQUssa0JBQWtCLFFBQVFBLE9BQU07QUFDM0U7QUFDRSxnQkFBSSxZQUFZLG1CQUFtQixJQUFJO0FBR3ZDLGdCQUFJLENBQUMsV0FBVztBQUNkLGtCQUFJLE9BQU87QUFFWCxrQkFBSSxTQUFTLFVBQWEsT0FBTyxTQUFTLFlBQVksU0FBUyxRQUFRLE9BQU8sS0FBSyxJQUFJLEVBQUUsV0FBVyxHQUFHO0FBQ3JHLHdCQUFRO0FBQUEsY0FBQTtBQUdWLGtCQUFJLGFBQWEsMkJBQWlDO0FBRWxELGtCQUFJLFlBQVk7QUFDZCx3QkFBUTtBQUFBLGNBQUEsT0FDSDtBQUNMLHdCQUFRLDRCQUFBO0FBQUEsY0FBNEI7QUFHdEMsa0JBQUk7QUFFSixrQkFBSSxTQUFTLE1BQU07QUFDakIsNkJBQWE7QUFBQSxjQUFBLFdBQ0osUUFBUSxJQUFJLEdBQUc7QUFDeEIsNkJBQWE7QUFBQSxjQUFBLFdBQ0osU0FBUyxVQUFhLEtBQUssYUFBYSxvQkFBb0I7QUFDckUsNkJBQWEsT0FBTyx5QkFBeUIsS0FBSyxJQUFJLEtBQUssYUFBYTtBQUN4RSx1QkFBTztBQUFBLGNBQUEsT0FDRjtBQUNMLDZCQUFhLE9BQU87QUFBQSxjQUFBO0FBR3RCLG9CQUFNLDJJQUFxSixZQUFZLElBQUk7QUFBQSxZQUFBO0FBRzdLLGdCQUFJLFVBQVUsT0FBTyxNQUFNLE9BQU8sS0FBSyxRQUFRQSxLQUFJO0FBR25ELGdCQUFJLFdBQVcsTUFBTTtBQUNuQixxQkFBTztBQUFBLFlBQUE7QUFRVCxnQkFBSSxXQUFXO0FBQ2Isa0JBQUksV0FBVyxNQUFNO0FBRXJCLGtCQUFJLGFBQWEsUUFBVztBQUMxQixvQkFBSSxrQkFBa0I7QUFDcEIsc0JBQUksUUFBUSxRQUFRLEdBQUc7QUFDckIsNkJBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUs7QUFDeEMsd0NBQWtCLFNBQVMsQ0FBQyxHQUFHLElBQUk7QUFBQSxvQkFBQTtBQUdyQyx3QkFBSSxPQUFPLFFBQVE7QUFDakIsNkJBQU8sT0FBTyxRQUFRO0FBQUEsb0JBQUE7QUFBQSxrQkFDeEIsT0FDSztBQUNMLDBCQUFNLHNKQUFnSztBQUFBLGtCQUFBO0FBQUEsZ0JBQ3hLLE9BQ0s7QUFDTCxvQ0FBa0IsVUFBVSxJQUFJO0FBQUEsZ0JBQUE7QUFBQSxjQUNsQztBQUFBLFlBQ0Y7QUFHRjtBQUNFLGtCQUFJLGVBQWUsS0FBSyxPQUFPLEtBQUssR0FBRztBQUNyQyxvQkFBSSxnQkFBZ0IseUJBQXlCLElBQUk7QUFDakQsb0JBQUksT0FBTyxPQUFPLEtBQUssS0FBSyxFQUFFLE9BQU8sU0FBVSxHQUFHO0FBQ2hELHlCQUFPLE1BQU07QUFBQSxnQkFBQSxDQUNkO0FBQ0Qsb0JBQUksZ0JBQWdCLEtBQUssU0FBUyxJQUFJLG9CQUFvQixLQUFLLEtBQUssU0FBUyxJQUFJLFdBQVc7QUFFNUYsb0JBQUksQ0FBQyxzQkFBc0IsZ0JBQWdCLGFBQWEsR0FBRztBQUN6RCxzQkFBSSxlQUFlLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxLQUFLLFNBQVMsSUFBSSxXQUFXO0FBRTdFLHdCQUFNLG1PQUE0UCxlQUFlLGVBQWUsY0FBYyxhQUFhO0FBRTNULHdDQUFzQixnQkFBZ0IsYUFBYSxJQUFJO0FBQUEsZ0JBQUE7QUFBQSxjQUN6RDtBQUFBLFlBQ0Y7QUFHRixnQkFBSSxTQUFTLHFCQUFxQjtBQUNoQyxvQ0FBc0IsT0FBTztBQUFBLFlBQUEsT0FDeEI7QUFDTCxnQ0FBa0IsT0FBTztBQUFBLFlBQUE7QUFHM0IsbUJBQU87QUFBQSxVQUFBO0FBQUEsUUFDVDtBQU1GLGlCQUFTLHdCQUF3QixNQUFNLE9BQU8sS0FBSztBQUNqRDtBQUNFLG1CQUFPLGtCQUFrQixNQUFNLE9BQU8sS0FBSyxJQUFJO0FBQUEsVUFBQTtBQUFBLFFBQ2pEO0FBRUYsaUJBQVMseUJBQXlCLE1BQU0sT0FBTyxLQUFLO0FBQ2xEO0FBQ0UsbUJBQU8sa0JBQWtCLE1BQU0sT0FBTyxLQUFLLEtBQUs7QUFBQSxVQUFBO0FBQUEsUUFDbEQ7QUFHRixZQUFJLE1BQU87QUFHWCxZQUFJLE9BQVE7QUFFWixvQ0FBQSxXQUFtQjtBQUNuQixvQ0FBQSxNQUFjO0FBQ2Qsb0NBQUEsT0FBZTtBQUFBLE1BQUEsR0FDYjtBQUFBLElBQ0Y7Ozs7Ozs7QUNoekNPO0FBQ0xDLGlCQUFBLFVBQWlCQyxtQ0FBQTtBQUFBLElBQ25COzs7O0FDSk8sUUFBTSxnQ0FBZ0MsTUFBTTtBQUMvQyxVQUFNLDBCQUEwQixvQkFBSSxJQUFHO0FBQ3ZDLFVBQU0sOEJBQThCLG9CQUFJLElBQUc7QUFDM0MsVUFBTSxvQkFBb0IsQ0FBQyxXQUFXLGVBQWUsa0JBQWtCO0FBQ25FLGtDQUE0QixJQUFJLFdBQVcsYUFBYTtBQUN4RCw4QkFBd0IsSUFBSSxlQUFlO0FBQUEsUUFDdkMsa0JBQWtCLElBQUksSUFBSSxhQUFhO0FBQUEsUUFDdkMsb0JBQW9CO0FBQUEsTUFDaEMsQ0FBUztBQUNELGFBQU87QUFBQSxJQUNYO0FBQ0EsV0FBTztBQUFBLE1BQ0gsa0JBQWtCLENBQUMsY0FBYztBQUM3QixjQUFNLGdCQUFnQiw0QkFBNEIsSUFBSSxTQUFTO0FBQy9ELFlBQUksQ0FBQyxlQUFlO0FBQ2hCLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGVBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSx3QkFBd0IsQ0FBQyxrQkFBa0I7QUFDdkMsZUFBTyx3QkFBd0IsSUFBSSxhQUFhO0FBQUEsTUFDcEQ7QUFBQSxNQUNBLHlCQUF5QixDQUFDLGVBQWUsYUFBYTtBQUNsRCxjQUFNLG9CQUFvQix3QkFBd0IsSUFBSSxhQUFhO0FBQ25FLFlBQUksQ0FBQyxtQkFBbUI7QUFDcEIsaUJBQU87QUFBQSxRQUNYO0FBQ0EsZUFBTyxrQkFBa0IsaUJBQWlCLElBQUksUUFBUTtBQUFBLE1BQzFEO0FBQUEsTUFDQSwrQkFBK0IsQ0FBQyxrQkFBa0I7QUFDOUMsY0FBTSxvQkFBb0Isd0JBQXdCLElBQUksYUFBYTtBQUNuRSxZQUFJLENBQUMsbUJBQW1CO0FBQ3BCLGlCQUFPLENBQUE7QUFBQSxRQUNYO0FBQ0EsY0FBTSxFQUFFLG1CQUFrQixJQUFLO0FBQy9CLGVBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSx1Q0FBdUMsQ0FBQyxlQUFlLFVBQVUsT0FBTztBQUNwRSxjQUFNLEVBQUUsZ0JBQWdCLENBQUEsRUFBRSxJQUFLO0FBQy9CLGNBQU0sdUJBQXVCQyxNQUFBQSwyQkFBMkIsZUFBZTtBQUFBLFVBQ25FO0FBQUEsUUFDaEIsQ0FBYTtBQUNELGVBQU8sa0JBQWtCLHNCQUFzQixlQUFlLGFBQWE7QUFBQSxNQUMvRTtBQUFBLE1BQ0EsK0NBQStDLENBQUMsZUFBZSxZQUFZO0FBQ3ZFLGNBQU0sRUFBRSxnQkFBZ0IsQ0FBQSxFQUFFLElBQUs7QUFDL0IsY0FBTSxzQkFBc0JBLE1BQUFBLDJCQUEyQixlQUFlO0FBQUEsVUFDbEU7QUFBQSxRQUNoQixDQUFhO0FBR0QsY0FBTSxnQ0FBZ0MsT0FBTyx3QkFBd0IsYUFDL0Qsc0JBQ0EsQ0FBQyxVQUFXQyxrQkFBQUEsSUFBSyxxQkFBcUIsRUFBRSxHQUFHLE1BQUssQ0FBRTtBQUV4RCxlQUFPLE9BQU8sK0JBQStCLFFBQVEsMkJBQTJCO0FBRWhGLGVBQU8sa0JBQWtCLCtCQUErQixlQUFlLGFBQWE7QUFBQSxNQUN4RjtBQUFBLElBQ1I7QUFBQSxFQUNBO0FDeERPLFFBQU0sNkJBQTZCLDhCQUE2QjtBQUN2RSxRQUFNLEVBQUUsdUNBQXVDLDhDQUE2QyxJQUFNO0FBWTdFLHdDQUFzQyxPQUFPO0FBVTNELFFBQU0sU0FBUyxzQ0FBc0MsVUFBVTtBQUFBLElBQ2xFLGVBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDN0IsQ0FBQztBQVF3Qix3Q0FBc0MsV0FBVztBQUN0RCx3Q0FBc0MsTUFBTTtBQVFqQyx3Q0FBc0MsaUJBQWlCO0FBUW5ELHdDQUFzQyxxQkFBcUI7QUFRdkYsUUFBTSxVQUFVLHNDQUFzQyxTQUFTO0FBUy9ELFFBQU0sU0FBUyxzQ0FBc0MsUUFBUTtBQVExQyx3Q0FBc0MsWUFBWTtBQVFsRCx3Q0FBc0MsWUFBWTtBQVNyRSxRQUFNLE9BQU8sc0NBQXNDLE1BQU07QUFRekQsUUFBTSxVQUFVLHNDQUFzQyxTQUFTO0FBUWpELHdDQUFzQyxTQUFTO0FBQUEsSUFDaEUsZUFBZSxDQUFDLFNBQVM7QUFBQSxFQUM3QixDQUFDO0FBUU0sUUFBTSxRQUFRLHNDQUFzQyxPQUFPO0FBUTNELFFBQU0sT0FBTyxzQ0FBc0MsUUFBUTtBQUFBLElBQzlELGVBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDN0IsQ0FBQztBQVFNLFFBQU0sV0FBVyxzQ0FBc0MsVUFBVTtBQUloRCx3Q0FBc0MsVUFBVTtBQVFqRSxRQUFNLGlCQUFpQixzQ0FBc0MsZ0JBQWdCO0FBUXpELHdDQUFzQyxhQUFhO0FBUXZFLFFBQU0sU0FBUyxzQ0FBc0MsUUFBUTtBQVFqRCx3Q0FBc0MsT0FBTztBQUFBLElBQzVELGVBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDN0IsQ0FBQztBQVFNLFFBQU0sT0FBTyxzQ0FBc0MsTUFBTTtBQVE1Qyx3Q0FBc0MsTUFBTTtBQUUzQyx3Q0FBc0MsT0FBTztBQVF2Qyx3Q0FBc0MsYUFBYTtBQVFoRCx3Q0FBc0MsZ0JBQWdCO0FBUTFELHdDQUFzQyxZQUFZO0FBUTdDLHdDQUFzQyxpQkFBaUI7QUFTL0UsUUFBTSxRQUFRLHNDQUFzQyxPQUFPO0FBUXZDLHdDQUFzQyxhQUFhO0FBUXZFLFFBQU0sWUFBWSxzQ0FBc0MsV0FBVztBQVFuRSxRQUFNLFdBQVcsc0NBQXNDLFVBQVU7QUFRakUsUUFBTSxZQUFZLHNDQUFzQyxXQUFXO0FBUW5FLFFBQU0sY0FBYyxzQ0FBc0MsYUFBYTtBQVF2RSxRQUFNLFlBQVksc0NBQXNDLFdBQVc7QUFRL0Msd0NBQXNDLGFBQWE7QUFTdkUsUUFBTSxNQUFNLHNDQUFzQyxLQUFLO0FBUWpDLHdDQUFzQyxlQUFlO0FBUXpELHdDQUFzQyxXQUFXO0FBUS9DLHdDQUFzQyxhQUFhO0FBU3ZFLFFBQU0sT0FBTyxzQ0FBc0MsTUFBTTtBQVF2Qyx3Q0FBc0MsV0FBVztBQVFsRCx3Q0FBc0MsVUFBVTtBQUk3Qyx3Q0FBc0MsYUFBYTtBQVExRCx3Q0FBc0MsTUFBTTtBQVF6RCxRQUFNLFNBQVMsc0NBQXNDLFFBQVE7QUFRN0QsUUFBTSxXQUFXLDhDQUE4QyxZQUFZO0FBQUEsSUFDOUUsNkJBQTZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVF6QixZQUFZLHNDQUFzQyxzQkFBc0I7QUFBQSxRQUNwRSxlQUFlLENBQUMsU0FBUztBQUFBLE1BQ3JDLENBQVM7QUFBQSxJQUNUO0FBQUEsRUFDQSxDQUFDO0FBVW9CLHdDQUFzQyxPQUFPO0FBU3ZDLHdDQUFzQyxhQUFhO0FBU3JELHdDQUFzQyxXQUFXO0FBUzlDLHdDQUFzQyxjQUFjO0FBUXBELHdDQUFzQyxjQUFjO0FBVTNELHdDQUFzQyxPQUFPO0FBU3pDLHdDQUFzQyxXQUFXO0FBUy9DLHdDQUFzQyxhQUFhO0FBUTFELHdDQUFzQyxNQUFNO0FBU3pELFFBQU0sWUFBWSxzQ0FBc0MsV0FBVztBQVE3Qyx3Q0FBc0MsaUJBQWlCO0FBQUEsSUFDaEYsZUFBZSxDQUFDLFNBQVM7QUFBQSxFQUM3QixDQUFDO0FBVXVCLHdDQUFzQyxVQUFVO0FBVS9DLHdDQUFzQyxXQUFXO0FBUy9DLHdDQUFzQyxhQUFhO0FBZTFELHdDQUFzQyxNQUFNO0FBZTdDLHdDQUFzQyxLQUFLO0FBUWxDLHdDQUFzQyxjQUFjO0FBT3pELHdDQUFzQyxTQUFTO0FBUTNDLHdDQUFzQyxhQUFhO0FBUXJELHdDQUFzQyxXQUFXO0FBUzdDLHdDQUFzQyxlQUFlO0FBT3hELHdDQUFzQyxRQUFRO0FBUWhELHdDQUFzQyxVQUFVO0FBSXpDLHdDQUFzQyxpQkFBaUI7QUFDbkQsd0NBQXNDLHFCQUFxQjtBQUM5RCx3Q0FBc0Msa0JBQWtCO0FBQy9ELHdDQUFzQyxXQUFXO0FBQ3ZDLHdDQUFzQyxxQkFBcUI7QUFDcEQsd0NBQXNDLDRCQUE0QjtBQUNsRSx3Q0FBc0MsNEJBQTRCO0FBQzNFLHdDQUFzQyxtQkFBbUI7QUFDM0Qsd0NBQXNDLGlCQUFpQjtBQUN6RCx3Q0FBc0MsZUFBZTtBQUNuRCx3Q0FBc0MsaUJBQWlCO0FBQ3pELHdDQUFzQyxlQUFlO0FBQ3BELHdDQUFzQyxnQkFBZ0I7QUFRdkQsd0NBQXNDLGVBQWU7QUFLekMsd0NBQXNDLDZCQUE2QjtBQUFBLElBQ3hHLGVBQWUsQ0FBQyxTQUFTO0FBQUEsRUFDN0IsQ0FBQztBQUswQyx3Q0FBc0MsK0JBQStCO0FBQUEsSUFDNUcsZUFBZSxDQUFDLFNBQVM7QUFBQSxFQUM3QixDQUFDO0FBVXlCLGdEQUE4QyxjQUFjO0FBQUEsSUFDbEYsNkJBQTZCO0FBQUEsTUFDekIsZUFBZSxzQ0FBc0MseUJBQXlCO0FBQUEsTUFDOUUsa0JBQWtCLHNDQUFzQyw0QkFBNEI7QUFBQSxNQUNwRixNQUFNLHNDQUFzQyxnQkFBZ0I7QUFBQSxNQUM1RCxVQUFVLHNDQUFzQyxvQkFBb0I7QUFBQSxJQUM1RTtBQUFBLEVBQ0EsQ0FBQztBQVE4QixnREFBOEMsbUJBQW1CO0FBQUEsSUFDNUYsNkJBQTZCO0FBQUEsTUFDekIsVUFBVSxzQ0FBc0MseUJBQXlCO0FBQUEsTUFDekUsU0FBUyxzQ0FBc0Msd0JBQXdCO0FBQUEsSUFDL0U7QUFBQSxFQUNBLENBQUM7QUFDdUIsd0NBQXNDLFVBQVU7QUFDL0Msd0NBQXNDLFdBQVc7QUFPcEQsd0NBQXNDLFFBQVE7QUFJekMsd0NBQXNDLGVBQWU7QUFBQSxJQUM1RSxlQUFlLENBQUMsYUFBYSxVQUFVO0FBQUEsRUFDM0MsQ0FBQztBQUlxQix3Q0FBc0MsUUFBUTtBQUk5Qyx3Q0FBc0MsUUFBUTtBQUloRCx3Q0FBc0MsTUFBTTtBQUl4Qyx3Q0FBc0MsVUFBVTtBQUk1Qyx3Q0FBc0MsY0FBYztBQVVsRCx3Q0FBc0MsZ0JBQWdCO0FBVTdELHdDQUFzQyxTQUFTO0FBSTdDLHdDQUFzQyxXQUFXO0FDOXRCMUUsUUFBTSwwQkFBMEJDLFdBQUFBLGNBQWMsSUFBSTtBQXdDZCwwQkFBd0I7QUNkNUQsVUFBUSxPQUFPLENBQUMsRUFBRSx1QkFBdUIsY0FBUTs7QUFDL0MsaUNBQUE7QUFBQSxNQUFDO0FBQUEsTUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBLFVBQVUsUUFBUSxPQUFPO0FBQUEsUUFDekIsU0FBUSxhQUFRLFNBQVIsbUJBQWM7QUFBQSxRQUN0QixTQUFPLGFBQVEsU0FBUixtQkFBYyxVQUFTO0FBQUEsTUFBQTtBQUFBLElBQ2hDO0FBQUEsR0FDRDtBQUVELFFBQU0sOEJBQThCO0FBQ3BDLFFBQU0saUNBQWlDO0FBQ3ZDLFFBQU0sOEJBQThCO0FBQ3BDLFFBQU0sOEJBQThCO0FBeUJwQyxRQUFNLG1CQUFtQztBQUFBLElBQ3ZDLEVBQUUsV0FBVyxTQUFTLFFBQVEsWUFBWSxPQUFPLFFBQUE7QUFBQSxJQUNqRCxFQUFFLFdBQVcsY0FBYyxRQUFRLFlBQVksT0FBTyxlQUFBO0FBQUEsSUFDdEQsRUFBRSxXQUFXLGNBQWMsUUFBUSxZQUFZLE9BQU8sWUFBQTtBQUFBLElBQ3RELEVBQUUsV0FBVyxhQUFhLFFBQVEsWUFBWSxPQUFPLFdBQUE7QUFBQSxJQUNyRCxFQUFFLFdBQVcsY0FBYyxRQUFRLFlBQVksT0FBTyxvQkFBQTtBQUFBLEVBQ3hEO0FBRUEsUUFBTSxnQkFBZ0M7QUFBQSxJQUNwQyxFQUFFLFdBQVcsV0FBVyxRQUFRLFlBQVksT0FBTyxlQUFBO0FBQUEsSUFDbkQsRUFBRSxXQUFXLGFBQWEsUUFBUSxZQUFZLE9BQU8sV0FBQTtBQUFBLElBQ3JELEVBQUUsV0FBVyxVQUFVLFFBQVEsWUFBWSxPQUFPLFNBQUE7QUFBQSxJQUNsRCxFQUFFLFdBQVcsY0FBYyxRQUFRLFlBQVksT0FBTyxZQUFBO0FBQUEsRUFDeEQ7QUFFQSxRQUFNLG1CQUFtQztBQUFBLElBQ3ZDLEVBQUUsV0FBVyxjQUFjLFFBQVEsWUFBWSxPQUFPLGVBQUE7QUFBQSxJQUN0RCxFQUFFLFdBQVcsZ0JBQWdCLFFBQVEsWUFBWSxPQUFPLE9BQUE7QUFBQSxJQUN4RCxFQUFFLFdBQVcsVUFBVSxRQUFRLFlBQVksT0FBTyxTQUFBO0FBQUEsRUFDcEQ7QUFFQSxRQUFNLGtCQUFrQztBQUFBLElBQ3RDLEVBQUUsV0FBVyxhQUFhLFFBQVEsWUFBWSxPQUFPLGVBQUE7QUFBQSxJQUNyRCxFQUFFLFdBQVcsV0FBVyxRQUFRLFlBQVksT0FBTyxVQUFBO0FBQUEsSUFDbkQsRUFBRSxXQUFXLFVBQVUsUUFBUSxZQUFZLE9BQU8sb0JBQUE7QUFBQSxFQUNwRDtBQUVBLFFBQU0saUJBQWlDO0FBQUEsSUFDckMsRUFBRSxXQUFXLFlBQVksUUFBUSxZQUFZLE9BQU8sZUFBQTtBQUFBLElBQ3BELEVBQUUsV0FBVyxjQUFjLFFBQVEsWUFBWSxPQUFPLFdBQUE7QUFBQSxJQUN0RCxFQUFFLFdBQVcsVUFBVSxRQUFRLFlBQVksT0FBTyxrQkFBQTtBQUFBLElBQ2xELEVBQUUsV0FBVyxVQUFVLFFBQVEsWUFBWSxPQUFPLFlBQUE7QUFBQSxFQUNwRDtBQUVBLFFBQU0sbUJBQW1EO0FBQUEsSUFDdkQsU0FBUztBQUFBLElBQ1QsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLHFCQUE2QztBQUFBLElBQ2pELE9BQU87QUFBQSxJQUFXLE9BQU87QUFBQSxJQUFRLE9BQU87QUFBQSxJQUFXLE9BQU87QUFBQSxJQUFVLFFBQVE7QUFBQSxFQUM5RTtBQUVBLFFBQU0sb0JBQTRDO0FBQUEsSUFDaEQsa0JBQThCO0FBQUEsSUFDOUIsNkJBQThCO0FBQUEsSUFDOUIsK0JBQStCO0FBQUEsSUFDL0IsMkJBQStCO0FBQUEsSUFDL0IseUJBQStCO0FBQUEsSUFDL0IsMEJBQStCO0FBQUEsSUFDL0Isa0JBQStCO0FBQUEsSUFDL0Isa0JBQStCO0FBQUEsSUFDL0Isa0JBQStCO0FBQUEsRUFDakM7QUFxQ0EsUUFBTSxtQkFBbUM7QUFBQSxJQUN2QyxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixhQUFhO0FBQUEsSUFDYixpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQixlQUFlLENBQUMsR0FBRyxnQkFBZ0I7QUFBQSxFQUNyQztBQUlBLFFBQU0sbUJBQStDO0FBQUEsSUFDbkQsT0FBTztBQUFBLElBQVMsS0FBSztBQUFBLElBQVcsTUFBTTtBQUFBLElBQVcsTUFBTTtBQUFBLElBQVcsUUFBUTtBQUFBLEVBQzVFO0FBRUEsV0FBUyxXQUFXLFdBQStCLFFBQXlCO0FBQzFFLFFBQUksQ0FBQyxVQUFXLFFBQU87QUFDdkIsV0FBTyxJQUFJLEtBQUssZUFBZSxVQUFVLFFBQVcsZ0JBQWdCLEVBQUUsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDbEc7QUFJQSxXQUFTLGVBQWUsRUFBRSx1QkFBdUIsVUFBVSxRQUFRLFNBS2hFO0FBRUQsVUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSUMsV0FBQUEsU0FBeUIsRUFBRSxRQUFRLE1BQU07QUFDekYsVUFBTSxDQUFDLG9CQUFvQixxQkFBcUIsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQ2xFLFVBQU0sQ0FBQyx3QkFBd0IseUJBQXlCLElBQUlBLFdBQUFBLFNBQXdCLElBQUk7QUFHeEYsVUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSUEsV0FBQUEsU0FBcUMsU0FBUztBQUM5RixVQUFNLENBQUMsa0JBQWtCLG1CQUFtQixJQUFJQSxXQUFBQSxTQUFTLEVBQUU7QUFDM0QsVUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBR2hFLFVBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSUEsV0FBQUEsU0FBeUIsQ0FBQSxDQUFFO0FBQzdELFVBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUlBLFdBQUFBLFNBQXdCLElBQUk7QUFDeEUsVUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUlBLFdBQUFBLFNBQVMsS0FBSztBQUN4RCxVQUFNLENBQUMsbUJBQW1CLG9CQUFvQixJQUFJQSxXQUFBQSxTQUF3QixJQUFJO0FBQzlFLFVBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSUEsV0FBQUEsU0FBeUIsZ0JBQWdCO0FBQzNFLFVBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUlBLFdBQUFBLFNBQVMsS0FBSztBQUM5RCxVQUFNLENBQUMsY0FBYyxlQUFlLElBQUlBLFdBQUFBLFNBQVMsRUFBRTtBQUNuRCxVQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJQSxXQUFBQSxTQUF3QixJQUFJO0FBSTFFLFVBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSUEsV0FBQUEsU0FBaUIsWUFBWTtBQUkvRCxVQUFNLENBQUMsU0FBUyxVQUFVLElBQUlBLFdBQUFBLFNBQXlCLElBQUk7QUFDM0QsVUFBTSxDQUFDLFNBQVMsVUFBVSxJQUFJQSxXQUFBQSxTQUFxQyxXQUFXO0FBRzlFLFVBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSUEsV0FBQUEsU0FBd0IsSUFBSTtBQUNwRSxVQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJQSxXQUFBQSxTQUFTLEtBQUs7QUFDNUQsVUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSUEsV0FBQUEsU0FBdUUsSUFBSTtBQUMzSCxVQUFNLENBQUMsY0FBYyxlQUFlLElBQUlBLFdBQUFBLFNBQVMsS0FBSztBQUd0RCxVQUFNLENBQUMsV0FBVyxZQUFZLElBQUlBLFdBQUFBLFNBQStELENBQUEsQ0FBRTtBQUNuRyxVQUFNLENBQUMsa0JBQWtCLG1CQUFtQixJQUFJQSxXQUFBQSxTQUFTLEtBQUs7QUFDOUQsVUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSUEsV0FBQUEsU0FBd0IsSUFBSTtBQUN4RSxVQUFNLENBQUMsc0JBQXNCLHVCQUF1QixJQUFJQSxXQUFBQSxTQUFTLEVBQUU7QUFDbkUsVUFBTSxDQUFDLHlCQUF5QiwwQkFBMEIsSUFBSUEsV0FBQUEsU0FBeUIsRUFBRSxRQUFRLE1BQU07QUFDdkcsVUFBTSxDQUFDLDJCQUEyQiw0QkFBNEIsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQ2hGLFVBQU0sQ0FBQywrQkFBK0IsZ0NBQWdDLElBQUlBLFdBQUFBLFNBQXdCLElBQUk7QUFDdEcsVUFBTSxDQUFDLDBCQUEwQiwyQkFBMkIsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQzlFLFVBQU0sQ0FBQywyQkFBMkIsNEJBQTRCLElBQUlBLFdBQUFBLFNBQXdGLElBQUk7QUFDOUosVUFBTSxDQUFDLHVCQUF1Qix3QkFBd0IsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQ3hFLFVBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUlBLFdBQUFBLFNBQXlCLElBQUk7QUFDN0UsVUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQzlELFVBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLElBQUlBLFdBQUFBLFNBQVMsRUFBRTtBQUNyRSxVQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJQSxXQUFBQSxTQUF3QixJQUFJO0FBR3hFLFVBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSUEsV0FBQUEsU0FBcUIsQ0FBQSxDQUFFO0FBQzNELFVBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQ2xELFVBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSUEsV0FBQUEsU0FBd0IsSUFBSTtBQUM1RCxVQUFNLENBQUMsY0FBYyxlQUFlLElBQUlBLFdBQUFBLFNBQW1CLENBQUEsQ0FBRTtBQUM3RCxVQUFNLENBQUMsY0FBYyxlQUFlLElBQUlBLFdBQUFBLFNBQXdCLElBQUk7QUFDcEUsVUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJQSxXQUFBQSxTQUFTLEtBQUs7QUFDbEQsVUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQzVELFVBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLElBQUlBLFdBQUFBLFNBQVMsS0FBSztBQUc1RCxVQUFNLENBQUMsb0JBQW9CLHFCQUFxQixJQUFJQSxXQUFBQSxTQUFTLDJCQUEyQjtBQUN4RixVQUFNLENBQUMscUJBQXFCLHNCQUFzQixJQUFJQSxXQUFBQSxTQUFTLElBQUk7QUFDbkUsVUFBTSxDQUFDLHNCQUFzQix1QkFBdUIsSUFBSUEsV0FBQUEsU0FBUyw4QkFBOEI7QUFDL0YsVUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSUEsV0FBQUEsU0FBUywyQkFBMkI7QUFDcEYsVUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUlBLFdBQUFBLFNBQTZCLEtBQUs7QUFDNUUsVUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSUEsV0FBQUEsU0FBeUMsQ0FBQSxDQUFFO0FBQ3ZGLFVBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLElBQUlBLFdBQUFBLFNBQVMsS0FBSztBQUN4RSxVQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJQSxXQUFBQSxTQUFtQixDQUFBLENBQUU7QUFDbkUsVUFBTSxDQUFDLDRCQUE0Qiw2QkFBNkIsSUFBSUEsV0FBQUEsU0FBeUIsRUFBRSxRQUFRLE1BQU07QUFDN0csVUFBTSxDQUFDLHNCQUFzQix1QkFBdUIsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQ3RFLFVBQU0sQ0FBQywwQkFBMEIsMkJBQTJCLElBQUlBLFdBQUFBLFNBQXdCLElBQUk7QUFHNUYsVUFBTSxVQUFVLGdCQUFnQjtBQUFBLE1BQzlCLHNCQUFzQixzQkFBc0IsdUJBQXVCO0FBQUEsTUFDbkUsbUJBQW1CLGlCQUFpQixNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUEsTUFBSyxFQUFFLEtBQUEsQ0FBTSxFQUFFLE9BQU8sT0FBTztBQUFBLE1BQ2hGLFNBQVMsa0JBQWtCLGFBQWEsa0JBQWtCLENBQUE7QUFBQSxJQUFDLENBQzVEO0FBR0QsVUFBTSxrQkFBa0IsWUFBWSxPQUFPLFlBQVksQ0FBQyxHQUFHLFNBQVMsRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNO0FBQ25GLFVBQUksTUFBYztBQUNsQixVQUFJLFlBQVksUUFBZTtBQUFFLGVBQU8sRUFBRTtBQUFXLGVBQU8sRUFBRTtBQUFBLE1BQVcsV0FDaEUsWUFBWSxVQUFVO0FBQUUsZUFBTyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCO0FBQUksZUFBTyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCO0FBQUEsTUFBSSxXQUMxSyxZQUFZLFVBQVU7QUFBRSxlQUFPLEVBQUUsVUFBVSxXQUFXO0FBQVksZUFBTyxFQUFFLFVBQVUsV0FBVztBQUFBLE1BQVksT0FDdEY7QUFBRSxlQUFPLEVBQUUsYUFBYTtBQUFJLGVBQU8sRUFBRSxhQUFhO0FBQUEsTUFBSTtBQUNyRixZQUFNLE1BQU0sS0FBSyxjQUFjLElBQUk7QUFDbkMsYUFBTyxZQUFZLGNBQWMsTUFBTSxDQUFDO0FBQUEsSUFDMUMsQ0FBQztBQUdEQyxlQUFBQSxVQUFVLE1BQU07QUFDZCw0QkFBc0I7QUFBQSxRQUNwQixNQUFNO0FBQUEsUUFDTixZQUFZLEVBQUUsUUFBUSxlQUFBO0FBQUEsUUFDdEIsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDZixjQUFNLElBQUksSUFBSSxZQUFZLENBQUE7QUFDMUIsWUFBSSxFQUFFLE1BQU8sbUJBQWtCLEVBQUUsS0FBSztBQUN0QyxxQkFBYSxFQUFFLGFBQWEsRUFBRTtBQUU5Qiw4QkFBc0I7QUFBQSxVQUNwQixNQUFNO0FBQUEsVUFDTixZQUFZLEVBQUUsUUFBUSxtQkFBbUIsZUFBZSxDQUFDLDJCQUEyQixFQUFBO0FBQUEsVUFDcEYsa0JBQWtCLENBQUE7QUFBQSxRQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFNBQWM7O0FBQ3JCLGdCQUFNLFVBQVMsd0NBQU0sYUFBTixtQkFBZ0IsZUFBaEIsbUJBQTZCO0FBQzVDLDhCQUFvQixVQUFVLEVBQUUsUUFBUSxNQUFBLENBQU87QUFBQSxRQUNqRCxDQUFDLEVBQUUsTUFBTSxNQUFNO0FBQ2IsOEJBQW9CLEVBQUUsUUFBUSxPQUFPO0FBQUEsUUFDdkMsQ0FBQztBQUFBLE1BQ0gsQ0FBQyxFQUFFLE1BQU0sTUFBTTtBQUNiLDRCQUFvQixFQUFFLFFBQVEsT0FBTztBQUFBLE1BQ3ZDLENBQUM7QUFBQSxJQUNILEdBQUcsQ0FBQSxDQUFFO0FBR0xBLGVBQUFBLFVBQVUsTUFBTTtBQUNkLFVBQUksY0FBYyxhQUFjO0FBQ2hDLFVBQUksVUFBVSxTQUFTLEtBQUssaUJBQWtCO0FBQzlDLDBCQUFvQixJQUFJO0FBQ3hCLHdCQUFrQixJQUFJO0FBQ3RCLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLGVBQUE7QUFBQSxRQUN0QixrQkFBa0IsQ0FBQTtBQUFBLE1BQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsUUFBUTtBQUNmLFlBQUksQ0FBQyxJQUFJLFVBQVU7QUFBRSw0QkFBa0IsMEJBQTBCO0FBQUc7QUFBQSxRQUFRO0FBQzVFLGNBQU0sSUFBSSxJQUFJO0FBQ2QsWUFBSSxFQUFFLE9BQU87QUFBRSw0QkFBa0IsRUFBRSxLQUFLO0FBQUcsdUJBQWEsQ0FBQSxDQUFFO0FBQUc7QUFBQSxRQUFRO0FBQ3JFLGNBQU0sMkJBQVcsSUFBQTtBQUNqQixjQUFNLFNBQVMsRUFBRSxhQUFhLENBQUEsR0FBSSxPQUFPLENBQUMsTUFBZ0M7QUFDeEUsY0FBSSxLQUFLLElBQUksRUFBRSxZQUFZLEVBQUcsUUFBTztBQUNyQyxlQUFLLElBQUksRUFBRSxZQUFZO0FBQ3ZCLGlCQUFPO0FBQUEsUUFDVCxDQUFDO0FBQ0QscUJBQWEsS0FBSztBQUNsQixlQUFPLHNCQUFzQjtBQUFBLFVBQzNCLE1BQU07QUFBQSxVQUNOLFlBQVksRUFBRSxRQUFRLG1CQUFtQixlQUFlLENBQUMsMkJBQTJCLEVBQUE7QUFBQSxVQUNwRixrQkFBa0IsQ0FBQTtBQUFBLFFBQUMsQ0FDcEI7QUFBQSxNQUNILENBQUMsRUFBRSxLQUFLLENBQUMsU0FBYzs7QUFDckIsY0FBTSxVQUFTLHdDQUFNLGFBQU4sbUJBQWdCLGVBQWhCLG1CQUE2QjtBQUM1QyxtQ0FBMkIsVUFBVSxFQUFFLFFBQVEsTUFBQSxDQUFPO0FBQ3RELGVBQU8sc0JBQXNCO0FBQUEsVUFDM0IsTUFBTTtBQUFBLFVBQ04sWUFBWSxFQUFFLFFBQVEseUJBQUE7QUFBQSxVQUN0QixrQkFBa0IsQ0FBQTtBQUFBLFFBQUMsQ0FDcEI7QUFBQSxNQUNILENBQUMsRUFBRSxLQUFLLENBQUMsU0FBYzs7QUFDckIsY0FBTSxLQUFJLGtDQUFNLGFBQU4sbUJBQWdCO0FBQzFCLDRCQUFvQixJQUFJLEVBQUUsVUFBVSxLQUFLO0FBQUEsTUFDM0MsQ0FBQyxFQUFFLE1BQU0sTUFBTTtBQUNiLG1DQUEyQixFQUFFLFFBQVEsT0FBTztBQUM1Qyw0QkFBb0IsS0FBSztBQUFBLE1BQzNCLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDZiw0QkFBb0IsS0FBSztBQUFBLE1BQzNCLENBQUM7QUFBQSxJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFHZEEsZUFBQUEsVUFBVSxNQUFNO0FBQ2QsVUFBSSxjQUFjLFFBQVM7QUFDM0IsVUFBSSwyQkFBMkIsV0FBVyxNQUFNO0FBQzlDLDhCQUFzQjtBQUFBLFVBQ3BCLE1BQU07QUFBQSxVQUNOLFlBQVksRUFBRSxRQUFRLG1CQUFtQixlQUFlLENBQUMsb0JBQW9CLEVBQUE7QUFBQSxVQUM3RSxrQkFBa0IsQ0FBQTtBQUFBLFFBQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsUUFBYTs7QUFDcEIsZ0JBQU0sVUFBUyxzQ0FBSyxhQUFMLG1CQUFlLGVBQWYsbUJBQTRCO0FBQzNDLHdDQUE4QixVQUFVLEVBQUUsUUFBUSxNQUFBLENBQU87QUFBQSxRQUMzRCxDQUFDLEVBQUUsTUFBTSxNQUFNO0FBQ2Isd0NBQThCLEVBQUUsUUFBUSxPQUFPO0FBQUEsUUFDakQsQ0FBQztBQUFBLE1BQ0g7QUFDQSxVQUFJLGVBQWUsV0FBVyxLQUFLLENBQUMsdUJBQXVCO0FBQ3pELGlDQUF5QixJQUFJO0FBQzdCLDhCQUFzQjtBQUFBLFVBQ3BCLE1BQU07QUFBQSxVQUNOLFlBQVksRUFBRSxRQUFRLFdBQUE7QUFBQSxVQUN0QixrQkFBa0IsQ0FBQTtBQUFBLFFBQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsUUFBYTs7QUFDcEIsOEJBQWtCLGdDQUFLLGFBQUwsbUJBQWUsVUFBUyxDQUFBLENBQUU7QUFBQSxRQUM5QyxDQUFDLEVBQUUsTUFBTSxNQUFNO0FBQ2IsNEJBQWtCLENBQUEsQ0FBRTtBQUFBLFFBQ3RCLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDZixtQ0FBeUIsS0FBSztBQUFBLFFBQ2hDLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixHQUFHLENBQUMsU0FBUyxDQUFDO0FBR2QsYUFBUyxhQUFhLE9BQWdCO0FBQ3BDLG9CQUFjLElBQUk7QUFDbEIsa0JBQVksSUFBSTtBQUNoQiw0QkFBc0I7QUFBQSxRQUNwQixNQUFNO0FBQUEsUUFDTixZQUFZLEVBQUUsUUFBUSxrQkFBQTtBQUFBLFFBQ3RCLGtCQUFrQixDQUFBO0FBQUEsTUFBQyxDQUNwQixFQUFFLEtBQUssQ0FBQyxRQUFRO0FBQ2YsY0FBTSxJQUFJLElBQUksWUFBWSxDQUFBO0FBQzFCLFlBQUksRUFBRSxPQUFPO0FBQUUsc0JBQVksdUJBQXVCLEVBQUUsS0FBSyxFQUFFO0FBQUcsaUJBQU87QUFBQSxRQUFNO0FBQzNFLGVBQU8sc0JBQXNCO0FBQUEsVUFDM0IsTUFBTTtBQUFBLFVBQ04sWUFBWSxFQUFFLFFBQVEsaUJBQWlCLEdBQUksUUFBUSxFQUFFLE1BQUEsSUFBVSxHQUFDO0FBQUEsVUFDaEUsa0JBQWtCLENBQUE7QUFBQSxRQUFDLENBQ3BCO0FBQUEsTUFDSCxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQWE7QUFDcEIsWUFBSSxDQUFDLElBQUs7QUFDVixjQUFNLElBQUksSUFBSSxZQUFZLENBQUE7QUFDMUIsWUFBSSxFQUFFLE9BQU87QUFBRSxzQkFBWSxFQUFFLEtBQUs7QUFBRztBQUFBLFFBQVE7QUFDN0Msc0JBQWMsRUFBRSxXQUFXLEVBQUU7QUFDN0Isc0JBQWMsRUFBRSxXQUFXLEtBQUs7QUFDaEMsd0JBQWdCLEVBQUUsYUFBYSxJQUFJO0FBQUEsTUFDckMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFXO0FBQ25CLHFCQUFZLHVCQUFHLFlBQVcsb0JBQW9CO0FBQUEsTUFDaEQsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUNmLHNCQUFjLEtBQUs7QUFBQSxNQUNyQixDQUFDO0FBQUEsSUFDSDtBQUVBQSxlQUFBQSxVQUFVLE1BQU07QUFDZCxVQUFJLGNBQWMsTUFBTztBQUN6QixVQUFJLFdBQVk7QUFDaEIsc0JBQWdCLENBQUEsQ0FBRTtBQUNsQixtQkFBQTtBQUFBLElBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUVkLGFBQVMsb0JBQW9CO0FBQzNCLFVBQUksQ0FBQyxhQUFjO0FBQ25CLHNCQUFnQixDQUFBLE1BQUssQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO0FBQ3pDLG1CQUFhLFlBQVk7QUFBQSxJQUMzQjtBQUVBLGFBQVMsb0JBQW9CO0FBQzNCLFlBQU0sUUFBUSxDQUFDLEdBQUcsWUFBWTtBQUM5QixZQUFNLElBQUE7QUFDTixZQUFNLE9BQU8sTUFBTSxNQUFNLFNBQVMsQ0FBQztBQUNuQyxzQkFBZ0IsS0FBSztBQUNyQixtQkFBYSxJQUFJO0FBQUEsSUFDbkI7QUFFQSxhQUFTLGlCQUFpQjtBQUN4Qix5QkFBbUIsSUFBSTtBQUN2Qiw0QkFBc0I7QUFBQSxRQUNwQixNQUFNO0FBQUEsUUFDTixZQUFZLEVBQUUsUUFBUSxXQUFBO0FBQUEsUUFDdEIsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDZixjQUFNLElBQUksSUFBSSxZQUFZLENBQUE7QUFDMUIsWUFBSSxFQUFFLE9BQU87QUFBRSxzQkFBWSxFQUFFLEtBQUs7QUFBRztBQUFBLFFBQVE7QUFDN0Msc0JBQWMsQ0FBQSxDQUFFO0FBQ2hCLHdCQUFnQixDQUFBLENBQUU7QUFDbEIsc0JBQWMsS0FBSztBQUNuQix3QkFBZ0IsSUFBSTtBQUNwQiwyQkFBbUIsS0FBSztBQUFBLE1BQzFCLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBVztBQUNuQixxQkFBWSx1QkFBRyxZQUFXLHFCQUFxQjtBQUFBLE1BQ2pELENBQUMsRUFBRSxRQUFRLE1BQU07QUFDZiwyQkFBbUIsS0FBSztBQUFBLE1BQzFCLENBQUM7QUFBQSxJQUNIO0FBS0EsYUFBUyxnQ0FBZ0M7QUFDdkMsVUFBSSxpQkFBaUIsV0FBVyxLQUFNO0FBQ3RDLDBCQUFvQixFQUFFLFFBQVEsTUFBTTtBQUNwQyw0QkFBc0I7QUFBQSxRQUNwQixNQUFNO0FBQUEsUUFDTixZQUFZLEVBQUUsUUFBUSxtQkFBbUIsZUFBZSxDQUFDLDJCQUEyQixFQUFBO0FBQUEsUUFDcEYsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQWE7O0FBQ3BCLGNBQU0sVUFBUyxlQUFJLGFBQUosbUJBQWMsZUFBZCxtQkFBMkI7QUFDMUMsNEJBQW9CLFVBQVUsRUFBRSxRQUFRLE1BQUEsQ0FBTztBQUFBLE1BQ2pELENBQUMsRUFBRSxNQUFNLE1BQU07QUFDYiw0QkFBb0IsRUFBRSxRQUFRLE9BQU87QUFBQSxNQUN2QyxDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsaUNBQWlDO0FBQ3hDLDRCQUFzQixJQUFJO0FBQzFCLGdDQUEwQixJQUFJO0FBQzlCLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLG9CQUFvQixvQkFBb0IsNkJBQTZCLHNCQUFzQixHQUFBO0FBQUEsUUFDakgsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDZixjQUFNLEVBQUUsVUFBVSxJQUFJLFNBQVMsQ0FBQSxNQUFPLElBQUksWUFBWSxDQUFBO0FBQ3RELDhCQUFzQixLQUFLO0FBQzNCLFlBQUksT0FBTyxXQUFXLEdBQUc7QUFDdkIsb0NBQTBCLFFBQVEsU0FBUyxzQkFBc0IsMEJBQTBCO0FBQzNGLHdDQUFBO0FBQUEsUUFDRixPQUFPO0FBQ0wsb0NBQTBCLFVBQVUsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFO0FBQUEsUUFDdkQ7QUFBQSxNQUNGLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUTtBQUNoQiw4QkFBc0IsS0FBSztBQUMzQixrQ0FBMEIsVUFBVSxJQUFJLE9BQU8sRUFBRTtBQUFBLE1BQ25ELENBQUM7QUFBQSxJQUNIO0FBRUEsYUFBUyxtQ0FBbUM7QUFDMUMsOEJBQXdCLElBQUk7QUFDNUIsa0NBQTRCLElBQUk7QUFDaEMsNEJBQXNCO0FBQUEsUUFDcEIsTUFBTTtBQUFBLFFBQ04sWUFBWSxFQUFFLFFBQVEsb0JBQW9CLG9CQUFvQixJQUFJLHFCQUFBO0FBQUEsUUFDbEUsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDZixjQUFNLEVBQUUsVUFBVSxJQUFJLFNBQVMsQ0FBQSxNQUFPLElBQUksWUFBWSxDQUFBO0FBQ3RELFlBQUksT0FBTyxXQUFXLEdBQUc7QUFDdkIsaUJBQU8sc0JBQXNCO0FBQUEsWUFDM0IsTUFBTTtBQUFBLFlBQ04sWUFBWSxFQUFFLFFBQVEsbUJBQW1CLGVBQWUsQ0FBQyxvQkFBb0IsRUFBQTtBQUFBLFlBQzdFLGtCQUFrQixDQUFBO0FBQUEsVUFBQyxDQUNwQixFQUFFLEtBQUssQ0FBQyxTQUFjOztBQUNyQixrQkFBTSxVQUFTLHdDQUFNLGFBQU4sbUJBQWdCLGVBQWhCLG1CQUE2QjtBQUM1QywwQ0FBOEIsVUFBVSxFQUFFLFFBQVEsS0FBQSxDQUFNO0FBQUEsVUFDMUQsQ0FBQztBQUFBLFFBQ0gsT0FBTztBQUNMLHNDQUE0QixVQUFVLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUFBLFFBQ3pEO0FBQUEsTUFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVE7QUFDaEIsb0NBQTRCLFVBQVUsSUFBSSxPQUFPLEVBQUU7QUFBQSxNQUNyRCxDQUFDLEVBQUUsUUFBUSxNQUFNO0FBQ2YsZ0NBQXdCLEtBQUs7QUFBQSxNQUMvQixDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsdUJBQXVCO0FBQzlCLDJCQUFxQixJQUFJO0FBQ3pCLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLGlCQUFBO0FBQUEsUUFDdEIsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDZixjQUFNLElBQUksSUFBSTtBQUNkLDZCQUFvQix1QkFBRyxhQUFZLE9BQU8sT0FBTztBQUNqRCw2QkFBb0IsdUJBQUcsYUFBWSxLQUFLLFdBQVUsdUJBQUcsV0FBVSxTQUFTLFdBQVUsdUJBQUcsVUFBUyxNQUFNLFlBQVcsdUJBQUcsZ0JBQWUsS0FBSyxFQUFFO0FBQUEsTUFDMUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFhO0FBQ3JCLDRCQUFvQixPQUFPO0FBQzNCLDZCQUFvQiwyQkFBSyxZQUFXLHNCQUFzQjtBQUFBLE1BQzVELENBQUMsRUFBRSxRQUFRLE1BQU07QUFDZiw2QkFBcUIsS0FBSztBQUFBLE1BQzVCLENBQUM7QUFBQSxJQUNIO0FBRUEsYUFBUyx5QkFBeUI7QUFDaEMsNEJBQXNCO0FBQUEsUUFDcEIsTUFBTTtBQUFBLFFBQ04sWUFBWSxFQUFFLFFBQVEsa0JBQUE7QUFBQSxRQUN0QixrQkFBa0IsQ0FBQTtBQUFBLE1BQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsUUFBUTs7QUFDZiwwQkFBZ0IsU0FBSSxhQUFKLG1CQUFjLFVBQVMsSUFBSTtBQUFBLE1BQzdDLENBQUM7QUFBQSxJQUNIO0FBRUEsbUJBQWUsb0JBQW9CO0FBQ2pDLHlCQUFtQixJQUFJO0FBQ3ZCLHNCQUFnQixLQUFLO0FBQ3JCLDBCQUFvQixFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsUUFBUSxHQUFHO0FBQzFELFVBQUksU0FBd0I7QUFDNUIsVUFBSSxnQkFBZ0IsR0FBRyxlQUFlLEdBQUcsY0FBYztBQUN2RCxhQUFPLE1BQU07QUFDWCxjQUFNLE1BQU0sTUFBTSxzQkFBc0I7QUFBQSxVQUN0QyxNQUFNO0FBQUEsVUFDTixZQUFZLEVBQUUsUUFBUSxvQkFBb0IsUUFBUSxtQkFBQTtBQUFBLFVBQ2xELGtCQUFrQixDQUFBO0FBQUEsUUFBQyxDQUNwQjtBQUNELGNBQU0sUUFBUSxJQUFJLFlBQVksQ0FBQTtBQUM5Qix5QkFBaUIsTUFBTSxZQUFZO0FBQ25DLHdCQUFnQixNQUFNLFdBQVc7QUFDakMsd0JBQWdCLE1BQU0sVUFBVSxDQUFBLEdBQUk7QUFDcEMsaUJBQVMsTUFBTSxVQUFVO0FBQ3pCLDRCQUFvQixFQUFFLFVBQVUsZUFBZSxTQUFTLGNBQWMsUUFBUSxhQUFhO0FBQzNGLFlBQUksTUFBTSxRQUFRLENBQUMsT0FBUTtBQUFBLE1BQzdCO0FBQ0EseUJBQW1CLEtBQUs7QUFDeEIsc0JBQWdCLElBQUk7QUFBQSxJQUN0QjtBQUVBLGFBQVMsZ0NBQWdDO0FBQ3ZDLG1DQUE2QixJQUFJO0FBQ2pDLHVDQUFpQyxJQUFJO0FBQ3JDLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLDJCQUEyQixjQUFjLDZCQUE2QixNQUFBO0FBQUEsUUFDNUYsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7QUFDZixjQUFNLEVBQUUsVUFBVSxJQUFJLFNBQVMsQ0FBQSxNQUFPLElBQUksWUFBWSxDQUFBO0FBQ3RELFlBQUksT0FBTyxXQUFXLEdBQUc7QUFDdkIsMkNBQWlDLFFBQVEsU0FBUyxzQkFBc0IsMEJBQTBCO0FBQ2xHLGdDQUFzQjtBQUFBLFlBQ3BCLE1BQU07QUFBQSxZQUNOLFlBQVksRUFBRSxRQUFRLG1CQUFtQixlQUFlLENBQUMsMkJBQTJCLEVBQUE7QUFBQSxZQUNwRixrQkFBa0IsQ0FBQTtBQUFBLFVBQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsU0FBYzs7QUFDckIsa0JBQU0sVUFBUyx3Q0FBTSxhQUFOLG1CQUFnQixlQUFoQixtQkFBNkI7QUFDNUMsdUNBQTJCLFVBQVUsRUFBRSxRQUFRLE1BQUEsQ0FBTztBQUFBLFVBQ3hELENBQUM7QUFBQSxRQUNILE9BQU87QUFDTCwyQ0FBaUMsVUFBVSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUU7QUFBQSxRQUM5RDtBQUFBLE1BQ0YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRO0FBQ2hCLHlDQUFpQyxVQUFVLElBQUksT0FBTyxFQUFFO0FBQUEsTUFDMUQsQ0FBQyxFQUFFLFFBQVEsTUFBTTtBQUNmLHFDQUE2QixLQUFLO0FBQUEsTUFDcEMsQ0FBQztBQUFBLElBQ0g7QUFFQSxhQUFTLHNCQUFzQixRQUFpQjtBQUM5QywwQkFBb0IsSUFBSTtBQUN4Qix3QkFBa0IsSUFBSTtBQUN0Qiw0QkFBc0I7QUFBQSxRQUNwQixNQUFNO0FBQUEsUUFDTixZQUFZLEVBQUUsUUFBUSx1QkFBdUIsUUFBUSxjQUFjLHVCQUF1QixNQUFBO0FBQUEsUUFDMUYsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7O0FBQ2YsYUFBSSxTQUFJLGFBQUosbUJBQWMsT0FBTztBQUFFLDRCQUFrQixJQUFJLFNBQVMsS0FBSztBQUFHO0FBQUEsUUFBUTtBQUMxRSw4QkFBb0IsU0FBSSxhQUFKLG1CQUFjLFlBQVcsTUFBTTtBQUFBLE1BQ3JELENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxrQkFBa0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUN6QyxRQUFRLE1BQU0sb0JBQW9CLEtBQUssQ0FBQztBQUFBLElBQzdDO0FBRUEsbUJBQWUsNkJBQTZCO0FBQzFDLGtDQUE0QixJQUFJO0FBQ2hDLCtCQUF5QixLQUFLO0FBQzlCLG1DQUE2QixFQUFFLFNBQVMsR0FBRyxVQUFVLEdBQUcsU0FBUyxHQUFHLFFBQVEsR0FBRztBQUMvRSxVQUFJLFNBQXdCO0FBQzVCLFVBQUksZUFBZSxHQUFHLGdCQUFnQixHQUFHLGVBQWUsR0FBRyxjQUFjO0FBQ3pFLGFBQU8sTUFBTTtBQUNYLGNBQU0sTUFBTSxNQUFNLHNCQUFzQjtBQUFBLFVBQ3RDLE1BQU07QUFBQSxVQUNOLFlBQVk7QUFBQSxZQUNWLFFBQVE7QUFBQSxZQUNSO0FBQUEsWUFDQSxjQUFjO0FBQUEsWUFDZCxtQkFBbUI7QUFBQSxZQUNuQjtBQUFBLFVBQUE7QUFBQSxVQUVGLGtCQUFrQixDQUFBO0FBQUEsUUFBQyxDQUNwQjtBQUNELGNBQU0sUUFBUSxJQUFJLFlBQVksQ0FBQTtBQUM5Qix3QkFBZ0IsTUFBTSxXQUFXO0FBQ2pDLHlCQUFpQixNQUFNLFlBQVk7QUFDbkMsd0JBQWdCLE1BQU0sV0FBVztBQUNqQyxjQUFNLGNBQWMsTUFBTSxVQUFVLENBQUE7QUFDcEMsdUJBQWUsWUFBWTtBQUMzQixpQkFBUyxNQUFNLFVBQVU7QUFDekIscUNBQTZCLEVBQUUsU0FBUyxjQUFjLFVBQVUsZUFBZSxTQUFTLGNBQWMsUUFBUSxhQUFhO0FBQzNILFlBQUksTUFBTSxRQUFRLENBQUMsT0FBUTtBQUFBLE1BQzdCO0FBQ0Esa0NBQTRCLEtBQUs7QUFDakMsK0JBQXlCLElBQUk7QUFBQSxJQUMvQjtBQUVBLGFBQVMsc0JBQXNCO0FBQzdCLHdCQUFrQixJQUFJO0FBQ3RCLG1CQUFhLENBQUEsQ0FBRTtBQUNmLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLGVBQUE7QUFBQSxRQUN0QixrQkFBa0IsQ0FBQTtBQUFBLE1BQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsUUFBUTtBQUNmLGNBQU0sSUFBSSxJQUFJLFlBQVksQ0FBQTtBQUMxQixZQUFJLEVBQUUsTUFBTyxtQkFBa0IsRUFBRSxLQUFLO0FBQ3RDLHFCQUFhLEVBQUUsYUFBYSxFQUFFO0FBQUEsTUFDaEMsQ0FBQyxFQUFFLE1BQU0sTUFBTTtBQUNiLDBCQUFrQiwwQkFBMEI7QUFBQSxNQUM5QyxDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMscUJBQXFCLFFBQWdCLFNBQWtCO0FBQzlELDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLGtCQUFrQixRQUFRLFNBQVMsTUFBQTtBQUFBLFFBQ3pELGtCQUFrQixDQUFBO0FBQUEsTUFBQyxDQUNwQixFQUFFLEtBQUssTUFBTSxxQkFBcUI7QUFBQSxJQUNyQztBQUVBLGFBQVMscUJBQXFCLFFBQWdCLGNBQXVCO0FBQ25FLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVksRUFBRSxRQUFRLGtCQUFrQixRQUFRLGNBQWMsTUFBQTtBQUFBLFFBQzlELGtCQUFrQixDQUFBO0FBQUEsTUFBQyxDQUNwQixFQUFFLEtBQUssTUFBTTtBQUNaLDJCQUFtQixJQUFJO0FBQ3ZCLDRCQUFBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsbUJBQW1CLEdBQWlCO0FBQzNDLDJCQUFxQixFQUFFLEVBQUU7QUFDekIsdUJBQWlCLElBQUk7QUFDckIsc0JBQWdCLFlBQVk7QUFDNUIsNEJBQXNCO0FBQUEsUUFDcEIsTUFBTTtBQUFBLFFBQ04sWUFBWSxFQUFFLFFBQVEscUJBQXFCLFFBQVEsRUFBRSxHQUFBO0FBQUEsUUFDckQsa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7O0FBQ2YsY0FBTSxPQUFNLFNBQUksYUFBSixtQkFBYztBQUMxQixxQkFBYTtBQUFBLFVBQ1gsWUFBVywyQkFBSyxjQUFhLEVBQUU7QUFBQSxVQUMvQixnQkFBZSwyQkFBSyxrQkFBaUI7QUFBQSxVQUNyQyxjQUFhLDJCQUFLLGdCQUFlO0FBQUEsVUFDakMsa0JBQWlCLDJCQUFLLG9CQUFtQjtBQUFBLFVBQ3pDLGlCQUFnQiwyQkFBSyxtQkFBa0I7QUFBQSxVQUN2QyxnQkFBZSwyQkFBSyxrQkFBaUIsQ0FBQyxHQUFHLGdCQUFnQjtBQUFBLFFBQUEsQ0FDMUQ7QUFDRCx3QkFBZ0IsRUFBRTtBQUFBLE1BQ3BCLENBQUMsRUFBRSxNQUFNLE1BQU07QUFDYixxQkFBYSxFQUFFLEdBQUcsa0JBQWtCLFdBQVcsRUFBRSxXQUFXO0FBQzVELHdCQUFnQixFQUFFO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0g7QUFFQSxhQUFTLGlCQUFpQjtBQUN4Qix1QkFBaUIsS0FBSztBQUN0QiwyQkFBcUIsSUFBSTtBQUN6QixtQkFBYSxnQkFBZ0I7QUFDN0Isc0JBQWdCLEVBQUU7QUFBQSxJQUNwQjtBQUVBLGFBQVMsMEJBQTBCLFNBQWtCO0FBQ25ELDBCQUFvQixJQUFJO0FBQ3hCLHNCQUFnQixFQUFFO0FBQ2xCLDRCQUFzQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxVQUNWLFFBQVE7QUFBQSxVQUNSLFdBQVcsVUFBVTtBQUFBLFVBQ3JCLGVBQWUsVUFBVTtBQUFBLFVBQ3pCLGFBQWEsVUFBVTtBQUFBLFVBQ3ZCLGlCQUFpQixVQUFVLG1CQUFtQjtBQUFBLFVBQzlDLGdCQUFnQixVQUFVLGtCQUFrQjtBQUFBLFVBQzVDLGVBQWUsVUFBVTtBQUFBLFVBQ3pCO0FBQUEsVUFDQTtBQUFBLFFBQUE7QUFBQSxRQUVGLGtCQUFrQixDQUFBO0FBQUEsTUFBQyxDQUNwQixFQUFFLEtBQUssQ0FBQyxRQUFROztBQUNmLGFBQUksU0FBSSxhQUFKLG1CQUFjLE9BQU87QUFDdkIsMEJBQWdCLFVBQVUsSUFBSSxTQUFTLEtBQUssRUFBRTtBQUFBLFFBQ2hELE9BQU87QUFDTCwwQkFBZ0IsYUFBWSxTQUFJLGFBQUosbUJBQWMsSUFBSSxJQUFJO0FBQ2xELHlCQUFBO0FBQ0EsOEJBQUE7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsZ0JBQWdCLFVBQVUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUN2RCxRQUFRLE1BQU0sb0JBQW9CLEtBQUssQ0FBQztBQUFBLElBQzdDO0FBRUEsYUFBUyw0QkFBNEI7QUFDbkMsVUFBSSxDQUFDLGtCQUFtQjtBQUN4QiwwQkFBb0IsSUFBSTtBQUN4QixzQkFBZ0IsRUFBRTtBQUNsQiw0QkFBc0I7QUFBQSxRQUNwQixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsVUFDVixRQUFRO0FBQUEsVUFDUixRQUFRO0FBQUEsVUFDUixXQUFXLFVBQVU7QUFBQSxVQUNyQixlQUFlLFVBQVU7QUFBQSxVQUN6QixhQUFhLFVBQVU7QUFBQSxVQUN2QixpQkFBaUIsVUFBVSxtQkFBbUI7QUFBQSxVQUM5QyxnQkFBZ0IsVUFBVSxrQkFBa0I7QUFBQSxVQUM1QyxlQUFlLFVBQVU7QUFBQSxRQUFBO0FBQUEsUUFFM0Isa0JBQWtCLENBQUE7QUFBQSxNQUFDLENBQ3BCLEVBQUUsS0FBSyxDQUFDLFFBQVE7O0FBQ2YsYUFBSSxTQUFJLGFBQUosbUJBQWMsT0FBTztBQUN2QiwwQkFBZ0IsVUFBVSxJQUFJLFNBQVMsS0FBSyxFQUFFO0FBQUEsUUFDaEQsT0FBTztBQUNMLDBCQUFnQixXQUFVLFNBQUksYUFBSixtQkFBYyxJQUFJLElBQUk7QUFDaEQseUJBQUE7QUFDQSw4QkFBQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxnQkFBZ0IsVUFBVSxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQ3ZELFFBQVEsTUFBTSxvQkFBb0IsS0FBSyxDQUFDO0FBQUEsSUFDN0M7QUFJQSwrQ0FDRyxNQUFBLE1BRUMsc0JBQUEsY0FBQyxRQUFLLFdBQVUsT0FBTSxLQUFJLGNBQUEsR0FDeEIsc0JBQUEsY0FBQyxRQUFBLEVBQU8sU0FBUyxjQUFjLGVBQWUsU0FBWSxlQUFlLFNBQVMsTUFBTSxhQUFhLFlBQVksRUFBQSxHQUFHLFlBQVUsdUNBQzdILFFBQUEsRUFBTyxTQUFTLGNBQWMsV0FBVyxTQUFZLGVBQWUsU0FBUyxNQUFNLGFBQWEsUUFBUSxFQUFBLEdBQUcscUJBQW1CLEdBQy9ILHNCQUFBLGNBQUMsVUFBTyxTQUFTLGNBQWMsVUFBVSxTQUFZLGVBQWUsU0FBUyxNQUFNLGFBQWEsT0FBTyxFQUFBLEdBQUcsc0JBQW9CLEdBQzlILHNCQUFBLGNBQUMsVUFBTyxTQUFTLGNBQWMsZUFBZSxTQUFZLGVBQWUsU0FBUyxNQUFNLGFBQWEsWUFBWSxFQUFBLEdBQUcsYUFBVyxHQUMvSCxzQkFBQSxjQUFDLFFBQUEsRUFBTyxTQUFTLGNBQWMsUUFBUSxTQUFZLGVBQWUsU0FBUyxNQUFNLGFBQWEsS0FBSyxFQUFBLEdBQUcsS0FBRyxDQUMzRyx1Q0FDQyxTQUFBLElBQVEsR0FLUixjQUFjLGdCQUFpQixzQkFBQSxjQUFBLE1BQUEsVUFBQSwwQ0FHM0IsU0FBQSxNQUFRLGlDQUErQixHQUN4QyxzQkFBQSxjQUFDLFlBQUssMkxBSU4sdUNBRUMsUUFBQSxJQUFPLEdBQ1AsaUJBQWlCLFdBQVcsT0FDM0Isc0JBQUEsY0FBQyxnQkFBQSxFQUFlLE9BQU0sZUFBYyxXQUFTLE1BQUMsSUFDNUMsaUJBQWlCLFNBQ25CLHNCQUFBLGNBQUMsTUFBQSxFQUFLLFdBQVUsT0FBTSxLQUFJLFNBQVEsT0FBTSxZQUN0QyxzQkFBQSxjQUFDLFdBQUEsRUFBVSxTQUFRLFVBQUEsR0FBVSxZQUNsQixXQUFXLGlCQUFpQixXQUFXLE1BQU0sQ0FDeEQsdUNBQ0MsUUFBQSxFQUFPLFNBQVMsK0JBQStCLFNBQVEsY0FBQSxHQUFjLFNBQU8sQ0FDL0UsSUFFQSxzQkFBQSxjQUFBLE1BQUEsVUFBQSxNQUNFLHNCQUFBLGNBQUMsVUFBTyxTQUFTLGdDQUFnQyxVQUFVLG1CQUFBLEdBQ3hELHFCQUFxQixnQkFBZ0IsaUJBQ3hDLEdBQ0MsMEJBQTBCLHNCQUFBLGNBQUMsTUFBQSxNQUFNLHNCQUF1QixDQUMzRCx1Q0FHRCxTQUFBLElBQVEsR0FHVCxzQkFBQSxjQUFDLFNBQUEsTUFBUSxrQ0FBZ0MsR0FDekMsc0JBQUEsY0FBQyxZQUFLLHVLQUdOLEdBRUMsaUJBQWlCLFFBQ2hCLHNCQUFBLGNBQUMsWUFBTSxhQUFhLGVBQUEsR0FBaUIscUJBQW1CLHVDQUd6RCxRQUFBLElBQU8sdUNBQ1AsTUFBQSxFQUFLLFdBQVUsT0FBTSxLQUFJLFNBQVEsT0FBTSxTQUFBLHVDQUNyQyxRQUFBLEVBQU8sU0FBUyx3QkFBd0IsVUFBVSxnQkFBQSxHQUFpQixnQkFFcEUsdUNBQ0MsUUFBQSxFQUFPLFNBQVMsbUJBQW1CLFVBQVUsaUJBQWlCLFNBQVEsVUFBQSxHQUNwRSxrQkFBa0IsaUJBQWlCLGlCQUN0QyxDQUNGLEdBRUMsdURBQW9CLGdCQUFBLEVBQWUsT0FBTSx5QkFBd0IsV0FBUyxLQUFBLENBQUMsR0FFM0Usb0JBQ0Msc0JBQUEsY0FBQyxZQUFLLGNBQ08saUJBQWlCLFVBQVMsZ0JBQWEsaUJBQWlCLFNBQVEsZUFBWSxpQkFBaUIsTUFDMUcsR0FHRCxnQkFBZ0Isc0JBQUEsY0FBQyxNQUFBLE1BQUssc0JBQW9CLEdBRTNDLHNCQUFBLGNBQUMsYUFBUSxHQUdULHNCQUFBLGNBQUMsU0FBQSxNQUFRLHVCQUFxQixHQUM5QixzQkFBQSxjQUFDLE1BQUEsTUFBSyw2SEFHTixHQUNBLHNCQUFBLGNBQUMsWUFBTyxHQUNSLHNCQUFBLGNBQUMsTUFBQSxFQUFLLE1BQU0sRUFBRSxLQUFLLDBDQUEwQyxRQUFRLFVBQVUsVUFBVSxPQUFLLEdBQUcsMkJBRWpHLENBRUosR0FLQyxjQUFjLFlBQWEsc0JBQUEsY0FBQSxNQUFBLFVBQUEsTUFHeEIsc0JBQUEsY0FBQyxlQUFRLG1CQUFpQix1Q0FDekIsTUFBQSxNQUFLLDJEQUF5RCxHQUMvRCxzQkFBQSxjQUFDLFFBQUssV0FBVSxPQUFNLEtBQUksU0FBUSxPQUFNLFlBQ3RDLHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVMsc0JBQXNCLFVBQVUsa0JBQUEsR0FDOUMsb0JBQW9CLGVBQWUsaUJBQ3RDLEdBQ0MscUJBQXFCLFFBQ3BCLHNCQUFBLGNBQUMsV0FBQSxFQUFVLFNBQVEsYUFBVSxpQ0FBK0IsR0FFN0QscUJBQXFCLFdBQ3BCLHNCQUFBLGNBQUMsYUFBVSxTQUFRLFNBQUEsR0FBVSxvQkFBb0IsK0JBQWdDLENBRXJGLEdBRUEsc0JBQUEsY0FBQyxTQUFBLElBQVEsR0FHVCxzQkFBQSxjQUFDLFNBQUEsTUFBUSxXQUFTLEdBQ2xCLHNCQUFBLGNBQUMsTUFBQSxNQUFLLDhPQUlOLEdBRUMsa0JBQ0Msc0JBQUEsY0FBQyxhQUFVLFNBQVEsU0FBQSxHQUFVLGNBQWUsR0FFOUMsc0JBQUEsY0FBQyxRQUFLLFdBQVUsT0FBTSxLQUFJLFNBQVEsT0FBTSxZQUNyQyxDQUFDLGtCQUFrQixVQUFVLFdBQVcsS0FBSyxzQkFBQSxjQUFDLE1BQUEsTUFBSyw0QkFBMEIsR0FDOUUsc0JBQUEsY0FBQyxVQUFPLFNBQVMscUJBQXFCLFNBQVEsY0FBQSxHQUFjLFNBQU8sQ0FDckUsR0FDQyxVQUFVLFNBQVMsS0FDZCxzQkFBQSxjQUFDLGFBQ0Msc0JBQUEsY0FBQyxXQUFBLDBDQUNFLFVBQUEsTUFDQyxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxlQUFlLFlBQVksU0FBUyxVQUFVO0FBQUEsUUFDOUMsY0FBYyxDQUFDLFFBQVE7QUFBRSxxQkFBVyxNQUFNO0FBQUcscUJBQVcsR0FBaUM7QUFBQSxRQUFHO0FBQUEsTUFBQTtBQUFBLE1BQzdGO0FBQUEsSUFBQSxHQUNELHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLGVBQWUsWUFBWSxXQUFXLFVBQVU7QUFBQSxRQUNoRCxjQUFjLENBQUMsUUFBUTtBQUFFLHFCQUFXLFFBQVE7QUFBRyxxQkFBVyxHQUFpQztBQUFBLFFBQUc7QUFBQSxNQUFBO0FBQUEsTUFDL0Y7QUFBQSxJQUFBLEdBQ0Qsc0JBQUE7QUFBQSxNQUFDO0FBQUEsTUFBQTtBQUFBLFFBQ0MsZUFBZSxZQUFZLFdBQVcsVUFBVTtBQUFBLFFBQ2hELGNBQWMsQ0FBQyxRQUFRO0FBQUUscUJBQVcsUUFBUTtBQUFHLHFCQUFXLEdBQWlDO0FBQUEsUUFBRztBQUFBLE1BQUE7QUFBQSxNQUMvRjtBQUFBLElBQUEsR0FDRCxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxlQUFlLFlBQVksWUFBWSxVQUFVO0FBQUEsUUFDakQsY0FBYyxDQUFDLFFBQVE7QUFBRSxxQkFBVyxTQUFTO0FBQUcscUJBQVcsR0FBaUM7QUFBQSxRQUFHO0FBQUEsTUFBQTtBQUFBLE1BQ2hHO0FBQUEsSUFBQSxHQUNELHNCQUFBLGNBQUMsYUFBQSxNQUFZLFNBQU8sQ0FDdEIsQ0FDRixHQUNBLHNCQUFBLGNBQUMsV0FBQSxNQUNFLGdCQUFnQixJQUFJLENBQUMsTUFDcEIsc0JBQUEsY0FBQyxVQUFBLEVBQVMsS0FBSyxFQUFFLEdBQUEsdUNBQ2QsV0FBQSxNQUFXLEVBQUUsU0FBVSxHQUN4QixzQkFBQSxjQUFDLGlCQUNFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxnQkFBZ0IsU0FDakUsR0FDQSxzQkFBQSxjQUFDLFdBQUEsTUFBVyxFQUFFLFdBQVcsVUFBVSxVQUFVLEVBQUUsVUFBVSxXQUFXLFVBQVcsdUNBQzlFLFdBQUEsTUFBVyxXQUFXLEVBQUUsV0FBVyxNQUFNLENBQUUsR0FDNUMsc0JBQUEsY0FBQyxpQkFDRSxvQkFBb0IsRUFBRSxLQUNyQixzQkFBQSxjQUFDLE1BQUEsRUFBSyxXQUFVLE9BQU0sS0FBSSxlQUFjLE9BQU0sU0FBQSx1Q0FDM0MsUUFBQSxFQUFPLFNBQVMsTUFBTSxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLFNBQVEsY0FBQSxHQUFjLGdCQUVqRixHQUNBLHNCQUFBLGNBQUMsVUFBTyxTQUFTLE1BQU0sbUJBQW1CLElBQUksRUFBQSxHQUFHLFFBQU0sQ0FDekQsd0NBRUMsVUFBQSxFQUFTLFNBQVEsY0FBQSxHQUNoQixzQkFBQSxjQUFDLFNBQVMsWUFBVCxFQUFvQixTQUFTLE1BQU0sbUJBQW1CLENBQUMsRUFBQSxHQUFHLE1BRTNELEdBQ0Esc0JBQUEsY0FBQyxTQUFTLFlBQVQsTUFDQyxzQkFBQSxjQUFDLFFBQUssTUFBTSxFQUFFLEtBQUsscUNBQXFDLFFBQVEsa0JBQWtCLEVBQUUsRUFBRSxTQUFTLFVBQVUsS0FBQSxLQUFRLGVBRWpILENBQ0YsR0FDQyxFQUFFLDhDQUNBLFNBQVMsWUFBVCxFQUFvQixTQUFTLE1BQU0scUJBQXFCLEVBQUUsSUFBSSxLQUFLLEVBQUEsR0FBRyxZQUV2RSxJQUVBLHNCQUFBLGNBQUMsU0FBUyxZQUFULEVBQW9CLFNBQVMsTUFBTSxxQkFBcUIsRUFBRSxJQUFJLElBQUksRUFBQSxHQUFHLFVBRXRFLEdBRUYsc0JBQUEsY0FBQyxTQUFTLFlBQVQsRUFBb0IsU0FBUyxNQUFNLG1CQUFtQixFQUFFLEVBQUUsRUFBQSxHQUFHLFFBRTlELENBQ0YsQ0FFSixDQUNGLENBQ0QsQ0FDSCxDQUNGLEdBR0QsQ0FBQyxnQkFDQSxzQkFBQSxjQUFBLE1BQUEsVUFBQSxNQUNHLG9EQUFpQixNQUFBLE1BQU0sWUFBYSxHQUNyQyxzQkFBQSxjQUFDLFFBQUEsSUFBTyxHQUNSLHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVMsTUFBTTtBQUFFLHVCQUFpQixJQUFJO0FBQUcsc0JBQWdCLEVBQUU7QUFBQSxJQUFHLEtBQUcsYUFFekUsQ0FDRixJQUVBLHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxRQUNWLFVBQVUsb0JBQW9CLE1BQU0sMEJBQUEsSUFBOEI7QUFBQSxRQUNsRSxVQUFVO0FBQUEsUUFDVixVQUFVO0FBQUEsUUFDVjtBQUFBLFFBQ0EsV0FBVyxDQUFDLENBQUM7QUFBQSxRQUNiLG9CQUFvQixDQUFDLFlBQVksaUJBQy9CLHNCQUFzQjtBQUFBLFVBQ3BCLE1BQU07QUFBQSxVQUNOLFlBQVksRUFBRSxRQUFRLG9CQUFvQixZQUFZLGFBQUE7QUFBQSxVQUN0RCxrQkFBa0IsQ0FBQTtBQUFBLFFBQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUMsUUFBQTs7QUFBUSw0QkFBSSxhQUFKLG1CQUFjLFVBQVM7QUFBQSxTQUFLLEVBQUUsTUFBTSxNQUFNLEtBQUs7QUFBQSxRQUVsRSxtQkFBbUIsTUFDakIsc0JBQXNCO0FBQUEsVUFDcEIsTUFBTTtBQUFBLFVBQ04sWUFBWSxFQUFFLFFBQVEsaUJBQUE7QUFBQSxVQUN0QixrQkFBa0IsQ0FBQTtBQUFBLFFBQUMsQ0FDcEIsRUFBRSxLQUFLLENBQUM7O0FBQVEsNEJBQUksYUFBSixtQkFBYyxnQkFBZTtTQUFFLEVBQUUsTUFBTSxNQUFNLEVBQUU7QUFBQSxRQUVsRSx3QkFBd0IsQ0FBQyxlQUN2QixzQkFBc0I7QUFBQSxVQUNwQixNQUFNO0FBQUEsVUFDTixZQUFZLEVBQUUsUUFBUSx1QkFBdUIsV0FBQTtBQUFBLFVBQzdDLGtCQUFrQixDQUFBO0FBQUEsUUFBQyxDQUNwQixFQUFFLEtBQUssQ0FBQyxRQUFROztBQUNmLGVBQUksU0FBSSxhQUFKLG1CQUFjLE1BQU8sT0FBTSxJQUFJLE1BQU0sSUFBSSxTQUFTLEtBQUs7QUFDM0QsbUJBQU8sU0FBSSxhQUFKLG1CQUFjLGVBQWMsQ0FBQTtBQUFBLFFBQ3JDLENBQUM7QUFBQSxNQUFBO0FBQUEsSUFBQSxDQUtmLEdBS0MsY0FBYyxXQUFZLHNCQUFBLGNBQUEsTUFBQSxVQUFBLE1BRXZCLHNCQUFBLGNBQUMsU0FBQSxNQUFRLHNCQUFvQixHQUM3QixzQkFBQSxjQUFDLE1BQUEsTUFBSyw2VkFNTixHQUVBLHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE1BQUs7QUFBQSxRQUNMLE9BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFVBQVUsQ0FBQyxRQUFRLHVCQUF1QixHQUFHO0FBQUEsTUFBQTtBQUFBLElBQUEsdUNBRTlDLE1BQUEsTUFBSyxnR0FBOEYsR0FFbkcsdUJBQ0Msc0JBQUEsY0FBQyxNQUFBLEVBQUssV0FBVSxNQUFBLEdBQ2Qsc0JBQUEsY0FBQyxPQUFJLE1BQUssT0FBQSx1Q0FBUSxNQUFBLE1BQU0sUUFBdUMsQ0FBTyxHQUN0RSxzQkFBQSxjQUFDLEtBQUEsRUFBSSxNQUFNLEVBQUEsR0FDVCxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxVQUFVLENBQUMsUUFBUSx3QkFBd0IsR0FBRztBQUFBLE1BQUE7QUFBQSxJQUFBLEdBRWhELHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxRQUFRLG9CQUFvQixHQUFHO0FBQUEsUUFDMUMsYUFBWTtBQUFBLE1BQUE7QUFBQSxJQUFBLENBRWhCLENBQ0YsR0FHRCxpRkFFRyxzQkFBQSxjQUFDLFFBQUEsSUFBTyxHQUNQLDJCQUEyQixXQUFXLE9BQ3JDLHNCQUFBLGNBQUMsTUFBQSxNQUFLLHNCQUFvQixJQUN4QiwyQkFBMkIsU0FDN0Isc0JBQUEsY0FBQyxNQUFBLE1BQ0Usc0JBQXFCLGVBQVksV0FBVywyQkFBMkIsV0FBVyxNQUFNLENBQzNGLElBRUEsc0JBQUEsY0FBQSxNQUFBLFVBQUEsMENBQ0csUUFBQSxFQUFPLFNBQVMsa0NBQWtDLFVBQVUscUJBQUEsR0FDMUQsdUJBQXVCLGdCQUFnQixpQkFDMUMsR0FDQyw0QkFBNEIsc0JBQUEsY0FBQyxZQUFNLHdCQUF5QixDQUMvRCxDQUVKLEdBR0Ysc0JBQUE7QUFBQSxNQUFDO0FBQUEsTUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sTUFBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsVUFBVSxDQUFDLFFBQVEsaUJBQWlCLEdBQXlCO0FBQUEsUUFDN0QsU0FBUztBQUFBLFVBQ1AsRUFBRSxPQUFPLHNCQUFzQixPQUFPLE1BQUE7QUFBQSxVQUN0QyxFQUFFLE9BQU8sa0JBQWtCLE9BQU8sV0FBQTtBQUFBLFFBQVc7QUFBQSxNQUMvQztBQUFBLElBQUEsR0FHRCxrQkFBa0IsY0FDakIsc0JBQUEsY0FBQSxNQUFBLFVBQUEsTUFDRyx3QkFDQyxzQkFBQSxjQUFDLE1BQUEsTUFBSyxrQkFBZ0IsSUFFdEIsc0JBQUE7QUFBQSxNQUFDO0FBQUEsTUFBQTtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sTUFBSztBQUFBLFFBQ0wsT0FBTTtBQUFBLFFBQ04sVUFBVSxDQUFDLFFBQVE7QUFDakIsY0FBSSxPQUFPLENBQUMsZ0JBQWdCLFNBQVMsR0FBRyxHQUFHO0FBQ3pDLCtCQUFtQixDQUFDLEdBQUcsaUJBQWlCLEdBQUcsQ0FBQztBQUFBLFVBQzlDO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1AsRUFBRSxPQUFPLHFCQUFxQixPQUFPLEdBQUE7QUFBQSxVQUNyQyxHQUFHLGVBQ0EsT0FBTyxDQUFBLE1BQUssQ0FBQyxnQkFBZ0IsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUMzQyxJQUFJLENBQUEsT0FBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxLQUFLO0FBQUEsUUFBQTtBQUFBLE1BQzlDO0FBQUEsSUFBQSxHQUdILGdCQUFnQixTQUFTLHlDQUN2QixLQUFBLE1BQ0UsZ0JBQWdCLElBQUksQ0FBQSxPQUFNO0FBQ3pCLFlBQU0sT0FBTyxlQUFlLEtBQUssQ0FBQSxNQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ2pELGFBQ0Usc0JBQUEsY0FBQyxNQUFBLEVBQUssS0FBSyxJQUFJLFdBQVUsT0FBTSxTQUFRLFdBQVUsT0FBTSxTQUFBLEdBQ3JELHNCQUFBLGNBQUMsTUFBQSxNQUFNLE9BQU8sS0FBSyxPQUFPLElBQUcsS0FBQyxzQkFBQSxjQUFDLE1BQUEsRUFBSyxRQUFRLEVBQUUsT0FBTyxTQUFBLEVBQVMsR0FBRyxLQUFFLElBQUcsR0FBQyxDQUFPLEdBQzlFLHNCQUFBO0FBQUEsUUFBQztBQUFBLFFBQUE7QUFBQSxVQUNDLFNBQVE7QUFBQSxVQUNSLFNBQVMsTUFBTSxtQkFBbUIsZ0JBQWdCLE9BQU8sQ0FBQSxRQUFPLFFBQVEsRUFBRSxDQUFDO0FBQUEsUUFBQTtBQUFBLFFBQzVFO0FBQUEsTUFBQSxDQUdIO0FBQUEsSUFFSixDQUFDLENBQ0gsR0FFRCxnQkFBZ0IsV0FBVyxLQUFLLENBQUMseUJBQ2hDLHNCQUFBLGNBQUMsTUFBQSxFQUFLLFFBQVEsRUFBRSxPQUFPLFdBQVMsR0FBRyw0REFBMEQsQ0FFakcsR0FHRixzQkFBQSxjQUFDLFNBQUEsSUFBUSxHQUNULHNCQUFBLGNBQUMsUUFBSyxRQUFRLEVBQUUsWUFBWSxPQUFBLEtBQVUsbUJBQWlCLEdBQ3ZELHNCQUFBLGNBQUMsTUFBQSxNQUFLLGdKQUE4SSxHQUNwSixzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxVQUFRO0FBQUEsUUFDUixNQUFNO0FBQUEsTUFBQTtBQUFBLElBQUEsQ0FHWixHQUtDLGNBQWMsZ0JBQWlCLHNCQUFBLGNBQUEsTUFBQSxVQUFBLDBDQUczQixTQUFBLE1BQVEsNEJBQTBCLEdBQ25DLHNCQUFBLGNBQUMsWUFBSyxvSkFHTixHQUNBLHNCQUFBLGNBQUMsUUFBQSxJQUFPLEdBQ1Asd0JBQXdCLFdBQVcsT0FDbEMsc0JBQUEsY0FBQyxrQkFBZSxPQUFNLGVBQWMsV0FBUyxLQUFBLENBQUMsSUFDNUMsd0JBQXdCLFNBQzFCLHNCQUFBLGNBQUMsV0FBQSxFQUFVLFNBQVEsYUFDaEIsNkJBQTRCLGVBQVksV0FBVyx3QkFBd0IsV0FBVyxNQUFNLENBQy9GLElBRUEsc0JBQUEsY0FBQSxNQUFBLFVBQUEsMENBQ0csUUFBQSxFQUFPLFNBQVMsK0JBQStCLFVBQVUsNkJBQ3ZELDRCQUE0QixnQkFBZ0IsaUJBQy9DLEdBQ0MsaUNBQWlDLHNCQUFBLGNBQUMsTUFBQSxNQUFNLDZCQUE4QixDQUN6RSx1Q0FHRCxTQUFBLElBQVEsR0FHVCxzQkFBQSxjQUFDLFNBQUEsTUFBUSw0Q0FBMEMsR0FDbkQsc0JBQUEsY0FBQyxNQUFBLE1BQUssc0pBR04sR0FDQSxzQkFBQSxjQUFDLFFBQUEsSUFBTyxHQUVQLHFCQUFxQixPQUNwQixzQkFBQSxjQUFDLGdCQUFBLEVBQWUsT0FBTSxzQkFBcUIsV0FBUyxNQUFDLElBRXJELHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU8sbUJBQW1CLFlBQVk7QUFBQSxRQUN0QyxNQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsUUFDVCxVQUFVLENBQUMsUUFBUSxzQkFBc0IsR0FBRztBQUFBLFFBQzVDLFVBQVU7QUFBQSxNQUFBO0FBQUEsSUFBQSxHQUdiLGtCQUFrQixzQkFBQSxjQUFDLFdBQUEsRUFBVSxTQUFRLFNBQUEsR0FBVSxjQUFlLEdBRTlELG9CQUNDLHNCQUFBLGNBQUEsTUFBQSxVQUFBLE1BQ0Usc0JBQUEsY0FBQyxRQUFBLElBQU8sR0FDUCxtQkFDQyxzQkFBQSxjQUFDLGdCQUFBLEVBQWUsT0FBTSxjQUFhLFdBQVMsTUFBQyxJQUMzQyxpQkFDRixzQkFBQSxjQUFDLFdBQUEsRUFBVSxTQUFRLFlBQVUsY0FBZSxJQUU1QyxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxVQUFVLENBQUMsUUFBUSx5QkFBeUIsR0FBRztBQUFBLFFBQy9DLFNBQVMsQ0FBQyxFQUFFLE9BQU8sUUFBUSxPQUFPLEdBQUEsR0FBTSxHQUFHLFVBQVUsSUFBSSxDQUFBLE9BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxPQUFPLEVBQUUsYUFBQSxFQUFlLENBQUM7QUFBQSxNQUFBO0FBQUEsSUFBQSxDQUcvRyxHQUdGLHNCQUFBLGNBQUMsYUFBUSxHQUdULHNCQUFBLGNBQUMsZUFBUSxvREFBa0QsdUNBQzFELE1BQUEsTUFBSywySUFHTixHQUNBLHNCQUFBLGNBQUMsUUFBQSxJQUFPLEdBRVAsbUJBQW1CLE9BQU8saUJBQWlCLE9BQzFDLHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxRQUFRLHdCQUF3QixHQUFHO0FBQUEsUUFDOUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxRQUFRLE9BQU8sR0FBQSxHQUFNLEdBQUcsVUFBVSxJQUFJLENBQUEsT0FBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLE9BQU8sRUFBRSxhQUFBLEVBQWUsQ0FBQztBQUFBLE1BQUE7QUFBQSxJQUFBLEdBSTdHLHNCQUFBLGNBQUMsUUFBQSxJQUFPLEdBQ1Isc0JBQUE7QUFBQSxNQUFDO0FBQUEsTUFBQTtBQUFBLFFBQ0MsU0FBUztBQUFBLFFBQ1QsVUFBVTtBQUFBLFFBQ1YsU0FBUTtBQUFBLE1BQUE7QUFBQSxNQUVQLDJCQUEyQixrQkFBa0I7QUFBQSxJQUFBLEdBRy9DLDRCQUE0QixzQkFBQSxjQUFDLGdCQUFBLEVBQWUsT0FBTSw2QkFBNEIsV0FBUyxLQUFBLENBQUMsR0FFeEYsNkJBQ0Msc0JBQUEsY0FBQSxNQUFBLFVBQUEsTUFDRSxzQkFBQSxjQUFDLFlBQUssYUFDTSwwQkFBMEIsU0FBUSx5QkFBc0IsMEJBQTBCLFVBQVMsZ0JBQWEsMEJBQTBCLFNBQVEsZUFBWSwwQkFBMEIsTUFDNUwsQ0FDRixHQUdELHlCQUF5QixzQkFBQSxjQUFDLE1BQUEsTUFBSyxpQ0FBK0IsQ0FFbkUsR0FLQyxjQUFjLFNBQVUsc0JBQUEsY0FBQSxNQUFBLFVBQUEsTUFFckIsc0JBQUEsY0FBQyxTQUFBLE1BQVEsY0FBWSxHQUNyQixzQkFBQSxjQUFDLE1BQUEsTUFBSyxxREFBbUQsR0FDekQsc0JBQUEsY0FBQyxRQUFBLElBQU8sR0FFUCxhQUNDLHNCQUFBLGNBQUMsZ0JBQUEsRUFBZSxPQUFNLGNBQWEsV0FBUyxLQUFBLENBQUMsSUFDM0MsV0FDRixzQkFBQSxjQUFDLGFBQVUsU0FBUSxTQUFBLEdBQVUsUUFBUyxJQUNwQyxXQUFXLFdBQVcsSUFDeEIsc0JBQUEsY0FBQyxNQUFBLE1BQUsseUJBQXVCLElBRTdCLHNCQUFBLGNBQUEsTUFBQSxVQUFBLE1BQ0Usc0JBQUEsY0FBQyxhQUNDLHNCQUFBLGNBQUMsV0FBQSxNQUNDLHNCQUFBLGNBQUMsVUFBQSxNQUNDLHNCQUFBLGNBQUMsYUFBQSxNQUFZLE1BQUksR0FDakIsc0JBQUEsY0FBQyxhQUFBLE1BQVksUUFBTSxHQUNuQixzQkFBQSxjQUFDLGFBQUEsTUFBWSxNQUFJLEdBQ2pCLHNCQUFBLGNBQUMsYUFBQSxNQUFZLFNBQU8sR0FDcEIsc0JBQUEsY0FBQyxhQUFBLE1BQVksUUFBTSxDQUNyQixDQUNGLEdBQ0Esc0JBQUEsY0FBQyxXQUFBLE1BQ0UsV0FBVyxJQUFJLENBQUMsVUFDZixzQkFBQSxjQUFDLFVBQUEsRUFBUyxLQUFLLE1BQU0sR0FBQSxHQUNuQixzQkFBQSxjQUFDLFdBQUEsTUFBVyxXQUFXLE1BQU0sV0FBVyxNQUFNLENBQUUsR0FDaEQsc0JBQUEsY0FBQyxXQUFBLE1BQVcsa0JBQWtCLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTyxHQUM1RCxzQkFBQSxjQUFDLFdBQUEsTUFBVyxNQUFNLEtBQU0sR0FDeEIsc0JBQUEsY0FBQyxXQUFBLE1BQVcsTUFBTSxPQUFRLEdBQzFCLHNCQUFBLGNBQUMsV0FBQSxNQUNDLHNCQUFBLGNBQUMsV0FBQSxFQUFVLFNBQVMsTUFBTSxXQUFXLFlBQVksWUFBWSxZQUMxRCxNQUFNLFdBQVcsWUFBWSxZQUFZLE9BQzVDLENBQ0YsQ0FDRixDQUNELENBQ0gsQ0FDRixHQUNBLHNCQUFBLGNBQUMsUUFBQSxJQUFPLHVDQUNQLE1BQUEsRUFBSyxXQUFVLE9BQU0sS0FBSSxRQUFBLEdBQ3hCLHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVEsYUFBWSxTQUFTLG1CQUFtQixVQUFVLGFBQWEsV0FBVyxLQUFLLFdBQUEsR0FBWSxRQUFNLEdBQ2pILHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVEsYUFBWSxTQUFTLG1CQUFtQixVQUFVLENBQUMsY0FBYyxXQUFBLEdBQVksUUFBTSxHQUNsRyxrQkFDQyxzQkFBQSxjQUFBLE1BQUEsVUFBQSxNQUNFLHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVEsZUFBYyxTQUFTLGdCQUFnQixVQUFVLGdCQUFBLEdBQzlELGtCQUFrQixnQkFBZ0IsZUFDckMsR0FDQSxzQkFBQSxjQUFDLFFBQUEsRUFBTyxTQUFRLGFBQVksU0FBUyxNQUFNLG1CQUFtQixLQUFLLEdBQUcsVUFBVSxnQkFBQSxHQUFpQixRQUFNLENBQ3pHLHdDQUVDLFFBQUEsRUFBTyxTQUFRLGFBQVksU0FBUyxNQUFNLG1CQUFtQixJQUFJLEVBQUEsR0FBRyxXQUFTLENBRWxGLENBQ0YsQ0FHTixDQUNGO0FBQUEsRUFFSjtBQUlBLFdBQVMsVUFBVTtBQUFBLElBQ2pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixHQVdHO0FBQ0QsVUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJRCxXQUFBQSxTQUFrQyxDQUFBLENBQUU7QUFDeEUsVUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsSUFBSUEsV0FBQUEsU0FBUyxLQUFLO0FBQ2hFLFVBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSUEsb0JBQTZCO0FBQUEsTUFDakUsRUFBRSxPQUFPLFdBQVcsT0FBTyxXQUFXLGNBQWMsTUFBQTtBQUFBLE1BQ3BELEVBQUUsT0FBTyxRQUFXLE9BQU8sUUFBVyxjQUFjLE1BQUE7QUFBQSxJQUFNLENBQzNEO0FBQ0RDLGVBQUFBLFVBQVUsTUFBTTtBQUNkLFVBQUksbUJBQW1CO0FBQ3JCLDBCQUFBLEVBQW9CLEtBQUssQ0FBQSxVQUFTO0FBQUUsY0FBSSxNQUFNLE9BQVEsZ0JBQWUsS0FBSztBQUFBLFFBQUcsQ0FBQyxFQUFFLE1BQU0sTUFBTTtBQUFBLFFBQUMsQ0FBQztBQUFBLE1BQ2hHO0FBQUEsSUFDRixHQUFHLENBQUEsQ0FBRTtBQUVMLFVBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUlELFdBQUFBLFNBQStHLENBQUEsQ0FBRTtBQUNqSyxVQUFNLENBQUMsbUJBQW1CLG9CQUFvQixJQUFJQSxXQUFBQSxTQUFTLEtBQUs7QUFDaEUsVUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsSUFBSUEsV0FBQUEsU0FBUyxFQUFFO0FBRXpEQyxlQUFBQSxVQUFVLE1BQU07QUFDZCxZQUFNLGdCQUFnQixLQUFLLGdCQUFnQixtQkFBbUIsS0FBSyxnQkFBZ0I7QUFDbkYsVUFBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLEtBQUssY0FBZTtBQUN0RSwyQkFBcUIsSUFBSTtBQUN6Qix5QkFBbUIsRUFBRTtBQUNyQiw2QkFBdUIsS0FBSyxhQUFhLEVBQ3RDLEtBQUssQ0FBQSxVQUFTLG9CQUFvQixLQUFLLENBQUMsRUFDeEMsTUFBTSxDQUFDLE1BQU07QUFBRSw0QkFBb0IsQ0FBQSxDQUFFO0FBQUcsMkJBQW1CLE9BQU8sQ0FBQyxDQUFDO0FBQUEsTUFBRyxDQUFDLEVBQ3hFLFFBQVEsTUFBTSxxQkFBcUIsS0FBSyxDQUFDO0FBQUEsSUFDOUMsR0FBRyxDQUFDLEtBQUssZUFBZSxLQUFLLFdBQVcsQ0FBQztBQUV6QyxhQUFTLGlCQUFpQixHQUFXO0FBQ25DLFlBQU0sV0FBVyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQTtBQUNsRSxlQUFTLEVBQUUsR0FBRyxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsSUFBSSxlQUFlLFVBQVU7QUFDcEYsb0JBQWMsQ0FBQSxDQUFFO0FBQ2hCLDJCQUFxQixLQUFLO0FBQUEsSUFDNUI7QUFFQSxhQUFTLGVBQWUsR0FBVztBQUNqQyxlQUFTLEVBQUUsR0FBRyxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsSUFBSSxnQkFBZ0IsSUFBSTtBQUM3RSwyQkFBcUIsS0FBSztBQUFBLElBQzVCO0FBRUEsbUJBQWUscUJBQXFCLGNBQXNCO0FBQ3hELFVBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLE9BQVE7QUFDakQsWUFBTSxRQUFRLE1BQU0sbUJBQW1CLEtBQUssZUFBZSxhQUFhLE1BQU07QUFDOUUsMkJBQXFCLENBQUMsS0FBSztBQUFBLElBQzdCO0FBRUEsYUFBUyxjQUFjLE9BQWUsT0FBMkIsT0FBZTtBQUM5RSxZQUFNLFVBQVUsS0FBSyxjQUFjLElBQUksQ0FBQyxHQUFHLE1BQU0sTUFBTSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQUEsSUFBVSxDQUFDO0FBQzNGLGVBQVMsRUFBRSxHQUFHLE1BQU0sZUFBZSxTQUFTO0FBQzVDLFVBQUksVUFBVSxZQUFhLFVBQVUsV0FBVyxDQUFDLE9BQVE7QUFDdkQsc0JBQWMsQ0FBQSxTQUFRO0FBQUUsZ0JBQU0sSUFBSSxFQUFFLEdBQUcsS0FBQTtBQUFRLGlCQUFPLEVBQUUsS0FBSztBQUFHLGlCQUFPO0FBQUEsUUFBRyxDQUFDO0FBQUEsTUFDN0U7QUFBQSxJQUNGO0FBRUEsYUFBUyxhQUFhO0FBQ3BCLGVBQVMsRUFBRSxHQUFHLE1BQU0sZUFBZSxDQUFDLEdBQUcsS0FBSyxlQUFlLEVBQUUsV0FBVyxJQUFJLFFBQVEsWUFBWSxPQUFPLEdBQUEsQ0FBSSxHQUFHO0FBQUEsSUFDaEg7QUFFQSxhQUFTLGNBQWMsT0FBZTtBQUNwQyxlQUFTLEVBQUUsR0FBRyxNQUFNLGVBQWUsS0FBSyxjQUFjLE9BQU8sQ0FBQyxHQUFHLE1BQU0sTUFBTSxLQUFLLEdBQUc7QUFDckYsb0JBQWMsQ0FBQSxTQUFRO0FBQ3BCLGNBQU0sSUFBNkIsQ0FBQTtBQUNuQyxlQUFPLFFBQVEsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNO0FBQ3ZDLGdCQUFNLEtBQUssT0FBTyxDQUFDO0FBQ25CLGNBQUksS0FBSyxNQUFPLEdBQUUsRUFBRSxJQUFJO0FBQUEsbUJBQ2YsS0FBSyxNQUFPLEdBQUUsS0FBSyxDQUFDLElBQUk7QUFBQSxRQUNuQyxDQUFDO0FBQ0QsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxtQkFBZSxtQkFBbUIsT0FBZSxjQUFzQjtBQUNyRSxVQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYSxPQUFRO0FBQ2pELFlBQU0sUUFBUSxNQUFNLG1CQUFtQixLQUFLLGVBQWUsYUFBYSxNQUFNO0FBQzlFLG9CQUFjLENBQUEsVUFBUyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQUEsRUFBUTtBQUFBLElBQ3REO0FBRUEsVUFBTSxZQUFZLENBQUMsQ0FBQyxLQUFLLFVBQVUsS0FBQSxLQUFVLENBQUM7QUFFOUMsV0FDRSxzQkFBQSxjQUFBLE1BQUEsVUFBQSxNQUNFLHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQUs7QUFBQSxRQUNMLE9BQU8sS0FBSztBQUFBLFFBQ1osVUFBVSxDQUFDLE1BQU0sU0FBUyxFQUFFLEdBQUcsTUFBTSxXQUFXLEdBQUc7QUFBQSxRQUNuRCxhQUFZO0FBQUEsUUFDWixhQUFZO0FBQUEsTUFBQTtBQUFBLElBQUEsR0FHZCxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUs7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLFNBQVMsWUFBWSxJQUFJLENBQUEsT0FBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLE9BQU8sRUFBRSxNQUFBLEVBQVE7QUFBQSxNQUFBO0FBQUEsSUFBQSxHQUdwRSxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUs7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLFNBQVM7QUFBQSxVQUNQLEVBQUUsT0FBTyxrQkFBa0IsT0FBTyxpQkFBQTtBQUFBLFVBQ2xDLEVBQUUsT0FBTyxpQkFBaUIsT0FBTyxnQkFBQTtBQUFBLFVBQ2pDLEVBQUUsT0FBTywwQkFBMEIsT0FBTyxjQUFBO0FBQUEsUUFBYztBQUFBLFFBRTFELGFBQ0UsS0FBSyxnQkFBZ0IsbUJBQW1CLDZDQUN4QyxLQUFLLGdCQUFnQixrQkFBbUIsZ0VBQ3hDO0FBQUEsTUFBQTtBQUFBLElBQUEsSUFJRixLQUFLLGdCQUFnQixtQkFBbUIsS0FBSyxnQkFBZ0Isa0JBQzdELHNCQUFBLGNBQUEsTUFBQSxVQUFBLE1BQ0Usc0JBQUEsY0FBQyxRQUFBLElBQU8sR0FDUCxvQkFDQyxzQkFBQSxjQUFDLGdCQUFBLEVBQWUsT0FBTSxvQkFBQSxDQUFvQixJQUN4QyxrQkFDRixzQkFBQSxjQUFBLE1BQUEsVUFBQSxNQUNFLHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQUs7QUFBQSxRQUNMLE9BQU8sS0FBSztBQUFBLFFBQ1osVUFBVSxDQUFDLE1BQU07QUFBRSxtQkFBUyxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsR0FBRztBQUFHLCtCQUFxQixLQUFLO0FBQUEsUUFBRztBQUFBLFFBQzNGLFFBQVEsQ0FBQyxNQUFNLHFCQUFxQixDQUFDO0FBQUEsUUFDckMsYUFBYSxLQUFLLGtCQUFrQixTQUFTLG1CQUFtQixLQUFLLGtCQUFrQixZQUFZLHdCQUF3QjtBQUFBLFFBQzNILE9BQU87QUFBQSxRQUNQLG1CQUFtQixvQkFBb0IsK0JBQStCO0FBQUEsTUFBQTtBQUFBLElBQUEsQ0FFMUUsSUFDRSxpQkFBaUIsU0FBUyxJQUM1QixzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFLO0FBQUEsUUFDTCxPQUFPLEtBQUs7QUFBQSxRQUNaLFVBQVUsQ0FBQyxNQUFNO0FBQUUsbUJBQVMsRUFBRSxHQUFHLE1BQU0saUJBQWlCLEdBQUc7QUFBRywrQkFBcUIsS0FBSztBQUFBLFFBQUc7QUFBQSxRQUMzRixTQUFTLGlCQUFpQixJQUFJLENBQUEsT0FBTSxFQUFFLE9BQU8sR0FBRyxFQUFFLEtBQUssS0FBSyxFQUFFLEtBQUssS0FBSyxPQUFPLEVBQUUsUUFBUTtBQUFBLE1BQUE7QUFBQSxJQUFBLElBRzNGLHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQUs7QUFBQSxRQUNMLE9BQU8sS0FBSztBQUFBLFFBQ1osVUFBVSxDQUFDLE1BQU07QUFBRSxtQkFBUyxFQUFFLEdBQUcsTUFBTSxpQkFBaUIsR0FBRztBQUFHLCtCQUFxQixLQUFLO0FBQUEsUUFBRztBQUFBLFFBQzNGLFFBQVEsQ0FBQyxNQUFNLHFCQUFxQixDQUFDO0FBQUEsUUFDckMsYUFBYSxLQUFLLGtCQUFrQixTQUFTLG1CQUFtQixLQUFLLGtCQUFrQixZQUFZLHdCQUF3QjtBQUFBLFFBQzNILE9BQU87QUFBQSxRQUNQLG1CQUFtQixvQkFBb0IsK0JBQStCO0FBQUEsTUFBQTtBQUFBLElBQUEsQ0FHNUUsR0FHRCxLQUFLLGdCQUFnQixrQkFBa0IsTUFBTTtBQUM1QyxZQUFNLGVBQWUsaUJBQWlCLEtBQUssT0FBSyxFQUFFLFVBQVUsS0FBSyxlQUFlO0FBQ2hGLFlBQU0sUUFBTyw2Q0FBYyxZQUFXLENBQUE7QUFDdEMsdUVBRUksc0JBQUEsY0FBQyxRQUFBLElBQU8sR0FDUCxLQUFLLFNBQVMsSUFDYixzQkFBQTtBQUFBLFFBQUM7QUFBQSxRQUFBO0FBQUEsVUFDQyxPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUEsVUFDTCxPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsQ0FBQyxNQUFNLFNBQVMsRUFBRSxHQUFHLE1BQU0sZ0JBQWdCLEdBQUc7QUFBQSxVQUN4RCxTQUFTO0FBQUEsUUFBQTtBQUFBLE1BQUEsSUFHWCxzQkFBQTtBQUFBLFFBQUM7QUFBQSxRQUFBO0FBQUEsVUFDQyxPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUEsVUFDTCxPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsQ0FBQyxNQUFNLFNBQVMsRUFBRSxHQUFHLE1BQU0sZ0JBQWdCLEdBQUc7QUFBQSxVQUN4RCxhQUFZO0FBQUEsUUFBQTtBQUFBLE1BQUEsQ0FHbEI7QUFBQSxJQUVKLE1BRUEsc0JBQUEsY0FBQyxTQUFBLElBQVEsdUNBQ1IsTUFBQSxFQUFLLFFBQVEsRUFBRSxZQUFZLFNBQU8sR0FBRyxnQkFBYyxHQUNwRCxzQkFBQSxjQUFDLFlBQUssNE1BSU4sR0FFQyxLQUFLLGNBQWMsSUFBSSxDQUFDLFNBQVMsTUFDaEMsc0JBQUEsY0FBQyxRQUFLLFdBQVUsT0FBTSxLQUFJLFNBQVEsT0FBTSxPQUFNLEtBQUssS0FDakQsc0JBQUEsY0FBQyxLQUFBLEVBQUksTUFBTSxLQUNULHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLE1BQU0sTUFBTSxDQUFDO0FBQUEsUUFDYixPQUFPLFFBQVE7QUFBQSxRQUNmLFVBQVUsQ0FBQyxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUM7QUFBQSxRQUNoRCxhQUFZO0FBQUEsTUFBQTtBQUFBLElBQUEsQ0FFaEIsR0FDQSxzQkFBQSxjQUFDLEtBQUEsRUFBSSxNQUFNLEVBQUEsR0FDVCxzQkFBQTtBQUFBLE1BQUM7QUFBQSxNQUFBO0FBQUEsUUFDQyxPQUFNO0FBQUEsUUFDTixNQUFNLE9BQU8sQ0FBQztBQUFBLFFBQ2QsT0FBTyxRQUFRO0FBQUEsUUFDZixVQUFVLENBQUMsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUEwQjtBQUFBLFFBQ3RFLFNBQVM7QUFBQSxVQUNQLEVBQUUsT0FBTyxZQUFZLE9BQU8sV0FBQTtBQUFBLFVBQzVCLEVBQUUsT0FBTyxVQUFVLE9BQU8sU0FBQTtBQUFBLFFBQVM7QUFBQSxNQUNyQztBQUFBLElBQUEsQ0FFSixHQUNBLHNCQUFBLGNBQUMsS0FBQSxFQUFJLE1BQU0sRUFBQSxHQUNULHNCQUFBO0FBQUEsTUFBQztBQUFBLE1BQUE7QUFBQSxRQUNDLE9BQU8sUUFBUSxXQUFXLGFBQWEscUJBQXFCO0FBQUEsUUFDNUQsTUFBTSxPQUFPLENBQUM7QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLFFBQ2YsVUFBVSxDQUFDLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQztBQUFBLFFBQzVDLFFBQVEsQ0FBQyxNQUFNO0FBQUUsY0FBSSxRQUFRLFdBQVcsV0FBWSxvQkFBbUIsR0FBRyxDQUFDO0FBQUEsUUFBRztBQUFBLFFBQzlFLGFBQWEsUUFBUSxXQUFXLGFBQWEsZUFBZTtBQUFBLFFBQzVELE9BQU8sUUFBUSxXQUFXLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUFBLFFBQ3RELG1CQUFtQixRQUFRLFdBQVcsY0FBYyxXQUFXLENBQUMsSUFBSSxrQ0FBa0M7QUFBQSxNQUFBO0FBQUEsSUFBQSxDQUUxRyxHQUNBLHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVMsTUFBTSxjQUFjLENBQUMsRUFBQSxHQUFHLFFBQU0sQ0FDakQsQ0FDRCx1Q0FFQSxTQUFBLElBQVEsR0FFUixnQkFBZ0Isc0JBQUEsY0FBQyxNQUFBLE1BQU0sWUFBYSxHQUVyQyxzQkFBQSxjQUFDLFlBQU8sR0FDUixzQkFBQSxjQUFDLFFBQUssV0FBVSxPQUFNLEtBQUksU0FBUSxPQUFNLFlBQ3RDLHNCQUFBLGNBQUMsUUFBQSxFQUFPLFNBQVMsV0FBQSxHQUFZLGFBQVcsR0FDdkMsWUFDQyxzQkFBQSxjQUFDLFVBQU8sU0FBUyxNQUFNLFNBQVMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxXQUFXLFNBQVEsYUFDbEUsV0FBVyxjQUFjLGNBQzVCLElBRUEsc0JBQUEsY0FBQSxNQUFBLFVBQUEsMENBQ0csUUFBQSxFQUFPLFNBQVMsTUFBTSxTQUFTLElBQUksR0FBRyxVQUFVLENBQUMsV0FBVyxTQUFRLFVBQUEsR0FDbEUsV0FBVyxnQkFBZ0IsaUJBQzlCLHVDQUNDLFFBQUEsRUFBTyxTQUFTLE1BQU0sU0FBUyxLQUFLLEdBQUcsVUFBVSxDQUFDLGFBQ2hELFdBQVcsZ0JBQWdCLGVBQzlCLENBQ0YsdUNBRUQsUUFBQSxFQUFPLFNBQVMsVUFBVSxVQUFVLFlBQVUsUUFBTSxDQUN2RCxDQUNGO0FBQUEsRUFFSjtBQUlBLFdBQVMsZ0JBQWdCLEVBQUUsc0JBQXNCLG1CQUFtQixXQUl6RDtBQUNULFVBQU0sYUFBYSxrQkFBa0IsU0FBUyxJQUFJLEtBQUssVUFBVSxpQkFBaUIsSUFBSSxLQUFLLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztBQUM5SCxVQUFNLGNBQWMsS0FBSyxVQUFVLE9BQU87QUFDMUMsV0FBTztBQUFBO0FBQUE7QUFBQSxrQ0FHeUIsb0JBQW9CO0FBQUEsOEJBQ3hCLFVBQVU7QUFBQSxtQkFDckIsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQW1KOUI7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDddfQ==
