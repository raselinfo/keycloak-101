"use strict";
(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[3677],{

/***/ 4186:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_InstalledPluginsPage)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__(364);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(49402);
// EXTERNAL MODULE: ./.cache/admin/src/pages/App/selectors.js
var selectors = __webpack_require__(36364);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/LiveRegions/useNotifyAT.js
var useNotifyAT = __webpack_require__(20600);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/Layout.js
var Layout = __webpack_require__(9);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(65000);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(42925);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(35750);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Table.js
var Table = __webpack_require__(63434);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Thead.js
var Thead = __webpack_require__(42879);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tr.js
var Tr = __webpack_require__(65913);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Cell.js
var Cell = __webpack_require__(68388);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tbody.js
var Tbody = __webpack_require__(81228);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var react_query_es = __webpack_require__(40464);
;// CONCATENATED MODULE: ./.cache/admin/src/pages/InstalledPluginsPage/hooks/usePlugins/index.js


const usePlugins = (notifyLoad) => {
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const { get } = (0,helper_plugin_esm/* useFetchClient */.kY)();
  return (0,react_query_es.useQuery)(
    ["plugins"],
    async () => {
      const { data } = await get("/admin/plugins");
      return data;
    },
    {
      onSuccess() {
        if (notifyLoad) {
          notifyLoad();
        }
      },
      onError() {
        toggleNotification({
          type: "warning",
          message: { id: "notification.error", defaultMessage: "An error occured" }
        });
      }
    }
  );
};

;// CONCATENATED MODULE: ./.cache/admin/src/pages/InstalledPluginsPage/Plugins.js





const Plugins = () => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { notifyStatus } = (0,useNotifyAT/* useNotifyAT */.G)();
  (0,helper_plugin_esm/* useFocusWhenNavigate */.go)();
  const title = formatMessage({
    id: "global.plugins",
    defaultMessage: "Plugins"
  });
  const notifyPluginPageLoad = () => {
    notifyStatus(
      formatMessage(
        {
          id: "app.utils.notify.data-loaded",
          defaultMessage: "The {target} has loaded"
        },
        { target: title }
      )
    );
  };
  const { status, data } = usePlugins(notifyPluginPageLoad);
  const isLoading = status !== "success" && status !== "error";
  if (isLoading) {
    return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, { "aria-busy": true }, /* @__PURE__ */ react.createElement(helper_plugin_esm/* LoadingIndicatorPage */.dO, null)));
  }
  return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      title,
      subtitle: formatMessage({
        id: "app.components.ListPluginsPage.description",
        defaultMessage: "List of the installed plugins in the project."
      })
    }
  ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, /* @__PURE__ */ react.createElement(Table/* Table */.i, { colCount: 2, rowCount: data?.plugins?.length ?? 0 + 1 }, /* @__PURE__ */ react.createElement(Thead/* Thead */.h, null, /* @__PURE__ */ react.createElement(Tr.Tr, null, /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma", textColor: "neutral600" }, formatMessage({
    id: "global.name",
    defaultMessage: "Name"
  }))), /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma", textColor: "neutral600" }, formatMessage({
    id: "global.description",
    defaultMessage: "description"
  }))))), /* @__PURE__ */ react.createElement(Tbody/* Tbody */.p, null, data.plugins.map(({ name, displayName, description }) => {
    return /* @__PURE__ */ react.createElement(Tr.Tr, { key: name }, /* @__PURE__ */ react.createElement(Cell.Td, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800", variant: "omega", fontWeight: "bold" }, formatMessage({
      id: `global.plugins.${name}`,
      defaultMessage: displayName
    }))), /* @__PURE__ */ react.createElement(Cell.Td, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800" }, formatMessage({
      id: `global.plugins.${name}.description`,
      defaultMessage: description
    }))));
  }))))));
};
/* harmony default export */ const InstalledPluginsPage_Plugins = (Plugins);

;// CONCATENATED MODULE: ./.cache/admin/src/pages/InstalledPluginsPage/index.js







const InstalledPluginsPage = () => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const permissions = (0,es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  return /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPagePermissions */.O4, { permissions: permissions.marketplace.main }, /* @__PURE__ */ react.createElement(
    Helmet/* Helmet */.q,
    {
      title: formatMessage({
        id: "global.plugins",
        defaultMessage: "Plugins"
      })
    }
  ), /* @__PURE__ */ react.createElement(InstalledPluginsPage_Plugins, null));
};
/* harmony default export */ const pages_InstalledPluginsPage = (InstalledPluginsPage);


/***/ }),

/***/ 9:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37652);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68263);



const d = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  display: grid;
  grid-template-columns: ${({ hasSideNav: o }) => o ? "auto 1fr" : "1fr"};
`, m = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  overflow-x: hidden;
`, f = ({ sideNav: o, children: e }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(d, { hasSideNav: !!o, children: [o, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(m, { paddingBottom: 10, children: e })] });



/***/ })

}]);