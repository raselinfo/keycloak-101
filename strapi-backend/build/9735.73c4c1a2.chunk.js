(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[9735],{

/***/ 79194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  v: () => (/* reexport */ useInjectReducer)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(49402);
;// CONCATENATED MODULE: ./.cache/admin/src/hooks/useInjectReducer/useInjectReducer.js


function useInjectReducer(namespace, reducer) {
  const store = (0,es/* useStore */.oR)();
  (0,react.useEffect)(() => {
    store.injectReducer(namespace, reducer);
  }, [store, namespace, reducer]);
}

;// CONCATENATED MODULE: ./.cache/admin/src/hooks/useInjectReducer/index.js



/***/ }),

/***/ 75021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 11984:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CI: () => (/* binding */ addStage),
/* harmony export */   FP: () => (/* binding */ updateStagePosition),
/* harmony export */   Js: () => (/* binding */ resetWorkflow),
/* harmony export */   _V: () => (/* binding */ deleteStage),
/* harmony export */   fC: () => (/* binding */ setWorkflow),
/* harmony export */   rI: () => (/* binding */ updateWorkflow),
/* harmony export */   xn: () => (/* binding */ updateStage)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86978);

function setWorkflow({ status, data }) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_SET_WORKFLOW */ .qZ,
    payload: {
      status,
      workflow: data
    }
  };
}
function deleteStage(stageId) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_DELETE_STAGE */ .x4,
    payload: {
      stageId
    }
  };
}
function addStage(stage = {}) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_ADD_STAGE */ .Ot,
    payload: stage
  };
}
function updateStage(stageId, payload) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_UPDATE_STAGE */ .Nj,
    payload: {
      stageId,
      ...payload
    }
  };
}
function updateStagePosition(oldIndex, newIndex) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_UPDATE_STAGE_POSITION */ .$k,
    payload: {
      newIndex,
      oldIndex
    }
  };
}
function updateWorkflow(payload) {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_UPDATE_WORKFLOW */ .VS,
    payload
  };
}
function resetWorkflow() {
  return {
    type: _constants__WEBPACK_IMPORTED_MODULE_0__/* .ACTION_RESET_WORKFLOW */ .gu
  };
}


/***/ }),

/***/ 43390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  eJ: () => (/* reexport */ Back),
  lx: () => (/* reexport */ DragLayerRendered),
  h4: () => (/* reexport */ Header),
  fC: () => (/* reexport */ Root)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/Layout.js
var Layout = __webpack_require__(9);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(65000);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(35750);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(42925);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/ArrowLeft.js
var ArrowLeft = __webpack_require__(97367);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./.cache/admin/src/components/DragLayer/index.js + 1 modules
var DragLayer = __webpack_require__(52713);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/constants.js
var constants = __webpack_require__(86978);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/CarretDown.js
var CarretDown = __webpack_require__(27870);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(70627);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(37652);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/StageDragPreview/StageDragPreview.js






const Toggle = (0,styled_components_browser_esm/* default */.ZP)((0,Flex/* Flex */.k))`
  svg path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
function StageDragPreview({ name }) {
  return /* @__PURE__ */ react.createElement(
    Flex/* Flex */.k,
    {
      background: "primary100",
      borderStyle: "dashed",
      borderColor: "primary600",
      borderWidth: "1px",
      gap: 3,
      hasRadius: true,
      padding: 3,
      shadow: "tableShadow",
      width: (0,helper_plugin_esm/* pxToRem */.Q1)(300)
    },
    /* @__PURE__ */ react.createElement(
      Toggle,
      {
        alignItems: "center",
        background: "neutral200",
        borderRadius: "50%",
        height: 6,
        justifyContent: "center",
        width: 6
      },
      /* @__PURE__ */ react.createElement(CarretDown/* default */.Z, { width: `${8 / 16}rem` })
    ),
    /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { fontWeight: "bold" }, name)
  );
}
StageDragPreview.propTypes = {
  name: (prop_types_default()).string.isRequired
};

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/StageDragPreview/index.js


;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Layout/Layout.js








function renderDragLayerItem({ type, item }) {
  switch (type) {
    case constants/* DRAG_DROP_TYPES */.uL.STAGE:
      return /* @__PURE__ */ react.createElement(StageDragPreview, { ...item });
    default:
      return null;
  }
}
function DragLayerRendered() {
  return /* @__PURE__ */ react.createElement(DragLayer/* DragLayer */.r, { renderItem: renderDragLayerItem });
}
function Root({ children }) {
  return /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, { tabIndex: -1 }, /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, children)));
}
function Back({ href }) {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  return /* @__PURE__ */ react.createElement(helper_plugin_esm/* Link */.rU, { startIcon: /* @__PURE__ */ react.createElement(ArrowLeft/* default */.Z, null), to: href }, formatMessage({
    id: "global.back",
    defaultMessage: "Back"
  }));
}
function Header({ title, subtitle, navigationAction, primaryAction }) {
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(helper_plugin_esm/* SettingsPageTitle */.SL, { name: title }), /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      navigationAction,
      primaryAction,
      title,
      subtitle
    }
  ));
}


;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Layout/index.js



/***/ }),

/***/ 38705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

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

/***/ 68997:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  U: () => (/* reexport */ Stages)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(68263);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(70627);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(49402);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(37652);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/actions/index.js
var actions = __webpack_require__(11984);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/PlusCircle.js
var PlusCircle = __webpack_require__(82949);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/AddStage/AddStage.js





const StyledAddIcon = (0,styled_components_browser_esm/* default */.ZP)((0,PlusCircle/* default */.Z))`
  > circle {
    fill: ${({ theme }) => theme.colors.neutral150};
  }
  > path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const StyledButton = (0,styled_components_browser_esm/* default */.ZP)((0,Box/* Box */.x))`
  border-radius: 26px;

  svg {
    height: ${({ theme }) => theme.spaces[6]};
    width: ${({ theme }) => theme.spaces[6]};

    > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary600} !important;
    ${Typography/* Typography */.Z} {
      color: ${({ theme }) => theme.colors.primary600} !important;
    }

    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }

  &:active {
    ${Typography/* Typography */.Z} {
      color: ${({ theme }) => theme.colors.primary600};
    }

    ${StyledAddIcon} {
      > circle {
        fill: ${({ theme }) => theme.colors.primary600};
      }
      > path {
        fill: ${({ theme }) => theme.colors.neutral100};
      }
    }
  }
`;
function AddStage({ children, ...props }) {
  return /* @__PURE__ */ react.createElement(
    StyledButton,
    {
      as: "button",
      background: "neutral0",
      border: "neutral150",
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 3,
      shadow: "filterShadow",
      ...props
    },
    /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { gap: 2 }, /* @__PURE__ */ react.createElement(StyledAddIcon, { "aria-hidden": true }), /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "pi", fontWeight: "bold", textColor: "neutral500" }, children))
  );
}
AddStage.propTypes = {
  children: (prop_types_default()).node.isRequired
};

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/AddStage/index.js


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/VisuallyHidden/VisuallyHidden.js
var VisuallyHidden = __webpack_require__(30249);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Accordion/Accordion.js
var Accordion = __webpack_require__(59438);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Accordion/AccordionToggle.js + 1 modules
var AccordionToggle = __webpack_require__(68809);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/IconButton/IconButton.js
var IconButton = __webpack_require__(77216);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Accordion/AccordionContent.js
var AccordionContent = __webpack_require__(3667);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(86049);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(25667);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.js
var TextInput = __webpack_require__(54095);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/SingleSelect.js
var SingleSelect = __webpack_require__(28096);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Trash.js
var Trash = __webpack_require__(69083);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Drag.js
var Drag = __webpack_require__(18989);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 121 modules
var formik_esm = __webpack_require__(71563);
// EXTERNAL MODULE: ./node_modules/react-dnd-html5-backend/dist/cjs/index.js
var cjs = __webpack_require__(92241);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/hooks/index.js + 13 modules
var hooks = __webpack_require__(21440);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/utils/index.js + 11 modules
var utils = __webpack_require__(21892);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/constants.js
var constants = __webpack_require__(86978);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/utils/colors.js
var colors = __webpack_require__(5318);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Stages/Stage/Stage.js














