import { Entries } from "../types";
import {
  obj,
  scalar,
  bool,
  enumRef,
  array,
  float,
  value_set,
  int,
  either,
  localisation,
  localisation_inline,
  typeRef,
  literal,
  root,
  typeDefKey,
  percentage_field,
} from "../utils";

export const containerOrientations = [
  "CENTER",
  "CENTER_LEFT",
  "CENTER_RIGHT",
  "UPPER_LEFT",
  "LOWER_LEFT",
  "UPPER_RIGHT",
  "LOWER_RIGHT",
  "RIGHT",
  "LEFT",
  "CENTER_UP",
  "CENTER_DOWN",
  "CENTER_LOWER",
  "UP",
  "DOWN",
];
export const containerOrigo = [
  "center",
  "center_up",
  "center_down",
  "center_left",
  "center_right",
  "lower_left",
  "lower_right",
  "upper_right",
  "upper_left",
  "right",
  "left",
];
export const dragScrollType = ["left", "middle", "right"];
export const guiTextFormats = ["left", "center", "centre", "right"];
export const guiTextFormatsVertical = ["top", "center", "centre", "bottom"];
export const animationTypes = ["decelerated", "accelerated", "linear"];

export const horizontal_scrollbar_types = {
  path: "game/interface",
  name: {
    extendedScrollbarType: {
      name: "enum_name",
      horizontal: true,
    },
    scrollbarType: {
      name: "enum_name",
      horizontal: true,
    },
  },
};

export const scrollbar_types = {
  path: "game/interface",
  name: {
    extendedScrollbarType: {
      name: "enum_name",
    },
    scrollbarType: {
      name: "enum_name",
    },
  },
};

export const guiElementsProperties = {
  path: "game/interface",
  name: {
    buttonType: {
      name: "enum_name",
    },
    iconType: {
      name: "enum_name",
    },
  },
};

export const guiButtons = {
  path: "game/interface",
  name: {
    buttonType: {
      name: "enum_name",
    },
  },
};

export const guiDynamicLists = {
  path: "game/interface",
  name: {
    gridBoxType: {
      name: "enum_name",
    },
  },
};

export const gui_standard = {
  position: obj(
    {},
    {
      x: either(int(), percentage_field()),
      y: either(int(), percentage_field()),
    },
  ),
  size: obj(
    {},
    {
      width: either(int(), percentage_field()),
      height: either(int(), percentage_field()),
      min: obj(
        { cardinality: [0, 1] },
        {
          width: either(int(), percentage_field()),
          height: either(int(), percentage_field()),
        },
      ),
      max: obj(
        { cardinality: [0, 1] },
        {
          width: either(int(), percentage_field()),
          height: either(int(), percentage_field()),
        },
      ),
      preserve_aspect_ratio: bool({ cardinality: [0, 1] }),
    },
  ),
  margin: obj(
    { cardinality: [0, 1] },
    {
      top: int({ cardinality: [0, 1] }),
      bottom: int({ cardinality: [0, 1] }),
      left: int({ cardinality: [0, 1] }),
      right: int({ cardinality: [0, 1] }),
    },
  ),
  background_margin: obj(
    { cardinality: [0, 1] },
    {
      top: int({ cardinality: [0, 1] }),
      bottom: int({ cardinality: [0, 1] }),
      left: int({ cardinality: [0, 1] }),
      right: int({ cardinality: [0, 1] }),
    },
  ),
  scale: float(),
  rotation: float(),
  orientation: enumRef({}, "containerOrientations"),
  origo: enumRef({}, "containerOrigo"),
  hide: bool(),
  vertical_scroll_step: int(),
  spriteType: typeRef({}, "spriteType"),
  quadTextureSprite: typeRef({}, "spriteType"),
};
export const gui_image = {
  alwaystransparent: bool(),
  frame: int(),
  centerposition: bool(),
};

export const gui_localization = {
  pdx_tooltip: localisation(),
  pdx_tooltip_delayed: localisation(),
  tooltip: localisation(),
  text: localisation(),
  pdx_disabled_tooltip: localisation(),
  pdx_disabled_tooltip_delayed: localisation(),
};

