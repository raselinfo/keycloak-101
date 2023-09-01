"use strict";
(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[302],{

/***/ 51754:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ useAdminRoles)
/* harmony export */ });
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63838);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61020);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40464);



const useAdminRoles = (params = {}, queryOptions = {}) => {
  const { id = "", ...queryParams } = params;
  const { get } = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__/* .useFetchClient */ .kY)();
  const { locale } = (0,react_intl__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
  const formatter = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__/* .useCollator */ .Xe)(locale, {
    sensitivity: "base"
  });
  const { data, error, isError, isLoading, refetch } = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)(
    ["roles", id, queryParams],
    async () => {
      const { data: data2 } = await get(`/admin/roles/${id ?? ""}`, {
        params: queryParams
      });
      return data2;
    },
    queryOptions
  );
  let roles = [];
  if (id && data) {
    roles = [data.data];
  } else if (Array.isArray(data?.data)) {
    roles = data.data;
  }
  return {
    roles: roles.sort((a, b) => formatter.compare(a.name, b.name)),
    error,
    isError,
    isLoading,
    refetch
  };
};


/***/ }),

/***/ 29388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  SingleSignOn: () => (/* binding */ SingleSignOn),
  "default": () => (/* binding */ pages_SingleSignOn)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/Layout.js
var Layout = __webpack_require__(9);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(65000);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(42925);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(6854);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(35750);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(86049);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(25667);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ToggleInput/ToggleInput.js
var ToggleInput = __webpack_require__(9618);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Select.js
var Select = __webpack_require__(5007);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/Option.js
var Option = __webpack_require__(551);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/MultiSelect.js
var MultiSelect = __webpack_require__(95546);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Check.js
var Check = __webpack_require__(8766);
// EXTERNAL MODULE: ./node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(6078);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(49402);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/index.js + 16 modules
var hooks = __webpack_require__(92807);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/useAdminRoles/index.js
var useAdminRoles = __webpack_require__(51754);
// EXTERNAL MODULE: ./.cache/admin/src/pages/App/selectors.js
var selectors = __webpack_require__(36364);
// EXTERNAL MODULE: ./node_modules/yup/es/index.js + 26 modules
var yup_es = __webpack_require__(47853);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/SingleSignOn/utils/schema.js


const schema = yup_es/* object */.Ry().shape({
  autoRegister: yup_es/* bool */.Xg().required(helper_plugin_esm/* translatedErrors */.I0.required),
  defaultRole: yup_es/* mixed */.nK().when("autoRegister", (value, initSchema) => {
    return value ? initSchema.required(helper_plugin_esm/* translatedErrors */.I0.required) : initSchema.nullable();
  }),
  ssoLockedRoles: yup_es/* array */.IX().nullable().of(
    yup_es/* mixed */.nK().when("ssoLockedRoles", (value, initSchema) => {
      return value ? initSchema.required(helper_plugin_esm/* translatedErrors */.I0.required) : initSchema.nullable();
    })
  )
});
/* harmony default export */ const utils_schema = (schema);

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/SingleSignOn/index.js











