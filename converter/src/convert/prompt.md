Your task is to convert the given code to typescript.
Given code is written in CWT format. You have to convert it to TS format.

# CWT format

`.cwt` files are used by cwtools to perform validation as well as provide completion and documentation. The basic format is very similar to pdxscript, with a few minor additions.

To use custom `.cwt` files place them in a folder called `.cwtools` in the folder you open in vscode (The root of your mod folder).

## Basic structure

The following config shows an example of a partial definition for Stellaris's ship_size.

```
ship_size = {
    ## cardinality = 0..1
    ### The base cost of this ship_size
    cost = int

    modifier = {
        alias_name[modifier] = alias_match_left[modifier]
    }

    ## cardinality = 0..1
    acceleration = float

    construction_type = scalar

    ## cardinality = 0..1
    default_behavior = <ship_behavior>

    ## cardinality = 0..1
    prerequisites = {
        ## cardinality = 0..100
        <technology>
    }

    ## cardinality = 0..1
    upkeep_override = {
        energy = int
        minerals = int
    }

    class = enum[shipsize_class]
}
```

This says that ship_size:

- May contain between 0 and 1 fields named `cost` with an `int` value. It also has a description of `The base cost of this ship_size`.
- Must contain a `modifier` clause, which can contain many `modifier`s (see aliases below)
- May contain between 0 and 1 fields named `acceleration` with a `float` value.
- Must contain a field named `construction_type` with a `scalar` value (any string).
- May contain between 0 and 1 fields named `ship_behavior` with a value that is the name of a `ship_behavior` type (see types below).
- May contain a `prerequisite` clause, which may contain between 0 and 100 values that are names of `technology` types (see types below).
- May contain a `upkeep_override` clause, which must contain an `energy` `int` value and a `mineral` `int` value.
- Must contain a `class` field, which a value that is in the `shipsize_class` enum (see enums below)

<a name="simple"/>

### Simple rules

Simple rules check the right hand value against several common datatypes. These are:

