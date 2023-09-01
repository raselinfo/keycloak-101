"use strict";
(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[2282],{

/***/ 1431:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ProvidersPage: () => (/* binding */ ProvidersPage),
  "default": () => (/* binding */ Providers)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
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
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/VisuallyHidden/VisuallyHidden.js
var VisuallyHidden = __webpack_require__(30249);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Table/Tbody.js
var Tbody = __webpack_require__(81228);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/IconButton/IconButton.js
var IconButton = __webpack_require__(77216);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Pencil.js
var Pencil = __webpack_require__(76825);
// EXTERNAL MODULE: ./node_modules/lodash/upperFirst.js
var upperFirst = __webpack_require__(51943);
var upperFirst_default = /*#__PURE__*/__webpack_require__.n(upperFirst);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var es = __webpack_require__(40464);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ModalLayout/ModalLayout.js
var ModalLayout = __webpack_require__(51444);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ModalLayout/ModalHeader.js
var ModalHeader = __webpack_require__(63246);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ModalLayout/ModalBody.js
var ModalBody = __webpack_require__(61872);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(86049);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(25667);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ModalLayout/ModalFooter.js
var ModalFooter = __webpack_require__(64643);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(6854);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/v2/Breadcrumbs/Breadcrumbs.js + 1 modules
var Breadcrumbs = __webpack_require__(37810);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/v2/Breadcrumbs/Crumb.js
var Crumb = __webpack_require__(93314);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 121 modules
var formik_esm = __webpack_require__(71563);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(70627);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ToggleInput/ToggleInput.js
var ToggleInput = __webpack_require__(9618);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.js
var TextInput = __webpack_require__(54095);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/FormModal/Input/index.js




const Input = ({
  description,
  disabled,
  intlLabel,
  error,
  name,
  onChange,
  placeholder,
  providerToEditName,
  type,
  value
}) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const inputValue = name === "noName" ? `${window.strapi.backendURL}/api/connect/${providerToEditName}/callback` : value;
  const label = formatMessage(
    { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
    { provider: providerToEditName, ...intlLabel.values }
  );
  const hint = description ? formatMessage(
    { id: description.id, defaultMessage: description.defaultMessage },
    { provider: providerToEditName, ...description.values }
  ) : "";
  if (type === "bool") {
    return /* @__PURE__ */ react.createElement(
      ToggleInput/* ToggleInput */.s,
      {
        "aria-label": name,
        checked: value,
        disabled,
        hint,
        label,
        name,
        offLabel: formatMessage({
          id: "app.components.ToggleCheckbox.off-label",
          defaultMessage: "Off"
        }),
        onLabel: formatMessage({
          id: "app.components.ToggleCheckbox.on-label",
          defaultMessage: "On"
        }),
        onChange: (e) => {
          onChange({ target: { name, value: e.target.checked } });
        }
      }
    );
  }
  const formattedPlaceholder = placeholder ? formatMessage(
    { id: placeholder.id, defaultMessage: placeholder.defaultMessage },
    { ...placeholder.values }
  ) : "";
  const errorMessage = error ? formatMessage({ id: error, defaultMessage: error }) : "";
  return /* @__PURE__ */ react.createElement(
    TextInput/* TextInput */.o,
    {
      "aria-label": name,
      disabled,
      error: errorMessage,
      label,
      name,
      onChange,
      placeholder: formattedPlaceholder,
      type,
      value: inputValue
    }
  );
};
Input.defaultProps = {
  description: null,
  disabled: false,
  error: "",
  placeholder: null,
  value: ""
};
Input.propTypes = {
  description: prop_types_default().shape({
    id: (prop_types_default()).string.isRequired,
    defaultMessage: (prop_types_default()).string.isRequired,
    values: (prop_types_default()).object
  }),
  disabled: (prop_types_default()).bool,
  error: (prop_types_default()).string,
  intlLabel: prop_types_default().shape({
    id: (prop_types_default()).string.isRequired,
    defaultMessage: (prop_types_default()).string.isRequired,
    values: (prop_types_default()).object
  }).isRequired,
  name: (prop_types_default()).string.isRequired,
  onChange: (prop_types_default()).func.isRequired,
  placeholder: prop_types_default().shape({
    id: (prop_types_default()).string.isRequired,
    defaultMessage: (prop_types_default()).string.isRequired,
    values: (prop_types_default()).object
  }),
  providerToEditName: (prop_types_default()).string.isRequired,
  type: (prop_types_default()).string.isRequired,
  value: prop_types_default().oneOfType([(prop_types_default()).bool, (prop_types_default()).string])
};
/* harmony default export */ const FormModal_Input = (Input);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/components/FormModal/index.js








const FormModal = ({
  headerBreadcrumbs,
  initialData,
  isSubmiting,
  layout,
  isOpen,
  onSubmit,
  onToggle,
  providerToEditName
}) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ react.createElement(ModalLayout/* ModalLayout */.P, { onClose: onToggle, labelledBy: "title" }, /* @__PURE__ */ react.createElement(ModalHeader/* ModalHeader */.x, null, /* @__PURE__ */ react.createElement(Breadcrumbs/* Breadcrumbs */.O, { label: headerBreadcrumbs.join(", ") }, headerBreadcrumbs.map((crumb, index, arr) => /* @__PURE__ */ react.createElement(Crumb/* Crumb */.$, { isCurrent: index === arr.length - 1, key: crumb }, crumb)))), /* @__PURE__ */ react.createElement(
    formik_esm/* Formik */.J9,
    {
      onSubmit: (values) => onSubmit(values),
      initialValues: initialData,
      validationSchema: layout.schema,
      validateOnChange: false
    },
    ({ errors, handleChange, values }) => {
      return /* @__PURE__ */ react.createElement(helper_plugin_esm/* Form */.l0, null, /* @__PURE__ */ react.createElement(ModalBody/* ModalBody */.f, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 1 }, /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { gap: 5 }, layout.form.map((row) => {
        return row.map((input) => {
          return /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { key: input.name, col: input.size, xs: 12 }, /* @__PURE__ */ react.createElement(
            FormModal_Input,
            {
              ...input,
              error: errors[input.name],
              onChange: handleChange,
              value: values[input.name],
              providerToEditName
            }
          ));
        });
      })))), /* @__PURE__ */ react.createElement(
        ModalFooter/* ModalFooter */.m,
        {
          startActions: /* @__PURE__ */ react.createElement(Button/* Button */.z, { variant: "tertiary", onClick: onToggle, type: "button" }, formatMessage({
            id: "app.components.Button.cancel",
            defaultMessage: "Cancel"
          })),
          endActions: /* @__PURE__ */ react.createElement(Button/* Button */.z, { type: "submit", loading: isSubmiting }, formatMessage({ id: "global.save", defaultMessage: "Save" }))
        }
      ));
    }
  ));
};
FormModal.defaultProps = {
  initialData: null,
  providerToEditName: null
};
FormModal.propTypes = {
  headerBreadcrumbs: prop_types_default().arrayOf((prop_types_default()).string).isRequired,
  initialData: (prop_types_default()).object,
  layout: prop_types_default().shape({
    form: prop_types_default().arrayOf((prop_types_default()).array),
    schema: (prop_types_default()).object
  }).isRequired,
  isOpen: (prop_types_default()).bool.isRequired,
  isSubmiting: (prop_types_default()).bool.isRequired,
  onSubmit: (prop_types_default()).func.isRequired,
  onToggle: (prop_types_default()).func.isRequired,
  providerToEditName: (prop_types_default()).string
};
/* harmony default export */ const components_FormModal = (FormModal);

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/constants.js
var constants = __webpack_require__(84419);
// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/index.js + 1 modules
var utils = __webpack_require__(99688);
// EXTERNAL MODULE: ./node_modules/yup/es/index.js + 26 modules
var yup_es = __webpack_require__(47853);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Providers/utils/forms.js