const SingleSignOn = () => {
  (0,helper_plugin_esm/* useFocusWhenNavigate */.go)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const permissions = (0,es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  const {
    isLoading: isLoadingPermissions,
    allowedActions: { canUpdate, canReadRoles }
  } = (0,helper_plugin_esm/* useRBAC */.ss)({
    ...permissions.settings.sso,
    readRoles: permissions.settings.roles.read
  });
  const [
    { formErrors, initialData, isLoading: isLoadingForm, modifiedData, showHeaderButtonLoader },
    ,
    { handleChange, handleSubmit }
  ] = (0,hooks/* useSettingsForm */.G4)("/admin/providers/options", utils_schema, () => {
  }, [
    "autoRegister",
    "defaultRole",
    "ssoLockedRoles"
  ]);
  const { roles, isLoading: isLoadingRoles } = (0,useAdminRoles/* useAdminRoles */.F)(void 0, {
    enabled: canReadRoles
  });
  const isLoading = isLoadingPermissions || isLoadingRoles || isLoadingForm;
  return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(helper_plugin_esm/* SettingsPageTitle */.SL, { name: "SSO" }), /* @__PURE__ */ react.createElement(Main/* Main */.o, { tabIndex: -1 }, /* @__PURE__ */ react.createElement("form", { onSubmit: handleSubmit }, /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      primaryAction: /* @__PURE__ */ react.createElement(
        Button/* Button */.z,
        {
          "data-testid": "save-button",
          disabled: isEqual_default()(initialData, modifiedData),
          loading: showHeaderButtonLoader,
          startIcon: /* @__PURE__ */ react.createElement(Check/* default */.Z, null),
          type: "submit",
          size: "L"
        },
        formatMessage({
          id: "global.save",
          defaultMessage: "Save"
        })
      ),
      title: formatMessage({ id: "Settings.sso.title", defaultMessage: "Single Sign-On" }),
      subtitle: formatMessage({
        id: "Settings.sso.description",
        defaultMessage: "Configure the settings for the Single Sign-On feature."
      })
    }
  ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, isLoading ? /* @__PURE__ */ react.createElement(helper_plugin_esm/* LoadingIndicatorPage */.dO, null) : /* @__PURE__ */ react.createElement(
    Flex/* Flex */.k,
    {
      direction: "column",
      alignItems: "stretch",
      gap: 4,
      background: "neutral0",
      padding: 6,
      shadow: "filterShadow",
      hasRadius: true
    },
    /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "delta", as: "h2" }, formatMessage({
      id: "global.settings",
      defaultMessage: "Settings"
    })),
    /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { gap: 4 }, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6, m: 6, s: 12 }, /* @__PURE__ */ react.createElement(
      ToggleInput/* ToggleInput */.s,
      {
        "aria-label": "autoRegister",
        "data-testid": "autoRegister",
        disabled: !canUpdate,
        checked: modifiedData.autoRegister,
        hint: formatMessage({
          id: "Settings.sso.form.registration.description",
          defaultMessage: "Create new user on SSO login if no account exists"
        }),
        label: formatMessage({
          id: "Settings.sso.form.registration.label",
          defaultMessage: "Auto-registration"
        }),
        name: "autoRegister",
        offLabel: formatMessage({
          id: "app.components.ToggleCheckbox.off-label",
          defaultMessage: "Off"
        }),
        onLabel: formatMessage({
          id: "app.components.ToggleCheckbox.on-label",
          defaultMessage: "On"
        }),
        onChange: (e) => {
          handleChange({
            target: { name: "autoRegister", value: e.target.checked }
          });
        }
      }
    )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6, m: 6, s: 12 }, /* @__PURE__ */ react.createElement(
      Select/* Select */.P,
      {
        disabled: !canUpdate,
        hint: formatMessage({
          id: "Settings.sso.form.defaultRole.description",
          defaultMessage: "It will attach the new authenticated user to the selected role"
        }),
        error: formErrors.defaultRole ? formatMessage({
          id: formErrors.defaultRole.id,
          defaultMessage: formErrors.defaultRole.id
        }) : "",
        label: formatMessage({
          id: "Settings.sso.form.defaultRole.label",
          defaultMessage: "Default role"
        }),
        name: "defaultRole",
        onChange: (value) => {
          handleChange({ target: { name: "defaultRole", value } });
        },
        placeholder: formatMessage({
          id: "components.InputSelect.option.placeholder",
          defaultMessage: "Choose here"
        }),
        value: modifiedData.defaultRole
      },
      roles.map(({ id, name }) => /* @__PURE__ */ react.createElement(Option/* Option */.W, { key: id, value: id.toString() }, name))
    )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6, m: 6, s: 12 }, /* @__PURE__ */ react.createElement(
      MultiSelect/* MultiSelect */.NU,
      {
        disabled: !canUpdate,
        hint: formatMessage({
          id: "Settings.sso.form.localAuthenticationLock.description",
          defaultMessage: "Select the roles for which you want to disable the local authentication"
        }),
        error: formErrors.ssoLockedRoles ? formatMessage({
          id: formErrors.ssoLockedRoles.id,
          defaultMessage: formErrors.ssoLockedRoles.id
        }) : "",
        label: formatMessage({
          id: "Settings.sso.form.localAuthenticationLock.label",
          defaultMessage: "Local authentication lock-out"
        }),
        name: "ssoLockedRoles",
        onChange: (value) => {
          handleChange({ target: { name: "ssoLockedRoles", value } });
        },
        placeholder: formatMessage({
          id: "components.InputSelect.option.placeholder",
          defaultMessage: "Choose here"
        }),
        onClear: () => {
          const emptyArray = [];
          handleChange({ target: { name: "ssoLockedRoles", emptyArray } });
        },
        value: modifiedData.ssoLockedRoles || [],
        withTags: true
      },
      roles.map(({ id, name }) => /* @__PURE__ */ react.createElement(MultiSelect/* MultiSelectOption */.ML, { key: id, value: id.toString() }, name))
    )))
  )))));
};
const ProtectedSSO = () => {
  const permissions = (0,es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  return /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPagePermissions */.O4, { permissions: permissions.settings.sso.main }, /* @__PURE__ */ react.createElement(SingleSignOn, null));
};
/* harmony default export */ const pages_SingleSignOn = (ProtectedSSO);


/***/ })

}]);