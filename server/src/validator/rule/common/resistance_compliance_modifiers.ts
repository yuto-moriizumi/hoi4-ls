import { effect } from "../effects";
import { modifier } from "../modifiers";
import { trigger } from "../triggers";
import { Scope } from "../types";
import {
  root,
  obj,
  enumRef,
  scalar,
  int,
  country,
  state,
  typeDefKey,
} from "../utils";

export const resistanceComplianceModifierTypes = [
  "state_resistance_modifier",
  "state_compliance_modifier",
  "core_resistance_modifier",
  "core_compliance_modifier",
];

export const complianceModifierTypes = [
  "state_compliance_modifier",
  "core_compliance_modifier",
];

export const resistanceModifierTypes = [
  "state_resistance_modifier",
  "core_resistance_modifier",
];

export const resistanceComplianceCoreModifierTypes = [
  "core_resistance_modifier",
  "core_compliance_modifier",
];

export const resistanceComplianceStateModifierTypes = [
  "state_resistance_modifier",
  "state_compliance_modifier",
];

const resistance_compliance_modifier = obj(
  {},
  {
    type: enumRef({}, resistanceComplianceModifierTypes),
    icon: scalar(),
    small_icon: scalar(),
    threshold: int(),
    margin: int(),
    alert_level: enumRef({ cardinality: [0, 1] }, "alert_level"),
    alert_margin: int({ cardinality: [0, 1] }),
    state_modifier: obj(
      { cardinality: [1, Infinity], push_scope: Scope.STATE },
      {
        ...modifier,
      },
    ),
    core: obj(
      { replace_scope: { this: country(), root: country(), from: country() } },
      {
        visible: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        enabled: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        on_enable: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        on_disable: obj(
          {
            replace_scope: {
              this: country(),
              root: country(),
              from: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
      },
    ),
    state: obj(
      {
        replace_scope: {
          this: state(),
          root: country(),
          from: country(),
          fromfrom: country(),
        },
      },
      {
        visible: obj(
          {
            replace_scope: {
              this: state(),
              root: country(),
              from: country(),
              fromfrom: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        enabled: obj(
          {
            replace_scope: {
              this: state(),
              root: country(),
              from: country(),
              fromfrom: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...trigger,
          },
        ),
        on_enable: obj(
          {
            replace_scope: {
              this: state(),
              root: country(),
              from: country(),
              fromfrom: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
        on_disable: obj(
          {
            replace_scope: {
              this: state(),
              root: country(),
              from: country(),
              fromfrom: country(),
            },
            cardinality: [0, 1],
          },
          {
            ...effect,
          },
        ),
      },
    ),
  },
);

export const resistanceComplianceModifierType = root(
  { path: "/common/resistance_compliance_modifiers" },
  {
    [typeDefKey("resistance_compliance_modifier")]:
      resistance_compliance_modifier,
    // compliance: obj(
    //   {},
    //   {
    //     type: enumRef({}, "compliance_modifier_types"),
    //   },
    // ),
    // resistance: obj(
    //   {},
    //   {
    //     type: enumRef({}, "resistance_modifier_types"),
    //   },
    // ),
    // core: obj(
    //   {},
    //   {
    //     type: enumRef({}, "resistance_compliance_core_modifier_types"),
    //   },
    // ),
    // state: obj(
    //   {},
    //   {
    //     type: enumRef({}, "resistance_compliance_state_modifier_types"),
    //   },
    // ),
  },
);