const callbackLabel = {
  id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.redirectURL.front-end.label"),
  defaultMessage: "The redirect URL to your front-end app"
};
const callbackPlaceholder = {
  id: "http://www.client-app.com",
  defaultMessage: "http://www.client-app.com"
};
const enabledDescription = {
  id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.enabled.description"),
  defaultMessage: "If disabled, users won't be able to use this provider."
};
const enabledLabel = {
  id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.enabled.label"),
  defaultMessage: "Enable"
};
const keyLabel = { id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.key.label"), defaultMessage: "Client ID" };
const hintLabel = {
  id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.redirectURL.label"),
  defaultMessage: "The redirect URL to add in your {provider} application configurations"
};
const textPlaceholder = {
  id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.key.placeholder"),
  defaultMessage: "TEXT"
};
const secretLabel = {
  id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.secret.label"),
  defaultMessage: "Client Secret"
};
const forms_forms = {
  email: {
    form: [
      [
        {
          intlLabel: enabledLabel,
          name: "enabled",
          type: "bool",
          description: enabledDescription,
          size: 6
          // TODO check if still needed
          // validations: {
          //   required: true,
          // },
        }
      ]
    ],
    schema: yup_es/* object */.Ry().shape({
      enabled: yup_es/* bool */.Xg().required(helper_plugin_esm/* translatedErrors */.I0.required)
    })
  },
  providers: {
    form: [
      [
        {
          intlLabel: enabledLabel,
          name: "enabled",
          type: "bool",
          description: enabledDescription,
          size: 6,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: keyLabel,
          name: "key",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: secretLabel,
          name: "secret",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: callbackLabel,
          placeholder: callbackPlaceholder,
          name: "callback",
          type: "text",
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: hintLabel,
          name: "noName",
          type: "text",
          validations: {},
          size: 12,
          disabled: true
        }
      ]
    ],
    schema: yup_es/* object */.Ry().shape({
      enabled: yup_es/* bool */.Xg().required(helper_plugin_esm/* translatedErrors */.I0.required),
      key: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      }),
      secret: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      }),
      callback: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      })
    })
  },
  providersWithSubdomain: {
    form: [
      [
        {
          intlLabel: enabledLabel,
          name: "enabled",
          type: "bool",
          description: enabledDescription,
          size: 6,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: keyLabel,
          name: "key",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: secretLabel,
          name: "secret",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: {
            id: (0,utils/* getTrad */.OB)({ id: "PopUpForm.Providers.jwksurl.label" }),
            defaultMessage: "JWKS URL"
          },
          name: "jwksurl",
          type: "text",
          placeholder: textPlaceholder,
          size: 12,
          validations: {
            required: false
          }
        }
      ],
      [
        {
          intlLabel: {
            id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.subdomain.label"),
            defaultMessage: "Host URI (Subdomain)"
          },
          name: "subdomain",
          type: "text",
          placeholder: {
            id: (0,utils/* getTrad */.OB)("PopUpForm.Providers.subdomain.placeholder"),
            defaultMessage: "my.subdomain.com"
          },
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: callbackLabel,
          placeholder: callbackPlaceholder,
          name: "callback",
          type: "text",
          size: 12,
          validations: {
            required: true
          }
        }
      ],
      [
        {
          intlLabel: hintLabel,
          name: "noName",
          type: "text",
          validations: {},
          size: 12,
          disabled: true
        }
      ]
    ],
    schema: yup_es/* object */.Ry().shape({
      enabled: yup_es/* bool */.Xg().required(helper_plugin_esm/* translatedErrors */.I0.required),
      key: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      }),
      secret: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      }),
      subdomain: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      }),
      callback: yup_es/* string */.Z_().when("enabled", {
        is: true,
        then: yup_es/* string */.Z_().required(helper_plugin_esm/* translatedErrors */.I0.required),
        otherwise: yup_es/* string */.Z_()
      })
    })
  }
};
/* harmony default export */ const utils_forms = (forms_forms);

