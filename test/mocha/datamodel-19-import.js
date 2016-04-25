/*
 **  DatamodelJS - Entity management
 **  Design and Development by msg Applied Technology Research
 **  Copyright (c) 2013 - 2016 msg systems ag (http://www.msg-systems.com/)
 */

/* jshint expr:true */
describe('DatamodelJS Datamanger API - import()', function () {
    var dm = datamodeljs.dm('import')
    require('../classes').defineClassesInDatamanager(dm)
    require('../objects').defineObjectsInDatamanager(dm)

    //  _                            _             _               _
    // (_)_ __ ___  _ __   ___  _ __| |_          | |__   __ _  __| |
    // | | '_ ` _ \| '_ \ / _ \| '__| __|  _____  | '_ \ / _` |/ _` |
    // | | | | | | | |_) | (_) | |  | |_  |_____| | |_) | (_| | (_| |
    // |_|_| |_| |_| .__/ \___/|_|   \__|         |_.__/ \__,_|\__,_|
    //             |_|
    it('should check for wrong argument size', function () {
        var regexp = /^.*?missing arguments.*?$/
        expect(function () {dm.import()}).to.throw(regexp)
        expect(function () {dm.import(4711)}).to.throw(regexp)
        expect(function () {dm.import(true)}).to.throw(regexp)
        expect(function () {dm.import(false)}).to.throw(regexp)
        expect(function () {dm.import({id: 'Country'})}).to.throw(regexp)
        expect(function () {dm.import(['Country'])}).to.throw(regexp)
        expect(function () {dm.import(function () {})}).to.throw(regexp)

        expect(function () {dm.import('Country', {}, true, false) }).to.throw(/^.*?too many arguments.*?$/)
    })

    it('should check for wrong class name', function () {
        var regexp = /^.*?invalid entity class argument.*?$/
        expect(function () {dm.import(4711, {}, {})}).to.throw(regexp)
        expect(function () {dm.import(true, {}, {})}).to.throw(regexp)
        expect(function () {dm.import(false, {}, {})}).to.throw(regexp)
        expect(function () {dm.import({id: 'Country'}, {}, {})}).to.throw(regexp)
        expect(function () {dm.import(['Country'], {}, {})}).to.throw(regexp)
        expect(function () {dm.import(function () {}, {}, {})}).to.throw(regexp)
    })

    it('should check for undefined class', function () {
        expect(function () {dm.import('Unknown', {}, {}) }).to.throw(/^.*?is not defined.*?$/)
    })

    it('should check for object existence', function () {
        expect(function () {dm.import('Country', {id: 'Madagaskar'}, {})}).to.throw(/^.*?Can not find an object that matches the given obj.*?$/)
    })

    it('should not import into stub objects', function () {
        expect(function () {dm.import('Person', {id: 'HZ'}, {}); }).to.throw(/^.*?Given obj is a stub object.*?$/)
    })

    it('should validate import structure', function () {
        expect(function () {dm.import('Person', {id: 'JHO'}, {husten: true}); }).to.throw(/^.*?has no field.*?$/);
    })

    //  _                            _                                   _
    // (_)_ __ ___  _ __   ___  _ __| |_            __ _  ___   ___   __| |
    // | | '_ ` _ \| '_ \ / _ \| '__| __|  _____   / _` |/ _ \ / _ \ / _` |
    // | | | | | | | |_) | (_) | |  | |_  |_____| | (_| | (_) | (_) | (_| |
    // |_|_| |_| |_| .__/ \___/|_|   \__|          \__, |\___/ \___/ \__,_|
    //             |_|                             |___/
    it('should import attributes into existing entities', function () {
        var jho = dm.findById('Person', 'JHO')
        expect(jho).to.exist

        jho = dm.import('Person', {id: 'JHO'}, {firstName: 'Jochen', lastName: 'Hörtreiter', supervisor: 'JHO'});
        expect(jho).to.exist
        expect(jho.firstName).to.be.equal('Jochen')
        expect(jho.lastName).to.be.equal('Hörtreiter')
        expect(jho.supervisor).to.be.eql([jho])
    })

    // TODO - more tests for import

})