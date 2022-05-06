import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../App.css'
import '../components/imagesHover/imageHover.css'
import { getOriginalTemplate } from '../services/getApi';
import EmailChips from '../components/emailchips'
import '../components/buttongradients/buttongradients.css'
import { postLetter, uploadImages } from '../services/postApi';
import { getImageUrl } from '../services/getApi';
import Copyurl from '../components/copyurl';
import Uploadimage1 from '../components/uploadimage1';

export default function EditorPage() {
  const editorRef = useRef(null);
  const [images, setImages] = useState([])
  const [uploadImage, setUploadImage] = useState([]);
  const [value, setValue] = useState(``)
  const [chipsvalue, setChipsValue] = useState({
    val: "",
    chips: []
  })

  useEffect(() => {
    refreshRecords();
    getOriginalTemplate().then(res => { setValue(res.data.data.template_code); console.log(res);}).catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (!uploadImage.length) return;
    uploadImages(uploadImage)
      .then((res) => { console.log(res.data); setImages(res.data.data) })
      .catch(e => console.log(e));
    setUploadImage([]);

  }, [uploadImage])

  const refreshRecords = async () => {
    try {
      const { data } = await getImageUrl();
      setImages(data.data);
    } catch (e) { console.log(e); }
  }

  const log = () => {
    if (editorRef.current) {
      setValue(editorRef.current.getContent())
    }
  };

  const sendLetter = async (value, emails) => {
    await postLetter(value, emails).then(res => { console.log(res) }).catch(err => { console.log(err) })
  }


  const handleChange = (e) => {
    setChipsValue((prev) => ({ ...prev, val: e.target.value }))
  }
  const handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      var chip = chipsvalue.val;
      setChipsValue((pre) => ({
        ...pre,
        val: "",
        chips: [...pre.chips, chip]
      }))
    }
  }
  const handleDelete = (toBeRemoved) => {
    setChipsValue({
      chips: chipsvalue.chips.filter(email => email !== toBeRemoved)
    });
  };


  return (

    <>
      <div style={{ display: 'flex', margin: '3px' }}>
        <div style={{ width: '35%', display: 'flex', flexDirection: 'column', margin: '5px' }}>
          <button className="gradient-button gradient-button-4" style={{ width: "auto" }} onClick={log}>Save Template</button>
          <EmailChips chipsvalue={chipsvalue} setChipsValue={setChipsValue} handleDelete={handleDelete} handleKeyDown={handleKeyDown} handleChange={handleChange} />

          <button
            className="gradient-button gradient-button-4"
            onClick={() => { sendLetter(value, chipsvalue.chips) }} style={{ width: "auto", padding: '5px' }}

          >Send</button>
          <div style={{ width: "100%", display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', height: '480px', borderRadius: '10px', overflowY: 'auto', position: 'relative', backgroundColor: '#E5E5E5', gap: '3px' }} >
            {images.map((image, index) => (
              <div key={index} style={{ borderRadius: '10px', position: 'relative', height: '150px', width: '100px', margin: '3px' }} >
                <img class="imgHover" src={image.image} alt="" style={{ height: '100%', width: '100%', objectFit: 'strech', borderRadius: '10px' }} />
                <Copyurl image={image.image} />
              </div>
            ))}
          </div>
        </div>
        <Editor
          apiKey='cm0s5oticy0ahny0l3o0pdpyionk5z8jvftdcnjmp4p0py4y'
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ innerHeight: '100%' }}
          init={{
            selector: '.texteditor',
            plugins: "advlist lists table paste textcolor fullscreen colorpicker tabfocus link preview autolink image charmap image code",
            toolbar: `undo redo table fontsizeselect bold italic underline forecolor backcolor bullist numlist link blocks charmap fontselect alignleft aligncenter alignright alignjustify outdent indent removeformat image media code insertdatetime preview link image`,
            imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage",
            paste_data_images: true,
            menubar: true,
            toolbar_items_size: 'large',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            convert_newlines_to_brs: false,
            statusbar: false,
            relative_urls: false,
            remove_script_host: false,
            language: 'en',
          }}
        />
      </div>
      <Uploadimage1 setUploadImage={setUploadImage} uploadImage={uploadImage} />
    </>
  );
}