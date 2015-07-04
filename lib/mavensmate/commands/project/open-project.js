/**
 * @file Opens the project in the client editor
 * @author Joseph Ferraro <@joeferraro>
 */

'use strict';

var Promise           = require('bluebird');
var util              = require('../../util').instance;
var BaseCommand       = require('../../command');
var inherits          = require('inherits');
var EditorService     = require('../../editor');
var logger            = require('winston');

function Command() {
  Command.super_.call(this, Array.prototype.slice.call(arguments, 0));
}

inherits(Command, BaseCommand);

Command.prototype.execute = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    var editorService = new EditorService(self.client);
    editorService.open(self.getProject().path);
    resolve('Success');
  });
};

exports.command = Command;
exports.addSubCommand = function(client) {
  client.program
    .command('open-project')
    .alias('open')
    .description('Open a project in the editor')
    .action(function() { 
      client.executeCommand(this._name);        
    }); 
};