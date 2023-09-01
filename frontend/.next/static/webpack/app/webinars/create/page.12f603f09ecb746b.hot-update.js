"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/webinars/create/page",{

/***/ "(app-pages-browser)/./app/webinars/create/page.js":
/*!*************************************!*\
  !*** ./app/webinars/create/page.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CreateProduct; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction CreateProduct() {\n    var _session_roles;\n    _s();\n    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        var _session_roles;\n        if (status == \"unauthenticated\" || status == \"authenticated\" && !((_session_roles = session.roles) === null || _session_roles === void 0 ? void 0 : _session_roles.includes(\"creator\"))) {\n            router.push(\"/unauthorized\");\n            router.refresh();\n        }\n    }, [\n        session,\n        status,\n        router\n    ]);\n    const productNameRef = react__WEBPACK_IMPORTED_MODULE_3___default().useRef();\n    const priceRef = react__WEBPACK_IMPORTED_MODULE_3___default().useRef();\n    const [errorMsg, setErrorMsg] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    if (status == \"loading\") {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-4xl text-center\",\n                    children: \"Create product\"\n                }, void 0, false, {\n                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                    lineNumber: 29,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"text-center text-2xl\",\n                    children: \"Loading...\"\n                }, void 0, false, {\n                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                    lineNumber: 30,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n            lineNumber: 28,\n            columnNumber: 7\n        }, this);\n    }\n    if (session && ((_session_roles = session.roles) === null || _session_roles === void 0 ? void 0 : _session_roles.includes(\"creator\"))) {\n        const handleSubmit = async (event)=>{\n            event.preventDefault();\n            const postBody = {\n                name: productNameRef.current.value,\n                price: parseFloat(priceRef.current.value),\n                description: \"description\",\n                date: \"50/50\"\n            };\n            try {\n                const resp = await fetch(\"/webinars\", {\n                    method: \"POST\",\n                    // headers: {\n                    headers: {\n                        \"Content-Type\": \"application/json\",\n                        \"Test\": \"Test>>>>>\"\n                    },\n                    // },\n                    body: JSON.stringify(postBody)\n                });\n                // console.log(\"Create Webinar Pagee\",resp)\n                if (resp.ok) {\n                    router.push(\"/webinars\");\n                    router.refresh();\n                } else {\n                    var json = await resp.json();\n                    setErrorMsg(\"Unable to call the API: \" + json.error);\n                }\n            } catch (err) {\n                setErrorMsg(\"Unable to call the API: \" + err);\n            }\n        };\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-4xl text-center\",\n                    children: \"Create product\"\n                }, void 0, false, {\n                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                    lineNumber: 73,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    onSubmit: handleSubmit,\n                    className: \"mt-6\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-1/2\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    htmlFor: \"productName\",\n                                    className: \"text-2xl\",\n                                    children: \"Webinars name:\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                                    lineNumber: 77,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    autoFocus: true,\n                                    type: \"text\",\n                                    id: \"productName\",\n                                    className: \"w-full p-1 text-black bg-gray-200 text-lg\",\n                                    ref: productNameRef,\n                                    required: true\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                                    lineNumber: 80,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                            lineNumber: 76,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-1/2 mt-2\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    htmlFor: \"price\",\n                                    className: \"text-2xl\",\n                                    children: \"Price:\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                                    lineNumber: 90,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"number\",\n                                    step: \"0.01\",\n                                    id: \"price\",\n                                    className: \"w-full p-1 text-black bg-gray-200 text-lg\",\n                                    ref: priceRef\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                                    lineNumber: 93,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                            lineNumber: 89,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-center text-2xl text-red-600\",\n                            children: errorMsg\n                        }, void 0, false, {\n                            fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                            lineNumber: 101,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"submit\",\n                            className: \"mt-3 bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-50\",\n                            children: \"Create\"\n                        }, void 0, false, {\n                            fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                            lineNumber: 102,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n                    lineNumber: 75,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"E:\\\\practice\\\\test-keycloak\\\\frontend\\\\app\\\\webinars\\\\create\\\\page.js\",\n            lineNumber: 72,\n            columnNumber: 7\n        }, this);\n    }\n}\n_s(CreateProduct, \"IohQG3Mnt7u62ZQVT51Q9pTYFoY=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = CreateProduct;\nvar _c;\n$RefreshReg$(_c, \"CreateProduct\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC93ZWJpbmFycy9jcmVhdGUvcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRTZDO0FBQ0Q7QUFDTztBQUVwQyxTQUFTSztRQTRCUEM7O0lBM0JmLE1BQU0sRUFBRUMsTUFBTUQsT0FBTyxFQUFFRSxNQUFNLEVBQUUsR0FBR1IsMkRBQVVBO0lBQzVDLE1BQU1TLFNBQVNSLDBEQUFTQTtJQUV4QkcsZ0RBQVNBLENBQUM7WUFHeUJFO1FBRmpDLElBQ0VFLFVBQVUscUJBQ1RBLFVBQVUsbUJBQW1CLEdBQUNGLGlCQUFBQSxRQUFRSSxLQUFLLGNBQWJKLHFDQUFBQSxlQUFlSyxRQUFRLENBQUMsYUFDdkQ7WUFDQUYsT0FBT0csSUFBSSxDQUFDO1lBQ1pILE9BQU9JLE9BQU87UUFDaEI7SUFDRixHQUFHO1FBQUNQO1FBQVNFO1FBQVFDO0tBQU87SUFFNUIsTUFBTUssaUJBQWlCWixtREFBWTtJQUNuQyxNQUFNYyxXQUFXZCxtREFBWTtJQUU3QixNQUFNLENBQUNlLFVBQVVDLFlBQVksR0FBR2YsK0NBQVFBLENBQUM7SUFFekMsSUFBSUssVUFBVSxXQUFXO1FBQ3ZCLHFCQUNFLDhEQUFDVzs7OEJBQ0MsOERBQUNDO29CQUFHQyxXQUFVOzhCQUF1Qjs7Ozs7OzhCQUNyQyw4REFBQ0M7b0JBQUlELFdBQVU7OEJBQXVCOzs7Ozs7Ozs7Ozs7SUFHNUM7SUFFQSxJQUFJZixhQUFXQSxpQkFBQUEsUUFBUUksS0FBSyxjQUFiSixxQ0FBQUEsZUFBZUssUUFBUSxDQUFDLGFBQVk7UUFDakQsTUFBTVksZUFBZSxPQUFPQztZQUMxQkEsTUFBTUMsY0FBYztZQUVwQixNQUFNQyxXQUFXO2dCQUNmQyxNQUFNYixlQUFlYyxPQUFPLENBQUNDLEtBQUs7Z0JBQ2xDQyxPQUFPQyxXQUFXZixTQUFTWSxPQUFPLENBQUNDLEtBQUs7Z0JBQ3hDRyxhQUFZO2dCQUNaQyxNQUFLO1lBQ1A7WUFFQSxJQUFJO2dCQUNGLE1BQU1DLE9BQU8sTUFBTUMsTUFBTSxhQUFhO29CQUNwQ0MsUUFBUTtvQkFDUixhQUFhO29CQUNYQyxTQUFTO3dCQUNQLGdCQUFnQjt3QkFDaEIsUUFBTztvQkFDVDtvQkFDRixLQUFLO29CQUNMQyxNQUFNQyxLQUFLQyxTQUFTLENBQUNkO2dCQUN2QjtnQkFDQSwyQ0FBMkM7Z0JBRTNDLElBQUlRLEtBQUtPLEVBQUUsRUFBRTtvQkFDWGhDLE9BQU9HLElBQUksQ0FBQztvQkFDWkgsT0FBT0ksT0FBTztnQkFDaEIsT0FBTztvQkFDTCxJQUFJNkIsT0FBTyxNQUFNUixLQUFLUSxJQUFJO29CQUMxQnhCLFlBQVksNkJBQTZCd0IsS0FBS0MsS0FBSztnQkFDckQ7WUFDRixFQUFFLE9BQU9DLEtBQUs7Z0JBQ1oxQixZQUFZLDZCQUE2QjBCO1lBQzNDO1FBQ0Y7UUFFQSxxQkFDRSw4REFBQ3pCOzs4QkFDQyw4REFBQ0M7b0JBQUdDLFdBQVU7OEJBQXVCOzs7Ozs7OEJBRXJDLDhEQUFDd0I7b0JBQUtDLFVBQVV2QjtvQkFBY0YsV0FBVTs7c0NBQ3RDLDhEQUFDQzs0QkFBSUQsV0FBVTs7OENBQ2IsOERBQUMwQjtvQ0FBTUMsU0FBUTtvQ0FBYzNCLFdBQVU7OENBQVc7Ozs7Ozs4Q0FHbEQsOERBQUM0QjtvQ0FDQ0MsU0FBUztvQ0FDVEMsTUFBSztvQ0FDTEMsSUFBRztvQ0FDSC9CLFdBQVU7b0NBQ1ZnQyxLQUFLdkM7b0NBQ0x3QyxRQUFROzs7Ozs7Ozs7Ozs7c0NBR1osOERBQUNoQzs0QkFBSUQsV0FBVTs7OENBQ2IsOERBQUMwQjtvQ0FBTUMsU0FBUTtvQ0FBUTNCLFdBQVU7OENBQVc7Ozs7Ozs4Q0FHNUMsOERBQUM0QjtvQ0FDQ0UsTUFBSztvQ0FDTEksTUFBSztvQ0FDTEgsSUFBRztvQ0FDSC9CLFdBQVU7b0NBQ1ZnQyxLQUFLckM7Ozs7Ozs7Ozs7OztzQ0FHVCw4REFBQ007NEJBQUlELFdBQVU7c0NBQXFDSjs7Ozs7O3NDQUNwRCw4REFBQ3VDOzRCQUNDTCxNQUFLOzRCQUNMOUIsV0FBVTtzQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTVQ7QUFDRjtHQXpHd0JoQjs7UUFDWUwsdURBQVVBO1FBQzdCQyxzREFBU0E7OztLQUZGSSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvd2ViaW5hcnMvY3JlYXRlL3BhZ2UuanM/MTEzZiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuXHJcbmltcG9ydCB7IHVzZVNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL3JlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENyZWF0ZVByb2R1Y3QoKSB7XHJcbiAgY29uc3QgeyBkYXRhOiBzZXNzaW9uLCBzdGF0dXMgfSA9IHVzZVNlc3Npb24oKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChcclxuICAgICAgc3RhdHVzID09IFwidW5hdXRoZW50aWNhdGVkXCIgfHxcclxuICAgICAgKHN0YXR1cyA9PSBcImF1dGhlbnRpY2F0ZWRcIiAmJiAhc2Vzc2lvbi5yb2xlcz8uaW5jbHVkZXMoXCJjcmVhdG9yXCIpKVxyXG4gICAgKSB7XHJcbiAgICAgIHJvdXRlci5wdXNoKFwiL3VuYXV0aG9yaXplZFwiKTtcclxuICAgICAgcm91dGVyLnJlZnJlc2goKTtcclxuICAgIH1cclxuICB9LCBbc2Vzc2lvbiwgc3RhdHVzLCByb3V0ZXJdKTtcclxuXHJcbiAgY29uc3QgcHJvZHVjdE5hbWVSZWYgPSBSZWFjdC51c2VSZWYoKTtcclxuICBjb25zdCBwcmljZVJlZiA9IFJlYWN0LnVzZVJlZigpO1xyXG5cclxuICBjb25zdCBbZXJyb3JNc2csIHNldEVycm9yTXNnXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBpZiAoc3RhdHVzID09IFwibG9hZGluZ1wiKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bWFpbj5cclxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgdGV4dC1jZW50ZXJcIj5DcmVhdGUgcHJvZHVjdDwvaDE+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LTJ4bFwiPkxvYWRpbmcuLi48L2Rpdj5cclxuICAgICAgPC9tYWluPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChzZXNzaW9uICYmIHNlc3Npb24ucm9sZXM/LmluY2x1ZGVzKFwiY3JlYXRvclwiKSkge1xyXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBjb25zdCBwb3N0Qm9keSA9IHtcclxuICAgICAgICBuYW1lOiBwcm9kdWN0TmFtZVJlZi5jdXJyZW50LnZhbHVlLFxyXG4gICAgICAgIHByaWNlOiBwYXJzZUZsb2F0KHByaWNlUmVmLmN1cnJlbnQudmFsdWUpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOlwiZGVzY3JpcHRpb25cIixcclxuICAgICAgICBkYXRlOlwiNTAvNTBcIlxyXG4gICAgICB9O1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goXCIvd2ViaW5hcnNcIiwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgIC8vIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgIFwiVGVzdFwiOlwiVGVzdD4+Pj4+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIC8vIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwb3N0Qm9keSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDcmVhdGUgV2ViaW5hciBQYWdlZVwiLHJlc3ApXHJcblxyXG4gICAgICAgIGlmIChyZXNwLm9rKSB7XHJcbiAgICAgICAgICByb3V0ZXIucHVzaChcIi93ZWJpbmFyc1wiKTtcclxuICAgICAgICAgIHJvdXRlci5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBqc29uID0gYXdhaXQgcmVzcC5qc29uKCk7XHJcbiAgICAgICAgICBzZXRFcnJvck1zZyhcIlVuYWJsZSB0byBjYWxsIHRoZSBBUEk6IFwiICsganNvbi5lcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBzZXRFcnJvck1zZyhcIlVuYWJsZSB0byBjYWxsIHRoZSBBUEk6IFwiICsgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bWFpbj5cclxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC00eGwgdGV4dC1jZW50ZXJcIj5DcmVhdGUgcHJvZHVjdDwvaDE+XHJcblxyXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cIm10LTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLzJcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwcm9kdWN0TmFtZVwiIGNsYXNzTmFtZT1cInRleHQtMnhsXCI+XHJcbiAgICAgICAgICAgICAgV2ViaW5hcnMgbmFtZTpcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgYXV0b0ZvY3VzXHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGlkPVwicHJvZHVjdE5hbWVcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTEgdGV4dC1ibGFjayBiZy1ncmF5LTIwMCB0ZXh0LWxnXCJcclxuICAgICAgICAgICAgICByZWY9e3Byb2R1Y3ROYW1lUmVmfVxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xLzIgbXQtMlwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInByaWNlXCIgY2xhc3NOYW1lPVwidGV4dC0yeGxcIj5cclxuICAgICAgICAgICAgICBQcmljZTpcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgc3RlcD1cIjAuMDFcIlxyXG4gICAgICAgICAgICAgIGlkPVwicHJpY2VcIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTEgdGV4dC1ibGFjayBiZy1ncmF5LTIwMCB0ZXh0LWxnXCJcclxuICAgICAgICAgICAgICByZWY9e3ByaWNlUmVmfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHRleHQtMnhsIHRleHQtcmVkLTYwMFwiPntlcnJvck1zZ308L2Rpdj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTMgYmctYmx1ZS05MDAgZm9udC1ib2xkIHRleHQtd2hpdGUgcHktMSBweC0yIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1ncmF5LTUwXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgQ3JlYXRlXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvbWFpbj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VTZXNzaW9uIiwidXNlUm91dGVyIiwiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkNyZWF0ZVByb2R1Y3QiLCJzZXNzaW9uIiwiZGF0YSIsInN0YXR1cyIsInJvdXRlciIsInJvbGVzIiwiaW5jbHVkZXMiLCJwdXNoIiwicmVmcmVzaCIsInByb2R1Y3ROYW1lUmVmIiwidXNlUmVmIiwicHJpY2VSZWYiLCJlcnJvck1zZyIsInNldEVycm9yTXNnIiwibWFpbiIsImgxIiwiY2xhc3NOYW1lIiwiZGl2IiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInBvc3RCb2R5IiwibmFtZSIsImN1cnJlbnQiLCJ2YWx1ZSIsInByaWNlIiwicGFyc2VGbG9hdCIsImRlc2NyaXB0aW9uIiwiZGF0ZSIsInJlc3AiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwianNvbiIsImVycm9yIiwiZXJyIiwiZm9ybSIsIm9uU3VibWl0IiwibGFiZWwiLCJodG1sRm9yIiwiaW5wdXQiLCJhdXRvRm9jdXMiLCJ0eXBlIiwiaWQiLCJyZWYiLCJyZXF1aXJlZCIsInN0ZXAiLCJidXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/webinars/create/page.js\n"));

/***/ })

});