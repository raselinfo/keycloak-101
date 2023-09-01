"use strict";
(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[8936],{

/***/ 36318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ CreateView)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(27279);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 23 modules
var helper_plugin_esm = __webpack_require__(63838);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(49402);
// EXTERNAL MODULE: ./.cache/admin/src/pages/App/selectors.js
var selectors = __webpack_require__(36364);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(6854);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(33110);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Loader/Loader.js + 1 modules
var Loader = __webpack_require__(59912);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(19915);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Check.js
var Check = __webpack_require__(8766);
// EXTERNAL MODULE: ./node_modules/formik/dist/formik.esm.js + 121 modules
var formik_esm = __webpack_require__(71563);
// EXTERNAL MODULE: ./node_modules/lodash/set.js
var set = __webpack_require__(43433);
var set_default = /*#__PURE__*/__webpack_require__.n(set);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(61020);
// EXTERNAL MODULE: ./node_modules/react-query/es/index.js
var react_query_es = __webpack_require__(40464);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(51447);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/useContentTypes/index.js + 1 modules
var useContentTypes = __webpack_require__(92686);
// EXTERNAL MODULE: ./.cache/admin/src/hooks/useInjectReducer/index.js + 1 modules
var useInjectReducer = __webpack_require__(79194);
// EXTERNAL MODULE: ./.cache/ee/admin/hooks/useLicenseLimits.js
var useLicenseLimits = __webpack_require__(75021);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/actions/index.js
var actions = __webpack_require__(11984);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Layout/index.js + 3 modules
var Layout = __webpack_require__(43390);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/LimitsModal/index.js + 2 modules
var LimitsModal = __webpack_require__(38705);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/Stages/index.js + 5 modules
var Stages = __webpack_require__(68997);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/components/WorkflowAttributes/index.js + 1 modules
var WorkflowAttributes = __webpack_require__(85230);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/constants.js
var constants = __webpack_require__(86978);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/hooks/useReviewWorkflows.js
var useReviewWorkflows = __webpack_require__(52258);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/reducer/index.js
var reducer = __webpack_require__(3848);
// EXTERNAL MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/utils/validateWorkflow.js
var validateWorkflow = __webpack_require__(66578);
;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/pages/CreateView/CreateView.js






















function ReviewWorkflowsCreateView() {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { post } = (0,helper_plugin_esm/* useFetchClient */.kY)();
  const { push } = (0,react_router/* useHistory */.k6)();
  const { formatAPIError } = (0,helper_plugin_esm/* useAPIErrorHandler */.So)();
  const dispatch = (0,es/* useDispatch */.I0)();
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const { collectionTypes, singleTypes, isLoading: isLoadingModels } = (0,useContentTypes/* useContentTypes */.G)();
  const { isLoading: isWorkflowLoading, meta, workflows } = (0,useReviewWorkflows/* useReviewWorkflows */.n)();
  const {
    clientState: {
      currentWorkflow: { data: currentWorkflow, isDirty: currentWorkflowIsDirty }
    }
  } = (0,es/* useSelector */.v9)((state) => state?.[constants/* REDUX_NAMESPACE */.sN] ?? reducer/* initialState */.E);
  const [showLimitModal, setShowLimitModal] = react.useState(false);
  const { isLoading: isLicenseLoading, getFeature } = (0,useLicenseLimits/* useLicenseLimits */.q)();
  const [initialErrors, setInitialErrors] = react.useState(null);
  const [savePrompts, setSavePrompts] = react.useState({});
  const limits = getFeature("review-workflows");
  const contentTypesFromOtherWorkflows = workflows.flatMap((workflow) => workflow.contentTypes);
  const { mutateAsync, isLoading } = (0,react_query_es.useMutation)(
    async ({ workflow }) => {
      const {
        data: { data }
      } = await post(`/admin/review-workflows/workflows`, {
        data: workflow
      });
      return data;
    },
    {
      onSuccess() {
        toggleNotification({
          type: "success",
          message: {
            id: "Settings.review-workflows.create.page.notification.success",
            defaultMessage: "Workflow successfully created"
          }
        });
      }
    }
  );
  const submitForm = async () => {
    setSavePrompts({});
    try {
      const workflow = await mutateAsync({ workflow: currentWorkflow });
      push(`/settings/review-workflows/${workflow.id}`);
      return workflow;
    } catch (error) {
      if (error.response.data?.error?.name === "ValidationError" && error.response.data?.error?.details?.errors?.length > 0) {
        setInitialErrors(
          error.response.data?.error?.details?.errors.reduce((acc, error2) => {
            set_default()(acc, error2.path, error2.message);
            return acc;
          }, {})
        );
      }
      toggleNotification({
        type: "warning",
        message: formatAPIError(error)
      });
      return null;
    }
  };
  const handleConfirmDeleteDialog = async () => {
    await submitForm();
  };
  const handleConfirmClose = () => {
    setSavePrompts({});
  };
  const formik = (0,formik_esm/* useFormik */.TA)({
    enableReinitialize: true,
    initialErrors,
    initialValues: currentWorkflow,
    async onSubmit() {
      const isContentTypeReassignment = currentWorkflow.contentTypes.some(
        (contentType) => contentTypesFromOtherWorkflows.includes(contentType)
      );
      if (limits?.[constants/* CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME */.Ef] && meta?.workflowCount >= parseInt(limits[constants/* CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME */.Ef], 10)) {
        setShowLimitModal("workflow");
      } else if (limits?.[constants/* CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME */._X] && currentWorkflow.stages.length >= parseInt(limits[constants/* CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME */._X], 10)) {
        setShowLimitModal("stage");
      } else if (isContentTypeReassignment) {
        setSavePrompts((prev) => ({ ...prev, hasReassignedContentTypes: true }));
      } else {
        submitForm();
      }
    },
    validate(values) {
      return (0,validateWorkflow/* validateWorkflow */.V)({ values, formatMessage });
    }
  });
  (0,useInjectReducer/* useInjectReducer */.v)(constants/* REDUX_NAMESPACE */.sN, reducer/* reducer */.I);
  react.useEffect(() => {
    dispatch((0,actions/* resetWorkflow */.Js)());
    dispatch(
      (0,actions/* addStage */.CI)({
        name: ""
      })
    );
  }, [dispatch]);
  react.useEffect(() => {
    if (!isWorkflowLoading && !isLicenseLoading) {
      if (limits?.[constants/* CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME */.Ef] && meta?.workflowsTotal >= parseInt(limits[constants/* CHARGEBEE_WORKFLOW_ENTITLEMENT_NAME */.Ef], 10)) {
        setShowLimitModal("workflow");
      } else if (limits?.[constants/* CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME */._X] && currentWorkflow.stages.length >= parseInt(limits[constants/* CHARGEBEE_STAGES_PER_WORKFLOW_ENTITLEMENT_NAME */._X], 10)) {
        setShowLimitModal("stage");
      }
    }
  }, [
    isLicenseLoading,
    isWorkflowLoading,
    limits,
    meta?.workflowsTotal,
    currentWorkflow.stages.length
  ]);
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Layout/* DragLayerRendered */.lx, null), /* @__PURE__ */ react.createElement(formik_esm/* FormikProvider */.Hy, { value: formik }, /* @__PURE__ */ react.createElement(formik_esm/* Form */.l0, { onSubmit: formik.handleSubmit }, /* @__PURE__ */ react.createElement(
    Layout/* Header */.h4,
    {
      navigationAction: /* @__PURE__ */ react.createElement(Layout/* Back */.eJ, { href: "/settings/review-workflows" }),
      primaryAction: /* @__PURE__ */ react.createElement(
        Button/* Button */.z,
        {
          startIcon: /* @__PURE__ */ react.createElement(Check/* default */.Z, null),
          type: "submit",
          size: "M",
          disabled: !currentWorkflowIsDirty,
          isLoading
        },
        formatMessage({
          id: "global.save",
          defaultMessage: "Save"
        })
      ),
      title: formatMessage({
        id: "Settings.review-workflows.create.page.title",
        defaultMessage: "Create Review Workflow"
      }),
      subtitle: formatMessage(
        {
          id: "Settings.review-workflows.page.subtitle",
          defaultMessage: "{count, plural, one {# stage} other {# stages}}"
        },
        { count: currentWorkflow?.stages?.length ?? 0 }
      )
    }
  ), /* @__PURE__ */ react.createElement(Layout/* Root */.fC, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { alignItems: "stretch", direction: "column", gap: 7 }, isLoadingModels ? /* @__PURE__ */ react.createElement(Loader/* Loader */.a, null, formatMessage({
    id: "Settings.review-workflows.page.isLoading",
    defaultMessage: "Workflow is loading"
  })) : /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { alignItems: "stretch", direction: "column", gap: 7 }, /* @__PURE__ */ react.createElement(
    WorkflowAttributes/* WorkflowAttributes */.Y,
    {
      contentTypes: { collectionTypes, singleTypes },
      workflows
    }
  ), /* @__PURE__ */ react.createElement(Stages/* Stages */.U, { stages: formik.values?.stages })))))), /* @__PURE__ */ react.createElement(
    helper_plugin_esm/* ConfirmDialog */.QH.Root,
    {
      isConfirmButtonLoading: isLoading,
      isOpen: Object.keys(savePrompts).length > 0,
      onToggleDialog: handleConfirmClose,
      onConfirm: handleConfirmDeleteDialog
    },
    /* @__PURE__ */ react.createElement(helper_plugin_esm/* ConfirmDialog */.QH.Body, null, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", gap: 5 }, savePrompts.hasReassignedContentTypes && /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textAlign: "center", variant: "omega" }, formatMessage(
      {
        id: "Settings.review-workflows.page.delete.confirm.contentType.body",
        defaultMessage: "{count} {count, plural, one {content-type} other {content-types}} {count, plural, one {is} other {are}} already mapped to {count, plural, one {another workflow} other {other workflows}}. If you save changes, {count, plural, one {this} other {these}} {count, plural, one {content-type} other {{count} content-types}} will no more be mapped to the {count, plural, one {another workflow} other {other workflows}} and all corresponding information will be removed."
      },
      {
        count: contentTypesFromOtherWorkflows.filter(
          (contentType) => currentWorkflow.contentTypes.includes(contentType)
        ).length
      }
    )), /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { textAlign: "center", variant: "omega" }, formatMessage({
      id: "Settings.review-workflows.page.delete.confirm.confirm",
      defaultMessage: "Are you sure you want to save?"
    }))))
  ), /* @__PURE__ */ react.createElement(
    LimitsModal/* Root */.fC,
    {
      isOpen: showLimitModal === "workflow",
      onClose: () => setShowLimitModal(false)
    },
    /* @__PURE__ */ react.createElement(LimitsModal/* Title */.Dx, null, formatMessage({
      id: "Settings.review-workflows.create.page.workflows.limit.title",
      defaultMessage: "You\u2019ve reached the limit of workflows in your plan"
    })),
    /* @__PURE__ */ react.createElement(LimitsModal/* Body */.uT, null, formatMessage({
      id: "Settings.review-workflows.create.page.workflows.limit.body",
      defaultMessage: "Delete a workflow or contact Sales to enable more workflows."
    }))
  ), /* @__PURE__ */ react.createElement(
    LimitsModal/* Root */.fC,
    {
      isOpen: showLimitModal === "stage",
      onClose: () => setShowLimitModal(false)
    },
    /* @__PURE__ */ react.createElement(LimitsModal/* Title */.Dx, null, formatMessage({
      id: "Settings.review-workflows.create.page.stages.limit.title",
      defaultMessage: "You have reached the limit of stages for this workflow in your plan"
    })),
    /* @__PURE__ */ react.createElement(LimitsModal/* Body */.uT, null, formatMessage({
      id: "Settings.review-workflows.create.page.stages.limit.body",
      defaultMessage: "Try deleting some stages or contact Sales to enable more stages."
    }))
  ));
}

;// CONCATENATED MODULE: ./.cache/ee/admin/pages/SettingsPage/pages/ReviewWorkflows/pages/CreateView/index.js





/* harmony default export */ function CreateView() {
  const permissions = (0,es/* useSelector */.v9)(selectors/* selectAdminPermissions */._);
  return /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPagePermissions */.O4, { permissions: permissions.settings["review-workflows"].create }, /* @__PURE__ */ react.createElement(ReviewWorkflowsCreateView, null));
}


/***/ })

}]);