import { Expr, Name, DataTypeDef, QName } from "syntax/ast"
import { toSql } from "to-sql"

export type Declaration =
  {
    type: "declaration",
    variable: Name,
    constant: boolean,
    typeAnnotation: DataTypeDef,
    collation?: QName,
    notnull: boolean,
    default: boolean,
    expression?: Expr
  }

export type BlockStatement =
  {
    type: "block",
    declarations?: Declaration[],
    statements: Statement[],
  }

export type Statement = AssignmentStatement | BlockStatement

export type AssignmentStatement =
  {
    type: "assignment",
    variable: Name,
    expression: Expr
  }

// export const plpgsqlAstToSql =  function(m: ){
//   "block": function block(a: BlockStatement) {
    
//   },
//   "assignment": (a: AssignmentStatement) => {
//     return a.variable + " := " + toSql.expr(a.expression);
//   },
//   "statement": (a: Statement) => {
//     if (a.type === "block"){
//       return block(a);
//     }
//   }
// }