;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/pages/Providers/index.js











const ProvidersPage = () => {
  const { formatMessage, locale } = (0,useIntl/* default */.Z)();
  const queryClient = (0,es.useQueryClient)();
  const { trackUsage } = (0,helper_plugin_esm/* useTracking */.rS)();
  const [isOpen, setIsOpen] = react.useState(false);
  const [providerToEditName, setProviderToEditName] = react.useState(null);
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const { lockApp, unlockApp } = (0,helper_plugin_esm/* useOverlayBlocker */.o1)();
  const { get, put } = (0,helper_plugin_esm/* useFetchClient */.kY)();
  const { formatAPIError } = (0,helper_plugin_esm/* useAPIErrorHandler */.So)();
  const formatter = (0,helper_plugin_esm/* useCollator */.Xe)(locale, {
    sensitivity: "base"
  });
  (0,helper_plugin_esm/* useFocusWhenNavigate */.go)();
  const {
    isLoading: isLoadingPermissions,
    allowedActions: { canUpdate }
  } = (0,helper_plugin_esm/* useRBAC */.ss)({ update: constants/* PERMISSIONS */._.updateProviders });
  const { isLoading: isLoadingData, data } = (0,es.useQuery)(
    ["users-permissions", "get-providers"],
    async () => {
      const { data: data2 } = await get("/users-permissions/providers");
      return data2;
    },
    {
      initialData: {}
    }
  );
  const submitMutation = (0,es.useMutation)((body) => put("/users-permissions/providers", body), {
    async onSuccess() {
      await queryClient.invalidateQueries(["users-permissions", "providers"]);
      toggleNotification({
        type: "success",
        message: { id: (0,utils/* getTrad */.OB)("notification.success.submit") }
      });
      trackUsage("didEditAuthenticationProvider");
      handleToggleModal();
      unlockApp();
    },
    onError(error) {
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
      unlockApp();
    },
    refetchActive: false
  });
  const providers = Object.entries(data).reduce((acc, [name, provider]) => {
    const { icon, enabled, subdomain } = provider;
    acc.push({
      name,
      icon: icon === "envelope" ? ["fas", "envelope"] : ["fab", icon],
      enabled,
      subdomain
    });
    return acc;
  }, []).sort((a, b) => formatter.compare(a.name, b.name));
  const isLoading = isLoadingData || isLoadingPermissions;
  const isProviderWithSubdomain = react.useMemo(() => {
    if (!providerToEditName) {
      return false;
    }
    const providerToEdit = providers.find((obj) => obj.name === providerToEditName);
    return !!providerToEdit?.subdomain;
  }, [providers, providerToEditName]);
  const layoutToRender = react.useMemo(() => {
    if (providerToEditName === "email") {
      return utils_forms.email;
    }
    if (isProviderWithSubdomain) {
      return utils_forms.providersWithSubdomain;
    }
    return utils_forms.providers;
  }, [providerToEditName, isProviderWithSubdomain]);
  const handleToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClickEdit = (provider) => {
    if (canUpdate) {
      setProviderToEditName(provider.name);
      handleToggleModal();
    }
  };
  const handleSubmit = async (values) => {
    lockApp();
    trackUsage("willEditAuthenticationProvider");
    submitMutation.mutate({ providers: { ...data, [providerToEditName]: values } });
  };
  return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(
    helper_plugin_esm/* SettingsPageTitle */.SL,
    {
      name: formatMessage({
        id: (0,utils/* getTrad */.OB)("HeaderNav.link.providers"),
        defaultMessage: "Providers"
      })
    }
  ), /* @__PURE__ */ react.createElement(Main/* Main */.o, null, /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      title: formatMessage({
        id: (0,utils/* getTrad */.OB)("HeaderNav.link.providers"),
        defaultMessage: "Providers"
      })
    }
  ), isLoading ? /* @__PURE__ */ react.createElement(helper_plugin_esm/* LoadingIndicatorPage */.dO, null) : /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, /* @__PURE__ */ react.createElement(Table/* Table */.i, { colCount: 3, rowCount: providers.length + 1 }, /* @__PURE__ */ react.createElement(Thead/* Thead */.h, null, /* @__PURE__ */ react.createElement(Tr.Tr, null, /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma", textColor: "neutral600" }, formatMessage({ id: "global.name", defaultMessage: "Name" }))), /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma", textColor: "neutral600" }, formatMessage({ id: (0,utils/* getTrad */.OB)("Providers.status"), defaultMessage: "Status" }))), /* @__PURE__ */ react.createElement(Cell.Th, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "sigma" }, /* @__PURE__ */ react.createElement(VisuallyHidden/* VisuallyHidden */.T, null, formatMessage({
    id: "global.settings",
    defaultMessage: "Settings"
  })))))), /* @__PURE__ */ react.createElement(Tbody/* Tbody */.p, null, providers.map((provider) => /* @__PURE__ */ react.createElement(
    Tr.Tr,
    {
      key: provider.name,
      ...(0,helper_plugin_esm/* onRowClick */.X7)({
        fn: () => handleClickEdit(provider),
        condition: canUpdate
      })
    },
    /* @__PURE__ */ react.createElement(Cell.Td, { width: "45%" }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { fontWeight: "semiBold", textColor: "neutral800" }, provider.name)),
    /* @__PURE__ */ react.createElement(Cell.Td, { width: "65%" }, /* @__PURE__ */ react.createElement(
      Typography/* Typography */.Z,
      {
        textColor: provider.enabled ? "success600" : "danger600",
        "data-testid": `enable-${provider.name}`
      },
      provider.enabled ? formatMessage({
        id: "global.enabled",
        defaultMessage: "Enabled"
      }) : formatMessage({
        id: "global.disabled",
        defaultMessage: "Disabled"
      })
    )),
    /* @__PURE__ */ react.createElement(Cell.Td, { ...helper_plugin_esm/* stopPropagation */.UW }, canUpdate && /* @__PURE__ */ react.createElement(
      IconButton/* IconButton */.h,
      {
        onClick: () => handleClickEdit(provider),
        noBorder: true,
        icon: /* @__PURE__ */ react.createElement(Pencil/* default */.Z, null),
        label: "Edit"
      }
    ))
  )))))), /* @__PURE__ */ react.createElement(
    components_FormModal,
    {
      initialData: data[providerToEditName],
      isOpen,
      isSubmiting: submitMutation.isLoading,
      layout: layoutToRender,
      headerBreadcrumbs: [
        formatMessage({
          id: (0,utils/* getTrad */.OB)("PopUpForm.header.edit.providers"),
          defaultMessage: "Edit Provider"
        }),
        upperFirst_default()(providerToEditName)
      ],
      onToggle: handleToggleModal,
      onSubmit: handleSubmit,
      providerToEditName
    }
  ));
};
const ProtectedProvidersPage = () => /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPagePermissions */.O4, { permissions: constants/* PERMISSIONS */._.readProviders }, /* @__PURE__ */ react.createElement(ProvidersPage, null));
/* harmony default export */ const Providers = (ProtectedProvidersPage);


