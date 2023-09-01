"use strict";
(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[8107],{

/***/ 21289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ STAGE_ATTRIBUTE_NAME),
/* harmony export */   U: () => (/* binding */ ASSIGNEE_ATTRIBUTE_NAME)
/* harmony export */ });
const STAGE_ATTRIBUTE_NAME = "strapi_stage";
const ASSIGNEE_ATTRIBUTE_NAME = "strapi_assignee";


/***/ }),

/***/ 56996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  InformationBoxEE: () => (/* reexport */ InformationBoxEE)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/pages/EditView/Information/index.js + 1 modules
var Information = __webpack_require__(50236);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/Field.js
var Field = __webpack_require__(96029);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Combobox/Combobox.js
var Combobox = __webpack_require__(68221);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Loader/Loader.js + 1 modules
var Loader = __webpack_require__(59912);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Combobox/ComboboxOption.js
var ComboboxOption = __webpack_require__(9620);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var es = __webpack_require__(40464);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var react_redux_es = __webpack_require__(49402);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/utils/index.js + 11 modules
var utils = __webpack_require__(21892);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/useAdminUsers/index.js + 1 modules
var useAdminUsers = __webpack_require__(54920);
// EXTERNAL MODULE: ./.cache/admin/src/pages/App/selectors.js
var selectors = __webpack_require__(36364);
// EXTERNAL MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/constants.js
var constants = __webpack_require__(21289);
;// CONCATENATED MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/components/AssigneeSelect/AssigneeSelect.js










function AssigneeSelect() {
  const {
    initialData,
    layout: { uid },
    isSingleType,
    onChange
  } = (0,helper_plugin_esm/* useCMEditViewDataManager */.Wq)();
  const permissions = (0,react_redux_es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { formatAPIError } = (0,helper_plugin_esm/* useAPIErrorHandler */.So)();
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const { put } = (0,helper_plugin_esm/* useFetchClient */.kY)();
  const {
    allowedActions: { canReadUsers }
  } = (0,helper_plugin_esm/* useRBAC */.ss)({
    readUsers: permissions.settings.users.read
  });
  const { users, isLoading, isError } = (0,useAdminUsers/* useAdminUsers */.R)(
    {},
    {
      enabled: canReadUsers
    }
  );
  const currentAssignee = initialData?.[constants/* ASSIGNEE_ATTRIBUTE_NAME */.U] ?? null;
  const handleChange = async ({ value: assigneeId }) => {
    mutation.mutate({
      entityId: initialData.id,
      assigneeId: parseInt(assigneeId, 10),
      uid
    });
  };
  const mutation = (0,es.useMutation)(
    async ({ entityId, assigneeId, uid: uid2 }) => {
      const typeSlug = isSingleType ? "single-types" : "collection-types";
      const {
        data: { data: createdEntity }
      } = await put(`/admin/content-manager/${typeSlug}/${uid2}/${entityId}/assignee`, {
        data: { id: assigneeId }
      });
      onChange(
        {
          target: { name: constants/* ASSIGNEE_ATTRIBUTE_NAME */.U, value: createdEntity[constants/* ASSIGNEE_ATTRIBUTE_NAME */.U] }
        },
        true
      );
      return createdEntity;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "content-manager.reviewWorkflows.assignee.notification.saved",
            defaultMessage: "Assignee updated"
          }
        });
      }
    }
  );
  return /* @__PURE__ */ react.createElement(Field/* Field */.g, { name: constants/* ASSIGNEE_ATTRIBUTE_NAME */.U, id: constants/* ASSIGNEE_ATTRIBUTE_NAME */.U }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", gap: 2, alignItems: "stretch" }, /* @__PURE__ */ react.createElement(
    Combobox/* Combobox */.hQ,
    {
      clearLabel: formatMessage({
        id: "content-manager.reviewWorkflows.assignee.clear",
        defaultMessage: "Clear assignee"
      }),
      error: isError && canReadUsers && formatMessage({
        id: "content-manager.reviewWorkflows.assignee.error",
        defaultMessage: "An error occurred while fetching users"
      }) || mutation.error && formatAPIError(mutation.error),
      disabled: !isLoading && users.length === 0,
      name: constants/* ASSIGNEE_ATTRIBUTE_NAME */.U,
      id: constants/* ASSIGNEE_ATTRIBUTE_NAME */.U,
      value: currentAssignee ? currentAssignee.id : null,
      onChange: (value) => handleChange({ value }),
      onClear: () => handleChange({ value: null }),
      placeholder: formatMessage({
        id: "content-manager.reviewWorkflows.assignee.placeholder",
        defaultMessage: "Select \u2026"
      }),
      label: formatMessage({
        id: "content-manager.reviewWorkflows.assignee.label",
        defaultMessage: "Assignee"
      }),
      customizeContent: () => /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { as: "span", justifyContent: "space-between", alignItems: "center", width: "100%" }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800", ellipsis: true }, currentAssignee ? (0,utils/* getDisplayName */.Gf)(currentAssignee, formatMessage) : null), isLoading || mutation.isLoading ? /* @__PURE__ */ react.createElement(Loader/* Loader */.a, { small: true, style: { display: "flex" } }) : null)
    },
    users.map((user) => {
      return /* @__PURE__ */ react.createElement(
        ComboboxOption/* ComboboxOption */.O,
        {
          key: user.id,
          value: user.id,
          textValue: (0,utils/* getDisplayName */.Gf)(user, formatMessage)
        },
        (0,utils/* getDisplayName */.Gf)(user, formatMessage)
      );
    })
  )));
}

