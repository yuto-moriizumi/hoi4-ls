const types: Rule = {
  children: {
    type: {
      children: {
        path: { type: Value.UNQUOTED },
        name_field: { type: Value.UNQUOTED },
        path_extension: { type: Value.UNQUOTED },
        skip_root_key: { type: Value.UNQUOTED },
      },
      provide: { context: Context.CONTAINER_WINDOW_TYPE, scope: Scope.COUNTRY },
    },
  },
};

const containerWindowType: Rule = {
  children: {
    name: { type: Value.UNQUOTED },
    moveable: { type: Value.BOOL, cardinality: [0, 1] },
    orientation: { type: Value.UNQUOTED, cardinality: [0, 1] },
    clipping: { type: Value.BOOL, cardinality: [0, 1] },
    fullscreen: { type: Value.BOOL, cardinality: [0, 1] },
    background: {
      children: {
        name: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
      provide: [
        { context: Context.GUI_STANDARD, scope: Scope.COUNTRY },
        { context: Context.GUI_IMAGE, scope: Scope.COUNTRY },
        { context: Context.GUI_SOUND, scope: Scope.COUNTRY },
        { context: Context.GUI_LOCALIZATION, scope: Scope.COUNTRY },
      ],
      cardinality: [0, "inf"],
    },
    verticalScrollbar: { type: Value.UNQUOTED, cardinality: [0, 1] },
    horizontalScrollbar: { type: Value.UNQUOTED, cardinality: [0, 1] },
    drag_scroll: {
      cardinality: [0, "inf"],
      children: { enum: { type: Value.UNQUOTED } },
    },
    click_to_front: { type: Value.BOOL, cardinality: [0, 1] },
    smooth_scrolling: { type: Value.BOOL, cardinality: [0, 1] },
    scroll_wheel_factor: { type: Value.UNQUOTED, cardinality: [0, 1] },
  },
  provide: [
    { context: Context.GUI, scope: Scope.COUNTRY },
    { context: Context.GUI_STANDARD, scope: Scope.COUNTRY },
    { context: Context.GUI_ANIMATION, scope: Scope.COUNTRY },
    { context: Context.GUI_SOUND, scope: Scope.COUNTRY },
  ],
};

const guiStandard: Rule = {
  children: {
    position: {
      children: {
        x: { type: Value.UNQUOTED },
        y: { type: Value.UNQUOTED },
      },
    },
    size: {
      children: {
        width: { type: Value.UNQUOTED },
        height: { type: Value.UNQUOTED },
        min: {
          children: {
            width: { type: Value.UNQUOTED },
            height: { type: Value.UNQUOTED },
            cardinality: [0, 1],
          },
        },
        max: {
          children: {
            width: { type: Value.UNQUOTED },
            height: { type: Value.UNQUOTED },
            cardinality: [0, 1],
          },
        },
        preserve_aspect_ratio: { type: Value.BOOL, cardinality: [0, 1] },
      },
    },
    margin: {
      children: {
        top: { type: Value.UNQUOTED, cardinality: [0, 1] },
        bottom: { type: Value.UNQUOTED, cardinality: [0, 1] },
        left: { type: Value.UNQUOTED, cardinality: [0, 1] },
        right: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    background_margin: {
      children: {
        top: { type: Value.UNQUOTED, cardinality: [0, 1] },
        bottom: { type: Value.UNQUOTED, cardinality: [0, 1] },
        left: { type: Value.UNQUOTED, cardinality: [0, 1] },
        right: { type: Value.UNQUOTED, cardinality: [0, 1] },
      },
    },
    scale: { type: Value.UNQUOTED },
    rotation: { type: Value.UNQUOTED },
    orientation: { type: Value.UNQUOTED },
    origo: { type: Value.UNQUOTED },
    hide: { type: Value.BOOL },
    vertical_scroll_step: { type: Value.UNQUOTED },
  },
};