export const gui_animation = {
  show_position: obj(
    {},
    {
      x: either(int(), float(), percentage_field()),
      y: either(int(), float(), percentage_field()),
    },
  ),
  hide_position: obj(
    {},
    {
      x: either(int(), float(), percentage_field()),
      y: either(int(), float(), percentage_field()),
    },
  ),
  closed_position: obj(
    {},
    {
      x: either(int(), float(), percentage_field()),
      y: either(int(), float(), percentage_field()),
    },
  ),
  open_position: obj(
    {},
    {
      x: either(int(), float(), percentage_field()),
      y: either(int(), float(), percentage_field()),
    },
  ),
  peek_position: obj(
    {},
    {
      x: either(int(), float(), percentage_field()),
      y: either(int(), float(), percentage_field()),
    },
  ),
  peek_check_top_left: obj(
    {},
    {
      x: either(int(), float(), percentage_field()),
      y: either(int(), float(), percentage_field()),
    },
  ),
  peek_check_size: obj(
    {},
    {
      width: either(int(), float(), percentage_field()),
      height: either(int(), float(), percentage_field()),
    },
  ),
  show_animation_type: enumRef({}, "animationTypes"),
  hide_animation_type: enumRef({}, "animationTypes"),
  animation_type: enumRef({}, "animationTypes"),
  animation_time: float(),
  fade_time: float(),
  fade_type: literal({}, "linear"),
};

export const gui_sound = {
  upsound: scalar(),
  downsound: scalar(),
  show_sound: scalar(),
  hide_sound: scalar(),
  clicksound: scalar(),
  oversound: scalar(),
};

export const any_image_type = {
  ...gui_image,
};