const AVAILABLE_COLORS = (0,colors/* getAvailableStageColors */.s)();
function StageDropPreview() {
  return /* @__PURE__ */ react.createElement(
    Box/* Box */.x,
    {
      background: "primary100",
      borderStyle: "dashed",
      borderColor: "primary600",
      borderWidth: "1px",
      display: "block",
      hasRadius: true,
      padding: 6,
      shadow: "tableShadow"
    }
  );
}
function Stage({
  id,
  index,
  canDelete,
  canReorder,
  canUpdate,
  isOpen: isOpenDefault = false,
  stagesCount
}) {
  const getItemPos = (index2) => `${index2 + 1} of ${stagesCount}`;
  const handleGrabStage = (index2) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.grab-item",
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: nameField.value,
          position: getItemPos(index2)
        }
      )
    );
  };
  const handleDropStage = (index2) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.drop-item",
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: nameField.value,
          position: getItemPos(index2)
        }
      )
    );
  };
  const handleCancelDragStage = () => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.cancel-item",
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: nameField.value
        }
      )
    );
  };
  const handleMoveStage = (newIndex, oldIndex) => {
    setLiveText(
      formatMessage(
        {
          id: "dnd.reorder",
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: nameField.value,
          position: getItemPos(newIndex)
        }
      )
    );
    dispatch((0,actions/* updateStagePosition */.FP)(oldIndex, newIndex));
  };
  const [liveText, setLiveText] = react.useState(null);
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { trackUsage } = (0,helper_plugin_esm/* useTracking */.rS)();
  const dispatch = (0,es/* useDispatch */.I0)();
  const [isOpen, setIsOpen] = react.useState(isOpenDefault);
  const [nameField, nameMeta, nameHelper] = (0,formik_esm/* useField */.U$)(`stages.${index}.name`);
  const [colorField, colorMeta, colorHelper] = (0,formik_esm/* useField */.U$)(`stages.${index}.color`);
  const [{ handlerId, isDragging, handleKeyDown }, stageRef, dropRef, dragRef, dragPreviewRef] = (0,hooks/* useDragAndDrop */.Y9)(canReorder, {
    index,
    item: {
      name: nameField.value
    },
    onGrabItem: handleGrabStage,
    onDropItem: handleDropStage,
    onMoveItem: handleMoveStage,
    onCancel: handleCancelDragStage,
    type: constants/* DRAG_DROP_TYPES */.uL.STAGE
  });
  const composedRef = (0,utils/* composeRefs */.FE)(stageRef, dropRef);
  const colorOptions = AVAILABLE_COLORS.map(({ hex, name }) => ({
    value: hex,
    label: formatMessage(
      {
        id: "Settings.review-workflows.stage.color.name",
        defaultMessage: "{name}"
      },
      { name }
    ),
    color: hex
  }));
  react.useEffect(() => {
    dragPreviewRef((0,cjs/* getEmptyImage */.rX)(), { captureDraggingState: false });
  }, [dragPreviewRef, index]);
  const { themeColorName } = (0,colors/* getStageColorByHex */.k)(colorField.value) ?? {};
  return /* @__PURE__ */ react.createElement(Box/* Box */.x, { ref: composedRef }, liveText && /* @__PURE__ */ react.createElement(VisuallyHidden/* VisuallyHidden */.T, { "aria-live": "assertive" }, liveText), isDragging ? /* @__PURE__ */ react.createElement(StageDropPreview, null) : /* @__PURE__ */ react.createElement(
    Accordion/* Accordion */.U,
    {
      size: "S",
      variant: "primary",
      onToggle: () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
          trackUsage("willEditStage");
        }
      },
      expanded: isOpen,
      shadow: "tableShadow",
      error: nameMeta.error ?? colorMeta?.error ?? false,
      hasErrorMessage: false
    },
    /* @__PURE__ */ react.createElement(
      AccordionToggle/* AccordionToggle */.B,
      {
        title: nameField.value,
        togglePosition: "left",
        action: (canDelete || canUpdate) && /* @__PURE__ */ react.createElement(Flex/* Flex */.k, null, canDelete && /* @__PURE__ */ react.createElement(
          IconButton/* IconButton */.h,
          {
            background: "transparent",
            icon: /* @__PURE__ */ react.createElement(Trash/* default */.Z, null),
            label: formatMessage({
              id: "Settings.review-workflows.stage.delete",
              defaultMessage: "Delete stage"
            }),
            noBorder: true,
            onClick: () => dispatch((0,actions/* deleteStage */._V)(id))
          }
        ), canUpdate && /* @__PURE__ */ react.createElement(
          IconButton/* IconButton */.h,
          {
            background: "transparent",
            forwardedAs: "div",
            role: "button",
            noBorder: true,
            tabIndex: 0,
            "data-handler-id": handlerId,
            ref: dragRef,
            label: formatMessage({
              id: "Settings.review-workflows.stage.drag",
              defaultMessage: "Drag"
            }),
            onClick: (e) => e.stopPropagation(),
            onKeyDown: handleKeyDown
          },
          /* @__PURE__ */ react.createElement(Drag/* default */.Z, null)
        ))
      }
    ),
    /* @__PURE__ */ react.createElement(AccordionContent/* AccordionContent */.v, { padding: 6, background: "neutral0", hasRadius: true }, /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { gap: 4 }, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
      TextInput/* TextInput */.o,
      {
        ...nameField,
        id: nameField.name,
        disabled: !canUpdate,
        label: formatMessage({
          id: "Settings.review-workflows.stage.name.label",
          defaultMessage: "Stage name"
        }),
        error: nameMeta.error ?? false,
        onChange: (event) => {
          nameHelper.setValue(event.target.value);
          dispatch((0,actions/* updateStage */.xn)(id, { name: event.target.value }));
        },
        required: true
      }
    )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
      SingleSelect/* SingleSelect */.q4,
      {
        disabled: !canUpdate,
        error: colorMeta?.error ?? false,
        id: colorField.name,
        required: true,
        label: formatMessage({
          id: "content-manager.reviewWorkflows.stage.color",
          defaultMessage: "Color"
        }),
        onChange: (value) => {
          colorHelper.setValue(value);
          dispatch((0,actions/* updateStage */.xn)(id, { color: value }));
        },
        value: colorField.value.toUpperCase(),
        startIcon: /* @__PURE__ */ react.createElement(
          Flex/* Flex */.k,
          {
            as: "span",
            height: 2,
            background: colorField.value,
            borderColor: themeColorName === "neutral0" ? "neutral150" : "transparent",
            hasRadius: true,
            shrink: 0,
            width: 2
          }
        )
      },
      colorOptions.map(({ value, label, color }) => {
        const { themeColorName: themeColorName2 } = (0,colors/* getStageColorByHex */.k)(color);
        return /* @__PURE__ */ react.createElement(
          SingleSelect/* SingleSelectOption */.ag,
          {
            value,
            key: value,
            startIcon: /* @__PURE__ */ react.createElement(
              Flex/* Flex */.k,
              {
                as: "span",
                height: 2,
                background: color,
                borderColor: themeColorName2 === "neutral0" ? "neutral150" : "transparent",
                hasRadius: true,
                shrink: 0,
                width: 2
              }
            )
          },
          label
        );
      })
    ))))
  ));
}
Stage.propTypes = prop_types_default().shape({
  id: (prop_types_default()).number.isRequired,
  color: (prop_types_default()).string.isRequired,
  canDelete: (prop_types_default()).bool.isRequired,
  canReorder: (prop_types_default()).bool.isRequired,
  canUpdate: (prop_types_default()).bool.isRequired,
  stagesCount: (prop_types_default()).number.isRequired
}).isRequired;

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Stages/Stage/index.js