/***/ }),

/***/ 99688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  YX: () => (/* reexport */ utils_cleanPermissions),
  OB: () => (/* reexport */ getTrad/* default */.Z)
});

// UNUSED EXPORTS: formatPolicies

// EXTERNAL MODULE: ./node_modules/lodash/isEmpty.js
var isEmpty = __webpack_require__(10124);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/cleanPermissions.js

const cleanPermissions = (permissions) => Object.keys(permissions).reduce((acc, current) => {
  const currentPermission = permissions[current].controllers;
  const cleanedControllers = Object.keys(currentPermission).reduce((acc2, curr) => {
    if (isEmpty_default()(currentPermission[curr])) {
      return acc2;
    }
    acc2[curr] = currentPermission[curr];
    return acc2;
  }, {});
  if (isEmpty_default()(cleanedControllers)) {
    return acc;
  }
  acc[current] = { controllers: cleanedControllers };
  return acc;
}, {});
/* harmony default export */ const utils_cleanPermissions = (cleanPermissions);

// EXTERNAL MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/getTrad.js + 1 modules
var getTrad = __webpack_require__(58655);
;// CONCATENATED MODULE: ./node_modules/@strapi/plugin-users-permissions/admin/src/utils/index.js





/***/ }),

/***/ 35750:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68263);


