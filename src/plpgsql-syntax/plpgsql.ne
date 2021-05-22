@preprocessor typescript

@{%
import {plpgsqlLexer, lexerAny} from '../lexer';
%}
@include "./../syntax/base.ne"
@include "./../syntax/expr.ne"

block -> (kw_declare declaration:*):? kw_begin plpgsql_statements:? %kw_end
  {% x => {
  return track(x, {
      type: 'block',
      declarations: x[0] ? (x[0][1] || []) : undefined,
      statements: x[2] || []
    });
  } %}

plpgsql_statements -> %semicolon:* plpgsql_statement (%semicolon:+ plpgsql_statement):* %semicolon:*  {% ([_, head, _tail]) => {
    const tail = _tail;

    const ret = [unwrap(head), ...tail.map((x: any) => unwrap(x[1]))];

    return ret;
    // return ret.length === 1
    //     ? ret[0]
    //     : ret;
} %}

plpgsql_statement -> block | assignment

assignment -> %word (%op_assignment | %op_eq) expr
  {% x => {
    return track(x, {
      type: "assignment",
      variable: asName(x[0]),
      expression: x[2]
    });
  } %}

declaration -> %word kw_constant:? data_type (%kw_collate qualified_name):? kw_not_null:? (%kw_default | %op_assignment | %op_eq):? expr:? %semicolon
{% x => {
  return track(x, {
    type: "declaration",
    variable: asName(x[0]),
    constant: x[1] ? true : false,
    typeAnnotation: x[2],
    collation: x[3] ? x[3][1] : undefined,
    notnull: x[4] ? true : false,
    default: x[5] && x[5][0].type === "kw_default",
    expression: x[6] ? x[6] : undefined
  });
}%}

# Next: 
# https://www.postgresql.org/docs/9.4/plpgsql-statements.html