;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Stages/Stages.js










const Background = (0,styled_components_browser_esm/* default */.ZP)((0,Box/* Box */.x))`
  transform: translateX(-50%);
`;
function Stages({ canDelete, canUpdate, stages }) {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const dispatch = (0,es/* useDispatch */.I0)();
  const { trackUsage } = (0,helper_plugin_esm/* useTracking */.rS)();
  return /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", gap: 6, width: "100%" }, /* @__PURE__ */ react.createElement(Box/* Box */.x, { position: "relative", spacing: 4, width: "100%" }, /* @__PURE__ */ react.createElement(
    Background,
    {
      background: "neutral200",
      height: "100%",
      left: "50%",
      position: "absolute",
      top: "0",
      width: 2,
      zIndex: 1
    }
  ), /* @__PURE__ */ react.createElement(
    Flex/* Flex */.k,
    {
      direction: "column",
      alignItems: "stretch",
      gap: 6,
      zIndex: 2,
      position: "relative",
      as: "ol"
    },
    stages.map((stage, index) => {
      const id = stage?.id ?? stage.__temp_key__;
      return /* @__PURE__ */ react.createElement(Box/* Box */.x, { key: `stage-${id}`, as: "li" }, /* @__PURE__ */ react.createElement(
        Stage,
        {
          id,
          index,
          isOpen: !stage.id,
          canDelete: stages.length > 1 && canDelete,
          canReorder: stages.length > 1,
          canUpdate,
          stagesCount: stages.length
        }
      ));
    })
  )), canUpdate && /* @__PURE__ */ react.createElement(
    AddStage,
    {
      type: "button",
      onClick: () => {
        dispatch((0,actions/* addStage */.CI)({ name: "" }));
        trackUsage("willCreateStage");
      }
    },
    formatMessage({
      id: "Settings.review-workflows.stage.add",
      defaultMessage: "Add new stage"
    })
  ));
}
Stages.defaultProps = {
  canDelete: true,
  canUpdate: true,
  stages: []
};
Stages.propTypes = {
  canDelete: (prop_types_default()).bool,
  canUpdate: (prop_types_default()).bool,
  stages: prop_types_default().arrayOf(
    prop_types_default().shape({
      id: (prop_types_default()).number,
      __temp_key__: (prop_types_default()).number,
      name: (prop_types_default()).string.isRequired
    })
  )
};

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Stages/index.js



