AutoForm.addInputType 'raty',
  template: 'afRaty'
  valueOut: ->
    AutoForm.Utility.stringToNumber @find('input').val()

Template.afRaty.helpers
  atts: ->
    atts = _.clone @atts
    delete atts.ratyOptions
    atts

Template.afRaty.rendered = ->
  basePath = '/packages/andrei_autoform-raty/raty/lib/images'
  $('.raty').raty _.defaults @data.atts.ratyOptions,
    starHalf: "#{basePath}/star-half.png"
    starOff: "#{basePath}/star-off.png"
    starOn: "#{basePath}/star-on.png"
    number: @data.max
    score: @data.value
