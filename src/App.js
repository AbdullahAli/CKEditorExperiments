import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Link from '@ckeditor/ckeditor5-link/src/link';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import List from '@ckeditor/ckeditor5-list/src/list';
import Undo from '@ckeditor/ckeditor5-undo/src/undoediting';
import Tokenizr from '@uidu/ckeditor5-tokenizr/src/tokenizr';

import DropDownButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

// Custom plugin - inserts an image with caption
// to enable the custom plugin:
// add InsertImage to plugins
// add insertImage to toolbar
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg'
import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg'

class InsertImage extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'insertImage', locale => {
            const dropdown = createDropdown(editor.model);

            const items = new Collection();
            items.add({
              type: 'button',
              model: new Model({
                withText: true,
                label: 'Upload from server',
                labelStyle: 'color: red',
                icon: imageIcon
              })
            });

            items.add({
              type: 'button',
              model: new Model({
                withText: true,
                label: 'Upload from URL',
                labelStyle: 'color: green',
                class: 'foo',
                icon: imageIcon,
              })
            });

            items.add({
              type: 'button',
              model: new Model({
                withText: true,
                label: 'Upload from file',
                labelStyle: 'color: yllow',
                class: 'foo',
                icon: imageIcon
              })
            });


            dropdown.buttonView.set({
                label: 'Insert image with caption',
                icon: imageIcon,
                tooltip: true,
            } );

            dropdown.on('change:isOpen', (eventInfo, name, value, oldValue) => console.log(`>>>>>>>>>>>>> opened/closed dropdown menu. Is open? ${value}`, eventInfo, name, value, oldValue));

            addListToDropdown(dropdown, items);

            // Callback executed once the image is clicked.
            dropdown.buttonView.on('execute', (item) => {
              // dropdown.render();

                // const imageUrl = prompt( 'Image URL' );

                // editor.model.change( writer => {
                //     const imageElement = writer.createElement( 'image', {
                //         src: imageUrl
                //     } );

                //     // Insert the image in the current selection location.
                //     editor.model.insertContent( imageElement, editor.model.document.selection );
                // } );
            } );

            this.listenTo(dropdown, 'execute', evt => {
              console.log('<<<<<<<,', evt.source.commandName, evt.source.commandValue)
            } );

            return dropdown;
        } );
    }
}



class DropDownMenu extends Plugin {
   init() {
     const editor = this.editor;

     editor.ui.componentFactory.add('dropDownMenu', locale => {
       const view = new ButtonView(locale);

       view.set({
         label: 'Insert chickens',
         icon: checkIcon,
         tooltip: true
       });

       view.on('execute', () => {
        editor.model.change(writer => {
          const imageElement = writer.createElement('image', {
            src: 'https://previews.123rf.com/images/khunaspix/khunaspix1502/khunaspix150200014/36229011-full-body-of-brown-chicken-hen-standing-isolated-white-background-use-for-farm-animals-and-livestock.jpg'
          });

          // Insert the image in the current selection location.
          editor.model.insertContent(imageElement, editor.model.document.selection);
        });
       });

       return view;
     });
   }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };

    this.toggleReadOnly = this.toggleReadOnly.bind(this);
  }

  toggleReadOnly() {
    this.setState({
      disabled: !this.state.disabled
    });
  }

  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 Framework in React</h2>
        <button onClick={this.toggleReadOnly}>Toggle read only</button>
        <div>READ ONLY MODE: {this.state.disabled ? 'ON' : 'OFF'}</div>
        <CKEditor
          onInit={ editor => console.log( 'Editor is ready to use!', editor ) }
          onChange={ ( event, editor ) => console.log( { event, editor } ) }
          config={ {
            plugins: [
              Essentials,
              Paragraph, Heading, Highlight, Bold, Italic, Alignment,
              Table, TableToolbar,
              Font, FontFamily,
              Image, ImageCaption, ImageToolbar, ImageCaption, ImageStyle, CKFinder,
              Link,
              MediaEmbed,
              PasteFromOffice,
              BlockQuote,
              List,
              Undo,
              InsertImage,
              DropDownMenu,
              Tokenizr
            ],
            toolbar: ['bold', 'italic', 'alignment', 'insertTable', 'fontSize', 'fontFamily', 'heading', 'highlight', 'ckfinder', 'link', 'mediaEmbed', 'blockQuote', 'numberedList', 'bulletedList', 'undo', 'redo', 'insertImage', 'dropDownMenu', 'tokenizr']
          } }
          editor={ ClassicEditor }
          disabled={this.state.disabled}
        />
      </div>
    );
  }
}

export default App;
