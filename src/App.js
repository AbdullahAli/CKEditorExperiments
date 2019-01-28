import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 Framework in React</h2>
        <CKEditor
          onInit={ editor => console.log( 'Editor is ready to use!', editor ) }
          onChange={ ( event, editor ) => console.log( { event, editor } ) }
          config={ {
              plugins: [ Essentials, Paragraph, Bold, Italic, Heading ],
              toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo', ]
          } }
          editor={ ClassicEditor }
          data="<p>Hello from CKEditor 5!</p>"
        />
      </div>
    );
  }
}

export default App;
