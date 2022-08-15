input -> value  {% id %}

value -> number {% id %} | boolean {% id %} | quoted {% id %} | standard_characters {% (data, _, reject) => data[0] === "yes" ? reject : `"${data[0]}"` %} | array {% id %}

number -> digits "." digits {% (data) => Number(data.join("")) %} | digits {% (data) => Number(data.join("")) %}
digits -> digit {% id %} | digit digits {% (data) => Number(data.join("")) %}
digit -> [0-9] {% id %}

boolean -> "yes" {% () => true %} | "no" {% () => false %}

quoted -> "\"" any_characters "\"" {% (data) => data[1] %}
any_characters -> any_character {% id %} | any_character any_characters {% (data) => data[0] + data[1] %}
any_character -> [^\"]

standard_characters -> standard_character {% id %} | standard_character standard_characters {% (data) => data[0] + data[1] %}
standard_character -> [a-zA-Z]

array -> "[" array_items "]" {% (data) => data[1] %}
array_items -> value {% (data) => [data[0]] %} | value "," array_items {% (data) => [data[0], ...data[2]] %}