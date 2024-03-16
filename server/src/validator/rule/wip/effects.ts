const transformationRules: RuleSet = {
  rules: [
    {
      match: {
        type: "alias",
        name: "set_stability",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `set_stability = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "add_war_support",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `add_war_support = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "set_war_support",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `set_war_support = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "add_fuel",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `add_fuel = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "set_fuel",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `set_fuel = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "add_command_power",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `add_command_power = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "add_political_power",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `add_political_power = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "add_legitimacy",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `add_legitimacy = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "set_legitimacy",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `set_legitimacy = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "scoped_play_song",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `scoped_play_song = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "play_song",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `play_song = ${"$1"}`
      }
    },
    {
      match: {
        type: "alias",
        name: "retire_ideology_leader",
        scope: "country"
      },
      replace: {
        type: "effect",
        code: `retire_ideology_leader = ${"$1"}`
      }
    },
  ]
};