;// CONCATENATED MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/components/AssigneeSelect/index.js


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/SingleSelect.js
var SingleSelect = __webpack_require__(28096);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldError.js
var FieldError = __webpack_require__(86707);
// EXTERNAL MODULE: ./.cache/ee/admin/hooks/useLicenseLimits.js
var useLicenseLimits = __webpack_require__(75021);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/LimitsModal/index.js + 2 modules
var LimitsModal = __webpack_require__(38705);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/constants.js
var ReviewWorkflows_constants = __webpack_require__(86978);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/hooks/useReviewWorkflows.js
var useReviewWorkflows = __webpack_require__(52258);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/utils/colors.js
var colors = __webpack_require__(5318);
;// CONCATENATED MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/components/StageSelect/StageSelect.js











function StageSelect() {
  const {
    initialData,
    layout: { uid },
    isSingleType,
    onChange
  } = (0,helper_plugin_esm/* useCMEditViewDataManager */.Wq)();
  const { put } = (0,helper_plugin_esm/* useFetchClient */.kY)();
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { formatAPIError } = (0,helper_plugin_esm/* useAPIErrorHandler */.So)();
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const {
    meta,
    workflows: [workflow],
    isLoading
  } = (0,useReviewWorkflows/* useReviewWorkflows */.n)({ filters: { contentTypes: uid } });
  const { getFeature } = (0,useLicenseLimits/* useLicenseLimits */.q)();
  const [showLimitModal, setShowLimitModal] = react.useState(false);
  const limits = getFeature("review-workflows");
  const activeWorkflowStage = initialData?.[constants/* STAGE_ATTRIBUTE_NAME */.I] ?? null;
  const mutation = (0,es.useMutation)(
    async ({ entityId, stageId, uid: uid2 }) => {
      const typeSlug = isSingleType ? "single-types" : "collection-types";
      const {
        data: { data: createdEntity }
      } = await put(`/admin/content-manager/${typeSlug}/${uid2}/${entityId}/stage`, {
        data: { id: stageId }
      });
      onChange(
        { target: { name: constants/* STAGE_ATTRIBUTE_NAME */.I, value: createdEntity[constants/* STAGE_ATTRIBUTE_NAME */.I] } },
        true
      );
      return createdEntity;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "content-manager.reviewWorkflows.stage.notification.saved",
            defaultMessage: "Review stage updated"
          }
        });
      }
    }
  );
  const handleChange = async ({ value: stageId }) => {
    try {
      if (limits?.[ReviewWorkflows_constants/* CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME */.Ef] && parseInt(limits[ReviewWorkflows_constants/* CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME */.Ef], 10) < meta.workflowCount) {
        setShowLimitModal("workflow");
      } else if (limits?.[ReviewWorkflows_constants/* CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME */._X] && parseInt(limits[ReviewWorkflows_constants/* CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME */._X], 10) < workflow.stages.length) {
        setShowLimitModal("stage");
      } else {
        mutation.mutateAsync({
          entityId: initialData.id,
          stageId,
          uid
        });
      }
    } catch (error) {
    }
  };
  const { themeColorName } = activeWorkflowStage?.color ? (0,colors/* getStageColorByHex */.k)(activeWorkflowStage?.color) : {};
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Field/* Field */.g, { name: constants/* STAGE_ATTRIBUTE_NAME */.I, id: constants/* STAGE_ATTRIBUTE_NAME */.I }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", gap: 2, alignItems: "stretch" }, /* @__PURE__ */ react.createElement(
    SingleSelect/* SingleSelect */.q4,
    {
      error: mutation.error && formatAPIError(mutation.error) || null,
      name: constants/* STAGE_ATTRIBUTE_NAME */.I,
      id: constants/* STAGE_ATTRIBUTE_NAME */.I,
      value: activeWorkflowStage?.id,
      onChange: (value) => handleChange({ value }),
      label: formatMessage({
        id: "content-manager.reviewWorkflows.stage.label",
        defaultMessage: "Review stage"
      }),
      startIcon: /* @__PURE__ */ react.createElement(
        Flex/* Flex */.k,
        {
          as: "span",
          height: 2,
          background: activeWorkflowStage?.color,
          borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
          hasRadius: true,
          shrink: 0,
          width: 2,
          marginRight: "-3px"
        }
      ),
      customizeContent: () => /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { as: "span", justifyContent: "space-between", alignItems: "center", width: "100%" }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textColor: "neutral800", ellipsis: true }, activeWorkflowStage?.name), isLoading ? /* @__PURE__ */ react.createElement(Loader/* Loader */.a, { small: true, style: { display: "flex" } }) : null)
    },
    workflow ? workflow.stages.map(({ id, color, name }) => {
      const { themeColorName: themeColorName2 } = (0,colors/* getStageColorByHex */.k)(color);
      return /* @__PURE__ */ react.createElement(
        SingleSelect/* SingleSelectOption */.ag,
        {
          key: id,
          startIcon: /* @__PURE__ */ react.createElement(
            Flex/* Flex */.k,
            {
              height: 2,
              background: color,
              borderColor: themeColorName2 === "neutral0" ? "neutral150" : "transparent",
              hasRadius: true,
              shrink: 0,
              width: 2
            }
          ),
          value: id,
          textValue: name
        },
        name
      );
    }) : []
  ), /* @__PURE__ */ react.createElement(FieldError/* FieldError */.c, null))), /* @__PURE__ */ react.createElement(
    LimitsModal/* Root */.fC,
    {
      isOpen: showLimitModal === "workflow",
      onClose: () => setShowLimitModal(false)
    },
    /* @__PURE__ */ react.createElement(LimitsModal/* Title */.Dx, null, formatMessage({
      id: "content-manager.reviewWorkflows.workflows.limit.title",
      defaultMessage: "You\u2019ve reached the limit of workflows in your plan"
    })),
    /* @__PURE__ */ react.createElement(LimitsModal/* Body */.uT, null, formatMessage({
      id: "content-manager.reviewWorkflows.workflows.limit.body",
      defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
    }))
  ), /* @__PURE__ */ react.createElement(
    LimitsModal/* Root */.fC,
    {
      isOpen: showLimitModal === "stage",
      onClose: () => setShowLimitModal(false)
    },
    /* @__PURE__ */ react.createElement(LimitsModal/* Title */.Dx, null, formatMessage({
      id: "content-manager.reviewWorkflows.stages.limit.title",
      defaultMessage: "You have reached the limit of stages for this workflow in your plan"
    })),
    /* @__PURE__ */ react.createElement(LimitsModal/* Body */.uT, null, formatMessage({
      id: "content-manager.reviewWorkflows.stages.limit.body",
      defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
    }))
  ));
}