export const gui: Entries = {
  containerWindowType: obj(
    { cardinality: [0, Infinity] },
    {
      name: value_set({}, "containerWindowTypeChild"),
      moveable: bool({ cardinality: [0, 1] }),
      //   orientation: enumRef({ cardinality: [0, 1] }, "containerOrientations"),
      clipping: bool({ cardinality: [0, 1] }),
      fullscreen: bool({ cardinality: [0, 1] }),
      background: obj(
        { cardinality: [0, Infinity] },
        {
          name: scalar({ cardinality: [0, 1] }),
          ...gui_standard,
          ...gui_image,
          ...gui_sound,
          ...gui_localization,
        },
      ),
      //   ...gui,
      ...gui_standard,
      ...gui_animation,
      ...gui_sound,
      verticalScrollbar: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
      horizontalScrollbar: enumRef(
        { cardinality: [0, 1] },
        "horizontal_scrollbar_types",
      ),
      autohide_scrollbars: bool({ cardinality: [0, 1] }),
      drag_scroll: array({ cardinality: [0, 1] }, [
        enumRef({ cardinality: [0, Infinity] }, "dragScrollType"),
      ]),
      click_to_front: bool({ cardinality: [0, 1] }),
      smooth_scrolling: bool({ cardinality: [0, 1] }),
      scroll_wheel_factor: float({ cardinality: [0, 1] }),
    },
  ),
  dropDownBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      moveable: bool({ cardinality: [0, 1] }),
      //   orientation: enumRef({ cardinality: [0, 1] }, "containerOrientations"),
      clipping: bool({ cardinality: [0, 1] }),
      fullscreen: bool({ cardinality: [0, 1] }),
      switch_frame_on_expand: bool({ cardinality: [0, 1] }),
      expandedOnTop: bool({ cardinality: [0, 1] }),
      background: obj(
        { cardinality: [0, Infinity] },
        {
          name: scalar({ cardinality: [0, 1] }),
          ...gui_standard,
          ...gui_image,
          ...gui_sound,
          ...gui_localization,
        },
      ),
      //   ...gui,
      ...gui_standard,
      ...gui_animation,
      ...gui_sound,
      verticalScrollbar: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
      horizontalScrollbar: enumRef(
        { cardinality: [0, 1] },
        "horizontal_scrollbar_types",
      ),
      autohide_scrollbars: bool({ cardinality: [0, 1] }),
      drag_scroll: array({ cardinality: [0, 1] }, [
        enumRef({ cardinality: [0, Infinity] }, "dragScrollType"),
      ]),
      click_to_front: bool({ cardinality: [0, 1] }),
      smooth_scrolling: bool({ cardinality: [0, 1] }),
      scroll_wheel_factor: float({ cardinality: [0, 1] }),
      expandButton: obj(
        { cardinality: [0, 1] },
        {
          name: scalar(),
          //   size: obj(
          //     { cardinality: [0, 1] },
          //     {
          //       x: int(),
          //       y: int(),
          //     },
          //   ),
          ...gui_standard,
          ...gui_image,
          buttonText: either(
            localisation({ cardinality: [0, 1] }),
            localisation_inline({ cardinality: [0, 1] }),
          ),
          buttonFont: scalar({ cardinality: [0, 1] }),
          ...gui_localization,
          shortcut: scalar({ cardinality: [0, Infinity] }),
          hint_tag: localisation({ cardinality: [0, 1] }),
          ...gui_sound,
          format: enumRef({ cardinality: [0, 1] }, "guiTextFormats"),
          multiline: bool({ cardinality: [0, 1] }),
          font: scalar({ cardinality: [0, 1] }),
          web_link: scalar({ cardinality: [0, 1] }),
        },
      ),
      expandedWindow: obj(
        { cardinality: [0, 1] },
        {
          name: scalar(),
          moveable: bool({ cardinality: [0, 1] }),
          //   orientation: enumRef(
          //     { cardinality: [0, 1] },
          //     "containerOrientations",
          //   ),
          clipping: bool({ cardinality: [0, 1] }),
          fullscreen: bool({ cardinality: [0, 1] }),
          background: obj(
            { cardinality: [0, Infinity] },
            {
              name: scalar({ cardinality: [0, 1] }),
              ...gui_standard,
              ...gui_image,
              ...gui_sound,
              ...gui_localization,
            },
          ),
          //   ...gui,
          ...gui_standard,
          ...gui_animation,
          ...gui_sound,
          verticalScrollbar: enumRef(
            { cardinality: [0, 1] },
            "scrollbar_types",
          ),
          horizontalScrollbar: enumRef(
            { cardinality: [0, 1] },
            "horizontal_scrollbar_types",
          ),
          autohide_scrollbars: bool({ cardinality: [0, 1] }),
          drag_scroll: array({ cardinality: [0, 1] }, [
            enumRef({ cardinality: [0, Infinity] }, "dragScrollType"),
          ]),
          click_to_front: bool({ cardinality: [0, 1] }),
          smooth_scrolling: bool({ cardinality: [0, 1] }),
          scroll_wheel_factor: float({ cardinality: [0, 1] }),
        },
      ),
    },
  ),
  buttonType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      //   size: obj(
      //     { cardinality: [0, 1] },
      //     {
      //       x: int(),
      //       y: int(),
      //     },
      //   ),
      borderSize: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
      ...gui_standard,
      ...gui_image,
      buttonText: either(
        localisation({ cardinality: [0, 1] }),
        localisation_inline({ cardinality: [0, 1] }),
      ),
      buttonFont: scalar({ cardinality: [0, 1] }),
      ...gui_localization,
      shortcut: scalar({ cardinality: [0, Infinity] }),
      hint_tag: localisation({ cardinality: [0, 1] }),
      ...gui_sound,
      format: enumRef({ cardinality: [0, 1] }, "guiTextFormats"),
      multiline: bool({ cardinality: [0, 1] }),
      font: scalar({ cardinality: [0, 1] }),
      web_link: scalar({ cardinality: [0, 1] }),
      no_clicksound: bool({ cardinality: [0, 1] }),
    },
  ),
  OverlappingElementsBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...gui_standard,
      spacing: float({ cardinality: [0, 1] }),
      format: enumRef({ cardinality: [0, 1] }, "guiTextFormats"),
      first_on_top: bool({ cardinality: [0, 1] }),
    },
  ),
  gridBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...gui_standard,
      slotsize: obj(
        {},
        {
          width: either(int(), percentage_field()),
          height: either(int(), percentage_field()),
        },
      ),
      add_horizontal: bool({ cardinality: [0, 1] }),
      max_slots_horizontal: int({ cardinality: [0, 1] }),
      max_slots_vertical: int({ cardinality: [0, 1] }),
      max_slots: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
      padding: obj(
        { cardinality: [0, 1] },
        {
          top: int({ cardinality: [0, 1] }),
          bottom: int({ cardinality: [0, 1] }),
          left: int({ cardinality: [0, 1] }),
          right: int({ cardinality: [0, 1] }),
        },
      ),
      format: enumRef({ cardinality: [0, 1] }, "containerOrientations"),
      background: obj(
        { cardinality: [0, 1] },
        {
          name: scalar(),
          ...gui_standard,
          ...gui_image,
          ...gui_sound,
          ...gui_localization,
        },
      ),
    },
  ),
  listBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...gui_standard,
      horizontal: int({ cardinality: [0, 1] }, 0, 1),
      spacing: int({ cardinality: [0, 1] }),
      alwaystransparent: bool({ cardinality: [0, 1] }),
      scrollbartype: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
      borderSize: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
      offset: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
    },
  ),
  smoothListBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...gui_standard,
      horizontal: int({ cardinality: [0, 1] }, 0, 1),
      spacing: int({ cardinality: [0, 1] }),
      alwaystransparent: bool({ cardinality: [0, 1] }),
      scrollbartype: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
      borderSize: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
      offset: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
    },
  ),
  iconType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...any_image_type,
      ...gui_image,
      ...gui_standard,
      ...gui_localization,
    },
  ),
  positionType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      position: obj(
        {},
        {
          x: either(int({}, -3840, 3840), float({}, -3840, 3840)),
          y: either(int({}, -2160, 2160), float({}, -2160, 2160)),
        },
      ),
      scale: float({ cardinality: [0, 1] }),
    },
  ),
  browserType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...any_image_type,
      ...gui_image,
      ...gui_standard,
      ...gui_localization,
    },
  ),
  instantTextBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      text: either(
        localisation({ cardinality: [0, 1] }),
        localisation_inline({ cardinality: [0, 1] }),
      ),
      font: scalar({ cardinality: [0, 1] }),
      maxWidth: either(
        int({ cardinality: [0, 1] }),
        percentage_field({ cardinality: [0, 1] }),
      ),
      maxHeight: either(
        int({ cardinality: [0, 1] }),
        percentage_field({ cardinality: [0, 1] }),
      ),
      format: enumRef({ cardinality: [0, 2] }, "guiTextFormats"),
      multiline: bool({ cardinality: [0, 1] }),
      ...gui_standard,
      alwaystransparent: bool({ cardinality: [0, 1] }),
      borderSize: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
      textureFile: typeRef({ cardinality: [0, 1] }, "spriteType"),
      vertical_alignment: enumRef(
        { cardinality: [0, 1] },
        "guiTextFormatsVertical",
      ),
      scrollbartype: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
      fixedsize: bool({ cardinality: [0, 1] }),
      text_color_code: scalar({ cardinality: [0, 1] }),
      truncate: bool({ cardinality: [0, 1] }),
    },
  ),
  editBoxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      text: either(
        localisation({ cardinality: [0, 1] }),
        localisation_inline({ cardinality: [0, 1] }),
      ),
      font: scalar({ cardinality: [0, 1] }),
      maxWidth: int({ cardinality: [0, 1] }),
      maxHeight: int({ cardinality: [0, 1] }),
      format: enumRef({ cardinality: [0, 2] }, "guiTextFormats"),
      only_numbers: bool({ cardinality: [0, 1] }),
      multiline: bool({ cardinality: [0, 1] }),
      ...gui_standard,
      alwaystransparent: bool({ cardinality: [0, 1] }),
      borderSize: obj(
        { cardinality: [0, 1] },
        {
          x: int(),
          y: int(),
        },
      ),
      textureFile: typeRef({ cardinality: [0, 1] }, "spriteType"),
      vertical_alignment: enumRef(
        { cardinality: [0, 1] },
        "guiTextFormatsVertical",
      ),
      scrollbartype: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
      fixedsize: bool({ cardinality: [0, 1] }),
      text_color_code: scalar({ cardinality: [0, 1] }),
      truncate: bool({ cardinality: [0, 1] }),
    },
  ),
  checkboxType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      buttonText: either(
        localisation({ cardinality: [0, 1] }),
        localisation_inline({ cardinality: [0, 1] }),
      ),
      buttonFont: scalar({ cardinality: [0, 1] }),
      ...gui_standard,
      ...gui_image,
      ...gui_sound,
      ...gui_localization,
    },
  ),
  extendedScrollbarType: obj(
    { cardinality: [0, Infinity] },
    {
      name: scalar(),
      ...gui_standard,
      background: obj(
        { cardinality: [0, 1] },
        {
          name: scalar(),
          ...gui_standard,
          ...gui_image,
          ...gui_sound,
          ...gui_localization,
        },
      ),
      tileSize: obj(
        { cardinality: [0, 1] },
        {
          width: int(),
          height: int(),
        },
      ),
      maxValue: float({ cardinality: [0, 1] }),
      minValue: float({ cardinality: [0, 1] }),
      startValue: float({ cardinality: [0, 1] }),
      stepSize: float({ cardinality: [0, 1] }),
      horizontal: bool({ cardinality: [0, 1] }),
      smooth_scrolling: float({ cardinality: [0, 1] }),
      clickonly: bool({ cardinality: [0, 1] }),
      setTrackFrameOnChange: bool({ cardinality: [0, 1] }),
      slider: obj(
        { cardinality: [1, 1] },
        {
          name: scalar(),
          ...gui_image,
          position: obj(
            {},
            {
              x: either(int({}, -3840, 3840), float({}, -3840, 3840)),
              y: either(int({}, -2160, 2160), float({}, -2160, 2160)),
            },
          ),
          ...gui_localization,
        },
      ),
      track: obj(
        { cardinality: [1, 1] },
        {
          name: scalar(),
          ...gui_image,
          position: obj(
            {},
            {
              x: either(int({}, -3840, 3840), float({}, -3840, 3840)),
              y: either(int({}, -2160, 2160), float({}, -2160, 2160)),
            },
          ),
          ...gui_localization,
        },
      ),
      increaseButton: obj(
        { cardinality: [0, 1] },
        {
          name: scalar(),
          ...gui_image,
          ...gui_sound,
          position: obj(
            {},
            {
              x: either(int({}, -3840, 3840), float({}, -3840, 3840)),
              y: either(int({}, -2160, 2160), float({}, -2160, 2160)),
            },
          ),
          ...gui_localization,
        },
      ),
      decreaseButton: obj(
        { cardinality: [0, 1] },
        {
          name: scalar(),
          ...gui_image,
          ...gui_sound,
          position: obj(
            {},
            {
              x: either(int({}, -3840, 3840), float({}, -3840, 3840)),
              y: either(int({}, -2160, 2160), float({}, -2160, 2160)),
            },
          ),
          ...gui_localization,
        },
      ),
    },
  ),
};