- `bool`: `is_triggered_only = bool` would match `is_triggered_only = yes` and `is_triggered_only = no`
- `int`: `count = int` would match any integer. Int can have a range specified with `int[-5..100]` limiting it to -5 to 100. Also accepts `int[-inf..inf]`.
- `float`: `acceleration = float` would match any float. Float can have a ranged specified with `float[-5.0..100.0]` limiting it to -5 to 100. Also accepts `float[-inf..inf]`.
- `scalar`: matches any string
- `percentage_field` matches a value ending with `%`
- `localisation`: matches a localisation key, or a quoted sentence
- `localisation_synced`: matches a localisation_synced key, or a quoted sentence
- `localisation_inline`: matches either a localisation key, or a quoted inline localisation string (rejects quoted keys)
- `filepath` : matches a string if the file referenced in the string exists
- `filepath[some/path/]`: matches a string if the file referenced in the string exists, with the given prefix ("some/path/" + string should be a file)
- `filepath[some/path/,.ext]`: matches a string if the file referenced in the string exists, with the given prefix and given extension ("some/path/ + string + ".ext" should be a file)
- `icon[gfx/interface/ships]`: matches "gfx/interface/ships/x.dds" for a given string x.
- `date_field` : matches an EU4 style date field (YYYY.MM.DD)
- `<type_key>`: `modifier = <opinion_modifier>` will match the names of any opinion_modifier found by the `type[opinion_modifier]` rule
- `prefix_<type_key>_suffix`: `modifier = pre_<opinion_modifier>_suf` will match the names of any opinion_modifier found by the `type[opinion_modifier]` rule, with the optional prefix and/or suffix added.
- `enum[enum_key]`: `set_fleet_stance = enum[fleet_stance]` will match any values in the `enum[fleet_stance]` rule
- `scope[scope_key]`: `who = scope[country]` will match any target that has a scope of country. `event_target[country]` is equivalent to this.
- `scope_field`: `scope_field = scalar` will match any target (This form exists to avoid a conflict with `scope = ` in vanilla.
- `variable_field`: matches a number or a reference to a variable. Accepts `variable_field[min..max]` to limit the range of numbers.
- `int_variable_field`: same as `variable_field`, but restricted to integers.
- `value_field`: matches a number or other reference to a value (in Jomini games). Accepts `value_field[min..max]` to limit the range of numbers.
- `int_value_field`: same as `value_field`, but restricted to integers.
- `alias_keys_field[trigger]`: matches a string that is a key in a rule alias (this is mainly used for `switch`

<a name="enums"/>

### Enums

Enums are groups of values that can be used as possible values elsewhere. They are defined as:

```
enums = {
    enum[shipsize_class] = {
        shipclass_military
        shipclass_military_station
        shipclass_transport
        shipclass_starbase
        shipclass_constructor
        shipclass_colonizer
    }
}
```

Given this enum and the rule `class = enum[shipsize_class]`, any of the following would be valid:
`class = shipclass_military`, `class = shipclass_military_station`, etc.

#### Complex enum

If you need to generate an enum dynamically from mod files, you can use a `complex_enum`.

```
	complex_enum[event_chain_counter] = {
		path = "game/common/event_chains"
		name = {
			counter = {
				enum_name = {

				}
			}
                        scalar = {
                                scalar = enum_name
                        }
		}
	}
```

`path` is the folder in which files are processed for this enum.
`name` contains a structure that will be mapped onto each top level entity in the files given. The structure will be followed until a key is found in the place of `enum_name`. This key will then be added to the enum. `scalar` will match anything, otherwise the key needs to match.
`start_from_root` makes the complex enum start from the top of the file instead of from the first level.
<a name="values"/>

### Value sets

Sometimes game entities aren't defined explicitly by types, but simply by usage. Value sets are configured by a pair of rules `value_set[key]` and `value[key]`, for example:

```
set_country_flag = value_set[country_flag]
has_country_flag = value[country_flag]
```

The rule `value[key]` will accept any value that has been used in a matching `value_set[key]`. Completion will also be provided for these values.

<a name="types"/>

### Types

Types are the top level entities that are used to connect files to config rules. This roughly lines up with folders, and examples are things like "ship_size", "army" or "event" in Stellaris.

```
types = {
    type[technology] = {
        path = "game/common/technology"
    }
    type[ship_behavior] = {
        name_field = "name"
        path = "game/common/ship_behaviors"
    }
}
```

A simple type is just a type name and a path to the folder that type's files are found. By default, the top-level key is used as the name, and the starting point for any validation. The validation for a type is specified in the top-level rule with the name of the type.
However, if a different field needs to be used then `name_field` lets you specify where to get the name from.

- `skip_root_key`: `skip_root_key = tech_group` will skip the top-level key `tech_group` and look for types at the second level, underneath `tech_group`. `skip_root_key = any` will skip any top-level key, finding the type at every second level key in matching files. `skip_root_key != tech_group` will skip any top-level key except `tech_group`
- `skip_root_key = { something any else }`: skips several levels. So this would skip `something = { blah = { else = {`.
- `skip_root_key = tech` `skip_root_key = tech_group`: Multiple entries will skip (or not skip) each of the options
- `path_strict`: `path_strict = yes` will require the file's directory to match `path` entirely (excluding subfolders)
- `path_file`: `path_file = test.txt` will only match the given filename
- `path_extension`: `path_extension = .txt` will only match files with the given extension
- `## type_key_filter` : `## type_key_filter = country_event` would require all entries for this type to have the key `country_event`. `type_key_filter <> country_event` would require all entries to have any other key. This can also take a list of values like `## type_key_filter = { one two three }`
- `type_per_file`: if `yes`, starts types from the root of a file instead of all the top level blocks
- `starts_with`: `starts_with = b_` will only match blocks that start with `b_` (e.g. for CK2 titles)
- `severity`: `severity = warning` will reduce the errors in this type to warnings
- `unique`: `unique = yes` will show errors if the same type name is defined multiple times
- `## graph_related_types = { special_project anomaly_category }`: This comment option enables the graph view for this type, and will include the listed types in the graph
  <a name="subtypes"/>

### Subtypes

Some types have multiple mutually exclusive versions with different validation requirements. The following is an example of `ship_size` having two possible subtypes, `starbase` and `military`. The subtype clause is a set of rules used to determine which subtype a type is. They are tested in order, and if none match then there is no subtype

```
types = {
    type[ship_size] = {
        path = "game/common/ship_sizes"
        subtype[starbase] = {
            class = shipclass_starbase
        }
        subtype[platform] = {
            class = shipclass_military_station
        }
        subtype[ship] = {

        }
    }
}
```

This can then be used in the main rules to add extra rules. In the following example, only the `starbase` subtype rules will apply.

```
ship_size = {
    class = shipclass_starbase

    section_slots = {
        subtype[starbase] = {

        }
        subtype[ship] = {
            "bow" = {
                locator = scalar
            }
            "mid" = {
                locator = scalar
            }
            "stern" = {
                locator = scalar
            }
        }
        subtype[platform] = {
            "west" = {
                locator = scalar
            }
            "east" = {
                locator = scalar
            }
        }
    }

    subtype[starbase]  = {
        flip_control_on_disable = bool
    }
    subtype[ship] = {
        combat_disengage_chance = float
    }

}
```

Subtype can also take a number of options:

- `## type_key_filter = country_event`: Subtypes can take a single type_key_filter
- `## push_scope = country`: If this subtype is valid, this scope is set when validating the type
- `## starts_with = b_`: If the type key starts with this, it will have this subtype
- `## display_name = "Fancy name"`: The pretty name for the subtype
- `## abbreviation = ST`: The short form for this subtype in graph displays

<a name="localisation"/>

### Localisation

Types can also be used to define localisation that must be provided for each entry of that type. By default these are only checked when a type is referenced (as an unused type doesn't need localisation). However, the `## required` option can be used to mark validation as mandatory.

Localisation requirements are defined in the format `friendly_name = "prefix_$_suffix"`. The dollar will be replaced with the actual name of the type.
`## primary` marks the localisation as the most significant text for this type

```
    type[ship_size] = {
        path = "game/common/ship_sizes"
        localisation = {
            name = "$"
            description = "$_desc"
            ## required
            required = "$_required"
            subtype[advanced] = {
                advanced = "$_advanced"
            }
        }
        subtype[advanced] = {
            is_advanced = yes
        }
    }
```

If the above type definition is combined with the rule `for_ship = <ship_size>`, `for_ship = my_ship` would require the following localisation to be defined:

```
my_ship
my_ship_desc
my_ship_required
```

If `my_ship_mk_2` has subtype `advanced`, it would require:

```
my_ship_mk_2
my_ship_mk_2_desc
my_ship_mk_2_required
my_ship_mk_2_advanced
```

<a name="modifiers"/>

#### Modifiers

Types can also be used to define modifiers from each entry of that type. These are added into the alias `alias_name[modifier] = alias_match_left[modifier]`, as well as the type `<modifier>`.

Type-based modifiers are defined in the format `"prefix_$_suffix" = modifier_category`. The dollar will be replaced with the actual name of the type. modifier_categories should be a value defined in `modifier_categories.cwt` which provides a mapping to which scopes this modifier (via its alias) can be used it.

Note, these are combined with any modifiers from `modifiers.cwt`.

```
    type[ship_size] = {
        path = "game/common/ship_sizes"
        modifiers = {
            "$_production_mult" = country
            "$_firepower" = fleet
            subtype[civilian] = {
                "$_income_add" = country
            }
        }
        subtype[civilian] = {
            is_civilian = yes
        }
    }
```

In the above type definition the following modifiers would be automatically generated

```
## scope = country
alias[modifier:<ship_size>_production_mult] = float
## scope = fleet country
alias[modifier:<ship_size>_firepower] = float
## scope = country
alias[modifier:<ship_size.civilian>_income_add] = float
```

<a name="aliases"/>

### Aliases

Aliases allow the grouping of rules for reuse across many rules. The obvious example for this is effects.
A simple event rule definition like the following allows any number of `effect` alias rules inside the immediate clause.

```
event = {
    ## cardinality = 0..1
    immediate = {
        alias_name[effect] = alias_match_left[effect]
    }
}
```

And an alias could be defined like:

```
alias[effect:create_starbase] = {
    ## cardinality = 1..1
    owner = scalar

    ## cardinality = 1..1
    size = scalar

    ## cardinality = 0..100
    module = scalar

    ## cardinality = 0..100
    building = scalar

    ## cardinality = 0..1
    alias_name[effect] = alias_match_left[effect]
}
```

or even just

```
alias[effect:THIS] = { alias_name[effect] = alias_match_left[effect] }
```

<a name="single_alias"/>

### Single-alias

A single-alias allows re-use of a section of rules in multiple places.
Defined in this way:

```
single_alias[any_trigger_clause] = {
    ## cardinality = 0..1
    count = int

    alias_name[trigger] = alias_match_left[trigger]
}
```

Used in this way:

```
## push_scope = country
any_country = single_alias_right[any_trigger_clause]
```

Which becomes the equivalent of:

```
## push_scope = country
any_country = {
    ## cardinality = 0..1
    count = int

    alias_name[trigger] = alias_match_left[trigger]
}
```

<a name="options"/>

### Options

There are a number of options that can be applied to rules by placing them in a comment above the rule

- `## cardinality = 0..1`: the following rule can be matched between `min..max` times, where min is any integer and max is any integer or `inf` for unlimited.
- `## cardinality = ~1..2`: same as above, but will only be a warning if below the minimum threshold (less strict)
- `## push_scope = country`: the following rule is a context switch/scope change into the specified scope. This adds the scope onto the current scope stack.
- `## replace_scope = { this = planet root = planet from = ship fromfrom = country }`: this following rule replaces the given parts of the current scope context with the given scopes. Any number of `this`,`root`,`from`,`fromfrom`,`fromfromfrom` and `fromfromfromfrom` can be specified.
- `## severity = information`: the following rule has any errors changed to this severity (error/warning/information/hint)
- `## scope = country`: the following rule is only valid when the current scope matches that given. Alternatively `## scope = { country planet }` for multiple valid scopes.
- `==` If a rule is defined with `==` in place of `=` it will be taken to be a "comparable" trigger. This allows it to be used in `value_field`.
  <a name="comments"/>

### Comments

Like pdxscript files, the `#` character is used to comment out lines. In `.cwt` files:

- `#` is used for comments: `# This text will be completely ignored`
- `##` is used for options `## cardinality = 0..1`
- `###` is used for documentation `### This text will be displayed in the completion info`

<a name="special_files"/>

### Special files

In addition to types, enums and validation in .cwt files, there are several "magic" files used for defining core game concepts.

#### Game files (script_docs)

In CK3, Imperator and Stellaris the game generated "script docs" are used where appropriate. For example, `triggers.log` is used to generate the scopes that triggers can be used in.

#### scopes.cwt

This file contains a block called `scopes` which contains entries such as:

```
    "Landed title" = {
		aliases = { landed_title "landed title" }
		data_type_name = "Title"
    }
```

Where the LHS key is the display text of the scope, aliases are how they are referenced in rules and script, data_type_name is the link to localisation scopes, and `is_subscope_of = { province }` is used for scopes like EU4's trade node which can be used as another scope in one direction.

#### links.cwt

This file contains a block called `links` which represents 1:1 links used in the `x.y` chains, and contains entries such as:

```
    faith = {
        desc = " Unknown, add something in code registration"
        from_data = yes
        type = scope
        data_source = <faith>
        prefix = faith:
        input_scopes = { landed_title province }
        output_scope = faith
    }
```

Where the LHS is the link keyword when `from_data` is false,

- desc is the documentation string
- input*scopes are the scope it can chain \_from*. If absent, it's a global scope link
- output_scope is the scope it results in
- from_data indicates it's a set of links generated from other script files
- data_source is the cwtools data source for valid values
- prefix is the mandatory prefix before each key `faith:christian`
- type is used to indicate if it's a scope or value (`scope`, `both`)

#### folders.cwt

This is a link of folder names that should be scanned for script files in this game.

#### modifiers.cwt/modifier_categories.cwt

This file contains a block `modifiers` that contains a list of `modifier_name = modifier_scope_group`. These are added to the alias `modifier`, and the scopes are taken from the `modifier_categories.cwt` file.

#### values.cwt

This file contains a block `values` that contains multiple lists of hardcoded cwtools `value_set` values. In CK3 and onwards this is taken from the "event targets set from code" or similar list in script docs

#### localisation.cwt

This file contains a block `localisation_commands ` that contains a list of localistaion commands and what scope they can be used in. E.g. `GetMotherFather = { monarch heir consort advisor }`. This is only used in pre-jomini games.

# TS format conversion

## Basic conversion

If the CWT format looks like this

```
pdxparticle = {
    name = scalar
    type = <particle>
    ## cardinality = 0..1
    scale = float
}
```

Corresponding code is

```
const pdxparticle = obj({},{
    name: scalar()
    type: typeRef({},"particle")
    scale: float({cardinality:[0,1]})
})
```

obj(), typeRef() and float() are Type Functions.
1st argument is the entry information, such as cardinality.
2nd and later argument is the arguments for that type.(Explained later)

## Attributes

"##" is the attribute symbol.
For example,
"## cardinality = 0..1
scale = float"
Attributes must be converted to the arguments like this "float({cardinality:[0,1]})"
As you can see, Type Function can take object argument to contain the attributes.

## Arguments

Some Types can take arguments.
For example,
`int[-5..100]`
This means the value should be converted to `int({}, -5, 100)`
`filepath[some/path/]` is converted to `filepath({}, "some/path/")`

## Simple rules and arguments

Simple rules can be converted to the same named Type Functions. For example,

- bool -> bool()
- scalar -> scalar()

## Literal rule

This is example of literal rule.

```
hoge = {
    ### cardinality = 0..1
    fuga = "aiueo"
}
```

This is converted to

```
const hoge = obj({}, {
    fuga: literal({cardinality:[0,1]}, "aiueo")
})
```

## Object rule

This is example of object rule.

```
## cardinality = 0..2
ship_size = {
    ## cardinality = 0..1
    ### The base cost of this ship_size
    cost = int
}
```

This is converted to

```
const ship_size = obj(
    { cardinality:[0,2] },
    {
        cost: int({cardinality:[0,1]})
    })
```

As you can see, object will take 2 arguments.
The first one is for the attributes and arguments for the entire object.
The second one is for the entries in the object.

## Enums

### Enum definition

Enum definition will look like this

```
enums = {
    enum[ability_unit_leader_types] = {
        army_leader
        navy_leader
    }
    enum[greetings] = {
        hello
        hola
    }
}
```

This is converted to

```
const ability_unit_leader_types = ["army_leader", "navy_leader"]
const greetings = ["hello", "hola"]
```

### Enum reference

### Enum reference in values

Enum reference in value looks like this

```
## cardinality = 1..2
type = enum[ability_unit_leader_types]
```

This is converted to

```
const type = enumRef({cardinality:[1,2]}, "ability_unit_leader_types")
```

### Enum reference in keys

Enum reference in keys looks like this

```
ai_will_do = {
    ## cardinality = 0..1
    enum[base_factor] = float
}
```

This is converted to

```
const ai_will_do = obj(
    {},
    {
        [enumRefKey("base_factor")]: float({ cardinality: [0,1] })
    })
```

## Types

### Type definition

Type definition will look like this

```
types = {
	type[my_ability] = {
		path = "game/common/abilities"
		skip_root_key = ability
	}
}

## replace_scope = { this = unit_leader root = unit_leader from = country }
my_ability = {
    // various properties
}
```

`type[my_ability]` is the name of the type.
This is converted to

```
const my_ability = obj() // omitted

export const myAbilityType = root(
  { path: "game/common/abilities" },
  {
    ability: obj(
      {},
      {
        [typeDefKey("my_ability")]: my_ability,
      },
    ),
  },
);
```

The exported constant variable name is type name + "Type"
The value specified in `skip_root_key` represents the root key in the file. This comes to the argument of `root` function.

## Alias

Alias is the reusable set of Entries.

## Alias definition

```
alias[effect:create_starbase] = {
    ## cardinality = 1..1
    owner = scalar
}
```

This is converted to

```
const effect = {
    create_starbase: obj(
        {cardinality:[0,Inf]},
        {
        owner: scalar({cardinality:[1,1]})
        })
}
```

Note that obj() should have `cardinality:[0,Inf]` for every alias definition.
Defined variable `effect` will be used in other places.

### Alias usage

Alias usage will often show up in the object entry like this

```
on_complete = {
    alias_name[effect] = alias_match_left[effect]
}
```

This will be converted to

```
const on_complete = obj({}, {
    ...effect
})
```

`effect` is the variable defined in the other place.

## Union conversion

Union type can be expressed with `either()` function.
It can take arbitary number of arguments.

### Subtypes

Subtypes explains mutually exclusive entries.

```
## cardinality = 0..2
hello = {
    path = "game/common/ship_sizes"
    icon = <icon>
    subtype[starbase] = {
        class = "shipclass_starbase"
    }
    subtype[platform] = {
        class = "shipclass_military_station"
    }
}
```

This is converted to

```
const hello = either(
    obj({cardinality:[0,2]}, {
        path: literal("game/common/ship_sizes")
        class: literal("shipclass_starbase")
    }),
    obj({cardinality:[0,2]}, {
        path: literal("game/common/ship_sizes")
        class: literal("shipclass_military_station")
    })
)
```

### Simple case

If there's no subtype but same key is repeated, it can be expressed with `either()`.

```
decision_category = {
	## cardinality = 0..inf
	icon = scalar
	## replace_scope = { this = country root = country }
	## cardinality = 0..inf
	icon = {
		key = scalar
		trigger = {
			alias_name[trigger] = alias_match_left[trigger]
		}
	}
}
```

This is converted to

```
const decision_category = obj({},{
    icon: either(
        scalar({cardinality:[0,inf]}),
        obj({replace_scope:{this:country(),root:country()}, cardinality:[0,inf]},{
            key: scalar(),
            trigger: obj({...trigger})
        })
    )
})
```

# Anser format

The answer must be just a code.