;// CONCATENATED MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/components/StageSelect/index.js


;// CONCATENATED MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/InformationBoxEE.js





function InformationBoxEE() {
  const {
    isCreatingEntry,
    layout: { options }
  } = (0,helper_plugin_esm/* useCMEditViewDataManager */.Wq)();
  const hasReviewWorkflowsEnabled = options?.reviewWorkflows ?? false;
  return /* @__PURE__ */ react.createElement(Information/* Information */.d.Root, null, /* @__PURE__ */ react.createElement(Information/* Information */.d.Title, null), hasReviewWorkflowsEnabled && !isCreatingEntry && /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(StageSelect, null), /* @__PURE__ */ react.createElement(AssigneeSelect, null)), /* @__PURE__ */ react.createElement(Information/* Information */.d.Body, null));
}

;// CONCATENATED MODULE: ./.cache/ee/admin/content-manager/pages/EditView/InformationBox/index.js



/***/ }),

/***/ 75021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ useLicenseLimits)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27279);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(63838);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40464);



function useLicenseLimits({ enabled } = { enabled: true }) {
  const { get } = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .useFetchClient */ .kY)();
  const { data, isError, isLoading } = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)(
    ["ee", "license-limit-info"],
    async () => {
      const {
        data: { data: data2 }
      } = await get("/admin/license-limit-information");
      return data2;
    },
    {
      enabled
    }
  );
  const license = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => data ?? {}, [data]);
  const getFeature = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (name) => {
      const feature = (license?.features ?? []).find((feature2) => feature2.name === name);
      return feature?.options ?? {};
    },
    [license?.features]
  );
  return { license, getFeature, isError, isLoading };
}