const containerWindowType = obj(
  {},
  {
    name: scalar(),
    moveable: bool({ cardinality: [0, 1] }),
    // orientation: enumRef({ cardinality: [0, 1] }, "containerOrientations"),
    clipping: bool({ cardinality: [0, 1] }),
    fullscreen: bool({ cardinality: [0, 1] }),
    background: obj(
      { cardinality: [0, Infinity] },
      {
        name: scalar({ cardinality: [0, 1] }),
        ...gui_standard,
        ...gui_image,
        ...gui_sound,
        ...gui_localization,
      },
    ),
    ...gui,
    ...gui_standard,
    ...gui_animation,
    ...gui_sound,
    verticalScrollbar: enumRef({ cardinality: [0, 1] }, "scrollbar_types"),
    horizontalScrollbar: enumRef(
      { cardinality: [0, 1] },
      "horizontal_scrollbar_types",
    ),
    autohide_scrollbars: bool({ cardinality: [0, 1] }),
    drag_scroll: array({ cardinality: [0, 1] }, [
      enumRef({ cardinality: [0, Infinity] }, "dragScrollType"),
    ]),
    click_to_front: bool({ cardinality: [0, 1] }),
    smooth_scrolling: bool({ cardinality: [0, 1] }),
    scroll_wheel_factor: float({ cardinality: [0, 1] }),
  },
);

export const types = {
  containerWindowType: root(
    { path: "game/interface" },
    {
      guiTypes: obj(
        {},
        {
          [typeDefKey("containerWindowType")]: containerWindowType,
        },
      ),
    },
  ),
};
