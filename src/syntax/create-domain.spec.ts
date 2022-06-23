import 'chai';
import 'mocha';
import { checkCreateDomain } from './spec-utils';

describe('Create domain', () => {

    checkCreateDomain('create domain blah as int8 ', {
        type: 'create domain',
        name: { name: 'blah' },
        dataType: { name: 'int8' }
    });

});