/***/ }),

/***/ 85230:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Y: () => (/* reexport */ WorkflowAttributes)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Select/MultiSelect.js
var MultiSelect = __webpack_require__(95546);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(86049);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(25667);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.js
var TextInput = __webpack_require__(54095);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 121 modules
var formik_esm = __webpack_require__(71563);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(70627);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(49402);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(37652);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/actions/index.js
var actions = __webpack_require__(11984);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/WorkflowAttributes/WorkflowAttributes.js









const NestedOption = (0,styled_components_browser_esm/* default */.ZP)((0,MultiSelect/* MultiSelectOption */.ML))`
  padding-left: ${({ theme }) => theme.spaces[7]};
`;
const ContentTypeTakeNotice = (0,styled_components_browser_esm/* default */.ZP)((0,Typography/* Typography */.Z))`
  font-style: italic;
`;
function WorkflowAttributes({
  canUpdate,
  contentTypes: { collectionTypes, singleTypes },
  currentWorkflow,
  workflows
}) {
  const { formatMessage, locale } = (0,useIntl/* default */.Z)();
  const dispatch = (0,es/* useDispatch */.I0)();
  const [nameField, nameMeta, nameHelper] = (0,formik_esm/* useField */.U$)("name");
  const [contentTypesField, contentTypesMeta, contentTypesHelper] = (0,formik_esm/* useField */.U$)("contentTypes");
  const formatter = (0,helper_plugin_esm/* useCollator */.Xe)(locale, {
    sensitivity: "base"
  });
  return /* @__PURE__ */ react.createElement(Grid/* Grid */.r, { background: "neutral0", hasRadius: true, gap: 4, padding: 6, shadow: "tableShadow" }, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
    TextInput/* TextInput */.o,
    {
      ...nameField,
      id: nameField.name,
      disabled: !canUpdate,
      label: formatMessage({
        id: "Settings.review-workflows.workflow.name.label",
        defaultMessage: "Workflow Name"
      }),
      error: nameMeta.error ?? false,
      onChange: (event) => {
        dispatch((0,actions/* updateWorkflow */.rI)({ name: event.target.value }));
        nameHelper.setValue(event.target.value);
      },
      required: true
    }
  )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 6 }, /* @__PURE__ */ react.createElement(
    MultiSelect/* MultiSelect */.NU,
    {
      ...contentTypesField,
      customizeContent: (value) => formatMessage(
        {
          id: "Settings.review-workflows.workflow.contentTypes.displayValue",
          defaultMessage: "{count} {count, plural, one {content type} other {content types}} selected"
        },
        { count: value.length }
      ),
      disabled: !canUpdate,
      error: contentTypesMeta.error ?? false,
      id: contentTypesField.name,
      label: formatMessage({
        id: "Settings.review-workflows.workflow.contentTypes.label",
        defaultMessage: "Associated to"
      }),
      onChange: (values) => {
        dispatch((0,actions/* updateWorkflow */.rI)({ contentTypes: values }));
        contentTypesHelper.setValue(values);
      },
      placeholder: formatMessage({
        id: "Settings.review-workflows.workflow.contentTypes.placeholder",
        defaultMessage: "Select"
      })
    },
    [
      ...collectionTypes.length > 0 ? [
        {
          label: formatMessage({
            id: "Settings.review-workflows.workflow.contentTypes.collectionTypes.label",
            defaultMessage: "Collection Types"
          }),
          children: collectionTypes.sort((a, b) => formatter.compare(a.info.displayName, b.info.displayName)).map((contentType) => ({
            label: contentType.info.displayName,
            value: contentType.uid
          }))
        }
      ] : [],
      ...singleTypes.length > 0 ? [
        {
          label: formatMessage({
            id: "Settings.review-workflows.workflow.contentTypes.singleTypes.label",
            defaultMessage: "Single Types"
          }),
          children: singleTypes.map((contentType) => ({
            label: contentType.info.displayName,
            value: contentType.uid
          }))
        }
      ] : []
    ].map((opt) => {
      if ("children" in opt) {
        return /* @__PURE__ */ react.createElement(
          MultiSelect/* MultiSelectGroup */.Ab,
          {
            key: opt.label,
            label: opt.label,
            values: opt.children.map((child) => child.value.toString())
          },
          opt.children.map((child) => {
            const { name: assignedWorkflowName } = workflows.find(
              (workflow) => (currentWorkflow && workflow.id !== currentWorkflow.id || !currentWorkflow) && workflow.contentTypes.includes(child.value)
            ) ?? {};
            return /* @__PURE__ */ react.createElement(NestedOption, { key: child.value, value: child.value }, formatMessage(
              {
                id: "Settings.review-workflows.workflow.contentTypes.assigned.notice",
                defaultMessage: "{label} {name, select, undefined {} other {<i>(assigned to <em>{name}</em> workflow)</i>}}"
              },
              {
                label: child.label,
                name: assignedWorkflowName,
                em: (...children) => /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { as: "em", fontWeight: "bold" }, children),
                i: (...children) => /* @__PURE__ */ react.createElement(ContentTypeTakeNotice, null, children)
              }
            ));
          })
        );
      }
      return /* @__PURE__ */ react.createElement(MultiSelect/* MultiSelectOption */.ML, { key: opt.value, value: opt.value }, opt.label);
    })
  )));
}
const ContentTypeType = prop_types_default().shape({
  uid: (prop_types_default()).string.isRequired,
  info: prop_types_default().shape({
    displayName: (prop_types_default()).string.isRequired
  }).isRequired
});
WorkflowAttributes.defaultProps = {
  canUpdate: true,
  currentWorkflow: void 0
};
WorkflowAttributes.propTypes = {
  canUpdate: (prop_types_default()).bool,
  contentTypes: prop_types_default().shape({
    collectionTypes: prop_types_default().arrayOf(ContentTypeType).isRequired,
    singleTypes: prop_types_default().arrayOf(ContentTypeType).isRequired
  }).isRequired,
  currentWorkflow: (prop_types_default()).object,
  workflows: (prop_types_default()).array.isRequired
};

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/WorkflowAttributes/index.js