/***/ }),

/***/ 38705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  uT: () => (/* reexport */ Body),
  fC: () => (/* reexport */ LimitsModal),
  Dx: () => (/* reexport */ Title)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ModalLayout/ModalLayout.js
var ModalLayout = __webpack_require__(51444);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/ModalLayout/ModalBody.js
var ModalBody = __webpack_require__(61872);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(68263);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/IconButton/IconButton.js
var IconButton = __webpack_require__(77216);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/v2/LinkButton/LinkButton.js
var LinkButton = __webpack_require__(57747);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Cross.js
var Cross = __webpack_require__(30117);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(70627);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(37652);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/LimitsModal/assets/balloon.png
const balloon_namespaceObject = __webpack_require__.p + "0cd5f8915b265d5b1856.png";
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/LimitsModal/LimitsModal.js








const TITLE_ID = "limits-title";
const CTA_LEARN_MORE_HREF = "https://strapi.io/pricing-cloud";
const CTA_SALES_HREF = "https://strapi.io/contact-sales";
function Title({ children }) {
  return /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "alpha", id: TITLE_ID }, children);
}
Title.propTypes = {
  children: (prop_types_default()).node.isRequired
};
function Body({ children }) {
  return /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "omega" }, children);
}
Body.propTypes = {
  children: (prop_types_default()).node.isRequired
};
function CallToActions() {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { gap: 2, paddingTop: 4 }, /* @__PURE__ */ react.createElement(LinkButton/* LinkButton */.Q, { variant: "default", isExternal: true, href: CTA_LEARN_MORE_HREF }, formatMessage({
    id: "Settings.review-workflows.limit.cta.learn",
    defaultMessage: "Learn more"
  })), /* @__PURE__ */ react.createElement(LinkButton/* LinkButton */.Q, { variant: "tertiary", isExternal: true, href: CTA_SALES_HREF }, formatMessage({
    id: "Settings.review-workflows.limit.cta.sales",
    defaultMessage: "Contact Sales"
  })));
}
const BalloonImage = styled_components_browser_esm/* default */.ZP.img`
  // Margin top|right reverse the padding of ModalBody
  margin-right: ${({ theme }) => `-${theme.spaces[7]}`};
  margin-top: ${({ theme }) => `-${theme.spaces[7]}`};
  width: 360px;
`;
function LimitsModal({ children, isOpen, onClose }) {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ react.createElement(ModalLayout/* ModalLayout */.P, { labelledBy: TITLE_ID }, /* @__PURE__ */ react.createElement(ModalBody/* ModalBody */.f, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { gap: 2, paddingLeft: 7, position: "relative" }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { alignItems: "start", direction: "column", gap: 2, width: "60%" }, children, /* @__PURE__ */ react.createElement(CallToActions, null)), /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { justifyContent: "end", height: "100%", width: "40%" }, /* @__PURE__ */ react.createElement(BalloonImage, { src: balloon_namespaceObject, "aria-hidden": true, alt: "", loading: "lazy" }), /* @__PURE__ */ react.createElement(Box/* Box */.x, { display: "flex", position: "absolute", right: 0, top: 0 }, /* @__PURE__ */ react.createElement(
    IconButton/* IconButton */.h,
    {
      icon: /* @__PURE__ */ react.createElement(Cross/* default */.Z, null),
      "aria-label": formatMessage({
        id: "global.close",
        defaultMessage: "Close"
      }),
      onClick: onClose
    }
  ))))));
}
LimitsModal.defaultProps = {
  isOpen: false
};
LimitsModal.propTypes = {
  children: (prop_types_default()).node.isRequired,
  isOpen: (prop_types_default()).bool,
  onClose: (prop_types_default()).func.isRequired
};

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/LimitsModal/index.js




/***/ }),

/***/ 86978:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $k: () => (/* binding */ ACTION_UPDATE_STAGE_POSITION),
/* harmony export */   Ef: () => (/* binding */ CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME),
/* harmony export */   FT: () => (/* binding */ STAGE_COLOR_DEFAULT),
/* harmony export */   Nj: () => (/* binding */ ACTION_UPDATE_STAGE),
/* harmony export */   Ot: () => (/* binding */ ACTION_ADD_STAGE),
/* harmony export */   VS: () => (/* binding */ ACTION_UPDATE_WORKFLOW),
/* harmony export */   _X: () => (/* binding */ CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME),
/* harmony export */   gu: () => (/* binding */ ACTION_RESET_WORKFLOW),
/* harmony export */   lv: () => (/* binding */ STAGE_COLORS),
/* harmony export */   qZ: () => (/* binding */ ACTION_SET_WORKFLOW),
/* harmony export */   sN: () => (/* binding */ REDUX_NAMESPACE),
/* harmony export */   uL: () => (/* binding */ DRAG_DROP_TYPES),
/* harmony export */   x4: () => (/* binding */ ACTION_DELETE_STAGE)
/* harmony export */ });
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65331);

