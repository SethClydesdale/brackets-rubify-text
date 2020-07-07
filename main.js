/* wrap selected text with <ruby> annotation tags */
define(function (require, exports, module) {
  'use strict';
  
  // get modules
  var CommandManager = brackets.getModule('command/CommandManager'),
      Menus = brackets.getModule('command/Menus'),
      AppInit = brackets.getModule('utils/AppInit'),
      EditorManager = brackets.getModule('editor/EditorManager'),
      
      // command text/id/shortcut
      cmdText = 'Rubify Text',
      cmdId = 'rubifyText',
      cmdKey = 'Ctrl-Alt-T',
       
      // derubify commands
      cmdDerubify = 'Derubify Text',
      
      toRuby = 'to <ruby> text',
      toRubyId = 'derubifyToRuby',
      
      toRt = 'to <rt> text',
      toRtId = 'derubifyToRt',
      
      toBoth = 'to two strings',
      toBothId = 'derubifyToBoth';
  
  AppInit.appReady(function () {
    // de/rubify functionality
    function rubifyText (id) {
      var editor = EditorManager.getFocusedEditor();
      
      if (editor) {
        // loop over and modify selections
        for (var selections = editor._codeMirror.getSelections(), i = 0, j = selections.length; i < j; i++) {
          selections[i] =
            id == cmdId ? // wrap selections with <ruby> tags with <rt> tags added on the end for annotations
              '<ruby>' + selections[i] + '<rt></rt></ruby>' :
            
            // derubify commands below
            id == toRubyId ? // ruby text only
              selections[i].replace(/<ruby>([\s\S]*?)<rt>[\s\S]*?<\/rt>[\s\S]*?<\/ruby>/g, '$1') :
            
            id == toRtId ? // rt text only
              selections[i].replace(/<ruby>[\s\S]*?<rt>([\s\S]*?)<\/rt>[\s\S]*?<\/ruby>/g, '$1') :
            
            id == toBothId ? // two separate strings
              selections[i].replace(/<ruby>([\s\S]*?)<rt>[\s\S]*?<\/rt>[\s\S]*?<\/ruby>/g, '$1') + '|' + selections[i].replace(/<ruby>[\s\S]*?<rt>([\s\S]*?)<\/rt>[\s\S]*?<\/ruby>/g, '$1') :
            
            // default; no replacements
            selections[i];
        }
        
        // replace all the selections
        editor._codeMirror.replaceSelections(selections);
        
        // set cursor position inside rt if rubifying text
        if (id == cmdId) {
          for (selections = editor._codeMirror.listSelections(), i = 0, j = selections.length; i < j; i++) {
            selections[i].anchor.ch = selections[i].anchor.ch - 12;
            selections[i].head.ch = selections[i].head.ch - 12;
          }
          
          editor._codeMirror.setSelections(selections);
          editor._codeMirror.refresh();
        }
      }
    };
    
    // Rubify Text Command
    CommandManager.register(cmdText, cmdId, function() {
      rubifyText(cmdId);
    });
    
    // Derubify to <ruby> only text
    CommandManager.register(toRuby, toRubyId, function () {
      rubifyText(toRubyId);
    });
    
    // Derubify to <rt> only text
    CommandManager.register(toRt, toRtId, function () {
      rubifyText(toRtId);
    });
    
    // Derubify to two strings
    CommandManager.register(toBoth, toBothId, function () {
      rubifyText(toBothId);
    });
  
    // add Rubify Text
    Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(cmdId, cmdKey);
    
    // add Derubify Text
    var subMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addSubMenu(cmdDerubify, 'derubifyText');
    subMenu.addMenuItem(toRubyId);
    subMenu.addMenuItem(toRtId);
    subMenu.addMenuItem(toBothId);
  });
});
