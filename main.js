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
       cmdKey = 'Ctrl-Alt-T';
  
  AppInit.appReady(function () {
      // register command
      CommandManager.register(cmdText, cmdId, function() {
        var editor = EditorManager.getFocusedEditor();
        
        if (editor) {
          // get selections
          var selections = editor._codeMirror.getSelections(),
              i = 0,
              j = selections.length;
          
          // wrap selections with <ruby> tags with <rt> tags added on the end for annotations
          for (; i < j; i++) {
            selections[i] = '<ruby>' + selections[i] + '<rt></rt></ruby>';
          }
          
          // replace all the selections
          editor._codeMirror.replaceSelections(selections);
        }
      });
    
      // add menu item
      Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(cmdId, cmdKey);
  });
});