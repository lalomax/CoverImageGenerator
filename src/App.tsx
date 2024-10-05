import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import SliderInput from "./components/SliderInput";

export default function App() {
  let [photo, setPhoto] = useState<{ id: any; urls: any; user: any }>({
    id: "",
    urls: "",
    user: "",
  });


  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Web Developer",
    email: "email@gmail.com",
    phone: "+555-555-5555",
    site: "www.personalsite.com",

    width: 1075,
    height: 275,
    query: "cyber",
    fileType: "png",
    displayInfo: true,

    font: "Noto Sans HK",
    clrAccent: "#00A0DC",
    clrBg: "#000000d9",
    clrFont: "#ffffff",
  });

  // console.log(formData)

  const fontFamilies = [
    "Arial",
    "Calibri",
    "Inconsolata",
    "Noto Sans HK",
    "Merriweather",
    "Lobster",
    "Sora",
    "Lato",
    "Montserrat",
  ];
  function handleChange(event: any) {
    const { name, value, type, checked } = event.target;
    console.log(event.target)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // submitToApi(formData)
    localStorage.setItem('formData', JSON.stringify(formData));
  }

  const url =
    "https://apis.scrimba.com/unsplash/photos/random/?orientation=landscape";

  useEffect(() => {
    generatePhoto();
  }, [url]);

  useEffect(() => {
    setImage(photo.urls.regular);
  }, [photo]);

  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  function generatePhoto() {
    const photoUrl = formData.query
      ? `${url}&query=${formData.query.split(" ").join("+")}`
      : url;
    loadData({
      url: photoUrl,
      onSuccess: (res: any) => {
        setPhoto(res);
      },
    });
  }

  function loadData(options: any) {
    fetch(options.url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (options.onSuccess) options.onSuccess(data);
      });
  }

  function saveImg(fileType: string) {
    html2canvas(document.getElementById("capture") as HTMLCanvasElement, {
      allowTaint: true,
      useCORS: true,
      width : formData.width,
      height : formData.height,
      scale : 1,
    }).then(function (canvas) {
      let anchorTag = document.createElement("a");
      document.body.appendChild(anchorTag);

      if (fileType === "jpg") {
        anchorTag.href = canvas.toDataURL("image/jpeg");
      } else if (fileType === "png") {
        anchorTag.href = canvas.toDataURL();
      } else if (fileType === "webp") {
        anchorTag.href = canvas.toDataURL("image/webp");
      }

      anchorTag.download = `cover-img.${fileType}`;
      anchorTag.target = "_blank";
      anchorTag.click();
    });
  }

  // function updateColor(color: string) { }

  function handleUpload(e: any) {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log("test");
  }

  const [image, setImage] = useState("");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(275);
  const [opacity, setOpacity] = useState(.7);

  // buton icons array
  const icons = [
    { image: <FaLinkedin size={30} />, width: 1128, height: 191 },
    { image: <FaSquareXTwitter size={30} />, width: 820, height: 360 },
    { image: <FaFacebookSquare size={30} />, width: 1500, height: 500 },
    { image: <IoLogoYoutube size={30} />, width: 1546, height: 423 },
  ];

  return (
    <div className="text-white bg-gray-800">

      <Header />

      {/* Main container */}
      <div className="">
        
        {/* Sub header container */}
        <div className="">
        
          {/* Icons */}
          <div className="flex justify-center gap-2 p-2">
            {icons.map((icon, index) => (
              <button
                key={index}
                className=""
                onClick={() => {
                  setWidth(icon.width);
                  setHeight(icon.height);
                }}
              >
                {icon.image}
              </button>
            ))}

          </div>
          {/* Slider Inputs */}
          <div className="flex justify-center gap-2 text-black">
            <SliderInput
              className=""
              value={width}
              onChange={(e: any) => setWidth(e.target.value)}
              min={400}
              max={1600}
              label="Width"
            />
            <SliderInput
              className=""
              value={height}
              onChange={(e: any) => setHeight(e.target.value)}
              min={150}
              max={600}
              label="Height"
            />
          </div>
        </div>

        {/* Cover data container */}
        <div
          className="relative m-auto mt-4 shadow-lg"
          id="capture"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {formData.query && photo ? (
            <div>
              <TransformWrapper>
                <TransformComponent>


                  <div
                    className="overflow-auto bg-black relative z-10 scroll-smooth"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                  >
                    <img className="object-contain w-full" style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }} src={image} />
                  </div>
                </TransformComponent>
              </TransformWrapper>
              {/* information frame */}
              <div className="box-border w-full absolute z-50 top-0 left-0">
                {formData.displayInfo ? (
                  <div
                    className="flex flex-col justify-center items-center absolute bottom-0 top-0 right-0 min-w-[350px] max-w-[450px]"
                    style={{
                      color: formData.clrFont,
                      backgroundColor: formData.clrBg,
                      fontFamily: formData.font,
                      opacity: opacity,
                      height: `${height}px`,
                    }}
                  >
                    <h4 contentEditable className="text-4xl m-0">{formData.name}</h4>
                    <div
                      className="h-1 w-[60%] m-1 "
                      style={{
                        backgroundColor: formData.clrAccent,
                      }}
                    ></div>
                    <h5 contentEditable className="text-2xl">{formData.title}</h5>
                    <h5 contentEditable className="text-xl opacity-80">{formData.email}</h5>
                    <h5 contentEditable className="text-xl opacity-80 mb-1">{formData.phone}</h5>
                    <h5 contentEditable className="text-xl opacity-80">{formData.site}</h5>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* Form container */}
        <div className="bg-slate-900 rounded-lg min-w-80">
          <form onSubmit={handleSubmit} className="m-auto flex justify-center items-center mt-1 flex-wrap text-slate-900 gap-2" >
            <div className="">
              <p className="text-lg font-semibold text-center mb-1 text-slate-400">Image</p>
              <div className="">
                <div className="flex justify-end items-center gap-x-1.5">
                  <p className="text-lg">Category</p>
                  <input
                    className="text-lg text-black"
                    type="text"
                    // placeholder=""
                    onChange={handleChange}
                    name="query"
                    value={formData.query}
                  />
                </div>

                <div className="flex justify-center mt-1">
                  <button className="bg-indigo-600 font-medium px-2 py-1 rounded shadow-xl text-white" onClick={generatePhoto}>
                    Generate
                  </button>
                </div>
              </div>

              <div className="">
                <p className="text-lg text-slate-400">Import Image</p>
                <input
                  // className="form-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleUpload}
                />
              </div>



              <div className="download-tray">
                <div className="form-row">
                  <p className="text-lg text-slate-400">File Type</p>

                  <select
                    className="form-select"
                    onChange={handleChange}
                    name="fileType"
                    value={formData.fileType}
                  >
                    <option value="png">.png</option>
                    <option value="jpg">.jpg</option>
                    <option value="webp">.webp</option>
                  </select>
                </div>
                <button
                  className="bg-indigo-600 font-medium px-2 py-1 rounded shadow-xl text-white"
                  onClick={() => {
                    saveImg(formData.fileType);
                  }}
                >
                  Download
                </button>
              </div>
            </div>

            {/* Three columns data */}
            {/* Info section */}
            <div className="">
              <p className="control-header">Info</p>
              <div className="flex text-slate-400">
                <p className="form-label">Display Info</p>
                <input
                  className="form-checkbox"
                  type="checkbox"
                  checked={formData.displayInfo}
                  onChange={handleChange}
                  name="displayInfo"
                />
              </div>
              <div className="">
                <p className="text-slate-400">Name</p>
                <input
                  className="f"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                />
              </div>
              <div className="">
                <p className="text-slate-400">Title</p>
                <input
                  className=""
                  type="text"
                  placeholder="Title"
                  onChange={handleChange}
                  name="title"
                  value={formData.title}
                />
              </div>
              <div className="">
                <p className="text-slate-400">Phone</p>
                <input
                  className=""
                  type="text"
                  placeholder="Phone"
                  onChange={handleChange}
                  name="phone"
                  value={formData.phone}
                />
              </div>
              <div className="">
                <p className="text-slate-400">Email</p>
                <input
                  className=""
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                />
              </div>
              <div className="">
                <p className="text-slate-400">Website</p>
                <input
                  className=""
                  type="text"
                  placeholder="Website"
                  onChange={handleChange}
                  name="site"
                  value={formData.site}
                />
              </div>
            </div>
          {/* Styling section */}
            <div className="style-form">
              <p className="text-lg text-slate-400">Styling</p>
              <div className="">
                <p className="text-slate-400">Font Family</p>

                <select
                  className=""
                  onChange={handleChange}
                  name="font"
                  value={formData.font}
                >
                  {fontFamilies.map((font: any, i: number) => {
                    return (
                      <option key={i} value={font}>
                        {font}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="">
                <p className="text-slate-400">Accent</p>
                <input
                  name="clrAccent"
                  type="color"
                  className="color-picker"
                  onChange={handleChange}
                  value={formData.clrAccent}
                />
                <input
                  className=""
                  type="text"
                  onChange={handleChange}
                  name="clrAccent"
                  value={formData.clrAccent}
                />
              </div>

              <div className="">
                <p className="text-slate-400">Font</p>
                <input
                  name="clrFont"
                  type="color"
                  className="color-picker"
                  onChange={handleChange}
                  value={formData.clrFont}
                />
                <input
                  className=""
                  type="text"
                  onChange={handleChange}
                  name="clrFont"
                  value={formData.clrFont}
                />
              </div>
              <div className="">
                <p className="text-slate-400">Bg</p>
                <input
                  name="clrBg"
                  type="color"
                  className=""
                  onChange={handleChange}
                  value={formData.clrBg}
                />
                <input
                  className=""
                  type="text"
                  onChange={handleChange}
                  name="clrBg"
                  value={formData.clrBg}
                />
              </div>

              <SliderInput
                className=""
                value={(opacity * 100).toFixed(0)}
                onChange={(e: any) => setOpacity(e.target.value / 100)}
                min={0}
                max={100}
                step={1}
                label="Opacity"
              />
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}