/***/ }),

/***/ 86978:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ 3848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ initialState),
/* harmony export */   I: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61815);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6078);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86978);



const initialState = {
  status: "loading",
  serverState: {
    workflow: null
  },
  clientState: {
    currentWorkflow: {
      data: {
        name: "",
        contentTypes: [],
        stages: []
      },
      isDirty: false,
      hasDeletedServerStages: false
    }
  }
};
function reducer(state = initialState, action) {
  return (0,immer__WEBPACK_IMPORTED_MODULE_2__/* .produce */ .Uy)(state, (draft) => {
    const { payload } = action;
    switch (action.type) {
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_SET_WORKFLOW */ .qZ: {
        const { status, workflow } = payload;
        draft.status = status;
        if (workflow) {
          draft.serverState.workflow = workflow;
          draft.clientState.currentWorkflow.data = {
            ...workflow,
            stages: workflow.stages.map((stage) => ({
              ...stage,
              // A safety net in case a stage does not have a color assigned;
              // this normallly should not happen
              color: stage?.color ?? _constants__WEBPACK_IMPORTED_MODULE_1__/* .STAGE_COLOR_DEFAULT */ .FT
            }))
          };
        }
        draft.clientState.currentWorkflow.hasDeletedServerStages = false;
        break;
      }
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_RESET_WORKFLOW */ .gu: {
        draft.clientState.currentWorkflow.data = initialState.clientState.currentWorkflow.data;
        draft.serverState = initialState.serverState;
        break;
      }
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_DELETE_STAGE */ .x4: {
        const { stageId } = payload;
        const { currentWorkflow } = state.clientState;
        draft.clientState.currentWorkflow.data.stages = currentWorkflow.data.stages.filter(
          (stage) => (stage?.id ?? stage.__temp_key__) !== stageId
        );
        if (!currentWorkflow.hasDeletedServerStages) {
          draft.clientState.currentWorkflow.hasDeletedServerStages = !!(state.serverState.workflow?.stages ?? []).find((stage) => stage.id === stageId);
        }
        break;
      }
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_ADD_STAGE */ .Ot: {
        const { currentWorkflow } = state.clientState;
        if (!currentWorkflow.data) {
          draft.clientState.currentWorkflow.data = {
            stages: []
          };
        }
        const newTempKey = getMaxTempKey(draft.clientState.currentWorkflow.data.stages);
        draft.clientState.currentWorkflow.data.stages.push({
          ...payload,
          color: payload?.color ?? _constants__WEBPACK_IMPORTED_MODULE_1__/* .STAGE_COLOR_DEFAULT */ .FT,
          __temp_key__: newTempKey
        });
        break;
      }
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_UPDATE_STAGE */ .Nj: {
        const { currentWorkflow } = state.clientState;
        const { stageId, ...modified } = payload;
        draft.clientState.currentWorkflow.data.stages = currentWorkflow.data.stages.map(
          (stage) => (stage.id ?? stage.__temp_key__) === stageId ? {
            ...stage,
            ...modified
          } : stage
        );
        break;
      }
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_UPDATE_STAGE_POSITION */ .$k: {
        const {
          currentWorkflow: {
            data: { stages }
          }
        } = state.clientState;
        const { newIndex, oldIndex } = payload;
        if (newIndex >= 0 && newIndex < stages.length) {
          const stage = stages[oldIndex];
          let newStages = [...stages];
          newStages.splice(oldIndex, 1);
          newStages.splice(newIndex, 0, stage);
          draft.clientState.currentWorkflow.data.stages = newStages;
        }
        break;
      }
      case _constants__WEBPACK_IMPORTED_MODULE_1__/* .ACTION_UPDATE_WORKFLOW */ .VS: {
        draft.clientState.currentWorkflow.data = {
          ...draft.clientState.currentWorkflow.data,
          ...payload
        };
        break;
      }
      default:
        break;
    }
    if (state.clientState.currentWorkflow.data && draft.serverState.workflow) {
      draft.clientState.currentWorkflow.isDirty = !lodash_isEqual__WEBPACK_IMPORTED_MODULE_0___default()(
        (0,immer__WEBPACK_IMPORTED_MODULE_2__/* .current */ .Vk)(draft.clientState.currentWorkflow).data,
        draft.serverState.workflow
      );
    } else {
      draft.clientState.currentWorkflow.isDirty = true;
    }
  });
}
const getMaxTempKey = (stages = []) => {
  const ids = stages.map((stage) => stage.id ?? stage.__temp_key__);
  return Math.max(...ids, -1) + 1;
};


