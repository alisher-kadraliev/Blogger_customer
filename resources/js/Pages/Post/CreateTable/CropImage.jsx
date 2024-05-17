import React, { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import toast from "react-hot-toast";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import setCanvasPreview from "@/Pages/Post/CreateTable/setCanvasPreview.js";

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 16 / 9;

export default function CropImage({ Toaster, updateAvatar,closeModals}) {
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [errorImg, setErrorImage] = useState("");
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imageDetails,setImageDetails] = useState({})

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;
            imageElement.addEventListener("load", (e) => {
                if (errorImg) setErrorImage("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (
                    naturalWidth < MIN_DIMENSION ||
                    naturalHeight < MIN_DIMENSION
                ) {
                    setErrorImage((e) =>
                        toast.error("Foto en az 150 x 150 pixel olmalı"),
                    );
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoaded = (image) => {
        imgRef.current = image;
    };

    const onCropComplete = (crop) => {
        if (imgRef.current && crop.width && crop.height) {
            const canvas = previewCanvasRef.current;
            setCanvasPreview(imgRef.current, canvas, crop);
        }
    };
    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const handleSave = () => {
        if (!previewCanvasRef.current) {
            return;
        }
        const canvas = previewCanvasRef.current;
        const dataUrl = canvas.toDataURL()
        updateAvatar(dataUrl)
        canvas.toBlob((blob) => {
            if(blob){
                setImageDetails({
                    width:canvas.width,
                    height:canvas.height,
                    format:blob.type,
                    size:(blob.size / 1024).toFixed(2) + " KB",
                })
            }
        })
    };

    const onLoadImg = (e) => {
        const { width, height } = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: 25,
            },
            ASPECT_RATIO,
            width,
            height,
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <div>
            <input
                type="file"
                className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 border-white focus:outline-none file:text-sm file:font-semibold
        file:bg-gray-900 file:text-white
        hover:file:bg-gray-800 mt-4"
                accept="image/*"
                onChange={onSelectFile}
            />

            {errorImg && <p className="text-red-500">{errorImg}</p>}
            <div className="flex justify-start py-7 items-center gap-10 max-lg:flex-col">
                {imgSrc && (
                    <ReactCrop
                        src={imgSrc}
                        onChange={onCropChange}
                        onComplete={onCropComplete}
                        onImageLoaded={onImageLoaded}
                        crop={crop}
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            onLoad={onLoadImg}
                        />
                    </ReactCrop>
                )}

                <div>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            display:'none',
                            border: "1px solid black",
                            objectFit: "contain",
                        }}
                    ></canvas>
                </div>
            </div>
            <hr/>
            <br/>
            <div className="flex gap-10 items-center">
            {imgSrc && (
                <PrimaryButton onClick={handleSave}>Foto Kırpmak</PrimaryButton>
            )}
            <div>
                    <div className="flex gap-3">
                        <p><span className="font-bold">Genişlik:</span> {imageDetails.width}px</p>
                        <p><span className="font-bold">Yükseklik:</span> {imageDetails.height}px</p>
                        <p><span className="font-bold">Format:</span> {imageDetails.format}</p>
                        <p><span className="font-bold">Boyut:</span> {imageDetails.size}</p>
                    </div>
            </div>
                <PrimaryButton className="ml-auto" onClick={closeModals}>Kapat</PrimaryButton>
            </div>

        </div>
    );
}