const d = ({ children: t }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, { paddingLeft: 10, paddingRight: 10, children: t });



/***/ }),

/***/ 42925:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  T: () => (/* binding */ HeaderLayout_b)
});

// UNUSED EXPORTS: BaseHeaderLayout

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(74081);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(37652);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useElementOnScreen.js

const b = (t) => {
  const e = (0,react.useRef)(null), [s, c] = (0,react.useState)(true), i = ([n]) => {
    c(n.isIntersecting);
  };
  return (0,react.useEffect)(() => {
    const n = e.current, r = new IntersectionObserver(i, t);
    return n && r.observe(e.current), () => {
      n && r.disconnect();
    };
  }, [e, t]), [e, s];
};


// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var dist = __webpack_require__(66705);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useResizeObserver.js


const c = (e, i) => {
  const t = (0,dist/* useCallbackRef */.W)(i);
  (0,react.useLayoutEffect)(() => {
    const r = new ResizeObserver(t);
    return Array.isArray(e) ? e.forEach((n) => {
      n.current && r.observe(n.current);
    }) : e.current && r.observe(e.current), () => {
      r.disconnect();
    };
  }, [e, t]);
};


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(68263);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js








const HeaderLayout_b = (r) => {
  const t = (0,react.useRef)(null), [i, d] = (0,react.useState)(null), [a, h] = b({
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  return c(a, () => {
    a.current && d(a.current.getBoundingClientRect());
  }), (0,react.useEffect)(() => {
    t.current && d(t.current.getBoundingClientRect());
  }, [t]), (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("div", { style: { height: i?.height }, ref: a, children: h && (0,jsx_runtime.jsx)(p, { ref: t, ...r }) }), !h && (0,jsx_runtime.jsx)(p, { ...r, sticky: true, width: i?.width })] });
};
HeaderLayout_b.displayName = "HeaderLayout";
const C = (0,styled_components_browser_esm/* default */.ZP)((0,Box/* Box */.x))`
  width: ${({ width: r }) => r ? `${r / 16}rem` : void 0};
  z-index: ${({ theme: r }) => r.zIndices[1]};
`, p = react.forwardRef(({ navigationAction: r, primaryAction: t, secondaryAction: i, subtitle: d, title: a, sticky: h, width: c, ...s }, g) => {
  const f = typeof d == "string";
  return h ? (0,jsx_runtime.jsx)(C, { paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, position: "fixed", top: 0, right: 0, background: "neutral0", shadow: "tableShadow", width: c, "data-strapi-header-sticky": true, children: (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { children: [r && (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingRight: 3, children: r }), (0,jsx_runtime.jsxs)(Box/* Box */.x, { children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "beta", as: "h1", ...s, children: a }), f ? (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "pi", textColor: "neutral600", children: d }) : d] }), i ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: i }) : null] }), (0,jsx_runtime.jsx)(Flex/* Flex */.k, { children: t ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 2, children: t }) : void 0 })] }) }) : (0,jsx_runtime.jsxs)(Box/* Box */.x, { ref: g, paddingLeft: 10, paddingRight: 10, paddingBottom: 8, paddingTop: r ? 6 : 8, background: "neutral100", "data-strapi-header": true, children: [r ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingBottom: 2, children: r }) : null, (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { minWidth: 0, children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { as: "h1", variant: "alpha", ...s, children: a }), i ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: i }) : null] }), t] }), f ? (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "epsilon", textColor: "neutral600", as: "p", children: d }) : d] });
});



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



/***/ }),

/***/ 65000:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37652);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68263);



const a = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`, m = ({ labelledBy: o = "main-content-title", ...n }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(a, { "aria-labelledby": o, as: "main", id: "main-content", tabIndex: -1, ...n });



/***/ })

}]);