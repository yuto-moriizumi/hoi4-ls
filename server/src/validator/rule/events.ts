import { effect } from "./effects";
import { modifier_rule } from "./modifier_rule";
import { trigger } from "./triggers";
import {
  root,
  obj,
  array,
  bool,
  scalar,
  either,
  localisation,
  typeRef,
  int,
  variable_field,
} from "./utils";

const event = obj(
  {},
  {
    id: scalar(),
    title: either(
      localisation({ cardinality: [0, Infinity] }),
      obj(
        { cardinality: [0, Infinity] },
        {
          trigger: obj({}, { ...trigger }),
          text: localisation(),
        },
      ),
    ),
    picture: typeRef({ cardinality: [0, 1] }, "spriteType"),
    desc: either(
      localisation({ cardinality: [0, Infinity] }),
      obj(
        { cardinality: [0, Infinity] },
        {
          trigger: obj({}, { ...trigger }),
          text: localisation(),
        },
      ),
    ),
    hidden: either(
      bool({ cardinality: [0, 1] }, true),
      bool({ cardinality: [0, 1] }, false),
    ),
    major: either(
      bool({ cardinality: [0, 1] }, true),
      bool({ cardinality: [0, 1] }, false),
    ),
    fire_only_once: either(
      bool({ cardinality: [0, 1] }, true),
      bool({ cardinality: [0, 1] }, false),
    ),
    is_triggered_only: either(
      bool({ cardinality: [0, 1] }, true),
      bool({ cardinality: [0, 1] }, false),
    ),
    minor_flavor: either(
      bool({ cardinality: [0, 1] }, true),
      bool({ cardinality: [0, 1] }, false),
    ),
    timeout_days: int({ cardinality: [0, 1] }),
    trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
    show_major: obj({ cardinality: [0, 1] }, { ...trigger }),
    fire_for_sender: bool({ cardinality: [0, 1] }),
    mean_time_to_happen: obj(
      { cardinality: [0, 1] },
      {
        days: int({ cardinality: [0, 1] }),
        months: int({ cardinality: [0, 1] }),
        years: int({ cardinality: [0, 1] }),
        ...modifier_rule,
      },
    ),
    immediate: obj({ cardinality: [0, Infinity] }, { ...effect }),
    option: array({ cardinality: [0, Infinity] }, [
      obj(
        {},
        {
          name: localisation({ cardinality: [0, 1] }),
          trigger: obj({ cardinality: [0, 1] }, { ...trigger }),
          ...effect,
          ai_chance: obj(
            { cardinality: [0, 1] },
            {
              base: variable_field({ cardinality: [0, Infinity] }),
              factor: variable_field({ cardinality: [0, Infinity] }),
              ...modifier_rule,
            },
          ),
        },
      ),
    ]),
  },
);

export const eventType = root(
  { path: "/events" },
  {
    // event: obj(
    //   {},
    //   {
    //     country_event: array({}, []),
    //     state_event: array({}, []),
    //     news_event: array({}, []),
    //     unit_leader_event: array({}, []),
    //     operative_leader_event: array({}, []),
    //     hidden: obj({}, { hidden: bool({}, true) }),
    //     localisation: obj({}, { title: title() }),
    //   },
    // ),
    event,
  },
);