/***/ }),

/***/ 5318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ 66578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ validateWorkflow)
/* harmony export */ });
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43433);
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47853);


async function validateWorkflow({ values, formatMessage }) {
  const schema = yup__WEBPACK_IMPORTED_MODULE_1__/* .object */ .Ry({
    contentTypes: yup__WEBPACK_IMPORTED_MODULE_1__/* .array */ .IX().of(yup__WEBPACK_IMPORTED_MODULE_1__/* .string */ .Z_()),
    name: yup__WEBPACK_IMPORTED_MODULE_1__/* .string */ .Z_().max(
      255,
      formatMessage({
        id: "Settings.review-workflows.validation.name.max-length",
        defaultMessage: "Name can not be longer than 255 characters"
      })
    ).required(),
    stages: yup__WEBPACK_IMPORTED_MODULE_1__/* .array */ .IX().of(
      yup__WEBPACK_IMPORTED_MODULE_1__/* .object */ .Ry().shape({
        name: yup__WEBPACK_IMPORTED_MODULE_1__/* .string */ .Z_().required(
          formatMessage({
            id: "Settings.review-workflows.validation.stage.name",
            defaultMessage: "Name is required"
          })
        ).max(
          255,
          formatMessage({
            id: "Settings.review-workflows.validation.stage.max-length",
            defaultMessage: "Name can not be longer than 255 characters"
          })
        ).test(
          "unique-name",
          formatMessage({
            id: "Settings.review-workflows.validation.stage.duplicate",
            defaultMessage: "Stage name must be unique"
          }),
          function(stageName) {
            const {
              options: { context }
            } = this;
            return context.stages.filter((stage) => stage.name === stageName).length === 1;
          }
        ),
        color: yup__WEBPACK_IMPORTED_MODULE_1__/* .string */ .Z_().required(
          formatMessage({
            id: "Settings.review-workflows.validation.stage.color",
            defaultMessage: "Color is required"
          })
        ).matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/i)
      })
    ).min(1)
  });
  try {
    await schema.validate(values, { abortEarly: false, context: values });
    return true;
  } catch (error) {
    let errors = {};
    if (error instanceof yup__WEBPACK_IMPORTED_MODULE_1__/* .ValidationError */ .p8) {
      error.inner.forEach((error2) => {
        lodash_set__WEBPACK_IMPORTED_MODULE_0___default()(errors, error2.path, error2.message);
      });
    }
    return errors;
  }
}


/***/ }),

/***/ 86961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(13578), isObjectLike = __webpack_require__(27138);
var boolTag = "[object Boolean]";
function isBoolean(value) {
  return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
}
module.exports = isBoolean;


/***/ }),

/***/ 92249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isNumber = __webpack_require__(37997);
function isNaN(value) {
  return isNumber(value) && value != +value;
}
module.exports = isNaN;


/***/ }),

/***/ 37997:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(13578), isObjectLike = __webpack_require__(27138);
var numberTag = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
}
module.exports = isNumber;


/***/ }),

/***/ 59438:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ F),
/* harmony export */   y: () => (/* binding */ j)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27279);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37652);
/* harmony import */ var _AccordionContext_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34803);
/* harmony import */ var _hooks_useId_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(73777);
/* harmony import */ var _Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19915);
/* harmony import */ var _Flex_Flex_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33110);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(68263);








const v = ({ theme: r, expanded: o, variant: t, disabled: i, error: a }) => a ? `1px solid ${r.colors.danger600} !important` : i ? `1px solid ${r.colors.neutral150}` : o ? `1px solid ${r.colors.primary600}` : t === "primary" ? `1px solid ${r.colors.neutral0}` : `1px solid ${r.colors.neutral100}`, j = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z))``, k = (0,styled_components__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_4__/* .Box */ .x))`
  border: ${v};

  &:hover:not([aria-disabled='true']) {
    border: 1px solid ${({ theme: r }) => r.colors.primary600};

    ${j} {
      color: ${({ theme: r, expanded: o }) => o ? void 0 : r.colors.primary700};
    }

    ${_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z} {
      color: ${({ theme: r, expanded: o }) => o ? void 0 : r.colors.primary600};
    }

    & > ${_Flex_Flex_js__WEBPACK_IMPORTED_MODULE_5__/* .Flex */ .k} {
      background: ${({ theme: r }) => r.colors.primary100};
    }

    [data-strapi-dropdown='true'] {
      background: ${({ theme: r }) => r.colors.primary200};
    }
  }
`, F = ({ children: r, disabled: o = false, error: t, expanded: i = false, hasErrorMessage: a = true, id: f, onToggle: s, toggle: c, size: e = "M", variant: d = "primary", shadow: $ }) => {
  const l = (0,_hooks_useId_js__WEBPACK_IMPORTED_MODULE_6__/* .useId */ .M)(f), x = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => ({ expanded: i, onToggle: s, toggle: c, id: l, size: e, variant: d, disabled: o }), [o, i, l, s, e, c, d]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_AccordionContext_js__WEBPACK_IMPORTED_MODULE_7__/* .AccordionContext */ .S.Provider, { value: x, children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(k, { "data-strapi-expanded": i, disabled: o, "aria-disabled": o, expanded: i, hasRadius: true, variant: d, error: t, shadow: $, children: r }), t && a && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_4__/* .Box */ .x, { paddingTop: 1, children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Typography_Typography_js__WEBPACK_IMPORTED_MODULE_3__/* .Typography */ .Z, { variant: "pi", textColor: "danger600", children: t }) })] });
};



