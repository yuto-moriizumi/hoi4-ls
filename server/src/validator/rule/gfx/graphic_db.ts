import { trigger } from "../triggers";
import {
  root,
  array,
  obj,
  enumRefKey,
  float,
  typeRef,
  filepath,
} from "../utils";

const graphic_db = obj(
  {},
  {
    [enumRefKey("equipment_bonus_type")]: obj(
      { cardinality: [1, Infinity] },
      {
        pool: obj(
          { cardinality: [1, Infinity] },
          {
            limit: obj(
              { cardinality: [0, 1] },
              {
                ...trigger,
              },
            ),
            weight: float({ cardinality: [0, 1] }),
            icons: array({ cardinality: [0, Infinity] }, [
              typeRef({ cardinality: [0, Infinity] }, "spriteType"),
              filepath({ cardinality: [0, Infinity] }, ""),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc001_german_historical_portraits/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc002_polish_content_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc003_rocket_launcher_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc004_famous_battleships_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc005_heavy_cruisers_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc006_soviet_tanks_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc007_german_tanks_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc008_french_tanks_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc009_british_tanks_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc010_us_tanks_unit_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc011_german_march_order_music_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc012_allied_radio_music_pack/",
              ),
              filepath({ cardinality: [0, Infinity] }, "dlc/dlc013_sabaton/"),
              filepath({ cardinality: [0, Infinity] }, "dlc/dlc014_wallpaper/"),
              filepath({ cardinality: [0, Infinity] }, "dlc/dlc016_artbook/"),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc017_original_soundtrack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "integrated_dlc/dlc018_together_for_victory/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc019_sabaton_vol2/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "integrated_dlc/dlc020_death_or_dishonor/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc021_anniversary_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "integrated_dlc/dlc022_waking_the_tiger/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc023_man_the_guns/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc024_man_the_guns_wallpaper/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc025_axis_armor_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc026_radio_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc027_la_resistance_preorder_bonus/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc028_la_resistance/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc029_allied_armor_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc030_allied_speeches_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc031_battle_for_the_bosporus/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc032_eastern_front_planes_pack/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc033_songs_of_the_eastern_front/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc034_no_step_back/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc035_no_step_back_preorder_bonus/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc036_by_blood_alone/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc037_by_blood_alone_preorder_bonus/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc038_arms_against_tyranny/",
              ),
              filepath(
                { cardinality: [0, Infinity] },
                "dlc/dlc039_arms_against_tyranny_preorder_bonus/",
              ),
            ]),
            models: array({ cardinality: [0, 1] }, [
              typeRef({ cardinality: [0, Infinity] }, "entity"),
            ]),
          },
        ),
      },
    ),
  },
);

export const graphicDbType = root(
  { path: "/gfx/interface/equipmentdesigner/graphic_db" },
  {
    default: graphic_db,
  },
);
