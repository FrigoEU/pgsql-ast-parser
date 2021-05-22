import 'mocha';
import 'chai';
import { hideLocs, deepEqual, inspect, checkBlockStatement } from '../syntax/spec-utils';

describe('Plpgsql', () => {
  checkBlockStatement(['BEGIN a = 2 END', 'begin a := 2 end'], { 
    type: 'block',
    statements: [{
      type: 'assignment',
      variable: {name: "a"},
      expression: {
        type: 'integer',
        value: 2
      }
    }],
  });

  checkBlockStatement(['DECLARE BEGIN END'], { 
    type: 'block',
    declarations: [],
    statements: [],
  });

  checkBlockStatement(['DECLARE b integer := 3; BEGIN END'], { 
    type: 'block',
    declarations: [{
      type: "declaration",
      variable: {name: "b"},
      constant: false,
      typeAnnotation: {
        name: "integer"
      },
      notnull: false,
      default: false,
      expression: {
        type: 'integer',
        value: 3
      }
    }],
    statements: [],
  });

  checkBlockStatement(['DECLARE b CONSTANT nvarchar(5) NOT NULL DEFAULT 3; BEGIN END'], { 
    type: 'block',
    declarations: [{
      type: "declaration",
      variable: {name: "b"},
      constant: true,
      typeAnnotation: {
        name: "nvarchar",
        config: [5]
      },
      notnull: true,
      default: true,
      expression: {
        type: 'integer',
        value: 3
      }
    }],
    statements: [],
  });

});