/***/ }),

/***/ 3667:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);
/* harmony import */ var _AccordionContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34803);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68263);



const p = ({ children: r, ...n }) => {
  const { expanded: i, id: o } = (0,_AccordionContext_js__WEBPACK_IMPORTED_MODULE_1__/* .useAccordion */ .A)();
  if (!i)
    return null;
  const c = `accordion-content-${o}`, e = `accordion-label-${o}`, t = `accordion-desc-${o}`;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x, { role: "region", id: c, "aria-labelledby": e, "aria-describedby": t, ...n, children: r });
};



/***/ }),

/***/ 34803:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ r),
/* harmony export */   S: () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27279);

const t = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  disabled: false,
  expanded: false,
  id: "",
  size: "M",
  variant: "primary"
}), r = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(t);



/***/ }),

/***/ 68809:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  B: () => (/* binding */ Q)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(74081);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/CarretDown.js
var CarretDown = __webpack_require__(27870);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(37652);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Accordion/Accordion.js
var Accordion = __webpack_require__(59438);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Accordion/AccordionContext.js
var AccordionContext = __webpack_require__(34803);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Accordion/utils.js
const utils_n = ({ expanded: e, disabled: t, variant: a }) => {
  let r = "neutral100";
  return e ? r = "primary100" : t ? r = "neutral150" : a === "primary" && (r = "neutral0"), r;
};


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextButton/TextButton.js
var TextButton = __webpack_require__(56953);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Icon/Icon.js
var Icon = __webpack_require__(24204);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Accordion/AccordionToggle.js










const L = (0,styled_components_browser_esm/* default */.ZP)((0,TextButton/* TextButton */.A))`
  text-align: left;

  // necessary to make the ellipsis prop work on the title
  > span {
    max-width: 100%;
  }

  svg {
    width: ${14 / 16}rem;
    height: ${14 / 16}rem;

    path {
      fill: ${({ theme: o, expanded: e }) => e ? o.colors.primary600 : o.colors.neutral500};
    }
  }
`, P = (0,styled_components_browser_esm/* default */.ZP)((0,Flex/* Flex */.k))`
  min-height: ${({ theme: o, size: e }) => o.sizes.accordions[e]};
  border-radius: ${({ theme: o, expanded: e }) => e ? `${o.borderRadius} ${o.borderRadius} 0 0` : o.borderRadius};

  &:hover {
    svg {
      path {
        fill: ${({ theme: o }) => o.colors.primary600};
      }
    }
  }
`, Q = ({ title: o, description: e, as: $ = "span", togglePosition: l = "right", action: g, ...w }) => {
  const { onToggle: s, toggle: m, expanded: r, id: c, size: t, variant: C, disabled: n } = (0,AccordionContext/* useAccordion */.A)(), T = `accordion-content-${c}`, h = `accordion-label-${c}`, k = `accordion-desc-${c}`, a = t === "M" ? 6 : 4, u = t === "M" ? a : a - 2, v = utils_n({ expanded: r, disabled: n, variant: C }), j = {
    as: $,
    fontWeight: t === "S" ? "bold" : void 0,
    id: h,
    textColor: r ? "primary600" : "neutral700",
    ellipsis: true,
    variant: t === "M" ? "delta" : void 0
  }, z = r ? "primary600" : "neutral600", B = r ? "primary200" : "neutral200", f = t === "M" ? `${32 / 16}rem` : `${24 / 16}rem`, x = () => {
    n || (m && !s ? (console.warn('Deprecation warning: Usage of "toggle" prop in Accordion component is deprecated. This is discouraged and will be removed in the next major release. Please use "onToggle" instead'), m()) : s && s());
  }, b = (0,jsx_runtime.jsx)(Flex/* Flex */.k, { justifyContent: "center", borderRadius: "50%", height: f, width: f, transform: r ? "rotate(180deg)" : void 0, "data-strapi-dropdown": true, "aria-hidden": true, as: "span", background: B, cursor: n ? "not-allowed" : "pointer", onClick: x, shrink: 0, children: (0,jsx_runtime.jsx)(Icon/* Icon */.J, { as: CarretDown/* default */.Z, width: t === "M" ? `${11 / 16}rem` : `${8 / 16}rem`, color: r ? "primary600" : "neutral600" }) });
  return (0,jsx_runtime.jsx)(P, { paddingBottom: u, paddingLeft: a, paddingRight: a, paddingTop: u, background: v, expanded: r, size: t, justifyContent: "space-between", cursor: n ? "not-allowed" : "", children: (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { gap: 3, flex: 1, maxWidth: "100%", children: [l === "left" && b, (0,jsx_runtime.jsx)(L, { onClick: x, "aria-disabled": n, "aria-expanded": r, "aria-controls": T, "aria-labelledby": h, "data-strapi-accordion-toggle": true, expanded: r, type: "button", flex: 1, minWidth: 0, ...w, children: (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)(Accordion/* AccordionTypography */.y, { ...j, children: o }), e && (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { as: "p", id: k, textColor: z, children: e })] }) }), l === "right" && (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { gap: 3, children: [b, g] }), l === "left" && g] }) });
};



/***/ }),

/***/ 97367:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const e = (r) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...r, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
  "path",
  {
    fill: "#212134",
    d: "M24 13.3a.2.2 0 0 1-.2.2H5.74l8.239 8.239a.2.2 0 0 1 0 .282L12.14 23.86a.2.2 0 0 1-.282 0L.14 12.14a.2.2 0 0 1 0-.282L11.86.14a.2.2 0 0 1 .282 0L13.98 1.98a.2.2 0 0 1 0 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6Z"
  }
) }), a = e;



