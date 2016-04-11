import React from 'react';
import FileInput from 'react-file-input';

var firebaseRef = 'https://blistering-torch-8436.firebaseio.com/assets/images';
var spinner = new Spinner({color: '#ddd'});



export default class NewElement extends React.Component {
  render() {
    return(
      <div className="new-element">
        <div id="spin"></div>
        <img className="pano" id="pano" />

        <input type="file"
               id="image"
               placeholder="My Image"
               className="photo icon"
               onChange={this.handleChange} />
        <span onClick={this.addImage}>
          <i className="photo icon"></i>
          <i className="code icon"></i>
        </span>
      </div>
    );
  }

  addImage() {
    console.log("add image");
  }

  handleChange() {
    console.log('handle change');
    let image = document.getElementById('image');
    let pic  = image.files[0];
    console.log(image.value);

    var f = image.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var filePayload = e.target.result;
        // Generate a location that can't be guessed using the file's contents and a random number
        var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
        var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
        spinner.spin(document.getElementById('spin'));
        // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
        f.set(filePayload, function() {
          spinner.stop();
          document.getElementById("pano").src = e.target.result;
          document.getElementById('image')
          // $('#file-upload').hide();
        });
      };
    })(f);
  reader.readAsDataURL(f);
  }
}
