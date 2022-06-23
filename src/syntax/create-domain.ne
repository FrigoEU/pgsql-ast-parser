@lexer lexerAny
@include "base.ne"

createdomain_statement -> %kw_create kw_domain
                                word
                                %kw_as
                                data_type
                            {% x => track(x, {
    type: 'create domain',
    name: asName(x[2]),
    dataType: x[4]
}) %}