/***/ }),

/***/ 18989:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const t = (c) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...c, children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", { fill: "#212134", d: "M16.563 5.587a2.503 2.503 0 1 0 0-5.007 2.503 2.503 0 0 0 0 5.007Z" }),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M18.487 3.083c-.012.788-.487 1.513-1.229 1.797a1.954 1.954 0 0 1-2.184-.574A1.943 1.943 0 0 1 14.9 2.11c.4-.684 1.2-1.066 1.981-.927a1.954 1.954 0 0 1 1.606 1.9c.011.748 1.17.748 1.158 0A3.138 3.138 0 0 0 17.565.17c-1.176-.423-2.567-.03-3.36.933-.83 1.002-.968 2.45-.284 3.575.678 1.124 1.993 1.674 3.273 1.431 1.432-.272 2.428-1.593 2.451-3.019.012-.753-1.147-.753-1.158-.006ZM16.563 14.372a2.503 2.503 0 1 0 0-5.007 2.503 2.503 0 0 0 0 5.007Z"
    }
  ),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M18.487 11.867c-.012.789-.487 1.513-1.229 1.797a1.954 1.954 0 0 1-2.184-.574 1.943 1.943 0 0 1-.174-2.196c.4-.684 1.2-1.066 1.981-.927.928.156 1.588.968 1.606 1.9.011.748 1.17.748 1.158 0a3.138 3.138 0 0 0-2.08-2.914c-1.176-.423-2.567-.029-3.36.933-.83 1.002-.968 2.45-.284 3.575.678 1.124 1.993 1.675 3.273 1.431 1.432-.272 2.428-1.593 2.451-3.019.012-.753-1.147-.753-1.158-.005ZM16.563 23.392a2.503 2.503 0 1 0 0-5.006 2.503 2.503 0 0 0 0 5.006Z"
    }
  ),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M18.487 20.89c-.012.787-.487 1.512-1.229 1.796a1.954 1.954 0 0 1-2.184-.574 1.943 1.943 0 0 1-.174-2.196c.4-.684 1.2-1.066 1.981-.927.928.156 1.588.967 1.606 1.9.011.748 1.17.748 1.158 0a3.138 3.138 0 0 0-2.08-2.914c-1.176-.423-2.567-.03-3.36.933-.83 1.002-.968 2.45-.284 3.575.678 1.124 1.993 1.674 3.273 1.431 1.432-.272 2.428-1.593 2.451-3.019.012-.753-1.147-.753-1.158-.006ZM7.378 5.622a2.503 2.503 0 1 0 0-5.007 2.503 2.503 0 0 0 0 5.007Z"
    }
  ),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M9.302 3.119c-.011.788-.486 1.512-1.228 1.796a1.954 1.954 0 0 1-2.185-.574 1.943 1.943 0 0 1-.173-2.196c.4-.684 1.199-1.066 1.981-.927a1.943 1.943 0 0 1 1.605 1.9c.012.748 1.17.748 1.16 0A3.138 3.138 0 0 0 8.38.205c-1.176-.423-2.567-.029-3.36.933-.83 1.002-.968 2.45-.285 3.575.678 1.124 1.994 1.675 3.274 1.431 1.431-.272 2.428-1.593 2.451-3.019.012-.753-1.147-.753-1.159-.005ZM7.378 14.406a2.503 2.503 0 1 0 0-5.006 2.503 2.503 0 0 0 0 5.006Z"
    }
  ),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M9.302 11.902c-.011.788-.486 1.513-1.228 1.797a1.954 1.954 0 0 1-2.185-.574 1.943 1.943 0 0 1-.173-2.196c.4-.684 1.199-1.066 1.981-.927a1.943 1.943 0 0 1 1.605 1.9c.012.748 1.17.748 1.16 0A3.138 3.138 0 0 0 8.38 8.988c-1.176-.423-2.567-.03-3.36.933-.83 1.002-.968 2.45-.285 3.575.678 1.124 1.994 1.674 3.274 1.431 1.431-.272 2.428-1.593 2.451-3.019.012-.753-1.147-.753-1.159-.006ZM7.378 23.427a2.503 2.503 0 1 0 0-5.007 2.503 2.503 0 0 0 0 5.007Z"
    }
  ),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#212134",
      d: "M9.302 20.924c-.011.788-.486 1.513-1.228 1.797a1.954 1.954 0 0 1-2.185-.574 1.943 1.943 0 0 1-.173-2.196c.4-.684 1.199-1.066 1.981-.927.933.156 1.594.967 1.605 1.9.012.748 1.17.748 1.16 0A3.139 3.139 0 0 0 8.38 18.01c-1.176-.423-2.567-.03-3.36.933-.83 1.002-.968 2.45-.285 3.569.678 1.124 1.994 1.675 3.274 1.431 1.431-.272 2.428-1.593 2.451-3.019.012-.747-1.147-.747-1.159 0Z"
    }
  )
] }), h = t;



/***/ }),

/***/ 82949:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ r)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74081);

const h = (l) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1rem", height: "1rem", fill: "none", viewBox: "0 0 24 24", ...l, children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", { cx: 12, cy: 12, r: 12, fill: "#212134" }),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "path",
    {
      fill: "#F6F6F9",
      d: "M17 12.569c0 .124-.1.224-.225.224h-3.981v3.982c0 .124-.101.225-.226.225h-1.136a.225.225 0 0 1-.226-.225v-3.981H7.226A.225.225 0 0 1 7 12.567v-1.136c0-.125.1-.226.225-.226h3.982V7.226c0-.124.1-.225.224-.225h1.138c.124 0 .224.1.224.225v3.982h3.982c.124 0 .225.1.225.224v1.138Z"
    }
  )
] }), r = h;



/***/ })

}]);