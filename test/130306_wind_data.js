var chai = require('chai')
chai.Should()
chai.use(require('chai-things'))
chai.use(require('@signalk/signalk-schema').chaiModule)

describe('130306 Wind Data', function () {
  it('Apparent sentence converts positive', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"timestamp":"2013-10-08-15:47:28.263Z","prio":"2","src":"1","dst":"255","pgn":"130306","description":"Wind Data","fields":{"SID":"67","Wind Speed":"6.22","Wind Angle":"0.872665","Reference":"Apparent"}}'
      )
    )
    tree.should.have.nested.property(
      'environment.wind.speedApparent.value',
      6.22
    )
    tree.should.have.nested.property(
      'environment.wind.angleApparent.value',
      0.872665
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })

  it('Apparent sentence converts positive gt 180', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"timestamp":"2013-10-08-15:47:28.263Z","prio":"2","src":"1","dst":"255","pgn":"130306","description":"Wind Data","fields":{"SID":"67","Wind Speed":"6.22","Wind Angle":"3.31613","Reference":"Apparent"}}'
      )
    )
    tree.should.have.nested.property(
      'environment.wind.speedApparent.value',
      6.22
    )
    tree.should.have.nested.property(
      'environment.wind.angleApparent.value',
      -2.9670553071795864
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })

  it('Apparent sentence converts negative', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"timestamp":"2013-10-08-15:47:28.263Z","prio":"2","src":"1","dst":"255","pgn":"130306","description":"Wind Data","fields":{"SID":"67","Wind Speed":"6.22","Wind Angle":"-0.872665","Reference":"Apparent"}}'
      )
    )
    tree.should.have.nested.property(
      'environment.wind.speedApparent.value',
      6.22
    )
    tree.should.have.nested.property(
      'environment.wind.angleApparent.value',
      -0.872665
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })

  it('True Boat sentence converts', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"timestamp":"2013-10-08-15:47:28.264Z","prio":"2","src":"1","dst":"255","pgn":"130306","description":"Wind Data","fields":{"SID":"68","Wind Speed":"4.89","Wind Angle":"86.0","Reference":"True (boat referenced)"}}'
      )
    )
    tree.should.have.nested.property('environment.wind.speedTrue.value', 4.89)
    tree.should.have.nested.property(
      'environment.wind.angleTrueWater.value',
      86
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })

  it('True Ground sentence converts', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"timestamp":"2013-10-08-15:47:28.264Z","prio":"2","src":"3","dst":"255","pgn":"130306","description":"Wind Data","fields":{"SID":"94","Wind Speed":"4.82","Wind Angle":"218.6","Reference":"True (ground referenced to North)"}}'
      )
    )
    tree.should.have.nested.property(
      'environment.wind.speedOverGround.value',
      4.82
    )
    tree.should.have.nested.property(
      'environment.wind.directionTrue.value',
      218.6
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })

  it('Magnetic Ground sentence converts', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"timestamp":"2013-10-08-15:47:28.264Z","prio":"2","src":"3","dst":"255","pgn":"130306","description":"Wind Data","fields":{"SID":"94","Wind Speed":"4.82","Wind Angle":"218.6","Reference":"Magnetic (ground referenced to Magnetic North)"}}'
      )
    )
    tree.should.have.nested.property(
      'environment.wind.directionMagnetic.value',
      218.6
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })

  it('Cetrek sentence converts', function () {
    var tree = require('./testMapper').toNested(
      JSON.parse(
        '{"prio":5,"src":75,"dst":255,"pgn":130306,"timestamp":"2022-12-10T15:58:34.529Z","fields":{"Wind Speed":1.54,"Wind Angle":2.3545},"description":"Wind Data"}'
      )
    )
    tree.should.have.nested.property(
      'environment.wind.speedApparent.value',
      1.54
    )
    tree.should.have.nested.property(
      'environment.wind.angleApparent.value',
      2.3545
    )
    tree.should.be.validSignalKVesselIgnoringIdentity
  })
})
