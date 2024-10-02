Your task is to convert the given code to typescript.
Given code is written in CWT format. You have to convert it to TS format.
Even if there are many rules and aliases, never omit output.

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
2nd and later argument is the arguments for that type.

## Attributes

"##" is the attribute symbol.
For example,
"## cardinality = 0..1
scale = float"
Attributes must be converted to the arguments like this "float({cardinality:[0,1]})"
As you can see, Type Function can take object argument to contain the attributes.

### replace_scope attribute

This takes some children like `ROOT`, `THIS`.
Converted code should have them in uncapitalized characters.

```
## replace_scope = { ROOT = air THIS = country}
effect = {
    alias_name[modifier] = alias_match_left[modifier]
}
```

This is converted to

```

const effect = {
    modifier: obj(
        { replace_scope: { root: air(), this: country() }},
        { ...modifier }
    )
}

```

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
- localisation -> localisation()
- variable_field -> variable_field()

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

## `inf` conversion

When you find `inf` which is likely to be a number, that must be converted to `Infinity`

## Boolean

`bool` is converted to `bool()`. When you find `yes` or `no`, that means it is boolean with default value `true` or `false`.

This is example of Boolean literal conversion.

```
hoge = {
    ### cardinality = 0..1
    fuga = yes
    ### cardinality = 0..1
    bar = no
}
```

This is converted to

```
const hoge = obj({}, {
    fuga: bool({ cardinality: [0,1] }, true),
    bar: bool({ cardinality: [0,1] }, false)
})
```

## Object and Array

Object and Array have its own block, starting from `{` and ending with `}`.

### Object rule

This is example of object rule.

```
## cardinality = 0..2
### Following block is an object block
ship_size = {
    ## cardinality = 0..inf
    ### The base cost of this ship_size
    cost = int
}
```

This is converted to

```
const ship_size = obj(
    { cardinality:[0,2] },
    {
        cost: int({cardinality:[0,Infinity]})
    })
```

As you can see, `obj()` type function will take 2 arguments.
The first one is for the attributes and arguments for the entire object.
The second one is for the entries in the object.

### Array rule

Array rule is simillar to object rule, but it express an array.
It must have `### Following block is an array block` line in the beginning. Otherwise it is an object rule.
This is example of array rule.

```
# cardinality = 1..2
### Following block is an array block
fuga = {
    ## cardinality = 0..1
    enum[air_units]
    ## cardinality = 0..inf
    <shared_focus>
}
```

This is converted to

```
const fuga = array(
    { cardinality:[1,2] },
    [
        enumRef({cardinality:[0,1]}, "air_units"),
        typeRef({cardinality:[0,Infinity]}, "shared_focus")
    ]
)
```

Array is converted to `array()` type function.

### Identify the block type is array or object

It is really imporant to identify the block type.
Following example is an object block.

```
### Following block is an object block
foo = {
    bar = "baz"
}
```

And this is converted to

```
const foo = obj({}, {
    bar: literal({}, "baz")
})
```

Following example is an array block.

```
### Following block is an array block
foo = {
    "bar"
    "baz"
}
```

And this is converted to

```
const foo = array({}, [literal({}, "bar"), literal({}, "baz")])
```

It is very important to know which block type is array or object.
They have different corresponding type functions, which is `array()` or `obj()`.

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
export const ability_unit_leader_types = ["army_leader", "navy_leader"]
export const greetings = ["hello", "hola"]
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

The enum might be defined as array in the same file. In that case, you mumst specify that variable directly instead of string as follows.

```
const type = enumRef({cardinality:[1,2]}, ability_unit_leader_types)
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

## Value sets

### Value set definition

Value set definition will look like this

```
set_country_flag = value_set[country_flag]
```

This is converted to

```
set_country_flag: value_set({}, "country_flag")
```

### Value set reference

Reference looks like this

```
has_country_flag = value[country_flag]
```

This is converted to

```
has_country_flag: value({}, "country_flag")
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

### Alias definition

```
alias[effect:create_starbase] = {
    ## cardinality = 1..1
    owner = scalar
}
alias[effect:create_starbase] = {
    ## cardinality = 1..1
    size = int
}
alias[effect:create_facility] = {
    ## cardinality = 1..1
    count = int
}
```

This is converted to

```
const effect = {
    create_starbase: either(
        obj(
            { cardinality:[1,Inf] },
            { owner: scalar({cardinality:[1,1]}) }
        ),
        obj(
            {cardinality:[1,Inf]},
            { size: int({cardinality:[1,1]}) }
        )
    ),
    create_facility: obj(
        { cardinality:[1,Inf] },
        { count: int({cardinality:[1,1]}) }
    )
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
ai_will_do = {
    alias_name[modifier_rule] = alias_match_left[modifier_rule]
}
```

This will be converted to

```
const on_complete = obj({}, {
    ...effect
})
const ai_will_do = obj({}, {
    ...modifier_rule
})
```

The string in the bracket `alias_name[HERE]` is the constant variable name defined in the other place. In the example above, `effect` and `modifier_rule` are the names of the constants.

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