const REDUX_NAMESPACE = "settings_review-workflows";
const ACTION_RESET_WORKFLOW = `Settings/Review_Workflows/RESET_WORKFLOW`;
const ACTION_SET_WORKFLOW = `Settings/Review_Workflows/SET_WORKFLOW`;
const ACTION_DELETE_STAGE = `Settings/Review_Workflows/WORKFLOW_DELETE_STAGE`;
const ACTION_ADD_STAGE = `Settings/Review_Workflows/WORKFLOW_ADD_STAGE`;
const ACTION_UPDATE_STAGE = `Settings/Review_Workflows/WORKFLOW_UPDATE_STAGE`;
const ACTION_UPDATE_STAGE_POSITION = `Settings/Review_Workflows/WORKFLOW_UPDATE_STAGE_POSITION`;
const ACTION_UPDATE_WORKFLOW = `Settings/Review_Workflows/WORKFLOW_UPDATE`;
const STAGE_COLORS = {
  primary600: "Blue",
  primary200: "Lilac",
  alternative600: "Violet",
  alternative200: "Lavender",
  success600: "Green",
  success200: "Pale Green",
  danger500: "Cherry",
  danger200: "Pink",
  warning600: "Orange",
  warning200: "Yellow",
  secondary600: "Teal",
  secondary200: "Baby Blue",
  neutral400: "Gray",
  neutral0: "White"
};
const STAGE_COLOR_DEFAULT = _strapi_design_system__WEBPACK_IMPORTED_MODULE_0__/* .lightTheme */ .W.colors.primary600;
const DRAG_DROP_TYPES = {
  STAGE: "stage"
};
const CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME = "numberOfWorkflows";
const CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME = "stagesPerWorkflow";


/***/ }),

/***/ 52258:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ useReviewWorkflows)
/* harmony export */ });
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63838);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40464);


function useReviewWorkflows(params = {}) {
  const { get } = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__/* .useFetchClient */ .kY)();
  const { id = "", ...queryParams } = params;
  const defaultQueryParams = {
    populate: "stages"
  };
  const { data, isLoading, status, refetch } = (0,react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)(
    ["review-workflows", "workflows", id],
    async () => {
      const res = await get(`/admin/review-workflows/workflows/${id}`, {
        params: { ...defaultQueryParams, ...queryParams }
      });
      return res.data;
    }
  );
  let workflows = [];
  if (id && data?.data) {
    workflows = [data.data];
  } else if (Array.isArray(data?.data)) {
    workflows = data.data;
  }
  return {
    // meta contains e.g. the total of all workflows. we can not use
    // the pagination object here, because the list is not paginated.
    meta: data?.meta ?? {},
    workflows,
    isLoading,
    status,
    refetch
  };
}


/***/ }),

/***/ 5318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ getStageColorByHex),
/* harmony export */   s: () => (/* binding */ getAvailableStageColors)
/* harmony export */ });
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65331);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86978);


function getStageColorByHex(hex) {
  if (!hex) {
    return null;
  }
  const themeColors = Object.entries(_strapi_design_system__WEBPACK_IMPORTED_MODULE_1__/* .lightTheme */ .W.colors).filter(
    ([, value]) => value.toUpperCase() === hex.toUpperCase()
  );
  const themeColorName = themeColors.reduce((acc, [name]) => {
    if (_constants__WEBPACK_IMPORTED_MODULE_0__/* .STAGE_COLORS */ .lv?.[name]) {
      acc = name;
    }
    return acc;
  }, null);
  if (!themeColorName) {
    return null;
  }
  return {
    themeColorName,
    name: _constants__WEBPACK_IMPORTED_MODULE_0__/* .STAGE_COLORS */ .lv[themeColorName]
  };
}
function getAvailableStageColors() {
  return Object.entries(_constants__WEBPACK_IMPORTED_MODULE_0__/* .STAGE_COLORS */ .lv).map(([themeColorName, name]) => ({
    hex: _strapi_design_system__WEBPACK_IMPORTED_MODULE_1__/* .lightTheme */ .W.colors[themeColorName].toUpperCase(),
    name
  }));
}


/***/ })

}]);